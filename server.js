const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let places = [];

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/add/place", (req, res) => {
    let data = {
        id: (places.length) ? places[places.length - 1].id + 1 : 1,
        name: req.body.name,
        location: req.body.location,
        place: req.body.place,
        reviews: []
    }
    places.push(data);
    res.send(data);
});

app.post("/place/:id/review", (req, res) => {
    let data = {
        name: req.body.name,
        stars: req.body.stars,
        body: req.body.body
    }
    let index;
    places.forEach((place, key) => {
        if (req.params.id == place.id)
            index = key;
    })
    places[index].reviews.push(data);
    res.send(data);
});
app.get("/place/:id/review", (req, res) => {
    let index;
    places.forEach((place, key) => {
        if (req.params.id == place.id)
            index = key;
    })
    res.send(places[index].reviews)
});

app.get("/places/:location/:place", (req, res) => {
    let arr = [];
    places.forEach(place => {
        if (place.place.toLowerCase() == req.params.place.toLowerCase() && place.location.toLowerCase() == req.params.location.toLowerCase())
            arr.push(place);
    });
    res.send(arr);
});

app.get("/place/:id", (req, res) => {
    let result;
    places.forEach((place, key) => {
        if (req.params.id == place.id)
            result = key;
    })
    res.send(places[result]);
});

app.put("/place/:id", (req, res) => {
    let result;
    places.forEach((place, key) => {
        if (req.params.id == place.id)
            result = key;
    })
    places[result].name = req.body.name;
    places[result].location = req.body.location;
    places[result].place = req.body.place;
    res.send({ message: "Place Updated Successfully", place: places[result] });
});

app.delete("/delete/:id", (req, res) => {
    places.forEach((place, key) => {
        console.log(req.params.id == place.id, req.params.id, place.id)
        if (req.params.id == place.id) {
            places.splice(key, 1);
        }
    })
    res.send({ message: "Deleted Successfully!", places: places });
});



// start the server
app.listen(port);