import React from "react";
import ReactMarkdown from "react-markdown";
import { getTables } from "mdtable2json";
let _ = require("lodash");

let { processData } = require("../react-utils/normalize-pubs").default;
let { statefulComponent } = require("./components/stateful").default;
let { tmpl, fetchAsset } = require("../stores/fetcher").default;
let { _b, _bem } = require("../react-utils/react-bem").default;
let { Publication } = require("./components/publication.jsx").default;

var biblioJson = _.map(
  require("../../../data/bibliov2.json").records,
  processData
);

biblioJson = _.sortBy(biblioJson, x => x.timestamp * -1);

class researchPage extends statefulComponent {
  render() {
    let p = _.partial(_b, "publications");
    let s = _.partial(_b, "statement");

    if (this.state.valid) {
      let research_achievements = _.flatten(
        _.map(this.state.data.work.previous, "highlights")
      );
      research_achievements = _.map(research_achievements, r => `* ${r}`).join(
        "\n"
      );
      return (
        <div className={p()}>
          <div className={s()}>
            <div className={s("title")}>Current research</div>
            <div className={s("summary")}>
              <ReactMarkdown
                source={this.state.data.research.currentGoals.short}
              >
                {" "}
              </ReactMarkdown>
            </div>
          </div>

          <div className={s()}>
            <div className={s("title")}>Past research and achievements</div>
            <div className={s("summary")}>
              <ReactMarkdown source={research_achievements} />
            </div>
          </div>

          <div className={p("header")}>Publications</div>
          <div className={p("container")}>
            {" "}
            {_.map(biblioJson, (it, k) => {
              return (
                <Publication data={it} key={k}>
                  {" "}
                </Publication>
              );
            })}{" "}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default { researchPage };
