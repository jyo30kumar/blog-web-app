import express from 'express';
import bodyParser from 'body-parser';

//variables
const app = express();
const port = 3000;

let posts = [];

//middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//routes
app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.get("/newBlog", (req, res) => {
    res.render("createBlog.ejs");
});
app.get("/viewBlog", (req, res) => {
    res.render("viewBlog.ejs", {viewData : posts});
});

app.post("/createBlog", (req, res) => {
    const blogData = req.body;
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    blogData.id = id;
    posts.push(req.body);
    res.redirect("/newBlog");
});

//start server 
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});