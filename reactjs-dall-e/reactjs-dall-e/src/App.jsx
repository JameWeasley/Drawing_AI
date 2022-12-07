import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Configuration, OpenAIApi } from "openai"

function App() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512"
    })

    setResult(res.data.data[0].url);
  } 

  return (
    <div className="App">
      <h2>Generate an Image using Open AI Api</h2>
      <textarea 
      placeholder='Search... '
      onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <button onClick={generateImage}>Generate an Image</button>

      <hr />

      {result.length > 0 ? (
        <img src={result} alt="result img" />
      ) : (
        <p>No image !!</p>
      )}
    </div>
  )
}

export default App
