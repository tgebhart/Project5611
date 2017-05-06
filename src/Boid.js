var Boid = function() {

    var vector = new THREE.Vector3();
    var acceleration;
    var width = 1000;
    var height = 1000;
    var depth = 1000;
    var goal;
    var neighborhoodRadius = 200;
    var maxSpeed = 2.5;
    var maxSteerForce = .01;
    var avoidWalls = false;

    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    acceleration = new THREE.Vector3();

    this.setGoal = function(target, freedom) {

      if (freedom) {
        goal = null;
      }
      else {
        goal = target;
      }
    };

    this.setAvoidWalls = function(value) {

        avoidWalls = value;

    };

    this.setWorldSize = function(w, h, d) {

        width = w;
        height = h;
        depth = d;

    };

    this.alignment = function(boids) {

        var boid,
            velSum = new THREE.Vector3(),
            count = 0;

        for (var i = 0, il = boids.length; i < il; i++) {

            if (Math.random() > 0.9)
                continue;

            boid = boids[i];

            distance = boid.position.distanceTo(this.position);

            if (distance > 0 && distance <= neighborhoodRadius) {

                velSum.add(boid.velocity);
                count++;

            }

        }

        if (count > 0) {

            velSum.divideScalar(count);

            var l = velSum.length();

            if (l > maxSteerForce) {

                velSum.divideScalar(l / maxSteerForce);

            }

        }

        return velSum;

    };

    this.avoid = function(target) {

        var steer = new THREE.Vector3();

        steer.copy(this.position);
        steer.sub(target);

        steer.multiplyScalar(1 / this.position.distanceToSquared(target));

        return steer;

    };

    this.cohesion = function(boids) {

        var boid,
            distance,
            posSum = new THREE.Vector3(),
            steer = new THREE.Vector3(),
            count = 0;

        for (var i = 0, il = boids.length; i < il; i++) {

            if (Math.random() > 0.9)
                continue;

            boid = boids[i];
            distance = boid.position.distanceTo(this.position);

            if (distance > 0 && distance <= neighborhoodRadius) {

                posSum.add(boid.position);
                count++;

            }

        }

        if (count > 0) {

            posSum.divideScalar(count);

        }

        steer.subVectors(posSum, this.position);

        var l = steer.length();

        if (l > maxSteerForce) {

            steer.divideScalar(l / maxSteerForce);

        }

        return steer;

    };

    this.separation = function(boids) {

        var boid,
            distance,
            posSum = new THREE.Vector3(),
            repulse = new THREE.Vector3();

        for (var i = 0, il = boids.length; i < il; i++) {

            if (Math.random() > 0.6)
                continue;

            boid = boids[i];
            distance = boid.position.distanceTo(this.position);

            if (distance > 0 && distance <= neighborhoodRadius) {

                repulse.subVectors(this.position, boid.position);
                repulse.normalize();
                repulse.divideScalar(distance);
                posSum.add(repulse);

            }

        }

        return posSum;

    }

    this.reach = function(target, amount) {

        var steer = new THREE.Vector3();

        steer.subVectors(target, this.position);
        steer.multiplyScalar(amount);

        return steer;

    };

    this.flock = function(boids) {

        if (goal) {

            acceleration.add(this.reach(goal, 0.008));

        }

        acceleration.add(this.alignment(boids));
        acceleration.add(this.cohesion(boids));
        acceleration.add(this.separation(boids));

    };

    this.move = function() {

        this.velocity.add(acceleration);

        var l = this.velocity.length();

        if (l > maxSpeed) {

            this.velocity.divideScalar(l / maxSpeed);

        }

        this.position.add(this.velocity);
        acceleration.set(0, 0, 0);

    };

    this.repulse = function(target) {

        var distance = this.position.distanceTo(target);

        if (distance < 30) {

            var steer = new THREE.Vector3();

            steer.subVectors(this.position, target);
            steer.multiplyScalar(0.5 / distance);

            acceleration.add(steer);

        }

    };


    this.run = function(boids, obs) {

        if (avoidWalls) {

            vector.set(-width, this.position.y, this.position.z);
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            acceleration.add(vector);

            vector.set(width, this.position.y, this.position.z);
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            acceleration.add(vector);

            vector.set(this.position.x, 0, this.position.z);
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            acceleration.add(vector);

            vector.set(this.position.x, height, this.position.z);
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            acceleration.add(vector);

            vector.set(this.position.x, this.position.y, -depth);
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            acceleration.add(vector);

            vector.set(this.position.x, this.position.y, depth);
            vector = this.avoid(vector);
            vector.multiplyScalar(5);
            acceleration.add(vector);

            if (obs) {
              var ob;
              var sumA = new THREE.Vector3();
              var sumB = new THREE.Vector3();
              for (i = 0; i < obs.length; i++) {
                ob = obs[i];
                ob.geometry.computeBoundingBox();
                this.repulse(sumA.addVectors(ob.geometry.boundingBox.min,ob.position).add(new THREE.Vector3(30, 30, 30)));
                this.repulse(sumB.addVectors(ob.geometry.boundingBox.max, ob.position).add(new THREE.Vector3(-30, -30, -30)));
              }

            }

        if (Math.random() > 0.5) {

            this.flock(boids);

        }

        this.move();

    };


    this.checkBounds = function() {

        if (this.position.x > width)
            this.position.x = -width;
        if (this.position.x < -width)
            this.position.x = width;
        if (this.position.y > height)
            this.position.y = -height;
        if (this.position.y < -height)
            this.position.y = height;
        if (this.position.z > depth)
            this.position.z = -depth;
        if (this.position.z < -depth)
            this.position.z = depth;

        };

}

}
