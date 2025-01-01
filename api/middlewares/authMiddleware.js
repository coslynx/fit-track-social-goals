import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          console.error("JWT Verification Error:", err);
          return res.status(401).json({ message: 'Invalid token' });
      }

      req.user = { userId: decoded.userId };
      next();
    });
  } catch (error) {
    console.error("Error in authenticate middleware:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { authenticate };