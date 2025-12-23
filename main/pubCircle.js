class PubCircle {

  constructor(obj){
    this.obj = obj;
    this.circleSize = 8; // initial value
    this.color = checkColor_independence(this.obj);
    this.xPos = 0;
    this.yPos = 0;
  }

  display(x_,y_,i,lastCircleSize) {

    rectMode(CENTER);
    var circleSize = this.circleSize;

    //draw circlesize: Conference Level
    if (this.obj.Rating == 'A*') {
      circleSize = circleSize*2;
    }else if (this.obj.Rating == 'A') {
      circleSize = circleSize*1.7;
    }else if (this.obj.Rating == 'B') {
      circleSize = circleSize*1.3;
    }else if (this.obj.Rating == 'C') {
      circleSize = circleSize*1.1;
    }

    this.xPos = x_ + xStart + (this.obj.Month-1)*intersect/12 + intersect/24 + (this.obj.Year-start_year)*intersect;
    this.yPos = y_ + yPosition - 12-((lastCircleSize+circleSize)/2+5)*i;

    citationCircle(this.obj, this.xPos, this.yPos);

    if (this.obj.Type == "Paper") {
      pubCircle(this.obj, this.xPos, this.yPos, circleSize, this.color);
    }else {
      noStroke();
      fill(this.color);
      rect(this.xPos, this.yPos, circleSize*0.93, circleSize*0.93);
    }

    return circleSize;
  }

  hover(x, y){
    // translate(0, 100);
    let d = dist(x, y, this.xPos, this.yPos);

    if (d < this.circleSize*2) {
      if (x<1000) {
        if (y<400) {
          createTooltip(this.xPos+10, this.yPos+10, this.obj);
        } else {
          createTooltip(this.xPos+10, this.yPos-10-200, this.obj);
        }
      } else {
        if (y<400) {
          createTooltip(this.xPos-10-300, this.yPos+10, this.obj);
        } else {
          createTooltip(this.xPos-10-300, this.yPos-10-200, this.obj);
        }
      }

      let c = color('rgba(255, 220, 37, 0.9)');
      // stroke(c);
      fill(c);
      noStroke();
      // strokeWeight(1);
      if (this.obj.Type == "Paper") {
        ellipse(this.xPos, this.yPos, this.circleSize*2, this.circleSize*2);
      }else {
        rectMode(CENTER);
        rect(this.xPos, this.yPos, this.circleSize*0.93, this.circleSize*0.93);
      }

    }
  }
}


function pubCircle(obj, xPos, yPos, circleSize, color){

  var authorNum = obj.AuthorCount;
  // var order = obj.Authors.indexOf('P Dragicevic');
  var order = obj.Order;

  if (authorNum == 1) {
    noStroke();
    checkColor_independence(obj);
    ellipse(xPos,yPos, circleSize, circleSize);

  } else if (authorNum == 2) {

    if (order == 0) {
      strokeWeight(circleSize/2.3);
      checkColor_independence(obj);
      fill(color);
      ellipse(xPos, yPos, circleSize, circleSize);
      noStroke();

    }else {
      strokeWeight(0.5);
      checkColor_independence(obj);
      fill(color);
      ellipse(xPos, yPos, circleSize, circleSize);
      checkColor_independence(obj);
      ellipse(xPos, yPos, circleSize/2, circleSize/2);
    }

  } else {
    if (order == 1) {
      strokeWeight(circleSize/4);
      checkColor_independence(obj);
      fill(color);
      ellipse(xPos, yPos, circleSize, circleSize);
      strokeWeight(0.5);
      noFill();
      ellipse(xPos, yPos, circleSize/3, circleSize/3);
      noStroke();

    } else if (order == authorNum) {

      strokeWeight(0.5);
      checkColor_independence(obj);
      fill(color);
      ellipse(xPos, yPos, circleSize, circleSize);
      checkColor_independence(obj);
      ellipse(xPos, yPos, circleSize/3, circleSize/3);

    } else {
      strokeWeight(0.5);
      checkColor_independence(obj);
      fill(color);
      ellipse(xPos, yPos, circleSize*1.12, circleSize*1.12);
      checkColor_independence(obj);
      noFill();
      strokeWeight(circleSize/4)
      ellipse(xPos, yPos, circleSize*2/5, circleSize*2/5);
    }
  }

}
