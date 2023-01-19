import { Configuration, OpenAIApi } from "openai";
// import { env } from "process";
console.log(process.env.OPENAI_KEY)
const config = new Configuration({
    apiKey: process.env.OPENAI_KEY 
})

export const openAi = new OpenAIApi(config)

