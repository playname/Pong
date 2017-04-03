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

        collide(p, b);
        collide(p2, b);

        p.show();
        p2.show();
        b.show();

        document.getElementById("player1").innerHTML = "Player 1: " + points1;
        document.getElementById("player2").innerHTML = "Player 2: " + points2;
    }, 1000 / fps);
}

function update() {
    document.addEventListener('keydown', function (event) {
        if (event.keyCode === 38) {
            p.y -= p.speed;
        } else if (event.keyCode === 40) {
            p.y += p.speed;
        }
    });

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

    b.x += b.speed.x;
    b.y += b.speed.y;
}

function ai() {
    p2.y = b.y;
}

function collide(a, b) {
    //b is the object moving relative to a
    if (a.x + a.width >= b.x && a.x <= b.x && a.y + a.height >= b.y && a.y <= b.y) {
        b.speed.x -= b.speed.x * 2;
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