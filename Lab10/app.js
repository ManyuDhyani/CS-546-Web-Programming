// Setup server, session and middleware here.

const express = require('express');
const app = express();

const configRoutes = require('./routes');
const session = require('express-session');
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

// Authentication Middleware
app.use('/protected', (req, res, next) => {
  if (!req.session.login) {
    return res.status(403).render('forbiddenAccess', {title: "Forbidden", error: true , description: "User is not logged in"})
  }
  next();
});

// Logging Middleware
app.use((req, res, next) => {
  let timestamp = new Date().toUTCString();
  let requestMethod = req.method;
  let requestRoute = req.originalUrl;
  if (req.session.login) {
    console.log(`[${timestamp}]: ${requestMethod} ${requestRoute} (Authenticated User)`);
  } else {
    console.log(`[${timestamp}]: ${requestMethod} ${requestRoute} (Non-Authenticated User)`);
  }
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});