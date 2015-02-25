/*
* fmaDocViewPortal.js v0.1
* http://f-ma.github.io
*
* Document Viewable Region Management
*/
;(function(window, undefined) { //namespacing
  // get the element that is the root element of the document
  rootEl = fmaHelper.rootElement;

  function fmaDocViewPortal() {

  }

  fmaDocViewPortal.prototype = {
    // declare default options
    defaults : {

    },

    // get Viewport Height: the height of the browser window (the browser viewport, not including toolbars and scrollbar).
    getViewport : function() {
      /*
      * window.innerHeight: for IE >=9 , Chrome, Firefox, Opera, and Safari.
      * rootEl.clientHeight: IE < 9.
      */
      var
      h = window.innerHeight < rootEl.clientHeight ? window.innerHeight : rootEl.clientHeight,
      w = window.innerWidth < rootEl.clientWidth ? window.innerWidth : rootEl.clientWidth;
      return {
        height: h,
        width: w
      }
    },

    /*
    * get the pixels the current document has been scrolled vertically
    * for IE >=9, Chrome, Firefox, Opera, and Safari: use "window.pageYOffset"
    * for IE < 9: use "document.documentElement.scrollTop"
    */
    getScrollInfo : function() {
      var
      s = window.pageYOffset || rootEl.scrollTop,
      v = s + this.getViewport().height;
      return {
        scrolled : s,
        viewed : v
      }
    },

    /*
    * http://stackoverflow.com/a/5598797/989439
    *
    * traverse the "offsetParent" up to the top level of the DOM,
    * then sum gradually and retrieve the "offsetTop": the distance (pixel) of the "el" element RELATIVELY to the top of the root element.
    *
    * the "isNaN()" function determines whether a value is an illegal number (Not-a-Number). This function returns true if value is NaN, and false if not.
    * the "element.offsetTop" read-only property returns the distance (pixel) of the current element RELATIVELY (eg: "position: relative") to the top of the "offsetParent" node.
    * the "element.offsetParent" read-only property returns a REFERENCE to the object which is the CLOSEST positioned containing element. If the element is non-positioned, the nearest table cell or root element is the offsetParent.
    */
    getElementOffsetRoot : function(el) {
      // initing
      var
      offsetTop = 0,
      offsetLeft = 0,
      offsetHeight = el.offsetHeight;
      do {
        offsetTop += !isNaN(el.offsetTop) ? el.offsetTop : 0 ;
        offsetLeft += !isNaN(el.offsetLeft) ? el.offsetTop : 0 ;
      } while (el = el.offsetParent); // loop until reach the top level of DOM (offsetParent is Null)

      return {
        top: offsetTop,
        left: offsetLeft,
        bottom: offsetTop + offsetHeight
      }
    },

    /*
    * check if whether the "el" element being in the viewport
    * the element.offsetHeight (offsetWidth) read-only property is the height (width) of the lement including vertical (horizontal) padding and borders (not including margin), in pixels, as an integer.
    * el: the element
    * p: defines how much of the appearing item has to be visible in order to trigger an event (in percentage)
    */
    inViewport : function(el, p) {
      var
        elHeight = el.offsetHeight,
        elOffsetRoot = this.getElementOffsetRoot(el);
        scrollInfo = this.getScrollInfo();
      /*
      * if 0, the element is considered in the viewport as soon as it enters (not entirely).
      * if 1, the element is considered in the viewport only when it's fully inside (entirely).
      */
      p = p || 0;

      return (elOffsetRoot.top + elHeight * p) <= scrollInfo.viewed && (elOffsetRoot.bottom) >= scrollInfo.scrolled;
    }
  }
  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD (Asynchronous Module Definition)
    define(fmaDocViewPortal);
  } else {
    // add to global namespace
    window.fmaDocViewPortal = fmaDocViewPortal;
  }
})(window, undefined);
