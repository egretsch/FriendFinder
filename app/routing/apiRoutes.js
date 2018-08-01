var path = require("path");
const friends = require("../data/friends.js")

// console.log(friends);

module.exports = function (app) {

    // alows the data to be taken in so user can find match
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    // matches users data with others  and returns a Response
    app.post("/api/friends", function (req, res) {
        console.log("this is our req.body: ", req.body);
        

        var Friend = function(name, photo, scores){
            this.name = name;
            this.photo = photo;
            this.scores = scores.map(score => parseInt(score));
        }
        
            
        var newFriend = new Friend(req.body.name, req.body.photo, req.body.scores);

        console.log("this is our newFriend: ", newFriend);


        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        let totalMatch = [];
        for (let i = 0; i < friends.length; i++) {
            let matchScore = [];
            for (let y = 0; y < newFriend.scores.length; y++) {
                matchScore.push(Math.abs(newFriend.scores[y] - friends[i].scores[y]));
                
            }
            totalMatch.push(matchScore);
        }

        let chosenFriendArray = [];

        for (let i = 0; i < totalMatch.length; i++) {
            chosenFriendArray.push(totalMatch[i].reduce(reducer));
        }
        let matchFrendIndex = Math.min.apply(null, chosenFriendArray);
        let friendDataIndex = chosenFriendArray.indexOf(matchFrendIndex);
        let matchedFriend = friends[friendDataIndex];
        friends.push(newFriend);
        res.json(matchedFriend);
    });
}