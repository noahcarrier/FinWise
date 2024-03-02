"use client"
import {Component, createRef} from "react";
import style from "./style.module.css";
import { Scene, PerspectiveCamera, WebGLRenderer, PlaneGeometry, MeshStandardMaterial, Mesh, PointLight, AmbientLight, PMREMGenerator, Vector3, TextureLoader, RepeatWrapping, ShaderMaterial } from "three";
import { Sky, Water } from "three/examples/jsm/Addons.js";




export default class Background extends Component {
  elementParent = createRef<HTMLDivElement>();
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer; 
  constructor(props : {}) {
    super(props);
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({ antialias: true });
    this.camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
  }
  water: Water | undefined;

  generateBackground = () => {
    // Create sky
    const sky = new Sky();
    sky.scale.setScalar(10000);
    this.scene.add(sky);
    
    // Create the godly sun
    const pmremGenerator = new PMREMGenerator(this.renderer);
    const sun = new Vector3();
    const theta = Math.PI * (0.49 - 0.5);
    const phi = 2 * Math.PI * (0.205 - 0.5);
    sun.x = Math.cos(phi);
    sun.y = Math.sin(phi) * Math.sin(theta);
    sun.z = Math.sin(phi) * Math.cos(theta);
    sky.material.uniforms['sunPosition'].value.copy(sun);
    // @ts-ignore
    this.scene.environment = pmremGenerator.fromScene(sky).texture;

    // Create a grass land
    const grassShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const grassFragmentShader = `
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(0.0, 0.8, 0.0, 1.0); // Green color for grass
      }
    `;

    // Create ground with shader material
    const groundGeometry = new PlaneGeometry(100, 100, 10, 10);
    const grassMaterial = new ShaderMaterial({
      vertexShader: grassShader,
      fragmentShader: grassFragmentShader
    });
    const ground = new Mesh(groundGeometry, grassMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate to lay flat on the ground
    this.scene.add(ground);


    // // Create Ocean
    // const waterGeometry = new PlaneGeometry(10000, 10000);
    // const water = new Water(
    //   waterGeometry,
    //   {
    //     textureWidth: 512,
    //     textureHeight: 512,
    //     waterNormals: new TextureLoader().load('', function ( texture ) {
    //       texture.wrapS = texture.wrapT = RepeatWrapping;
    //     }),
    //     alpha: 1.0,
    //     sunDirection: new Vector3(),
    //     sunColor: 0xffffff,
    //     waterColor: 0x001e0f,
    //     distortionScale: 3.7,
    //     fog: this.scene.fog !== undefined
    //   }
    // );
    // water.rotation.x =- Math.PI / 2;
    // this.scene.add(water);
  
    // this.water = water;

  }

  fishObject = () =>{ 
    // Using three.js to create a 3D object representing a fish
    
  }

  doRender = () => {
    requestAnimationFrame(this.doRender);
    if(this.water)
      this.water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    this.renderer.render(this.scene, this.camera);
  }

  pageResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  componentDidMount(): void {

    // Set up scene, camera, and renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.elementParent.current?.appendChild(this.renderer.domElement);
    this.generateBackground();
    
    // Set camera position
    this.camera.position.set(30, 30, 100);

    // Render loop
    window.addEventListener('resize', this.pageResize);
    this.pageResize();
    this.doRender();
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.pageResize);
    this.renderer?.dispose();
  }

  render() {
    return (
      <div className={style.mainCanvas} ref={this.elementParent}>
      </div>
      )
  }
        
}