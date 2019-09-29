const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// Passport Config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

// Require Mongoose connection URI
const mongoUri = require('./config/keys').mongoUri;
// Mongoose connect
const conn = mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then( ()=> console.log('MongoDB connection established') )
.catch( (err) => console.error.bind(console, `connection error: ${err}`));

// Initialise Express
const app = express();

// Cookie Parser Middleware
app.use(cookieParser());

// Flash Messaging Middleware
app.use(flash());

//Session Middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Passport Necessary Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Use Routes
app.use('/auth', auth);

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });