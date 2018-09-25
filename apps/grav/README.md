# Particle for Grav

Particle for Grav is an extension of our opinionated design-system first front-end tools. This is the Grav theme implemtation of Particle!

## Requirements

### Twig Namespaces Plugin

See [the repo](https://github.com/phase2/grav-plugin-twig-namespaces) for more information. After installing this plugin in your Grav install, simply copy (or symlink) the included `particle/apps/grav/twig-namespaces.yaml` file to `user/config/plugins/twig-namespaces.yaml` of your Grav install. This covers all patterns / components Particle ships with. This config will need to be updated for any new components you create!

Use `namespaces` key as the source of truth. For now a `gulp` task includes a `generated-namespaces` key to output new components. Though not ideal, replace the generated `../..` with `user/themes/particle` to have updated namespaces. Once done, you can replace the `generated-namespaces` key to simply `namespaces`. Make sure to remove the prior version of `namespaces`.

## How to Use

Use Particle as normal to create your design and assets. When you're ready to start creating in Grav, simply copy or symlink Particle to `user/themes`. Update your theme to Particle in `user/config`:

```
pages:
  theme: particle
```

Be aware that there's config in Particle's root as `particle.yaml` that provides:

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
