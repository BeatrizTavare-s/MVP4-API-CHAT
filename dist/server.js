"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openai_1 = __importDefault(require("openai"));
require("dotenv/config");
const limitGlobalDaily_1 = __importDefault(require("./limitGlobalDaily"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/chat', limitGlobalDaily_1.default);
app.get('/chat', async (req, res) => {
    const openai = new openai_1.default({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const prompt = req.query.prompt;
    if (prompt) {
        try {
            console.log(`Processing prompt: ${prompt}`);
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
            });
            return res.send(response.choices[0].message.content);
        }
        catch (err) {
            console.error(err);
            return res.status(500).send('An error occurred');
        }
    }
    return res.status(200).send('Not prompt find');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
