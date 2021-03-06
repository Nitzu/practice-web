/*var scene, renderer, camera;
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, wWidth / wHeight, 0.1, 1000 );
renderer = new THREE.WebGLRenderer();

renderer.setSize( wWidth, wHeight );
document.body.appendChild( renderer.domElement );

var geo = new THREE.BoxGeometry( 1, 1, 1 );
var mat = new THREE.MeshBasicMaterial( { color: 0x00e0e0 } );
var cube = new THREE.Mesh( geo, mat );

scene.add( cube );

camera.position.z = 5;

function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera);
}

render();*/

var container;

			var camera, scene, renderer, controls;

			init();
			animate();

			function init() {

				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.style.color = '#fff';
				info.style.link = '#f80';
				info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> webgl - geometry extrude shapes';
				document.body.appendChild( info );

				renderer = new THREE.WebGLRenderer();
				renderer.setClearColor( 0x222222 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 0, 0, 500 );

				controls = new THREE.TrackballControls( camera, renderer.domElement );
				controls.minDistance = 200;
				controls.maxDistance = 500;

				scene.add( new THREE.AmbientLight( 0x222222 ) );

				var light = new THREE.PointLight( 0xffffff );
				light.position.copy( camera.position );
				scene.add( light );

				//

				var closedSpline = new THREE.ClosedSplineCurve3( [
					new THREE.Vector3( -60, -100,  60 ),
					new THREE.Vector3( -60,   20,  60 ),
					new THREE.Vector3( -60,  120,  60 ),
					new THREE.Vector3(  60,   20, -60 ),
					new THREE.Vector3(  60, -100, -60 )
				] );

				var extrudeSettings = {
					steps			: 100,
					bevelEnabled	: false,
					extrudePath		: closedSpline
				};


				var pts = [], count = 3;

				for ( var i = 0; i < count; i ++ ) {

					var l = 20;

					var a = 2 * i / count * Math.PI;

					pts.push( new THREE.Vector2 ( Math.cos( a ) * l, Math.sin( a ) * l ) );

				}

				var shape = new THREE.Shape( pts );

				var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

				var material = new THREE.MeshLambertMaterial( { color: 0xb00000, wireframe: false } );

				var mesh = new THREE.Mesh( geometry, material );

				scene.add( mesh );


				//


				var randomPoints = [];

				for ( var i = 0; i < 10; i ++ ) {

					randomPoints.push( new THREE.Vector3( ( i - 4.5 ) * 50, THREE.Math.randFloat( - 50, 50 ), THREE.Math.randFloat( - 50, 50 ) ) );

				}

				var randomSpline =  new THREE.SplineCurve3( randomPoints );

				//

				var extrudeSettings = {
					steps			: 200,
					bevelEnabled	: false,
					extrudePath		: randomSpline
				};


				var pts = [], numPts = 5;

				for ( var i = 0; i < numPts * 2; i ++ ) {

					var l = i % 2 == 1 ? 10 : 20;

					var a = i / numPts * Math.PI;

					pts.push( new THREE.Vector2 ( Math.cos( a ) * l, Math.sin( a ) * l ) );

				}

				var shape = new THREE.Shape( pts );

				var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

				var material2 = new THREE.MeshLambertMaterial( { color: 0xff8000, wireframe: false } );

				var mesh = new THREE.Mesh( geometry, material2 );

				scene.add( mesh );


				//


				var materials = [ material, material2 ];

				var extrudeSettings = {
					amount			: 20,
					steps			: 1,
					material		: 1,
					extrudeMaterial : 0,
					bevelEnabled	: true,
					bevelThickness  : 2,
					bevelSize       : 4,
					bevelSegments   : 1,
				};

				var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

				var mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );

				mesh.position.set( 50, 100, 50 );

				scene.add( mesh );

			}

			function animate() {

				requestAnimationFrame( animate );

				controls.update();

				renderer.render( scene, camera );

			}
