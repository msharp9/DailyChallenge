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
