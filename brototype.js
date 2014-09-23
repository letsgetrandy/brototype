(function() {
    'use strict';

    // Bromise... it's stronger than a Promise
    function Bromise(object, method, args) {
        this.object = object;
        this.method = method;
        this.args = args.length > 1 ? args.slice(1) : [];
    }

    Bromise.prototype = {
        "butWhenIdo": function(callback, context) {
            if (this.method instanceof Function) {
                var returnValue = this.method.apply(this.object, this.args);
                if (returnValue) {
                    (callback || function(){}).call(context || this.object, returnValue);
                }
            }
            return context;
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
        },
        "errorsAreComing": function () {
            this.hereComeTheErrors.apply(this, arguments);
        }
    };

    function Bro(obj) {
        if (this instanceof Bro) {
            this.obj = obj;
        } else {
            return new Bro(obj);
        }
    }

    Bro.TOTALLY = true;
    Bro.NOWAY = false;

    Bro.prototype = {
        "isThatEvenAthing": function() {
            return this.obj !== void 0;
        },

        "doYouEven": function(key, options) {
            var optionsBro = Bro(options || {}),
                bro = this.iCanHaz(key);
            if (Bro(bro).isThatEvenAthing() === Bro.TOTALLY) {
                optionsBro.iDontAlways('forSure').butWhenIdo();
                return Bro.TOTALLY;
            } else {
                optionsBro.iDontAlways('sorryBro').butWhenIdo();
                return Bro.NOWAY;
            }
        },

        "iCanHaz": function(key) {
            var props = key.split('.'),
                item = this.obj;
            for (var i = 0; i < props.length; i++) {
                item = item[props[i]];
                if (Bro(item).isThatEvenAthing() === Bro.NOWAY) {
                    return item;
                }
            }
            return item;
        },

        "comeAtMe": function(brobject) {
            var i, prop,
                bro = Bro(brobject),
                keys = bro.allTheThings(),
                obj = (this instanceof Bro) ? this.obj : Bro.prototype;
            for (i = 0; i < keys.length; i++) {
                prop = keys[i];
                obj[prop] = brobject[prop];
            }
        },

        "allTheThings": function() {
            var key, props = [];
            if (Object.keys) {
                props = Object.keys(this.obj);
            } else {
                for (key in this.obj) {
                    if (this.obj.hasOwnProperty(key)) {
                        props.push(key);
                    }
                }
            }
            return props.sort();
        },

        "iDontAlways": function(methodString) {
            var method = this.iCanHaz(methodString);
            return new Bromise(this.obj, method, arguments);
        },

        "braceYourself": function(methodString) {
            var method = this.iCanHaz(methodString);
            return new Bromise(this.obj, method, arguments);
        }
    };

    module.exports = Bro;
})();
