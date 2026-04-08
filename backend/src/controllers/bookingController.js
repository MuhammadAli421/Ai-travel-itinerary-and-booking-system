import Booking from '../models/Booking.js';

export const getAll = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.session.userId }).sort({ startDate: 1 });
    res.json({ success: true, data: bookings });
  } catch (err) { next(err); }
};

export const getOne = async (req, res, next) => {
  try {
    const item = await Booking.findOne({ _id: req.params.id, user: req.session.userId });
    if (!item) return res.status(404).json({ message: 'Booking not found.' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const item = await Booking.create({ ...req.body, user: req.session.userId });
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const item = await Booking.findOneAndUpdate(
      { _id: req.params.id, user: req.session.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: 'Booking not found.' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const item = await Booking.findOneAndDelete({ _id: req.params.id, user: req.session.userId });
    if (!item) return res.status(404).json({ message: 'Booking not found.' });
    res.json({ success: true, message: 'Booking deleted.' });
  } catch (err) { next(err); }
};
