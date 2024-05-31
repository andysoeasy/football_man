var canvas = document.getElementById("drawing");
var ctx = canvas.getContext("2d");


function radians_to_degree(angle) {
    return (Math.PI / 180) * angle
}

function drawing_arc(
    x,
    y,
    radius,
    from_angle = 0,
    to_angle = 2 * Math.PI,
    isFilled = 0
) {

    /**
     * Функция рисует на холсте дугу, или окружность с центром
     * в (x;y) и радиусом radius. 
     * 
     * Чтобы нарисовать окружность, необходимо задать начальный
     * угол равным 0, а коненый - 2 * Math.PI (в радианах).
     * 
     * Параметр isFilled выполняет двойственный функционал:
     * - если задано значение 0, то рисуется окружность;
     * - если задано значение 1, то рисуется круг(с заливкой).
     */


    let start = from_angle;
    let current_x = x + radius * Math.cos(radians_to_degree(start));
    let current_y = y + radius * Math.sin(radians_to_degree(start));

    ctx.beginPath();

    ctx.moveTo(current_x, current_y);

    while (start <= to_angle) {

        current_x = x + radius * Math.cos(start);
        current_y = y + radius * Math.sin(start);

        ctx.lineTo(current_x, current_y);

        start += Math.PI / 180;
    }

    ctx.closePath();

    if (isFilled == 0) {
        ctx.stroke();
    } else {
        ctx.fill();
    }
}

function quadraticBezier(
    x1, y1,
    x2, y2,
    x3, y3
) {

    /**
     * Функция строит квадратичную кривую Безье по
     * трем точкам.
     */

    let start = 0;

    let current_x = (1 - start) ** 2 * x1 + 2 * start * (1 - start) * x2 + start ** 2 * x3;
    let current_y = (1 - start) ** 2 * y1 + 2 * start * (1 - start) * y2 + start ** 2 * y3;

    ctx.beginPath();
    ctx.moveTo(current_x, current_y);

    while (start <= 1) {
        current_x = (1 - start) ** 2 * x1 + 2 * start * (1 - start) * x2 + start ** 2 * x3;
        current_y = (1 - start) ** 2 * y1 + 2 * start * (1 - start) * y2 + start ** 2 * y3;

        ctx.lineTo(current_x, current_y);

        start += 0.01;
    }

    ctx.stroke();
    ctx.closePath();
}

function betaSpline(points, color) {
    let oldColor = ctx.fillStyle;
    ctx.beginPath();
    points.splice(0, 0, points[0]);
    points.push(points[points.length - 1]);
    for (let i = 1; i < points.length - 2; i++) {
        let a3 = (-points[i - 1].x + 3 * points[i].x - 3 * points[i + 1].x + points[i + 2].x) / 6,
            a2 = (points[i - 1].x - 2 * points[i].x + points[i + 1].x) / 2,
            a1 = (-points[i - 1].x + points[i + 1].x) / 2,
            a0 = (points[i - 1].x + 4 * points[i].x + points[i + 1].x) / 6;
        let b3 = (-points[i - 1].y + 3 * points[i].y - 3 * points[i + 1].y + points[i + 2].y) / 6,
            b2 = (points[i - 1].y - 2 * points[i].y + points[i + 1].y) / 2,
            b1 = (-points[i - 1].y + points[i + 1].y) / 2,
            b0 = (points[i - 1].y + 4 * points[i].y + points[i + 1].y) / 6;

        for (let t = 0; t <= 1; t += 0.005) {
            let x = ((a3 * t + a2) * t + a1) * t + a0;
            let y = ((b3 * t + b2) * t + b1) * t + b0;
            ctx.lineTo(x, y);
        }
    }
    points.splice(points.length - 1, 1);
    points.splice(0, 1);

    if (color) { ctx.fillStyle = color; ctx.fill(); }
    ctx.stroke();
    ctx.fillStyle = oldColor;
}

function hat(x1, y1, x2, y2, x3, y3){
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.stroke();
}

