import agent from "../react-utils/agent";
import _ from "lodash";
let YAML = require("js-yaml");

let siteData = require("../../data/site.json");
let {
  indexurl,
  baseurl
} = siteData;

function fetchAsset(name, opts) {
  return agent("GET", `${baseurl}/${name}`).then(r => {
    console.log(r);
    if (_.get(opts, "yaml", false)) {
      return YAML.safeLoad(r.text);
    } else {
      return r.text;
    }
  });
}

function fetchIndex() {
  return agent("GET-JSON", indexurl);
}

function fetchPostMarkup(
  category,
  {
    year,
    month,
    day,
    title
  }
) {
  return fetchAsset(`${category}/${year}/${month}/${day}/${title}`);
}

function fetchPost(
  category,
  {
    year,
    month,
    day,
    title
  }
) {
  return fetchIndex().then(postList => {
    let link = `/${category}/${year}/${month}/${day}/${title}`;
    // debug(link);
    let postData = _.head(
      _.filter(postList, it => {
        return it.link === link;
      })
    );
    // debug(postData);
    return fetchPostMarkup(category, {
      year,
      month,
      day,
      title
    }).then(postMarkup => {
      postData.markup = postMarkup;
      return postData;
    });
  });
}

let tmpl = function(string) {
  return _.template(string)(siteData);
};

export default { fetchPost, fetchIndex, tmpl, fetchAsset };
