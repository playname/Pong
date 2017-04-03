const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

canvas.addEventListener("mousemove", event => {
    p.y = event.offsetY - p.height / 2;
});

var cWidth = canvas.width;
var cHeight = canvas.height;
var fps = 60;

var pWidth = 15;
var pHeight = 70;
var bSize = 10;

var bSpeed = {
    x: -6,
    y: 6
};
var p, p2, b;

var points1 = 0;
var points2 = 0;

setup();

function setup() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, cWidth, cHeight);

    p = new paddle(10, cHeight / 2 - pHeight / 2, pWidth, pHeight, "#FFF");
    p2 = new paddle(cWidth - 20, cHeight / 2 - pHeight / 2, pWidth, pHeight, "#FFF");
    b = new ball(cWidth / 2 - bSize / 2, cHeight / 2 - bSize / 2, bSize, bSize, "#FFF");

    draw();
}

function draw() {
    setTimeout(function () {
        requestAnimationFrame(draw);

        clear();
        update();

        ai();

        collide();

        p.show();
        p2.show();
        b.show();
    }, 1000 / fps);
}

function update() {
    b.x += b.speed.x;
    b.y += b.speed.y;

    if (points1 >= 100 || points2 >= 100) {
        document.getElementById("data").style.width = 120 + "px";
    } else if (points1 >= 1000 || points2 >= 1000) {
        document.getElementById("data").style.width = 130 + "px";
    }
    if (points1 >= 10000) {
        alert("You win!");
        location.reload();
    } else if (points2 >= 10000) {
        alert("You lose.");
        location.reload();
    }
        document.getElementById("player1").innerHTML = "Player 1: " + points1;
        document.getElementById("player2").innerHTML = "Player 2: " + points2;
}

function ai() {
    p2.y = b.y;
}

function collide() {
    if (p.x + p.width >= b.x && p.x <= b.x && p.y + p.height >= b.y && p.y <= b.y) {
        b.speed.x -= b.speed.x * 2;
    } else if (p2.x + p2.width >= b.x && p2.x <= b.x && p2.y + p2.height >= b.y && p2.y <= b.y) {
        b.speed.x -= b.speed.x * 2;
    }

    if (b.y <= 0 || b.y + b.height >= canvas.height) {
        b.speed.y -= b.speed.y * 2;
    } else if (b.x <= 0) {
        points2++;
        b.x = cWidth / 2 - bSize / 2;
        b.y = cHeight / 2 - bSize / 2;
    } else if (b.x + b.width > canvas.width) {
        points1++;
        b.x = cWidth / 2 - bSize / 2;
        b.y = cHeight / 2 - bSize / 2;
    }

    if (p.y <= 0)
        p.y = 0;
    if (p.y + p.height >= canvas.height)
        p.y = canvas.height - p.height;
    if (p2.y <= 0)
        p2.y = 0;
    if (p2.y + p2.height >= canvas.height)
        p2.y = canvas.height - p2.height;
}

function ball(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = {
        x: bSpeed.x,
        y: bSpeed.y
    };

    this.show = function () {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}

function paddle(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.show = function () {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}

function clear() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, cWidth, cHeight);
}