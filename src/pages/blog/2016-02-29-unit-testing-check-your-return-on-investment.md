---
title: Unit Testing – Check your Return on Investment
author: DuFeu
type: post
date: 2016-02-29T06:43:46+00:00
url: /unit-testing-check-your-return-on-investment/
categories:
  - Agile

---
I once asked a team to question everything we do. We ended up with a few suggestions about things we could streamline but I was surprised at how quickly everyone on the team said &#8220;unit tests are good&#8221;.

## Are unit tests good?

I&#8217;m strongly believe that unit tests are critical, but only if they offer a _good_ return on investment. It takes a scary amount of time writing and maintaining a suite of unit tests, so any efficiency savings can really add up.

> Why are you spending time and money writing and maintaining unit tests that are trivial? 

Adam Tibi got me thinking about it a lot recently when I read his post on [not testing MVC controllers][1].

## When are unit tests &#8220;Bad&#8221;

I basically agree with Adam, but applied to every single line of code, not just controllers.

I&#8217;ve seen teams decide a certain % of code coverage is required and then just mechanically write test upon test until that magic number is hit. What&#8217;s the point of unit testing something like a simple wrapper that passes through to another layer. What have you achieved?

I find questioning the ROI of a unit test can also lead to some nice refactoring.

## Summary

Question your return on investment of every unit test you write and maintain. Why are you spending time and money writing and maintaining unit tests that are trivial.

If the unit test is pointless, mark the code under test with some sort of &#8220;ExcludeFromCodeCoverage&#8221; attribute and spend your time, and money, on more important things.

 [1]: http://www.adamtibi.net/06-2013/you-should-unit-test-your-controller-not/