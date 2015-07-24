[![build status][travis-image]][travis-url]
[![Codacy Badge](https://www.codacy.com/project/badge/ec7e9f08d94447188b0b5072ba3eac31)](https://www.codacy.com/app/letsgetrandy/brototype)
[![Code Climate](https://codeclimate.com/repos/555a0d98695680378e0034bd/badges/04a1db801508665091d9/gpa.svg)](https://codeclimate.com/repos/555a0d98695680378e0034bd/feed)
[![bitHound Score](https://www.bithound.io/github/letsgetrandy/brototype/badges/score.svg)](https://www.bithound.io/github/letsgetrandy/brototype)

brototype
=========

Bro, do you even javascript?

## Features

You've got a deeply-nested set of objects that may or may not always be there.
We've all seen something like this:
`var myURL = app.config.environment.buildURL('dev');`
which leads to one of our favorite javascript errors...
`error: undefined is not a function`

And the solution only makes the code base ugly:
```js
var myURL;
if (app && app.config && app.config.environment && app.config.environment.buildURL) {
    myURL = app.config.environment.buildURL('dev');
}
```

We all hate that, don't we?

So what if you could just type:
```js
var myURL;
if (Bro(app).doYouEven('config.environment.buildURL')) {
    myURL = app.config.environment.buildURL('dev');
}
```

Or better yet, how about:
```js
var myURL;
Bro(app)
    .iDontAlways('config.environment.buildURL')
    .butWhenIdo(function(buildURL){
        myURL = buildURL('dev');
    });
```

Well, now you can!

But what if you have something like this:

```js
app['soap:Envelope']['soap:Body'][0].getResponse[0]['rval'][0].customerId[0]
```

We got you covered.

```js
if (Bro(app).doYouEven("soap:Envelope.soap:Body.0.getResponse.0.rval.0.customerId.0")) {
    var thisVar = app['soap:Envelope']['soap:Body'][0].getResponse[0]['rval'][0].customerId[0];
}
```

## Features

### Testing nested members
```js
if(Bro(object).doYouEven('lift') === Bro.TOTALLY) {
    console.log(object.lift);
}
```

Or, just use a callback...
```js
Bro(object)
    .doYouEven('property.subproperty', function(subproperty) {
        console.log(subproperty);
    });
```

### Fetching nested members
```js
// get a value if it exists
var value = Bro(object).iCanHaz('cheezeburger');

// get an array of values for paths that exist
var values = Bro(object).iCanHaz(['cheezeburger', 'money', 'beer']);
```

### Creating nested members
```js
// add properties to an object
Bro(object).makeItHappen('cheezeburger.with.pickles');
```

```js
// set a deeply nested property by the Bro string
Bro(object).makeItHappen('bro.props', 'high five');  // object.bro.props = 'high five'
```

### Calling nested functions
```js
Bro(object)
    .iDontAlways('method')
    .butWhenIdo(function(returnVal) {
        console.log('object.method() returned ', returnVal);
    });
```

### Handling exceptions
```js
Bro(object)
    .braceYourself('method.name')
    .hereComeTheErrors(function(e) {
        console.log('error ' + e + ' happened.');
    });
```

### Bro-oleans
```js
Bro.TOTALLY // true;
Bro.NOWAY   // false;
```

### Check for undefined
```js
if (Bro(someVar).isThatEvenAThing() === Bro.TOTALLY) {
    // do stuff
}
```

### Get a list of object keys
```js
var object = {foo: 1, bar: 2};
Bro(object).giveMeProps();
// returns ['foo', 'bar'];
```

### Extending objects
```js
var obj1 = {foo: 'boo', bar: 'bar'},
    obj2 = {foo: 'bar', yes: 'no'};
Bro(obj1).comeAtMe(obj2);

// now obj1.foo == 'bar' and obj1.yes == 'no'
```

### Extending Brototype!
Yes, extend me, Bro!

```js
var plugin = { foo: function() { whatever; }};
Bro.prototype.comeAtMe(plugin);
```


## Installing
brototype is available via npm or bower
```bash
# via npm
$ npm install brototype

# via bower
$ bower install brototype
```

## Contributing
Brototype.js may be funny, but it is also quite useful, as demonstrated by the
number of people who have already installed it via
[npm](https://www.npmjs.org/package/brototype).

Therefore, there is some responsibility to add/update the library responsibly.
Please have a look at the
[guidelines for contributing to Brototype](https://github.com/letsgetrandy/brototype/wiki/Contributing)
before submitting your pull request.


## Bro-tie
For the brofessional. Want to use Brototype.js but it's too bro for your work
environment? Just give it the [Bro-tie](http://brotie.jdauriemma.com) treatment
so you can bro down at the office!
Alias some or all of the names to make your boss happy.

## Do you use Brototype?
Are you using Brototype in the wild?
If so, [tell the world](https://github.com/letsgetrandy/brototype/issues/10)!

Also, don't forget to follow [@BrototypeJS](https://twitter.com/Brototypejs) on Twitter!


## Author

Randy Hunt

## License

The MIT License

Copyright © 2014

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[travis-image]: https://img.shields.io/travis/letsgetrandy/brototype/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/letsgetrandy/brototype