body = [
    { x: 319, y: 383 },
    { x: 302, y: 390 },
    { x: 296, y: 389 },
   { x: 289, y: 383 },
    { x: 285, y: 380 },
   { x: 280, y: 367 },
    { x: 262, y: 348 },
    { x: 240, y: 325 },
    { x: 232, y: 310 },
    { x: 227, y: 293 },
    { x: 208, y: 280 },
    { x: 192, y: 269 },
    { x: 186, y: 271 },
    { x: 171, y: 258 },
    { x: 164, y: 273 },
    { x: 155, y: 283 },
    { x: 143, y: 282 },
    { x: 126, y: 275 },
    { x: 115, y: 268 },
    { x: 92, y: 259 },
    { x: 88, y: 252 },
    { x: 63, y: 245 },
   { x: 40, y: 241 },
    { x: 16, y: 234 },
    { x: 0, y: 230 },
  { x: 5, y: 218 },
{ x: 17, y: 212 },
{ x: 35, y: 214 },
{ x: 51, y: 212 },
{ x: 61, y: 219 },
{ x: 73, y: 228 },
    { x: 99, y: 232 },
 { x: 114, y: 233 },
{ x: 128, y: 237 },
{ x: 132, y: 240 },
{ x: 137, y: 226 },
{ x: 136, y: 219 },
{ x: 131, y: 225 },
{ x: 125, y: 212 },
{ x: 129, y: 188 },
{ x: 129, y: 168 },
{ x: 114, y: 132 },
{ x: 109, y: 116 },
{ x: 104, y: 97 },
{ x: 90, y: 92 },
{ x: 76, y: 91 },
{ x: 69, y: 84 },
{ x: 58, y: 62 },
{ x: 33, y: 56 },
{ x: 19, y: 46 },
 { x: 16, y: 48 },
{ x: 14, y: 42 },
{ x: 27, y: 33 },
{ x: 29, y: 29 },
{ x: 37, y: 34 },
{ x: 45, y: 48 },
   { x: 65, y: 58 },
{ x: 79, y: 65 },
{ x: 112, y: 59 },
{ x: 122, y: 58 },
{ x: 124, y: 53 },
    { x: 133, y: 51 },
{ x: 138, y: 44 },
{ x: 135, y: 23 },
{ x: 145, y: 3 },
{ x: 157, y: 0 },
{ x: 173, y: 4 },
{ x: 185, y: 13 },
{ x: 188, y: 21 },
{ x: 185, y: 24 },
{ x: 187, y: 31 },
{ x: 183, y: 40 },
{ x: 186, y: 51 },
{ x: 179, y: 51 },
{ x: 179, y: 61 },
{ x: 175, y: 65 },
{ x: 165, y: 64 },
{ x: 175, y: 77 },
  { x: 184, y: 96 },
  { x: 183, y: 108 },
{ x: 185, y: 122 },
{ x: 204, y: 141 },
{ x: 222, y: 156 },
{ x: 237, y: 160 },
{ x: 244, y: 167 },
{ x: 244, y: 173 },
{ x: 224, y: 181 },
{ x: 220, y: 169 },
   { x: 214, y: 168 },
   { x: 209, y: 161 },
  { x: 187, y: 151 },
{ x: 189, y: 186 },
{ x: 189, y: 208 },
{ x: 221, y: 242 },
{ x: 243, y: 266 },
{ x: 251, y: 273 },
{ x: 261, y: 306 },
    { x: 267, y: 308 },
    { x: 278, y: 331 },
    { x: 279, y: 338 },
    { x: 302, y: 357 },
    { x: 323, y: 359 },
    { x: 350, y: 365 },
   { x: 363, y: 388 },      // 102
    { x: 346, y: 383 },
    { x: 322, y: 383 },
    { x: 314, y: 385 },
    { x: 301, y: 390 },
    { x: 319, y: 383 }
];


ctx.strokeStyle = '#E52B50';
betaSpline(body, '#E52B50');

ctx.strokeStyle = 'white';
ctx.lineWidth = 3;

quadraticBezier(
    189, 272, 200, 253, 224, 245
)

quadraticBezier(
    132, 235, 154, 232, 179, 244
)

quadraticBezier(
    175, 265, 179, 244, 180, 230
)

ctx.lineWidth = 1;
quadraticBezier(
    219, 290, 234, 282, 247, 268
)

quadraticBezier(
    222, 292, 239, 285, 249, 272
)

quadraticBezier(
    153, 282, 151, 259, 127, 235
)

quadraticBezier(
    161, 277, 158, 256, 140, 249
)

quadraticBezier(
    168, 30, 174, 23, 170, 16
)

quadraticBezier(
    170, 16, 185, 15, 186, 24
)

quadraticBezier(
    161, 26, 152, 27, 158, 40
)

quadraticBezier(
    135, 44, 146, 40, 152, 34
)

quadraticBezier(
    170, 65, 159, 56, 159, 44
)

quadraticBezier(
    181, 116, 165, 112, 162, 126
)

quadraticBezier(
    184, 114, 183, 96, 166, 76
)

quadraticBezier(
    163, 125, 158, 127, 143, 102
)

quadraticBezier(
    141, 91, 142, 78, 151, 68
)

quadraticBezier(
    163, 131, 180, 147, 207, 163
)

quadraticBezier(
    227, 178, 229, 171, 225, 165
)

quadraticBezier(
    233, 178, 236, 171, 232, 168
)

quadraticBezier(
    238, 175, 243, 172, 238, 166
)

quadraticBezier(
    153, 157, 154, 140, 149, 126
)

quadraticBezier(
    129, 101, 136, 112, 149, 117
)

quadraticBezier(
    104, 95, 100, 82, 103, 68
)

quadraticBezier(
    92, 94, 85, 89, 82, 84
)

quadraticBezier(
    73, 89, 62, 72, 83, 60
)

ctx.lineWidth = 2;
quadraticBezier(
    48, 243, 42, 227, 73, 225
)

quadraticBezier(
    278, 371, 302, 370, 304, 350
)

quadraticBezier(
    134, 227, 136, 225, 136, 215
)

quadraticBezier(
    127, 193, 159, 179, 192, 189
)


ctx.fillStyle = '#BBDED6';
drawing_arc(374, 314, 25, 0, Math.PI * 2, 1);

ctx.lineWidth = 0.5;
hat(357, 305, 371, 303, 377, 316)
hat(355, 310, 355, 322, 367, 328)
hat(375, 334, 372, 331, 380, 321)
hat(386, 320, 394, 320, 394, 327)
hat(374, 303, 381, 315, 393, 315)
hat(382, 292, 395, 302, 395, 311)
hat(356, 302, 369, 299, 377, 290)