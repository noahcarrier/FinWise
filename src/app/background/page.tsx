"use client"
import {Component, createRef} from "react";
import style from "./style.module.css";
import { Scene, PerspectiveCamera, WebGLRenderer, PlaneGeometry, MeshStandardMaterial, Mesh, PointLight, AmbientLight, PMREMGenerator, Vector3, TextureLoader, RepeatWrapping, ShaderMaterial, DoubleSide, BufferGeometry, BufferAttribute } from "three";
import { GLTFLoader, Sky, Water } from "three/examples/jsm/Addons.js";
import grassTexture from "./grass.jpg";
import cloudTexture from "./cloud.jpg";

// offset paramters
const PLANE_SIZE = 30;
const BLADE_COUNT = 100000;
const BLADE_WIDTH = 0.1;
const BLADE_HEIGHT = 0.8;
const BLADE_HEIGHT_VARIATION = 0.6;

// Predefined shaders
const grassShader = `varying vec2 vUv;
varying vec2 cloudUV;

varying vec3 vColor;
uniform float iTime;

void main() {
  vUv = uv;
  cloudUV = uv;
  vColor = color;
  vec3 cpos = position;

  float waveSize = 10.0f;
  float tipDistance = 0.3f;
  float centerDistance = 0.1f;

  if (color.x > 0.6f) {
    cpos.x += sin((iTime / 500.) + (uv.x * waveSize)) * tipDistance;
  }else if (color.x > 0.0f) {
    cpos.x += sin((iTime / 500.) + (uv.x * waveSize)) * centerDistance;
  }

  float diff = position.x - cpos.x;
  cloudUV.x += iTime / 20000.;
  cloudUV.y += iTime / 10000.;

  vec4 worldPosition = vec4(cpos, 1.);
  vec4 mvPosition = projectionMatrix * modelViewMatrix * vec4(cpos, 1.0);
  gl_Position = mvPosition;
}`;
const grassFragmentShader = `uniform sampler2D texture1;
uniform sampler2D textures[4];

varying vec2 vUv;
varying vec2 cloudUV;
varying vec3 vColor;

void main() {
  float contrast = 1.5;
  float brightness = 0.1;
  vec3 color = texture2D(textures[0], vUv).rgb * contrast;
  color = color + vec3(brightness, brightness, brightness);
  color = mix(color, texture2D(textures[1], cloudUV).rgb, 0.4);
  gl_FragColor.rgb = color;
  gl_FragColor.a = 1.;
}`;


export default class Background extends Component {
  elementParent = createRef<HTMLDivElement>();
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  initTime = Date.now();
  Time = {
    type: 'f',
    value: 0.0
  }
  constructor(props : {}) {
    super(props);
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({ antialias: true });
    this.camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
  }

  convertRange = (value: number, oldMin: number, oldMax: number, newMin: number, newMax: number) => {
    return (value - oldMin) * (newMax - newMin) / (oldMax - oldMin) + newMin;
  }

