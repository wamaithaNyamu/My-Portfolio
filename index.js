var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );
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

			camera.position.z = 5;
	
			var mtlLoader = new THREE.MTLLoader();
			mtlLoader.setTexturePath('Assets/');
			mtlLoader.setPath('Assets/');
			mtlLoader.load('sa.mtl', function (materials) {
			
				materials.preload();
			
				var objLoader = new THREE.OBJLoader();
				objLoader.setMaterials(materials);
				objLoader.setPath('Assets/');
				objLoader.load('sa.obj', function (object) {
			
					scene.add(object);
		
				});
			
			});
			
			var animate = function () {
				requestAnimationFrame( animate );

				renderer.render( scene, camera );
			};


			animate();