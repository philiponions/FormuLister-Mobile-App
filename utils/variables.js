
function detectVariables(str) {
    let variables = [];
    const regex = /([a-zA-Z][a-zA-Z0-9]*(?:_[a-zA-Z0-9]+)?)(?=\W|\b)(?<!sin|cos|tan|log|ln|sqrt)/g

    let match = regex.exec(str);
  
    while (match != null) {
      const variable = match[1] || match[2];
      if (!variables.includes(variable)) {
        variables.push(variable);
      }
      match = regex.exec(str);
    }
  
    return variables;
}

module.exports.detectVariables = detectVariables;
  