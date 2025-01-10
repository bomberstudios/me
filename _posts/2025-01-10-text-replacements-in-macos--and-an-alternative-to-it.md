---
title: "Text Replacements in macOS, and an alternative to it"
date: "2025-01-10T11:01:38Z"
---
A friend is moving from Linux to macOS on his work laptop. He asked me for some common tools for daily work, and one of them was a text expander tool.

I don’t really use a tool for that.

I’ve been using Apple’s own implementation of this feature, called [“Text Replacements”](https://support.apple.com/en-gb/guide/mac-help/mh35735/mac), for years. I love its simplicity and the fact that it syncs with my iPhone and iPad. This last point is great because some of my replacements are designed to address limitations in text input on Apple’s mobile platforms. I’ll give you an example.

On macOS, typing the ™ symbol is trivial (type ⌥2). But on iOS and iPadOS **you cannot type that symbol** (at least not without an external keyboard). Text Replacements to the rescue: you can create a text replacement for `tm` that replaces it with the ™ symbol.

I have lots of those replacements set up. In fact, I used another one while typing this post, the one that replaces `alt` with ⌥. I have others:

- `shift` → ⇧
- `cmd` → ⌘
- `->` → → (how meta 😅)
- `<-` → ←
- `xx` → ×
- `ooo` → °

I also have replacements for common acronyms, because there is zero reasons to use them in 2025. They were fine when you had to type SMS messages using a T9 keyboard, but the modern world makes that unnecessary (and it’s rude, anyways). I have replacements for basics like `iirc`, `fyi` or `btw`, but also for more obscure stuff like `wwctbwwgt` (‘we will cross that bridge when we get there’, you wouldn’t believe how often I use it).

The main issues with Apple’s Text Replacement are:

- it does not work _at all_ with non-Cocoa apps like Firefox. This is both a problem and a great way to tell which apps are not good macOS citizens. I tend to avoid apps that don’t support native Text Replacement.
- it _sort of works_ with Electron apps like Slack, but only if the app developers make some extra effort to make it work well. Meaning, most Electron apps don't work well.
- sometimes you *really* want to type - without it being replaced with →. It can be done, but it’s not easy (and it’s quite hard to do on iOS and iPadOS).
- the settings are stored _somewhere_ in a binary plist file, which makes it harder to edit them, and really hard to back them up.

I can live with those because my needs are simple. But what if you _really_ want to use Firefox (like my friend does), or need text replacements in your code editor or note taking app that are not written in native frameworks like Cocoa or Swift UI?

Turns out the app my friend was using on Linux, [Espanso](https://espanso.org/), is also available for Mac, and _it is awesome_ (and open source, which makes it extra awesome). I was taking a look at the docs, and I clicked the ‘Download’ button immediately after reading that it supports dynamic replacements. I now have a `:now` snippet that gets replaced automatically with today’s date in YYYY-MM-DD format (the one I use for linking to notes in NotePlan or Obsidian).

Other great Espanso features include:

- it works *everywhere* (and I mean it).
- it’s more explicit that Apple’s Text Replacements (you use `:tm` rather than `tm`), and it cancels the replacement when you type a backspace.
- it supports extensions that add replacements for emoji, arithmetic operations, autocomplete, autocorrect... This thing is _fun_.
- it supports per-app configurations, so you can use different snippets, tweak their output, or even disable Espanso entirely depending on the app you’re using.
- configuration is stored in plain text files (YAML, sadly, but you can’t have it all) and you can change the location of the config folder, so you can store it in Dropbox / iCloud Drive for syncing between computers (as far as I know it has no mobile version).

I don’t think I’ll stop using Apple’s Text Replacement, but I’m definitely keeping Espanso around for more complex use cases that I only need on my laptops. I love that it fills in the gaps of my current setup without completely replacing it.

And with that, I’m out to create some snippets. Have a nice day!
