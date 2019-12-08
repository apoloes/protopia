const express = require('express');
const request = require('request');
const fs = require('fs')
const path = require('path');
const cors = require('cors');
// const {Storage} = require('@google-cloud/storage');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_URL = process.env.SENDGRID_URL;
//const allowedOrigins = ['http://localhost:8000', 'http://localhost:8080'];

app.use(express.static(path.join(__dirname, "/client")));

app.use(cors({
    // origin: function(origin, callback){
    //     if(!origin) return callback(null, true);
    //     if(allowedOrigins.indexOf(origin) === -1){
    //         var msg = 'The CORS policy for this site does not ' +
    //             'allow access from the specified Origin.';
    //         return call back(new Error(msg), false);
    //     }
    //     return callback(null, true);
    // }
}));

// Creates a client
// const storage = new Storage({
//     keyFilename: "./hermes-27600-2995a52d1b9a.json",
//     projectId: "hermes-27600"
// });
//
// const bucket = storage.bucket('protopia-comp523');

/* ---------- Routes ---------- */
// app.get('/api/asks', (req, res)=>{
//     request({
//         url: SERVER + '/asks/all',
//         json: true
//     }, function (error, response, body) {
//         if (error) {
//             console.log(error);
//         } else {
//             res.send(body);
//             // const jsonString = JSON.stringify(body);
//             // fs.writeFile('./file.json', jsonString, err => {
//             //     if (err) {
//             //         console.log('Error writing file', err)
//             //     } else {
//             //         console.log('Successfully wrote file');
//             //         res.send(body);
//             //         const filename = './file.json';
//             //
//             //         bucket.upload(filename, {
//             //             gzip: true,
//             //             metadata: {
//             //                 cacheControl: 'no-cache',
//             //             },
//             //         });
//             //         console.log(`${filename} uploaded to ` + bucket.);
//             //     }
//             // });
//         }
//     });
// });

app.get('/api/open', (req, res)=>{
    request({
        url: SENDGRID_URL,
        headers: {
            authorization: 'Bearer ' + SENDGRID_API_KEY
        }
    }, function(error, response, body) {
        if (error) {console.log(error);}
        else {
            res.send(body);
        }
    })
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/dist");
});

//Start server
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

module.exports = app;