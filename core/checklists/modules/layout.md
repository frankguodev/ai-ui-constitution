# Layout High-Risk Module

Use this module to strengthen the layout checks in `ui-audit.md`. The goal is not to restyle the page; it is to verify that first-viewport relationships actually work.

## When To Use

- Auditing a landing page, product page, homepage, search page, admin home, or any page where the first viewport carries primary understanding or conversion.
- Screenshots show a hero, mockup, search field, chip group, stats, cards, or next section sitting unusually close together or far apart.
- The user says the page "looks off" or "the layout is wrong" but has not identified the cause.

## Required Checks

- First-viewport relationships: title, supporting copy, primary action, visual container, search area, chip group, and next section should have clear priority.
- Region boundaries: hero, search, chips, and content sections should not overlap, disconnect, misalign, float, or feel hollow.
- Composition axis: identify whether the first viewport uses a center axis, left axis, split axis, or visual-object axis; title, supporting copy, search field, chip group, and following content container should share one alignment logic, or the design should have enough visual weight to justify different alignments.
- Search / list information pages: glossary, resource-index, knowledge-base, and search pages with a large search field usually should make title, supporting copy, and search bar form a stable centered entry, with following content using the same container rhythm instead of suddenly drifting left, floating, or being separated by excessive whitespace.
- Visual containers: mockups, illustrations, charts, screenshots, or decorative containers should contain enough meaningful content for their occupied space.
- Alignment system: container width, horizontal padding, section spacing, and grid/flex gaps should follow one rhythm.
- Layering: sticky, fixed, absolute, z-index, overlays, toasts, and dropdowns should not hide core text or actions.
- Content pressure: longer headings, narrower search fields, more chips, or different card counts should not break the first viewport.

## Severity Hints

- `Critical`: core first-viewport information, primary CTA, navigation, or main content is covered, clipped, unreadable, unclickable, or visibly broken on common viewports.
- `Major`: the layout works but significantly hurts scan efficiency, task understanding, spatial order, or professionalism, such as hollow first screens, unbalanced containers, or unclear hierarchy.
- `Minor`: local alignment, spacing, card height, or decorative occupancy feels unrefined but does not block understanding or operation.

## Browser Verification

- Check full first-viewport screenshots at least at `375px` and `1280px`.
- If the page runs, scroll into the next section and confirm the first viewport and next section are not accidentally stitched by a fragile height.
- Use DevTools or screenshots to confirm horizontal scrolling, overlap, invisible placeholders, excessive whitespace, or controls touching edges.

## Common Signals

- A large visual area contains very little content and looks like a placeholder or failed asset.
- Search, chips, or the next heading crowd the hero and create an unnatural reading order.
- Title and search field clearly try to form a centered entry, but chips, card groups, or the next section suddenly use another width / alignment, making the page feel biased, scattered, or uneven.
- Breathing room is created by pulling the first viewport and content area too far apart, leaving a list information page hollow, pushing core content down, or breaking the scan path.
- Background grids, images, or decorative layers do not align with the content layer, making a framed area feel empty.
- Desktop left/right composition seems balanced, but mobile or tablet causes one region to drift, overlap, or disconnect.

## Fix Boundaries

- Preserve the original theme and visual direction by default; fix relationships, proportions, spacing, container width, and layering.
- Do not redesign the whole page just because the first viewport is broken; make the existing elements work first.
- If a visual container has no real content, prefer shrinking it, adding meaningful content, turning it into a lighter background, or removing it instead of changing the theme.
