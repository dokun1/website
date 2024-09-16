---
author: David Okun
pubDatetime: 2014-03-06T12:00:00Z
title: How A Countdown Label Works In Objective-C
slug: how-a-countdown-label-works-in-objective-c
featured: true
draft: false
tags:
  - objective-c
  - code
  - programming
description:
  This is from a blog I started back in 2014, when I aimed to teach Objective-C to people who were totally unfamiliar with programming. It's verbose, and I'm sorry, but also I am not sorry.
---

Welcome! I'll explain more about my overall goal in another post, but I'd like to hit the ground running. 

I'll be showing you a chunk of code every week, and taking the time to break it down and explain exactly what it does. The goal is to have someone who has never written code understand what's going on. I don't ever want to confuse you, so I promise to never: 

- show you code blocks that are longer than 50 lines
- give you some long tutorial about how to build entire applications

This week, I'll be showing you what happens when you want a label to show a countdown that updates every second. 

```objc
-(void) updateCountdown {
    NSTimeInterval timeToClosing = [_deleteDate timeIntervalSinceDate:[NSDate date]];
    
    div_t h = div(timeToClosing, 3600);
    int hours = h.quot;
    div_t m = div(h.rem, 60);
    int minutes = m.quot;
    int seconds = m.rem;
    
    NSString *hoursStr, *minutesStr, *secondsStr;
    if (hours < 10) {
        hoursStr = [NSString stringWithFormat:@"0%d", hours];
    } else {
        hoursStr = [NSString stringWithFormat:@"%d", hours];
    }
    if (minutes < 10) {
        minutesStr = [NSString stringWithFormat:@"0%d", minutes];
    } else {
        minutesStr = [NSString stringWithFormat:@"%d", minutes];
    }
    if (seconds < 10) {
        secondsStr = [NSString stringWithFormat:@"0%d", seconds];
    } else {
        secondsStr = [NSString stringWithFormat:@"%d", seconds];
    }
    if (seconds < 0) {
        [self dismissButtonTapped];
    } else {
        self.countdownLabel.text = [NSString stringWithFormat:@"%@:%@:%@", hoursStr, minutesStr, secondsStr];
    }
    if (timeToClosing <= 30) {
        [_switchTimer invalidate];
        _switchTimer = nil;
        [UIView animateWithDuration:0.7
                         animations:^{
                             self.eventEndsLabel.alpha = 0.0f;
                             self.countdownLabel.alpha = 1.0f;
                         }];
    }
}
```

<!-- ![](/img/2014-03-06/fry.png) -->
![An image of Fry from futurama, squinting](@assets/images/2014-03-06/fry.png)

So! This is pretty intimidating at first. I'm going to make it as easy to understand as spoken word. Strap in. 

Let's start with the first line...
```objc
-(void)updateCountdown {
```
...wait - what did I even show you? A rule of thumb is that any block of code I ever show you will be a 'method'. Think of this as an action that the program can do. I can make up things that exist in the program, but what good are they if they can't do anything? They have many names (pointers, vars, ivars, etc.) but we'll call them 'things' for now. In a program, 'things' have to 'do' stuff, and when you tell a 'thing' to 'do' something, you are 'invoking a method'. A method is simply a directive for a 'thing' to do.

Let's look at the 'void' part of this method. Think about this - when you ask someone to cook you a cheeseburger, you would expect a cheeseburger in return, right? But if you ask someone to fix something they already own, you would expect nothing in return. If this method was asking for a cheeseburger in return, then you would put a cheeseburger in those parentheses. However, we are asking something that already owns the label to simply update its own content. We aren't asking for anything in return, so we say that by signifying (void) in the method signature.

The open bracket signifies the beginning of the method. You can tell when a method ends by searching for the ending bracket. Brackets are used commonly in code, so you have to keep track of how many brackets you use in code.

So, a 'thing' wants to update the countdown. Line 2 says...
```objc
NSTimeInterval timeToClosing = [_deleteDate timeIntervalSinceDate:[NSDate date]];
```
`timeToClosing` is the name of the variable I have created. Everything to the left of the equal sign is for saying that there is a 'thing' of a 'type'. The 'thing' is called `timeToClosing`, and the 'type' is `NSTimeInterval`. `NSTimeInterval` is a type of 'thing' that is measured in seconds. I will need this later!

Everything to the right of the equal sign is how I figure out what the 'thing' will be defined by. `_deleteDate` is a 'thing' that already exists in my program. `timeIntervalSinceDate:[xxxxxxx xxxxx]` simply tells me how to calculate it based on `_deleteDate`. This is another example of a method, that returns a 'thing' of type `NSTimeInterval`. So when this line of code runs, I get back a `NSTimeInterval` to work with. When you see `[NSDate date]`, just assume that it invokes a method to get the current date in a format that's easy for the computer to understand. So we can say that `timeToClosing` is equal to a value that is in seconds from the current date to the value `_deleteDate`, which has already been set as a type of `NSDate`, which is a type of date.

Now we have THIS mess:
```objc
    div_t h = div(timeToClosing, 3600);
    int hours = h.quot;
    div_t m = div(h.rem, 60);
    int minutes = m.quot;
    int seconds = m.rem;
```    
As you might have guessed, `div_t` and `int`  are types of 'things'. To get super technical, they are basic C-level structs, which is a step down from the typical Objective-C code that I write in...

