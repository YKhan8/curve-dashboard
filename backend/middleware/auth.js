const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization').replace('Bearer ', '');
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user id to request
        req.userId = decoded.id;
        
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication required' });
    }
};

module.exports = auth; 