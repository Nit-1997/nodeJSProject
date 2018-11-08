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
, geocoder       = require("geocoder")
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

//show route
app.get('/multi', async function(req,res){
  var noMatch = null;
  if(req.query.search) {
    //const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    var pubs = await sequelize.query("select * from pubs where pubName = "+"'"+req.query.search+"'", {type: sequelize.QueryTypes.SELECT});
    if(pubs.length < 1) {
      noMatch = "No pubs match that query, please try again.";
    }
    res.render("allClubView",{pubs:pubs, noMatch: noMatch});
  }else{
    var pubs = await sequelize.query("select * from pubs", {type: sequelize.QueryTypes.SELECT});
    console.log(pubs);
    res.render('allClubView',{pubs:pubs, noMatch: noMatch}); 
  }
});

app.get('/multi/:id',async function(req,res){
  var pub = await sequelize.query("select * from pubs where id ="+req.params.id, {type: sequelize.QueryTypes.SELECT});
  var comment = await sequelize.query("select * from comments where pubId ="+req.params.id, {type: sequelize.QueryTypes.SELECT});
  console.log(pub);
  pub = pub[0];
  var pre = {};
  pre.pub = pub;
  pre.comment = comment;
  console.log('hihihihihi',pre);
  res.render('singlePubView',{pre:pre});
});

app.get('/createPub',isOwnerMode,function(req,res){
 res.render('createPubs');
});


//EDIT ROUTE
app.get("/multi/:id/edit",isLoggedIn,function(req,res){
 sequelize.query("select * from pubs where id ="+req.params.id, {type: sequelize.QueryTypes.SELECT})
 .then(pubs=>{
  var pub = pubs[0];
  res.render('editPubs',{pub:pub});
}); 
});


app.get("/logout",function(req,res){
  req.logout();
  req.flash("success","logged you out!!");
  res.redirect("/landing");
});

app.get("/ticket",function(req,res){
  res.render('ticket');
});

//**************************************
//middlewares
//**************************************
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
   return next();
 }
 res.redirect('/login');
}


async function isOwnerMode(req,res,next){
  if(req.isAuthenticated()){
   if(req.user.mode === 'owner'){
    return next();
  }
  req.flash("error","You need to sign up in owner mode");
  return res.redirect("/landing");
}
req.flash("error","You need to login first");
res.redirect("/landing");
}

app.post('/book',function(req,res){
 var paymentId  = req.body.paymentId;
 console.log(paymentId);
});


app.get('/multi/:id/createEvents',function(req,res){
 const pre = {};
 pre.id = req.params.id;
 res.render("createEvents",{pre:pre});
});

//
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  };
  var upload = multer({ storage: storage, fileFilter: imageFilter});
  var cloudinary = require('cloudinary');
  cloudinary.config({ 
    cloud_name: 'dskmn0vwa', 
    api_key:"943622486141547", 
    api_secret:"klX-ayutXqmxdZUmtL9bXhTQbro"
  });
//



app.post('/multi/:id/createEvent',upload.single('image'),function(req,res){
 console.log(req.user.id,"nininininnin");
 var data = {
  userId:req.user.id,
  pubId:req.params.id,
  eventName: req.body.name,
  about:req.body.about,
  price:req.body.price,
  eventDate: new Date(),
  eventContact:req.body.pubContact,
  createdAt: new Date(),
  image:req.body.image
}

const event = models.events;

cloudinary.uploader.upload(req.file.path, function(result) {
  data.image = result.secure_url;
  event.create(data).then(newEvent=>{
    res.redirect('/multi/'+req.params.id);
  });

});
});

app.get('/multi/:id/allEvents',async function(req,res){
 var event = await sequelize.query("select * from events where pubId ="+req.params.id, {type: sequelize.QueryTypes.SELECT});
 console.log(event);
 res.render('allEvents',{event:event});
});







//************************************************************
//comment
//************************************************************

app.get("/multi/:id/newComment/:comment_id",isLoggedIn,async function(req,res){
 var pub = await sequelize.query("select * from pubs where id ="+req.params.id, {type: sequelize.QueryTypes.SELECT});
 const pre = {};
 pre.id = req.params.id;
 res.render("newComment",{pre:pre});
});

app.post("/multi/:id/newComments",isLoggedIn,function(req,res){
 const Comment = models.comment;
 console.log('hiihihihi',req.body);
 var data = {
  userId:req.user.id,
  pubId:req.params.id,
  content:req.body.cont,
  author:req.user.name,
  createdAt:new Date(),
  updatedAt:new Date()
}


Comment.create(data).then(newComment =>{
 res.redirect('/multi/'+req.params.id);
}); 
});

//Edit comment
app.get("/multi/:id/editComment/:comment_id",checkCommentOwnership,async function(req,res){
   const pre = {};
   const comment = await sequelize.query("select * from comments where id ="+req.params.comment_id, {type: sequelize.QueryTypes.SELECT});
   console.log(comment);
   pre.id = req.params.id;
   pre.comment = comment[0];
   res.render("editComment",{pre:pre});
});

app.post("/multi/:id/editComments/:comment_id",checkCommentOwnership,function(req,res){
  const comment = models.comment;
  var data = {
    userId:req.user.id,
    pubId:req.params.id,
    content:req.body.cont,
    author:req.user.name,
    updatedAt:new Date()
  }
  comment.update(data,{where:{id:req.params.comment_id}}).then(newComment=>{
    res.redirect('/multi/'+req.params.id);
  });
});

async function checkCommentOwnership(req,res,next){
    var comment = await sequelize.query("select * from comments where id ="+req.params.comment_id, {type: sequelize.QueryTypes.SELECT});
    console.log('haha',comment);
    if(comment[0].author === req.user.name){
        return next();     
    }
    req.flash("error","You need to login correctly");
         return res.redirect("/landing");  
}
// //update comment
// router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
//     Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,foundComment){
//          if(err){
//               req.flash("error",err.message);
//              res.redirect("back");
//          }else{
//               req.flash("success","Comment updated successfully!!");
//              res.redirect("/campgrounds/"+req.params.id);
//          } 
//     }); 
// });

// //delete comment
// router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
//     Comment.findByIdAndRemove(req.params.comment_id,function(err){
//           if(err){
//                req.flash("error",err.message);
//               res.redirect("back");
//           }else{
//               req.flash("success","Comment deleted successfully!!");
//               res.redirect("/campgrounds/"+req.params.id);
//           } 
//     }); 
// });







































require('routes').forEach(function (a) {
 app.use(a.prefix, a.server);
});

app.listen(7000,function(){
 console.log("clubbo has started");
});


// function escapeRegex(text) {
//     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// };