const jwt = require('jsonwebtoken');
const User = require('../models/User');

// protect routes

const protect = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log('authorization', authorization);
  if(authorization && authorization.startsWith('Bearer')) {
    const token = authorization.split(' ')[1];
    try {
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      req.user = await User.findById(decoded.id).populate({ path: 'languages', populate: 'level'});
      next()
    } catch(err) {
      res.status(401).send('Not authorized to access this route')
    }
  } else {
    res.status(401).send('No token provided')
  }
}

module.exports = protect;