import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';

class Map extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    center: PropTypes.array,
    zoom: PropTypes.number,

    onLoad: PropTypes.func,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 14,
  };

  constructor (props) {
    super(props);

    this.state = {
      map: null,
    };
  }

  componentDidMount () {
    const map = new mapboxgl.Map({
      container: this.props.id,
      style: this.props.style,
      center: this.props.center,
      zoom: this.props.zoom,
    });
    this.setState({ map: map });

    // register events
    map.on('load', this.props.onLoad);
    map.on('click', this.props.onClick);
  }

  shouldComponentUpdate () {
    return false;
  }

  addSource (sourceID, geoJSON) {
    const layer = this.state.map.getSource(sourceID);

    if (layer) {
      this.updateSource(sourceID, geoJSON);
      return;
    }

    this.state.map.addSource(sourceID, {
      type: 'geojson',
      data: geoJSON,
    });
  }

  addLayer (layer, belowLayerID) {
    this.state.map.addLayer(layer, belowLayerID);
  }

  updateSource (sourceID, geoJSON) {
    this.state.map.getSource(sourceID).setData(geoJSON);
  }

  render () {
    return (
      <div id={this.props.id} className="map-container"></div>
    );
  }
}

export default Map;
