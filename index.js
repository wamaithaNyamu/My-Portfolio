function myFunction() {

	window.onload = setTimeout(() => {
		toHome()

		showPage()
	}, 6000);
  }
  
  function showPage() {

	document.getElementById("loader").style.display = "none";
	document.getElementById("myDiv").style.display = "block";
  }
// Options
const numberOfParticles = 30000;
		
const particleImage = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605067/particle-tiny.png',
			particleColor = '0xFFFFFF',
			particleSize = .1;

const defaultAnimationSpeed = 1,
			morphAnimationSpeed = 3;

// Triggers
const triggers = document.getElementsByClassName('triggers')[0].querySelectorAll('span')

// Renderer
const canvas = document.querySelector('#canvas')
var renderer = new THREE.WebGLRenderer({canvas});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Ensure Full Screen on Resize
function fullScreen () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('resize', fullScreen, false)

// Scene
var scene = new THREE.Scene();

// Camera and position
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

camera.position.y = 25;
camera.position.z = 36;

// controls
let controls = new THREE.OrbitControls( camera );

// to disable zoom
controls.enableZoom = false;

// to disable rotation
controls.enableRotate = false;

// to disable pan
controls.enablePan = false;

// Lighting
var light = new THREE.AmbientLight( 0x404040, 1 ); // soft white light
scene.add( light );

// Particle Vars
var particleCount = numberOfParticles;

let 	projectPoints,
		homePoints,
		contactPoints,
		aboutPoints;

var particles = new THREE.Geometry(),
		projectParticles = new THREE.Geometry(),
		homeParticles = new THREE.Geometry(),
		aboutParticles =  new THREE.Geometry(),
		contactParticles = new THREE.Geometry();

var pMaterial = new THREE.PointCloudMaterial({
			color: particleColor,
			size: particleSize,
			map: THREE.ImageUtils.loadTexture(particleImage),
			blending: THREE.AdditiveBlending,
			transparent: true
});

// Custom (OGJ) Objects
// PROJECTS
var objLoader = new THREE.OBJLoader();
objLoader.load( 'https://cdn.glitch.com/6a29bec8-9471-403e-a502-375b8f18bbc2%2FHigh-end_headset_01.obj?v=1560289457519', function ( object ) {

	object.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			let scale = 1;
			
			let area = new THREE.Box3();
				area.setFromObject( child );
			let yOffset = (area.max.y * scale) / 2;
			child.geometry.scale(scale,scale,scale);
			projectPoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
			createVertices(projectParticles, projectPoints, yOffset, 2);
		}
	});
});
// CONTACTS
objLoader.load( 'https://cdn.glitch.com/6a29bec8-9471-403e-a502-375b8f18bbc2%2F1333%20Phone.obj?v=1560149942462', function ( object ) {	
	object.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			let scale = .3;
			
			let area = new THREE.Box3();
				area.setFromObject( child );
			let yOffset = (area.max.y * scale) / 2;
			
			child.geometry.scale(scale,scale,scale);
			contactPoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
			createVertices(contactParticles, contactPoints, yOffset, 3);
		}
	});
});

// home 
objLoader.load('https://cdn.glitch.com/6a29bec8-9471-403e-a502-375b8f18bbc2%2FStillettos_01.obj?v=1560178283848', function ( object ) {	
	object.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			let scale = 2;
			
			let area = new THREE.Box3();
				area.setFromObject( child );
			let yOffset = (area.max.y * scale) / 2;
			
			child.geometry.scale(scale,scale,scale);
			homePoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
			createVertices(homeParticles, homePoints, yOffset, 3);
		}
	});
});
// ABOUT ME
objLoader.load('https://cdn.glitch.com/6a29bec8-9471-403e-a502-375b8f18bbc2%2FCamera.obj?v=1560149926567', function ( object ) {	
	object.traverse( function ( child ) {
		if ( child instanceof THREE.Mesh ) {
			let scale = 2.5;
			
			let area = new THREE.Box3();
				area.setFromObject( child );
			let yOffset = (area.max.y * scale) / 2;
			
			child.geometry.scale(scale,scale,scale);
			aboutPoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
			createVertices(aboutParticles, aboutPoints, yOffset, 3);
		}
	});
});

