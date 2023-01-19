import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
// import { env } from "process";
const config = new Configuration({
    apiKey: process.env.OPENAI_KEY 
})

console.log(process.env.OPENAI_KEY)
const openAi = new OpenAIApi(config)

export default async function (req:NextApiRequest, res:NextApiResponse) {
    // const {description, name} = req.body
    const complete = await openAi.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.text,
        temperature: 0.6,
        max_tokens: 2048,
    })
    res.status(200).json({result: complete.data.choices[0].text})
}

// const generateDescription = (description: any, name: string)=>{
//     return `describe ${name} as a ${description} `;
// }