import { component } from 'bidello';
import {
  Object3D,
  BufferGeometryLoader,
  Mesh,
  DoubleSide,
} from 'three';
import cubeData from './cube.json';
import MagicShader from 'magicshader';

export default class extends component(Object3D) {
  init() {
    this.geometry = new BufferGeometryLoader().parse(cubeData);

    this.material = new MagicShader({
      name: 'Cube',
      vertexShader: require('./cube.vert'),
      fragmentShader: require('./cube.frag'),
      side: DoubleSide,
    });

    this.mesh = new Mesh(this.geometry, this.material);

    this.add(this.mesh);
  }

  onRaf({ delta }) {
    this.mesh.rotation.x += 0.3 * delta;
    this.mesh.rotation.y += 0.3 * delta;
  }
}