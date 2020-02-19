const mongoose = require('mongoose'),
bcrypt = require('bcrypt');

var movieSchema = mongoose.Schema({
  title : {type: String, required: true},
  description : {type: String, required: true},
  genre : {
    name : String,
    description : String
  },
  director : {
    name : String,
    bio : String
  },
  actors : [String],
  imageURL: String,
  featured : Boolean
});

var userSchema = ({
  username : {type: String, required: true},
  password : {type: String, required: true},
  email : {type: String, required: true},
  birthday : Date,
  favMovies : [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};
userSchema.statics.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
