// Level configuration for all operations
// Names and descriptions use i18n keys

export const levelIcons = {
  1: '🍼',
  2: '🎒',
  3: '🧚',
  4: '⚔️',
  5: '🎓',
  6: '👑'
}

export const operationConfig = {
  addition: {
    symbol: '+',
    icon: '✨',
    levels: {
      1: {
        descKey: 'addition_1',
        generator: () => {
          const num1 = Math.floor(Math.random() * 10) + 1
          const num2 = Math.floor(Math.random() * 10) + 1
          return { num1, num2, answer: num1 + num2 }
        }
      },
      2: {
        descKey: 'addition_2',
        generator: () => {
          const num1 = Math.floor(Math.random() * 41) + 10
          const num2 = Math.floor(Math.random() * 20) + 1
          return { num1, num2, answer: num1 + num2 }
        }
      },
      3: {
        descKey: 'addition_3',
        generator: () => {
          const num1 = Math.floor(Math.random() * 90) + 10
          const num2 = Math.floor(Math.random() * 90) + 10
          return { num1, num2, answer: num1 + num2 }
        }
      },
      4: {
        descKey: 'addition_4',
        generator: () => {
          const num1 = Math.floor(Math.random() * 401) + 100
          const num2 = (Math.floor(Math.random() * 9) + 1) * 10
          return { num1, num2, answer: num1 + num2 }
        }
      },
      5: {
        descKey: 'addition_5',
        generator: () => {
          const num1 = Math.floor(Math.random() * 900) + 100
          const num2 = Math.floor(Math.random() * 99) + 1
          const adjusted = num2 % 10 === 0 ? num2 + Math.floor(Math.random() * 9) + 1 : num2
          return { num1, num2: adjusted, answer: num1 + adjusted }
        }
      },
      6: {
        descKey: 'addition_6',
        generator: () => {
          const num1 = Math.floor(Math.random() * 900) + 100
          const num2 = Math.floor(Math.random() * 900) + 100
          return { num1, num2, answer: num1 + num2 }
        }
      }
    }
  },
  subtraction: {
    symbol: '−',
    icon: '✂️',
    levels: {
      1: {
        descKey: 'subtraction_1',
        generator: () => {
          const num1 = Math.floor(Math.random() * 11) + 10
          const num2 = Math.floor(Math.random() * Math.min(9, num1 - 1)) + 1
          return { num1, num2, answer: num1 - num2 }
        }
      },
      2: {
        descKey: 'subtraction_2',
        generator: () => {
          const num1 = Math.floor(Math.random() * 31) + 20
          const num2 = Math.floor(Math.random() * Math.min(19, num1 - 1)) + 1
          return { num1, num2, answer: num1 - num2 }
        }
      },
      3: {
        descKey: 'subtraction_3',
        generator: () => {
          const num1 = Math.floor(Math.random() * 50) + 50
          const maxNum2 = Math.min(49, num1 - 10)
          const num2 = Math.floor(Math.random() * (maxNum2 - 10 + 1)) + 10
          return { num1, num2, answer: num1 - num2 }
        }
      },
      4: {
        descKey: 'subtraction_4',
        generator: () => {
          const num1 = Math.floor(Math.random() * 101) + 100
          const maxTens = Math.floor((num1 - 10) / 10)
          const num2 = (Math.floor(Math.random() * Math.min(9, maxTens)) + 1) * 10
          return { num1, num2, answer: num1 - num2 }
        }
      },
      5: {
        descKey: 'subtraction_5',
        generator: () => {
          const num1 = Math.floor(Math.random() * 301) + 200
          let num2 = Math.floor(Math.random() * Math.min(199, num1 - 10)) + 1
          if (num2 % 10 === 0) num2 += Math.floor(Math.random() * 9) + 1
          return { num1, num2, answer: num1 - num2 }
        }
      },
      6: {
        descKey: 'subtraction_6',
        generator: () => {
          const num1 = Math.floor(Math.random() * 500) + 500
          const num2 = Math.floor(Math.random() * (num1 - 100)) + 100
          return { num1, num2, answer: num1 - num2 }
        }
      }
    }
  },
  multiplication: {
    symbol: '×',
    icon: '⭐',
    levels: {
      1: {
        descKey: 'multiplication_1',
        generator: () => {
          const num1 = Math.floor(Math.random() * 5) + 1
          const num2 = Math.floor(Math.random() * 5) + 1
          return { num1, num2, answer: num1 * num2 }
        }
      },
      2: {
        descKey: 'multiplication_2',
        generator: () => {
          const num1 = Math.floor(Math.random() * 9) + 1
          const num2 = Math.floor(Math.random() * 9) + 1
          return { num1, num2, answer: num1 * num2 }
        }
      },
      3: {
        descKey: 'multiplication_3',
        generator: () => {
          const num1 = Math.floor(Math.random() * 11) + 10
          const num2 = Math.floor(Math.random() * 8) + 2
          return { num1, num2, answer: num1 * num2 }
        }
      },
      4: {
        descKey: 'multiplication_4',
        generator: () => {
          const num1 = Math.floor(Math.random() * 9) + 11
          const num2 = Math.floor(Math.random() * 9) + 11
          return { num1, num2, answer: num1 * num2 }
        }
      },
      5: {
        descKey: 'multiplication_5',
        generator: () => {
          const num1 = Math.floor(Math.random() * 31) + 20
          const num2 = Math.floor(Math.random() * 8) + 2
          return { num1, num2, answer: num1 * num2 }
        }
      },
      6: {
        descKey: 'multiplication_6',
        generator: () => {
          const num1 = Math.floor(Math.random() * 50) + 10
          const num2 = Math.floor(Math.random() * 20) + 5
          return { num1, num2, answer: num1 * num2 }
        }
      }
    }
  },
  division: {
    symbol: '÷',
    icon: '🍕',
    levels: {
      1: {
        descKey: 'division_1',
        generator: () => {
          const num2 = Math.floor(Math.random() * 4) + 2
          const answer = Math.floor(Math.random() * 10) + 1
          const num1 = num2 * answer
          return { num1, num2, answer }
        }
      },
      2: {
        descKey: 'division_2',
        generator: () => {
          const num2 = Math.floor(Math.random() * 9) + 1
          const answer = Math.floor(Math.random() * 9) + 1
          const num1 = num2 * answer
          return { num1, num2, answer }
        }
      },
      3: {
        descKey: 'division_3',
        generator: () => {
          const num2 = Math.floor(Math.random() * 9) + 2
          const answer = (Math.floor(Math.random() * 9) + 1) * 10
          const num1 = num2 * (answer / 10) * 10
          return { num1: answer, num2, answer: answer / num2 }
        }
      },
      4: {
        descKey: 'division_4',
        generator: () => {
          const num2 = Math.floor(Math.random() * 9) + 2
          const answer = Math.floor(Math.random() * 15) + 5
          const num1 = num2 * answer
          return { num1, num2, answer }
        }
      },
      5: {
        descKey: 'division_5',
        generator: () => {
          const num2 = Math.floor(Math.random() * 9) + 2
          const answer = Math.floor(Math.random() * 30) + 10
          const num1 = num2 * answer
          return { num1, num2, answer }
        }
      },
      6: {
        descKey: 'division_6',
        generator: () => {
          const num2 = Math.floor(Math.random() * 12) + 2
          const answer = Math.floor(Math.random() * 50) + 10
          const num1 = num2 * answer
          return { num1, num2, answer }
        }
      }
    }
  },
  fraction: {
    symbol: '/',
    icon: '🍰',
    isFraction: true,
    levels: {
      1: {
        descKey: 'fraction_1',
        type: 'add',
        generator: () => {
          const denominator = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)]
          const num1 = Math.floor(Math.random() * (denominator - 1)) + 1
          const maxNum2 = denominator - num1
          const num2 = Math.floor(Math.random() * maxNum2) + 1
          return {
            fraction1: { numerator: num1, denominator },
            fraction2: { numerator: num2, denominator },
            answer: { numerator: num1 + num2, denominator },
            operation: '+'
          }
        }
      },
      2: {
        descKey: 'fraction_2',
        type: 'subtract',
        generator: () => {
          const denominator = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)]
          const num1 = Math.floor(Math.random() * (denominator - 1)) + 2
          const num2 = Math.floor(Math.random() * (num1 - 1)) + 1
          return {
            fraction1: { numerator: num1, denominator },
            fraction2: { numerator: num2, denominator },
            answer: { numerator: num1 - num2, denominator },
            operation: '−'
          }
        }
      },
      3: {
        descKey: 'fraction_3',
        type: 'add_different',
        generator: () => {
          const pairs = [[2, 4], [3, 6], [4, 8], [2, 6]]
          const [d1, d2] = pairs[Math.floor(Math.random() * pairs.length)]
          const num1 = Math.floor(Math.random() * (d1 - 1)) + 1
          const num2 = Math.floor(Math.random() * (d2 - 1)) + 1
          const commonD = d2
          const converted1 = num1 * (d2 / d1)
          const resultNum = converted1 + num2
          const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
          const g = gcd(resultNum, commonD)
          return {
            fraction1: { numerator: num1, denominator: d1 },
            fraction2: { numerator: num2, denominator: d2 },
            answer: { numerator: resultNum / g, denominator: commonD / g },
            operation: '+'
          }
        }
      },
      4: {
        descKey: 'fraction_4',
        type: 'multiply_int',
        generator: () => {
          const denominator = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)]
          const numerator = Math.floor(Math.random() * (denominator - 1)) + 1
          const integer = Math.floor(Math.random() * 5) + 2
          const resultNum = numerator * integer
          const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
          const g = gcd(resultNum, denominator)
          return {
            fraction1: { numerator, denominator },
            integer,
            answer: { numerator: resultNum / g, denominator: denominator / g },
            operation: '×'
          }
        }
      },
      5: {
        descKey: 'fraction_5',
        type: 'divide_int',
        generator: () => {
          const denominators = [2, 3, 4, 6]
          const denominator = denominators[Math.floor(Math.random() * denominators.length)]
          const integers = [2, 3]
          const integer = integers[Math.floor(Math.random() * integers.length)]
          const possibleNumerators = []
          for (let n = 1; n < denominator; n++) {
            possibleNumerators.push(n)
          }
          const numerator = possibleNumerators[Math.floor(Math.random() * possibleNumerators.length)]
          const resultDenom = denominator * integer
          const gcd = (a, b) => b === 0 ? a : gcd(b, a % b)
          const g = gcd(numerator, resultDenom)
          return {
            fraction1: { numerator, denominator },
            integer,
            answer: { numerator: numerator / g, denominator: resultDenom / g },
            operation: '÷'
          }
        }
      },
      6: {
        descKey: 'fraction_6',
        type: 'mixed',
        generator: () => {
          const ops = ['+', '−']
          const op = ops[Math.floor(Math.random() * ops.length)]
          const denominator = [2, 3, 4, 5, 6][Math.floor(Math.random() * 5)]

          if (op === '+') {
            const num1 = Math.floor(Math.random() * (denominator - 1)) + 1
            const maxNum2 = denominator - num1
            const num2 = Math.floor(Math.random() * maxNum2) + 1
            return {
              fraction1: { numerator: num1, denominator },
              fraction2: { numerator: num2, denominator },
              answer: { numerator: num1 + num2, denominator },
              operation: '+'
            }
          } else {
            const num1 = Math.floor(Math.random() * (denominator - 1)) + 2
            const num2 = Math.floor(Math.random() * (num1 - 1)) + 1
            return {
              fraction1: { numerator: num1, denominator },
              fraction2: { numerator: num2, denominator },
              answer: { numerator: num1 - num2, denominator },
              operation: '−'
            }
          }
        }
      }
    }
  }
}

export function generateQuestions(operation, level, count = 10) {
  const generator = operationConfig[operation].levels[level].generator
  const questions = []
  for (let i = 0; i < count; i++) {
    questions.push(generator())
  }
  return questions
}
