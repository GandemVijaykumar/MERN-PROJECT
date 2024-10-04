import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    location: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const locationFromUrl = urlParams.get('location');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      locationFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        location: locationFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm' || e.target.id === 'location') {
      setSidebardata({ ...sidebardata, [e.target.id]: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('location', sidebardata.location);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Location:
            </label>
            <input
              type='text'
              id='location'
              placeholder='Location...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.location}
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Type:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <label>All</label>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'rent'}
              />
              <label>Rent</label>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={sidebardata.type === 'sale'}
              />
              <label>Sale</label>
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <label className='font-semibold'>Parking:</label>
            <input
              type='checkbox'
              id='parking'
              className='w-5'
              onChange={handleChange}
              checked={sidebardata.parking}
            />
          </div>
          <div className='flex gap-2 items-center'>
            <label className='font-semibold'>Furnished:</label>
            <input
              type='checkbox'
              id='furnished'
              className='w-5'
              onChange={handleChange}
              checked={sidebardata.furnished}
            />
          </div>
          <div className='flex gap-2 items-center'>
            <label className='font-semibold'>Offer:</label>
            <input
              type='checkbox'
              id='offer'
              className='w-5'
              onChange={handleChange}
              checked={sidebardata.offer}
            />
          </div>
          <div className='flex gap-2 items-center'>
            <label className='font-semibold'>Sort by:</label>
            <select
              id='sort_order'
              onChange={handleChange}
              className='border p-3 rounded-lg w-full'
            >
              <option value='created_at_desc'>Latest</option>
              <option value='regularPrice_asc'>Price: Low to High</option>
              <option value='regularPrice_desc'>Price: High to Low</option>
            </select>
          </div>
          <button
            type='submit'
            className='bg-blue-600 text-white p-4 rounded-lg font-semibold'
          >
            Search
          </button>
        </form>
      </div>

      <div className='p-7 w-full'>
        <div className='grid gap-8'>
          {loading ? (
            <div>Loading...</div>
          ) : listings.length > 0 ? (
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))
          ) : (
            <div>No listings found</div>
          )}
        </div>
        {showMore && (
          <button
            onClick={onShowMoreClick}
            className='bg-blue-600 text-white p-4 rounded-lg font-semibold mt-6'
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}
