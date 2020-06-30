(function(){

    const canvas = document.querySelector('canvas');
    const context = canvas.getContext('webgl');

    const vertex = `
        attribute vec2 position;
        varying vec3 color;
        
        void main() {
            gl_PointSize = 1.0;
            color = vec3(0.5 + position * 0.5, 0.0);
            gl_Position = vec4(position * 0.2, 1.0, 1.0);
        }
    `;

    const fragment = `
        precision mediump float;
        varying vec3 color;

        void main() {
            gl_FragColor = vec4(color, 1.0);
        }
    `;

    const vertexShader = context.createShader(context.VERTEX_SHADER);
    context.shaderSource(vertexShader, vertex);
    context.compileShader(vertexShader);

    const fragmentShader = context.createShader(context.FRAGMENT_SHADER);
    context.shaderSource(fragmentShader, fragment);
    context.compileShader(fragmentShader);

    const program = context.createProgram();
    context.attachShader(program, vertexShader);
    context.attachShader(program, fragmentShader);
    context.linkProgram(program);
    context.useProgram(program);

    const points = new Float32Array([
        0, Math.sqrt(11),
        2, Math.sqrt(3),
        1, 0,
        -1, 0,
        -2, Math.sqrt(3)
    ]);

    const buffer = context.createBuffer();
    context.bindBuffer(context.ARRAY_BUFFER, buffer);
    context.bufferData(context.ARRAY_BUFFER, points, context.STATIC_DRAW);

    const vPosition = context.getAttribLocation(program, 'position');
    context.vertexAttribPointer(vPosition, 2, context.FLOAT, false, 0, 0);
    context.enableVertexAttribArray(vPosition);

    context.clear(context.COLOR_BUFFER_BIT);
    context.drawArrays(context.TRIANGLE_FAN, 0, points.length / 2);
    //context.drawArrays(context.LINE_LOOP, 0, points.length / 2);
}());