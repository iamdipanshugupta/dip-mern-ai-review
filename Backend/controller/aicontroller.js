export const Homepagecontroller = (req, res) => {
  res.send("Welcome to the AI homepage");
};
import generateAiResponse from "../src/ai.service.js";
export const AIPromptController = async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "missing prompt" });
  }

  try {
    const response = await generateAiResponse(prompt);
    return res.json({ response });   
  } catch (error) {
    console.error("AI ERROR =>", error);
    return res.status(500).json({ error: "something went wrong" });
  }
};
