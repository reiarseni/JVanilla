/*!
 * JVanilla JavaScript Library v0.0.1
 *
 * Released under the MIT license
 *
 * Date: 2019-10-19
 */
(function (global, factory) {

    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("JVanilla requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {

    "use strict";

    var version = "0.0.1";

    let ajax = function (parameters) {
        let request = new XMLHttpRequest();
        request.open(parameters.method, parameters.url, true);
        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                parameters.success(this.response);
            } else {
                // We reached our target server, but it returned an error
                parameters.error(this);
            }
        };
        request.onerror = function () {
            // There was a connection error of some sort
            parameters.error(this);
        };
        request.send();
    };

    let on = function (event, handleClick) {
        let nodes = this[0];
        for (let i = 0; i < nodes.length; ++i) {
            nodes[i].addEventListener(event, handleClick);
        }
    };

    let off = function (event) {
        let nodes = this[0];
        for (let i = 0; i < nodes.length; ++i) {
            nodes[i].removeEventListener(event);
        }
    };

    let addClass = function (className) {
        let node = this[0];
        let classes = node.className.split(/\s/);
        if (classes.indexOf(className) === -1) {
            classes.push(className);
            node.className = classes.join(' ');
        }
    };

    // Define a local copy of JVanilla
    let JVanilla = function (selector, context) {
        return new JVanilla.fn.init(selector, context);
    };

    JVanilla.fn = JVanilla.prototype = {
        ajax: ajax,
        on: on,
        off: off,
        addClass: addClass,
        append: function (text) {
            let nodes = this[0];
            for (let i = 0; i < nodes.length; ++i) {
                nodes[i].innerHTML += text;
            }
        },
        html: function (text) {
            let nodes = this[0];
            for (let i = 0; i < nodes.length; ++i) {
                nodes[i].innerHTML = text;
            }
        },
        hide: function () {
            [].forEach.call(this[0], function (el) {
                el.style.display = 'none';
            });
        },
        ready: function (callback) {
            document.addEventListener('DOMContentLoaded', callback);
        },
        css: function (property, value) {
            [].forEach.call(this[0], function (el) {
                el.style[property] = value;
            });
        }
    };

    let init = JVanilla.fn.init = function (selector, context) {
        if (typeof selector === "string") {
            this[0] = context || document.querySelectorAll(selector);
        }

        if (typeof selector === "object") {
            this[0] = selector;
        }

        return this;
    };

    // Give the init function the JVanilla prototype for later instantiation
    init.prototype = JVanilla.fn;

    if (!noGlobal) {
        window.JVanilla = window.j = JVanilla;
    }

    return JVanilla;

});
