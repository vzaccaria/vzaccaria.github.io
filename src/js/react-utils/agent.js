let _ = require("lodash");

let memoFetchText = _.memoize(url => {
  return fetch(url).then(r => r.text());
});

let memoFetchJson = _.memoize(url => {
    return fetch(url).then(r => r.json());
});

/* global fetch */
function agent(action, url) {
  if (action === "GET") {
    return memoFetchText(url).then(r => {
      return { text: r };
    });
  } else if (action === "GET-JSON") {
    return memoFetchJson(url);
  }
}

export default agent;
