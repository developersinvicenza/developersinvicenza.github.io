precision highp float;

uniform sampler2D uTex;
uniform vec3 color; // ms({ value: '#ff0000' })
uniform float xAlpha; // ms({ value: 0, step: 0.01, range: [0, 1] })

varying vec2 vUv;
varying vec3 vNormal;
// varying float vDelay;

void main(){
  // float alpha = step(xAlpha, vUv.x);
  
  // if (vUv.x <=.001 || vUv.x>=.998){
  //   discard;
  // }

  vec3 color = texture2D(uTex, vUv).rgb;
  
  if (vUv.x > xAlpha){
    discard;
  }

  vec3 L = vec3(0.4);
  float force = max(dot(normalize(vNormal),L), 0.0);

  color *= smoothstep(-0.8, 1.0, force);
  
  gl_FragColor = vec4(color, 1.);
}