---
title: "Generating brown noise"
date: "2025-01-14T15:40:17Z"
---
I recently read that background brown noise helps with focus and anxiety, so *of course* I am testing that hypothesis on myself.

A quick search reveals that it’s not easy to find a brown noise generator that’s not monetised in some way, so I thought I’d share one of my finds: [brown-noise](https://github.com/ulsc/brown-noise).

It’s an open source command line tool that does one thing and stays out of the way. It’s written in Go, and if you feel like tweaking the code there’s not a lot of it so it’s not hard.

I changed it to output 96 kHz (because why not, since my headphones support that) and made the output buffer a bit bigger to avoid a small cracking noise I was getting. I also changed the `alpha` value from the default (0.01) to 0.005 because it sounds nicer for me personally, but your mileage may vary.

It’s too soon to say if brown noise is really the panacea I’ve read it is, but I’ll report back with my experience as soon as I reach any conclusions.
