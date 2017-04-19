var script = require(__dirname+'/app/mysqlquery.js');

var ob = {userid : 1, date : 2, anger : 3, disgust : 4 , fear : 5,joy : 6,sadness : 7};
script.setEmotionTone(ob, function(obj) {
    console.log(obj);
});
