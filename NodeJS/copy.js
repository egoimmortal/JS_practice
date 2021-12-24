const fs = require("fs");
const path = require("path");

fs.writeFile(__dirname + path.sep + 'test_write.txt', 'Nodejs!!!', function(err){
    if(err)
        console.log(err);
    else
        console.log("Write complete!");
});