// Particles
for (var p = 0; p < particleCount; p++) {
	var vertex = new THREE.Vector3();
			vertex.x = 0;
			vertex.y = 0;
			vertex.z = 0;

	particles.vertices.push(vertex);
}

function createVertices (emptyArray, points, yOffset = 0, trigger = null) {
	for (var p = 0; p < particleCount; p++) {
		var vertex = new THREE.Vector3();
				vertex.x = points[p]['x'];
				vertex.y = points[p]['y'] - yOffset;
				vertex.z = points[p]['z'];

		emptyArray.vertices.push(vertex);
	}
	if (trigger !== null) {
		triggers[trigger].setAttribute('data-disabled', false)
	}
}

var particleSystem = new THREE.PointCloud(
    particles,
    pMaterial
);

particleSystem.sortParticles = true;

// Add the particles to the scene
scene.add(particleSystem);

// Animate
const normalSpeed = (defaultAnimationSpeed/100),
			fullSpeed = (morphAnimationSpeed/100)

let animationVars = {
	speed: normalSpeed
}

function animate() {
	particleSystem.rotation.y += animationVars.speed;	
	particles.verticesNeedUpdate = true; 
	
	window.requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();
toHome()
// setTimeout(toHome, 100 );



function toHome(){
	handleTriggers(0);
	morphTo(homeParticles);
	toggle_visibility('home', 'about', 'projects', 'contacts')


	}

function toAbout () {
	handleTriggers(1);
	morphTo(aboutParticles);
	toggle_visibility('about', 'home', 'projects', 'contacts')
}

function toProject () {	
	handleTriggers(2);
	morphTo(projectParticles);
	toggle_visibility('projects', 'about', 'home', 'contacts')


}

function toContact () {
	handleTriggers(3);
	morphTo(contactParticles);
	toggle_visibility('contacts', 'home', 'projects', 'about')


}


function morphTo (newParticles, color = '0xffffff') {
	TweenMax.to(animationVars, .3, {ease:
	Power4.easeIn, speed: fullSpeed, onComplete: slowDown});
	particleSystem.material.color.setHex(color);
	
	for (var i = 0; i < particles.vertices.length; i++){
		TweenMax.to(particles.vertices[i], 4, {ease:
	Elastic.easeOut.config( 1, 0.75), x: newParticles.vertices[i].x, y: newParticles.vertices[i].y, z: newParticles.vertices[i].z})
	}
}

function slowDown () {
	TweenMax.to(animationVars, 2, {ease:
	Power2.easeOut, speed: normalSpeed, delay: 1});
}

triggers[0].addEventListener('click', toHome)
triggers[1].addEventListener('click', toAbout)
triggers[2].addEventListener('click', toProject)
triggers[3].addEventListener('click', toContact)


function handleTriggers (disable) {
	for (var x = 0; x < triggers.length; x++) {
		if (disable == x) {
			triggers[x].setAttribute('data-disabled', true)	
				
		} else {
			triggers[x].setAttribute('data-disabled', false)
		}
	}	
}

	function toggle_visibility(id1, id2, id3, id4) {
		var e = document.getElementById(id1);
		var g = document.getElementById(id2);
		var h = document.getElementById(id3);
		var j = document.getElementById(id4);
		if(e.style.display == 'block'){
		   e.style.display = 'none';
		   g.style.display = 'none';
		   h.style.display = 'none';
		   j.style.display = 'none';

		
		
		}
		
		else{
		   e.style.display = 'block';
		   g.style.display = 'none';
		   h.style.display = 'none';
		   j.style.display = 'none';
		}
	
	
	

}
