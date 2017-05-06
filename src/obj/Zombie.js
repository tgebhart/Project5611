var Zombie = function () {

	var scope = this;

	THREE.Geometry.call( this );

	geo = new THREE.BoxGeometry( 5, 5, 5 );

  for (var i = 0; i < geo.vertices.length; i++) {

    scope.vertices.push( geo.vertices[i] );

  }

  for ( var i = 0; i < geo.faces.length; i++ ) {

    scope.faces.push( geo.faces[i] );

  }




	this.computeFaceNormals();

	function v( x, y, z ) {

		scope.vertices.push( new THREE.Vector3( x, y, z ) );

	}

	function f3( a, b, c ) {

		scope.faces.push( new THREE.Face3( a, b, c ) );

	}

}

Zombie.prototype = Object.create( THREE.Geometry.prototype );
Zombie.prototype.constructor = Zombie;
