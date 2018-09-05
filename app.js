//APP CONFIG
var  express        = require("express")
   , app            = express()
   , bodyParser     = require("body-parser")
   , config         = require('config')
   , functions      = require('functions')
   , methodOverride = require("method-override")
   , models         = require('models')
   , routes         = require('routes')
   , cors           = require('cors')
   , passport       = require('passport')
   , session        = require('express-session');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.json({limit: "50mb"}));


// set up app views handling
app.set('view engine', 'ejs');


// Passport config
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./passport.js')(passport, models.user);


// load up app routes
app.get(['/', '/home', '/landing'], function(req,res){
   res.render('landing');
});

app.get('/login', function(req,res){
   res.render('login');
});

 app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/landing',
            failureRedirect: '/signin'
        }
 ));

app.get('/signup', function(req,res){
   res.render('signup');
});

app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/landing',
        failureRedirect: '/signup'
    } 
));

app.get('/single', function(req,res){
   res.render('singlePubView');
});

app.get('/multi', function(req,res){
   res.render('allClubView');
});

app.get('/createPub',isLoggedIn,function(req,res){
   res.render('createPubs');
});



//middleware
function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    }


require('routes').forEach(function (a) {
     app.use(a.prefix, a.server);
   });

app.listen(7000,function(){
     console.log("burger-builder has started");
});