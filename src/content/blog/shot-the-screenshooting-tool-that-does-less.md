---
title: Shot!, the screenshooting tool that does less
date: "2025-10-20"
description: "Meet Shot!, the screenshooting tool that does less"
---

I take *lots* of screenshots daily. I use [Shottr](https://shottr.cc) for that, and I absolutely adore it.

However, there is one use case where Shottr wasn't cutting it for me: capturing website screenshots without the browser UI. I find myself needing a basic PNG screenshot of whatever is showing on my browser, multiple times a day, and Shottr is too much for that.

Since I use Chrome for work, I tried a bunch of extensions in the Chrome Store. I was not happy with any of them: they were either too complex, or too ugly, or too cumbersome to use.

So I did what any self-respected hacker would do, and made my own.

Meet **Shot!**.

Shot! is the easiest, fastest way to get a PNG file of your browser content.

It is intentionally simple, so it is defined by the things it does *not* do:

- It only supports Chrome (although it may support Firefox and Safari at some point, since the APIs it uses _seem_ to be compatible with all browsers)
- It only saves screenshots in PNG format
- The output filename is not customizable
- The save path cannot be changed: it's your `Downloads` folder
- Also, while it says that Full Page support is coming, it may never make it to the extension because I don't really use it that much

**If your use case is different, Shot! may not be for you.**

Things I _may_ add:

- The ability to save a screenshot with only one click on the extension icon
- Full page capture (once Chrome supports [captureTab](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/captureTab), probably…)
- One-click resizing, using buttons instead of a `<select>`
- Custom presets for sizes

[Download Shot! from the Chrome Web Store](https://chromewebstore.google.com/detail/shot/ibnboohipcihigpgmoeipajbidjelggf)
