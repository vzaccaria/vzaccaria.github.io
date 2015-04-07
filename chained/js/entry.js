(function(){
  var explain;
  console.log("Yup! lurking at the console, ah?");
  explain = function(selector, content, message){
    var theSelector;
    theSelector = selector + ":contains(" + content + ")";
    $(theSelector).css('text-decoration', 'underline');
    return $(theSelector).each(function(){
      return (function(content){
        return new Opentip($(this), message, {
          delay: 0.01,
          style: 'dark'
        });
      }.call(this, content));
    });
  };
  $(document).ready(function(){
    return $('#main-content').load('html/Readme.html', function(){
      $('pre').addClass('prettyprint');
      $('hr').addClass('ui section divider');
      prettyPrint();
      explain('span.kwd', 'get', 'from jQuery - gets implicitly the address');
      explain('span.pln', 'filter', 'from underscore - gets implicitly the data to filter');
      explain('span.pln', 'log', 'from console - prints data out');
      return explain('span.kwd', 'using', 'expands the scope of "Chained" to include a library');
    });
  });
}).call(this);
