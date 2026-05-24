const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API ONLINE");
});

app.post("/ai", (req, res) => {

    const message = req.body.message || "oi";

    res.json({
        reply: "IA: " + message
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Servidor online");
});
