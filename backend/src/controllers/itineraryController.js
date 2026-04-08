import Itinerary from '../models/Itinerary.js';

export const getAll = async (req, res, next) => {
  try {
    const itineraries = await Itinerary.find({ user: req.session.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: itineraries });
  } catch (err) { next(err); }
};

export const getOne = async (req, res, next) => {
  try {
    const item = await Itinerary.findOne({ _id: req.params.id, user: req.session.userId });
    if (!item) return res.status(404).json({ message: 'Itinerary not found.' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
};

export const create = async (req, res, next) => {
  try {
    const item = await Itinerary.create({ ...req.body, user: req.session.userId });
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
};

export const update = async (req, res, next) => {
  try {
    const item = await Itinerary.findOneAndUpdate(
      { _id: req.params.id, user: req.session.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: 'Itinerary not found.' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
};

export const remove = async (req, res, next) => {
  try {
    const item = await Itinerary.findOneAndDelete({ _id: req.params.id, user: req.session.userId });
    if (!item) return res.status(404).json({ message: 'Itinerary not found.' });
    res.json({ success: true, message: 'Itinerary deleted.' });
  } catch (err) { next(err); }
};
