const assert = require('unit.js').assert;
const { detectVariables } = require('../utils/variables.js');

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