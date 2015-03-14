var fs = require("fs");

module.exports = function(render, redirect) {
  var postId = this.postData.id;
  var content = this.postData.content;
  fs.writeFile(postId+".md", content, function(error) {
    if(error) {
      return render("500.htm", {
        message: "Failed to save post."
      });
    }
    redirect("view-post?id="+postId);
  });
};

