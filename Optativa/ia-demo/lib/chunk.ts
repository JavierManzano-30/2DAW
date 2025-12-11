// Simple chunker: splits by paragraphs and caps chunk size roughly by characters.
export const chunkText = (text: string, maxChars = 1200) => {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  for (const para of paragraphs) {
    if (para.length <= maxChars) {
      chunks.push(para);
      continue;
    }
    // If paragraph is large, split by sentences.
    const sentences = para.split(/(?<=[.!?])\s+/);
    let buffer = "";
    for (const sentence of sentences) {
      if ((buffer + " " + sentence).trim().length > maxChars && buffer) {
        chunks.push(buffer.trim());
        buffer = sentence;
      } else {
        buffer = buffer ? `${buffer} ${sentence}` : sentence;
      }
    }
    if (buffer.trim()) {
      chunks.push(buffer.trim());
    }
  }
  return chunks;
};
