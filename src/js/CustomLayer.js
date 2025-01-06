import mapboxgl from "mapbox-gl";
import vertexShaderSource from "/shader/vertexShader.glsl?raw";
import fragmentShaderSource from "/shader/fragmentShader.glsl?raw";

export default class CustomLayer {
  id = "highlight";
  type = "custom";

  onAdd(map, gl) {
    let vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    this.program = this.createProgram(gl, vertexShader, fragmentShader);

    this.aPos = gl.getUniformLocation(this.program, "a_pos");

    const helsinki = mapboxgl.MercatorCoordinate.fromLngLat({
      lng: 25.004,
      lat: 60.239,
    });
    const berlin = mapboxgl.MercatorCoordinate.fromLngLat({
      lng: 13.403,
      lat: 52.562,
    });
    const kyiv = mapboxgl.MercatorCoordinate.fromLngLat({
      lng: 30.498,
      lat: 50.541,
    });

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([helsinki.x, helsinki.y, berlin.x, berlin.y, kyiv.x, kyiv.y]),
      gl.STATIC_DRAW
    );
  }

  render(gl, matrix) {
    gl.useProgram(this.program);

    let positionAttributeLocation = gl.getAttribLocation(this.program, "a_position");
    let matrixLocation = gl.getUniformLocation(this.program, "u_matrix");

    gl.uniformMatrix4fv(matrixLocation, false, matrix);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
  }

  createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

}
