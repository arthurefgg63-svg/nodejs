const express = require("express");
const cors = require("cors");

const app = express();

app.disable("x-powered-by");

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"]
}));

app.use(express.json({
    limit: "1mb"
}));

app.use((req, res, next) => {

    console.log(
        `[${new Date().toISOString()}]`,
        req.method,
        req.url
    );

    next();
});

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "API ONLINE",
        status: 200
    });

});

app.post("/ai", async (req, res) => {

    try {

        const body = req.body;

        if (!body) {
            return res.status(400).json({
                success: false,
                error: "Body inválido"
            });
        }

        const message = body.message;

        if (
            typeof message !== "string" ||
            message.trim().length <= 0
        ) {
            return res.status(400).json({
                success: false,
                error: "Mensagem inválida"
            });
        }

        if (message.length > 200) {
            return res.status(400).json({
                success: false,
                error: "Mensagem muito grande"
            });
        }

        const cleanMessage = message
            .trim()
            .replace(/[<>]/g, "");

        const resposta = `IA: ${cleanMessage}`;

        return res.status(200).json({
            success: true,
            reply: resposta
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            error: "Erro interno"
        });

    }

});

app.use((req, res) => {

    res.status(404).json({
        success: false,
        error: "Rota não encontrada"
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(`Servidor rodando na porta ${PORT}`);

});
