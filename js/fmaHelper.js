;(function(window, undefined) {
  "use strict";
  /*
  * example of using: this.options = extend(this.defaults, options);
  */
  function extend(ini, add) {
    for (var key in add) {
      if (add.hasOwnProperty(key)) {
        ini[key] = add[key];
      }
    }
    return ini;
  }

  /*
  * classie - class helper functions
  * from bonzo https://github.com/ded/bonzo
  *
  * classie.has(el, 'my-class') -> true/false
  * classie.add(el, 'my-new-class')
  * classie.remove(elem, 'my-unwanted-class')
  * classie.toggle(elem, 'my-class')
  */

  function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  /*
  * classList returns a token list of the class attribute of the element.
  * classList is a convenient alternative to accessing an element's list of classes as a space-delimited string via element.className. It contains the following methods:
  * add - Adds a class to an element's list of classes. If class already exists in the element's list of classes, it will not add the class again.
  * remove - removes a class from an element's list of classes. If class does not exist in the element's list of classes, it will not throw an error or exception.
  * toggle - Toggles the existence of a class in an element's list of classes
  * contains - checks if an element's list of classes contains a specific class
  *
  */

  var hasClass, addClass, removeClass;
  if ('classList' in document.documentElement) {
    hasClass = function(el, c) {
      return el.classList.contains(c);
    };
    addClass = function(el, c) {
      elem.classList.add(c);
    };
    removeClass = function() {
      elem.classList.remove(c);
    }
  } else {
    hasClass = function(el, c) {
      return classReg(c).test(el.className);
    };
    addClass = function(el, c) {
      if (!hasClass(el, c)) {
        el.className = el.className + ' ' + c;
      }
    };
    removeClass = function(el, c) {
      el.className = el.className.replace(classReg(c), ' ');
    }
  }
  function toggleClass(el, c) {
    var fn = hasClass(el, c) ? removeClass : addClass;
    fn(el, c);
  }

  var fmaHelper = {
    rootElement: window.document.documentElement,
    extend : extend,
    classie : {
      // full names
      hasClass : hasClass,
      addClass : addClass,
      removeClass : removeClass,
      toggleClass: toggleClass,
      // short names
      has : hasClass,
      add : addClass,
      remove: removeClass,
      toggle: toggleClass
    }
  }
  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD (Asynchronous Module Definition)
    define(fmaHelper);
  } else {
    // add to global namespacing
    window.fmaHelper = fmaHelper;
  }
})(window, undefined);
