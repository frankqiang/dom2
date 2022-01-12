// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"ZC2/":[function(require,module,exports) {
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

window.jQuery = function (selectorOrArray) {
    var element = void 0;
    if (typeof selectorOrArray === "string") {
        element = document.querySelectorAll(selectorOrArray);
    } else if (selectorOrArray instanceof Array) {
        element = selectorOrArray;
    }
    return {
        //返回的这个对象统称为API
        // 这里的addClass和外部element变量形成了闭包

        addClass: function addClass(className) {
            for (var i = 0; i < element.length; i++) {
                element[i].classList.add(className);
            }
            return this; //调用addClass()的对象就是API，所以再把API返回，就可以链式操作了
        },
        each: function each(fn) {
            for (var i = 0; i < element.length; i++) {
                fn.call(null, element[i]);
            }
            return this;
        },
        parent: function parent() {
            var array = [];
            this.each(function (node) {
                array.push(node.parentNode);
            });
            return jQuery(array);
        },
        print: function print() {
            console.log(element);
        },
        children: function children() {
            var array = [];
            this.each(function (node) {
                array.push.apply(array, _toConsumableArray(node.children)); //node.children是一个数组，...扩展运算符，可以把数组的每个元素拆分出来
            });
            return jQuery(array);
        },
        find: function find(selector) {
            var array = [];
            for (var i = 0; i < element.length; i++) {
                //把获得元素连接起来
                var newElements = Array.from(element[i].querySelectorAll(selector));
                array = array.concat(newElements);
            }
            array.oldApi = this; //this指的是前一个对象调用jQury()返回的API，相当于上一个API
            return jQuery(array); //把当前array的引用赋值给element，这样API这个对象操作就是array里面的元素了
        },

        oldApi: selectorOrArray.oldApi,
        end: function end() {
            return this.oldApi; //当前API里面保存了上一次API的引用，这里返回上一次API的引用就相当于返回上一个被操作的元素对象
        }
    };
};
},{}]},{},["ZC2/"], null)
//# sourceMappingURL=jquery.b03745d2.map