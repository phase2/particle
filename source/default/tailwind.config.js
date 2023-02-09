/**
 * Tailwind config for design system
 *   Requires Tailwind 1.4.0 or greater
 */

 const path = require('path');

 // Tailwind Plugins
 const tailwindForms = require('@tailwindcss/forms');
 
 const colors = require('./tokens/colors.tailwind');
 const customForms = require('./tokens/forms.tailwind');
 const fontFamily = require('./tokens/font-family.tailwind');
 
 // Default Tailwind config can be found here: https://github.com/tailwindcss/tailwindcss/blob/v1.2.0/stubs/defaultConfig.stub.js
 module.exports = {
   important: true,
   // Purge CSS from Tailwind Only.
   purge: {
     content: [path.resolve(__dirname, '_patterns/**/*.*'), path.resolve(__dirname, '../../apps/drupal-default/particle_theme/templates/**/*.*')],
     options: {
       // Whitelist Non-DS Dependent Patterns.
       whitelistPatterns: [/^bg/, /^text/, /:?-?m[xy]?-/, /:?p[xy]?-/],
       defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
       extensions: ['yml', 'twig', 'json', 'js', 'ts'],
     },
   },
   theme: {
     colors,
     customForms,
     fontFamily, 
     extend: {
       boxShadow: {
         'utc': '3px 3px 5px 1px rgb(0 0 0 / 15%)',
         'utcdark': 'rgba(0, 0, 0, 0.15) 0px 2px 4px, rgba(0, 0, 0, 0.25) 0px 2px 3px',
       },
       gridTemplateRows: {
         // Adds a custom template for the utc hero block
         'utchero': '40px 1fr 1fr 70px',
         'utcheroreverse': '70px 1fr 1fr 40px',
         'utcherocenter': '25px 1fr 1fr 25px',
         // Adds a custom template for the highlight block
         'utchighlight': '40px 1fr 1fr 40px 40px',
         
       },
       gridTemplateColumns: {
         // Adds a custom template for the utc hero block
         'utchero': '1fr 60% 35% 1fr',
         'utcheroright': '1fr 35% 60% 1fr',
         'utcherocenter': '1fr 45% 45% 1fr',
         'utcvideohero': '1fr 30%',
         'utcvideoheroright': '30% 1fr',
         'utcvideoherocenter': '1fr 70% 1fr',
         // Adds a custom template for the highlight block
         'utchighlight': '1fr 45% 40% 1fr',
         //Adds custom template for the footer menu/map columns
         utcmenufooter1: "1fr 37% 1fr",
         utcmenufooter2: "1fr 0% 1fr",
         utcmapfooter: "1fr 30% 1fr", 
       },
       zIndex: {
         less1: "-1",
         1: "1",
         9: "9",
         98: "98",
         99: "99",
         100: "100",
         999: "999",
         1000: "1000",
         1001: "1001",
         9999: "9999",
         100000: "100000",
       },
       minWidth: {
         '9': '9rem'
       },
       maxWidth: {
         '18': '18rem',
         '95p': '95%',
       },
       height: {
         '70p': '70%',
         '75p': '75%',
         '80p': '80%',
         '85p': '85%',
         '90p': '90%',
         '95p': '95%',
         'full': '100%',
       }
       ,
       margin: {
        '20': '5rem',
        '28': '7rem', 
        '36': '9rem',
       }
     },
     minHeight: {
       '23': '23rem'
     }
   },
   variants: {
     extend: {
      margin: ['first'],
     }
   },
   plugins: [tailwindForms],
 };
 
