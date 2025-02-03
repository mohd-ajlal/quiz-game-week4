// Write your server logic here
const http = require("http")
const fs = require("fs")
const path = require("path")

const PORT = 3000

const server = http.createServer((req, res) => {
  if (req.url === "/questions") {
    fs.readFile(path.join(__dirname, "questions.json"), "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ error: "Error reading questions" }))
        return
      }
      res.writeHead(200, { "Content-Type": "application/json" })
      res.end(data)
    })
  } else {
    const filePath = path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url)
    const extname = path.extname(filePath)
    let contentType = "text/html"

    switch (extname) {
      case ".js":
        contentType = "text/javascript"
        break
      case ".css":
        contentType = "text/css"
        break
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === "ENOENT") {
          res.writeHead(404)
          res.end("File not found")
        } else {
          res.writeHead(500)
          res.end("Server error")
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType })
        res.end(content)
      }
    })
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
