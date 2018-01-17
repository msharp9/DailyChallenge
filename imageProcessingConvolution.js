// for an input array:
// [
//   A_Red, A_Green, A_Blue, B_Red, B_Green, B_Blue, C_Red, C_Green, C_Blue,
//   D_Red, D_Green, D_Blue, E_Red, E_Green, E_Blue, F_Red, F_Green, F_Blue,
//   G_Red, G_Green, G_Blue, H_Red, H_Green, H_Blue, I_Red, I_Green, I_Blue
// ]
// apply weights for one convolution

function processImage(imageData, height, width, weights){
  //create Red/Green/Blue matrix
  var red = [],
      green = [],
      blue = [];
  for(var i=0; i<height; i++) {
    red.push([]);
    green.push([]);
    blue.push([]);
    for(var j=0; j<width; j++) {
      red[i].push(imageData[((i*width)+j)*3]);
      green[i].push(imageData[((i*width)+j)*3+1]);
      blue[i].push(imageData[((i*width)+j)*3+2]);
    }
  }

  //Process Data
  var wLength = weights.length;
  var center = Math.floor(wLength/2);

  //Create function to weight a pixel
  function weightPixel(neighborhood) {
    var wPixel = 0;
    for(var i=0; i<wLength; i++) {
      for(var j=0; j<wLength; j++) {
        wPixel += neighborhood[i][j] * weights[i][j];
      }
    }
    wPixel = wPixel > 255 ? 255 : Math.round(wPixel);
    return wPixel < 0 ? 0 : wPixel;
  }

  //Create function to import appropriate grid into weightPixel
  function findNeighborhood(mat, w, h) {
    var rowLimit = width - 1;
    var columnLimit = height - 1;
    var neighborhood = [];

    for(var x = w-center; x <= w+center; x++) {
      var row = [];
      for(var y = h-center; y <= h+center; y++) {
        var i = Math.max(0,x);
        i = Math.min(rowLimit,i);
        var j = Math.max(0,y);
        j = Math.min(columnLimit,j);
        row.push(mat[i][j]);
      }
      neighborhood.push(row);
    }
    return neighborhood;
  }

  //Make Copies
  var redOut = red.map(v => v.slice(0));
  var greenOut = green.map(v => v.slice(0));
  var blueOut = blue.map(v => v.slice(0));

  //Run through each pixel to weight it
  for(var i=0; i<height; i++) {
    for(var j=0; j<width; j++) {
      redOut[i][j] = weightPixel(findNeighborhood(red, i, j));
      greenOut[i][j] = weightPixel(findNeighborhood(green, i, j));
      blueOut[i][j] = weightPixel(findNeighborhood(blue, i, j));
    }
  }

  //Output picture into one array
  var weightedPic = [];
  for(var i=0; i<height; i++) {
    for(var j=0; j<width; j++) {
      weightedPic.push(redOut[i].shift());
      weightedPic.push(greenOut[i].shift());
      weightedPic.push(blueOut[i].shift());
    }
  }

  //return
  return weightedPic;
}


