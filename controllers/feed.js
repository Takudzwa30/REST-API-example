exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ name: "Hello", content: "wolrd" }],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  // Create post in DB
  res.status(201).json({
    message: "Post created",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
