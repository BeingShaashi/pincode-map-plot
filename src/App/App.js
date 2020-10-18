import React, { Component } from "react";

import postalCodes from "../data/postal-codes.json";
import MapContainer from "./Map/map-container";
import SearchBox from "./SearchBox";
import Table from "./Table";

class App extends Component {
  postalCodes = postalCodes?.map((x) => ({ ...x, title: x.postalCode }));

  state = {
    data: this.postalCodes,
    reloadMarkerTs: Date.now(),
  };

  handleSearch(v) {
    try {
      let filtered = this.postalCodes;

      if (v) {
        filtered = this.postalCodes.filter((x) => x.postalCode?.match(v));
      }

      this.setState({ data: filtered, reloadMarkerTs: Date.now() });
    } catch (e) {
      console.warn(e);
    }
  }

  render() {
    const {
      state: { data, reloadMarkerTs },
    } = this;

    return (
      <div className="App">
        <div className="container1">
          <div className="header1">
            <h3>Postal Codes</h3>
            <div className="searchbox">
              <SearchBox onChange={this.handleSearch.bind(this)} x={90} />
            </div>
          </div>

          <div className="container2">
            <div className="table-wrapper">
              <Table data={data} />
            </div>

            <div className="map-wrapper">
              <MapContainer
                style={{ width: "100%", height: "100%" }}
                markers={data}
                reloadMarkerTs={reloadMarkerTs}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
