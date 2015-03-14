process.title = "jikes!";
var basePath = process.argv[2] || ".";

var Jikes = require("./lib/Jikes.js");
var jikes = new Jikes(basePath);
jikes.listen(80);

console.log("Started jikes @ "+basePath);

