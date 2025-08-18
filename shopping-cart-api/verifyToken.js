const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token missing' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log('Decoded user:', decoded);
console.log('Request user:', req.user);

    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded; // decoded contains user info like id and email
    next();
  });
};

module.exports = verifyToken;