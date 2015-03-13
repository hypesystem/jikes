module.exports = function(render) {
  var today = new Date().getDay();

  render("is-it-friday.htm", {
    isFriday: today == 5,
    fridayText: "Yes, it is friday",
    notFridayText: "Nope"
  });
};

