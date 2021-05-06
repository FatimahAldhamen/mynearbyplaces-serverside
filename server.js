const express = require("express");
const cors = require("cors");
const db = require("./db.js");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("This is mynearbyplaces API!");
});

app.post("/add/place", async(req, res) => {
    let queryString =
        "INSERT INTO public.places (name,location,place,rating) VALUES ($1,$2,$3,$4);";
    let result = await db.query(queryString, [
        req.body.name,
        req.body.location,
        req.body.place,
        "",
    ]);
    res.send(result);
});

app.post("/place/:id/review", async(req, res) => {
    let data = {
        name: req.body.name,
        stars: req.body.stars,
        body: req.body.body,
    };

    let queryString = "UPDATE public.places SET rating =$1 WHERE id= $2;";
    let result = await db.query(queryString, [data, req.params.id]);
    res.send(result);
});
app.get("/place/:id/review", async(req, res) => {
    let queryString = "SELECT rating FROM public.places WHERE id = $1;";
    let result = await db.query(queryString, [req.params.id]);
    res.send(result.rows[0].rating);
});

app.get("/places/:location/:place", async(req, res) => {
    let queryString =
        "SELECT * FROM public.places WHERE location = $1 AND place = $2;";
    let result = await db.query(queryString, [
        req.params.location,
        req.params.place,
    ]);
    res.send(result.rows);
});

app.get("/place/:id", async(req, res) => {
    let queryString = "SELECT * FROM public.places WHERE id = $1;";
    let result = await db.query(queryString, [req.params.id]);
    res.send(result.rows);
});

app.put("/place/:id", async(req, res) => {
    let queryString =
        "UPDATE public.places SET name =$1,location=$2,place=$3 WHERE id= $4;";
    let result = await db.query(queryString, [
        req.body.name,
        req.body.location,
        req.body.place,
        req.params.id,
    ]);
    // res.send(result);
    res.send({ message: "Place Updated Successfully", place: result });
});

app.delete("/delete/:id", async(req, res) => {
    let queryString = "DELETE FROM public.places WHERE id=$1; ";
    let result = await db.query(queryString, [req.params.id]);
    res.send({ message: "Deleted Successfully!", places: result });
});

// start the server
app.listen(port);