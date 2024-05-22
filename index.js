import express from 'express';
import bodyParser from 'body-parser';

//variables
const app = express();
const port = 3000;

//middlewares
app.use(bodyParser.urlencoded({extended:true}));

//routes
app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.post("/submitBlog", (req, res) => {
    res.render("createBlog.ejs");
});
app.post("/createBlog", (req, res) => {
    console.log(req.body["authorName"]);
    console.log(req.body["articleTitle"]);
    console.log(req.body["date"]);
    console.log(req.body["categories"]);
    console.log(req.body["blogContent"]);
});

//server 
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});