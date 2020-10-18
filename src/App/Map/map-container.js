import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";

export class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };

  loadMarkers(markers) {
    const google = this.props.google;
    if (!google) return;

    var bounds = new google.maps.LatLngBounds();
    var loadedMarkers = [];

    setTimeout(() => {
      for (let u in markers) {
        var marker = this.loadMarker(markers[u]);

        if (marker) {
          bounds.extend(marker.getPosition());
          loadedMarkers.push(marker);
        }
      }

      console.log({ loadedMarkers });

      if (loadedMarkers?.length == 1) {
        let center = {
          lat: loadedMarkers[0]?.position.lat(),
          lng: loadedMarkers[0]?.position.lng(),
        };
        console.log({ center });
        this.map.panTo(center);
        setTimeout(() => {
          this.map.setZoom(14);
        }, 200);
      } else if (loadedMarkers?.length) {
        this.map.fitBounds(bounds);
      }

      this.markers = loadedMarkers;
    }, 200);
  }

  clearMarkers = (markers) => {
    console.log("Clearing markers: ", markers);
    if (!markers) return;
    for (let i = 0; i < markers.length; ++i) {
      markers[i].setMap(null);
    }
  };

  loadMarker(x) {
    const google = this.props.google;
    const map = this.map;

    if (
      !x ||
      (!x.latitude && x.latitude !== 0) ||
      (!x.longitude && x.longitude !== 0)
    )
      return null;

    let marker = new google.maps.Marker({
      position: { lat: x.latitude, lng: x.longitude },
      map,
      title: x.title,
    });

    marker.addListener("click", () => this.onMarkerClick(x, marker));

    return marker;
  }

  onLoaded(mapProps, map) {
    this.map = map;
    this.loadMarkers(this.props.markers);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reloadMarkerTs !== this.props.reloadMarkerTs) {
      this.clearMarkers(this.markers);
      this.loadMarkers(this.props.markers);
    }
  }

  render() {
    return (
      <Map
        google={this.props.google}
        style={{ width: "100%", height: "100%", position: "unset" }}
        onReady={this.onLoaded.bind(this)}
        onClick={this.onMapClicked.bind(this)}
      >
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.title}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
})(MapContainer);
