// // initialise constants
// const numberOfParticles = 10000;
		
// const particleImage = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605067/particle-tiny.png',
// 			particleColor = '0xFFFFFF',
// 			particleSize = .1;

// const defaultAnimationSpeed = 1,
// 			morphAnimationSpeed = 3;
// // select all paragraph tags in the span timeline class

// const sideNav = document.getElementsByClassName('spanTimeline')[0].querySelectorAll('p')

// //initiate renderer
// var renderer = new THREE.WebGLRenderer();
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// // Make the threejs canvas responsive
// function fullScreen () {
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();

// 	renderer.setSize( window.innerWidth, window.innerHeight );
// }

// window.addEventListener('resize', fullScreen, false)

// // create the scene
// var scene = new THREE.Scene();

// // create camera and position it
// var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window/innerHeight, 1, 10000)
// camera.position.y = 25;
// camera.position.z = 36;

// // particles variables
// var particleCount = numberOfParticles;
// let letterWPoints,
// 	chairPoints,
// 	anatomyPoints,
// 	guitarPoints,
// 	cameraPoints,
// 	bookPoints,
// 	padpoints,
// 	phonePoints,

// var pMaterial = new THREE.Geometry(),
// 	letterWParticles = new THREE.Geometry(),
// 	chairParticles = new THREE.Geometry(),
// 	anatomyParticles = new THREE.Geometry(),
// 	guitarParticles = new THREE.Geometry(),
// 	cameraParticles = new THREE.Geometry(),
// 	bookParticles = new THREE.Geometry(),
// 	padpoarticles= new THREE.Geometry(),
// 	phoneParticles = new THREE.Geometry();

// var pMaterial = new THREE.PointCloudMaterial({
// 	color: particleColor,
// 	size:particleSize,
// 	map: THREE.ImageUtils.loadTexture(particleImage),
// 	blending:THREE.AdditiveBlending,
// 	transparent: true
// });

// // custom obj i will use

// // initialise obj loader
// var ObjLoader = new THREE.OBJLoader();

// // landing section
// objLoader.load( 'https://cdn.glitch.com/6a29bec8-9471-403e-a502-375b8f18bbc2%2F1333%20Phone.obj?v=1560149942462', function ( object ) {	
// 	object.traverse( function ( child ) {
// 		if ( child instanceof THREE.Mesh ) {
// 			let scale = .3;
			
// 			let area = new THREE.Box3();
// 				area.setFromObject( child );
// 			let yOffset = (area.max.y * scale) / 2;
// 			// scene.background = new THREE.Color( 0xffff33 );

// 			child.geometry.scale(scale,scale,scale);
// 			rocketPoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
// 			createVertices(rocketParticles, rocketPoints, yOffset, 2);
// 		}
// 	});
// });
// // var objLoader = new THREE.OBJLoader();
// // objLoader.setPath(codepenAssetUrl);
// objLoader.load( 'https://cdn.glitch.com/6a29bec8-9471-403e-a502-375b8f18bbc2%2FAcoustic_Guitar_01.obj?v=1560149442376', function ( object ) {
// 	object.traverse( function ( child ) {
// 		if ( child instanceof THREE.Mesh ) {
// 			let scale = 1.5;
			
// 			let area = new THREE.Box3();
// 				area.setFromObject( child );
// 			let yOffset = (area.max.y * scale) / 2;
			
// 			child.geometry.scale(scale,scale,scale);
// 			spacemanPoints = THREE.GeometryUtils.randomPointsInBufferGeometry(child.geometry, particleCount);
// 			createVertices(spacemanParticles, spacemanPoints, yOffset, 3);
// 		}
// 	});
// });

// // Particles
// for (var p = 0; p < particleCount; p++) {
// 	var vertex = new THREE.Vector3();
// 			vertex.x = 0;
// 			vertex.y = 0;
// 			vertex.z = 0;

// 	particles.vertices.push(vertex);
// }


			var scene = new THREE.Scene();
// scene.background = new THREE.Color( 0xffffff );
			var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
			
			const loader = new THREE.OBJLoader()
			// loader.load('https://cdn.glitch.com/6a29bec8-9471-403e-a502-375b8f18bbc2%2Fbat%20tay.obj?v=1560150513467',
			loader.load('https://cdn.glitch.com/6a29bec8-9471-403e-a502-375b8f18bbc2%2FBrain.obj?v=1560148572474',
			// loader.load('https://cdn.glitch.com/c101cd3f-90ac-45dd-9a2a-b3b33d2d39be%2Fb5c36325324cf21518df524ac298eb5a.obj?v=1560109361856',
			// loader.load('https://cdn.glitch.com/c101cd3f-90ac-45dd-9a2a-b3b33d2d39be%2FFree_Brain.obj?v=1560108459278',
			// loader.load('https://cdn.glitch.com/c101cd3f-90ac-45dd-9a2a-b3b33d2d39be%2FAfrica_final.obj?v=1560108200642',
			// loader.load('https://cdn.glitch.com/c101cd3f-90ac-45dd-9a2a-b3b33d2d39be%2FModesty_Veiled_Armchair.obj?v=1560108051253',
			// loader.load('https://cdn.glitch.com/fcf3c007-b4eb-4250-ba6b-653fdab94ce3%2Fjapanese_temple.obj?1558792651869',
			(obj) => {
				// the request was successfull
				let material = new THREE.PointsMaterial({ color: 'grey', size: 2 })
				mesh = new THREE.Points(obj.children[0].geometry, material)
				mesh.position.y = -85 //this model is not exactly in the middle by default so I moved it myself
				// mesh.position.x = -100

				scene.add(mesh)

			},
			(xhr) => {
				// the request is in progress
				console.log(xhr)
			},
			(err) => {
				// something went wrong
				console.error("loading .obj went wrong, ", err)
			})
			
			camera.position.z = 500;
		
			var animate = function () {
				requestAnimationFrame( animate );
				mesh.rotation.y += 0.001;
				// mesh.rotation.y -= 0.01;

				renderer.render( scene, camera );
			};


			animate();