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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Lights
 */
 const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
 scene.add(ambientLight)

/**
 * Textures
 */
 const textureLoader = new THREE.TextureLoader()

 const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
 const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
 const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
 const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
 const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
 const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
 const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
 const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
 const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

/**
 * Objects
 */
 const material = new THREE.MeshBasicMaterial()
// const material = new THREE.MeshNormalMaterial()
// const material = new THREE.MeshMatcapMaterial()
// const material = new THREE.MeshDepthMaterial()
 material.map = doorColorTexture

// material.matcap = doorColorTexture

//  material.color = new THREE.Color('#ff0000')
// material.color = new THREE.Color('#f00')
// material.color = new THREE.Color('red')
// material.color = new THREE.Color('rgb(255, 0, 0)')
// material.color = new THREE.Color(0xff0000)

// material.wireframe = true

// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorColorTexture
// material.side = THREE.DoubleSide
// material.flatShading = true

 const sphere = new THREE.Mesh(
     new THREE.SphereGeometry(0.5, 16, 16),
     material
 )
 sphere.position.x = - 1.5

 const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()