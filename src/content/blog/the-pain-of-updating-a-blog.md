---
author: David Okun
pubDatetime: 2018-07-29T00:00:00Z
title: The Pain of Updating a Blog
slug: the-pain-of-updating-a-blog
featured: false
draft: false
tags:
  - meta
  - blog
  - programming
description:
  Struggling with the basics, back in the day.
---

Finally!!!

Tech debt is one thing, but when it's something you care personally about, it's insidious at worst. I've not been doing a good job keeping this here web log updated, but I finally had some time (and some help!) to do it this weekend while at an event in San Francisco, and I'm thrilled I automated some things.

## Thank Yous

I really need to give major props to [Erin McKean](https://twitter.com/emckean) and [Tim Robinson](https://twitter.com/timroexp) for helping me get over the hump. Their tremendous calmness and poise helped me get out from behind the 8-ball, and helped me serve as the basis for this post, as well as what I am hoping will be more material in the future!!

## The Problem

I use [HostGator](https://hostgator.com) for my web hosting, and while I work for [TEH CL0UD](https://www.ibm.com) and could probably do something different, I'm stuck in my ways here. About a year ago, I finally got used to using [Jekyll](https://jekyllrb.com) for my website, and for the most part it's been working great. I've never been a *huge* fan of Ruby, but this definitely gets the job done.

You can always see a local mirror of this website [here](https://dokun1.github.io) as well as the repo for this site [here](https://github.com/dokun1/dokun1.github.io), but I wanted it on my actual domain, and I wanted to not limit myself to a GitHub page. That meant I was building my site with Jekyll on my machine...and manually FTP'ing the generated site to my host via Cyberduck...

<p align="center">
    <img src="https://media.cyberduck.io/img/cyberduck-icon-384.png"/>Can't bounce any new ideas off this one...
</p>

Furthermore, I had some issue with Jekyll that made things look UGLY unless I manually went in and changed things to remove a fledgling comment line. I'm not even going to post a photo of it here, because the sooner I can forget about it, the better.

## The Solution

Well, Erin was gracious enough to sit with me and point out where the bug was coming from. Sometimes, you feel dumb when you see a solution to a bug you **should** have fixed 7 months ago, but I was so overjoyed fixing this that I didn't care. Still, the process of updating the blog was a pain, and I had to automate it.

Erin suggested a Travis CI job that uploads it for me. Truthfully, she suggested triggering an OpenWhisk action every time I committed a change to my blog, and using that to upload it to my host. "That would be more bloggable." One day!

First off, `curl` and FTP. I tried uploading one file with `curl`:

```bash
curl -T file.jpg ftp://ftp.okun.io --user $username:$password
```

This works for one file. Want to upload a directory? Too bad. Time to furiously Google things and try them, being able to taste sweet victory not far off.

I tried some things with the `find` command, but largely proved unsuccessful. Then I asked [a question](https://stackoverflow.com/questions/51575574/curl-ftp-for-directory-containing-files-and-directories#51581328) on StackOverflow, and that's where Tim came in. I tried his command on the CLI:

```bash
find _site -type f -exec curl --user $username:$password --ftp-create-dirs -T {} ftp://ftp.okun.io/{} \;
```

I can taste it! So I wrote this into a script on Travis CI, and the file ultimately looked like this:

```yml
script: 
  - bundle install
  - gem install jekyll
  - find _site -type f -exec curl --user $FTPUSERNAME:$FTPPASSWORD --ftp-create-dirs -T {} ftp://ftp.okun.io/{} \;
```

Aaaaaaand...nope. Code 430 errors all around - access denied. Panic. I was so close!!! But then I took a breath, and read a blog post that Tim sent me (which you can read [here](http://ajaykarwal.com/deploying-jekyll-using-travis-ci/)).

If you're reading this, you now know that more than half of all software development is just being really good at searching for things on search engines.

A little bit more work, and ultimately my `.travis.yml` file looks like this now:

```yml
language: ruby
rvm:
  - 2.4.1

install:
  - bundle install
  - gem install jekyll

branches:
  only:
    - master

env:
  global:
    - JEKYLL_ENV=production

notifications:
  email:
    recipients:
      - david@okun.io
    on_success: always
    on_failure: always

script:
  - chmod +x _scripts/build.sh
  - _scripts/build.sh

after_success:
  - chmod +x _scripts/deploy.sh
  - _scripts/deploy.sh

sudo: false
addons:
  apt:
    packages:
      - ncftp
```

And that deploy script? Two lines:

```bash
cd _site || exit
ncftpput -R -v -u "$FTPUSERNAME" -p "$FTPPASSWORD" "ftp.okun.io" ./ .
```

Now, all I have to do is commit to my repo - Travis CI does the rest, and things get updated in about a minute.

Whew! Now I have more to say here. Again, thank you Erin and Tim for your help/rubber-ducking/calmness.