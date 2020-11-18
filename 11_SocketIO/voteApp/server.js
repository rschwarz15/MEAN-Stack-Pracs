let express = require("express");
let path = require("path");
const { stringify } = require("querystring");
let app = express();
let server = require("http").Server(app);

let io = require("socket.io")(server);

let port = 8080;

app.use("/", express.static(path.join(__dirname, "dist/voteApp")));

// Define Poll Object
let pollObj = {
    question: "Select Your Favourite Sport",
    options: [
        { text: "Basketball", value: 0, count: 0 },
        { text: "AFL", value: 1, count: 0 },
        { text: "Soccer", value: 2, count: 0 },
        { text: "Rugby", value: 3, count: 0 },
        { text: "Hockey", value: 4, count: 0 },
        { text: "Tennis", value: 5, count: 0 },
        { text: "NFL", value: 6, count: 0 },
    ],
};

io.on("connection", socket => {
    console.log("New connection made from client with ID=" + socket.id);

    // Send the new user the current poll object
    socket.emit("pollObj", pollObj);

    // Recieve Votes
    socket.on("newVote", selectedValue => {
        message = "";
        // Update poll object
        for (let i = 0; i < pollObj.options.length; i++) {
            if (pollObj.options[i].value == selectedValue) {
                message = pollObj.options[i].text
                pollObj.options[i].count++;
                break;
            }
        }

        // Send message
        socket.emit("voteReturnEvent", {message: message})

        // Broadcast the new poll object
        io.sockets.emit("pollObj", pollObj);
    });

    // Reset Vote Counts
    socket.on("resetCounts", data => {
        // Update poll object
        for (let i = 0; i < pollObj.options.length; i++) {
            pollObj.options[i].count = 0;
        }

        // Broadcast the new poll object
        io.sockets.emit("pollObj", pollObj);
    });
});

server.listen(port, () => {
    console.log("Listening on port " + port);
});
