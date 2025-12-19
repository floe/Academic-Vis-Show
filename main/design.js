function vis(x, y, applicantInfo, publicationInfo){

  applicant = applicantInfo;
  singlePubArray = publicationInfo;

  // translate(x, y);
  var x_= x;
  var y_= y;
  textSize(14);
  fill(0);
  textStyle(BOLD);
  noStroke();
  text(applicant.Name, x_+xStart - 130, y_+yPosition-30);

  textStyle(ITALIC);
  textSize(9);
  for (var i = 0; i < applicant.Research.length; i++) {
    text(applicant.Research[i], x_+xStart - 130, y_+yPosition-15+i*10 );
  }

  // draw axiså
  strokeWeight(1);
  axis(applicant.Mobility, x_, y_);

  //Draw the element
  rectMode(CENTER);

  var yPos;
  var xPos;
  var initialCircleSize = 8;

  for (var y = 0; y < singlePubArray.length; y++) {

    for (var m = 0; m < singlePubArray[y].length; m++) {

      var lastCircleSize = 15;

      for (var i = 0; i < singlePubArray[y][m].length; i++) {

        var circleSize = initialCircleSize;

        rectMode(CENTER);
        if (singlePubArray[y][m][i]) {

          //draw circlesize: Conference Level
          if (singlePubArray[y][m][i].Rating == 'A*') {
            circleSize = circleSize*2;
          }else if (singlePubArray[y][m][i].Rating == 'A') {
            circleSize = circleSize*1.7;
          }else if (singlePubArray[y][m][i].Rating == 'B') {
            circleSize = circleSize*1.3;
          }else if (singlePubArray[y][m][i].Rating == 'C') {
            circleSize = circleSize*1.1;
          }else {
            circleSize = circleSize;
          }

          var xPos = x_+xStart+m*intersect/12+intersect/24+y*intersect;
          var yPos = y_+yPosition-12-((lastCircleSize+circleSize)/2+5)*i;

          citationCircle(singlePubArray[y][m][i], xPos, yPos);

          let c=checkColor_independence(singlePubArray[y][m][i]);

          // FIXME: run this once, not on every redraw
          /*pubCircleList[pubCircle_index] = new PubCircle(singlePubArray[y][m][i], xPos, yPos, circleSize, c);
          pubCircle_index++;*/

          if (singlePubArray[y][m][i].Type == "Paper") {
            pubCircle(singlePubArray[y][m][i], xPos, yPos, circleSize, c);
          }else {
            noStroke();
            rect(xPos, yPos, circleSize*0.93, circleSize*0.93);
          }

        }

        lastCircleSize = circleSize;
      }
    }

    strokeCap(SQUARE);
  }
}

function vis_setup(x, y, applicantInfo, publicationInfo){

  applicant = applicantInfo;
  singlePubArray = publicationInfo;

  // translate(x, y);
  var yPos;
  var xPos;
  var y_ = y;
  var x_ = x;
  var initialCircleSize = 8;

  for (var y = 0; y < singlePubArray.length; y++) {

    for (var m = 0; m < singlePubArray[y].length; m++) {

      var lastCircleSize = 15;

      for (var i = 0; i < singlePubArray[y][m].length; i++) {

        var circleSize = initialCircleSize;

        if (singlePubArray[y][m][i]) {
          //draw circlesize: Conference Level
          if (singlePubArray[y][m][i].Rating == 'A*') {
            circleSize = circleSize*2;
          }else if (singlePubArray[y][m][i].Rating == 'A') {
            circleSize = circleSize*1.7;
          }else if (singlePubArray[y][m][i].Rating == 'B') {
            circleSize = circleSize*1.3;
          }else if (singlePubArray[y][m][i].Rating == 'C') {
            circleSize = circleSize*1.1;
          }else {
            circleSize = circleSize;
          }

          xPos = x_+xStart+m*intersect/12+intersect/24+y*intersect;
          yPos = y_+yPosition-12-((lastCircleSize+circleSize)/2+5)*i;

          let c=checkColor_independence(singlePubArray[y][m][i]);

          pubCircleList[pubCircle_index] = new PubCircle(singlePubArray[y][m][i], xPos, yPos, circleSize, c);
          pubCircle_index++;

        }
        lastCircleSize = circleSize;
      }
    }

    strokeCap(SQUARE);
  }
}

function gotData(data){

  applicantData = data;

  for (var i = 0; i < applicantData.length; i++) {

    //For each candidate:
    //(1)Create two-demension array to store publication information
    pubArray[i] =  new Array(50); // 50 years FIXME

    for(var k = 0;k < pubArray[i].length; k++){
      pubArray[i][k] = new Array(12); // 12 months
      for (var l = 0; l < pubArray[i][k].length; l++) {
        pubArray[i][k][l] = new Array();
      }
    }

    for (var j = 0; j < applicantData[i].Publication.length; j++) {

      var index_year;
      var index_month;

      index_year = applicantData[i].Publication[j].Year;
      index_month = applicantData[i].Publication[j].Month-1;

      if (index_year < start_year) start_year = index_year;
      if (index_year >   end_year)   end_year = index_year;

      index_year -= 2000; // reference year: 2000

      pubArray[i][index_year][index_month].push(applicantData[i].Publication[j]);
      pubArray[i][index_year][index_month].sort(compare('Citation')); ////Sort by Citation
    }
  }

  // remove empty year arrays at the start
  for (var i = 0; i < applicantData.length; i++) {
    pubArray[i].splice(0,start_year-2000);
    vis_setup(0, (i+1)*100, applicantData[i], pubArray[i]);
  }

  var width = (end_year - start_year + 1) * 160;
  var height = applicantData.length * 100 + 50;
  //console.log(start_year, end_year, width, height);
  var canvas = createCanvas(width, height);
  canvas.parent('design');
}
