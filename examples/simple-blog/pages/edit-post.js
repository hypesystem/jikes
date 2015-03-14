module.exports = function(render) {
  var postId = this.query.id;

  if(!postId) {
    return render("400.htm", {
      message: "No post id provided."
    });
  }

  getPostContent(postId, function(error, postContent) {
    if(error) {
      return render("500.htm", {
        message: "Failed to get post content: "+JSON.stringify(error)
      });
    }

    render("edit-post.htm", {
      postContent: postContent
    });
  });
};

function getPostContent(postId, callback) {
  callback(null, "the post has id "+postId);
}

