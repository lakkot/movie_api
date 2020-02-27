var jwtSecret = 'devil_mystery'; // This has to be the same key used in the JWTStrategy
var jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport');

function generateJWTToken(user) {
  return jwt.sign(user, jwtSecret, {
    subject: user.username, // This is the username you're encoding in the JWT
    expiresIn: '7d', // token expiration time
    algorithm: 'HS256' // This is the algorithm used to "sign" or encode the values of the JWT
  });
};

// POST login

module.exports = (router) => {
  router.post('/login', (req, res) => {
    //res.header("Access-Control-Allow-Origin", "*");
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        var token = generateJWTToken(user.toJSON());
        return res.json({ user, token })
      });
    })(req, res);
  });
};
