(function() {
    'use strict';

    function Promise(method) {
        this.method = method;
    }

    Promise.prototype = {
        "butWhenIdo": function(callback) {
            if (this.method instanceof Function) {
                this.method();
                callback();
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
            return new Promise(method);
        }
    };

    window.Bro = Bro;
})();
