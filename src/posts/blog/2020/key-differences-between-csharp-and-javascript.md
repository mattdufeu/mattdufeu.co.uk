---
title: Key differences between C# and JavaScript
author: DuFeu
type: post
date: 2020-11-12T12:00:00+00:00
url: /blog/key-differences-between-csharp-and-javascript/
categories:
  - JavaScript
  - .NET
description: In this post I detail some of the differences between C# and JavaScript with the aim to help you jump between the two more easily.
keywords:
  - JavaScript for C# developers
  - JavaScript for .NET developers
  - Differences between C# and JavaScript
excerpt: <p>I find myself switching between C# and JavaScript quite a lot. Even though I've been doing that for years, there are still occassions where I get caught out by a language feature.</p><p>Here I go through a few of the key differences which have caught me out in the hope that writing about them stops it happening in the future.</p><p>If only things were that simple!</p>
---

import CentreHorizontal from "../../../components/CentreHorizontal";

I've realised I switch between writing C# and JavaScript quite a lot. If this tweet from Derek Comartin is anything to go by, I suspect more and more .NET developers are:

<CentreHorizontal>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Someone asked me what&#39;s more the more popular SPA frontend with .NET Core backend. What do you use primarily? Comment for others.</p>&mdash; Derek Comartin (@codeopinion) <a href="https://twitter.com/codeopinion/status/1316820854731427841?ref_src=twsrc%5Etfw">October 15, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</CentreHorizontal>

In my previous post, I looked into how the [JavaScript equivalent of .NET's LINQ Select](/blog/dotnet-linq-select-method-in-javascript/) is built into the language with `map`. In fact, quite a lot of LINQ like behaviour is.

It got me thinking about the difference between the languages and how it's fairly easy to get caught out by them if you're not careful.

## Difference 1 - String Interpolation

I keep forgetting JavaScript has string interpolation. Introduced in C#6, [string interpolation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/interpolated) is probably one of the most used language features.

<!-- prettier-ignore -->
By putting a $ in front of the string, you get a more readable, convenient syntax to create formatted strings. For example, in C# both of these print the same thing:

```csharp{6}
var name = "Matt";
var age = 21;
var dateOfBirth = new DateTime(1999, 1, 10);

Console.WriteLine("{0} was born on a {1}. He is {2}.", name, dateOfBirth.DayOfWeek, age);
Console.WriteLine($"{name} was born on a {dateOfBirth.DayOfWeek}. He is {age}.");
```

You can do the same in JavaScript by surrounding the string with \` \` (please ignore the array lookup to get the day of the week).

```javascript{15}
var name = "Matt";
var age = 21;
var dateOfBirth = new Date(1999, 1, 10);
var weekdays = new Array(
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
);

console.log(
  `${name} was born on a ${weekdays[dateOfBirth.getDay()]}. He is ${age}.`
);
```

All three of those examples write "Matt was born on a Wednesday. He is 21." (I wish).

## Difference 2 - Type coercion

That's a fancy way of saying convert a value of one type into another..

In C# you convert between types using casting. Both implicit:

```csharp
int num = 21;
long longNum = numl
```

or explicit:

```csharp
double num = 21.1;
int a = (int)num;
```

In JavaScript, it happens automatically. It's a fantastic feature when you're doing string concatentation:

```javascript
let name = "Matt";
let age = 21;
let really21 = false;

console.log(name + " is " + age + " years old. Really? " + really21);
// Matt is 21 years old. Really?! false
```

Here, `age` and `really21` are converted to strings automatically.

However, it can cause problems with equality if you're not careful:

```javascript
12 == "12"; // true
```

It's a suprisingly deep topic. If you're really interested, check out <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness>.

In my exprience, stick to "strict equality" (===) enforced by something like [ESLint](https://eslint.org/) and you can't go too far wrong.

## Difference 3 - Strongly Typed vs Loosely Typed

C# is a strongly typed language. That means once a variable is declared to be of one type, you can't assign another type to it. The code literally won't compile. That's great for catching certain types of bugs early.

```csharp
var aNumber = 21;
aNumber = "21";		// Compiler error - Cannot implicitly convert type 'string' to 'int'

```

JavaScript however is loosely typed. You can change the type at runtime, so there's no problem with the above code in JavaScript. That can be very powerful and very dangerous and is certainly something to consider.

## Difference 4 - null and undefined

C# doesn't have the notion of undefined. Declaring variables without a value results in the variable having the default value for that type, see <https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/default-values>.

In JavaScript, variables can be `undefined` as well as `null`. It really is as the word says. If you declare a variable but don't assign anything to it, the value will be `undefined`.

A common mistake I see (and make) is null checking in JavaScript without checking for undefined, for example:

```javascript
let x;

if (x === null) {
  console.log("That was true");
} else {
  console.log("That was false");
}
// That was false
```

## Difference 5 - Truthy and Falsy

"Type Coercion" and "null and undefined" lead nicely into "Truthy and Falsy". What we're talking about here are boolean checks. In C# it's as simple as true or false.

So far so good, but JavaScript has some different definitions of false to C#. In fact, there are 8 values which evaluate to false:

1. false
1. 0
1. -0
1. 0n (BigInt)
1. "" (empty string)
1. null
1. undefined
1. NaN (not a number)

**Everything** else is Truthy or evaluates to true.

This took me a while to get my head around, and to be honest, I still forget sometimes.

## Difference 6 - this

The `this` keyword in C# refers to the current instance of the class. (It's also a keyword in extension methods but ignore that for now).

In JavaScript, `this` is a little different to most other languages, C# included. It's value usually depends on how a function is called, i.e. it's bound at runtime (implicit binding). However, it is possible to change the scope of `this` using [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) (explicit binding).

The fairly recent addition of Arrow Functions have also made the topic more complex. Arrow functions makes `this` be in the scope they were created, so make executing functions easier to reason about and behave more like how a C# developer would expect.

I rarely write vanilla JavaScript, I'm always using some framework like React or Vue. Generally, they have their own recommendations. For example Vue.js states you [shouldn't use arrow functions on lifecycle hooks](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks)] or [methods](https://vuejs.org/v2/api/#methods) as `this` will be treated as any other variable. [React seems a little more relaxed with Arrow Functions](https://reactjs.org/docs/faq-functions.html).

It takes a lot of practice to get comfortable with `this` in JavaScript. I still get caught out. Many many articles have been written [explaining this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this). I highly recommend you read them if you're interested.

## Conclusion

Both languages have a lot of similarities, so the knowledge you have in C# will help you be productive in JavaScript. However, I've listed what I think are key differences between C# and JavaScript that will impact you everyday. There are a couple more like hoisting, scope and the fact that JavaScript it prototypal that I've not mentioned. Perhaps the frameworks I'm using hide those things or I'm just not paying attention, but they don't affect my day to day work. They are also quite big topics, so perhaps another post in the future is needed.

I've found writing this post useful, so hopefully it's of use to others too. I'm by no means an expert in either language, so if you think I've missed something or have any questions, please let me know.
