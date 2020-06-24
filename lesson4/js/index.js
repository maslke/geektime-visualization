(function () {
    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('2d');
    const size = 50;
    const count = 14;
    const beginX = 50;
    const beginY = 50;
    let black = false;
    
    const historys = [];
    const torelance = 15;
    const radius = 20;


    function initCanvas() {
        canvas.width = beginX * 2 + size * count;
        canvas.height = beginY * 2 + size * count;
    }

    function drawPad() {

        context.strokeRect(beginX, beginY, count * size, count * size);
        const endX = beginX + size * count;
        for (let i = 1; i <= 13; i++) {
            context.beginPath();
            context.moveTo(beginX, beginY + size * i);
            context.lineTo(endX, beginY + size * i);
            context.stroke();
            context.closePath();
        }
        const endY = beginY + size * count;
        for (let i = 1; i <= 13; i++) {
            context.beginPath();
            context.moveTo(beginX + size * i, beginY);
            context.lineTo(beginX + size * i, endY);
            context.stroke();
            context.closePath();
        }
    }

    function locateX(currentX) {
        if (currentX < beginX) {
            return -1;
        }
        const inx = parseInt((currentX - beginX) / size);
        if (inx == 15) {
            return -1;
        }
        const diff1 = (inx + 1) * size + beginX - currentX;
        const diff2 = currentX - size * inx - beginX;
        if (diff1 >= diff2) {
            if (diff2 <= torelance) {
                return size * inx + beginX;
            }
        } else {
            if (diff1 <= torelance) {
                return (inx + 1) * size + beginX;
            }
        }
        return -1;

    }

    function locateY(currentY) {
        if (currentY < beginY) {
            return -1;
        }
        const inx = parseInt((currentY - beginY) / size);
        if (inx == 15) {
            return -1;
        }
        const diff1 = (inx + 1) * size + beginY - currentY;
        const diff2 = currentY - size * inx - beginY;
        if (diff1 >= diff2) {
            if (diff2 <= torelance) {
                return size * inx + beginY;
            }
        } else {
            if (diff1 <= torelance) {
                return (inx + 1) * size + beginY;
            }
        }
        return -1;
    }

    function exists(x, y) {
        for (let i = 0; i < historys.length; i++) {
            if (historys[i].x === x && historys[i].y === y) {
                return true;
            }
        }
        return false;
    }

    function bindEvent() {

        canvas.onmousemove = function (event) {
            const currentX = event.offsetX;
            const currentY = event.offsetY;
            const x = locateX(currentX);
            const y = locateY(currentY);
            
            if (x == -1 || y == -1 || exists(x, y)) {
                return;
            }
        

            context.clearRect(0, 0, canvas.width, canvas.height);
            restore();

            context.beginPath();
            context.moveTo(x - 5, y - 5);
            context.lineTo(x + 5, y + 5);
            context.stroke();
            context.closePath();
            context.beginPath();
            context.moveTo(x - 5, y + 5);
            context.lineTo(x + 5, y - 5);
            context.stroke();
            context.closePath();


        }

        canvas.onclick = function (event) {
            const currentX = event.offsetX;
            const currentY = event.offsetY;
            const x = locateX(currentX);
            const y = locateY(currentY);
            if (x == -1 || y == -1) {
                return;
            } else {

                if (exists(x, y)) {
                    return;
                }

                black = !black;
                drawMark(x, y, black);
                historys.push({
                    x: x,
                    y: y,
                    black: black
                });
            }
        }
    }

    function drawMark(x, y, black) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        const g = context.createRadialGradient(x, y, 10, x, y, 0);
        if (black) {
            g.addColorStop(0, '#0A0A0A');
            g.addColorStop(1, '#636766');
            context.fillStyle = g;
        } else {
            g.addColorStop(0, '#D1D1D1');
            g.addColorStop(1, '#F9F9F9');
            context.fillStyle = g;
        }
        context.fill();
        context.closePath();
    }

    function restore() {
        drawPad();
        for (let i = 0; i < historys.length; i++) {
            drawMark(historys[i].x, historys[i].y, historys[i].black);
        }
    }


    initCanvas();
    drawPad();
    bindEvent();
}());