const { validationResult } = require("express-validator");

const Post = require("../models/post");

// exports.getPosts = (req, res, next) => {
//     res.status(200).json({
//         posts: [
//             {
//                 _id: "jsdfkjhdsjfdsf",
//                 title: "Hello",
//                 content: "this is what we do, and you wanna know why we do it?",
//                 imageUrl: "images/duck.jpg",
//                 creator: {
//                     name: "Takudzwa Allen",
//                 },
//                 createdAt: new Date(),
//             },
//         ],
//     });
// };

exports.getPosts = (req, res, next) => {
    Post.find()
        .then((posts) => {
            console.log(posts);
            res.status(200).json({
                posts: posts,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    const title = req.body.title;
    const content = req.body.content;

    if (!errors) {
        return res.status(422).json({
            message: "Validation falied, data is incorrect",
            errors: errors.array(),
        });
    }
    const post = new Post({
        title: title,
        content: content,
        imageUrl: "images/duck.jpg",
        creator: {
            name: "Takudzwa",
        },
    });

    post.save()
        .then((result) => {
            console.log(result);

            // Create post in DB
            res.status(201).json({
                message: "Post created",
                post: result,
            });
        })
        .catch((err) => console.log(err));
};
