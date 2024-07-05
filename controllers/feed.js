exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                _id: "jsdfkjhdsjfdsf",
                title: "Hello",
                content: "this is what we do, and you wanna know why we do it?",
                imageUrl: "images/duck.jpg",
                creator: {
                    name: "Takudzwa Allen",
                },
                createdAt: new Date(),
            },
        ],
    });
};

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    // Create post in DB
    res.status(201).json({
        message: "Post created",
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: {
                name: "Takudzwa",
            },
            createdAt: new Date(),
        },
    });
};
