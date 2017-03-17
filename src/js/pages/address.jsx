import React from "react";
import _ from "lodash";
import { _bem } from "../react-utils/react-bem";
import MapThis from "./components/mapthis";

let { statefulComponent } = require("./components/stateful").default;
let { tmpl, fetchAsset } = require("../stores/fetcher").default;

function renderContacts(contacts) {
  let c = _.map(contacts, (it, key) => {
    if (it.link) {
      return (
        <div key={key} className="contacts__detail">
          <div className="contacts__key"> {it.key} </div>
          <div className="contacts__value">
            {" "}<a href={tmpl(it.link)}>{it.value}</a>{" "}
          </div>
        </div>
      );
    } else {
      return (
        <div key={key} className="contacts__detail">
          <div className="contacts__key"> {it.key} </div>
          <div className="contacts__value"> {it.value} </div>
        </div>
      );
    }
  });
  return (
    <div className="contacts">
      {c}
    </div>
  );
}

export default class AddressPage extends statefulComponent {
  render() {
    if (this.state.valid) {
      let address = [
        { key: "Name", value: this.state.data.basics.name },
        { key: "Ufficio", value: this.state.data.basics.office.department },
        { key: "Street", value: this.state.data.basics.office.address },
        { key: "City", value: this.state.data.basics.office.city },
        { key: "Telephone", value: this.state.data.basics.phone },
        { key: "Email", value: this.state.data.basics.email }
      ];
      return (
        <div className="bio-container">
          <div className="address">
            <div className="address__title"> Address </div>
            {renderContacts(address)}
            <MapThis
              className="address__map"
              lat={this.state.data.basics.office.geo.lat}
              long={this.state.data.basics.office.geo.long}
            />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
