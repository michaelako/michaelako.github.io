# Photos for the 5–9 card stack

Drop four images in here, then point `photos` in [`src/content.ts`](../../src/content.ts)
at them:

```ts
export const photos = [
  { caption: 'community', src: '/photos/community.jpg', alt: 'Teaching a community class' },
  ...
];
```

While `src` is `null` the card renders a placeholder frame.

Portrait crops work best. A collapsed card is a 112px sliver showing the
image's **left edge**, so keep the subject toward the left of the frame.
