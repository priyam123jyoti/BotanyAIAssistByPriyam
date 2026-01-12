import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

/**
 * PROTOCOL: Molecular Organism & Advanced Neural Analyzer (M.O.A.N.A.)
 * Used by AIHub.tsx for Career, Abroad, and Study Plan modes.
 */
export const startMoanaChat = (modeId: string) => {
  const modeInstructions: Record<string, string> = {
    'careers': "You are M.O.A.N.A., a Botany Career Specialist. Your knowledge base covers BSc/MSc opportunities, government exams (IFS, GATE, ARS), and Indian botanical industry roles. Provide structured, professional advice.",
    'abroad': "You are M.O.A.N.A., an expert in international botanical research. Focus on MSc/PhD opportunities in Europe and the USA, specializing in DAAD, Commonwealth, and Erasmus scholarships for Indian students.",
    'study-plan': "You are M.O.A.N.A., a scientific productivity optimizer. Help students organize botanical curricula, lab research schedules, and exam preparation (NEET, CUET, SET)."
  };

  const instruction = modeInstructions[modeId] || "You are M.O.A.N.A., a Molecular Organism & Advanced Neural Analyzer specializing in Botany.";

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
        console.error("M.O.A.N.A. Link Error:", error);
        return "ERROR: Connection to M.O.A.N.A. uplink failed. Check your network synchronization.";
      }
    },
    introMessage: `Neural Link Established. M.O.A.N.A. ${modeId.toUpperCase()} protocol active.`
  };
};

/**
 * PROTOCOL: The Quiz Master (Curriculum-Aligned)
 * Generates questions based on Academic Botany Syllabi (HS to MSc).
 */
export const generateMoanaQuiz = async (topic: string) => {
  
  const difficultyLevels = [
    "Higher Secondary (Class 11/12) - NEET Level",
    "Undergraduate (BSc) - Core Concepts",
    "Postgraduate (MSc) - Analytical & Applied"
  ];
  const selectedLevel = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];

  const prompt = `
    Generate a technical Botany quiz on: "${topic}".
    
    TARGET PARAMETERS: 
    - Complexity Level: ${selectedLevel}
    - Standards: NCERT / UGC Botany Syllabus.
    - Exclude: Pure research-grade PhD data or irrelevant trivia.
    
    PEDAGOGICAL STRATEGY:
    - 70% Core Syllabus Focus (High-yield exam concepts).
    - 30% Critical Thinking/Application.
    - Reinforce knowledge through variation of key concepts (Spaced Repetition).
    
    JSON STRUCTURE:
    Return exactly 10 questions in a JSON object with a "questions" array.
    Required keys: "question", "options" (4 strings), "correct" (0-3), "explanation".
  `;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are M.O.A.N.A., a precise Botanical Intelligence. You prioritize academic accuracy and curriculum relevance. Output ONLY valid JSON." 
        },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.6,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) throw new Error("Null response from M.O.A.N.A. core.");

    const data = JSON.parse(content);
    const questions = data.questions || data.quiz || [];
    
    if (questions.length === 0) throw new Error("Empty data buffer.");

    return questions;

  } catch (error) {
    console.error("M.O.A.N.A. Quiz Generation Error:", error);
    return [{
      question: "Neural Sync Error: M.O.A.N.A. could not retrieve data. Re-initialize?",
      options: ["Re-sync Uplink", "System Refresh", "Database Check", "Contact Support"],
      correct: 0,
      explanation: "This occurs during network instability or corrupted JSON packets from the AI provider."
    }];
  }
};

// At the bottom of src/services/moanaAI.ts

export const startJarvisChat = startMoanaChat;
export const generateBotanyQuiz = generateMoanaQuiz;