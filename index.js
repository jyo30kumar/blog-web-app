import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

//variables
const app = express();
const port = 3000;
let posts;
let todayDate = new Date();

//middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//read json file 
fs.readFile('posts.json', (err, data) => {
    if (err){
        console.log("Error reading to file:", err);
        return;
    } 
    try {
        posts = JSON.parse(data); 
    } catch (error) {
        console.log("Error while reading or parsing data : ", error);
    }
});

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
    delete req.body.submit;
    const blogData = req.body;
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    blogData.id = id;
    blogData.date = todayDate.getDate() + "-" + todayDate.getMonth() + "-" + todayDate.getFullYear();
    posts.push(blogData);
    const data = JSON.stringify(posts);
    fs.writeFile("posts.json", data, (err) => {
        if(err) throw err;
        console.log("Successfully created a Blog!");
    });
    res.redirect("/newBlog");
});

app.post("/editPost/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const editData = posts.find((post) => post.id === id);
    res.render("editPost.ejs", res.locals = {editData:editData});
});

app.post("/updatePost/:id", (req, res) => {
    const id = parseInt(req.params.id);
    delete req.body.update;
    req.body.id = id;
    let updatePost = posts.find((post) => post.id === id);
    updatePost = req.body;
    const searchIndex = posts.findIndex((post) => post.id === id);
    posts[searchIndex] = updatePost;
    const data = JSON.stringify(posts);
    fs.writeFile("posts.json", data, (err) => {
        if(err) throw err;
        console.log("Successfully edited a Blog!");
    });
    res.redirect("/viewBlog");
});

app.post("/deletePost/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = posts.findIndex((post) => post.id === id);
    const updatePost = posts.splice(searchIndex, 1);
    const data = JSON.stringify(posts);
    fs.writeFile("posts.json", data, (err) => {
        if(err) throw err;
        console.log("Successfully edited a Blog!");
    });
    res.json({message : "Successfully deleted"});
});

//start server 
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});