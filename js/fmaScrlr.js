/*
 * fmaScrlr.js v0.1
 * http://f-ma.github.io
 *
 */
;(function(window, undefined) { //namespacing
  /* use javascript strict mode */
  "use strict";

  var
    rootEl = fmaHelper.rootElement,
    docViewPortal = new fmaDocviewPortal();

  //get View

  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD (Asynchronous Module Definition)
    define(fmaScrlr);
  } else {
    // add to global namespace
    window.fmaScrlr = fmaScrlr;
  }
})(window, undefined);
