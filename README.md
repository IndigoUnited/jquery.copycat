# jquery.copycat

A jQuery plugin that copies position and size of an element to another.   
Respondes to resize and scroll events in order to keep it updated.


## API

### .copycat(target, [options])

Makes an element looks like `target`.

Available `options`:

- `scroll`: scroll element to listen for scroll events (defaults to `window`)
- `handleResize`: true to handle resize, false otherwise (defaults to `true`)
- `subtractScroll`: true to subtract scroll offsets, false otherwise (defaults to `null` which means automatic)
- `update`: true to automatically call `.copycat('update')` right away, false otherwise (defaults to `true`)

Note that if you call this function with different `target`s, the previous instances will be destroyed.


```js
$('.some-el').copycat('.target-el');
```

### .copycat('update')

Manually updates element.


```js
$('.some-el').copycat('update');
```


### .copycat('destroy', [keepPosition])

Destroy copycat instance, releasing all events and clearing element position.   
If you wish to keep the position set by copycat, pass `keepPosition` as true.

```js
$('.some-el').copycat('destroy');
```


## How to use

Simply include the `jquery.copycat.js` file after jQuery is loaded.   
This plugin also integrates with `AMD` (no shim required) and `CommonJS`.

This plugin only works in modern browsers, that is `IE >= 9`.


## Tests

No tests yet :(
