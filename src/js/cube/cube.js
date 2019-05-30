import { component } from 'bidello';
import {
  Object3D,
  BufferGeometryLoader,
  Mesh,
  DoubleSide,
  Texture,
  RepeatWrapping,
  NearestFilter,
} from 'three';
import { TweenMax, Elastic } from 'gsap/all';
import cubeData from './cube.json';
import MagicShader, { gui } from 'magicshader';
import assets from '../assets';
import camera from '../camera';

export default class extends component(Object3D) {
  init() {
    this.geometry = new BufferGeometryLoader().parse(cubeData);
    this.geometry.rotateX(Math.PI / 2);
    this.geometry.rotateZ(Math.PI / 2);
    this.geometry.rotateX(-Math.PI / 2);

    
    this.material = new MagicShader({
      name: 'Cube',
      vertexShader: require('./cube.vert'),
      fragmentShader: require('./cube.frag'),
      uniforms: {
        uTex: { value: new Texture() },
        uTime: { value: 0 },
      },
      side: DoubleSide,
    });

    assets.resources.texture.loading.then(() => {
      this.material.uniforms.uTex.value = new Texture(assets.resources.texture.meta.data);
      this.material.uniforms.uTex.value.anisotropy = 16;
      this.material.uniforms.uTex.value.wrapS = RepeatWrapping;
      this.material.uniforms.uTex.value.wrapT = RepeatWrapping;
      // this.material.uniforms.uTex.value.minFilter = NearestFilter;
      // this.material.uniforms.uTex.value.magFilter = NearestFilter;
      this.material.uniforms.uTex.value.needsUpdate = true;
    });

    TweenMax.to(this.material.uniforms.xAlpha, 2, {
      // delay: 2,
      value: 1,
      ease: 'Power4.easeInOut',
    });

    TweenMax.to(this.material.uniforms.uForce, 2, {
      delay: 2.4,
      value: 0.32,
      ease: Elastic.easeOut.config(1, 0.3),
    });

    this.mesh = new Mesh(this.geometry, this.material);
    this.add(this.mesh);

    gui.destroy();
  }

  onResize() {
    // this.unitWidth
    this.scale.setScalar(camera.unitWidth * 0.04);
  }

  onRaf({ delta }) {
    this.material.uniforms.uTime.value += delta;
    // this.mesh.rotation.x += 0.3 * delta;
    // this.mesh.rotation.y += 0.3 * delta;
  }
}