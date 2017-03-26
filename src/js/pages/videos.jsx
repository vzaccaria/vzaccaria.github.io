import React from "react";
let _ = require("lodash");
import ReactMarkdown from "react-markdown";

let { statefulComponent } = require("./components/stateful").default;
let { _b, _bem } = require("../react-utils/react-bem").default;

class videosPage extends statefulComponent {
  renderVideo(p, k) {
    let bem = _.partial(_bem, "video");
    return (
      <div key={k} {...bem()} style={{ cursor: "pointer" }}>
        <iframe {...bem("iframe")} src={p.link} />
        <div {...bem("data")}>
          <div {...bem("title")}> {p.title} </div>
          <div {...bem("recorded-on")}> {p.recordedOn} </div>
          <div {...bem("description")}>
            <ReactMarkdown source={p.description} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.valid) {
      let bem = _.partial(_bem, "videos-page");
      return (
        <div {...bem()}>
          <div {...bem("title")}> Institutional videos </div>
          <div {...bem("video-list")}>
            {_.map(this.state.data.research.videos, this.renderVideo)}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default { videosPage };
