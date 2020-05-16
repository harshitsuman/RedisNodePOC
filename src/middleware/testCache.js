const redis = require("redis");
const dJSON = require("dirty-json");

module.exports = async (req,res,next) => {

    const cacheConnection = await redis.createClient(
        process.env.PORT,
        process.env.REDISCACHEHOSTNAME,
        {auth_pass: process.env.REDISCACHEKEY,
        tls: {servername: process.env.REDISCACHEHOSTNAME},
        ssl : {SSL : process.env.SSL},
        abortConnect : {ABORTCONNECT : process.env.ABORTCONNECT}
        });

        cacheConnection.on('error', (err) => {
            console.log("Connection error " + err);
            next(err);
          });
        var device_id = ['864495034011418', '860194032754863']
        cacheConnection.get('864495034011418',(err,reply) => {
            if(err){
            console.log("Error in get function : " + err);
            next(err);
            }else{
                var jval = dJSON.parse(reply);
                req.responseObj = JSON.stringify(jval,['deviceSerialNumber','latitude','longitude', 'speed'],2);
                next();
            }
        });
}