// Sample tests:
var TILE_SIZE = 36,
codewars = {
  "rgb":[200,41,28,201,47,33,202,49,33,201,46,33,201,48,32,201,47,32,201,46,33,201,49,32,203,48,32,201,49,34,201,47,33,202,48,32,202,47,34,202,47,32,201,48,33,202,47,33,201,47,33,201,49,34,201,48,32,201,47,34,201,49,32,201,47,32,202,47,32,201,49,34,201,47,34,201,47,32,202,47,34,201,48,33,202,47,33,201,49,32,201,48,32,201,49,32,202,48,34,201,48,32,201,48,33,195,45,30,202,49,31,201,47,32,201,49,33,201,48,34,202,48,33,202,47,32,202,47,34,201,48,33,201,49,33,201,48,32,201,47,32,201,49,34,202,47,34,203,48,34,201,48,33,202,47,34,201,48,32,202,47,33,201,47,32,201,47,33,201,47,33,201,47,33,202,47,34,202,48,33,201,49,34,202,47,32,201,48,32,202,47,32,202,47,33,202,47,33,201,48,32,201,48,32,201,48,32,201,47,32,201,47,32,201,46,32,201,48,32,202,48,32,201,48,32,203,45,31,203,49,34,202,48,33,201,49,33,201,47,33,201,49,34,201,46,33,201,48,32,201,47,32,201,47,34,201,47,32,202,48,33,201,49,32,201,48,33,201,47,33,201,46,33,201,49,32,201,49,34,201,48,33,201,47,33,203,47,34,201,49,32,201,47,32,201,49,32,201,49,32,202,47,32,201,48,32,201,47,32,201,47,33,201,48,32,202,48,32,202,48,34,201,48,32,201,48,32,201,48,32,202,48,31,200,45,30,201,49,31,202,48,33,201,49,33,202,48,33,201,48,32,201,48,32,202,49,34,201,47,34,202,47,33,200,45,30,199,45,33,195,42,28,153,0,0,191,35,21,199,48,32,202,48,34,201,48,32,201,47,33,202,46,33,201,48,32,202,47,33,201,48,33,201,48,33,201,48,32,202,48,34,201,46,33,201,47,33,203,47,34,201,49,34,201,48,34,202,48,32,202,48,34,202,48,34,201,47,33,202,47,33,202,49,33,202,49,33,202,48,33,202,47,34,202,47,33,202,47,34,202,47,32,201,48,33,199,45,33,182,49,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200,47,30,200,46,32,201,46,34,202,48,33,201,49,32,201,49,34,202,47,32,201,47,32,201,47,33,201,47,33,201,49,33,201,48,32,203,47,34,201,48,34,201,47,32,201,46,33,203,47,34,202,47,34,201,47,33,201,48,33,201,49,34,201,47,32,201,47,33,202,48,33,203,47,34,202,48,33,197,43,34,0,0,0,0,0,0,0,0,0,146,0,0,201,43,33,201,45,30,201,45,31,202,48,32,0,0,0,0,0,0,170,0,0,186,29,20,199,48,26,197,45,27,198,42,28,200,46,32,201,48,32,201,48,32,203,48,34,201,49,32,201,48,32,202,46,34,201,47,32,201,49,34,201,49,34,201,48,33,201,49,34,202,47,33,202,47,34,201,49,33,202,47,34,201,48,32,201,49,34,202,47,34,202,48,34,0,0,0,0,0,0,0,0,0,200,41,28,202,48,30,202,46,33,201,47,32,203,47,34,189,33,33,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,170,21,0,203,42,28,202,49,31,201,48,32,201,47,32,201,48,34,201,48,34,201,47,32,202,48,33,201,49,32,202,47,33,202,47,32,202,47,34,202,47,34,201,48,32,203,48,32,202,49,32,202,47,32,200,44,30,159,32,32,0,0,0,0,0,0,197,44,22,202,47,33,203,47,34,201,48,32,201,48,33,203,43,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,202,32,32,0,0,0,0,0,0,0,0,0,0,0,0,162,23,0,203,49,33,202,49,34,201,47,33,202,48,34,201,48,32,201,49,34,201,47,32,202,48,33,201,47,32,202,47,32,202,47,33,202,47,33,201,46,32,201,48,33,203,47,32,170,0,0,0,0,0,0,0,0,182,49,12,202,48,30,200,46,31,200,47,34,200,47,32,193,44,25,128,0,0,0,0,0,0,0,0,191,48,32,202,49,30,199,48,33,202,47,33,202,47,32,200,46,32,185,35,12,0,0,0,0,0,0,162,23,0,200,45,30,201,48,34,202,48,32,202,47,33,201,49,32,201,46,32,201,48,33,202,47,32,202,47,32,203,48,34,201,48,32,199,43,30,128,0,0,128,0,0,0,0,0,0,0,0,0,0,0,202,46,27,201,49,33,201,48,32,202,48,33,201,47,32,195,45,30,0,0,0,159,32,32,200,46,30,201,48,32,201,47,34,201,48,32,201,47,33,201,48,32,203,48,34,202,46,33,200,46,33,170,0,0,0,0,0,191,35,21,200,47,34,201,48,32,203,47,34,202,47,32,202,48,34,201,49,34,201,49,34,203,48,34,203,48,32,201,48,33,0,0,0,153,0,0,203,41,29,170,0,0,0,0,0,0,0,0,198,47,34,201,47,32,201,47,33,201,47,33,197,45,29,0,0,0,0,0,0,201,48,33,201,48,32,201,47,32,203,47,34,201,49,34,201,48,32,202,49,34,201,47,33,201,48,32,201,47,34,201,45,31,128,0,0,0,0,0,203,48,31,201,48,32,201,46,33,203,47,34,202,47,34,201,48,32,201,47,32,201,47,33,202,47,32,0,0,0,0,0,0,201,45,31,203,46,33,159,32,32,0,0,0,170,0,0,202,48,30,202,47,33,202,47,34,202,46,34,185,35,12,0,0,0,202,42,30,202,49,32,201,47,32,202,47,32,201,46,33,200,46,31,202,46,32,201,49,34,200,46,34,200,46,31,201,46,33,201,49,32,198,44,31,0,0,0,199,47,28,201,49,33,202,48,32,201,48,32,201,47,33,201,49,34,201,47,32,202,48,34,195,45,30,0,0,0,186,29,20,201,49,34,201,49,32,199,46,31,0,0,0,200,33,22,202,48,32,201,47,33,202,47,32,202,46,33,189,38,19,0,0,0,200,46,33,201,48,32,201,48,32,201,46,34,198,49,29,177,20,20,0,0,0,0,0,0,0,0,0,128,0,0,194,41,31,203,47,26,203,47,26,0,0,0,202,48,32,201,48,34,201,47,34,201,47,32,202,47,32,202,47,32,202,47,32,202,44,33,0,0,0,0,0,0,202,47,33,202,47,34,201,47,33,201,48,31,0,0,0,0,0,0,198,45,28,203,48,32,203,48,32,201,48,33,182,49,12,0,0,0,200,47,32,202,48,34,199,47,34,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,198,47,34,202,48,33,202,48,34,201,48,32,203,49,33,201,48,32,202,47,32,201,48,31,0,0,0,0,0,0,202,46,34,201,47,32,203,48,34,199,47,32,170,0,0,0,0,0,187,34,17,203,49,34,204,49,34,202,47,32,128,0,0,0,0,0,203,49,33,201,48,33,0,0,0,0,0,0,197,44,22,201,48,31,202,49,30,200,46,33,198,47,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,191,46,18,200,47,32,203,47,34,202,46,33,200,46,31,201,48,32,202,47,33,199,47,28,0,0,0,0,0,0,202,49,30,203,48,32,201,48,32,201,49,34,200,46,34,0,0,0,0,0,0,182,18,0,202,48,33,201,47,33,200,46,34,0,0,0,191,35,21,128,0,0,200,41,28,201,46,32,201,48,32,201,47,34,202,48,33,202,48,34,202,46,32,203,46,31,199,46,30,0,0,0,0,0,0,0,0,0,0,0,0,202,49,30,201,49,32,201,49,32,201,46,32,201,47,33,201,48,31,170,0,0,0,0,0,0,0,0,201,48,33,203,48,34,201,47,32,203,47,34,203,47,34,199,48,26,170,21,0,0,0,0,153,0,0,199,49,34,202,48,31,189,38,19,0,0,0,0,0,0,197,43,34,200,46,33,201,48,33,201,47,34,202,47,32,201,47,32,201,46,32,201,46,32,201,47,32,200,46,30,0,0,0,0,0,0,0,0,0,199,48,32,201,49,34,202,48,33,201,48,33,201,48,32,202,49,33,182,49,12,0,0,0,0,0,0,203,42,28,201,47,32,201,49,34,202,46,33,200,46,32,202,46,33,200,46,31,202,42,30,0,0,0,0,0,0,175,48,32,153,0,0,0,0,0,0,0,0,153,0,0,146,0,0,170,0,0,182,49,12,200,46,34,202,48,33,203,48,34,202,48,33,202,48,33,202,47,32,200,46,34,0,0,0,0,0,0,170,0,0,199,47,34,201,48,33,201,47,34,203,47,34,203,47,34,202,48,34,170,0,0,0,0,0,0,0,0,200,45,28,203,48,32,201,49,34,201,48,31,202,46,32,203,48,32,201,47,32,203,48,34,203,47,31,203,46,31,187,34,17,0,0,0,0,0,0,198,44,31,201,48,30,170,0,0,0,0,0,0,0,0,193,40,23,199,45,30,202,46,33,201,47,32,202,46,34,200,46,32,182,49,12,0,0,0,0,0,0,198,49,29,201,49,34,201,47,32,201,47,32,202,49,33,200,46,32,177,20,20,0,0,0,0,0,0,170,0,0,202,49,31,201,47,32,201,48,32,202,47,32,202,47,32,203,48,32,202,48,34,202,47,34,200,45,28,0,0,0,189,38,19,0,0,0,197,41,33,201,48,32,202,49,31,199,46,33,0,0,0,0,0,0,202,42,30,201,46,33,201,46,33,203,47,34,201,49,34,201,48,33,0,0,0,0,0,0,199,46,31,201,49,34,201,48,33,201,47,32,202,48,34,199,48,33,182,49,12,0,0,0,0,0,0,0,0,0,0,0,0,203,47,26,201,48,34,202,48,34,202,49,33,201,45,31,201,48,33,159,32,32,0,0,0,198,42,28,201,48,32,159,32,32,128,0,0,202,48,30,201,49,34,203,48,32,196,43,27,0,0,0,128,0,0,197,45,29,201,46,33,202,48,33,201,49,34,197,44,33,0,0,0,0,0,0,196,39,25,202,48,33,201,48,34,201,48,33,201,46,34,201,49,31,196,43,27,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,170,0,0,0,0,0,0,0,0,0,0,0,200,41,28,201,46,33,201,48,32,153,0,0,0,0,0,198,44,28,201,47,33,201,47,32,201,48,32,153,0,0,0,0,0,0,0,0,200,46,30,202,48,33,202,48,34,200,44,30,0,0,0,188,27,27,201,49,34,201,47,33,201,48,32,201,48,31,201,46,32,202,47,33,199,46,31,0,0,0,175,48,32,184,28,14,189,38,19,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,191,35,21,198,44,28,201,49,32,202,48,34,202,47,31,0,0,0,170,0,0,202,43,32,201,46,33,201,47,32,202,47,32,203,42,28,0,0,0,0,0,0,202,48,32,201,48,32,202,48,33,194,41,31,0,0,0,200,41,28,202,47,34,201,47,33,202,46,34,202,49,31,202,48,33,201,47,33,195,45,30,0,0,0,200,41,28,203,49,33,201,47,32,200,46,31,199,48,26,198,49,29,203,48,31,199,47,34,202,48,33,202,47,32,202,47,32,201,47,32,198,49,29,0,0,0,146,0,0,201,45,34,202,46,33,202,49,33,202,48,33,198,47,29,0,0,0,0,0,0,191,46,18,201,48,32,198,49,29,0,0,0,0,0,0,202,46,27,202,47,32,202,47,34,202,48,34,202,46,33,202,46,34,201,48,33,202,44,33,0,0,0,159,32,32,201,45,31,202,47,34,201,47,34,202,48,33,202,47,33,201,48,32,201,47,32,202,47,34,201,48,32,202,47,34,201,49,31,182,18,0,0,0,0,128,0,0,201,48,31,201,47,32,202,47,33,201,47,33,201,46,29,0,0,0,0,0,0,189,38,19,200,46,30,0,0,0,0,0,0,187,34,17,201,47,33,201,48,33,201,49,34,202,48,34,202,47,33,202,49,33,202,47,32,200,45,31,0,0,0,0,0,0,194,41,31,203,46,30,202,47,32,201,48,33,203,48,32,202,47,34,202,47,34,202,47,34,201,47,32,202,48,32,201,39,31,0,0,0,170,0,0,203,47,34,201,47,32,201,47,32,201,48,32,202,48,33,197,41,33,0,0,0,0,0,0,128,0,0,159,32,32,0,0,0,200,39,28,201,49,32,201,48,33,201,47,32,201,47,32,202,46,32,201,47,32,201,48,33,201,47,32,201,47,32,201,38,33,0,0,0,0,0,0,146,0,0,197,45,29,201,47,33,202,48,33,202,48,34,203,48,32,201,48,34,199,47,28,177,20,20,0,0,0,0,0,0,184,28,14,201,48,33,202,47,33,202,48,33,203,49,33,202,47,32,128,0,0,0,0,0,0,0,0,0,0,0,146,0,0,197,45,29,201,47,33,202,49,32,201,47,32,202,47,32,202,48,34,203,47,34,201,49,32,202,47,33,201,49,34,201,49,34,201,47,33,200,45,30,0,0,0,0,0,0,0,0,0,177,20,20,191,35,21,193,44,25,191,48,32,170,21,0,0,0,0,0,0,0,0,0,0,199,46,31,200,46,31,203,48,32,202,48,33,201,47,33,202,47,32,203,43,34,0,0,0,0,0,0,0,0,0,188,27,27,200,49,30,202,47,32,201,48,32,202,48,33,203,48,32,202,47,34,201,47,33,200,46,31,201,49,33,201,49,33,201,47,32,201,49,31,202,49,31,201,48,31,191,48,32,159,32,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,170,0,0,0,0,0,162,23,0,202,47,32,201,47,32,203,48,34,201,47,33,201,47,32,203,47,34,0,0,0,0,0,0,0,0,0,202,48,32,201,47,32,201,47,32,201,48,33,202,48,33,202,47,33,201,49,34,201,48,34,200,46,31,202,45,34,201,47,32,202,46,32,201,48,31,201,45,31,200,45,30,203,49,34,202,49,33,202,49,31,170,21,0,0,0,0,153,0,0,0,0,0,0,0,0,0,0,0,185,35,12,199,48,26,202,48,34,203,48,32,201,49,32,202,47,33,201,48,32,200,45,29,0,0,0,0,0,0,0,0,0,191,35,21,201,48,33,202,47,32,202,48,33,201,47,33,202,49,33,202,48,33,202,47,33,201,46,34,200,46,34,199,47,34,202,46,34,201,46,33,200,46,31,202,45,34,199,48,33,202,45,34,201,49,31,201,48,32,203,47,32,199,47,32,202,48,30,198,47,34,200,39,28,170,0,0,0,0,0,199,48,26,199,47,34,201,45,34,203,43,34,200,44,30,170,0,0,0,0,0,0,0,0,0,0,0,0,0,0,201,48,31,202,47,34,203,48,34,201,48,32,201,48,34,201,49,31,201,48,32,201,49,32,200,47,34,203,47,32,201,45,31,201,47,33,201,49,31,201,45,31,201,49,34,200,45,31,200,46,30,202,47,33,202,47,32,201,48,33,201,48,32,202,49,32,202,47,34,201,48,34,200,46,34,195,45,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,153,0,0,198,44,28,199,47,32,203,47,34,202,48,33,203,48,34,202,49,31,202,46,32,201,47,32,201,49,33,201,49,32,202,48,33,200,47,34,203,46,33,201,48,33,201,47,34,201,46,32,200,47,32,200,49,30,201,46,34,202,49,33,201,47,32,201,48,32,202,49,33,202,48,33,201,49,32,203,47,34,201,49,32,203,49,34,201,48,33,193,44,18,202,32,32,0,0,0,0,0,0,200,45,30,195,45,30,201,43,33,202,47,32,201,49,32,201,46,33,201,47,32,202,46,34,201,48,32,201,46,34,202,48,33,201,48,32,201,46,33,201,47,32,202,48,32,201,48,32,202,48,33,201,47,32,201,46,33,202,48,34,201,48,33,202,46,33,202,46,33,201,48,33,201,47,32,203,47,34,201,47,34,201,47,33,202,47,33,201,48,33,201,48,33,201,46,32,203,47,32,202,47,33,199,45,33,200,46,33,201,48,32,201,49,32,201,47,32,202,48,32,201,48,31,200,46,32,203,48,34,201,49,31,201,49,31,200,47,32,202,47,32,202,48,32,202,48,34,201,48,32,202,47,34,201,49,33,203,49,34,202,48,32,201,49,34,202,48,32,202,49,31,202,48,33,201,47,32,202,47,33,201,48,33,201,48,33,201,48,33,202,46,34,202,46,32,201,48,31,203,45,31,200,49,31,202,48,33,203,45,31,201,47,34,201,46,33,201,48,32,202,47,33,201,47,32,201,49,34,201,45,31,201,46,34,201,46,34,203,47,31,201,48,32,202,49,31,203,48,34,201,46,33,201,49,34,201,48,33,201,49,34,201,49,31,193,44,18,201,46,32,202,48,33,201,47,33,203,47,34,202,46,33,200,47,34,202,46,34,203,47,34,201,49,31,201,48,33,202,47,33,201,48,34,201,48,32,203,47,31,200,49,30,201,48,31,200,46,30,200,46,32,201,48,33,201,47,32,201,49,32,202,47,33,201,49,34,200,46,31,203,49,33,202,47,33,201,45,31,202,46,33,203,48,34,201,47,33,201,47,32,203,47,34,201,47,34,202,46,32,187,34,17],
  "rgba":[200,41,28,37,201,47,33,164,202,49,33,178,201,46,33,188,201,48,32,208,201,47,32,207,201,46,33,188,201,49,32,199,203,48,32,214,201,49,34,204,201,47,33,195,202,48,32,192,202,47,34,211,202,47,32,206,201,48,33,203,202,47,33,210,201,47,33,195,201,49,34,189,201,48,32,193,201,47,34,174,201,49,32,183,201,47,32,185,202,47,32,191,201,49,34,204,201,47,34,212,201,47,32,200,202,47,34,205,201,48,33,203,202,47,33,201,201,49,32,199,201,48,32,208,201,49,32,199,202,48,34,197,201,48,32,213,201,48,33,171,195,45,30,34,202,49,31,173,201,47,32,200,201,49,33,194,201,48,34,181,202,48,33,187,202,47,32,206,202,47,34,205,201,48,33,203,201,49,33,209,201,48,32,198,201,47,32,200,201,49,34,204,202,47,34,205,203,48,34,219,201,48,33,203,202,47,34,211,201,48,32,213,202,47,33,201,201,47,32,207,201,47,33,179,201,47,33,179,201,47,33,195,202,47,34,205,202,48,33,202,201,49,34,204,202,47,32,206,201,48,32,213,202,47,32,206,202,47,33,201,202,47,33,201,201,48,32,208,201,48,32,193,201,48,32,198,201,47,32,207,201,47,32,200,201,46,32,161,201,48,32,213,202,48,32,192,201,48,32,160,203,45,31,146,203,49,34,152,202,48,33,187,201,49,33,209,201,47,33,195,201,49,34,189,201,46,33,188,201,48,32,198,201,47,32,207,201,47,34,212,201,47,32,223,202,48,33,202,201,49,32,183,201,48,33,171,201,47,33,164,201,46,33,188,201,49,32,183,201,49,34,189,201,48,33,171,201,47,33,180,203,47,34,196,201,49,32,199,201,47,32,207,201,49,32,199,201,49,32,199,202,47,32,206,201,48,32,193,201,47,32,200,201,47,33,195,201,48,32,193,202,48,32,192,202,48,34,197,201,48,32,208,201,48,32,198,201,48,32,193,202,48,31,139,200,45,30,135,201,49,31,157,202,48,33,186,201,49,33,209,202,48,33,202,201,48,32,193,201,48,32,198,202,49,34,220,201,47,34,227,202,47,33,163,200,45,30,102,199,45,33,124,195,42,28,55,153,0,0,10,191,35,21,36,199,48,32,64,202,48,34,91,201,48,32,176,201,47,33,180,202,46,33,172,201,48,32,193,202,47,33,201,201,48,33,203,201,48,33,203,201,48,32,198,202,48,34,197,201,46,33,188,201,47,33,195,203,47,34,196,201,49,34,189,201,48,34,181,202,48,32,192,202,48,34,197,202,48,34,197,201,47,33,195,202,47,33,163,202,49,33,178,202,49,33,178,202,48,33,187,202,47,34,205,202,47,33,210,202,47,34,205,202,47,32,221,201,48,33,203,199,45,33,124,182,49,12,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200,47,30,60,200,46,32,145,201,46,34,151,202,48,33,187,201,49,32,199,201,49,34,189,202,47,32,221,201,47,32,200,201,47,33,179,201,47,33,180,201,49,33,194,201,48,32,193,203,47,34,175,201,48,34,181,201,47,32,185,201,46,33,188,203,47,34,196,202,47,34,205,201,47,33,195,201,48,33,203,201,49,34,204,201,47,32,200,201,47,33,195,202,48,33,202,203,47,34,196,202,48,33,186,197,43,34,53,0,0,0,0,0,0,0,0,0,0,0,0,146,0,0,7,201,43,33,94,201,45,30,103,201,45,31,108,202,48,32,48,0,0,0,0,0,0,0,0,170,0,0,6,186,29,20,26,199,48,26,59,197,45,27,57,198,42,28,54,200,46,32,145,201,48,32,224,201,48,32,193,203,48,34,166,201,49,32,183,201,48,32,176,202,46,34,167,201,47,32,184,201,49,34,189,201,49,34,189,201,48,33,203,201,49,34,204,202,47,33,210,202,47,34,211,201,49,33,209,202,47,34,211,201,48,32,193,201,49,34,189,202,47,34,205,202,48,34,91,0,0,0,0,0,0,0,0,0,0,0,0,200,41,28,37,202,48,30,134,202,46,33,172,201,47,32,184,203,47,34,175,189,33,33,31,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,170,21,0,12,203,42,28,73,202,49,31,115,201,48,32,198,201,47,32,190,201,48,34,181,201,48,34,181,201,47,32,184,202,48,33,187,201,49,32,199,202,47,33,201,202,47,32,206,202,47,34,211,202,47,34,211,201,48,32,208,203,48,32,214,202,49,32,215,202,47,32,216,200,44,30,92,159,32,32,8,0,0,0,0,0,0,0,0,197,44,22,35,202,47,33,125,203,47,34,175,201,48,32,160,201,48,33,171,203,43,34,83,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,202,32,32,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,162,23,0,11,203,49,33,147,202,49,34,220,201,47,33,195,202,48,34,197,201,48,32,198,201,49,34,189,201,47,32,190,202,48,33,202,201,47,32,207,202,47,32,206,202,47,33,210,202,47,33,201,201,46,32,161,201,48,33,171,203,47,32,137,170,0,0,9,0,0,0,0,0,0,0,0,182,49,12,21,202,48,30,134,200,46,31,154,200,47,34,159,200,47,32,153,193,44,25,41,128,0,0,4,0,0,0,0,0,0,0,0,191,48,32,32,202,49,30,110,199,48,33,133,202,47,33,163,202,47,32,168,200,46,32,145,185,35,12,22,0,0,0,0,0,0,0,0,162,23,0,11,200,45,30,102,201,48,34,181,202,48,32,192,202,47,33,201,201,49,32,183,201,46,32,161,201,48,33,203,202,47,32,206,202,47,32,206,203,48,34,219,201,48,32,213,199,43,30,77,128,0,0,4,128,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,202,46,27,67,201,49,33,209,201,48,32,160,202,48,33,186,201,47,32,169,195,45,30,17,0,0,0,0,159,32,32,8,200,46,30,143,201,48,32,213,201,47,34,212,201,48,32,193,201,47,33,195,201,48,32,213,203,48,34,219,202,46,33,172,200,46,33,116,170,0,0,6,0,0,0,0,191,35,21,36,200,47,34,159,201,48,32,198,203,47,34,196,202,47,32,191,202,48,34,182,201,49,34,204,201,49,34,204,203,48,34,219,203,48,32,214,201,48,33,85,0,0,0,0,153,0,0,5,203,41,29,44,170,0,0,6,0,0,0,0,0,0,0,0,198,47,34,76,201,47,32,223,201,47,33,195,201,47,33,195,197,45,29,79,0,0,0,0,0,0,0,0,201,48,33,85,201,48,32,208,201,47,32,222,203,47,34,196,201,49,34,204,201,48,32,224,202,49,34,220,201,47,33,217,201,48,32,224,201,47,34,228,201,45,31,141,128,0,0,4,0,0,0,0,203,48,31,107,201,48,32,213,201,46,33,188,203,47,34,196,202,47,34,205,201,48,32,198,201,47,32,207,201,47,33,232,202,47,32,120,0,0,0,0,0,0,0,0,201,45,31,108,203,46,33,132,159,32,32,8,0,0,0,0,170,0,0,9,202,48,30,134,202,47,33,210,202,47,34,205,202,46,34,167,185,35,12,22,0,0,0,0,202,42,30,43,202,49,32,215,201,47,32,200,202,47,32,231,201,46,33,188,200,46,31,154,202,46,32,177,201,49,34,136,200,46,34,106,200,46,31,154,201,46,33,188,201,49,32,199,198,44,31,58,0,0,0,0,199,47,28,82,201,49,33,209,202,48,32,192,201,48,32,198,201,47,33,195,201,49,34,204,201,47,32,222,202,48,34,197,195,45,30,34,0,0,0,0,186,29,20,26,201,49,34,204,201,49,32,199,199,46,31,50,0,0,0,0,200,33,22,23,202,48,32,192,201,47,33,217,202,47,32,206,202,46,33,172,189,38,19,27,0,0,0,0,200,46,33,116,201,48,32,224,201,48,32,208,201,46,34,151,198,49,29,89,177,20,20,13,0,0,0,0,0,0,0,0,0,0,0,0,128,0,0,4,194,41,31,25,203,47,26,49,203,47,26,49,0,0,0,0,202,48,32,48,201,48,34,181,201,47,34,174,201,47,32,169,202,47,32,168,202,47,32,216,202,47,32,221,202,44,33,86,0,0,0,0,0,0,0,0,202,47,33,125,202,47,34,226,201,47,33,233,201,48,31,75,0,0,0,0,0,0,0,0,198,45,28,90,203,48,32,245,203,48,32,229,201,48,33,171,182,49,12,21,0,0,0,0,200,47,32,153,202,48,34,235,199,47,34,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,198,47,34,76,202,48,33,202,202,48,34,182,201,48,32,160,203,49,33,147,201,48,32,208,202,47,32,221,201,48,31,75,0,0,0,0,0,0,0,0,202,46,34,167,201,47,32,238,203,48,34,219,199,47,32,104,170,0,0,3,0,0,0,0,187,34,17,15,203,49,34,152,204,49,34,255,202,47,32,168,128,0,0,4,0,0,0,0,203,49,33,147,201,48,33,117,0,0,0,0,0,0,0,0,197,44,22,35,201,48,31,75,202,49,30,110,200,46,33,140,198,47,29,71,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,191,46,18,28,200,47,32,153,203,47,34,196,202,46,33,172,200,46,31,154,201,48,32,193,202,47,33,201,199,47,28,82,0,0,0,0,0,0,0,0,202,49,30,110,203,48,32,214,201,48,32,213,201,49,34,204,200,46,34,121,0,0,0,0,0,0,0,0,182,18,0,14,202,48,33,149,201,47,33,233,200,46,34,106,0,0,0,0,191,35,21,36,128,0,0,4,200,41,28,37,201,46,32,161,201,48,32,224,201,47,34,212,202,48,33,202,202,48,34,234,202,46,32,177,203,46,31,122,199,46,30,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,202,49,30,110,201,49,32,199,201,49,32,183,201,46,32,161,201,47,33,195,201,48,31,165,170,0,0,9,0,0,0,0,0,0,0,0,201,48,33,85,203,48,34,219,201,47,32,200,203,47,34,196,203,47,34,175,199,48,26,59,170,21,0,12,0,0,0,0,153,0,0,5,199,49,34,68,202,48,31,139,189,38,19,27,0,0,0,0,0,0,0,0,197,43,34,53,200,46,33,140,201,48,33,170,201,47,34,212,202,47,32,221,201,47,32,185,201,46,32,161,201,46,32,161,201,47,32,190,200,46,30,111,0,0,0,0,0,0,0,0,0,0,0,0,199,48,32,64,201,49,34,189,202,48,33,186,201,48,33,155,201,48,32,213,202,49,33,178,182,49,12,21,0,0,0,0,0,0,0,0,203,42,28,73,201,47,32,200,201,49,34,204,202,46,33,172,200,46,32,145,202,46,33,172,200,46,31,154,202,42,30,43,0,0,0,0,0,0,0,0,175,48,32,16,153,0,0,5,0,0,0,0,0,0,0,0,153,0,0,5,146,0,0,7,170,0,0,6,182,49,12,21,200,46,34,106,202,48,33,187,203,48,34,166,202,48,33,149,202,48,33,187,202,47,32,191,200,46,34,106,0,0,0,0,0,0,0,0,170,0,0,3,199,47,34,114,201,48,33,203,201,47,34,174,203,47,34,196,203,47,34,196,202,48,34,144,170,0,0,9,0,0,0,0,0,0,0,1,200,45,28,74,203,48,32,214,201,49,34,189,201,48,31,165,202,46,32,177,203,48,32,214,201,47,32,222,203,48,34,166,203,47,31,142,203,46,31,122,187,34,17,15,0,0,0,0,0,0,0,0,198,44,31,58,201,48,30,118,170,0,0,9,0,0,0,0,0,0,0,0,193,40,23,45,199,45,30,119,202,46,33,172,201,47,32,169,202,46,34,167,200,46,32,145,182,49,12,21,0,0,0,0,0,0,0,0,198,49,29,89,201,49,34,204,201,47,32,184,201,47,32,185,202,49,33,178,200,46,32,145,177,20,20,13,0,0,0,0,0,0,0,0,170,0,0,3,202,49,31,115,201,47,32,190,201,48,32,208,202,47,32,216,202,47,32,221,203,48,32,229,202,48,34,234,202,47,34,205,200,45,28,74,0,0,0,0,189,38,19,27,0,0,0,0,197,41,33,62,201,48,32,224,202,49,31,173,199,46,33,78,0,0,0,0,0,0,0,0,202,42,30,43,201,46,33,188,201,46,33,188,203,47,34,175,201,49,34,189,201,48,33,85,0,0,0,0,0,0,0,0,199,46,31,100,201,49,34,204,201,48,33,170,201,47,32,185,202,48,34,182,199,48,33,133,182,49,12,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,203,47,26,49,201,48,34,128,202,48,34,144,202,49,33,178,201,45,31,141,201,48,33,85,159,32,32,8,0,0,0,0,198,42,28,54,201,48,32,160,159,32,32,8,128,0,0,4,202,48,30,134,201,49,34,241,203,48,32,214,196,43,27,65,0,0,0,0,128,0,0,4,197,45,29,79,201,46,33,188,202,48,33,186,201,49,34,189,197,44,33,70,0,0,0,0,0,0,0,0,196,39,25,52,202,48,33,186,201,48,34,181,201,48,33,171,201,46,34,151,201,49,31,157,196,43,27,65,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,170,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,200,41,28,37,201,46,33,188,201,48,32,208,153,0,0,10,0,0,0,1,198,44,28,81,201,47,33,180,201,47,32,222,201,48,32,176,153,0,0,10,0,0,0,0,0,0,0,0,200,46,30,143,202,48,33,187,202,48,34,182,200,44,30,69,0,0,0,0,188,27,27,19,201,49,34,136,201,47,33,180,201,48,32,176,201,48,31,165,201,46,32,161,202,47,33,163,199,46,31,50,0,0,0,0,175,48,32,16,184,28,14,18,189,38,19,27,128,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,191,35,21,36,198,44,28,81,201,49,32,183,202,48,34,234,202,47,31,158,0,0,0,2,170,0,0,3,202,43,32,72,201,46,33,156,201,47,32,185,202,47,32,216,203,42,28,73,0,0,0,0,0,0,0,1,202,48,32,96,201,48,32,213,202,48,33,186,194,41,31,25,0,0,0,0,200,41,28,37,202,47,34,205,201,47,33,195,202,46,34,167,202,49,31,173,202,48,33,186,201,47,33,164,195,45,30,34,0,0,0,0,200,41,28,37,203,49,33,147,201,47,32,184,200,46,31,138,199,48,26,59,198,49,29,89,203,48,31,107,199,47,34,114,202,48,33,186,202,47,32,221,202,47,32,221,201,47,32,238,198,49,29,89,0,0,0,0,146,0,0,7,201,45,34,113,202,46,33,172,202,49,33,178,202,48,33,202,198,47,29,71,0,0,0,0,0,0,0,0,191,46,18,28,201,48,32,193,198,49,29,89,0,0,0,0,0,0,0,0,202,46,27,67,202,47,32,206,202,47,34,205,202,48,34,182,202,46,33,172,202,46,34,167,201,48,33,170,202,44,33,86,0,0,0,0,159,32,32,8,201,45,31,141,202,47,34,211,201,47,34,212,202,48,33,202,202,47,33,210,201,48,32,198,201,47,32,200,202,47,34,205,201,48,32,213,202,47,34,226,201,49,31,157,182,18,0,14,0,0,0,0,128,0,0,4,201,48,31,123,201,47,32,190,202,47,33,201,201,47,33,195,201,46,29,61,0,0,0,0,0,0,0,0,189,38,19,27,200,46,30,111,0,0,0,1,0,0,0,0,187,34,17,30,201,47,33,180,201,48,33,218,201,49,34,204,202,48,34,182,202,47,33,148,202,49,33,178,202,47,32,191,200,45,31,130,0,0,0,0,0,0,0,0,194,41,31,25,203,46,30,127,202,47,32,206,201,48,33,218,203,48,32,214,202,47,34,211,202,47,34,205,202,47,34,205,201,47,32,223,202,48,32,192,201,39,31,33,0,0,0,0,170,0,0,3,203,47,34,98,201,47,32,185,201,47,32,184,201,48,32,213,202,48,33,202,197,41,33,62,0,0,0,0,0,0,0,0,128,0,0,4,159,32,32,8,0,0,0,0,200,39,28,46,201,49,32,183,201,48,33,218,201,47,32,207,201,47,32,200,202,46,32,177,201,47,32,184,201,48,33,203,201,47,32,207,201,47,32,185,201,38,33,47,0,0,0,0,0,0,0,0,146,0,0,7,197,45,29,79,201,47,33,179,202,48,33,187,202,48,34,182,203,48,32,214,201,48,34,181,199,47,28,82,177,20,20,13,0,0,0,0,0,0,0,0,184,28,14,18,201,48,33,171,202,47,33,210,202,48,33,202,203,49,33,225,202,47,32,120,128,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,146,0,0,7,197,45,29,79,201,47,33,179,202,49,32,230,201,47,32,207,202,47,32,206,202,48,34,197,203,47,34,175,201,49,32,199,202,47,33,201,201,49,34,189,201,49,34,189,201,47,33,179,200,45,30,51,0,0,0,0,0,0,0,0,0,0,0,0,177,20,20,13,191,35,21,36,193,44,25,41,191,48,32,32,170,21,0,12,0,0,0,0,0,0,0,0,0,0,0,0,199,46,31,50,200,46,31,154,203,48,32,214,202,48,33,202,201,47,33,217,202,47,32,221,203,43,34,83,0,0,0,0,0,0,0,0,0,0,0,0,188,27,27,19,200,49,30,126,202,47,32,221,201,48,32,208,202,48,33,202,203,48,32,214,202,47,34,211,201,47,33,179,200,46,31,154,201,49,33,194,201,49,33,194,201,47,32,184,201,49,31,157,202,49,31,173,201,48,31,123,191,48,32,32,159,32,32,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,170,0,0,3,0,0,0,0,162,23,0,11,202,47,32,168,201,47,32,222,203,48,34,219,201,47,33,232,201,47,32,223,203,47,34,98,0,0,0,0,0,0,0,0,0,0,0,0,202,48,32,48,201,47,32,169,201,47,32,200,201,48,33,203,202,48,33,186,202,47,33,201,201,49,34,204,201,48,34,181,200,46,31,138,202,45,34,129,201,47,32,184,202,46,32,177,201,48,31,165,201,45,31,141,200,45,30,135,203,49,34,152,202,49,33,178,202,49,31,115,170,21,0,12,0,0,0,0,153,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,185,35,12,22,199,48,26,59,202,48,34,144,203,48,32,214,201,49,32,199,202,47,33,210,201,48,32,176,200,45,29,97,0,0,0,2,0,0,0,0,0,0,0,0,191,35,21,36,201,48,33,203,202,47,32,206,202,48,33,202,201,47,33,195,202,49,33,178,202,48,33,202,202,47,33,201,201,46,34,151,200,46,34,121,199,47,34,114,202,46,34,167,201,46,33,156,200,46,31,138,202,45,34,129,199,48,33,133,202,45,34,129,201,49,31,157,201,48,32,193,203,47,32,137,199,47,32,104,202,48,30,134,198,47,34,76,200,39,28,46,170,0,0,6,0,0,0,2,199,48,26,59,199,47,34,114,201,45,34,113,203,43,34,83,200,44,30,69,170,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,201,48,31,123,202,47,34,205,203,48,34,166,201,48,32,193,201,48,34,181,201,49,31,162,201,48,32,198,201,49,32,199,200,47,34,159,203,47,32,137,201,45,31,108,201,47,33,180,201,49,31,162,201,45,31,141,201,49,34,136,200,45,31,130,200,46,30,143,202,47,33,163,202,47,32,191,201,48,33,203,201,48,32,198,202,49,32,215,202,47,34,205,201,48,34,181,200,46,34,121,195,45,30,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,153,0,0,5,198,44,28,81,199,47,32,104,203,47,34,175,202,48,33,187,203,48,34,166,202,49,31,173,202,46,32,177,201,47,32,190,201,49,33,194,201,49,32,199,202,48,33,187,200,47,34,159,203,46,33,132,201,48,33,171,201,47,34,174,201,46,32,161,200,47,32,153,200,49,30,126,201,46,34,151,202,49,33,178,201,47,32,184,201,48,32,176,202,49,33,178,202,48,33,186,201,49,32,183,203,47,34,175,201,49,32,183,203,49,34,152,201,48,33,85,193,44,18,29,202,32,32,24,0,0,0,0,0,0,0,0,200,45,30,51,195,45,30,34,201,43,33,94,202,47,32,206,201,49,32,199,201,46,33,156,201,47,32,169,202,46,34,167,201,48,32,160,201,46,34,151,202,48,33,187,201,48,32,198,201,46,33,188,201,47,32,185,202,48,32,192,201,48,32,176,202,48,33,186,201,47,32,185,201,46,33,188,202,48,34,182,201,48,33,155,202,46,33,172,202,46,33,172,201,48,33,170,201,47,32,169,203,47,34,175,201,47,34,174,201,47,33,164,202,47,33,163,201,48,33,155,201,48,33,170,201,46,32,161,203,47,32,137,202,47,33,148,199,45,33,124,200,46,33,140,201,48,32,193,201,49,32,183,201,47,32,190,202,48,32,192,201,48,31,165,200,46,32,145,203,48,34,166,201,49,31,157,201,49,31,162,200,47,32,153,202,47,32,168,202,48,32,192,202,48,34,182,201,48,32,176,202,47,34,205,201,49,33,209,203,49,34,152,202,48,32,192,201,49,34,204,202,48,32,192,202,49,31,173,202,48,33,187,201,47,32,185,202,47,33,163,201,48,33,170,201,48,33,171,201,48,33,171,202,46,34,167,202,46,32,177,201,48,31,165,203,45,31,146,200,49,31,131,202,48,33,149,203,45,31,146,201,47,34,174,201,46,33,188,201,48,32,193,202,47,33,201,201,47,32,207,201,49,34,189,201,45,31,141,201,46,34,151,201,46,34,151,203,47,31,142,201,48,32,176,202,49,31,173,203,48,34,166,201,46,33,188,201,49,34,204,201,48,33,203,201,49,34,204,201,49,31,162,193,44,18,29,201,46,32,161,202,48,33,202,201,47,33,195,203,47,34,196,202,46,33,172,200,47,34,159,202,46,34,167,203,47,34,175,201,49,31,162,201,48,33,170,202,47,33,163,201,48,34,181,201,48,32,176,203,47,31,142,200,49,30,126,201,48,31,150,200,46,30,143,200,46,32,145,201,48,33,171,201,47,32,185,201,49,32,199,202,47,33,201,201,49,34,189,200,46,31,154,203,49,33,147,202,47,33,148,201,45,31,141,202,46,33,172,203,48,34,166,201,47,33,164,201,47,32,207,203,47,34,196,201,47,34,212,202,46,32,177,187,34,17,30],
  "b64":"data:image/png;base64,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",
  "height":36,
  "width":36
},
kernals = {
  "blur":  [
    [1/9,1/9,1/9],
    [1/9,1/9,1/9],
    [1/9,1/9,1/9]
  ],
  "sharpen":  [
    [ 0,-1, 0],
    [-1, 5,-1],
    [ 0,-1, 0]
  ],
  "edgeDetect":  [
    [-1,-1,-1],
    [-1, 8,-1],
    [-1,-1,-1]
  ]
};


