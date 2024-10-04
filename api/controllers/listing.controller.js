import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const offer = req.query.offer === 'true' ? true : undefined;
    const furnished = req.query.furnished === 'true' ? true : undefined;
    const parking = req.query.parking === 'true' ? true : undefined;

    let type = req.query.type;
    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';
    const locationQuery = req.query.location || '';

    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const sortOptions = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;

    const filters = {
      name: { $regex: searchTerm, $options: 'i' },
      type,
    };

    if (offer !== undefined) filters.offer = offer;
    if (furnished !== undefined) filters.furnished = furnished;
    if (parking !== undefined) filters.parking = parking;

    if (locationQuery) {
      filters.address = { $regex: locationQuery, $options: 'i' };
    }

    const listings = await Listing.find(filters)
      .sort(sortOptions)
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    next(error);
  }
};

