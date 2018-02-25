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


//multiplication w/o * operator under 30 characters
//just to keep with tradition, bitwise operation
let madMul=(a,b,r=0)=> {
  if(b){
    if(b&1) {
      r+=a;
    }
    return madMul(a<<1,b>>1,r);
  }
  return r;
};
//my answer
madMul=(a,b)=>~~(b/(1/a)+.5)
//other interesting solutions
madMul=f=(a,b)=>b&&a+f(a,--b)
madMul=(a,b)=>eval('a\052b') //this just feels like cheating >_<


//division w/o / operator and under 30 characters
//since I looked into bitwise operations for other katas:
//however, this appears limited in scope (doesn't return fractions, negatives, ect)
//algorithm is essentially doing basics of division by hand
let madDiv=(a,b)=>{
    let current=1;
    let answer=0;

    if (b == 0)
        return NaN;

    if (b == a)
        return 1;

    while (b <= a) {
        b <<= 1;
        current <<= 1;
    }

    b >>= 1;
    current >>= 1;

    while (current!=0) {
        if ( a >= b) {
            a -= b;
            answer |= current;
        }
        current >>= 1;
        b >>= 1;
    }
    return answer;
}
//my answer
madDiv=(a,b)=>b?a*(b**-1):NaN
//others - guess the check wasn't needed
madDiv=(a,b)=>a*b**-1
madDiv=(a,b)=>eval("a\57b") //cheating again :P


//modulus w/o % operator and under 35 characters
//first attempt - failed for divide by 0
madMod=(a,b)=>~~(b*(a/b-~~(a/b))+.5)
//my answer
madMod=(a,b)=>b?a-~~(a/b)*b:NaN




//Hide password parameter in url string
//my code:
function hidePasswordFromConnection(urlString){
  return urlString.replace(/(password=)(.*?)(&|$)/, (m,p1,p2,p3)=> p1+'*'.repeat(p2.length)+p3 )
}
//Others
return urlString.replace(/password=([^&]*)/, (m,p) => 'password=' + '*'.repeat(p.length))




//power multiplication w/o * operator in 40 characters (not to use Math functions)
//first attempt, but still has * (thought it said **)
let madPow=(a,b)=>b?a*madPow(a,b-1):1
//combining above w/ previous madMul.  Unforntunately this is too long by 4 characters.
madPow=(a,b)=>b?~~(a/(1/madPow(a,b-1))+.5):1
//a little shorter, still one character long
madPow=(a,b)=>b?a/(1/madPow(a,b-1))<<0:1 //errors for rounding
madPow=m=(a,b)=>b?a/(1/m(a,b-1))<<0:1
//other solutions
madPow=(a,b)=>b?a/(1/madPow(a,--b))|0:1



//Starting Canvas Fun series.  It looks like it's using this npm package https://www.npmjs.com/package/canvas
//#1 Draw Lines
//my code
function drawLines(points) {
  var canvas = new Canvas(100,100)  //Create a 100 x 100 canvas
  var ctx = canvas.getContext('2d');
  ctx.fillStyle="#ffffff"
  ctx.fillRect(0,0,100,100)  //Draw background
  ctx.strokeStyle="#ff0000"  //Set pen's color
  ctx.beginPath()
  //Don't delete or modify the code above
  //Your code starts here:


  let start = points.shift()
  ctx.moveTo(start[0], start[1])
  for(let i=0; i<points.length; i++) {
    ctx.lineTo(points[i][0],points[i][1])
  }


  //Don't delete or modify the following code
  ctx.stroke()              //Draw the path you made above
  return canvas.toDataURL() //Returns the image data
}

