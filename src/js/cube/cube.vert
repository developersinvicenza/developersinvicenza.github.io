precision highp float;

attribute vec3 position;
attribute vec3 offset;
attribute vec2 uv;
attribute vec3 normal;
// attribute float delay;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform float uSpeed; // ms({ value: 0.0, step: 0.001, range: [-10, 10] })
uniform float uForce; // ms({ value: 0.0, step: 0.001, range: [-10, 10] })
uniform float uRotation; // ms({ value: -0.35, step: 0.001, range: [-1, 1] })
uniform float uTime;

varying vec2 vUv;
// varying float vDelay;
varying vec3 vNormal;

mat3 rotateX(float theta){
  float c=cos(theta);
  float s=sin(theta);
  return mat3(
    vec3(1,0,0),vec3(0,c,-s),vec3(0,s,c)
  );
}

mat3 rotateY(float theta){
  float c=cos(theta);
  float s=sin(theta);
  return mat3(
    vec3(c,0,s),vec3(0,1,0),vec3(-s,0,c)
  );
}
mat3 rotateZ(float theta){
  float c=cos(theta);
  float s=sin(theta);
  return mat3(
    vec3(c,-s,0),vec3(s,c,0),vec3(0,0,1)
  );
}

void main(){
  vUv=uv;
  vUv=clamp(vUv,0.,.999);
  // vDelay=delay;
  vNormal = normal * normalMatrix;
  
  vec3 pos=position;
  vec3 pivot=vec3(0.,0.,0.);
  
  float force=pos.x*uForce;
  
  pos.xyz+=pivot;

  float angle = force + uTime * 3.0;
  
  pos= pos * rotateX(angle);
  vNormal = vNormal * rotateX(-angle);
  pos.xyz-=pivot;
  
  // pos=pos*rotateZ(uRotation);
  
  pos+=offset;
  
  gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);
}