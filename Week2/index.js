const express = require("express")
const app = express()
const port = 8000

let msg = {
    msg: "Hello World"
}

app.get("/hello", (req, res) => {
    res.json(msg)
});

app.listen(port, () => console.log("Server listening on port " + port));