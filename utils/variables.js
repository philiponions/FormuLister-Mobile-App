
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

function replaceVariables (equation, variables) {
  // Detect all the variables in the equation
   const found = detectVariables(equation);     
   let newEquation = equation;

   found.forEach((variable) => {
       const index = variables.findIndex((e) => e.variableName === variable);
       
       if (variables[index].input.length) {
           newEquation = newEquation.replace(variable, variables[index].input);
       } else {
           newEquation = newEquation.replace(variable, "x");
       }                    
   })
   return newEquation;
}

module.exports.replaceVariables = replaceVariables;
module.exports.detectVariables = detectVariables;
  