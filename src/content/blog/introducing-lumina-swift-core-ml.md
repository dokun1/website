---
author: David Okun
pubDatetime: 2018-01-02T00:00:00Z
title: Introducing Lumina - The Fastest Way To Get Started With CoreML On iOS
slug: introducing-lumina-the-fastest-way-to-get-started-with-coreml-on-ios
featured: false
draft: false
tags:
  - swift
  - ios
  - avfoundation
  - lumina
  - programming
description:
  An introduction to a camera framework that should help you go fast.
---

## Table of Contents

## Demo Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/8eEAvcy708s" frameborder="0" allowfullscreen></iframe>

## Re-Writing AVFoundation Code Can Be A Hassle

It's not that `AVFoundation` is bad. `AVFoundation`, in fact, is very very good. Great, even.

However, it's not ideal to have to write the same chunk of code over and over again. In my experience, I've had to do this a lot when it comes to cameras. Having to re-write logic around filtering company names is one thing - this is a bit more...involved.

Then came `CoreML` in iOS 11. This rules! It's put the power of machine learning in the hands of a mobile developer, and it's quite easy to get started. Audrey Tam from [raywenderlich.com](https://www.raywenderlich.com/u/audrey) wrote a really great tutorial on getting started with `Vision` and `CoreML`, and you can read it [here](https://www.raywenderlich.com/164213/coreml-and-vision-machine-learning-in-ios-11-tutorial).

As neat as this tutorial is, I still was struck by how much code you had to write in order to get to a place where you can recognize a single still image. This is where my framework, [Lumina](https://github.com/dokun1/Lumina) comes in.

## What Does Lumina Do?

Lumina can be a drop-in camera framework for you in apps that need iOS 10 or above. Aside from `CoreML`, its features are:

- configurable pinch to zoom
- video & still image capture
- image streaming via delegate (for post-processing)
- live photo capture
- configurable frame rate
- QR code/barcode/face detection
- capture & stream `AVDepthData` (for iOS 11)
- configurable text prompt view
- configurable logging

I still have many features I'd like to add over time, such as configurable exposure, white balance, and others! If you'd like to contribute, feel free to dive in.

## Ok But...CoreML?

So here's what my favorite part of working with Lumina has been. Let's say you made an instance of Lumina like so:

```swift
let camera = LuminaViewController()
camera.delegate = self
present(camera, animated: true)
```

Now let's say you have a model called `MobileNet.mlmodel` that you want to stream the video frames from Lumina through. After you import that model to your Xcode project, here's all you have to do to get it streaming frames:

```swift
camera.streamingModelTypes = [MobileNet()]
```

That's it! You've done the heavy lifting! Now, results will be streamed back through this function in your delegate:

```swift
func streamed(videoFrame: UIImage, with predictions: [([LuminaPrediction]?, Any.Type)]?, from controller: LuminaViewController) {
    print(predictions!)
}
```

Since this framework is written to work with iOS 11.0 and above, you'll have to iterate through the tuple `predictions` to see which model your results are associated with, but this means you can load as many models as you want into Lumina, and each video frame will be processed through the collection of models.

## Conclusion

I released a video that walks through how to set up and use Lumina. You can watch it again here:

<iframe width="560" height="315" src="https://www.youtube.com/embed/8eEAvcy708s" frameborder="0" allowfullscreen></iframe>

Please feel free to check the repository [here](https://github.com/dokun1/Lumina) if you want to check the progress of the framework, or if you want to help out - I'd love to see other contributors hop on!