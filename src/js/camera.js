import { PerspectiveCamera, Vector3 } from 'three';
import { component } from 'bidello';
import OrbitControls from 'orbit-controls-es6';
import renderer from './renderer';
import { map, lerp } from 'math-toolbox';

class Camera extends component(PerspectiveCamera) {
  constructor() {
    super(35, 0, 0.1, 500);

    this.position.set(0, 0, -10);
    this.lookAt(new Vector3(0, 0, 0));
    // this.initOrbitControl();

    this.x = 0;
    this.y = 0;

    document.addEventListener('mousemove', e => {
      this.x = map(e.clientX, 0, window.innerWidth, -7, 7);
      this.y = map(e.clientY, 0, window.innerHeight, -5, 5);
    })
  }

  initOrbitControl() {
    const controls = new OrbitControls(this, renderer.domElement);

    controls.enabled = true;
    controls.maxDistance = 1500;
    controls.minDistance = 0;
  }

  onResize({ ratio }) {
    this.aspect = ratio;
    this.updateProjectionMatrix();
    this.calculateUnitSize(ratio);
  }

  calculateUnitSize(ratio) {
    const vFov = this.fov * Math.PI / 180;

    this.unitHeight = 2 * Math.tan(vFov / 2) * 20; // 15 was the original pos
    this.unitWidth = this.unitHeight * ratio;
  }
  
  onRaf({ delta }) {
    this.position.x = lerp(this.position.x, this.x, .06);
    this.position.y = lerp(this.position.y, this.y, .06);
    this.lookAt(new Vector3(0, 0, 0));
  }
}

export default new Camera();