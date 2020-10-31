---
title: Quick start to C# .NET Core with MongoDB in Docker
author: DuFeu
type: post
date: 2020-09-12T12:00:00+00:00
url: /blog/dotnet-core-with-mongodb-in-docker/
categories:
  - Docker
  - .NET
description: In this post I describe how to get started really quickly with MongoDB and .NET Core by using docker.
keywords:
  - Docker
  - .NET Core
  - MongoDB
  - Mongo
  - Quick start
  - Quick start .NET Core with MongoDB in Docker
excerpt: <p>Although I've been using MongoDB for a while, I realised I'd never started a greenfield project. Not wanting to install yet more software on my laptop, I realised this was a perfect fit for Docker.</p><p>Here's a quick start guide to getting C# .NET Core querying a MongoDB docker instance I used to get up and running.</p>
---

All the times I've worked with MongoDB it's been on existing projects. I didn't have to think about the initial setup. I had a rough idea, but I would like to know more.

Being brutally honest with myself, I'm not particularly familiar with how the code side of things hang together either. I'm comfortable querying data, and adding a new property to an existing domain model. But that's quite different to starting a new project.

As I've learned, reading about something and actually doing it are worlds apart. So I wanted to dig a little deeper without installing lots of software. Docker to the rescue.

## Docker Compose

Unsuprisingly, someone has thought about and solved this problem for me already. So I did the following:

1. Made a new directory on my hard drive
2. Created a new file called `docker-compose.yml` and pasted in the yaml from https://hub.docker.com/_/mongo/
3. Ran `docker-compose up -d`

We're living in the future, as I now have two containers running. 1 with MongoDB listening on port 27017. Another with mongo-express (a web based administration UI at http://localhost:8081/), talking to the first:

```powershell
C:\> docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                      NAMES
84d560398e0f        mongo               "docker-entrypoint.s…"   2 days ago          Up 2 days           0.0.0.0:27017->27017/tcp   mongodb_mongo_1
21fd00de630e        mongo-express       "tini -- /docker-ent…"   2 days ago          Up 2 days           0.0.0.0:8081->8081/tcp     mongodb_mongo-express_1
```

## Persistant Storage

If you're not worried about the data, you can skip this bit. I wanted to keep the files Mongo creates, so added a volume to my docker-compose.yml file:

```yaml{3-4}
    ports:
        - 27017:27017
    volumes:
          - C:\MongoDb\data:/data/db
    environment:

```

## Mongo Shell

Again, you may not need this part, especially with mongo express. But if you need to use the [mongo shell](https://docs.mongodb.com/manual/mongo/), you can connect to the container and run bash. The credentials from the docker-compose file make the command:

```powershell
    docker exec -it mongodb_mongo_1 bash
    mongo -u root -p example
```

## .NET Core console app

To make sure we can talk to it programaticaly, I created a _not_ safe for production console app with:

```powershell
    mkdir console
    dotnet new console
    cd console
    dotnet add Console.csproj package MongoDB.Driver
```

And put the following in program.cs:

```csharp
using MongoDB.Bson;
using MongoDB.Driver;

namespace Console
{
    class Sample
    {
        public ObjectId Id { get; set; }
        public string Value { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var client = new MongoClient($@"mongodb://root:example@localhost:27017");
            var database = client.GetDatabase("SampleDb");
            var collection = database.GetCollection<Sample>("SampleDb");

            collection.InsertOne(new Sample
            {
                Value = "SampleValue"
            });

            System.Console.WriteLine("Done");
        }
    }
}
```

Once you run that, use mongo express to confirm you have a new record.

![Mongo Express showing single sample record](../../../images/2020/Mongo-Express-Sample-DB.png "Mongo Express showing single sample record")

## Conclusion

I'm now free to explore and play with Mongo locally and I haven't had to install a thing.

Now that I've done this once, providing I had a fast enough internet connection, I think it would be possible to go from nothing, to a working local development environment within 15 minutes.
