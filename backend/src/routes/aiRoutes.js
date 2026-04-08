import { Router } from 'express';
import requireAuth from '../middleware/authMiddleware.js';
import {
  generateItinerary,
  predictCost,
  getRecommendations,
  analyzeSentiment,
  getWeatherInsights,
  translate,
  optimizeBudget,
  getTravelTips,
} from '../controllers/aiController.js';

const router = Router();

router.use(requireAuth);

router.post('/generate-itinerary',  generateItinerary);
router.post('/cost-prediction',     predictCost);
router.post('/recommendations',     getRecommendations);
router.post('/sentiment',           analyzeSentiment);
router.post('/weather-insights',    getWeatherInsights);
router.post('/translate',           translate);
router.post('/budget-optimize',     optimizeBudget);
router.post('/travel-tips',         getTravelTips);

export default router;
