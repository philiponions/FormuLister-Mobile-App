const assert = require('unit.js').assert;
const { detectVariables, replaceVariables } = require('../utils/variables.js');

describe('detectVariables', function () {
    it('should detect variables in a string', function() {
        const equation = '2*x + 3*y = 5';
        const expected = ['x', 'y'];
        const actual = detectVariables(equation);
        assert.deepEqual(actual, expected);
      });
    
      it('should detect variables with subscript in a string', function() {
        const equation = '2*m_1 + 3*m_2 = 5';
        const expected = ['m_1', 'm_2'];
        const actual = detectVariables(equation);
        assert.deepEqual(actual, expected);
      });
    
      it('should detect variables with sqrt in a string', function() {
        const equation = 'sqrt(x) + sqrt(y) = 5';
        const expected = ['x', 'y'];
        const actual = detectVariables(equation);
        assert.deepEqual(actual, expected);
      });
    
      it('should detect variables with log in a string', function() {
        const equation = 'log(x) + log(y) = 5';
        const expected = ['x', 'y'];
        const actual = detectVariables(equation);
        assert.deepEqual(actual, expected);
      });
    
      it('should detect variables with ln in a string', function() {
        const equation = 'ln(x) + ln(y) = 5';
        const expected = ['x', 'y'];
        const actual = detectVariables(equation);
        assert.deepEqual(actual, expected);
      });
})

describe('replaceVariables', function () {
  it("should replace known variables with subscripts with their values and replace the unknown to x", function() {
    const equation = "y = b + m_1*x";
    const variables = [{variableName: "y", input:"3"}, 
                       {variableName: "b", input:"2"}, 
                       {variableName: "m_1", input:""}, 
                       {variableName: "x", input:"4"}];
    const expected = '3 = 2 + 4*x'
    const actual = replaceVariables(equation, variables);
    assert.deepEqual(actual, expected);
  }) 
  it("should replace known variables inside logs with their values and replace the unknown to x", function() {
    const equation = "log(x) + y = k";
    const variables = [{variableName: "x", input:"10"}, 
                       {variableName: "y", input:""}, 
                       {variableName: "k", input:"4"}]                       
    const expected = 'log(10) + x = 4'
    const actual = replaceVariables(equation, variables);
    assert.deepEqual(actual, expected);
  }) 
  it("take care of unknown variables inside operations", function() {
    const equation = "sqrt(x) + sin(y) = cos(k)";
    const variables = [{variableName: "x", input:""}, 
                       {variableName: "y", input:"10"}, 
                       {variableName: "k", input:"4"}]                       
    const expected = 'sqrt(x) + sin(10) = cos(4)'
    const actual = replaceVariables(equation, variables);
    assert.deepEqual(actual, expected);    
  }) 
  
})

