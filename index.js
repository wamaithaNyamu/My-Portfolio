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
			loader.load('https://cdn.glitch.com/fcf3c007-b4eb-4250-ba6b-653fdab94ce3%2Fjapanese_temple.obj?1558792651869',
			(obj) => {
				// the request was successfull
				let material = new THREE.PointsMaterial({ color: 'grey', size: 0.25 })
				mesh = new THREE.Points(obj.children[0].geometry, material)
				mesh.position.y = -15 //this model is not exactly in the middle by default so I moved it myself
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

			camera.position.z = 80;
			const controls = new THREE.OrbitControls(camera)
  			controls.enableZoom = false //zoom happens on scroll which can be quite annoying

	


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
				mesh.rotation.y += 0.01;
				// mesh.rotation.y -= 0.01;

				renderer.render( scene, camera );
			};


			animate();