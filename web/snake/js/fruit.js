class Fruit {
  constructor(_x, _y) {
    this.pos = {
      x: _x,
      y: _y,
    };
  }
  show() {
    // rectangle function for fruit
    function drawFruit({ x = 0, y = 0 }, size = 15) {
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.moveTo(x * rectSize, y * rectSize);
      ctx.lineTo(x * rectSize + size, y * rectSize);
      ctx.lineTo(x * rectSize + size, y * rectSize + size);
      ctx.lineTo(x * rectSize, y * rectSize + size);
      ctx.lineTo(x * rectSize, y * rectSize);
      ctx.fill();
      ctx.stroke();
    }
    // draw the fruit at it's position
    drawFruit(this.pos, rectSize);
  }
  // function to see if there is intersection with snek (return true) else (return false)
  checkFor(snek) {
    if (
      snek.body_parts[0].x == this.pos.x &&
      snek.body_parts[0].y == this.pos.y
    )
      return true;
    return false;
  }
}
