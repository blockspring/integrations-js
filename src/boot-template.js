/* eslint-disable no-var,func-names */
(function () {
  var w = window;
  var d = document;
  function boot() {
    var s = d.createElement('script');
    var x = d.getElementsByTagName('script')[0];
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://cdn.integrationsjs.com/dist/{{FILENAME}}';
    x.parentNode.insertBefore(s, x);
  }
  if (d.readyState !== 'loading') {
    boot();
  } else if (w.attachEvent) {
    w.attachEvent('onload', boot);
  } else {
    w.addEventListener('load', boot, false);
  }
}());
