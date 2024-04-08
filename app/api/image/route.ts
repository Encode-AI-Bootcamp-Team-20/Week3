import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const {prompt, model, quality, style} = await req.json();
    const response = await openai.images.generate({prompt, model, quality, style});
    return new Response(JSON.stringify({url: response.data[0].url}))
}