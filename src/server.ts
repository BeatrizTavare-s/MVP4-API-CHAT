import express from 'express'
import OpenAI from "openai";
import 'dotenv/config'
import limitGlobalDaily from './limitGlobalDaily'
const app = express()
const port = process.env.PORT || 3000;

app.use('/chat', limitGlobalDaily); 

app.get('/', (req, res) => {
  res.send('API online 🔥');
});

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
      return res.send(response.choices[0].message.content);
    }catch(err){
      console.error(err);
      return res.status(500).send('An error occurred');
    }
  }
  return res.status(200).send('Not prompt find');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})