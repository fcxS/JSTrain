const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static('public'));
app.use(express.json({
    limit: '1mb'
}));

//const database = new Datastore('shiffman.db'); // to get working with cam
const database = new Datastore('database2.db');
database.loadDatabase();


app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    })
});

app.post('/api', (request, response) => {
    console.log("Tengo una request");
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});