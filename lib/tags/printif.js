function parsePrintIfTag(variables, cond, arg) {
  if(typeof variables[cond] === "undefined") {
    return "Undefined condition: "+cond;
  }
  if(typeof variables[arg] === "undefined") {
    return "Undefined variable: "+arg;
  }
  if(variables[cond]) {
    return variables[arg];
  }
  return "";
}

module.exports = {
  name: "printif",
  parse: parsePrintIfTag
};

