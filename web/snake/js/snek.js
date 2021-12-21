class Snek {
  constructor(_colour) {
    this.colour = _colour;
    this.body_parts = [
      {
        x: 5,
        y: 5,
      },
    ];
    this.direction = "right";
    this.illegal = "left";
    this.score = 0;
    this.highScore = 0;
  }

  // function to show the snake
  show() {
    function drawRect({ x = 0, y = 0 }, size = 15, colour = "blue") {
      ctx.fillStyle = colour;
      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.moveTo(x * rectSize, y * rectSize);
      ctx.lineTo(x * rectSize + size, y * rectSize);
      ctx.lineTo(x * rectSize + size, y * rectSize + size);
      ctx.lineTo(x * rectSize, y * rectSize + size);
      ctx.lineTo(x * rectSize, y * rectSize);
      ctx.fill();
      ctx.stroke();
    }
    // draw the snekparts
    for (let i = 0; i < this.body_parts.length; i++) {
      drawRect(this.body_parts[i], rectSize, this.colour);
    }
  }

  move() {
    // check if any of the other body-parts touch the head, thus meaning game over
    if (this.checkSelf()) {
      alert(`Game Over!\nScore: ${this.score}\nHigh Score: ${this.highScore}`);
      this.reset();
    }
    if (this.body_parts.length == 1) {
      if (
        this.body_parts[0].x > gameSize - 0.5 ||
        this.body_parts[0].x < -0.5 ||
        this.body_parts[0].y > gameSize - 0.5 ||
        this.body_parts[0].y < -0.5
      ) {
        alert(
          `Game Over!\nScore: ${this.score}\nHigh Score: ${this.highScore}`
        );
        this.reset();
      }
    }

    // for the other body parts
    for (let i = this.body_parts.length - 1; i > 0; i--) {
      this.body_parts[i].x = this.body_parts[i - 1].x;
      this.body_parts[i].y = this.body_parts[i - 1].y;
    }

    // for the head of the snek
    if (
      this.body_parts[0].x < gameSize - 0.5 &&
      this.body_parts[0].x > -0.5 &&
      this.body_parts[0].y < gameSize - 0.5 &&
      this.body_parts[0].y > -0.5
    ) {
      switch (this.direction) {
        case "right":
          this.body_parts[0].x++;
          break;
        case "down":
          this.body_parts[0].y++;
          break;
        case "left":
          this.body_parts[0].x--;
          break;
        case "up":
          this.body_parts[0].y--;
      }
    }
  }

  addBodyPart() {
    // new part with an X value to the right of the part with a lower index;
    let xAdd = 0,
      yAdd = 0;
    // determine where the last body-part is in comparison to the penultimate body-part
    let newPart;
    if (this.body_parts.length > 1) {
      newPart = {
        x:
          this.body_parts[this.body_parts.length - 1].x +
          (this.body_parts[this.body_parts.length - 1].x -
            this.body_parts[this.body_parts.length - 2].x),
        y:
          this.body_parts[this.body_parts.length - 1].y +
          (this.body_parts[this.body_parts.length - 1].y -
            this.body_parts[this.body_parts.length - 2].y),
      };
    } else {
      switch (this.direction) {
        case "right":
          xAdd = -1;
          yAdd = 0;
          break;
        case "down":
          yAdd = -1;
          xAdd = 0;
          break;
        case "left":
          xAdd = 1;
          yAdd = 0;
        case "up":
          yAdd = 1;
          xAdd = 0;
      }
      newPart = {
        x: this.body_parts[0].x + xAdd,
        y: this.body_parts[0].y + yAdd,
      };
    }
    this.body_parts.push(newPart);
  }

  // function to reset the snek;
  reset() {
    this.body_parts = [
      {
        x: 5,
        y: 5,
      },
    ];
    this.direction = "right";
    this.illegal = "left";
    lastInput = "right";
    this.score = 0;
    this.addBodyPart();
  }

  // funtion that checks if the snek hits itself
  checkSelf() {
    for (let i = 1; i < this.body_parts.length; i++) {
      if (
        this.body_parts[i].x == this.body_parts[0].x &&
        this.body_parts[i].y == this.body_parts[0].y
      )
        return true;
    }
    return false;
  }
}
