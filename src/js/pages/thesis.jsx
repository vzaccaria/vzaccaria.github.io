import React from "react";
import _ from "lodash";

/* let { _b, _bem } = require("../react-utils/react-bem").default;*/
let { fetchAsset } = require("../stores/fetcher").default;

export default class Thesis extends React.Component {
  constructor() {
    super();
    this.state = { valid: false };
  }

  componentDidMount() {
    fetchAsset("data/thesis.yaml", { yaml: true }).then(dta => {
      let valid = true;
      let data = dta;
      console.log(dta);
      this.setState({ valid, data });
      return null;
    });
  }

  renderThesis(t) {
    return (
      <div className="thesis" key={t.name}>
        <div className="thesis__name">{t.name}</div>
        <div className="thesis__dkey">Institution:</div> 
        <div className="thesis__dvalue">{t.institution}</div><br/>
        <div className="thesis__dkey">Type:</div> 
        <div className="thesis__dvalue">{t.type}</div> 
        <div className="thesis__description">{_.truncate(t.description, {length: 200})}</div>
        <div className="thesis__dkey">Required skills:</div>
        <div className="thesis__dvalue">{_.join(t.skills, ', ')}</div>
      </div>
    );
  }

  render() {
    if (this.state.valid) {
      return (
        <div className="thesis-page">
          <div className="thesis-page__title">Available topics for a thesis with me</div>
          <div className="thesis-page__list">
            {_.map(this.state.data.topics, this.renderThesis)}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
