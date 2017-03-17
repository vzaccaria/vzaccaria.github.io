/* global fetch */
function agent(action, url) {
  if (action === "GET") {
    return fetch(url).then(r => r.text()).then(r => {
      return { text: r };
    });
  } else if(action === "GET-JSON") {
      return fetch(url).then(r => r.json());
  }
}

export default agent;
