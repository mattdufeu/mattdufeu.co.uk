---
title: Extension methods in JavaScript
author: DuFeu
type: post
date: 2021-01-27T12:00:00+00:00
url: /blog/how-to-write-extension-methods-in-javascript/
categories:
  - .NET
  - JavaScript
description: Extension methods are one of my favourite parts of the using C#. Here's how you can get the same functionality in JavaScript.
featuredImage: "../../../images/2021/extension-methods-in-js-fi.png"
keywords:
  - JavaScript for C# developers
  - JavaScript for .NET developers
  - Extension methods in JavaScript
excerpt: <p>Extension methods in .NET are one of my favourite parts of using C#. In this post, I'll show how you can achive the same thing in JavaScript by taking advantage of it's prototypal nature.</p><p>Be warned though, there are a couple of caveats that we need to be aware of though. Turns out it's quite easy to get unexpected bugs and break 3rd party libraries.</p>
---

import CentreHorizontal from "../../../components/CentreHorizontal";

![Extension methods in JavaScript](../../../images/2021/extension-methods-in-js-fi.png#width=500px;margin=auto)

Extension methods in .NET are one of my favourite parts of using C#. In this post, I'll show how you can achive the same thing in JavaScript by taking advantage of it's prototypal nature.

Be warned though, there are a couple of caveats that we need to be aware of though. Turns out it's quite easy to get unexpected bugs and break 3rd party libraries.

## Background

In October I bookmarked the following David Fowler tweet and having finally read it, I realised how much I use them. More important, I realised I miss them in JavaScript and found out there's a way to achieve the same behaviour.

<CentreHorizontal>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Show me a method from your &quot;Utils&quot; file/class/project. The junkyard of helpers classes and functions that don&#39;t really belong anywhere.</p>&mdash; David Fowler 🇧🇧 (@davidfowl) <a href="https://twitter.com/davidfowl/status/1316777853913104384?ref_src=twsrc%5Etfw">October 15, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</CentreHorizontal>

## How extension methods in JavaScript work

I'm not capable of explaining it with a text book answer, but here's how I understand it. There are two key things.

### Key 1 - JavaScript is a prototypical language

Each object has a "prototype" property that points to another object. When you use a property on method on an object, say `myObject.myProperty`, first the object itself is checked for the relevant property. If it isn't there, the object referenced by the "prototype" property is checked. Repeat this "prototype" traversal until it's found.

In my mind, that's very similar to how objects inherit from other objects in C#. Ultimately going back to System.Object.

### Key 2 - JavaScript is a dynamic language

Dynamic means you can add properties and methods to an already existing object at runtime. In other, less technical words, you don't need to declare everything about an object before hand.

For example, in JavaScript you can create an object then, like on line 4, assign a value to a property that isn't there:

```JavaScript{4}
var myObject = { "a" : 2};
console.log(myObject.a);	// 2

myObject.b = "test";
console.log(myObject.b);  // "test"
```

Where as in C#, if you have a class called MyObject with just an int property called a, you get a compilation error:

```csharp
var myObject = new MyObject { a = 2};
Console.WriteLine(myObject.a);

myObject.b = "test";
Console.WriteLine(myObject.b);

error CS1061: Type `MyObject' does not contain a definition for `b' and
no extension method `b' of type `MyObject' could be found
```

## Creating an extension method in JavaScript

Extension methods in JavaScript take advantage of **both** of the above features. If we modify the "prototype" of an object dynamically (after it was created). When we use a method/property on an already existing object, because the prototype chain is crawled, our newly added thing will be found.

For example, if you want to add an extension method to [momentjs](https://momentjs.com/) which outputs the number of years since 1980 to the console (because why wouldn't you), we can write:

```JavaScript
moment.prototype.yearsFrom1980 = function(year) {
  return this.year() - 1980 + " years since 1980!";
};
```

And use it like any other method on a moment instance:

```JavaScript
const m = moment();
console.log(m.yearsFrom1980(2020)); // "41 years since 1980!"
```

## Considerations and gotchas

If you're like me, mostly write .NET and your JavaScript is fairly simple, that's all there is to it. However, there are a couple of gotchas that we should keep in mind. I don't think I've ever been stung by these, but they're worth pointing out.

### Gotcha 1 - Modify built-in types

It's almost certainly a bad idea to modify the prototype of built-in types like string. Even more so for Array or Object. Especially if you're using code you don't control, which is most of us when using frameworks like Vue.

If you have to, use [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) rather than modifying it directly. Apparently that makes a non-enumerable property and is safer.

### Gotchas 2 - Beware of hoisting

Hoisting is a feature of JavaScript that lets you use functions before they are declared. For example, this is totally valid:

```JavaScript
function declaredBefore() {
    console.log("declared before");
}

declaredBefore();
declaredAfter();

function declaredAfter() {
    console.log("declared after");
}
```

That works because we are using the function keyword on it's own. If however, you use the function keyword during an assignment, i.e.:

```JavaScript
function declaredBefore() {
    console.log("declared before");
}

declaredBefore();
declaredAfter();

var declaredAfter = function() {
    console.log("declared after");
}
```

You'll end up with an error like `Uncaught TypeError: declaredAfter is not a function`.

That's exactly what you're doing when adding to the prototype, so make sure you add your extension methods before creating an instance of an object and using it.

## Conclusion

It is possible to add something very similar to .NET extension methods to JavaScript. They are not as powerful as it's a bit risky extending built in types. But if you're confident you have adequeate testing you might be able to get away with it.

I wrote earlier that this isn't a text book explanation. If you want one, or just to dig deeper, You Don't Know JS, in particular [this & object prototypes](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch5.md) will have you covered.

Do you use this technique when working with JavaScript? Or do you prefer something else?
