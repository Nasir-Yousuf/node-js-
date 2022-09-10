const moongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new moongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plesae tell us your name']
  },
  email: {
    type: String,
    unique: [true, 'this email is already used'],
    required: [true, 'Please provide your email'],
    lowercase: true, // convert upercase to lowercase , its not a validator
    validate: [validator.isEmail, 'Please provide a valid email']
  },

  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'confirm password is required'],
    validate: {
      // This only works on CREATE and SAVE!!
      validator: function(el) {
        return el === this.password;
      },

      message: 'Passwords are not the same'
    }
  }
});

// pre middleware run between geting the data and save intoo the database
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
// instance method : is basically a methhod that is gonna be availablee on all documents of a cartain collection
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = moongoose.model('User', userSchema);
module.exports = User;
