import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: process.env.OPENAI_KEY 
})
const openAi = new OpenAIApi(config)

export default async function(req:NextApiRequest, res:NextApiResponse){
    const complete = await openAi.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.text,
        temperature: 0.6,
        max_tokens: 2048,
    })
    res.status(200).json({result: complete.data.choices[0].text})
}

