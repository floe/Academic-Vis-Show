function vis(x, y, applicantInfo, publicationInfo){

  applicant = applicantInfo;

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

  pubIterate(publicationInfo,(pub,i,lastCircleSize) => { return pub.display(x_,y_,i,lastCircleSize); } );
}

function pubIterate(singlePubArray,inner) {
  for (var y = start_year-2000; y < singlePubArray.length && y < (end_year-2000); y++) {
    for (var m = 0; m < singlePubArray[y].length; m++) {
      var lastCircleSize = 15;
      for (var i = 0; i < singlePubArray[y][m].length; i++) {
        var pub = singlePubArray[y][m][i];
        lastCircleSize = inner(pub,i,lastCircleSize);
      }
    }
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
      if (index_year < 0) continue;

      pubArray[i][index_year][index_month].push(new PubCircle(applicantData[i].Publication[j]));
      pubArray[i][index_year][index_month].sort(compare('Citation')); ////Sort by Citation
    }
  }

  // FIXME canvas needs to resize when start/end/intersect change
  axisWidth = (end_year - start_year + 1) * intersect + xStart;
  var height = (applicantData.length + 1) * rowHeight;
  //console.log(start_year, end_year, width, height);
  var canvas = createCanvas(axisWidth, height);
  canvas.parent('design');
}
