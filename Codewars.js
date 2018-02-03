// Write a function to calculate the area of a regular polygon of numberOfSides or number_of_sides sides
// inside a circle of radius circleRadius or circle_radius. The answer should be rounded to 3 decimal places.

function areaOfPolygonInsideCircle(circleRadius, numberOfSides) {
  // area = 1/2a(s*n) = 1/2a*p
  // apothem = sqrt(r^2 - 1/2s^2)
  // s = 2r*sin(Pi/n)
  // area = 1/2nr*r*sin(2Pi/n)
  const area = 1/2*numberOfSides*circleRadius*circleRadius*Math.sin(2*Math.PI/numberOfSides);
  return Math.round(area*1000)/1000;
}



// solve("*'&ABCDabcde12345") = [4,5,5,3].
// --the order is: uppercase letters, lowercase, numbers and special characters.

function solve(s){
 return [s.replace(/[^A-Z]/g, "").length, s.replace(/[^a-z]/g, "").length,
   s.replace(/[\D]/g, "").length, s.replace(/[\w]/g, "").length];
}



// Figure out the correct order to defeat the MegaMan bosses given one is the easiest and the rest have weaknesses
// No error checking was required as data was promised to be set up in a certain way
// Assumptions exactly one and only 1 boss would have difficulty of 1
//    All the bosses would have a cyclical weakness in a Rock/Paper/Scissors fashion

// my code, just a simple while loop keeping logic clean
function getBossOrder(bosses) {
 let order = [];
 let boss = bosses.filter( c => c.difficulty === 1)[0];
 let weapon = boss.weapon;
 order.push(boss.name);

 while(order.length < bosses.length) {
   boss = bosses.filter( c => c.weakness === weapon)[0];
   weapon = boss.weapon;
   order.push(boss.name);
 }

 return order;
}

//Others Code:
//I like the ideo of keeping the order array full of the boss objects, and then returning the a map at the end to just pull out the names.
function getBossOrder(bosses) {
  var s=[bosses.find(b=>b.difficulty===1)], h=bosses.reduce((h,b)=>(h[b.weakness]=b,h),{});
  while(s.length<8) s.push(h[s[s.length-1].weapon])
  return s.map(b=>b.name);
}




//Color Traingle

// My code
function triangle(row) {
  let compare = (a,b) => {
    if(a == b) {
      return a;
    } else if (a+b == "BG" | a+b == "GB") {
      return "R";
    } else if (a+b == "RG" | a+b == "GR") {
      return "B";
    } else {
      return "G";
    }
  }

  if(row.length > 1) {
    return triangle(row.split('').map( (c,i,a) => i ? compare(c,a[i-1]) : '').join(''));
  } else {
    return row;
  }
}

// other code I liked the most:
function triangle(row) {
  const m = {BB: "B", BG: "R", BR: "G", GB: "R", GG: "G", GR: "B", RB: "G", RG: "B", RR: "R"};
  while (row.length > 1)
    row = [...row].reduce((a, v, i) => i ? a + m[[row[i - 1] + row[i]]] : a, '');
  return row;
}


//Debug the C/F Temp converter code.
function weatherInfo (temp) {
  var c = convertToCelsius(temp)
  if (c <= 0)
    return (c + " is freezing temperature")
  else
    return (c + " is above freezing temperature")
}

function convertToCelsius (temperature) {
  var celsius = (temperature - 32) * (5/9)
  return celsius
}



//Addition w/o + operator also under 30 characters

//my code using bitwise operators, but ~42 characters
let madAdd=(a,b)=>b?madAdd(a^b,(a&b)<<1):a
//my answer
let madAdd=(a,b)=>a- -b;


//Subtraction w/o - operator under 30 characters

//again a bitwise operation, still too long though
let madSub=(a,b)=>b?madSub(a^b,(~a&b)<<1):a
//my answer
let madSub=(a,b)=>a+~b+1
//other interesting solutions
madSub=(a,b)=>~(~a+b)
madSub=(a,b)=>a+~0*b
