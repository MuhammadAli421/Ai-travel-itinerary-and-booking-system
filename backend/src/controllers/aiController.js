import axios from 'axios';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

// Shared axios instance with a generous timeout for AI calls
const aiAxios = axios.create({
  baseURL: AI_SERVICE_URL,
  timeout: 60000, // 60s — LLM calls can be slow
});

const forwardToAI = (endpoint) => async (req, res) => {
  try {
    const { data } = await aiAxios.post(`/ai/${endpoint}`, {
      ...req.body,
      userId: req.session.userId,
    });
    res.json(data);
  } catch (err) {
    // Log the real error server-side for debugging
    console.error(`[AI Controller] /${endpoint} failed:`, err.message);
    if (err.response) {
      console.error(`[AI Controller] Python responded with ${err.response.status}:`, err.response.data);
    } else if (err.code === 'ECONNREFUSED') {
      console.error('[AI Controller] Python service is not running on', AI_SERVICE_URL);
    }

    const status  = err.response?.status || 502;
    const message = err.response?.data?.message || err.message || 'AI service unavailable.';
    res.status(status).json({ success: false, message });
  }
};

export const generateItinerary  = forwardToAI('generate-itinerary');
export const predictCost        = forwardToAI('cost-prediction');
export const getRecommendations = forwardToAI('recommendations');
export const analyzeSentiment   = forwardToAI('sentiment');
export const getWeatherInsights = forwardToAI('weather-insights');
export const translate          = forwardToAI('translate');
export const optimizeBudget     = forwardToAI('budget-optimize');
export const getTravelTips      = forwardToAI('travel-tips');
