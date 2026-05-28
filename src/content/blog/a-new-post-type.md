---
title: A new post type
date: 2026-05-28T16:43
description: Introducing a small experiment on my blog to share sport activities
---

If you've subscribed to this blog's RSS feed, you have probably seen a couple of new entries, named "Activity: Whatever…".

They're part of an experiment I'm doing to share some details about my sport activities, without giving out too much information (and without having to sell my soul to Strava or similar services).

This is how the (SVG) images for each activity are generated, if you're curious about it:

- First, I go out in the world and do an activity (which is, to be honest, the best part of the whole project!). I record the data with a Garmin Fenix 6 (running, hiking), or a Garmin Edge 540 (anything with wheels)
- The activity data is automatically uploaded to Garmin's servers
- Then, I download a [GPX file](https://en.wikipedia.org/wiki/GPS_Exchange_Format) from Garmin Connect, with all the information from that activity. GPX is an open, XML format, and contains GPS information and other interesting data, like speed, heart rate, etc…
- Because I don't want to share my exact location with the world, I process the GPX files locally, and convert them to an anonymized list of points in JSON format. I store the JSON files on the repo for this blog
- A small bit of code tells Astro to turn those JSON files into SVG data, which I use for the posts in the blog and the data in the RSS feed

Some details about why the SVG looks like it does:

- The activity route is split into small, linear paths
- Each path is colored according to the recorded speed (blue: slow, red: fast)
- The width for each path also depends on speed (thicker is faster, but there's some randomness throw in to make things more interesting visually)
- Every stroke extends a bit beyond its actual start and end points, to give the route a nicer, pseudo-hand-sketched look. This also applies to the stroke opacity: fully opaque lines were a bit boring, so I made them semi transparent to get a watercolor-like texture

You can take a look at the results here: [Activity: eMTB on May 26th, 2026](/activity-23018102369/).
