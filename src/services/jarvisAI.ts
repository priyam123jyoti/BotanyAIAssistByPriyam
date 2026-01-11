import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

// PROTOCOL 1, 2 & 4: Conversational (Careers, Abroad, Study Plan)
export const startJarvisChat = (modeId: string) => {
  const modeInstructions: Record<string, string> = {
    'careers': "You are JARVIS, a Botany Career Specialist. Focus on MSc/PhD and Industry in India.",
    'abroad': "You are JARVIS. Expert in German DAAD scholarships and European Botany PhDs.",
    'study-plan': "You are JARVIS, a productivity coach for scientists."
  };
  const instruction = modeInstructions[modeId] || "You are JARVIS, a Botany Research Assistant.";

  return {
    sendMessage: async (userInput: string, chatHistory: any[]) => {
      const response = await groq.chat.completions.create({
        messages: [{ role: "system", content: instruction }, ...chatHistory, { role: "user", content: userInput }],
        model: "llama-3.3-70b-versatile",
      });
      // Fix: Use optional chaining and fallback to empty string
      return response.choices[0]?.message?.content ?? "";
    },
    introMessage: `Neural Link Established. Jarvis ${modeId.toUpperCase()} protocol active.`
  };
};

// PROTOCOL 3: The Quiz Master (Structured Data)
export const generateBotanyQuiz = async (topic: string) => {
  const prompt = `Generate a Botany quiz on "${topic}". Return exactly 10 questions in JSON.
  Each question MUST have: "question", "options" (array of 4), "correct" (0-3), and "explanation".`;

  const response = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "You are a Botany Professor. Output ONLY valid JSON." },
      { role: "user", content: prompt }
    ],
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" }
  });

  // --- FIX START ---
  // We extract the content and check if it exists before parsing
  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Jarvis failed to generate quiz data. Please try again.");
  }

  const data = JSON.parse(content);
  // --- FIX END ---
  
  return data.questions; 
};