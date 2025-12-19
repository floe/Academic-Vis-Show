class PubCircle {

  constructor(obj, xPos, yPos, circleSize, color){
    this.obj = obj;
    this.xPos = xPos;
    this.yPos = yPos;
    this.circleSize = circleSize;
    this.color = color;
  }

  display(){
    if (this.obj.Type == "Paper") {
      pubCircle(this.obj, this.xPos, this.yPos, this.circleSize, this.color);
    }else {
      noStroke();
      rect(this.xPos, this.yPos, this.circleSize*0.93, this.circleSize*0.93);
    }
  }

  hover(x, y){
    // translate(0, 100);
    let d = dist(x, y, this.xPos, this.yPos);

    if (d < this.circleSize) {
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
        ellipse(this.xPos, this.yPos, this.circleSize, this.circleSize);
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
