var scene = new THREE.Scene();
// scene.background = new THREE.Color( 0xffffff );
			var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
			keyLight.position.set(-100, 0, 100);
			
			var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
			fillLight.position.set(100, 0, 100);
			
			var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
			backLight.position.set(100, 0, -100).normalize();
			
			scene.add(keyLight);
			scene.add(fillLight);
			scene.add(backLight);

			
			// var mtlLoader = new THREE.MTLLoader();
			// mtlLoader.setTexturePath('Assets/');
			// mtlLoader.setPath('Assets/');
			// mtlLoader.load('sa.mtl', function (materials) {
			
			// 	materials.preload();
			
			// 	var objLoader = new THREE.OBJLoader();
			// 	objLoader.setMaterials(materials);
			// 	objLoader.setPath('Assets/');
			// 	objLoader.load('sa.obj', function (object) {
			
			// 		scene.add(object);
		
			// 	});
			
			// });
			const loader = new THREE.OBJLoader()
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
			// const controls = new THREE.OrbitControls(camera)
  			// controls.enableZoom = false //zoom happens on scroll which can be quite annoying

	


			// var mtlLoader2 = new THREE.MTLLoader();
			// mtlLoader2.setTexturePath('obj/');
			// mtlLoader2.setPath('obj/');
			// mtlLoader2.load('saucer.mtl', function (materials) {
			
			// 	materials.preload();
			
			// 	var objLoader2 = new THREE.OBJLoader();
			// 	objLoader2.setMaterials(materials);
			// 	objLoader2.setPath('obj/');
			// 	objLoader2.load('saucer.obj', function (object) {
			
			// 		scene.add(object);
		
			// 	});
			
			// });
			
			var animate = function () {
				requestAnimationFrame( animate );
				mesh.rotation.y += 0.001;
				// mesh.rotation.y -= 0.01;

				renderer.render( scene, camera );
			};


			animate();