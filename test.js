var script = require(__dirname+'/app/mysqlquery.js');

script.getEmotionTone(10,1, function(obj) {
    console.log("Done\n");
});