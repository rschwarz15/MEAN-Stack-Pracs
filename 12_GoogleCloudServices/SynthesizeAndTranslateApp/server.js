let express = require("express");
let path = require("path");
const { stringify } = require("querystring");
let app = express();
let server = require("http").Server(app);
const fs = require("fs");
let io = require("socket.io")(server);

let port = 8080;

// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");
const { Translate } = require('@google-cloud/translate').v2;

// Creates a client
const client = new textToSpeech.TextToSpeechClient();
const translate = new Translate({
    projectId: 'crafty-plateau-288612'
});
// Angular App to serve
app.use("/", express.static(path.join(__dirname, "dist/SynthesizeAndTranslateApp")));
app.use("/", express.static(path.join(__dirname, "mp3")));


io.on("connection", socket => {
    console.log("New connection made from client with ID=" + socket.id);

    socket.on("translationAndSynthesisEvent", data => {

        // Perform translation on return of promise
        doTranslate(data.text, data.language).then( translation => {
            // Send translated text back to user
            socket.emit("translatedTextEvent", {translatedText: translation});
            
            // Synthesise Speech
            synthSpeech(translation, data.accent, data.gender, socket)
        });
    });
});

server.listen(port, () => {
    console.log("Listening on port " + port);
});


function synthSpeech(text, accent, gender, socket) {
    const request = {
        input: { text: text },
        voice: { languageCode: accent, ssmlGender: gender },
        audioConfig: { audioEncoding: "MP3", "speakingRate": 1.5},
    };

    const filename = `mp3/${socket.id}.mp3`;

    // Performs the Text-to-Speech request
    client.synthesizeSpeech(request, (err, response) => {
        if (err) {
            console.error("ERROR:", err);
            return;
        }

        // Write the binary audio content to a local file
        fs.writeFile(filename, response.audioContent, "binary", err => {
            if (err) {
                console.error("ERROR:", err);
                return;
            }
            
            console.log(`Audio content written to file: ${filename}`);

            // let the client know that the user audio can be loaded
            socket.emit("audioFileReadyEvent")
        });
    });
}

async function doTranslate(text, language) {
    const [translation] = await translate.translate(text, language);
    return translation;
}

// $env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\rysch1\OneDrive\Documents\Uni\2020S2\FIT2095\keys\FIT2095.json"