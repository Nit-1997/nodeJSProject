//APP CONFIG
var  express        = require("express")
, app            = express()
, bodyParser     = require("body-parser")
, config         = require('config')
, functions      = require('functions')
, methodOverride = require("method-override")
, models         = require('models')
, routes         = require('routes')
, flash          = require("connect-flash")
, cors           = require('cors')
, passport       = require('passport')
, session        = require('express-session');


const sequelize = models.sequelize;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.json({limit: "50mb"}));
app.use(flash());

// set up app views handling
app.set('view engine', 'ejs');

console.log(models.pub);

// Passport config
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./passport.js')(passport, models.user);

//our own middleware to add current user to all the pages
app.use(function(req,res,next){
 res.locals.currentUser = req.user; 
 res.locals.error = req.flash("error");
 res.locals.success = req.flash("success");
   next();  //very imp as it is a middleware it requires next operation
 });



// load up app routes
app.get(['/', '/home', '/landing'], function(req,res){
  res.render('landing');
});

app.get('/login', function(req,res){ 
 res.render('login');
});

app.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/landing',
  failureRedirect: '/login',
  failureFlash: true,
  successFlash: 'Welcome to Clubbo'
}),function(req,res){
});

app.get('/signup', function(req,res){
 res.render('signup');
});

app.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/landing',
  failureRedirect: '/login'
} 
));

app.get('/multi', async function(req,res){
  var pubs = await sequelize.query("select * from pubs", {type: sequelize.QueryTypes.SELECT});
  console.log(pubs);
  res.render('allClubView',{pubs:pubs});
});

app.get('/multi/:id',async function(req,res){
  var pub = await sequelize.query("select * from pubs where id ="+req.params.id, {type: sequelize.QueryTypes.SELECT});
  console.log(pub);
  res.render('singlePubView',{pub:pub});
});

app.get('/createPub',isLoggedIn,function(req,res){
 res.render('createPubs');
});

app.get("/logout",function(req,res){
  req.logout();
  req.flash("success","logged you out!!");
  res.redirect("/landing");
});

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
   return next();
 }
 res.redirect('/login');
}


require('routes').forEach(function (a) {
 app.use(a.prefix, a.server);
});

app.listen(7000,function(){
 console.log("clubbo has started");
});