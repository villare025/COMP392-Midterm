/// <reference path="_reference.ts"/>
// MAIN GAME FILE
/*
Author:                Elaine Mae Villarino (villare025)
Last Modified By:      Elaine Mae Villarino (villare025)
Last Modified Date:    Wednesday, March 2nd, 2016
Program Description:   With Three.js, JavaScript, and TypeScript, create a web application that displays a 3D Tapered Tower.
                       The Tapered Tower will be made from Cube Meshes.
                       GUI Controls should allow the user/overseer to:
                         >> rotate each of the cubes in y direction with varying speeds
                         >> Placed 4th in class
Revision History:      https://github.com/villare025/COMP392-Midterm/commits/master
Last Modification:     Added Program Header
*/
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
    // Declare game objects
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
    var sky;
    var skyGeometry;
    var skyMaterial;
    var skytexture = THREE.ImageUtils.loadTexture('texture/sky.png');
    // Color Changes
    var cubeColor1 = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
    var cubeColor2 = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
    var cubeColor3 = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
    var cubeColor4 = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
    var cubeColor5 = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        // Setup the Default Renderer
        setupRenderer();
        setupCamera(); // Setup the Camera
        ////////////////////////////////////////////////
        ////      Start Building Tapered Tower      ////
        ////////////////////////////////////////////////
        // Cube1
        cubeGeometry = new CubeGeometry(6, 5, 6);
        //cubeMaterial = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
        cube1 = new Mesh(cubeGeometry, cubeColor1);
        cube1.position.setY(0);
        cube1.castShadow = true;
        cube1.receiveShadow = true;
        scene.add(cube1);
        console.log("Added Cube 1 to Scene");
        // Cube2
        cubeGeometry = new CubeGeometry(5, 2, 5);
        //cubeMaterial = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
        cube2 = new Mesh(cubeGeometry, cubeColor2);
        cube2.position.setY(3.5);
        cube2.castShadow = true;
        cube2.receiveShadow = true;
        scene.add(cube2);
        console.log("Added Cube 2 to Scene");
        // Cube3
        cubeGeometry = new CubeGeometry(4, 2, 4);
        //cubeMaterial = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
        cube3 = new Mesh(cubeGeometry, cubeColor3);
        cube3.position.setY(5.5);
        cube3.castShadow = true;
        cube3.receiveShadow = true;
        scene.add(cube3);
        console.log("Added Cube 1 to Scene");
        // Cube4
        cubeGeometry = new CubeGeometry(3, 1, 3);
        //cubeMaterial = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
        cube4 = new Mesh(cubeGeometry, cubeColor4);
        cube4.position.setY(7);
        cube4.castShadow = true;
        cube4.receiveShadow = true;
        scene.add(cube4);
        console.log("Added Cube 4 to Scene");
        // Cube5
        cubeGeometry = new CubeGeometry(2, 1, 2);
        //cubeMaterial = new LambertMaterial({ color: Math.random() * 0xc9c9c9 });
        cube5 = new Mesh(cubeGeometry, cubeColor5);
        cube5.position.setY(7.8);
        cube5.castShadow = true;
        cube5.receiveShadow = true;
        scene.add(cube5);
        console.log("Added Cube 5 to Scene");
        // Add an AmbientLight to Scene
        ambientLight = new AmbientLight(0x696969);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        // Point Light
        pointLight = new PointLight(0xffffff);
        pointLight.position.set(-4, 6, -4);
        pointLight.castShadow = true;
        scene.add(pointLight);
        console.log("Added pointLight to Scene");
        // Ground
        groundGeometry = new PlaneGeometry(100, 50);
        groundMaterial = new THREE.MeshPhongMaterial({ map: texture });
        ground = new Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -0.5 * Math.PI;
        scene.add(ground);
        console.log("Added Grassy Ground to Scene");
        // Sky
        skyGeometry = new PlaneGeometry(100, 100);
        skyMaterial = new THREE.MeshPhongMaterial({ map: skytexture });
        sky = new Mesh(skyGeometry, skyMaterial);
        sky.rotation.y = -45 * Math.PI;
        sky.position.z = 15;
        scene.add(sky);
        console.log("Added Sky to Scene");
        // Add Helper Axis
        axes = new AxisHelper(30);
        ground.add(axes);
        console.log("Added Axis Helper Object to the Ground");
        ////////////////////////////////////////////////
        ////       End Building Tapered Tower       ////
        ////////////////////////////////////////////////
        ///////////////////////////////////////////////////////
        //// Start Building Tapered Tower Overseer Control ////
        ///////////////////////////////////////////////////////
        // Add Scene Controls
        gui = new GUI();
        // Add Overseer Controls 
        //   >> Cube Y-Speed Rotations
        control = new Control(0, 0.003, 0.003, 0.002, 0.0016);
        addControl(control);
        // Add Frame Rate Stats
        addStatsObject();
        console.log("Added Stats to Scene");
        document.body.appendChild(renderer.domElement);
        // Render the Scene
        gameLoop();
    }
    function addControl(controlObject) {
        // Controls for Cube Y-Rotate Speed
        gui.add(controlObject, 'cube1Speed', -0.1, 0.1);
        gui.add(controlObject, 'cube2Speed', -0.1, 0.1);
        gui.add(controlObject, 'cube3Speed', -0.01, 0.01);
        gui.add(controlObject, 'cube4Speed', -0.01, 0.01);
        gui.add(controlObject, 'cube5Speed', -0.01, 0.01);
        // Try Color Changes
        //gui.addColor(controlObject, 'changeOutfit').onChange((color) => { cube1.color = new Color(color); });
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
