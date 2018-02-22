# React Mapbox GL JS Example

This example allows you to click on the map and fetch directions from the Mapbox API, and displays
the route line to the location pressed on the map from the Mapbox SF office.

### Install

```
git clone git@github.com:nitaliano/react-mapbox-gl-js-example.git
cd react-mapbox-gl-js-example
npm i
```

### Add access token

Before you run the example, you'll need to add your access token to [`src/index.js`](https://github.com/nitaliano/react-mapbox-gl-js-example/blob/master/src/index.js#L9),
you'll be able to find your [Mapbox access tokens here](https://www.mapbox.com/account/access-tokens).

### Run example

Open up your terminal and run from the root of the project,
this will start a local http server on port 3000, you'll be able to access
the web application by going to `http://localhost:3000` in a web browser that
supports WebGL and React(just use chrome).

```
npm start
```

### Develop

While you have the example application open in chrome and if you wanted to make
changes to the code you can run in a different terminal tab

```
npm run develop
```

the server needs to be running! This command will only
watch client side files and recomplile them.
