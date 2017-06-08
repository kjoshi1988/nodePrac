/**
 * A simple api similar to jQuery, could be jQLite ;).
 *
 * @author joshkaps
 * @since 11 Feb, 2016
 * @version 0.0.1
 */

(function (win, doc) {
    /**
     * Trims the string.
     *
     * @type {*|Function}
     */
    String.prototype.trim = String.prototype.trim || function () {
            return this.replace(/^\s*\s|\s*\s$/ig, "")
        };

    /**
     * Shuffles elements in an array.
     * It picks up each index sequential and also generates a random index.
     * It then swaps the value with each other.
     * It continues to do this until it reaches at the end of array.
     *
     * @return {Array}
     */
    Array.prototype.shuffle = function () {
        var length = this.length;
        for (var i = 0; i < length; i++) {
            var currentItem = this[i];
            var randomIndex = Math.ceil(Math.random() * (length * 10)) % length;
            this[i] = this[randomIndex];
            this[randomIndex] = currentItem;
        }
        return this;
    };

    /**
     * Checks if object is a DOM node
     *
     * @param o
     * @return {*}
     */
    function isNode(o){
        return (
            typeof Node === "object" ? o instanceof Node :
            o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
        );
    }

    /**
     * Checks if object is a DOM Element
     *
     * @param o
     * @return {*}
     */
    function isElement(o){
        return (
            o === window || o === document ||
            (typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
            o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string")
        );
    }

    /**
     * CrossBrowser code to add an event on dom element
     *
     * @param ele, dom element
     * @param evName, name of event which is to be binded on dom element
     * @param evFn, function to be bind-ed
     * @param capture, should event be captured or bubbled, doesn't work on IE < 9
     */
    function addEvent(ele, evName, evFn, capture) {
        if (!!ele.addEventListener)
            ele.addEventListener(evName, evFn, capture);
        else
            ele.attachEvent("on" + evName, evFn, capture);
    }

    /**
     * CrossBrowser code to remove an attached event on dom element
     *
     * @param ele, dom element
     * @param evName, name of event which is to be removed from dom element
     * @param evFn, function, this should be same as the one bind-ed on the dom
     * @param capture, should event be captured or bubbled, doesn't work on IE < 9
     */
    function removeEvent(ele, evName, evFn, capture) {
        if (!!ele.addEventListener)
            ele.removeEventListener(evName, evFn, capture);
        else
            ele.detachEvent("on" + evName, evFn, capture);
    }

    /**
     * DomReady event which is fired when dom tree is completed and before window loading event.
     * Yeah, now I can write code in head and can access dom without any hassle ;)
     *
     * @return {Function}
     */
    function initDomReady() {
        var evQ = [], init = false, mod = !!doc.addEventListener;
        var domRdyEv = function () {
            if (mod || doc.readyState == "interactive") {
                init = true;
                while (evQ.length > 0) evQ.splice(0, 1)[0]();
                removeEvent(doc, "DOMContentLoaded", domRdyEv, false);
                removeEvent(doc, "readystatechange", domRdyEv, false);
            }
        };
        addEvent(doc, "DOMContentLoaded", domRdyEv, false);
        addEvent(doc, "readystatechange", domRdyEv, false);

        return function (fn) {
            if (init) fn();
            else evQ.push(fn);
        }
    }

    /**
     * An api similar to Jquery, can be called jQLite XD.
     */
    window.$ = (function () {
        function Obj() {
            this.__children = [];
            this.__$$ver$$__ = "0.0.1";
            this.__$$api$$__ = true;
        }

        /**
         * Checks if the dom element has the class or not.
         * Uses regex for string comparison.
         *
         * @param classToBeChecked
         * @param actualClass
         * @return {boolean}
         */
        function hasClass(classToBeChecked, actualClass) {
            return new RegExp("\\b" + classToBeChecked + "\\b").test(actualClass);
        }

        /**
         * Function reference which is returned as $.
         *
         * @param ele, dom element on  which api is to be wrapped
         * @return {Obj}, returns an wrapped object of, lets say jQLite.
         */
        var fn = function (ele) {
            var _o = new Obj(), _c, i, _e;
            if (!!ele) {
                if (typeof ele == "string") {
                    if (ele.indexOf("#") == 0) {
                        _o.__children.push(doc.getElementById(ele.substring(1)));
                    } else if (ele.indexOf(".") == 0) {
                        _c = document.getElementsByClassName(ele.substring(1));
                        if (!!_c && _c.length > 0) {
                            for (i = 0; i < _c.length; i++) {
                                _o.__children.push(_c[i]);
                            }
                        }
                    }
                } else if (ele.length && ele.length > 0) {
                    for (i = 0; i < ele.length; i++) {
                        _e = ele[i];
                        if(!!_e){
                            if(_e.__$$api$$__)
                                _e.each(function(){_o.__children.push(this)});
                            else if(isElement(_e) || isNode(_e))
                                _o.__children.push(_e);
                        }
                    }
                } else if (isElement(ele) || isNode(ele) ) {
                    _o.__children.push(ele);
                }
            }
            return _o;
        };
        /**
         * jQLite api can be binded for multiple elements, like elements with classname.
         * This function is used to get element at specific location maintained by api.
         *
         * @param index
         * @return {*}
         */
        Obj.prototype.get = function (index) {
            return this.__children[index];
        };
        /**
         * Returns parent of the dom element
         *
         * @return {boolean|*|Node}
         */
        Obj.prototype.parent = function () {
            var ele = this.get(0);
            return !!ele && $(ele.parentNode || ele.parentElement);
        };
        /**
         * Returns tag of the dom element
         *
         * @return {boolean|string}
         */
        Obj.prototype.tag = function () {
            var ele = this.get(0);
            return !!ele && ele.tagName && ele.tagName.toLocaleLowerCase();
        };
        /**
         * Removes a class from dom element.
         *
         * @param className
         * @return {Obj}
         */
        Obj.prototype.removeClass = function (className) {
            this.each(function () {
                this.className = this.className.trim().replace(new RegExp("\\b" + className + "\\b"), " ").trim();
            });
            return this;
        };
        /**
         * Checks if the dom element has the class or not. @see hasClass
         *
         * @param className
         * @return {boolean}
         */
        Obj.prototype.hasClass = function (className) {
            if (this.__children.length > 1)
                throw new Error("Cant be call on list of children");
            return !!this.__children.length && hasClass(className, this.__children[0].className);
        };
        /**
         * Adds a class from dom element
         *
         * @param className
         * @return {Obj}
         */
        Obj.prototype.addClass = function (className) {
            this.each(function () {
                if (!hasClass(className, this.className))
                    this.className = (this.className + " " + className).trim();
            });
            return this;
        };
        /**
         * Attach an event to dom element @see addEvent
         * @param evName
         * @param evFn
         * @param capture
         * @return {Obj}
         */
        Obj.prototype.addEvent = function (evName, evFn, capture) {
            this.each(function () {
                addEvent(this, evName, evFn, capture);
            });
            return this;
        };
        /**
         * Removes an event from dom element. @see removeEvent
         *
         * @param evName
         * @param evFn
         * @param capture
         * @return {Obj}
         */
        Obj.prototype.removeEvent = function (evName, evFn, capture) {
            this.each(function () {
                removeEvent(this, evName, evFn, capture);
            });
            return this;
        };
        /**
         * Add a child or a list of children.
         *
         * @param child
         * @return {Obj}
         */
        Obj.prototype.appendChild = function (child) {
            this.each(function () {
                if (!!child.length) {
                    while (child.length > 0) this.appendChild(child.splice(0, 1)[0]);
                } else
                    this.appendChild(child);
            });
            return this;
        };
        /**
         * Iterates through the list of dom child wrapped in jQLite api.
         *
         * @param cb
         * @return {Obj}
         */
        Obj.prototype.each = function (cb) {
            var _ele;
            for (var i = 0; i < this.__children.length; i++) {
                _ele = this.__children[i];
                if ((!!_ele && !!_ele.tagName) || (_ele === win || _ele === doc)) {
                    cb.call(_ele, i);
                }
            }
            return this;
        };
        /**
         * Sets/get data as atrribute to the dom element.
         *
         * @return {*}
         */
        Obj.prototype.data = function () {
            var _args = arguments;
            if (arguments.length > 0) {
                if (arguments.length == 1) {
                    var ele = this.get(0);
                    return !!ele ? ele.getAttribute("data-" + _args[0]) : undefined;
                } else if (arguments.length == 2) {
                    this.each(function () {
                        this.setAttribute("data-" + _args[0], _args[1]);
                    });
                    return this;
                }
            }
        };
        /**
         * Returns innerHtml, if no argument is passed, otherwise sets the innerHTML.
         *
         * @param html
         * @return {*}
         */
        Obj.prototype.html = function () {
            var ele, _args = arguments;
            if (_args.length == 1) {
                this.each(function () {
                    this.innerHTML = _args[0];
                });
                return this;
            } else if (_args.length == 0) {
                ele = this.get(0);
                if (!!ele) {
                    return !!ele && ele.innerHTML;
                }
            }
            return this;
        };
        /**
         * Binds dom ready event.
         * If events are added on dom, before ready,
         * then all of them are queue and called when
         * dom is ready, else they are called immediately.
         *
         * @type {Function}
         */
        fn.onDomReady = initDomReady();
        /**
         * Sets cookie in the browser
         *
         * @param name
         * @param value
         * @param expires
         * @param path
         * @param domain
         * @param secure
         */
        fn.setCookie = function (name, value, expires, path, domain, secure) {
            document.cookie = name + "=" + escape(value) +
                ((expires) ? "; expires=" + expires.toGMTString() : "") +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
        };
        /**
         * Fetches cookie stored in the browser
         *
         * @param name
         * @return {null}
         */
        fn.getCookie = function(name) {
            var prefix = name + "=",start = document.cookie.indexOf(prefix);
            if (start==-1)
                return null;
            var end = document.cookie.indexOf(";", start+prefix.length);
            if (end==-1) {
                end=document.cookie.length;
            }
            return unescape(document.cookie.substring(start+prefix.length, end));
        };
        /**
         * A simple cache utils that stores data in local-storage, if available,
         * otherwise stores data in cookie.
         *
         * @type {{get, set}}
         */
        fn.cache = (function(){
            var _map = {};
            function saveToStorage(){
                var map = JSON.stringify(_map);
                if(win.localStorage)
                    localStorage.setItem("__cache__", map);
                else
                    fn.setCookie("__cache__", map, 108000);
            }
            (function(){
                var value;
                try {
                    if(win.localStorage)
                        value = localStorage.getItem("__cache__");
                    else
                        value = fn.getCookie("__cache__");
                    _map = JSON.parse(value);
                } catch (e) {
                    _map = {};
                }
                if(!_map)
                    _map = {};
            })();
            fn(win).addEvent("beforeunload", saveToStorage);
            return {
                get: function (key) {
                    return _map[key];
                },
                set: function (key, value) {
                    _map[key] = value;
                }
            };
        })();
        /**
         * More functions can be added to the api using $.extend.
         * @type {Object|Function|Obj}
         */
        fn.extend = Obj.prototype;
        return fn;
    })();
})(window, document);

/**
 * This function shows how to add custom functions to the api.
 * This method will be available to all the object which are wrapped using api.
 * This function applies inline css on the elements wrapped based on arguments length
 * <pre>
 *     $(obj).css("color") //returns color value of element.
 *     $(obj).css("color","yellow") //applies color value yellow to element.
 *     $(obj).css({       //applies color value yellow to element and height to 40px.
 *          "color":"yellow"
 *          "height": "40px"
 *     })
 * </pre>
 *
 * @return {*}
 */
$.extend.css = function(){
    var _o, _args = arguments;
    if(_args.length > 0){
        if (_args.length == 1) {
            _o = _args[0];
            if(typeof _o === "string"){
                return this.get(0) && this.get(0).style[_args[0]];
            } else if(!!_o && typeof _o === "object"){
                for(var key in _o){
                    if (_o.hasOwnProperty(key)) {
                        (function(thiz, key, val){
                            thiz.each(function(){
                                this.style[key] = val;
                            });
                        })(this, key, _o[key]);
                    }
                }
            }
        } else if(_args.length == 2){
            this.each(function(){
                this.style[_args[0]] = _args[1];
            });
        }
    }
};