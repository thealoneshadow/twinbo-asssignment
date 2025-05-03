const geminiAIValidator = {};
const { GoogleGenerativeAI } = require("@google/generative-ai");

geminiAIValidator.gemini = (body) => {
  return new Promise(async (resolve, reject) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
      const { prompt, history } = body;
      if (!prompt) reject("Missing Prompt");

      let chats = "";
      for(let i=0;i<history.length;i++){

        const chat = history[i];
        if (chat.role === "user") {
          chats += `User: ${chat.message}\n`;
        } else if (chat.role === "assistant") {
          chats += `Assistant: ${chat.message}\n`;
        }
      }

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const modifiedPrompt = `
      user Query : ${prompt}

      Guidelines: 
      Consider yourself as a cool and funny AI assistant(Kinda WhatsApp chatbot but clever one).
      Help the user if he needs help and guide him to the right path.

      History of chats:
      ${chats}

      Always read if history is there and answer based on that 
      `;


      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      resolve(text);
    } catch (err) {
      console.error(err);
      reject("AI  is Sleeping talk to you later");
    }
  });
};

module.exports = geminiAIValidator;
