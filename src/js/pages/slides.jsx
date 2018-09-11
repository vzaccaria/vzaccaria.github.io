import React from "react";
import Tooltip from "rc-tooltip";
import "../../css/tooltip.css";
import ReactMarkdown from "react-markdown";
/* import Calendar from "./components/calendar";*/
let _ = require("lodash");

let $script = require("scriptjs");
let { fetchAsset } = require("../stores/fetcher").default;

const renderLinkText = l => {
  let tag = l.tag ? <div className="lecture-links__linktag">{l.tag}</div> : "";
  return (
    <a href={l.value}>
      <div className="lecture-links__frame">
        <div className="lecture-links__linktext">{l.key}</div>
        {tag}
      </div>
    </a>
  );
};

const renderLinkImage = (l, root) => {
  return (
    <div className="lecture-links__frame">
      <a href={`deposit/slides/${root}/${l.value}`}>
        <img
          alt={l.key}
          className="lecture-links__img"
          src={`deposit/slides/${root}/${l.img}`}
        />
      </a>
    </div>
  );
};

function renderSlideSet(s) {
  const renderLink = l => {
    if (!_.isUndefined(l.slide)) {
      l.img = `${l.slide}.png`;
      l.value = `${l.slide}.pdf`;
    } else {
      if (!_.isUndefined(l.hslide)) {
        l.value = `deposit/slides/${s.id}/${l.hslide}`;
      }
    }

    let theLink = !_.isUndefined(l.img)
      ? renderLinkImage(l, s.id)
      : renderLinkText(l);
    return (
      <Tooltip key={l.key} placement="top" overlay={l.key}>
        {theLink}
      </Tooltip>
    );
  };
  return (
    <div className="slides-page">
      <div className="slides-page__title">{s.name}</div>
      <div className="slides-page__year">{s.dates}</div>/
      <div className="slides-page__institution">{s.institution}</div>
      <div className="slides-page__description">{s.description}</div>
      {_.map(s.slides, renderLink)}
    </div>
  );
}

export default class Slides extends React.Component {
  constructor() {
    super();
    this.state = { valid: false };
  }

  componentDidMount() {
    fetchAsset("data/slides.yaml", { yaml: true }).then(dta => {
      let valid = true;
      let data = dta;
      this.setState({ valid, data });
      return null;
    });
  }

  componentDidUpdate() {}

  render() {
    if (this.state.valid) {
      console.log(this.state.data);
      return <div>{_.map(this.state.data, renderSlideSet)} </div>;
    } else {
      return <div />;
    }
  }
}
