---
title: Icons
---
### How to use icons

The icon name is next to each icon and is represented by `ICON-NAME` below.

**In HTML**

```html
<i class="icon--ICON-NAME"></i>
```

**In Sass**

Use the mixin `icon` with the argument of the icon name like this: `@include icon(facebook);`. So

```scss
.class {
  @include icon(ICON-NAME);
}
```

**Adding and generating icons**

Add SVG files `images/icons/src/` to automatically add to this list. Use the Illustrator template at `images/icons/templates/` if you have any problems.

