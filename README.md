brototype
=========

Bro, do you even write javascript?

## Features

You've got a deeply-nested set of objects that may or may not always be there.
We've all seen something like this:
`var myURL = app.config.environment.buildURL('dev');`
which leads to one of our favorite javascript errors...
`error: undefined is not a function`

And the solution only makes the code base ugly:
```
var myURL;
if (app && app.config && app.config.environment && app.config.environment.buildURL) {
    myURL = app.config.environment.buildURL('dev');
}
```

We all hate that, don't we?

So what if you could just type:
```
var myURL;
if (Bro(app).doYouEven('config.environment.buildURL')) {
    myURL = app.config.environment.buildURL('dev');
}
```

Or better yet, how about:
```
var myURL;
Bro(app)
    .iDontAlways('config.environment.buildURL')
    .butWhenIdo(function(val){
        myURL = val;
    });
```

Well, now you can!

## Features

### Testing nested members
```
if(Bro(object).doYouEven('lift')) {}
```
Or, just use a callback...
```
Bro(object)
    .doYouEven('property.subproperty', function(subproperty) {
        console.log(subproperty);
    });
```

### Fetching nested members
```
var value = Bro(object).iCanHaz('cheezeburger');
```

### Calling nested functions
```
Bro(object)
    .iDontAlways('method')
    .butWhenIdo(function(returnVal) {
        ...
    });
```

### Handling exceptions
```
Bro(object)
    .braceYourself('method.name')
    .hereComeTheErrors(function(e) {
        console.log('error ' + e + ' happened.');
    });
```

### Check for undefined
```
if (Bro(someVar).isThatEvenAthing() === Bro.TOTALLY) {
    // do stuff
}
```

### Get a sorted list of object keys
```
var keys = Bro(object).allTheThings();
```

### Extending objects
```
var obj1 = {foo: 'boo', bar: 'bar'},
    obj2 = {foo: 'bar', yes: 'no'};
Bro(obj1).comeAtMe(obj2);

// now obj1.foo == 'bar' and obj1.yes == 'no'
```

### Extending Brototype!
Yes, extend me, Bro!

```
var plugin = { foo: function() { whatever; }};
Bro.prototype.comeAtMe(plugin);
```


## Tests

`npm test` to run tests.

## Author

Randy Hunt

## License

The MIT License

Copyright © 2014

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
