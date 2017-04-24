# Project5611

### To Run (suggestion):

I like to use http-server from npm. If you  don't already have this installed
(and have npm), in the command line run:

```
$ npm install http-server -g
```

Once this installs you can navigate to the root of the project and run

```
$ http-server -c-1
```

to start a local dev server. You can then navigate to localhost:8080 or
whichever other local ports it gives you as options after running the above
command. Just make sure you're running the server in the root of the project or
else including three.js in the html will make your browser unhappy. You can then
debug using Chrome's debugging tools which is nice.

I've found the above method the easiest way to develop with THREE.js and WebGL.
Obviously if you have another way which is preferred, by all means do it that
way.

### Structure

The three.js library is located in the `/build` folder along with a few other
useful packages provided by the library. If we find some pre-built packages we
want to include, I would just stick them here. There are a bunch of examples at
https://threejs.org/examples/ and the code for the examples is located in the
[github](https://github.com/mrdoob/three.js/) for the library.

Unless there are strong opinions against it, we can just stick all of the code
we write in the `/src` folder. I've included an html file with a cube to just
give us a starting canvas.

### Workflow

I'll most likely just start a branch for whatever small thing I'm working on and
then merge it when I think it might become useful. I'm not super picky about
this though. Go ahead and mess around on master if it suits you and we can clean
up anything that breaks. 
