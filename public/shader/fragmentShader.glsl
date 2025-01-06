#version 300 es
precision highp float;

in vec2 v_texcoord;
uniform sampler2D u_texture;
out vec4 outColor;

void main() {
  outColor = vec4(1.0, 0.0, 0.0, 0.5);
}