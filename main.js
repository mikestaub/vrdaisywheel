var glRenderer = new THREE.WebGLRenderer( { antialias: true } );
document.body.appendChild( glRenderer.domElement );

// create another renderer and place it right on the glRenderer
var cssRenderer = new THREE.CSS3DStereoRenderer();
cssRenderer.setSize( window.innerWidth, window.innerHeight );
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = 0;
document.body.appendChild( cssRenderer.domElement );

var glScene = new THREE.Scene();
var cssScene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0, 100 );

var controls = new THREE.VRControls( camera );

var glEffect = new THREE.VREffect( glRenderer );
glEffect.setSize( window.innerWidth, window.innerHeight );

var cssEffect = new THREE.VREffect( cssRenderer );
cssEffect.setSize( window.innerWidth, window.innerHeight );

// create a nice skydome for effect
var geometry = new THREE.SphereGeometry( 5000, 64, 32 );
geometry.applyMatrix( new THREE.Matrix4().makeScale( -1, 1, 1 ) );
var texture = THREE.ImageUtils.loadTexture( "background.jpg" );
texture.minFilter = THREE.LinearFilter;
var material = new THREE.MeshBasicMaterial( {
	map: texture
} );

var mesh = new THREE.Mesh( geometry, material );
glScene.add( mesh );

// create the dom Element
var element = document.createElement( 'iframe' );
element.src = "http://mikestaub.github.io/daisywheeljs";
element.style.width = '2000px';
element.style.height = '1000px';
element.style.backgroundColor = 'gray';
var cssObject = new THREE.CSS3DObject( element );
cssObject.position.z = -2500;
cssScene.add(cssObject);

/*
Request animation frame loop function
*/
function animate() {

  controls.update();

  glEffect.render( glScene, camera );
  cssEffect.render( cssScene, camera );

  requestAnimationFrame( animate );
}

animate();

document.body.addEventListener( 'dblclick', function() {
  effect.setFullScreen( true );
});

/*
Listen for keyboard event and zero positional sensor on appropriate keypress.
*/
function onkey(event) {
  event.preventDefault();

  if (event.keyCode == 90) { // z
    controls.resetSensor();
  }
};

window.addEventListener("keydown", onkey, true);


/*
Handle window resizes
*/
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  glEffect.setSize( window.innerWidth, window.innerHeight );
  cssEffect.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', onWindowResize, false );
