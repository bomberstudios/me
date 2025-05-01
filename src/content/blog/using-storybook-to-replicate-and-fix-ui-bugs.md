---
title: "Using Storybook to replicate (and fix) UI bugs"
date: "2025-04-30T09:47:13Z"
---

[Storybook](https://storybook.js.org) is an amazing tool. But I feel it's terribly underused (at least in my experience). I'm not talking about its great testing features (including a [soon to be improved accessibility testing addon](https://storybook.js.org/blog/preview-the-new-accessibility-addon/)), but something more mundane that's a great use case for the tool: **debugging and fixing UI bugs**. It's one of the "free" features we get from Storybook's main selling point: ["build UI components in isolation"](https://storybook.js.org/docs/get-started/why-storybook).

Even though they clearly explain the benefits of using Storybook this way on their website, the truth is it's hard to come across examples of this in the real world. So I thought I'd contribute one myself. This example is inspired by a real (and way more complex) bug report we received a few weeks ago. I'll share more details about the original report at the end of the post.

## The problem

You got a bug report about your UI. It happens under very specific circumstances, and replicating those in your app is not trivial. You need to log in, click somewhere, set things up in a very specific way, and all that state is lost whenever you refresh your browser to test any changes you make in your code to check if the bug is fixed.

We've all been there, and _it sucks the fun out of our job_.

Let's see how this process can be way more rewarding when using Storybook to replicate and fix the issue.

## Hello, Avatar bug

Picture this: we have a design system with an `<Avatar>` component. We got a call from an angry customer, complaining about their beautiful face being cropped in some part of our app. We spend some time hunting for the bug, and determine that the cause is that we're sometimes rendering the Avatar inside a container that's smaller than the Avatar itself. For our customer, that happens when they use our app in an old phone that has a weird screen size.

Let's fix this by replicating the failing scenario in Storybook.

This is how the Story for our Avatar component looks like at the moment:

```tsx
import { type Meta, type StoryObj } from "@storybook/react";

import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Avatar",
  component: Avatar
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    image: "https://i.pravatar.cc/?img=7",
    size: 32
  }
};

export const Large: Story = {
  args: {
    image: "https://i.pravatar.cc/?img=7",
    size: 64
  }
};

export const Huge: Story = {
  args: {
    image: "https://i.pravatar.cc/?img=7",
    size: 128
  }
};
```

Good for us, we had the foresight of having different stories for different sizes of the Avatar. Sadly, they're all rendered in isolation, so we never got a chance to catch the bug before it hit our customer.

## Enter Storybook Decorators

Storybook has many features designed to help you simulate different scenarios. One of them is [Decorators](https://storybook.js.org/docs/writing-stories/decorators).

Decorators allow you to render your component inside a container, which is exactly what we want to do in this case.

Luckily, we can use a Decorator to wrap our Avatar component in a smaller element that clips it. We'll add a new Story that looks like this:

```tsx
export const WithinASmallContainer: Story = {
  args: {
    image: "https://i.pravatar.cc/?img=7",
    size: 128
  },
  decorators: [
    (Story) => (
      <div style={{
        width: "64px",
        height: "64px",
        overflow: "hidden"
      }}>
        <Story />
      </div>
    )
  ]
};
```

And, bingo, this is what we get in our Storybook:

![Storybook Clipped Avatar](@images/storybook-clipped-avatars.png)

We are now ready to fix the issue like a pro, with all the tools Storybook gives us (auto reloading, etc…).

## The fix

In this case, the problem was caused by a `max-width: initial` in the CSS for our component, that was added to make sure the image did not inherit any value from the global stylesheet in the Design System's theme.

Changing that code to `max-width: auto` fixed the issue, as we can see on this screenshot:

![Storybook Unclipped Avatars](@images/storybook-nonclipped-avatars.png)

What's even better: we can now commit the updated Story to our repository. This has (at least) two benefits:

- **Everyone knows this is an expected behavior**. In the future, when someone inevitably asks if the Avatar scaling down to the container size is a bug or a feature, we have a Story that says this was intentional. Bonus points if you leave a link to the original bug report, or the issue number where this was fixed, for extra context.
- **It won't happen again accidentally**, if you combine Storybook with a visual regression tool like [Percy](https://percy.io), [Chromatic](https://www.chromatic.com), or others.

## Real world example

As I explained at the beginning of the post, the Avatar example was inspired by an actual (and way more convoluted) report we got. I'm sharing the details because it shows a technique we did not use in the first example: creating fake data to populate a component.

In our app, we have a (custom) dropdown component where we list user workspaces. If a user happens to have *lots* of workspaces (15+), *and* a very small screen (less than 800px pixels of available vertical space), the dropdown is clipped in a way that makes it unusable because it doesn't scroll. I promise there was a reason for not scrolling that component. Not a very good one, maybe, but it was definitely not an accident that it worked that way.

<aside>
Before you ask: yes, this was a side effect of not using a native UI component, but let's not get into that issue here 😅
</aside>

Due to the way our system is set up, replicating that scenario in a production or development environment is quite tedious (understatement of the week). But as it turns out, it's trivial to fake it in Storybook: we just have to write a new Story for the component that sets up an environment where the bug is triggered regardless of screen size. It doesn't even require access to the app!

It took me a few minutes to add a decorator that simulates the height issue, and fake content to trigger the clipping issue. Now it was trivial to share the context and replication of the bug with other developers, and pair with them to find a solution. Bonus points: you don't need to write a long explanation of the bug, because it's right there in code, ready to fix.

```tsx
// Fake data to populate the Dropdown component:
const options: DropdownOption[] = Array.from({ length: 20 }, (_, index) => ({
  name: `Option ${index}`,
  value: `option${index}`
}));
options.push({
  name: "Last option",
  value: "lastOption",
  isSelected: true
});

export const WithScrollingContent: Story = {
  args: {
    options: options
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "30ch",
          height: "20ch",
          overflow: "scroll",
          backgroundColor: "#333"
        }}
      >
        <div style={{ height: "30ch" }}>
          <Story />
        </div>
      </div>
    )
  ]
};
```

## Share your stories! (pun _totally_ intended)

As I said, I haven't seen a lot of these in the wild when browsing other people's Storybooks (yes, that's something I do sometimes, for fun).

A possible explanation is that a Story like this, while incredibly useful to fix a bug, may not be worthy of living forever in your Storybook.

In any case, if you have similar examples, please share them! I'll be happy to link to them here if you ping me on [Mastodon](https://mastodon.online/@bomberstudios) or [Bluesky](https://bsky.app/profile/bomberstudios.com).

With that, thanks a lot for reading, and have a great day 🦄
