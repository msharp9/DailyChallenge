// BrainF**k is an esoteric programming language and is notable for it's extreme minimalism
// This code challenge was to build an interpreter for it
// https://en.wikipedia.org/wiki/Brainfuck

function brainLuck(code, input){
  var values = input.split('').map( cv => cv.charCodeAt());
  var array = [0];
  var pointer = 0;
  var output = '';
  var x = -1; //counter for nested loops

  for(var i=0; i<code.length; i++) {
    switch(code[i]) {
      case '>': pointer++;
        if(pointer === array.length) {array.push(0)}
        break;
      case '<': pointer--;
        break;
      case '+': array[pointer] + 1 > 255 ? array[pointer] = 0 : array[pointer]++;
        break;
      case '-': array[pointer] - 1 < 0 ? array[pointer] = 255 : array[pointer]--;
        break;
      case '.': output += String.fromCharCode(array[pointer]);
        break;
      case ',': array[pointer] = values.shift();
        break;
      case '[':
        if(array[pointer] === 0) {
          while(code[i] !== ']' || x != 0) {
            if(code[i] === '[') {
              x++;
            } else if (code[i] === ']') {
              x--;
            }
            i++;
          }
          x--;
        }
        break;
      case ']':
        while(code[i] != '[' || x != 0) {
          if(code[i] === ']') {
            x++;
          } else if (code[i] === '[') {
            x--;
          }
          i--;
        }
        i--;
        x--;
        break;
    }
  }
  return output;
}

// Test Cases
// Echo until byte(255) encountred
Test.assertEquals(
  brainLuck(',+[-.,+]','Codewars'+String.fromCharCode(255)),
  'Codewars'
);

// Echo until byte(0) encountred
Test.assertEquals(
  brainLuck(',[.[-],]','Codewars'+String.fromCharCode(0)),
  'Codewars'
);

// Two numbers multiplier
Test.assertEquals(
  brainLuck(',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.', String.fromCharCode(8,9)),
  String.fromCharCode(72)
);
