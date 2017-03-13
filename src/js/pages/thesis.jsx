import React from "react";
import _ from "lodash";
import ReactMarkdown from "react-markdown";
let ShareButton = require("./components/shareButton").default;

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

    if (_.isUndefined(t.available)) {
      return <div />;
    } else {
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
  }

  render() {
    if (this.state.valid) {
      return (
        <div className="thesis-page">
          <div className="thesis-page__title">
            Available thesis projects
          </div>
          <div className="thesis-page__text">
            <ReactMarkdown source={this.state.data.header} />
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

  renderInfo(t, i) {
    return (
      <div className="thesispost_container__post__category">
        <b>{t}: </b> {i}
      </div>
    );
  }
  renderContacts(t) {
    return (
      <div className="thesispost_container__post__category">
        <b>Contacts: </b>
        {_.map(t.contacts, (c, i) => {
          return (
            <span key={i}>
              {!!i && ", "}<a href={`mailto:${c.address}`}>{c.name}</a>
            </span>
          );
        })}
      </div>
    );
  }

  render() {
    if (this.state.valid) {
      let idx = this.props.match.params.id;
      let thesis = this.state.data.topics[idx];
      let info = `${_.capitalize(
        thesis.type
      )} at ${thesis.institution}, ${thesis.address}`;  
      let twitmsg = _.truncate(`Thesis project available: ${thesis.name}`, {length: 70});
      return (
        <div className="thesispost_container">
          <div className="thesispost_container__post__title">{thesis.name}</div>
          <div className="thesispost_container__post__subtitle">
            {this.renderInfo("Info", info)}
            {this.renderInfo("Skills", _.join(thesis.skills, ", "))} 
            {this.renderInfo("Published", thesis.published)}
            {this.renderContacts(thesis)}
            <b>Share this: </b> <div className="share_buttons">
              <ShareButton social="twitter" prefix={twitmsg}/> 
              <ShareButton social="reddit" />
            </div>

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
