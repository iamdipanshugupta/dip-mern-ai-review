import React, { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
const App = () => {

  const [code, setCode] = useState("")
  const [review, setReview] = useState("")
  const [Loading, setLoading] = useState(false)

  async function handleReview() {
    if (!code.trim()) {
      return setLoading(true)
    }

    try {
      const res = await fetch("/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: code })
      })
      const data = await res.json()
      console.log(data)
      const aiResponse = typeof data === "string"
        ? data
        : data?.text || data?.message || JSON.stringify(data);
      setReview(aiResponse || "No response from Ai")
    } catch (error) {
      console.log(error)
      setReview("Error Occured! Try Again")
    }
    finally {
      setLoading(false)
    }

  }



  return (
    <div className='min-h-screen bg-[#0f172a] text-white p-6 font-mono'>
      <h1 className='text-3xl font-bold mb-6 text-center '>Code Review Ai</h1>
      <div className='text-lg font-semibold grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-[#1e293b] rounded-xl p-4 border border-blue-700 shadow'>
          {/*Input Box */}
          <h2 className='text-lg font-semibold mb-2 text-blue-300'>Your Code</h2>
          <textarea name="" id=""
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='w-full h-96 bg-[#0f172a] p-3 text-white rounded-lg border border-gray-700 focus:outline-none focus-ring-2 focus:ring-blue-500 resize-none text-sm'
            placeholder="// Paste your code here..."></textarea>
          <button
            onClick={handleReview}
            disabled={Loading}
            className='mt-4 px-5 py-2 bg-green-500 hover:bg-green-700 rounded-lg text-sm  flex items-center gap-2'><FaPlay />{Loading ? " Reviewing..." : "Run Review"}</button>
        </div>
        <div className='bg-[#1e293b] rounded-xl p-4 border border-blue-700 shadow'>
          {/*Output Box */}
          <h2 className='text-lg font-semibold mb-2 text-blue-300'>Review Output</h2>
          <div className="h-96 bg-[#0f172a] p-3 rounded-lg border border-gray-700 text-sm flex flex-col">
            {review ? (
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                wrapLongLines
              >
                {review}
              </SyntaxHighlighter>
            ) : (
              <p className="text-gray-400 m-auto">AI Suggestion Will Appear Here...</p>
            )}
          </div>


        </div>
      </div>
    </div>
  )
}

export default App
