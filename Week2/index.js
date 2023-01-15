const { request } = require("express");
const express = require("express")
const app = express()
const port = 3000
const list = []

app.use(express.json())
app.use(express.static('public'))


app.get("/hello", (req, res) => {
    let msg = {
        msg: "Hello World"
    }

    res.json(msg)
});

app.get("/echo/:id", (req, res) => {
    res.json({
        id: req.params.id
    })
})


app.post("/sum", (req, res) => {
    let sum = 0
    console.log(req.body.numbers)
    for(let i = 0; i < (req.body.numbers).length; i++) {
        sum = sum + req.body.numbers[i]
        console.log(sum)
    }
    console.log(sum)
    res.send(JSON.stringify({ "sum": sum}, null, " "))

})


app.post("/list", (req, res) => {
    list.push(req.body.text)
    //console.log(req.body.text)
    console.log(list.length)
    console.log({"list": list})

    res.send(JSON.stringify({"list": list}))

})


app.listen(port, () => console.log("Server listening on port " + port));