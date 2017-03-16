import React from "react";
import _ from "lodash";
import hjs from "../react-utils/hsjs.js";
import jq from "jquery";
import moment from "moment";
import ReactDisqusThread from "react-disqus-thread";
let $script = require("scriptjs");

import { sourceurl } from "../../data/site.json";

let { _b, _bem } = require("../react-utils/react-bem").default;
let { fetchPost } = require("../stores/fetcher").default;
const debug = require("../react-utils/debug").default(__filename);
let ShareButton = require("./components/shareButton").default;

function getGitHubUrl(postData, title) {
  let date = moment(postData.date);
  date = date.format("YYYY-MM-DD");
  title = title.replace(/html$/, "md");
  postData.origurl = `${sourceurl}/${date}-${title}`;
  return postData;
}

let subTitle = postData => {
  let c = _.partial(_b, "post_container__post");
  debug(postData.tags.length);
  let show = _.some(postData.tags, t => t !== "");
  let tags = show
    ? <div className={c("tags")}>
        <i className="fa fa-tags" />
        <div className={c("category_value")}>
          {_.map(postData.tags, (t, i) => (
            <div key={i} className={c("tag")}> {t} </div>
          ))}
          {" "}
        </div>
      </div>
    : null;
  return (
    <div className={"post_container__post__subtitle"}>
      <div className={c("date")}>
        <i className="fa fa-calendar-o" />
        <div className={c("date_value")}> {postData.formattedDate} </div>
      </div>
      <div className={c("category")}>
        <i className="fa fa-flag-o" />
        <div className={c("category_value")}> {postData.category} </div>
      </div>
      {tags}
      <div className="share_buttons">
        <ShareButton social="twitter" />
        <ShareButton social="reddit" />
        <ShareButton social="github" origLink={postData.origurl} />
      </div>
    </div>
  );
};

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateMathJax() {
        $script( 
          "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_SVG",
          () => {
            MathJax.Hub.Config({
              tex2jax: { inlineMath: [["$", "$"], ["\\(", "\\)"]] }
            });
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
          }
        );
    
}

export default class BlogPage extends React.Component {
  constructor() {
    super();
    this.state = { valid: false };
  }

  componentDidMount(root) {
    hjs.configure({
      useBR: false,
      languages: ["c", "matlab", "cpp"]
    });
    fetchPost(this.props.match.params.category, this.props.match.params)
      .then(postData => {
        let valid = true;
        postData = getGitHubUrl(postData, this.props.match.params.title);
        this.setState({ postData, valid });
      })
      .then(updateMathJax);
  }

  componentWillReceiveProps(props) {
    fetchPost(props.match.params.category, props.match.params)
      .then(postData => {
        let valid = true;
        postData = getGitHubUrl(postData, props.match.params.title);
        this.setState({ postData, valid });
      })
      .then(updateMathJax); }

  componentDidUpdate(props, state, root) {
    debug("component did update");
    jq("code.language-octave")
      .removeClass("language-octave")
      .addClass("matlab");
    jq("code.language-c").removeClass("language-c").addClass("c");
    jq("pre code").each((i, b) => {
      hjs.highlightBlock(b);
    });
    updateMathJax();
  }

  render() {
    if (this.state.valid) {
      let c = _.partial(_b, "post_container");
      return (
        <div className={c()}>
          <div className={c("post__title")}>
            {" "}{capitaliseFirstLetter(this.state.postData.title)}{" "}
          </div>
          {subTitle(this.state.postData)}
          <div className="post_text">
            <div
              dangerouslySetInnerHTML={{ __html: this.state.postData.markup }}
            />
          </div>
          <div className={c("comments")}>
              <ReactDisqusThread shortname="vittoriozaccaria" />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}
