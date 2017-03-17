var hljs = require('highlight.js/lib/highlight');

hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('haskell', require('highlight.js/lib/languages/haskell'));
hljs.registerLanguage('matlab', require('highlight.js/lib/languages/matlab'));
hljs.registerLanguage('maxima', require('highlight.js/lib/languages/maxima'));

module.exports = hljs;
