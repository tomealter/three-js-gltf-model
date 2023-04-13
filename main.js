import { gsap } from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(5));

// Lights
var light = new THREE.PointLight(0xffffcc, 80, 200);
light.position.set(4, 30, -20);
scene.add(light);

var light2 = new THREE.AmbientLight(0x20202a, 20, 100);
light2.position.set(30, -10, 30);
scene.add(light2);

// Camera
const camera = new THREE.PerspectiveCamera(
  4, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  1, // Near clipping pane
  50 // Far clipping pane
);
camera.position.z = 3;

// Renderer
const renderer = new THREE.WebGLRenderer({
  alpha: true, // Transparent background
  antialias: true // Smooths 3d geometry
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls (zoom and rotate model with mouse)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth controls

// Import Model - GLTF Loader (depends on file type)
const loader = new GLTFLoader();
loader.load(
  'models/forest/scene.gltf',
  gltf => {
    const model = gltf.scene;
    // Model positioning
    model.position.y = -.07;
    model.position.x = 0.02;
    model.rotation.x = 0;
    model.rotation.y = 1.3;

    // Add model to scene
    scene.add(model);

    // GSAP defaults
    const gsapDefaults = {
      duration: 3,
      ease: "power4.out",
    };

    // Animate model position
    gsap.from(model.position, {
      ...gsapDefaults,
      x: -0.2,
    });
    // Animate model rotation
    gsap.from(model.rotation, {
      ...gsapDefaults,
      y: 5,
    });
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);



// Reset renderer and aspect ratio on screen size change
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const render = () => {
  renderer.render(scene, camera);
}

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();

  render();
}

animate();
