import { useEffect, useState } from "react";

export const useOpenAiApi =  (prompt: string) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [result, setResult] = useState<any>()
    const [error, setError] = useState<any>()
         const getDescriptiveAiInfo = async () => {
            setLoading(true);
            const response = await fetch("/api/open-ai", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ text: prompt }),
            });
        
            try {
              setLoading(false);
              const data = await response.json();
              setResult(data.result);
              console.log(data.result);
            } catch (error) {
              setError(error);
              console.log(error)
            }
        
        };
    return {loading, result, error, prompt, setResult, getDescriptiveAiInfo}
    
}