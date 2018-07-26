
import React from "react";
import Tooltip from "rc-tooltip";
import '../../css/tooltip.css';
import ReactMarkdown from "react-markdown";
/* import Calendar from "./components/calendar";*/
let _ = require("lodash");

let $script = require("scriptjs");
let { tmpl, fetchAsset } = require("../stores/fetcher").default;



const renderLinkText = l => {
  let tag = l.tag
    ? <div className="lecture-links__linktag">
        {l.tag}
      </div>
    : "";
  return (
    <a href={tmpl(l.value)}>
      <div className="lecture-links__frame">
        <div className="lecture-links__linktext">
          {l.key}
        </div>
        {tag}
      </div>
    </a>
  );
};

const renderLinkImage = l => {
  return (
    <div className="lecture-links__frame">
      <a href={tmpl(l.value)}>
        <img alt={l.key} className="lecture-links__img" src={l.img} />
      </a>
    </div>
  );
};

function renderLinks(name, data) {
  const renderLink = l => {
    let theLink = !_.isUndefined(l.img)
      ? renderLinkImage(l)
      : renderLinkText(l);
    return (
      <Tooltip key={l.key} placement="top" overlay={l.key}>
        {theLink}
      </Tooltip>
    );
  };
  return (
    <div className="lecture-links">
      <div className="lecture-links__title">
        {name}
      </div>
      <div className="lecture-links__list">
        {_.map(data.links, renderLink)}
      </div>
    </div>
  );
}

export default class Slides extends React.Component {
  constructor() {
    super();
    this.state = { valid: false };
  }

  componentDidMount() {
    fetchAsset("data/infob.yaml", { yaml: true }).then(dta => {
      let valid = true;
      let data = dta;
      this.setState({ valid, data });
      return null;
    });
  }

  componentDidUpdate() {
    renderMJ();
  }

  render() {
    if (this.state.valid) {
      return (
        <div className="teaching-page">
          <div className="teaching-page__title">Informatica B</div>
          <div className="teaching-page__year">
            Anno accademico {this.state.data.info.annoaccademico}
          </div>
          {renderContacts(this.state.data.contacts)}
          {renderMessages("Avvisi importanti", this.state.data.avvisi)}
          {renderLinks("Tutorials e slides", this.state.data)}
          {renderInfo(
            "Informazioni su esame e prove in itinere",
            this.state.data
          )}
        </div>
      );
    } else {
      return <div />;
    }
  }
}
