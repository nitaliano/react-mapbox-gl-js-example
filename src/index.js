import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import MapboxClient from 'mapbox';
import * as turfHelpers from '@turf/helpers';

import Map from './Map';

mapboxgl.accessToken = '<Enter access token here>';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      origin: [-122.399876, 37.788737],
      destination: [],
      mapboxClient: new MapboxClient(mapboxgl.accessToken),
    }

    this.onMapLoad = this.onMapLoad.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  onMapLoad () {
    this._map.addSource('origin-source', {
      type: 'Point',
      coordinates: this.state.origin,
    });

    this._map.addLayer({
      id: 'origin-layer',
      type: 'circle',
      source: 'origin-source',
      paint: {
        'circle-radius': 10,
        'circle-color': 'blue',
        'circle-stroke-width': 2,
        'circle-stroke-color': 'white',
      },
    });
  }

  onMapClick (e) {
    const dest = [e.lngLat.lng, e.lngLat.lat];

    if (!this.state.destination.length) {
      this._map.addSource('destination-source', turfHelpers.point(dest));
      this._map.addSource('directions-source', turfHelpers.lineString([[0,0], [0, 0]]));

      this._map.addLayer({
        id: 'destination-layer',
        type: 'circle',
        source: 'destination-source',
        paint: {
          'circle-radius': 10,
          'circle-color': 'red',
          'circle-stroke-width': 2,
          'circle-stroke-color': 'white',
        },
      });

      this._map.addLayer({
        id: 'directions-layer',
        type: 'line',
        source: 'directions-source',
        paint: {
          'line-width': 2,
          'line-color': 'black',
        }
      }, 'origin-layer');
    } else {
      this._map.updateSource('destination-source', turfHelpers.point(dest));
    }

    this.getDirections(dest);
    this.setState({ destination: dest });
  }

  async getDirections (dest) {
    try {
      const res = await this.state.mapboxClient.getDirections([
        { latitude: this.state.origin[1], longitude: this.state.origin[0] },
        { latitude: dest[1], longitude: dest[0] },
      ], { profile: 'driving', alternatives: false });
      this._map.updateSource('directions-source', res.entity.routes[0].geometry);
    } catch (e) {
      console.log(e);
    }
    return Promise.resolve();
  }

  render () {
    return (
      <div id="app-content">
        <Map
          id='map-example'
          ref={c => this._map = c}
          center={this.state.origin}
          onLoad={this.onMapLoad}
          onClick={this.onMapClick} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
