const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
    const event = req.body;

    events.push(event);

    await axios
        .post("http://posts-clusterip-srv:4000/events", event)
        .catch((err) => {
            console.log(err.message);
        });
    // await axios.post("http://localhost:4001/events", event).catch((err) => {
    //     console.log(err.message);
    // });
    // await axios.post("http://localhost:4002/events", event).catch((err) => {
    //     console.log(err.message);
    // });
    // await axios.post("http://localhost:4003/events", event).catch((err) => {
    //     console.log(err.message);
    // });

    res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
    res.send(events);
});

const port = 4005;
app.listen(port, () => {
    console.log(`Listening on port : ${port}`);
});
