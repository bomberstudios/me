---
layout: post
title: Deleting completed tasks from Apple Reminders
date: 2015-12-16
redirect_from:
  - /post/135312772222/deleting-completed-tasks-from-remindersapp
  - /post/135312772222
---

I am a big fan of scriptable apps: if they don’t do what you need, you just tell them how to do it : )
I use Apple’s Reminders a lot. My needs are basic, and it gets the job done nicely.

However, one of my lists is a shared grocery shopping list, and after a few months of use the amount of ‘completed’ items was a bit high. Apple does not provide a ‘Clear Completed Tasks’ feature in Reminders, but since they made it scriptable I did what any hacker would do after searching Google for an answer and not finding it: I wrote a script to clear them : )

Just open Script Editor.app, set the language dropdown to 'JavaScript’, paste this code and save it as `Clear Completed` in `~/Library/Scripts/Applications/Reminders/`:

```js
var app = Application('Reminders')
app.delete(app.reminders.whose({
  completed: true
}))
```

Then you’ll need to open Script Editor’s preferences and enable 'Show Script menu in menu bar’.

From now on, you’ll have a new menu item in your menu bar: the Script menu. If you now open Reminders, you’ll see a ‘Clear Completed’ item there. Just select it, and watch your completed tasks disappear : )

## Update August 2019

If you want to do this on your iOS device, it’s as easy as opening the Shortcuts app and creating a flow like this:

![Clear Completed Reminders](/images/clear-completed-reminders.png){:height="auto" width="375px"}

Tags: scripting javascript osx automation
