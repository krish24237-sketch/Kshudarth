FOUNDER PHOTOS
==============

Put two files here:

  krish.jpg
  sneha.jpg

Then open lib/content.ts and set:

  export const HAS_FOUNDERS_PHOTO = true;

They'll crossfade back and forth in the About section, with the name badge
swapping to match.

THE ONE RULE THAT MATTERS
-------------------------
Both photos MUST have the same crop and similar framing.

  - Same aspect ratio (4:5 portrait works best — the frame is 4:5)
  - Same amount of body in shot (both waist-up, or both full-length)
  - Head roughly the same size in each frame

If one is a tight half-body shot and the other is full-length, the crossfade
looks like the person shrinks. Same dark studio background and lighting on
both keeps it seamless.

Keep each file under ~500KB (export as JPG, quality 80) so the page stays fast.
