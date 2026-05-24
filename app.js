const express = require("express")
const { GoogleGenerativeAI } = require("@google/generative-ai")

const app = express()

app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY)

app.post("/chat", async (req, res) => {

    try {

        const pergunta = req.body.message

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        })

        const result = await model.generateContent(pergunta)

        const resposta = result.response.text()

        res.json({
            reply: resposta
        })

    } catch(err) {

        console.log(err)

        res.json({
            reply: "Erro na IA"
        })
    }
})

app.get("/", (req, res) => {
    res.send("IA online")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando")
})
