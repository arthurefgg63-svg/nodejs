const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API online!");
});

app.post("/chat", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Mensagem não enviada"
            });
        }

        const resposta = "Você disse: " + message;

        res.json({
            reply: resposta
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            error: "Erro interno do servidor"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
