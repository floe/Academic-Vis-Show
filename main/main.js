//Define Global Variable
var applicantData;
var pubArray = new Array();
var yPosition = 0;
var axisWidth = 4000;
var xStart = 180; // start of the time axis
var intersect = 150; // width of one year
var rowHeight = 100; // height of one person
var pubCircleList = new Array();
var pubCircle_index = 0;
var start_year = 2050;
var end_year = 2000;

function setup() {
  textFont('Times New Roman');
  background(255);
  loadJSON("data/anonymousData2.json", gotData);
}

function draw() {
  background(255);
  if (applicantData) {
    for (var i = 0; i < applicantData.length; i++) {
      vis(0, (i+1)*rowHeight, applicantData[i], pubArray[i]);
    }
    for (var i = 0; i < applicantData.length; i++) {
      pubIterate( pubArray[i], (pub,i,l) => { pub.hover(mouseX,mouseY); return 0; } );
    }
  }
}
