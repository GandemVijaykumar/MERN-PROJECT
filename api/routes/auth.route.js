// Importing modules using ES module syntax
import express from 'express';
import {google, signin, signOut, signup} from '../controllers/auth.controller.js'; // Note the .js extension
import { Router } from 'express';

// Create a new router instance
const router = Router();

// Define the signup route
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google",google);
router.get('/signout', signOut);
// Export the router using ES module syntax
export default router;
