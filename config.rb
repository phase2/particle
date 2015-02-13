# Require any additional compass plugins here.
require 'breakpoint'
require 'singularitygs'
require 'toolkit'
require 'sass-globbing'

# Set this to the root of your project when deployed:
http_path = "../"
css_dir = "css"
sass_dir = "scss"
images_dir = "images"
javascripts_dir = "js"
fonts_dir = "fonts"
add_import_path "bower_components/eq.js/sass"

# Change to production on production environment
environment = :development
#environment = :production

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = (environment == :development) ? :expanded : :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# Sourcemaps
#sass_options = (environment == :development) ? {:sourcemap => true} : {}
sourcemap = true

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# Remove cachebusting
asset_cache_buster :none