function RGBtoRGBA( imageData ){
  var out;
  if(imageData instanceof Array){
    out = [].concat(imageData);
    for(i=3; i<=out.length; i+=4){
      out.splice(i,0,255);
    }
  }
  return out;
};

function RGBAtoRGB( imageData ){
  var out;
  if(imageData instanceof Array){
    out = [].concat(imageData);
    for(i=3; i<=out.length; i+=3){
      out.splice(i,1);
    }
  }
  return out;
};

console.putImageData = function(imageData){console.log(putImageData)};

function putImageData( imageData, height, width, displayHeight, displayWidth ){
  var displayID = Math.random().toString(36).replace(/[^a-z]+/g, ''),
  testMessage = `
    <canvas id="cvs_${displayID}"
      onmousedown="document.getElementById('txt_${displayID}').style.display='inline';"></canvas>
    <textarea id="txt_${displayID}" style="display:none;" rows=8 cols=40>
      ${JSON.stringify(imageData)}
    </textarea>
    <script>
    !function(imageData){
      var canvas = document.getElementById("cvs_${displayID}"),
      context = canvas.getContext("2d"),
      data;
      canvas.width = ${width};
      canvas.height = ${height};
      canvas.style.width = ${displayWidth} + 'px';
      canvas.style.height = ${displayHeight} + 'px';
      data = context.getImageData(0, 0 , ${width},  ${height});
      imageData.forEach(function(e,i){data.data[i]=e;});
      context.putImageData(data, 0, 0);
    }(${JSON.stringify(RGBtoRGBA(imageData))});
    </script>`;
  return testMessage;
};

