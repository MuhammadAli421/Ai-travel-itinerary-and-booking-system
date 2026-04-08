import { Router } from 'express';
import requireAuth  from '../middleware/authMiddleware.js';
import requireAdmin from '../middleware/adminMiddleware.js';
import {
  getAppStats,
  getAllUsers,
  deleteUser,
  getAllItineraries,
  deleteItinerary,
} from '../controllers/adminController.js';

const router = Router();

// Both middlewares apply to every admin route
router.use(requireAuth, requireAdmin);

router.get('/stats',               getAppStats);
router.get('/users',               getAllUsers);
router.delete('/users/:id',        deleteUser);
router.get('/itineraries',         getAllItineraries);
router.delete('/itineraries/:id',  deleteItinerary);

export default router;