//a test:
var points=[[20,20],[80,20],[80,80],[20,80],[20,20]],
userImage=drawLines(points),
expectedImage='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAABQ0lEQVR4nO3dMWrEMBBA0dmQg/loPppu5i1SpZ+QB/sfuBUSH6Fu/Hqe55kwvv57A/mtIJiCYAqCKQimIJiCYAqCKQimIJiCYAqCKQimIJiCYAqCKQimIJjv9RXve31J2nX9fEt2b8h9z5yzuiTtnPXz7t+Q6/qcW/IH5+wNwRQEUxBMQTAFwRQEUxBMQTAFwRQEUxBMQTAFwRQEUxBMQTAFwRQEUxBMQTAFwRQEUxBMQTAFwRQEUxBMQTAFwRQEUxBMQTAFwRQEUxBMQTAFwRQEUxBMQTAFwRQEUxBMQTAFwRQEUxBMQTAFwRQEUxBMQTAFwRQEUxBMQTAFwexPtj7ncyZbn7M6931mO8jy5njLg/hnZl794N7SG4IpCKYgmIJgCoIpCKYgmIJgCoIpCKYgmIJgCoIpCKYgmIJgCoIpCOYNCHkYxxmeBQcAAAAASUVORK5CYII='
showImage(userImage,expectedImage)
Test.assertEquals(userImage,expectedImage)



//Did my first translation
//converted the petals problem in python to javascript (started with an easy one)
function sakura_fall(v) {
  return v>0?400/v:0
}
//Writing the tests (just matching the orignal python version)
describe("Basic Tests", function(){
  Test.assertEquals(sakura_fall(5),80)
  Test.assertEquals(sakura_fall(10),40)
  Test.assertEquals(sakura_fall(200),2)
  Test.assertEquals(sakura_fall(-1),0)
  Test.assertEquals(sakura_fall(0),0)
  Test.assertEquals(sakura_fall(12.3),400.0/12.3)
  Test.assertEquals(sakura_fall(3),400.0/3)
});

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe("Random Tests", function(){
  for(let i=0; i<50; i++) {
    let a = randomInt(-10, 50);
    it (`Testing ${a}`, function(){
      Test.assertEquals(sakura_fall(a), a>0?400/a:0)
    })
  }
});



// string cleaning was a little too easy so I decided to do it in JS as well as python
function stringClean(s){
  return s.replace(/\d/g, '')
}



//Canvas #2 Two Rectangles
function draw(twoRectangles) {
  var canvas = new Canvas(100,100)  //Create a 100 x 100 canvas
  var ctx = canvas.getContext('2d');
  ctx.fillStyle="#ffffff"
  ctx.fillRect(0,0,100,100)  //Draw background
  //Don't delete or modify the code above

  //Your code:
  let [rect1,rect2] = twoRectangles;
  //flatten
  rect1 = rect1.reduce((a, b) => a.concat(b), []);
  rect2 = rect2.reduce((a, b) => a.concat(b), []);
  //reorder top left to bottom right
  rect1 = [Math.min(rect1[0], rect1[2]), Math.min(rect1[1], rect1[3]), Math.max(rect1[0], rect1[2]), Math.max(rect1[1], rect1[3])];
  rect2 = [Math.min(rect2[0], rect2[2]), Math.min(rect2[1], rect2[3]), Math.max(rect2[0], rect2[2]), Math.max(rect2[1], rect2[3])];
  //find intersection
  inter = [Math.max(rect1[0], rect2[0]), Math.max(rect1[1], rect2[1]), Math.min(rect1[2], rect2[2]), Math.min(rect1[3], rect2[3])];
  //reorder to [startx, starty, w, h] for fillRect
  rect1 = [rect1[0], rect1[1], rect1[2]-rect1[0]+1, rect1[3]-rect1[1]+1];
  rect2 = [rect2[0], rect2[1], rect2[2]-rect2[0]+1, rect2[3]-rect2[1]+1];
  inter = [inter[0], inter[1], inter[2]-inter[0]+1, inter[3]-inter[1]+1];
  //draw
  ctx.fillStyle="blue";
  ctx.fillRect(...rect1);
  ctx.fillRect(...rect2);
  if(inter.every(v=>v>0)) {
    ctx.fillStyle="black";
    ctx.fillRect(...inter);
  }

  //Don't delete or modify the following code
  return canvas.toDataURL() //Returns the image data
}


// One line task: mutliples of 3 and 5
// most of the challenge was figuring out how to get the rounding issues resolved
threesAndFives=(n)=>[--n/3-(n/15|0)|0,n/5-(n/15|0)|0,n/15|0]
// just a little more compressed
threesAndFives=Q=>[0|--Q/3-(H=Q/15|0),0|Q/5-H,H]
