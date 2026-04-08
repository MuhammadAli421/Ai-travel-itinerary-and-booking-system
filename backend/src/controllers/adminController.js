import User from '../models/User.js';
import Itinerary from '../models/Itinerary.js';
import Booking from '../models/Booking.js';

// GET /api/admin/stats
export const getAppStats = async (req, res, next) => {
  try {
    const [totalUsers, totalItineraries, totalBookings, adminCount] = await Promise.all([
      User.countDocuments(),
      Itinerary.countDocuments(),
      Booking.countDocuments(),
      User.countDocuments({ role: 'admin' }),
    ]);

    // Itineraries by status breakdown
    const itineraryStats = await Itinerary.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Bookings by type breakdown
    const bookingStats = await Booking.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalItineraries,
        totalBookings,
        adminCount,
        itineraryBreakdown: itineraryStats,
        bookingBreakdown: bookingStats,
      },
    });
  } catch (err) { next(err); }
};

// GET /api/admin/users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) { next(err); }
};

// DELETE /api/admin/users/:id
export const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.session.userId.toString()) {
      return res.status(400).json({ message: 'You cannot delete your own admin account.' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Cascade delete their data
    await Promise.all([
      Itinerary.deleteMany({ user: req.params.id }),
      Booking.deleteMany({ user: req.params.id }),
    ]);

    res.json({ success: true, message: 'User and all associated data deleted.' });
  } catch (err) { next(err); }
};

// GET /api/admin/itineraries
export const getAllItineraries = async (req, res, next) => {
  try {
    const itineraries = await Itinerary.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: itineraries });
  } catch (err) { next(err); }
};

// DELETE /api/admin/itineraries/:id
export const deleteItinerary = async (req, res, next) => {
  try {
    const item = await Itinerary.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Itinerary not found.' });
    res.json({ success: true, message: 'Itinerary deleted.' });
  } catch (err) { next(err); }
};