function assertRGBImageDataSimilar( actual, expected, h, w, msg ){
  var thingToMatch = function(e,i){
    return Math.abs(e - actual[i]) <= 4;
  };
  Test.expect( expected.every(thingToMatch),
    msg
  );
}

function imageTest (imageData, h, w, weights, showOutput){
  showOutput = (typeof showOutput === 'undefined')?true:showOutput;
  var original = [].concat(imageData),
  expected = hiddenSolution(original,h,w,weights),
  actual = processImage(original,h,w,weights);

  if (showOutput) {
    console.log(
      putImageData(original,h,w,TILE_SIZE,TILE_SIZE) +
      ' &rarr; ' +
      putImageData(actual,h,w,TILE_SIZE,TILE_SIZE) +
      ', expected: ' +
      putImageData(expected,h,w,TILE_SIZE,TILE_SIZE)
    );
    console.log('Note: click on images to view data.');
  }

  describe('Original image', function(){
    it('should not be changed', function(){
      Test.expect(JSON.stringify(original)===JSON.stringify(imageData),
        'Original image has been changed. Input image data should not be modified.'
      );
    });
  });
  describe('Processed image', function(){
    it('should be the same size as the original', function(){
      Test.assertEquals(actual.length, original.length,
        'Result is not the same size as the original. Image size should remain unchanged.'
      );
    });
    it('should match expected result', function(){
      assertRGBImageDataSimilar( actual, expected, h, w,
        'Processed image is not similar enough to expected image.'
      );
    });
  });
  return expected;
}

try {
var imageData = [].concat(codewars.rgb),
h = codewars.height,
w = codewars.width;

imageTest([127,127,127],1,1,[[1]]);
imageTest([127,255,0],1,1,kernals.blur);
imageTest([0,0,0,0,0,0,0,0,0,255,255,255],2,2,[[0.2,0,0],[0,0.2,0.2],[0,0.2,0.2]]);
imageTest(codewars.rgb, h, w, kernals.edgeDetect);

//Generate a test case using random values
var i, j = 16 * 16 * 3;
imageData = [];
for(i=0; i<j; ++i){
  imageData.push(~~(Math.random()*255));
}

imageTest(imageData, 16, 16, kernals.blur);

}
catch (err) {
  console.log('Error?!:', err);
}
