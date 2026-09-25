# LuLuStudio's Stickers

## Where to add your own stickers

Each pack has its own folder under `images/packs/<pack-id>/`:

```
images/packs/cat/cover.png    <- shown on the pack card + top of the pack page
images/packs/cat/01.png       <- 1st sticker in the preview grid
images/packs/cat/02.png       <- 2nd sticker
images/packs/cat/03.png       ...and so on
```

PNG with a transparent background, at least 512×512px, square. Until you add
files, the site shows an emoji placeholder for that pack — nothing breaks.

To turn a pack's images on, open `js/data.js` and add two fields to that
pack's entry:

```js
{ id: "cat", name: "Cat Chaos", cover: true, stickerFiles: 5, price: 3.99, stickers: 24, preview: 5, desc: "..." }
```

- `cover: true` tells the site to use `images/packs/cat/cover.png`
- `stickerFiles: 5` tells it you've added `01.png` through `05.png` for the
  preview grid (any stickers beyond that number keep using the emoji)

## Editing your packs

Everything about your packs — name, price, description, sticker count — lives
in `js/data.js`. Add, remove, or edit entries in the `PACKS` list; the rest of
the site updates automatically.

## Running it

Just open `index.html` in a browser, or serve the folder with any static
web server.

## What's still a placeholder

- Checkout is a simulated payment flow (no real payment processor connected)
- "Download pack" / "Add to Telegram" buttons are placeholders — wire these
  up to real file storage and your Telegram sticker set once you have them
