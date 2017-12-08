# Particle for Grav
Particle for Grav is an extension of our opinionated design-system first front-end tools. This is the Grav theme implemtation of Particle!

## Requirements

### Twig Namespaces Plugin
See [the repo](https://github.com/phase2/grav-pl-starter/tree/master/app/user/plugins/twig-namespaces) for more information. After installing this plugin in your Grav install, simoly copy (or symlink) the included `particle/apps/grav/twig-namespaces.yaml` file to `user/config/plugins/twig-namespaces.yaml` of your Grav install. This covers all patterns / components Particle ships with. This config will need to be updated for any new components you create! 

## How to Use
Use Particle as normal to create your design and assets. When you're ready to start creating in Grav, simply copy or symlink Particle to `user/themes`. 

Be ware that there's config in Partilce's root as `particle.yaml` that provides:

```
streams:
 schemes:
   theme:
     type: ReadOnlyStream
     prefixes:
       '':
         - user/themes/particle
         - user/themes/particle/apps/grav

```

This config file is what allows Grav to see Particle's compiled app as the source of the theme.

## Roadmap

  * Webpack for Grav Assets
  * Update `base.html.twig` to use new Grav Assets
  * Update default starting layout in `base.html.twig`
  * Configure Gulp Task to Write Namespaced Paths for New Components to `twig-namespaces.yaml`
