---
author: David Okun
pubDatetime: 2018-01-18T00:00:00Z
title: Kitura 2.0 - Taking Advantage of Codable Routes
slug: kitura-2-taking-advantage-of-codable-routes
featured: false
draft: false
tags:
  - swift
  - kitura
  - programming
  - ibm
  - server
description:
  Learn how to use Codable and Kitura for a clean server interface.
---

> This is mirrored from the [IBM Cloud Blog](https://www.ibm.com/blogs/bluemix/2018/01/kitura-2-0-taking-advantage-of-codable-routes/)

## Table of Contents

## A Swift evolution

Swift on the server remains a fresh frontier for the primarily-mobile programming language. Though the language itself is evolving at a rapid pace, the server side segment of the language is beginning to see an increase in adoption.

Keeping in line with Swift's evolution, IBM's Server Side Swift framework, Kitura, has taken the next step in its own evolution. Kitura 2.0 comes with a number of improvements over its predecessor - a handy CLI, commercial support, KituraKit - but none more impactful than Codable routes.

## What does Codable mean?

It's not as fishy as it might sound to a Swift novice - it dramatically simplifies how you implement routes in Kitura. [Codable](https://developer.apple.com/documentation/swift/codable) is a new protocol that was introduced in Swift 4. Its purpose is to allow you to create any model object that is both encodable and decodable into and out of JSON, or any external representation.

JSON parsing has always been difficult, if not at least roundabout in Swift - the Codable protocol aims to make it a much easier operation to complete, avoiding the `JSONSerialization` class altogether.

## Can you show me how?
Let's assume you have a struct called `Acronym`, defined like so:

```swift
struct Acronym: Codable {
    var id: String?
    var short: String
    var long: String
}
```
In order for Codable routing to work, the object in question must conform to `Codable`, which is, in reality, a typealias of the combined protocols `Encodable` and `Decodable`. Conforming to these protocols means that the Swift runtime will be able to serialize the object into JSON, using the property names as tags, and back from JSON into a model object representation.

Let's look at an example of a basic `GET` route for your `Acronym` object from the previous version of Kitura:

```swift
router.get("/acronyms", handler: getAcronyms)

func getAcronyms(request: RouterRequest, response: RouterResponse, next: @escaping () -> Void) throws {
    Acronym.Persistence.getAll(from: database) { acronyms, error in
        defer {
            next()
        }
        guard let acronyms = acronyms else {
            response.send(JSON: ["error" : error?.localizedDescription])    
        }
        response.send(JSON: ["acronyms" : acronyms.json])
    }
}
```

Let's examine what this route is doing. If a client makes a `GET` request to this API at `/acronyms`, it calls the `getAcronyms` function, that you have designated as its handler. You then use a function on the `Acronym` type to get all acronyms you have saved to your database, aptly named `database`. This closure returns an optional collection of acronyms, and an optional error. You parse through them, send either the error or the acronym array back in the response, then call `next()` and you're all set.

This is a fair approach to handling a `GET` request for a particular type, and if you've ever used Express.js, then this will seem quite familiar to you.

Now, let's take a look at how that same API call can be done with Codable routing:

```swift
router.get("/acronyms", handler: getAcronyms)

func getAcronyms(completion: @escaping ([Acronym]?, RequestError?) -> Void) {
    Acronym.Persistence.getAll(from: database) { acronyms, error in
        return completion(acronyms, error as? RequestError)
    }
}
```

Quite literally, Codable routing allows you to handle this `GET` request in half the amount code. You designate the route handler function just like before, and then call your function to get your acronyms from your database. The only difference is that Kitura will handle the response serialization for you now.

Cool, right?

## What's happening under the hood?

Let's take a look at the pre-requisites for a JSON route to be considered Codable:

- the object being transferred must conform to the `Codable` protocol
- the request must include the header `Content-Type: application/json` 
- a body-parser cannot be used

This means you have to consider how your requests are being made from a web front end. Previous tutorials using a basic HTML form allowed you to just specify the REST verb and the API path, but including the content type is paramount now. For example, let's say you also declared a route to add a new `Acronym` via a POST. Here's how you would form your `XMLHTTPRequest` in your web front end:

```javascript
function submitForm() {
    var short = document.getElementById("shortField").value;
    var long = document.getElementById("longField").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/acronyms");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            location.reload();
        }
    }
    xhr.send(JSON.stringify({ "short": short, "long": long }));
}
```

Once you make this call, this function gets called in Kitura:

```swift
public func post<I: Codable, O: Codable>(_ route: String, handler: @escaping CodableClosure<I, O>) {
    postSafely(route, handler: handler)
}
```

Passing in your generic input JSON and output type expectation, this leads you to the culmination of our bullet list above, called at the very beginning of `postSafely`:

```swift
guard self.isContentTypeJson(request) else {
    response.status(.unsupportedMediaType)
    next()
    return
}
guard !request.hasBodyParserBeenUsed else {
    Log.error("No data in request. Codable routes do not allow the use of a BodyParser.")
    response.status(.internalServerError)
    return
}
```

We won't dive into the specifics of `isContentTypeJson` and `hasBodyParserBeenUsed`, but you can take it on fair authority that they do what they say they do!

## Neat - how can I get started?

We've built a tutorial entirely predicated on the use of Codable routes - [FoodTracker](https://github.com/IBM/FoodTrackerBackend). You can clone the repository and follow along with the entire tutorial to get your own Swift API up and running in no time with Codable routing.