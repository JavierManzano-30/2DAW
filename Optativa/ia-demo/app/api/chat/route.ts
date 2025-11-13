import { UIMessage, convertToModelMessages, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const uiMessagesWithoutId = (messages as Array<UIMessage>).map(
    ({ id, ...rest }) => {
      void id;
      return rest;
    }
  );

  const modelMessages = convertToModelMessages(uiMessagesWithoutId);

  const response = await streamText({
    model: openai("gpt-4o-mini"), // o el modelo que prefieras
    messages: modelMessages,
  });

  return response.toUIMessageStreamResponse();
}
