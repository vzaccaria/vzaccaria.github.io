import React from "react";
import _ from "lodash";

let { _b, _bem } = require("../react-utils/react-bem").default;
let { fetchIndex } = require("../stores/fetcher").default;

let filter = (list, props) => {
  return _.filter(list, e => {
    if (!_.isUndefined(e.category) && !_.isUndefined(props.match.params)) {
      return e.category === props.match.params.category;
    } else {
      return undefined;
    }
  });
};

let c = _.partial(_b, "post-preview");
let m = _.partial(_b, "post-preview-mobile");

function renderPostTitleMobile(p, i) {
  return (
    <a
      key={i}
      href={`#${p.link}`}
      style={{ cursor: "pointer" }}
      className={m()}
    >
      <div className={m("description")}>
        <div className={m("title")}> {p.title} </div>
        <div className={m("small-date")}> {p.smallDate} </div>
        <div className={m("small-description")}> {p.smallDescription} </div>
      </div>
    </a>
  );
}

function renderPostTitle(p, i) {
  return (
    <a
      key={i}
      href={`#${p.link}`}
      style={{ cursor: "pointer" }}
      className={c()}
    >
      <div className={c("desc-column")}>
        <div className={c("title")}> {p.title} </div>
        <div className={c("subtitle")}>
          <div className={c("date")}>
            <div className={c("date-value")}> {p.formattedDate} </div>
          </div>
        </div>
        <div className={c("description")}>
          <div className={c("description-text")}>
            {p.description ? p.description : "no description"}
          </div>
        </div>
      </div>
    </a>
  );
}

export default class BlogIndex extends React.Component {
  constructor() {
    super();
    this.state = { valid: false };
  }

  componentDidMount() {
    fetchIndex().then(index => {
      let valid = true;
      index = filter(index, this.props);
      this.setState({ index, valid });
    });
  }

  componentWillReceiveProps(props) {
    fetchIndex().then(index => {
      index = filter(index, props);
      this.setState({ index });
    });
  }

  render() {
    if (this.state.valid) {
      return (
        <div className="posts">
          {_.map(this.state.index, renderPostTitleMobile)}
          {_.map(this.state.index, renderPostTitle)}
        </div>
      );
    } else {
      return <div />;
    }
  }
}
