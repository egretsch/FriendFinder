var path = require("path");

module.exports = function (app) {

    const friends = ("../data/friends.js") 

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        res.sendFile(path.join(__dirname, "../data/friends.js"));
    });
}