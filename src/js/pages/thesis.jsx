import React from "react";
import _ from "lodash";
import ReactMarkdown from "react-markdown";

/* let { _b, _bem } = require("../react-utils/react-bem").default;*/
let { fetchAsset } = require("../stores/fetcher").default;

class ThesisIndex extends React.Component {
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

  renderThesis(t, i) {
    let handler = () => {
      console.log("Hei!");
      window.location.href = `#/thesis/${i}`;
    };

    return (
      <div
        className="thesis"
        key={t.name}
        style={{ cursor: "pointer" }}
        onClick={handler}
      >
        <div className="thesis__name">{t.name}</div>
        <div className="thesis__dkey">Institution: </div>
        <div className="thesis__dvalue">{t.institution}</div><br />
        <div className="thesis__dkey">Type: </div>
        <div className="thesis__dvalue">{t.type}</div>
        <div className="thesis__description">
          {_.truncate(t.description, { length: 200 })}
        </div>
        <div className="thesis__dkey">Required skills: </div>
        <div className="thesis__dvalue">{_.join(t.skills, ", ")}</div>
      </div>
    );
  }

  render() {
    if (this.state.valid) {
      return (
        <div className="thesis-page">
          <div className="thesis-page__title">
            Available topics for a thesis
          </div>
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

class ThesisPage extends React.Component {
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
      <div className="thesis" key={t.name} style={{ cursor: "pointer" }}>
        <div className="thesis__name">{t.name}</div>
        <div className="thesis__dkey">Institution: </div>
        <div className="thesis__dvalue">{t.institution}</div><br />
        <div className="thesis__dkey">Type: </div>
        <div className="thesis__dvalue">{t.type}</div>
        <div className="thesis__description">
          {_.truncate(t.description, { length: 200 })}
        </div>
        <div className="thesis__dkey">Required skills: </div>
        <div className="thesis__dvalue">{_.join(t.skills, ", ")}</div>
      </div>
    );
  }

  renderTags(thesis) {
    return _.map(thesis.skills, s => (
      <div className="thesispost_container__post__tag" key={s}>
        {s}
      </div>
    ));
  }

  render() {
    if (this.state.valid) {
      let idx = this.props.match.params.id;
      let thesis = this.state.data.topics[idx];
      console.log(thesis);
      return (
        <div className="thesispost_container">
          <div className="thesispost_container__post__title">{thesis.name}</div>
          <div className="thesispost_container__post__subtitle">
            <div className="thesispost_container__post__category">
              Type: {thesis.type}
            </div>
            <div className="thesispost_container__post__tags" />
            {this.renderTags(thesis)}
          </div>
          <div className="thesispost_text">
              <ReactMarkdown source={thesis.description} />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default { ThesisIndex, ThesisPage };
