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
    docViewPortal = new fmaDocViewPortal();

  /*
  * base on Codrops
  * http://tympanus.net/codrops
  *
  */
  function fmaScrlr(el, options) {
    this.el = el;
    this.options = fmaHelper.extend(this.defaults, options);
    //console.log(fmaHelper.extend);
    this._init();
  }

  fmaScrlr.prototype = {
    defaults : {
      objectViewedPercentage : 0.2 // be used as argument of the "p" parameter of "inViewport" function
    },
    _init : function() {
      if (Modernizr.touch) return; //disable this effect if the web is surfed by an touchable device
      /*
      * the slice() method returns a shallow copy of a portion of an array into a new array object.
      * the call() method calls a function with a given "this" value and arguments provided individually.
      * Document.querySelectorAll() returns a list of the elements within the document that match the specified group of selectors. The object returned is a NodeList
      */
      this.sections = Array.prototype.slice.call(this.el.querySelectorAll('.fma-scrlr-section')); // query all sections that are considered in effect
      this.didScroll = false;

      var self = this;
      // the sections already shown...
      /*
      * the forEach() method executes a provided function once per array element.
      * forEach() executes the provided callback once for each element present in the array in ascending order. It is not invoked for indexes that have been deleted or elided. However, it is executed for elements that are present and have the value undefined. callback is invoked with three arguments: the element value, the element index, the array being traversed.
      * "el" : the element value
      * "i" : the element index
      */
      this.sections.forEach(function(el, i) { // go through each section, detect sections that are not being in viewport, if so, add class 'fma-scrlr-init' to these
      /*! old version
        if (!docViewPortal.inViewport(el)) {
          fmaHelper.classie.add(el, 'fma-scrlr-init')
        }
      */
        fmaHelper.classie.add(el, 'fma-scrlr-init')
      });


      var
        scrollHandler = function() {  // declare scroll event handler
          if (!self.didScroll) {  // determines event hanlder is performing or has been completed
            self.didScroll = true;  // marks something that is being in action to handle the event
            setTimeout(function() {
              self._scrollPage(); // delay the handler action a little bit if needed
            });
          }
        },
        resizeHandler = function() {  // declare resize event handler
          function delayed() {
            self._scrollPage();
            self.resizeTimeout = null;
          }
          if (self.resizeTimeout) {
            clearTimeout(self.resizeTimeout);
          }
          self.resizeTimeout = setTimeout(delayed, 200);
        };
      /*
      * the EventTarget.addEventListener() method register the specified listener on the EventTarget it's called on. The event target may be an Element in a document, the Document itself, a Window, or any orther object that supports events (such as XMLHttpRequest)
      * syntax: target.addEventListener(type, listener[, useCapture]);
      * type: a string representing the event type to listen on
      * listener: the object that receives a notification when an event of the specified type occurs. This must be an object implementing the EventListener interface, or simply a JavaScript function.
      * useCapture: if true, useCapture indicates that the user wishes to initiate capture. After initiating capture, all events of the specified type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
      */
      window.addEventListener('scroll', scrollHandler, false);
      window.addEventListener('resize', resizeHandler, false);
    },
    _scrollPage : function() {
      var self = this;
      this.sections.forEach(function(el, i) { // goes through each section, detect sections that are being in viewport. If so, animate it! If not, add class init, remove class animate
        if (docViewPortal.inViewport(el, self.options.objectViewedPercentage)) {
          fmaHelper.classie.add(el, 'fma-scrlr-animate');
        } else {
          // this add class init if it doesn't have it. This will ensure that the items initially in the viewport will also animate on scoll
          fmaHelper.classie.add(el, 'fma-scrlr-init');
          fmaHelper.classie.remove(el, 'fma-scrlr-animate');
        }
      });
      this.didScroll = false; // flag of event handler's action completed status
    }
  }

  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD (Asynchronous Module Definition)
    define(fmaScrlr);
  } else {
    // add to global namespace
    window.fmaScrlr = fmaScrlr;
  }
})(window, undefined);
