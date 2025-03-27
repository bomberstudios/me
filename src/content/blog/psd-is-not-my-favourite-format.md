---
title: "PSD is not my favourite format"
date: 2025-03-27
description: "An epic rant about the PSD file format"
---

I have a soft spot in my heart for nerd humour. And this one is a classic I keep referring to, so I thought I’d save it here, for archival purposes.

It comes from the source code of Xee, an image previewer, and was added by someone named “paracelsus”, about 19 years ago.

Without further ado, here’s the world famous “PSD is not my favourite format” rant (with some edits for readability):

> At this point, I'd like to take a moment to speak to you about the Adobe PSD format.
>
> PSD is not a good format. PSD is not even a bad format. Calling it such would be an insult to other bad formats, such as PCX or JPEG. No, PSD is an abysmal format. Having worked on this code for several weeks now, my hate for PSD has grown to a raging fire that burns with the fierce passion of a million suns.
>
> If there are two different ways of doing something, PSD will do both, in different places. It will then make up three more ways no sane human would think of, and do those too. PSD makes inconsistency an art form.
>
> Why, for instance, did it suddenly decide that *these* particular chunks should be aligned to four bytes, and that this alignment should *not* be included in the size? Other chunks in other places are either unaligned, or aligned with the alignment included in the size. Here, though, it is not included.
>
> Either one of these three behaviours would be fine. A sane format would pick one. PSD, of course, uses all three, and more.
>
> Trying to get data out of a PSD file is like trying to find something in the attic of your eccentric old uncle who died in a freak freshwater shark attack on his 58th birthday. That last detail may not be important for the purposes of the simile, but at this point I am spending a lot of time imagining amusing fates for the people responsible for this Rube Goldberg of a file format.
>
> Earlier, I tried to get a hold of the latest specs for the PSD file format. To do this, I had to apply to them for permission to apply to them to have them consider sending me this sacred tome. This would have involved faxing them a copy of some document or other, probably signed in blood.
>
> I can only imagine that they make this process so difficult because they are intensely ashamed of having created this abomination. I was naturally not gullible enough to go through with this procedure, but if I had done so, I would have printed out every single page of the spec, and set them all on fire.
>
> Were it within my power, I would gather every single copy of those specs, and launch them on a spaceship directly into the sun.
>
> PSD is not my favourite file format.

[The source is available at GitHub](https://github.com/gco/xee/blob/master/XeePhotoshopLoader.m#L108), if you want to take a look.
