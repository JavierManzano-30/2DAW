'use client';

import { ChangeEvent, FormEvent, useState } from "react";
import { useChat } from "@ai-sdk/react";

export default function Home() {
  const { messages, sendMessage, status, error, stop, clearError } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim() || status === "streaming") {
      return;
    }

    setIsSubmitting(true);
    clearError();

    sendMessage({ text: inputValue })
      .catch(() => {
        // error is handled by the hook, so we just keep this for clarity.
      })
      .finally(() => {
        setIsSubmitting(false);
        setInputValue("");
      });
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex min-h-screen justify-center bg-zinc-100 p-6 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="flex w-full max-w-2xl flex-col gap-6">
        <header className="space-y-2 text-center sm:text-left">
          <h1 className="text-3xl font-semibold">Chat IA con Vercel AI SDK</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Escribe un mensaje y recibe respuestas en tiempo real desde tu API
            `app/api/chat/route.ts`.
          </p>
        </header>

        <section className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-3">
            {error && (
              <div className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-500">
                {error.message}
              </div>
            )}
            {messages.length === 0 ? (
              <p className="text-sm text-zinc-500">
                Comienza enviando un mensaje para iniciar la conversación.
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-end text-right"
                      : "justify-start text-left"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    }`}
                  >
                    <span className="block text-xs font-medium uppercase tracking-wide opacity-70">
                      {message.role === "user" ? "Tú" : "IA"}
                    </span>
                    {message.parts
                      .map((part) =>
                        part.type === "text"
                          ? part.text
                          : part.type === "file"
                          ? "[archivo adjunto]"
                          : "[contenido]"
                      )
                      .join("")}
                  </div>
                </div>
              ))
            )}
          </div>

          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 border-t border-zinc-200 pt-3 dark:border-zinc-800"
          >
            <input
              className="flex-1 rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-blue-500 dark:border-zinc-700 dark:focus:border-blue-400"
              placeholder="Escribe algo..."
              value={inputValue}
              onChange={onChange}
              disabled={status === "streaming" || isSubmitting}
            />
            <button
              type="submit"
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
              disabled={
                status === "streaming" ||
                isSubmitting ||
                inputValue.trim().length === 0
              }
            >
              {status === "streaming" || isSubmitting ? "Enviando..." : "Enviar"}
            </button>
            {(status === "streaming" || isSubmitting) && (
              <button
                type="button"
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                onClick={() => stop()}
              >
                Detener
              </button>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}
