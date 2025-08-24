const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const ai = new GoogleGenerativeAI(process.env.API_KEY_AI);

async function generateAiResponse(prompt) {
  const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(prompt);
  
  return result.response.text();
}

module.exports = generateAiResponse;
