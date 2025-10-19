---
title: Shot!
description: A Chrome extension to take browser screenshots
layout: "@layouts/Page.astro"
---

## A Chrome extension to take browser screenshots

I take *lots* of screenshots of my browser daily. I was not happy with any of the tools I was using for that, so I decided to make my own.

Shot! is the easiest, fastest way to get a PNG file of your browser content.

It is intentionally simple, so it is defined by the things it does *not* do:

- It only supports Chrome (although it may support Firefox and Safari at some point)
- It only saves screenshots in PNG format
- The output filename is not customizable
- The save path cannot be changed: it's your `Downloads` folder
- Also, while it says that Full Page support is coming, it may never make it to the extension because I don't really use it that much
If your use case is different, this may not be your best option.

Things I _may_ add:

- The ability to save a screenshot with only one click on the extension icon
- Full page capture (once Chrome supports [captureTab](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/captureTab), probably…)
- One-click resizing, using buttons instead of a `<select>`
- Custom presets for sizes

[Download Shot! from the Chrome Extension Store](https://google.com)