`int` is just an integer. You only give it a number, nothing more.
`div_t` is slightly more complicated. You give a `div_t` 'thing' two values: a dividend, and a divisor. A `div_t` will give you a quotient and a remainder, if you ask nicely.
...when you see something like `div(timeToClosing, 3600);`, that is a way to show you what values you are assigning to a `div_t` 'thing'. The first line is making a `div_t` 'thing' that is called `h`. `h` is created by giving the values of `timeToClosing` and 3600 to a `div_t`, and you can get the quotient and the remainder from that value. Here's some simplification:
```objc
h.quot = the quotient of timeToClosing and 3600
h.rem = the remainder of timeToClosing and 3600
```
This is how we are able to discern the int values of hours, minutes, and seconds.

Here comes the fun part...
```objc
    NSString *hoursStr, *minutesStr, *secondsStr;
    if (hours < 10) {
        hoursStr = [NSString stringWithFormat:@"0%d", hours];
    } else {
        hoursStr = [NSString stringWithFormat:@"%d", hours];
    }
    if (minutes < 10) {
        minutesStr = [NSString stringWithFormat:@"0%d", minutes];
    } else {
        minutesStr = [NSString stringWithFormat:@"%d", minutes];
    }
    if (seconds < 10) {
        secondsStr = [NSString stringWithFormat:@"0%d", seconds];
    } else {
        secondsStr = [NSString stringWithFormat:@"%d", seconds];
    }
```
Let's look at `NSString` first. If you've been reading diligently, you recognize the NS. NS stands for NextStep, which is attributed to the computing company NeXt Computing, which Steve Jobs originally started after leaving Apple, and subsequently got acquired by Apple. NS is a tribute to that.

`NSString` is a type of 'thing' that simply refers to a string of text. For example, you could say...
```objc
NSString *example = @"This is an example of a string.";
```
...you can probably gather what it does at a high level, so you can ignore the other stuff going on there for now, but you should just understand that, when you create a `NSString`, you are creating a string of text that you want to use elsewhere.

In our code example, you see some if-else stuff going on. When you see...
```objc
if (something == true)
```
 ...then that means that, whatever exists past that line of code will happen ONLY IF `something` is true. In our example, we've already got a number for `hours` assigned, and we are looking to see if it is less than 10 or not. If it is, infact, less than 10, as our code describes, then we assign the following value to `hoursStr`, which we have declared as a `NSString`...
```objc
[NSString stringWithFormat:@"0%d", hours];
```
 Don't be scared! Let's look at everything inside the `@" "` marks. For right now, think of a string of text that the computer understands is `@"string of text"`...

I say tomato...
...the computer says `@"tomato"`

When you tell the program to do: `[NSString stringWithFormat:@" "];`, that simply means you are making a string of text look exactly the way you want it to. Inside that `@" "`, you will often see a `%` sign followed by either the `@` sign or a letter (usually f or d). Our example of `0%d` means that you want to make a string that starts with the text "0" and then substitutes an `int` thing that we already created. You can see that we use hours, something we created earlier, to substitute. This method CAN get more complex, but this lays the basic foundation for how it works. So, if, in our example, `hours = 9`, then `hoursStr = @"09"`.

Ok, cool story bro, but what if `hours = 13`?
```objc
else {
        hoursStr = [NSString stringWithFormat:@"%d", hours];
}
```
In this case, per our previous example, we would just create a string formatted according to the rules we created. Since there is no 0 in front of the `%d`, and the value for hours did not satisfy the if statement earlier, we fall into the else statement. Since `hours = 13`, `hoursStr = @"13"` in our situation. This applies for the next few lines of our example as well.

We're close! Two more code examples from our block...
```objc
    if (seconds < 0) {
        [self dismissButtonTapped];
    } else {
        self.countdownLabel.text = [NSString stringWithFormat:@"%@:%@:%@", hoursStr, minutesStr, secondsStr];
    }
```
If the number of seconds we have is less than 0, we want to 'call' a method called `dismissButtonTapped`. For posterity, this countdown timer determines how long you have to view a screen, and when the timer is up, you can no longer view the screen. Therefore, the time being up forces the user to dismiss the screen and no longer be able to view it. However, if the value for seconds is greater than zero, which it usually will be, as I am updating my timer every second, then I update the value of a thing called a `UILabel` I created earlier called countdownLabel. A `UILabel` contains a `NSString`, and I can access that by writing the `.text` property of it. Don't worry about the `self` part for now - just assume that we are talking about a label contained in the screen we are looking at.

When seconds is not less than zero, we update the label to show the proper kind of string with our hours, minutes, and seconds value, as calculated above. We do the math ahead of time so creating our string is nice and easy.

Last bit!
```objc
    if (timeToClosing <= 30) {
        [_switchTimer invalidate];
        _switchTimer = nil;
        [UIView animateWithDuration:0.7
                         animations:^{
                             self.eventEndsLabel.alpha = 0.0f;
                             self.countdownLabel.alpha = 1.0f;
                         }];
    }
```
In terms of necessity, this is purely optional, and only valuable to the code I've written in the rest of the app, but I'll explain a little. I make sure that the countdown timer and a message explaining the countdown timer alternate in visibility, and when we get to less than 30 seconds, I only want the user to see the countdown timer. I use an `NSTimer` called `_switchTimer` to display the two in succession, and at < 30 seconds, I no longer want to switch.

Finally, the `.alpha` property is how visible something is. For instance, if a `UILabel` has an `alpha` of `1.0f`, it is 100% visible. If a `UILabel` has an `alpha` of `0.0f`, it is 100% **in**visible. Don't stress too much over the `UIView` gobble-de-gook for right now, but assume that it is a fancy way for me to make `eventEndsLabel` invisible, and `countdownLabel` totally visible.

Whew! You made it! I hope I was able to make sense of this for you. I promise to try and keep it simple for you at all times. Feel free to correct me with a comment, or email me a suggestion here with a code block to explain. Thanks for reading!