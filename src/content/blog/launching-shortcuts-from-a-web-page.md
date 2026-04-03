---
title: "Launching Shortcuts from a web page"
date: "2026-04-03T09:21:56Z"
---
Today I learnt a new trick (thanks [Jorge Bastida](https://jorgebastida.com/)!): how to launch a Shortcut on iOS or macOS from a link on a web page.

Jorge is using that to open the native timer app from his (pretty cool) recipe site, [fork.club](https://fork.club). But the possibilities are endless.

## How it works

It‘s pretty easy:

1. Create a shortcut in Shortcuts.app and give it a nice name (I'm going to pick ‘Good Morning’, because this shortcut will speak ‘Good morning’ when run)
    
    <img width="954" height="400" alt="Image" src="/assets/posts/2026-04-03-launching-shortcuts-from-a-web-page/15fc4d18-7ed3-455f-a749-d7ddd64cadca" />

3. Add a link on your web page that triggers the shortcut:
 
    ```html
    <a href="shortcuts://run-shortcut?name=Good%20Morning">Good Morning</a>
    ```
3. Click the link, and enjoy the beautiful voice of your computer speaking.

## Getting fancy

You can pass arguments to your Shortcut. In my case, instead of speaking a hardcoded ‘Good morning’, my shortcut could receive the text to be spoken with a link like this:

```html
<a href="shortcuts://run-shortcut?name=Good%20Morning&input=text&text=Good%20Morning,%20my%20friend!">Good Morning</a>
```

We need to change the shortcut a bit to accept the new input:

<img width="954" height="400" alt="Image" src="/assets/posts/2026-04-03-launching-shortcuts-from-a-web-page/12fa9cb5-fea7-45c7-874e-85b04183ae56" />

## Moving forward

For all the details about this feature, check out Apple‘s documentation:

- [Intro to URL schemes in Shortcuts](https://support.apple.com/en-gb/guide/shortcuts/apd621a1ad7a/ios)
- [Run a shortcut using a URL scheme on iPhone or iPad](https://support.apple.com/en-gb/guide/shortcuts/apd624386f42/ios).

Have a nice day!
