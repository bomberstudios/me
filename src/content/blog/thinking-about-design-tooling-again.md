---
title: Thinking about design tooling, again
date: 2025-04-19
description: A few thoughts on design tooling.
---

For _reasons_, I am remastering* one of my ancient design projects.

\* _I use the term in the same sense the music industry does: same music, new tools. Not a complete rework, just a bit of fresh paint here and there._

I feel incredibly privileged to have been working long enough in this field to be able to do this kind of thing. Also, I’m grateful to have the time and resources to do this just for myself.

And boy, do I have opinions about the evolution of design tooling…

I’m simultaneously amazed by how much better design tools have gotten, but also can’t believe we’re still dealing with some of the same old shit.

Some things are pure magic when looked at from 10+ years ago.

Some other things make my past self scream in disbelief that this is the state of the art now.

Yes, Autolayout, I’m looking at you.

I understand the market has spoken, and the people with the money demand monolithic apps that do everything. I don’t agree with that logic, but it’s hard to argue with that reality.

However, that has forced us to solve all kinds of problems with a very limited range of metaphors.

It does not help that we keep using the same name for all those different problems.

I get it, “Design” means anything from information architecture to prototyping. But using that as an excuse to cram all the tools into the same app is not helping anyone.

I know I’m alone on this, but I’d love to see what things would look like if we had fully embraced the Unix philosophy (“Make each program do one thing well”).

I wish this was a new realization, but I’m getting old and predictable, and I wrote about this very topic, with pretty much the same opinion, [**12 years ago**](https://www.tumblr.com/bomberstudios/49803458046/now-what) (a copy of that post follows).

Maybe I just need to try harder…

---

## Now what?

> Originally posted on Tumblr on May 7th, 2013

Fireworks is officially dead.

If it caught you by surprise, you weren't paying enough attention, as the writing's been on the wall for the last three releases (CS4 was crap, CS5 added some minor features, and CS6 was nothing more than cosmetic changes).

So now you're wondering: what's next? What tool should I use now that the best tool for the job of screen design is no longer a safe bet?

Here's a thought to get you started: **what if you rethink your process?**.

What you call "screen design" is actually a collection of tasks, and if you think a bit about them you'll see they can be classified in two (rough) groups:

- tasks related to "micro" design (also called "details", "pixel perfect" or "pixel fucking"), and
- tasks related to "macro" design (think "layout", "page design" or "grid hacking")

Fireworks had the rare trait of doing both decently, so it made you forget that they're actually different beasts, but its death signals a good time to think about **different tools for different purposes.**

If this reminds you of the UNIX philosophy of "small tools that do one thing well", it's not a coincidence. I've been thinking long and hard about this for more time than I'm willing to recognize in public, and the only conclusion I've arrived to is this: monolithic tools for design are the wrong choice. Choose one, and once your vendor announces its discontinuation you're doomed.

Having a collection of small tools for different purposes not only keeps you safer, but also allows for incremental improvements of your workflow. Better, faster, cheaper (or even free) tools can replace your original choices, thus letting you improve your process bit by bit.

Yes, it might be a bit more complex. But it pays in the long run. It also saves your ass, as it is much easier to find a replacement for a small tool than for a mammoth like Fireworks or (gasp) Photoshop.

So... what's my current weapon of choice, I hear you ask?

These days I'm quite happy with a combination of Sketch for micro design, and hand-coded HTML for macro design (this is actually an oversimplification, as my workflow is a bit more complex than this, but it helps illustrate the point).

Sketch is not without its faults (it lacks many features I loved in Fireworks, like master pages or a symbol library) but you can overcome most of its limitations using tools intended for "macro" purposes. HTML is a perfect fit, but other options worth considering are InDesign, Illustrator or Axure / OmniGraffle.

If you're not yet ready to make the switch from a monolithic app to a combination of small tools, here's my advice: make backups before every major operating system upgrades. One of them might kill your perfectly useful Fireworks. It happened with Freehand, and still miss it to this day...
