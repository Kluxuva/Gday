# for my girl 🌷

A little animated site for Girlfriend's Day — opens with a bouquet you tap to
"bloom," then scrolls through a photo garden of you two.

## Add / swap photos
1. Drop new image files into the `images/` folder.
2. Open `script.js`, find the `galleryImages` list near the top, and add a
   line for each photo:
   ```js
   { src: "images/your-file.jpg", caption: "a little note", rotate: -3 },
   ```
   `rotate` is the tilt of the polaroid — keep it small, between -6 and 6.
3. To change the big hero photo, replace `images/photo-01.jpg` (or edit the
   `src` in `index.html` under `<section class="hero">`).
4. To change the full-bleed flower backgrounds, replace `images/flower-01.jpg`
   through `flower-05.jpg` with any photos you like — they don't need to be
   flowers specifically, just keep similar aspect ratios for a clean crop.

No build step, no dependencies — just plain HTML/CSS/JS, so any change shows
up immediately when you reload the page.

## Preview locally
Open `index.html` directly in a browser, or run a tiny local server from
this folder:
```
python3 -m http.server 8000
```
then visit `http://localhost:8000`.

## Deploy on Vercel
1. Go to vercel.com → **Add New… → Project**.
2. Choose **"Deploy without Git"** and drag this whole folder in
   (or run `vercel` from inside this folder if you have the CLI installed).
3. Framework preset: **Other** (it's a static site, no build command needed).
4. Deploy — you'll get a shareable link in under a minute.
