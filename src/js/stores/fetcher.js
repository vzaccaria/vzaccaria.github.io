import agent from '../react-utils/agent'
import $b from 'bluebird'
import _ from 'lodash'
const debug = require('../react-utils/debug')(__filename);
let YAML = require('js-yaml');


let siteData = require('site-config')
let {
    indexurl, baseurl
} = siteData


let fetcher = () => {

    function fetchAsset(name, opts) {
        return agent('GET', `${baseurl}/${name}`).then((r) => {
            if (_.get(opts, "yaml", false)) {
                return YAML.safeLoad(r.text);
            } else {
                return r.text
            }
        })
    }

    function fetchIndex() {
        return agent('GET', indexurl).then((r) => {
            return r.body
        })
    }

    function fetchPostMarkup(category, {
        year, month, day, title
    }) {
        return fetchAsset(`${category}/${year}/${month}/${day}/${title}`)
    }

    function fetchPost(category, {
        year, month, day, title
    }) {
        return fetchIndex().then((postList) => {
            let link = `/${category}/${year}/${month}/${day}/${title}`;
            debug(link)
            let postData = _.head(_.filter(postList, (it) => {
                return it.link === link
            }));
            debug(postData)
            return fetchPostMarkup(category, {
                year, month, day, title
            }).then((postMarkup) => {
                postData.markup = postMarkup;
                return postData
            })
        })
    }

    let tmpl = function(string) {
        return _.template(string)(siteData)
    }

    return {
        fetchPost, fetchIndex, tmpl, fetchAsset
    }

}


module.exports = fetcher()
