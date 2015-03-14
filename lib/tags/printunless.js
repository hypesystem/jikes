function parsePrintUnlessTag(variables, cond, arg) {
  if(typeof variables[cond] === "undefined") {
    return "Undefined condition: "+cond;
  }
  if(typeof variables[arg] === "undefined") {
    return "Undefined variable: "+arg;
  }
  if(!variables[cond]) {
    return variables[arg];
  }
  return "";
}

module.exports = {
  name: "printunless",
  parse: parsePrintUnlessTag
};

