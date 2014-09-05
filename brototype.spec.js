/*global Bro:false, describe:false, it:false, expect:false, beforeEach:false */

define([
	'js/de/brototype'
], function() {
	'use strict';

	describe('Bro.doYouEven', function() {
		it('should be defined', function() {
			var a = {},
				bro = Bro(a);
			expect(bro.doYouEven).toBeDefined();
		});

		it('should return true for defined properties', function() {
			var a = {foo: 'bar'},
				bro = Bro(a);
			expect(bro.doYouEven('foo')).toBe(true);
		});

		it('should return true for nested properties', function() {
			var a = {foo: {bar: 'baz'}},
				bro = Bro(a);
			expect(bro.doYouEven('foo.bar')).toBe(true);
		});

		it('should return false for undefined properties', function() {
			var a = {foo: 'bar'},
				bro = Bro(a);
			expect(bro.doYouEven('bar')).toBe(false);
		});
	});

	describe('Bro.iCanHaz', function() {
		it('should return the value of the deep property', function() {
			var a = {b: {c: {d: 32}}},
				bro = Bro(a);
			expect(bro.iCanHaz('b.c.d')).toBe(32);
		});

		it('should return undefined for missing property', function() {
			var a = {b: 32},
				bro = Bro(a);
			expect(bro.iCanHaz('b.c.d')).toBeUndefined();
		});
	});

	describe('Bro.allTheThings', function() {
		it('should return an object\'s keys', function() {
			var a = {
					"foo": 1,
					"bar": 2
				},
				keys = Bro(a).allTheThings();
			expect(keys.length).toBe(2);
			expect(keys).toContain('foo');
			expect(keys).toContain('bar');
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
			expect(success).toBe(false);
			bro.iDontAlways('foo').butWhenIdo(fn);
			expect(success).toBe(true);
		});

		it('should run the requested method if a function', function() {
			var bro = Bro(obj);
			bro.iDontAlways('foo').butWhenIdo(fn);
			expect(fired).toBe(true);
		});
	});
});