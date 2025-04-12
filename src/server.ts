import express from 'express'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger'; 
import OpenAI from "openai";
import 'dotenv/config'
import limitGlobalDaily from './limitGlobalDaily'
const app = express()
const port = Number(process.env.PORT) || 3000;

app.use('/chat', limitGlobalDaily); 
// Swagger route

app.get('/', (req, res) => {
  res.send({content:'API online 🔥'});
});


/**
 * @openapi
 * /chat:
 *   get:
 *     summary: Gera uma resposta do modelo da OpenAI
 *     parameters:
 *       - in: query
 *         name: prompt
 *         required: true
 *         schema:
 *           type: string
 *         description: Prompt a ser enviado para o modelo
 *     responses:
 *       200:
 *         description: Resposta gerada
 *       500:
 *         description: Erro interno
 */
app.get('/chat', async (req: any, res: any) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const prompt = req.query.prompt;
  if (prompt) {
    try{
      console.log(`Processing prompt: ${prompt}`);
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      });
      return res.json({content:response.choices[0].message.content});
    }catch(err){
      console.error(err);
      return res.status(500).json({content:'An error occurred'});
    }
  }
  return res.status(200).json({content: 'Not prompt find'});
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, '0.0.0.0', () => {
   console.log(process.env.PORT)
  console.log(`API de cronograma de estudos rodando na porta: ${port}`)
})