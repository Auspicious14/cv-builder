import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: process.env.OPENAI_KEY 
})

const openAi = new OpenAIApi(config)

export const generateDescriptionApi = async (req:any, res:any)=>{
    const description = req.body
    const complete = await openAi.createCompletion({
        model: "text-davinci-003",
        prompt: generateDescription(description),
        temperature: 0.6,
        max_tokens: 2048,
    })
    req.status(200).json({result: complete.data.choices[0].text})
}

const generateDescription = (description: any)=>{
return description;
}