import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: process.env.OPENAI_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const {genre, subject, accessory, activity, location} = await req.json();

    let content = `a ${genre} of a ${subject}`;
    if (accessory)
        content += ` with a ${accessory}`;
    if (activity)
        content += ` ${activity}`;
    if (location)
        content += ` ${location}`;

    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {content, role: 'user'});
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {assistant_id: process.env.OPENAI_ASSISTANT_ID});
    if (run.status != 'completed')
        throw new Error(`Unexpected run status: ${run.status}`);
    const messages = await openai.beta.threads.messages.list(thread.id);
    return new Response(JSON.stringify({prompt: messages.data[0].content[0].text.value}))
}