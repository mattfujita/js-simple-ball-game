
// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

let para = document.querySelector('p');
let div = document.createElement('div');
para.appendChild(div);

let balls = [];


// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min + 1)) + min;
  return num;
}

class Shape {
    constructor(x, y, velX, velY, exists) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }
}

class EvilCircle extends Shape {
    constructor(x, y, velX, velY, exists, color, size) {
        super(x, y, velX, velY, exists);
        this.velX = 20;
        this.velY = 20;
        this.color = 'white';
        this.size = 10;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    checkBounds() {
        if (this.x + this.size >= width) {
            this.x -= this.size;
        }

        if (this.x - this.size <= 0) {
            this.x += this.size;
        }

        if (this.y + this.size >= height) {
            this.y -= this.size;
        }

        if (this.y - this.size <= 0) {
            this.y += this.size;
        }
    }

    setControls() {
        let _this = this;

        window.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                _this.x -= _this.velX;
            }
            else if (e.key === 'ArrowRight') {
                _this.x += _this.velX;
            }
            else if (e.key === 'ArrowUp') {
                _this.y -= _this.velY;
            }
            else if (e.key === 'ArrowDown') {
                _this.y += _this.velY;
            }
        });
    }

    collisionDetect() {
        for (let i = 0; i < balls.length; i++) {
            if (balls[i].exists) {
                let dx = this.x - balls[i].x;
                let dy = this.y - balls[i].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[i].size) {
                    balls[i].exists = false;
                    ballCount--;
                    div.textContent = ballCount;
                }
            }
        }
    }

}

class Ball extends Shape {
    constructor(x, y, velX, velY, color, size, exists) {
        super(x, y, velX, velY, exists);
        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if (this.x + this.size >= width) {
            this.velX = -(this.velX);
        }

        if (this.x - this.size <= 0) {
            this.velX = -(this.velX);
        }

        if (this.y + this.size >= height) {
            this.velY = -(this.velY);
        }

        if (this.y - this.size <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetection() {
        for (let i = 0; i < balls.length; i++) {
            if (!(this === balls[i])) {
                let dx = this.x - balls[i].x;
                let dy = this.y - balls[i].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[i].size) {
                    balls[i].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
                }
            }
        }
    }

}

let ballCount = balls.length;

while (balls.length < 25) {
    var size = random(10, 20);
    var ball = new Ball(random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size,
    true);

    balls.push(ball);
    ballCount++;
    div.textContent = ballCount;
}

let evilCircle = new EvilCircle(random(0 + size,width - size), random(0 + size,height - size), 0, 0, true, 10);
evilCircle.setControls();

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,width,height);

    for (let i =0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetection();
        }
        evilCircle.draw();
        evilCircle.checkBounds();
        evilCircle.collisionDetect();
    }
    requestAnimationFrame(loop);

    // if (!balls[i].exists) {
    //     ballCount--;
    //     div.textContent = ballCount;
    // }
}


loop();