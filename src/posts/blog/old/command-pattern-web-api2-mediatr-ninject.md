---
title: Command Pattern in Web API2 with MediatR and Ninject
author: DuFeu
type: post
date: 2017-03-07T22:06:34+00:00
url: /blog/command-pattern-web-api2-mediatr-ninject/
categories:
  - .NET
description: In this post I show how to use the Command Pattern in Web API 2 with MediatR and Ninject.
excerpt: <p>I ran across <a href="https://github.com/jbogard/MediatR">MediatR</a> the other day while looking into the <a href="https://  en.wikipedia.org/wiki/Command_pattern">command pattern</a>. I’ve been working a lot with micro-services. So I wanted to see how I could use the  <strong>Command Pattern in Web API 2 with MediatR and Ninject</strong>.</p>
---

I ran across [MediatR][1] the other day while looking into the [command pattern][2]. I&#8217;ve been working a lot with micro-services. So I wanted to see how I could use the **Command Pattern in Web API 2 with MediatR and Ninject**.

## Project Configuration

From the [project wiki][3], it seems Jimmy Bogard prefers StructureMap as a DI container. I&#8217;ve been mostly using Ninject and the documentation wasn&#8217;t quite as clear.

Rather than showing the least amount of code, let&#8217;s create a new project and send an example command.

Step 1 &#8211; Start a New ASP.NET Web Application and make sure Web API is selected.

Step 2 &#8211; Installing NuGet Packages

Install the following NuGet packages

- Ninject.Web.WebApi.WebHost
- MediatR
- Swashbuckle

We don&#8217;t need Swashbuckle, but it makes it a _lot_ easier to test.

## Using MediatR

I&#8217;ll show a trivial example that negates the command passed in. Your real world usage will be more complex. But this will show the technology without complicating the example.

Step 1 &#8211; Create a IRequest object

Objects that implement the IRequest interface represent _Commands_. Create a simple class called `CommandExample` like:

```csharp
public class CommandExample : IRequest<bool>
{
    public bool NotMe { get; set; }
}
```

Step 2 &#8211; Create a Handler

Handlers should implement `IRequestHandler<in TRequest, out TResponse>`. Where TRequest is the type of object we created in step 1 and TResponse is the type you want the handler to return.

So, for us, TRequest is `CommandExample` and as we&#8217;re negating the bool passed in, TResponse is `bool`. So create a new class called `CommandExampleHandler`:

```csharp
public class CommandExampleHandler : IRequestHandler<CommandExample, bool>
{
    public bool Handle(CommandExample message)
    {
        return !message.NotMe;
    }
}
```

And that&#8217;s it for the plumbing of MediatR. We have now implemented with command pattern.

But before this will work, we need to configure our DI container, in my case Ninject.

## Ninject Configuration

I struggled with this as I couldn&#8217;t find any clear examples. The project github repos has an example, but I couldn&#8217;t get it to compile . When I finally did, it didn&#8217;t work. I failed to use Ninject.Common.Extensions , but the below definitely works.

First, take a copy of <https://github.com/jbogard/MediatR/blob/master/samples/MediatR.Examples.Ninject/ContravariantBindingResolver.cs>.

Then, in `App_Start/NinjectWebCommon.cs` add the following to `RegisterServices`

```csharp{4}
kernel.Components.Add<IBindingResolver, ContravariantBindingResolver>();
kernel.Bind<IMediator>().To<Mediator>();

kernel.Bind<IRequestHandler<CommandExample, bool>>().To<CommandExampleHandler>();

kernel.Bind<SingleInstanceFactory>().ToMethod(ctx => t => ctx.Kernel.TryGet(t));
kernel.Bind<MultiInstanceFactory>().ToMethod(ctx => t => ctx.Kernel.GetAll(t));
```

Note the highlighted line. It is specific to the command and handler classes we created above. Change them for your classes if you&#8217;re not following along.

All that&#8217;s left is using our commands in our Web API 2 application.

## Web API 2 controller

I intend to call mediator from within my controllers. It doesn&#8217;t have to be there, but I like to keep [thin controllers][4].

For this example, I updated the `ValuesController`. First, create a constructor that takes `IMediator` as an argument and sets a field.

```csharp
private IMediator _mediator;

public ValuesController(IMediator mediator)
{
    _mediator = mediator;
}
```

Then, in my case, I updated the POST action method to

```csharp
// POST api/values
public async void Post(CommandExample message)
{
    response = await _mediator.Send(message);
    return;
}
```

As you can see, we now have a nice thin controller. Note, the use of async and await.

Let&#8217;s make sure it works.

## Confirming It Works

This is where Swashbuckle comes in handy. Set a breakpoint in the POST action method and press F5. Navigate to http://localhost:&lt;port&gt;/swagger and expand Values and POST. Fill out the message like below

![MediatR Swagger Post](../../../images/2017/03/MediatR-Swagger-Post.png "MediatR Swagger Post")

Click &#8220;Try it out!&#8221; and you should be able to step through the code. Travelling through your handler. And finally back to the controller to see the value passed in negated:

## Conclusion

MediatR is a small library, but makes adding the command pattern to your .net projects simple. Getting Ninject working was a little harder than I expected, but nothing too hard. Give it a try and let me know if I&#8217;m missing a trick.

[1]: https://github.com/jbogard/MediatR
[2]: https://en.wikipedia.org/wiki/Command_pattern
[3]: https://github.com/jbogard/MediatR/wiki
[4]: https://www.slideshare.net/damiansromek/thin-controllers-fat-models-proper-code-structure-for-mvc
