let https = require("https")
let path = require("path")
const fs = require("fs")
let express = require("express")
let app = express()

const key = fs.readFileSync("./key.pem")
const cert = fs.readFileSync("./cert.pem")
let credentials = { key: key, cert: cert }

//setting middleware
// app.use(express.static(__dirname + "public")) //Serves resources from public folder
app.use("/dist/", express.static(path.join(__dirname, "dist")))
// app.get("/", function(req, res) {
//   res.sendFile("public/index.html")
// })

let httpsServer = https.createServer(credentials, app)

const port = 44300
const domain = "localhost"
httpsServer.listen(port, domain, function() {
  console.log("Server listening at: " + domain + ":" + port)
})
