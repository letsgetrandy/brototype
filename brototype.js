(function() {
    'use strict';

    function Promise(object, method, args) {
        this.object = object;
        this.method = method;
        this.args = args.length > 1 ? args.slice(1) : [];
    }

    Promise.prototype = {
        "butWhenIdo": function(callback) {
            if (this.method instanceof Function) {
                var returnValue = this.method.apply(this.object, this.args);
                callback(returnValue);
            }
        },

        "hereComeTheErrors": function(callback) {
            if (this.method instanceof Function) {
                try {
                    this.method.apply(this.object, this.args);
                } catch(e) {
                    callback(e);
                }
            } else {
                callback(this.method + ' is not a function.');
            }
        }
    };

    function Bro(obj) {
        if (this instanceof Bro) {
            this.obj = obj;
        } else {
            return new Bro(obj);
        }
    }

    Bro.prototype = {
        "doYouEven": function(key) {
            var props = key.split('.'),
                item = this.obj;
            for (var i = 0; i < props.length; i++) {
                item = item[props[i]];
                if (typeof item === 'undefined') {
                    return false;
                }
            }
            return true;
        },

        "allTheThings": function() {
            if (Object.keys) {
                return Object.keys(this.obj);
            }
            var key, props = [];
            for (key in this.obj) {
                if (this.obj.hasOwnProperty(key)) {
                    props.push(key);
                }
            }
            return props;
        },

        "iCanHaz": function(key) {
            if (this.doYouEven(key)) {
                var props = key.split('.'),
                    item = this.obj;
                for (var i = 0; i < props.length; i++) {
                    item = item[props[i]];
                }
                return item;
            } else {
                return undefined;
            }
        },

        "iDontAlways": function(methodString) {
            var method = this.iCanHaz(methodString);
            return new Promise(this.obj, method, arguments);
        },

        "braceYourself": function(methodString) {
            var method = this.iCanHaz(methodString);
            return new Promise(this.obj, method, arguments);
        }
    };

    exports.Bro = Bro;
})();
