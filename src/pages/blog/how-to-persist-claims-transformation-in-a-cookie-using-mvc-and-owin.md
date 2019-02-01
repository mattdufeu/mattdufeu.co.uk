---
title: Persist Claims Transformation in a cookie with MVC and OWIN
author: DuFeu
type: post
date: 2016-01-15T07:01:30+00:00
url: /how-to-persist-claims-transformation-in-a-cookie-using-mvc-and-owin/
categories:
  - .NET
---

Claims transformation (or claims augmentation as it&#8217;s sometimes called) in an MVC claims based application is &#8220;easy&#8221;. All you need is a simple piece of code:

````csharp
Principal.Identity.AddClaim(new Claim(ClaimType, "ClaimValue"));
```

Unfortunately, where you add that code isn&#8217;t.

## Options

I found a number of options that worked, but didn&#8217;t behave in the way I needed.

Option 1 &#8211; use a custom [ClaimsAuthenticationManager][1] as detailed on MSDN.

Option 2 &#8211; add the above code into the [Application_PostAuthenticateRequest][2] method of Global.asax

Option 3 &#8211; if you&#8217;re using Owin, to create some [Katana Middleware][3]

## Problem

The problem with all these solutions is the number of times the transformation takes place, i.e. how often that code is executed.

Why would you care about the number of times it&#8217;s called? In all the examples I found, you wouldn&#8217;t, as &#8220;magic strings&#8221; are being added to the claims, and therefore it&#8217;s really fast. In my case, and I&#8217;d imagine most real world cases, you&#8217;re likely to be making an IO bound call to a database or web service to lookup the extra claim. You _really_ don&#8217;t want to be doing that every _single_ page hit.

## Solution

I eventually hit upon the solution with the thanks to a StackOverflow post which [hinted at using the OnResponseSignIn of the CookieAuthenticationProvider][4]

```csharp
Provider = new CookieAuthenticationProvider()
{
    OnResponseSignIn = async context =&gt;
    {
         // Apply Claims Transformation here
    }
}
```

The OnResponseSignIn is the last chance you have to transform the ClaimsIdentity before it is serialized into a cookie during sign in. The code is only executed once, so no need to be concerned about performance when making a call to a lookup service.

 [1]: https://msdn.microsoft.com/en-us/library/system.security.claims.claimsauthenticationmanager(v=vs.110).aspx
 [2]: http://dotnetcodr.com/2013/02/25/claims-based-authentication-in-mvc4-with-net4-5-c-part-1-claims-transformation/
 [3]: http://leastprivilege.com/2013/09/18/claims-transformation-middleware-for-katana/
 [4]: https://msdn.microsoft.com/en-us/library/microsoft.owin.security.cookies.cookieauthenticationprovider.onresponsesignin(v=vs.113).aspx
````
