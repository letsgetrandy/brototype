/*global Bro:false, describe:false, it:false, expect:false, beforeEach:false */

var Bro = require('./brototype').Bro;
var assert = require('assert');

describe('Bro.doYouEven', function() {
    it('should be defined', function() {
        var a = {},
            bro = Bro(a);
        assert.notEqual(bro.doYouEven, undefined);
    });

    it('should return true for defined properties', function() {
        var a = {foo: 'bar'},
            bro = Bro(a);
        assert.equal(bro.doYouEven('foo'), true);
    });

    it('should return true for nested properties', function() {
        var a = {foo: {bar: 'baz'}},
            bro = Bro(a);
        assert.equal(bro.doYouEven('foo.bar'), true);
    });

    it('should return false for undefined properties', function() {
        var a = {foo: 'bar'},
            bro = Bro(a);
        assert.equal(bro.doYouEven('bar'), false);
    });
});

describe('Bro.iCanHaz', function() {
    it('should return the value of the deep property', function() {
        var a = {b: {c: {d: 32}}},
            bro = Bro(a);
        assert.equal(bro.iCanHaz('b.c.d'), 32);
    });

    it('should return undefined for missing property', function() {
        var a = {b: 32},
            bro = Bro(a);
        assert.equal(bro.iCanHaz('b.c.d'), undefined);
    });
});

describe('Bro.allTheThings', function() {
    it('should return an object\'s keys', function() {
        var a = {
                "foo": 1,
                "bar": 2
            },
            keys = Bro(a).allTheThings();
        assert.equal(keys.length, 2);
        assert.notEqual(keys.indexOf('foo'), -1);
        assert.notEqual(keys.indexOf('bar'), -1);
    });
});

describe('Bro.iDontAlways', function() {
    var fired,
        success,
        obj = {
            "foo": function() {
                fired = true;
            },
            "bar": 3
        },
        fn = function() {
            success = true;
        };

    beforeEach(function() {
        fired = false;
        success = false;
    });

    it('should check that the requested method is a function', function() {
        var bro = Bro(obj);
        bro.iDontAlways('bar').butWhenIdo(fn);
        assert.equal(success, false);
        bro.iDontAlways('foo').butWhenIdo(fn);
        assert.equal(success, true);
    });

    it('should run the requested method if a function', function() {
        var bro = Bro(obj);
        bro.iDontAlways('foo').butWhenIdo(fn);
        assert.equal(fired, true);
    });
});
