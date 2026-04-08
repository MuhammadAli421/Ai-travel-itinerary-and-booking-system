import User from '../models/User.js';

const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden. Admin access only.' });
    }
    req.adminUser = user; // attach for use in controllers
    next();
  } catch (err) {
    next(err);
  }
};

export default requireAdmin;
