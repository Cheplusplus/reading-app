import OpenAI from "openai";

const storyGenres = [
  "Great Women in History",
  "Norse Mythology",
  "Ancient African Mythology",
  "Ancient Egyptian Mythology",
  "Myths and Legends of Asia",
  "Nature and Wildlife",
  "Dinosaurs and Prehistoric Life",
  "Climate Change and the Environment",
  "Underwater Exploration and Ocean Life",
  "Robotics and Engineering",
  "Artificial Intelligence and the Future",
  "How Computers Work",
  "The History of Flight and Aviation",
  "Inventions That Changed the World",
  "Historical Events",
  "World War I or World War II",
  "Greek Mythology",
  "The Great Empires of History",
  "Explorers and Great Expeditions",
  "The Space Race",
  "The Solar System and Beyond",
  "Keeping Your Body and Mind Healthy",
  "The Human Brain and How It Works",
  "The Science of Emotions",
  "Medieval Times and the Age of Castles",
  "Folktales and Storytelling Around the World",
  "Women in STEM: Pioneers of Science and Innovation",
  "The History of Medicine and Breakthrough Discoveries",
  "Secret Codes and the History of Cryptography",
  "The Industrial Revolution and How It Transformed the World",
  "The Age of Exploration: Trade, Culture, and Conflict",
  "Legends of the Indigenous Peoples of the Americas",
  "The Silk Road: Trade, Culture, and Exchange",
  "The Science of Sound and Music",
  "The Physics of Sports and Movement",
  "Extreme Weather and Natural Disasters",
  "Life in the Deepest Parts of the Ocean",
  "How the Internet Works: From Cables to Cloud",
  "The History of Space Exploration",
  "Mars and the Search for Life on Other Planets",
  "The Science of Sleep and Dreams",
  "How Plants Communicate: The Secret Life of Flora",
  "The History of Written Language and Scripts",
  "Famous Historical Hoaxes and Mysteries",
  "Engineering Marvels: From Bridges to Skyscrapers",
  "The Story of Money: From Barter to Blockchain",
  "The History and Science of Vaccines",
  "The Evolution of Music Through the Ages",
  "Everyday Chemistry: The Science Behind Daily Life",
  "The Power of Volcanoes and Plate Tectonics",
  "Cave Art and Early Human Creativity",
  "Animal Superpowers: Incredible Adaptations in Nature",
  "The History of Timekeeping: Calendars and Clocks",
  "Food Science: The Chemistry of Cooking",
  "The Science of Illusions and Optical Tricks",
  "How Languages Evolve and Change Over Time",
  "The History of Printing: From Scrolls to Digital Media",
  "Mythical Creatures Across Cultures",
  "The Science of Space-Time and Relativity",
  "The Origins of Democracy and Political Systems",
  "The History of Transportation: Wheels to Hyperloops",
  "The Art and Science of Cartography",
  "Bioluminescence: Nature’s Living Lights",
  "The World’s Most Mysterious Archaeological Discoveries",
  "The Science of Viruses and How They Spread",
  "The Hidden World of Microorganisms",
  "The Power of Storytelling in Human History",
  "The History of Fashion and Cultural Identity",
  "The Psychology of Decision Making",
  "How Buildings Survive Earthquakes: Earthquake Engineering",
  "The History of Mathematics: From Zero to Infinity",
  "Dream Jobs of the Future: Careers in Emerging Tech",
  "The Evolution of Human Communication",
  "The Science of Color and How We Perceive It",
  "The Role of Animals in Human History",
  "Lost Civilizations and What They Left Behind",
  "The Physics of Roller Coasters and Amusement Rides",
  "The History of Toys and Games Around the World",
  "How Art Influences Society and Vice Versa",
  "The World’s Most Unique Ecosystems",
  "Ancient Inventions That Still Influence Us Today",
  "The Science of Memory and How We Learn",
  "The Deep History of Trade and Global Connection",
  "The Journey of a Book: From Idea to Shelf",
  "Famous Speeches That Changed the World",
  "How the Brain Processes Language and Speech",
];

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const checkIfLooseDistribution = (qaObj: Challenge) => {
  const distribution = [0, 0, 0, 0];
  qaObj.correctAnswers.forEach((i) => distribution[i]++);
  console.log(distribution);
  const maxAllowed = Math.ceil(qaObj.correctAnswers.length / 2);
  const maxIndexUsed = Math.max(...distribution);

  // If distribution is okay, return as-is
  if (maxIndexUsed < maxAllowed) return true;
  return false;
};

