/**
 * Demo of Image. Pull in image assets, but provide demo-only assets.
 */

// Ensure all image pattern deps are present
import 'atoms/image';

// Demo-only asset: astrogoat.png
import './astrogoat.png';

import imageImgMarkdown from './image-img.md';
import imageImgTwig from './image-img.twig';
import imageInlineTwig from './image-inline.twig';
import imageStylesTwig from './image-styles.twig';

export default {
  imageImgMarkdown,
  imageImgTwig,
  imageInlineTwig,
  imageStylesTwig,
};
