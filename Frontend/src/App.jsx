import { useState } from "react"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-javascript"
import Editor from "react-simple-code-editor"
import Markdown from "react-markdown"
import axios from "axios"

import "./App.css"

function App() {
  const [code, setCode] = useState(` `)
  
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)

  async function reviewCode() {
    setLoading(true)
    try {
      const response = await axios.post("https://ai-codereviewer-backend-dw2i.onrender.com", { code })
      setReview(response.data)
    } catch (error) {
      setReview(`# ⚠️ Error Fetching Review

**Connection Error:** ${error.message}

Please make sure your backend server is running on \`http://localhost:3000\` and the \`/ai/get-review\` endpoint is available.

### Troubleshooting Steps:
1. Check if your backend server is running
2. Verify the API endpoint URL
3. Check for CORS configuration
4. Review network connectivity`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div className="left">
        <div className="editor-header">
          <div className="editor-title">Code Editor</div>
          <div className="editor-subtitle">Write your code below for AI review</div>
        </div>
        <div className="editor-container">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code => Prism.highlight(code, Prism.languages.javascript, "javascript")}
            padding={20}
            style={{
              fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
              fontSize: 14,
              lineHeight: 1.6,
              minHeight: "100%",
              width: "100%",
            }}
          />
        </div>
        <button 
          onClick={reviewCode} 
          className="review"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "🚀 Review Code"}
        </button>
      </div>
      
      <div className="right">
        <div className="review-header">
          <div className="review-title">AI Code Review</div>
        </div>
        <div className="review-content">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <div className="loading-text">Analyzing your code...</div>
            </div>
          ) : review ? (
            <Markdown>{review}</Markdown>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">💡</div>
              <div className="empty-state-text">Ready for Code Review</div>
              <div className="empty-state-subtext">Click "Review Code" to get AI-powered insights and suggestions</div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default App
