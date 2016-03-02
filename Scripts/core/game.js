/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var scene = new Scene();
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
    // Declare Tapered Tower Game Objects
    var axes;
    var cube1;
    var cube2;
    var cube3;
    var cube4;
    var cube5;
    var cubeGeometry;
    var cubeMaterial;
    var ground;
    var groundGeometry;
    var groundMaterial;
    var pointLight;
    var ambientLight;
    var texture = THREE.ImageUtils.loadTexture('texture/grass.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(7, 5);
    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        /* ENTER CODE HERE */
        // Cube1
        cubeGeometry = new CubeGeometry(6, 5, 6);
        cubeMaterial = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
        cube1 = new Mesh(cubeGeometry, cubeMaterial);
        cube1.position.setY(0);
        scene.add(cube1);
        console.log("Added Cube 1 to scene");
        // Cube2
        cubeGeometry = new CubeGeometry(5, 2, 5);
        cubeMaterial = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
        cube2 = new Mesh(cubeGeometry, cubeMaterial);
        cube2.position.setY(3.5);
        scene.add(cube2);
        console.log("Added Cube 2 to scene");
        // Cube3
        cubeGeometry = new CubeGeometry(4, 2, 4);
        cubeMaterial = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
        cube3 = new Mesh(cubeGeometry, cubeMaterial);
        cube3.position.setY(5.5);
        scene.add(cube3);
        console.log("Added Cube 1 to scene");
        // Cube4
        cubeGeometry = new CubeGeometry(3, 1, 3);
        cubeMaterial = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
        cube4 = new Mesh(cubeGeometry, cubeMaterial);
        cube4.position.setY(7);
        scene.add(cube4);
        console.log("Added Cube 4 to scene");
        // Cube5
        cubeGeometry = new CubeGeometry(2, 1, 2);
        cubeMaterial = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
        cube5 = new Mesh(cubeGeometry, cubeMaterial);
        cube5.position.setY(7.8);
        scene.add(cube5);
        console.log("Added Cube 5 to scene");
        // Add an AmbientLight to Scene
        ambientLight = new AmbientLight(0x696969);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        // Point Light
        pointLight = new PointLight(0xffffff);
        pointLight.position.set(-4, 6, -4);
        scene.add(pointLight);
        console.log("Added pointLight to scene");
        // Ground
        groundGeometry = new PlaneGeometry(16, 16);
        groundMaterial = new THREE.MeshPhongMaterial({ map: texture });
        ground = new Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -0.5 * Math.PI;
        scene.add(ground);
        console.log("Added Burnt Ground to scene");
        // Add Helper Axis
        axes = new AxisHelper(30);
        ground.add(axes);
        console.log("Added Axis Helper Object to the ground");
        // add controls
        gui = new GUI();
        control = new Control(0, 0.003, 0.003, 0.002, 0.0016);
        addControl(control);
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
    }
    function addControl(controlObject) {
        /* ENTER CODE for the GUI CONTROL HERE */
        // Cube Rotates
        gui.add(controlObject, 'cube1Speed', -0.1, 0.1);
        gui.add(controlObject, 'cube2Speed', -0.1, 0.1);
        gui.add(controlObject, 'cube3Speed', -0.01, 0.01);
        gui.add(controlObject, 'cube4Speed', -0.01, 0.01);
        gui.add(controlObject, 'cube5Speed', -0.01, 0.01);
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        // Rotate Speeds
        cube1.rotation.y += control.cube1Speed;
        cube2.rotation.y += control.cube2Speed;
        cube3.rotation.y += control.cube3Speed;
        cube4.rotation.y += control.cube4Speed;
        cube5.rotation.y += control.cube5Speed;
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(35, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 15.3;
        camera.position.y = 18.5;
        camera.position.z = -28.7;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();

//# sourceMappingURL=game.js.map