  generateBlade (center: Vector3, vArrOffset: number, uv : number[]) {
    const MID_WIDTH = BLADE_WIDTH * 0.5;
    const TIP_OFFSET = 0.1;
    const height = BLADE_HEIGHT + (Math.random() * BLADE_HEIGHT_VARIATION);
  
    const yaw = Math.random() * Math.PI * 2;
    const yawUnitVec = new Vector3(Math.sin(yaw), 0, -Math.cos(yaw));
    const tipBend = Math.random() * Math.PI * 2;
    const tipBendUnitVec = new Vector3(Math.sin(tipBend), 0, -Math.cos(tipBend));
  
    // Find the Bottom Left, Bottom Right, Top Left, Top right, Top Center vertex positions
    const bl = new Vector3().addVectors(center, new Vector3().copy(yawUnitVec).multiplyScalar((BLADE_WIDTH / 2) * 1));
    const br = new Vector3().addVectors(center, new Vector3().copy(yawUnitVec).multiplyScalar((BLADE_WIDTH / 2) * -1));
    const tl = new Vector3().addVectors(center, new Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * 1));
    const tr = new Vector3().addVectors(center, new Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * -1));
    const tc = new Vector3().addVectors(center, new Vector3().copy(tipBendUnitVec).multiplyScalar(TIP_OFFSET));
  
    tl.y += height / 2;
    tr.y += height / 2;
    tc.y += height;
  
    // Vertex Colors
    const black = [0, 0, 0];
    const gray = [0.5, 0.5, 0.5];
    const white = [1.0, 1.0, 1.0];
  
    const verts = [
      { pos: bl.toArray(), uv: uv, color: black },
      { pos: br.toArray(), uv: uv, color: black },
      { pos: tr.toArray(), uv: uv, color: gray },
      { pos: tl.toArray(), uv: uv, color: gray },
      { pos: tc.toArray(), uv: uv, color: white }
    ];
  
    const indices = [
      vArrOffset,
      vArrOffset + 1,
      vArrOffset + 2,
      vArrOffset + 2,
      vArrOffset + 4,
      vArrOffset + 3,
      vArrOffset + 3,
      vArrOffset,
      vArrOffset + 2
    ];
  
    return { verts, indices };
  }

  backgroundFieldHelper = (grassMat: ShaderMaterial) => {

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < BLADE_COUNT; i++) {
      const VERTEX_COUNT = 5;
      const surfaceMin = PLANE_SIZE / 2 * -1;
      const surfaceMax = PLANE_SIZE / 2;
      const radius = PLANE_SIZE / 2;

      const r = radius * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);

      const pos = new Vector3(x, 0, y);

      const uv = [this.convertRange(pos.x, surfaceMin, surfaceMax, 0, 1), this.convertRange(pos.z, surfaceMin, surfaceMax, 0, 1)];

      const blade = this. generateBlade(pos, i * VERTEX_COUNT, uv);
      blade.verts.forEach(vert => {
        positions.push(...vert.pos);
        uvs.push(...vert.uv);
        colors.push(...vert.color);
      });
      blade.indices.forEach(indice => indices.push(indice));
    }

    const geom = new BufferGeometry();
    geom.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    geom.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2));
    geom.setAttribute('color', new BufferAttribute(new Float32Array(colors), 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    const mesh = new Mesh(geom, grassMat);
    this.scene.add(mesh);
  }
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
    const grassText = new TextureLoader().load(grassTexture.src);
    const cloudText = new TextureLoader().load(cloudTexture.src);
    cloudText.wrapS = cloudText.wrapT = RepeatWrapping;
    const grassMaterial = new ShaderMaterial({
      uniforms: {
        textures: { value: [grassText, cloudText] },
        iTime: this.Time
      },
      vertexShader: grassShader,
      fragmentShader: grassFragmentShader,
      vertexColors: true,
      side: DoubleSide
    })
    this.backgroundFieldHelper(grassMaterial);


  }

  loadTable = async () => {
    // Load the table model
    const table = await new GLTFLoader().loadAsync("/models/table/scene.gltf");
    table.scene.scale.set(0.02, 0.02, 0.02);
    table.scene.position.set(0, 0, 0);
    
    // Add direct light to the table
    const light = new PointLight(0xffffff, 500, 100);
    light.position.set(0, 800, 0);
    table.scene.add(light);

    this.scene.add(table.scene);

  }



  fishObject = () =>{ 
    // Using three.js to create a 3D object representing a fish
    
  }

  doRender = () => {
    
    this.Time.value = Date.now()-this.initTime;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.doRender);
    
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

    // Load all the scene stuff
    this.generateBackground();
    this.loadTable();
    
    // Set camera position
    this.camera.position.set(-2, 3, 10);
    this.camera.setFocalLength(15);

    // Render loop
    window.addEventListener('resize', this.pageResize);
    this.pageResize();
    this.doRender();
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.pageResize);
    this.scene.traverse((obj) => {
      if (obj instanceof Mesh) {
          obj.geometry.dispose();
          obj.material.dispose();
      }
    });
    this.scene.clear();
    this.renderer?.dispose();
  }

  render() {
    return (
      <div className={style.mainCanvas} ref={this.elementParent}>
      </div>
      )
  }
        
}