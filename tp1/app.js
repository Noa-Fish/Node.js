const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/welcome', (req, res) => {
    res.send("Bienvenue sur le TP 1 du cours d'architecture logicielle")
})
app.get('/secret', (req, res) => {
    res.status(401).send("Vous ne possédez pas les droits pour accéder à ma page secrète")
})
app.get('/error', (req, res) => {
    res.status(500).send({json:"Vous ne possédez pas les droits pour accéder à ma page secrète"})
})

app.get('/img', (req, res) => {
    res.sendFile(__dirname + '/img.png')
    res.download(__dirname + '/img.png')
})

app.get('/redirectMe', (req, res) => {
    res.redirect("https://extra.univ-littoral.fr/")
})

app.get('/users/:name', (req, res) => {
    res.send("Bienvenue sur la page de " +req.params.name)
})

app.get('/somme', (req, res) => {
    result =  parseInt(req.param("a"))+parseInt(req.param("b"));
    res.send("a is set to "  +result)
})

app.use(function (req, res, next) {
    console.log(req.url, new Date().toLocaleTimeString())
    next()
})

app.use(function (req, res, next) {
    res.status(404).send("Cette page n'existe pas!")
})


const metrics = {
    requestsCount: {},
    status: "healthy",
};
  
app.get("/metrics", function (req, res, next) {
    metrics.uptime = `${process.uptime().toFixed(2)} seconds`;
    return res.json(metrics);  
});
  
app.use(function (req, res, next) {
    const currentUrlRequestsCount = metrics.requestsCount[req.url];
    metrics.requestsCount[req.url] = currentUrlRequestsCount
      ? currentUrlRequestsCount + 1
      : 1;
    return next();
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
