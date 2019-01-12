import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import "./GoogleMaps.css"
 
const Marker = ({ text }) => <div className="pin"></div>;
 
class GoogleMaps extends Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className={this.props.display === "location" ? "d-block" : "d-none"}style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCIoN5wPeAWO7Op9Ta7XYyE3FQAIAThiqg" }}
          defaultCenter={{lat: this.props.lat, lng:this.props.lng}}
          defaultZoom={11}
        >
          <Marker
            lat={this.props.lat}
            lng={this.props.lng}
            text={'Here'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default GoogleMaps;