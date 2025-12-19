//Define Global Variable
var applicantData;
var pubArray = new Array();
var yPosition = 0;
var axisWidth = 4000; // FIXME
var xStart = 180;
var intersect = 150;
var pubCircleList = new Array();
var pubCircle_index = 0;
var start_year = 2050;
var end_year = 2000;
var do_setup = true;

function setup() {
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
    if (do_setup) do_setup = false;
  }
}

function mouseOver() {
  for (var i = 0; i < pubCircleList.length; i++) {
      pubCircleList[i].hover(mouseX, mouseY);
    }
  }
