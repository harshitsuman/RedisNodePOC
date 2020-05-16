const cors = require('cors');
const express = require('express');
var app = express();
var testCache = require('../middleware/testCache');

app.use(cors());
app.options('*', cors());
app.use(express.json());

app.get('/gps_data_poc',testCache,function (req,res){
    res.send(req.responseObj);
});

app.use(function (err, req, res, next) {
    
    let e = JSON.stringify(err, ['name','message']);
  
    res.status(err.status || 500)
      .json({
        "status": err.status || 500,
        "success": false,
        "error": JSON.parse(e).name + "  : " + JSON.parse(e).message
      })
      .end();
  
  });

  process.on('unhandledRejection', function (reason, p) {
    
    console.error("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
  });
 
  process.on('uncaughtException', function (err) {
    console.error(err);
  })

app.listen(process.env.PORTS,console.log.bind(console,'Server is up on port: ',process.env.PORTS));
