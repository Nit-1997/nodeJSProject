//APP CONFIG
var  express        = require("express")
   , app            = express()
   , bodyParser     = require("body-parser")
   , config         = require('config')
   , functions      = require('functions')
   , methodOverride = require("method-override")
   , models         = require('models')
   , routes         = require('routes')
   , methodOverride = require("method-override")
   , cors           = require('cors');



app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.json({limit: "50mb"}));


// set up app views handling
app.set('view engine', 'ejs');

// load up app routes
app.get(['/', '/home', '/landing'], function(req,res){
   res.render('landing');
});


require('routes').forEach(function (a) {
     app.use(a.prefix, a.server);
   });

app.listen(7000,function(){
     console.log("burger-builder has started");
});