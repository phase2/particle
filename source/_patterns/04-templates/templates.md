# TEMPLATES & PAGES

These files tend to get structured slightly differently than the rest of the design system here at Phase2.

Pages are treated purely as _demo_ patterns. They are used solely by Pattern Lab to mock up working designs prior/in parallel to Drupal entities being constructed. They _use_ the template patterns for structure, and import their own demo images that are not included in the overall design system's dependency chain.

This is one reason that the static PL bundle is so much larger than other production app bundles-- it explicitly includes the full demoPages item.

Templates, on the other hand, are meant to be leaner. They may or may not be used explicitly by templates in Drupal and elsewhere, but they provide guidance for where classes need to be applied, and a reliable mock for Pattern Lab.

This split is the reason there are no demo folders inside of individual template components. Pages is a conglomeration of all template demos.