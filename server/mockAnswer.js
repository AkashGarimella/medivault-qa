import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function fallback() {
  return {
    answer: "Not found in references.",
    citations: [],
    confidence: 0,
    evidence: "",
    found: false,
  };
}

export async function generateMockAnswer(question, documents) {
  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY not set");
    return fallback();
  }

  if (!Array.isArray(documents) || !documents.length) {
    return fallback();
  }

  const documentContext = documents
    .map((doc) => `## ${doc.name}\n${doc.content}`)
    .join("\n\n");

  const systemPrompt = `You are a questionnaire answering assistant. You have access to reference documents about MediVault (a HIPAA-compliant health data management platform).
Your task is to answer the user's question based ONLY on the provided reference documents. If the information is not found in the documents, respond accordingly.

Return your response as JSON with the following structure:
{
  "answer": "The answer to the question based on the documents",
  "citations": ["Document Name: exact quote or reference", "Another Document Name: another quote"],
  "confidence": 75,
  "evidence": "The most relevant excerpt from the documents that supports the answer",
  "found": true
}

If the question cannot be answered from the documents:
{
  "answer": "Not found in references.",
  "citations": [],
  "confidence": 0,
  "evidence": "",
  "found": false
}

Confidence should be a number between 0-100 indicating how confident you are that the answer is complete and accurate based on the provided documents.
Return ONLY the JSON object, no extra text, no markdown, no code blocks.`;

  const userPrompt = `Here are the reference documents:\n\n${documentContext}\n\nQuestion: ${question}`;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.2,
      max_tokens: 1024,
    });

    const responseText = completion.choices[0]?.message?.content || "";

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in Groq response:", responseText);
      return fallback();
    }

    const result = JSON.parse(jsonMatch[0]);

    if (
      typeof result.answer !== "string" ||
      !Array.isArray(result.citations) ||
      typeof result.confidence !== "number" ||
      typeof result.evidence !== "string" ||
      typeof result.found !== "boolean"
    ) {
      console.error("Invalid response structure:", result);
      return fallback();
    }

    return result;
  } catch (error) {
    console.error("Groq API error:", error.message);
    return fallback();
  }
}