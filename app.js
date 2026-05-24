const express = require("express")
const { GoogleGenerativeAI } = require("@google/generative-ai")

const app = express()

app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY)

app.post("/chat", async (req, res) => {

    try {

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        })

        const result = await model.generateContent(req.body.message)

        res.json({
            reply: result.response.text()
        })

    } catch(err) {

        console.log(err)

        res.json({
            reply: "Erro"
        })
    }
})

app.listen(process.env.PORT || 3000)
