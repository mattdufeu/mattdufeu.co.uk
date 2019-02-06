---
title: "Convert unix epoch time to DateTime in C#"
author: DuFeu
type: post
date: 2016-02-21T17:22:34+00:00
url: /blog/convert-unix-epoch-time-to-datetime-in-csharp/
categories:
  - .NET
redirect_from:
  - /convert-unix-epoch-time-to-datetime-in-csharp/
---

I recently had to convert unix epoch time to DateTime and like the rest of the world turned to stackoverflow. The top answer is a very simple solution of adding the unix time, which is in milliseconds, to a DateTime of 1/1/1970.

Nothing wrong with that, but it turns out it was added into DateTimeOffset in .NET 4.6:

```csharp
static DateTimeOffset FromUnixTimeSeconds(long seconds)
static DateTimeOffset FromUnixTimeMilliseconds(long milliseconds)
long DateTimeOffset.ToUnixTimeSeconds()
long DateTimeOffset.ToUnixTimeMilliseconds()
```

So now you can do something like:

```csharp
var dateTimeOffset = DateTimeOffset.FromUnixTimeMilliseconds(1454049938871);
var dateTime = dateTimeOffset.DateTime;
Console.WriteLine($"The time is {dateTime}");     // The time is 29/01/2016 06:45:38
```

I can&#8217;t imagine it will make a massive difference to your application whichever way you choose, but I think it&#8217;s really good that little things like this are still being added to the framework after all this time.

## Further Reading

If you&#8217;re really interested, you can look at the [/source][1] and see it&#8217;s pretty much the same thing, but I imagine it&#8217;s slightly more efficient. I guess you could do some metrics, but if converting to and from unix time is the bottleneck in your application I envy you!

[1]: http://referencesource.microsoft.com/#mscorlib/system/datetimeoffset.cs,52ee670254934854
