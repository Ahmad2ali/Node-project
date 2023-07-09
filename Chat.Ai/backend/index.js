import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  organization: "",
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.post("/", async (request, response) => {
  const { chats } = request.body;

  const result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a EbereGPT. You can help with graphic design tasks",
      },
      ...chats,
    ],
  });

   response.json({

    output: result.data.choices[0].message,
   });
   
});

