// require Jquery
var $ = require("jquery")
// require three
var THREE = require('three')

$(function () {
  // Main Components
  // The scene
  var scene = new THREE.Scene()
  // The camera
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )
  // renderer
  var renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.setClearColor(0x424242)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize( window.innerWidth, window.innerHeight )
  $('.demo').append(renderer.domElement)

  // Other Compooents
  // light
  // 0xfefefe color of AmbientLight, 0.5 for strength
  var ambientLight = new THREE.AmbientLight(0xff7a00, 0.5)
  var pointLight = new THREE.PointLight(0xffffff, 0.3)
  pointLight.position.set( 50, 50, 50 )
  var hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 )
  
  // load a texture, set wrap mode to repeat
  // url: https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Elon_Musk_2015.jpg/220px-Elon_Musk_2015.jpg
  // var texture = new THREE.TextureLoader().load( "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Elon_Musk_2015.jpg/220px-Elon_Musk_2015.jpg" )
  // texture.wrapS = THREE.RepeatWrapping
  // texture.wrapT = THREE.RepeatWrapping
  // texture.repeat.set( 3, 3 )
  
  // choosing materials
  // var material = new THREE.MeshBasicMaterial( { color: 0xfefefe } )
  // var material = new THREE.MeshBasicMaterial( { color: 0xfefefe, wireframe: true} )
  // var material = new THREE.MeshLambertMaterial( { color: 0xfefefe } )
  var material = new THREE.MeshLambertMaterial({
    map: texture
  })
  
  
  // making shapes
  var geometry = new THREE.BoxGeometry( 1, 1, 1 )
  var cube = new THREE.Mesh( geometry, material )
  
  // add to scene
  scene.add( cube )
  scene.add( ambientLight )
  scene.add( pointLight )
  scene.add( hemisphereLight )
  
  // set how far from you
  camera.position.z = 5
  
  // start the animation
  // Animation: rotating the cube
  var animate = function () {
    // for smoother animation
    requestAnimationFrame( animate )
    
    // rotation
    cube.rotation.x += 0.1
    cube.rotation.y += 0.1
    
    // render base on which scene and camera
    renderer.render( scene, camera )
  }
  // renderer.render( scene, camera )
  animate()
  
  
  
  
  
  
  
  
  
  
  
  
  
  ///////////////
  // particles //
  ///////////////
  
  // star texture
  var starTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/particle2.png')
  
  // changed PointsMaterial to ParticleBasicMaterial
  var starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } )
  // var starsMaterial = THREE.ParticleBasicMaterial({ color: 0xcccccc })
  // var starsMaterial = new THREE.PointsMaterial( {
  //   map: starTexture,
  //   size: 1.5,
  //   transparent: true
  // } )
  
  // starField
  var starsGeometry = new THREE.Geometry()
  
  for ( var i = 0; i < 10000; i ++ ) {
  
  	var star = new THREE.Vector3()
  	star.x = THREE.Math.randFloatSpread( 1000 )
  	star.y = THREE.Math.randFloatSpread( 1000 )
  	star.z = THREE.Math.randFloatSpread( 2000 )
  
    star.velocityX = (Math.random() - 0.5) / 3
    star.velocityY = (Math.random() - 0.3) / 3
    star.velocityZ = (Math.random() - 0.5) / 5
  
  	starsGeometry.vertices.push( star )
  
  }
  
  var starField = new THREE.Points( starsGeometry, starsMaterial )
  
  scene.add( starField )
  
  var animateStar = function () {
  
    // for smoother animation
    requestAnimationFrame( animateStar )
  
    // goes down then up again
    starsGeometry.vertices.forEach(function (star) {
      star.x += star.velocityX
      star.y += star.velocityY
      star.z += star.velocityZ
      if (star.x <= -200 || star.x >= 200) { star.velocityX *= -1 }
      if (star.y <= 0) { star.velocityX *= -1  }
      if (star.z <= -200 || star.z >= 200) { star.velocityZ *= -1 }
    })
  
    starsGeometry.verticesNeedUpdate = true
  
    // render base on which scene and camera
    renderer.render( scene, camera )
    
  }
  // renderer.render( scene, camera )
  animateStar()
})
