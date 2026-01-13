import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

/**
 * IDENTITY PROTOCOL
 * Maker: Priyamjyoti Dihingia
 */
const MOANA_IDENTITY = `You are M.O.A.N.A. (Molecular Organism & Advanced Neural Analyzer). 
Created by Priyamjyoti Dihingia. 
You are a master of Physics, Chemistry, Botany, and Zoology curriculum spanning HS, BSc, and MSc levels.`;

/**
 * PROTOCOL: Examination Engine (Infinite Variety)
 */
export const generateMoanaQuiz = async (topic: string, subject: string) => {
  const levels = ["HS Level (NEET/NCERT)", "BSc Level (Core Academic)", "MSc Level (Analytical/Research)"];
  const selectedLevel = levels[Math.floor(Math.random() * levels.length)];

  const prompt = `
    COMMAND: Generate 10 High-Fidelity Quiz Questions.
    SUBJECT: ${subject} | MODULE: ${topic} | DEPTH: ${selectedLevel}
    
    VARIABILITY PROTOCOL:
    1. NO REPETITION: Use deep curriculum details.
    2. DISTRACTOR ROTATION: Create NEW plausible wrong options for every round.
    3. LINGUISTIC VARIANCE: Vary sentence structure.
    
    Return exactly 10 questions in a JSON array.
    Required keys: "question", "options" (4 strings), "correct" (0-3), "explanation".
  `;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: `${MOANA_IDENTITY} Output ONLY valid JSON.` },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.9,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("Null response");
    const data = JSON.parse(content);
    return data.questions || data.quiz || (Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("M.O.A.N.A. SYNC ERROR:", error);
    return [];
  }
};

/**
 * PROTOCOL: Neural Link Chat (Restored for App Compatibility)
 * This fixes the 'startJarvisChat' missing export error.
 */
export const startJarvisChat = (modeId: string, subject: string = 'Botany') => {
  const instruction = `${MOANA_IDENTITY} You are currently in ${modeId.toUpperCase()} mode for the subject: ${subject}. Provide expert scientific guidance.`;

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
        console.error("M.O.A.N.A. Chat Error:", error);
        return "ERROR: Connection to M.O.A.N.A. uplink failed.";
      }
    },
    introMessage: `Neural Link Established. M.O.A.N.A. active for ${subject.toUpperCase()}.`
  };
};

// Aliases to ensure all old imports still work
export const startMoanaChat = startJarvisChat;
export const generateBotanyQuiz = generateMoanaQuiz;