import React from "react";
let _ = require("lodash");

let { _b } = require("../../react-utils/react-bem").default;


var Publication = React.createClass({
  render() {
    let b = _.partial(_b, "publication");
    let h = _.partial(_b, "publication__href");

    let renderAuthor = (a, i) => {
      if (a.name === "V. Zaccaria") {
        return <div key={i} className={b("authors__myname")}>{a.name}</div>;
      } else {
        return <div key={i} className={b("authors__name")}>{a.name}</div>;
      }
    };

    let downloadButton = <div />;
    if (!_.isUndefined(this.props.data.url)) {
      downloadButton = (
        <div className={h()}>
          <a href={this.props.data.url}>
            <div className={h("doi")}>
              <i className={`${h("doi__icon-dl")} fa fa-download`} />
            </div>
          </a>
        </div>
      );
    }

    return (
      <div className={b()}>
        <div className={b("title")}>{this.props.data.title}</div>
        <div className={b("authors")}>
          {_.map(this.props.data.author, renderAuthor)}
        </div>
        <div className={b("info")}>
          <div className={b("category", this.props.data.displayAs)}>
            {this.props.data.type}
          </div>
          <div className={b("name")}>
            {this.props.data.smartbooktitle}
          </div>
          <div className={b("date")}>
            {this.props.data.month} {this.props.data.year}
          </div>
          <div className={b("pages")}>
            {this.props.data.pages}
          </div>
          {downloadButton}
        </div>
      </div>
    );
  }
});

export default { Publication };
