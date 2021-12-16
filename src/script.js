import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.set( 3, 6, - 10 );
camera.lookAt( 0, 1, 0 );
scene.add(camera)

/**
 * Fog
 */
//  scene = new THREE.Scene();
 scene.background = new THREE.Color( 0xa0a0a0 );
 scene.fog = new THREE.Fog( 0xa0a0a0, 10, 22 );


/**
 * Lights
 */
 const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
 hemiLight.position.set( 0, 20, 0 );
 scene.add( hemiLight );

 const dirLight = new THREE.DirectionalLight( 0xffffff );
 dirLight.position.set( - 3, 10, - 10 );
 dirLight.castShadow = true;
 dirLight.shadow.camera.top = 10;
 dirLight.shadow.camera.bottom = - 10;
 dirLight.shadow.camera.left = - 10;
 dirLight.shadow.camera.right = 10;
 dirLight.shadow.camera.near = 0.1;
 dirLight.shadow.camera.far = 40;
 scene.add( dirLight );


 /**
  * Ground
  */
  const groundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry( 40, 40),
    new THREE.MeshPhongMaterial( {
        color: 0x999999,
        depthWrite: false
    } )
);

groundMesh.rotation.x = - Math.PI / 2;
groundMesh.receiveShadow = true;
scene.add( groundMesh );
// sizes.addEventListener( 'resize', onWindowResize );


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Cube
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(cube)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()