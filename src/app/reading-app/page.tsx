import ReaderPageManager from "../components/ReaderPageManager/ReaderPageManager";
import { getUser } from "../lib/getUserServer";
import prisma from "../lib/prisma";
import OpenAI from "openai";
import { redirect } from "next/navigation";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const saveStats = async (stats: Stats) => {
  "use server";
  const stat = await prisma.stats.create({ data: stats });
};

function rebalanceAnswersIfNeeded(qaObj: Challenge) {
  const distribution = [0, 0, 0, 0];
  qaObj.correctAnswers.forEach((i) => distribution[i]++);
  const maxAllowed = Math.ceil(qaObj.correctAnswers.length / 2);
  const maxIndexUsed = Math.max(...distribution);

  // If distribution is okay, return as-is
  if (maxIndexUsed < maxAllowed) return qaObj;

  // Otherwise, rebalance the answer positions
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

  // Return updated object
  return rebalanceAnswersIfNeeded({
    ...qaObj,
    answers: newAnswers,
    correctAnswers: newCorrectAnswers,
  });
}

const storyGenres = [
  "Greek Mythology",
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
  "The Great Empires of History",
  "Explorers and Great Expeditions",
  "The Space Race",
  "The Solar System and Beyond",
  "Keeping Your Body and Mind Healthy",
  "The Human Brain and How It Works",
  "The Science of Emotions",
  "Great Women in History",
  "Medieval Times and the Age of Castles",
  "Folktales and Storytelling Around the World",
];

const page = async () => {
  let genre = storyGenres[Math.floor(Math.random() * storyGenres.length)];
  const getChallenge = async () => {
    "use server";
    try {
      console.log("Getting a new challenge from ChatGPT");
      const completion = openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          {
            role: "system",
            content:
              "You are a JSON-generating assistant designed to output high-quality educational reading comprehension tasks. Always format your output as a valid JSON object, with an accurate match between questions, answers, and the correctAnswers index. Always randomize the index of the correct answer in each question.",
          },
          {
            role: "user",
            content: `Act as a content generator for an educational web application. Generate a JavaScript-compatible object in the following format:
{
  "id": "1",
  "readingPiece": "A high quality story",
  "questions": ["question1", "question2", "question3", "question4", "question5"],
  "answers": [["answer1", "answer2", "answer3", "answer4"], ["answer1", "answer2", "answer3", "answer4"], ...],
  "correctAnswers": [index_of_correct_answer_for_each_question_starting_at_0]
}
Task:
    - Write a high-quality story based on true facts (~500 words) in the genre: ${genre}
    - Create 5 to 8 thoughtful and challenging multiple-choice questions based only on the content of the story.
    - Each question must have 4 possible answers, only one of which is correct.
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
      return await getChallenge();
    }
  };

  const user: User | null = await getUser();
  console.log(user);

  if (user === null) redirect("/api/auth/login");
  return (
    <>
      <ReaderPageManager getChallenge={getChallenge} user={user} saveResults={saveStats} />
    </>
  );
};

export default page;
