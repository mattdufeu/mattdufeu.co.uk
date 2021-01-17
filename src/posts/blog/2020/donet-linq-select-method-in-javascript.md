---
title: .NET LINQ Select method in JavaScript
author: DuFeu
type: post
date: 2020-11-05T12:00:00+00:00
url: /blog/dotnet-linq-select-method-in-javascript/
categories:
  - .NET
  - JavaScript
keywords:
  - JavaScript for C# developers
  - JavaScript for .NET developers
  - LINQ equivalent in JavaScript
  - LINQ in JavaScript
  - LINQ Select in JavaScript
description: In this post I go through the JavaScript equivalant of the .NET LINQ Select method. There are slight differences, but nicely familiar.
excerpt: <p>I accidentally typed out a couple of .NET LINQ statements while writing JavaScript and drew a blank on the equivalent method names.</p><p>In the hope of not forgetting again, here I dig into the equivalent of the .NET LINQ Select method in JavaScript. They're not identical, but I think for most people the differences won't matter.</p>
---

While building a Vue.js component that displayed an array of data, I found myself typing out .NET LINQ methods. Whether that's because of habit or muscle memory I'm not sure, but JavaScript doesn't contain a `Select` method.

Typically, my mind went blank on what the JavaScript equivalent of LINQ Select was so I had to look it up.

Turns out modern JavaScript has a lot of very similar functionality to LINQ. I'm pretty sure I've got an old notebook with a cheatsheet in it somewhere, but I can't find it, so I am adding it here for safe(r) keeping.

## High Level Comparison

At a high level `Select` "does something" to each element in an `IEnumerable<TSource>`, giving you back the result as another `IEnumerabl<TResult>`.

Note that the return type is not necessarily the same as the input as you could create a new type for each element,.

Imagine you have a set of data of some employees. In C# this might look like:

```csharp
// C#
var employees = new List<Employee>
{
    new Employee { Name = "Katie", Salary = 50000m, Age = 46 },
    new Employee { Name = "Terry", Salary = 5000m, Age = 16 },
    new Employee { Name = "Fred", Salary = 35000m, Age = 26 },
    new Employee { Name = "Elsie", Salary = 100000m, Age = 36 },
};
```

Or in JavaScript, you might have:

```javascript
// JS
let employees = [
  { Name: "Katie", Salary: 50000, Age: 46 },
  { Name: "Terry", Salary: 5000, Age: 16 },
  { Name: "Fred", Salary: 35000, Age: 26 },
  { Name: "Elsie", Salary: 100000, Age: 36 }
];
```

## .NET LINQ Select

If you wanted a list of the employees with their name capitalised, you could write the following in C# using LINQ and the `Select` method:

```csharp
// C#
employees.Select(v => v.Name.ToUpper());
```

**Please note:** In an attempt to keep this to the point, I'm ignoring the fact that LINQ statements are not actually performed until you call something like `ToList()`.

## JavaScript equivalent of LINQ Select is Map

If you're able to use [JavaScript Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), you could write something like:

```javascript
// JS
employees.map((x) => x.Name.toUpperCase());
```

Or if you can't use them:

```javascript
// JS
employees.map(function (x) {
  return x.Name.toUpperCase();
});
```

If like me, you like to dig a little deeper into things, please keep reading. If all you needed was a jog of your memory, or you simply don't care, I won't be too upset if you stop reading here.

## In depth comparison

## Similarities

The API of both `Select` and `map` are actually a little more complex than that.

There's a second overload in .NET's [LINQ Select](https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable.select?view=netcore-3.1). This overload includes a second parameter that represents the index of the source element.

[JavaScript map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) also provides index as an optional second parameter. It also goes one step further by providing 1 more. This 3rd parameter is the array itself.

## Differences

There are a couple of key differences you might need to consider.

In .NET LINQ methods are extension methods of IEnumerable&lt;T&gt;. A _lot_ of classes derive from IEnumerable&lt;T&gt; so you can use LINQ on lots of stuff. In JavaScript, it's arrays and arrays only.

Another much bigger difference between .NET Select and JavaScript map is that the .NET methods defer execution. In other words, they are not executed until needed by something like `ToList()`. In JavaScript, map creates and returns a new array immediately.

## Alternatives

Finally, I think it's worth pointing out you can get a much closer to .NET experience in JavaScript if you're willing to pull in an external dependency.

I've not used either, but the following open source libraries look interesting:

- https://github.com/mihaifm/linq
- https://github.com/Siderite/LInQer in particular looks nice as it using iterators and source generators
