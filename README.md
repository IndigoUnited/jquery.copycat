# jquery.copycat

A jQuery plugin that copies position and size of an element to another.   
Respondes to size and scroll events in order to keep it updated.


## API

### .copycat(target, [options])

Makes an element looks like `target`.

Available `options`:

- `scroll`: custom scroll element to listen for scroll events (defaults to `window`)
- `handleResize`: true to handle resize, false otherwise (defaults to `true`)
- `subtractScroll`: true to subtract scroll offsets, false otherwise (defaults to `null` which means automatic)


### .copycat('update')

Manually updates element.

### .copycat('destroy', [keepPosition])

Destroy copycat instance, releasing all events and clearing element position.   
If you wish to keep the position set by copycat, pass `keepPosition` as true.


## How to use

Simply include the `jquery.copycat.js` file after jQuery is loaded.   
This plugin also integrates with `AMD` (no shim required) and `CommonJS`.


## Tests

No tests yet :(
