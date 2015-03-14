module.exports = function(render) {
  var postId = this.query.id;

  var postContent = "This post has id "+postId;

  render("layout.htm", "view-post.htm", {
    postContent: postContent
  });
};

