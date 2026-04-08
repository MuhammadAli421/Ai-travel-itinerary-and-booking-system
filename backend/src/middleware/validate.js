import mongoSanitize from 'express-mongo-sanitize';

// Strips keys containing '$' or '.' to prevent NoSQL injection
export const sanitize = mongoSanitize();

// Generic required fields checker
export const requireFields = (fields) => (req, res, next) => {
  const missing = fields.filter((f) => !req.body[f]);
  if (missing.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` });
  }
  next();
};
