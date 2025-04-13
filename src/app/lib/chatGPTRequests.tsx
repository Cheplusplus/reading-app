import OpenAI from "openai";
import { ChatCompletionMessageParam, ChatModel } from "openai/resources.mjs";

export const getChatCompletion = async (input: string, model: ChatModel = "gpt-4o-mini", role: any = "user") => {
  if (role !== "function" || role !== "developer" || role !== "system" || role !== "user" || role !== "assistant" || role !== "tool") {
    console.log("The role is incorrect");
    return;
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = openai.chat.completions.create({
    model: model,
    store: true,
    messages: [
      {
        role: role,
        content: input,
      },
    ],
  });
  const result = await completion;
  const output = result.choices[0].message.content;

  return output;
};
