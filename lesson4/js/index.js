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
    const coords = [];


    function initCanvas() {
        canvas.width = beginX * 2 + size * count;
        canvas.height = beginY * 2 + size * count;
    }

    function initCoords() {
        for (let i = 0; i <= count; i++) {
            const coord = [];
            for (let j = 0; j <= count; j++) {
                coord.push('');
            }
            coords.push(coord);
        }
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

        const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
        for (let i = 1; i <= 15; i++) {
            context.font = "25px '微软雅黑'";
            context.fillStyle = 'black';
            context.fillText(chars[i - 1], beginX + size * (i - 1), beginY + size * count + 25);
        }

        for (let i = 1; i <= 15; i++) {
            context.font = "25px '微软雅黑'";
            context.fillStyle = 'black';
            context.fillText(i, beginX - 35, beginY + size * count - size * (i - 1));
        }

        const pos = [[3, 3], [7, 7], [3, 11], [11, 3], [11, 11]];
        for (let inx = 0; inx < pos.length; inx++) {
            context.beginPath();
            context.fillStyle = 'black';
            context.arc(beginX + pos[inx][0] * size, beginY + pos[inx][1] * size, 5, 0, Math.PI * 2);
            context.fill();
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

    function canWin(marks) {
        for (let i = 0; i < marks.length; i++) {
            for (let j = 0; j < marks[i].length; j++) {
                if (marks[i][j] !== 'black' && marks[i][j] !== 'white') {
                    continue;
                }
                if (rightWin(marks, i, j) || downWin(marks, i, j) || rightDownWin(marks, i, j)) {
                    return [true, marks[i][j]];
                }
            }
        }
        return [false, ''];
    }

    function rightWin(marks, i, j) {
        var mark = marks[i][j];
        if (i + 4 > count) {
            return false;
        }
        if (marks[i + 1][j] !== mark || marks[i + 2][j] !== mark || marks[i + 3][j] !== mark || marks[i + 4][j] !== mark) {
            return false;
        }
        return true;
    }

    function downWin(marks, i, j) {
        var mark = marks[i][j];
        if (j + 4 > count) {
            return false;
        }
        if (marks[i][j + 1] !== mark || marks[i][j + 2] !== mark || marks[i][j + 3] !== mark || marks[i][j + 4] !== mark) {
            return false;
        }
        return true;
    }

    function rightDownWin(marks, i, j) {
        var mark = marks[i][j];
        if (j + 4 > count || i + 4 > count) {
            return false;
        }
        if (marks[i + 1][j + 1] !== mark || marks[i + 2][j + 2] !== mark || marks[i + 3][j + 3] !== mark || marks[i + 4][j + 4] !== mark) {
            return false;
        }
        return true;
    }



    function bindEvent() {

        canvas.onmouseout = function (event) {

            if (canWin(coords)[0]) {
                return;
            }

            context.clearRect(0, 0, canvas.width, canvas.height);
            restore();
        }

        canvas.onmousemove = function (event) {

            if (canWin(coords)[0]) {
                return;
            }

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

            if (canWin(coords)[0]) {
                return;
            }

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
                
                coords[x / size - 1][y / size - 1] = black ? 'black' : 'white';
                const win = canWin(coords);
                if (win[0]) {
                    context.fillStyle ='black';
                    context.fillText(win[1] +', win', canvas.width / 2, 40);  
                }
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
    initCoords();
    drawPad();
    bindEvent();
}());