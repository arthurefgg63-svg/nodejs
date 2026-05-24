 const express = require("express")

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("IA ONLINE")
})

app.post("/chat", async (req, res) => {

    const message = req.body.message || "oi"

    res.json({
        reply: "Você disse: " + message
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT)
})
