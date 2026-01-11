import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

/**
 * PROTOCOL: Conversational Intelligence
 * Used by AIHub.tsx for Career, Abroad, and Study Plan modes.
 */
export const startJarvisChat = (modeId: string) => {
  const modeInstructions: Record<string, string> = {
    'careers': "You are JARVIS, a Botany Career Specialist. Focus on MSc/PhD and Industry in India. Provide specific company names and research institutes.",
    'abroad': "You are JARVIS. Expert in German DAAD scholarships, European Botany PhDs, and international research grants.",
    'study-plan': "You are JARVIS, a productivity coach for scientists. Help organize botanical research and exam preparation."
  };

  const instruction = modeInstructions[modeId] || "You are JARVIS, a Botany Research Assistant.";

  return {
    sendMessage: async (userInput: string, chatHistory: any[]) => {
      try {
        const response = await groq.chat.completions.create({
          messages: [
            { role: "system", content: instruction },
            ...chatHistory,
            { role: "user", content: userInput }
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
        });
        return response.choices[0]?.message?.content ?? "Neural Link Interrupted.";
      } catch (error) {
        console.error("Groq Chat Error:", error);
        return "ERROR: Connection to Jarvis uplink failed.";
      }
    },
    introMessage: `Neural Link Established. Jarvis ${modeId.toUpperCase()} protocol active.`
  };
};

/**
 * PROTOCOL: The Quiz Master (Upgraded for Infinite Variety)
 * Used by BotanyQuiz.tsx to generate non-repeating questions.
 */
export const generateBotanyQuiz = async (topic: string) => {
  // 1. Entropy Injection: Randomly pick a sub-focus to force variety
  const focusAreas = [
    "molecular mechanisms & DNA", 
    "structural morphology & anatomy", 
    "evolutionary phylogeny & history", 
    "biochemical pathways & photosynthesis", 
    "economic botany & industry use", 
    "ecological interactions & environment",
    "advanced taxonomic classification",
    "plant pathology & defense mechanisms"
  ];
  const selectedFocus = focusAreas[Math.floor(Math.random() * focusAreas.length)];
  
  // 2. Seed Injection: Changes the AI's weight calculation for every request
  const randomSeed = Math.floor(Math.random() * 1000000);

  const prompt = `
    Generate a highly specialized Botany quiz on the topic: "${topic}".
    
    VARIETY CONSTRAINTS:
    - Primary Focus Area: ${selectedFocus}
    - Difficulty: Academic/Expert (CSIR-NET, GATE, and MSc Level).
    - Random Seed: ${randomSeed}
    - Rule: Do not repeat standard introductory questions. Focus on advanced scientific concepts.
    
    JSON STRUCTURE:
    Return exactly 10 questions in a JSON object with a "questions" array.
    Each question must contain: 
    "question" (string), 
    "options" (array of 4 strings), 
    "correct" (integer 0-3), 
    "explanation" (detailed scientific reason).
  `;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are JARVIS, the supreme Botany Research Intelligence. You output ONLY valid JSON. You vary your questions infinitely." 
        },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.85, // Higher temperature = Higher variety
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No data received from Groq.");
    }

    const data = JSON.parse(content);
    
    // Safety check for the array key
    const questions = data.questions || data.quiz || [];
    
    if (questions.length === 0) {
      throw new Error("Quiz array is empty.");
    }

    return questions;

  } catch (error) {
    console.error("Jarvis Quiz Generation Error:", error);
    // Return a fallback question if the AI fails completely
    return [{
      question: "Neural Link Error: The system could not generate questions. Retry?",
      options: ["Reconnect Session", "Refresh Page", "Check API Key", "Contact Support"],
      correct: 0,
      explanation: "This occurs when the AI provider is overloaded or the JSON format was corrupted."
    }];
  }
};