type ShuffledAnswers = {
  newAnswers: string[][];
  newCorrectAnswers: number[];
};

export const shuffleAnswers = (qaObj: Challenge): ShuffledAnswers => {
  const newCorrectAnswers: number[] = [];
  const newAnswers = qaObj.answers.map((options, idx) => {
    const correctIndex = qaObj.correctAnswers[idx];
    const correctAnswer = options[correctIndex];

    // Shuffle the options
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Find new index of the correct answer
    const newIndex = shuffled.indexOf(correctAnswer);
    newCorrectAnswers.push(newIndex);

    return shuffled;
  });
  return { newAnswers, newCorrectAnswers };
};

export const rebalanceAnswersIfNeeded = (qaObj: Challenge): Challenge => {
  if (checkIfLooseDistribution(qaObj)) return qaObj;
  // Otherwise, rebalance the answer positions
  const { newAnswers, newCorrectAnswers } = shuffleAnswers(qaObj);
  // Return updated object
  return rebalanceAnswersIfNeeded({
    ...qaObj,
    answers: newAnswers,
    correctAnswers: newCorrectAnswers,
  });
};

export const getChallenge = async (difficulty: "beginner" | "intermediate" | "expert"): Promise<Challenge | undefined> => {
  "use server";
  try {
    let genre = storyGenres[Math.floor(Math.random() * storyGenres.length)];

    console.log("Getting a new challenge from ChatGPT");
    const completion = openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          role: "system",
          content:
            "You are a JSON-generating assistant designed to output high-quality educational reading comprehension tasks. You are to find paragraphs in real books and websites and use those rather than making up your own as far as possible. Always format your output as a valid JSON object, with an accurate match between questions, answers, and the correctAnswers index. Always randomize the index of the correct answer in each question.",
        },
        {
          role: "user",
          content: `You are highly passionate about your job teaching people about all sorts of topics. You don't like to use the same topics over and over so you come up with new and exciting things even if it's a topic you've spoken about before. You always try to be original. Act as a highly skilled content generator, with 30 years of experience, for an educational web application on reading comprehension. Generate a JavaScript-compatible object in the following format:
                      {
                        "id": "1",
                        "readingPiece": "A high quality story",
                        "questions": ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8"],
                        "answers": [["answer1", "answer2", "answer3", "answer4"], ["answer1", "answer2", "answer3", "answer4"], ...],
                        "correctAnswers": [index_of_correct_answer_for_each_question_starting_at_0]
                      }
                      Task:
                          - The student you are preparing work for today reads at a ${difficulty} level
                          - Find a high quality paragraph from a real book (~500 words) in the genre: ${genre}. 
                          - Create 5 to 8 thoughtful multiple-choice questions based only on the content of the story.
                          - Each question must have 4 possible answers, only one of which is correct, ensure none of the other answers could possibly be correct.
                          - Ensure the index of each correct answer in the 'answers' array matches the corresponding number in the 'correctAnswers' array.
                          - Randomize the position of the correct answer in each answers array — it should not always be index 0.
                          - Avoid using any special characters like '+' for string concatenation.
                          - Ensure the format is valid JSON (JavaScript-friendly), and the object is complete.`,
        },
      ],
    });
    const result = await completion;
    const output = result.choices[0].message.content;
    if (output) {
      let start = output.indexOf("{");
      let end = output.lastIndexOf("}") + 1;
      let json = output.substring(start, end);
      json = json.replace(/[\r\n]+/g, "");
      return rebalanceAnswersIfNeeded(await JSON.parse(json));
    }
  } catch {
    return await getChallenge(difficulty);
  }
};
