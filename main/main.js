//Define Global Variable
var applicantData;
var pubArray = new Array();
var yPosition = 0;
var axisWidth = 1300;
var xStart = 180;
var intersect = 150;
var pubCircleList = new Array();
var pubCircle_index = 0;


function setup() {
  var canvas = createCanvas(1400, 700);
  canvas.parent('design');
  textFont('Times New Roman');
  background(255);
  loadJSON("data/anonymousData2.json", gotData);

}

function draw() {
  background(255);
  if (applicantData) {
    for (var i = 0; i < applicantData.length; i++) {
      vis(0, (i+1)*100, applicantData[i], pubArray[i]);
      mouseOver();

    }
  }
}

function mouseOver() {
  for (var i = 0; i < pubCircleList.length; i++) {
      pubCircleList[i].hover(mouseX, mouseY);
    }
  }
