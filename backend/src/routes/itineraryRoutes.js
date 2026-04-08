import { Router } from 'express';
import { getAll, getOne, create, update, remove } from '../controllers/itineraryController.js';
import requireAuth from '../middleware/authMiddleware.js';

const router = Router();

router.use(requireAuth);

router.get('/',      getAll);
router.get('/:id',   getOne);
router.post('/',     create);
router.put('/:id',   update);
router.delete('/:id', remove);

export default router;
