# irisevangeline.me

The story of Iris Evangeline Lucas, told one post at a time.

Built with [Eleventy](https://www.11ty.dev/): stories are Markdown files with photos next to them, and the site is plain HTML when built.

## Run it locally

```
npm install      # first time only
npm start        # opens a live preview at http://localhost:8080
```

## Add a story

1. Make a new folder in `src/stories/`, for example `src/stories/first-smile/`. The folder name becomes the web address: `irisevangeline.me/stories/first-smile/`.
2. Put the photos in that folder. Full-size phone photos are fine. They are resized automatically, and location data is stripped.
3. Create `index.md` in the folder:

   ```markdown
   ---
   title: Her First Smile
   date: 2027-08-15
   summary: One line that shows on the home page card.
   cover: smile.jpg
   coverAlt: Iris smiling in her car seat
   ---

   Write the story here. Blank lines separate paragraphs.

   ![Iris smiling in her car seat](smile.jpg)

   Add as many photos and paragraphs as you like.
   ```

The home page lists stories newest first. Each story shows Iris's age at the time ("12 weeks along" before she's born, "3 months old" after).

## When she's born

In `src/_data/site.json`, set `"birthDate": "2027-06-XX"`. The home page will switch from "Arriving June 2027" to her birthday, and story ages will count up from that date.

## Layout

| Path | What it is |
| --- | --- |
| `src/stories/<name>/index.md` | One story plus its photos |
| `src/about.md` | The About Iris page |
| `src/index.njk` | Home page |
| `src/_includes/` | Page templates (header, footer, story layout) |
| `src/css/style.css` | All styling |
| `src/_data/site.json` | Site name, due date, birth date |
| `_originals/` | Unedited source photos. Not committed and not published. |

## Privacy

The site tells search engines not to index it (`robots.txt` and a `noindex` meta tag in `src/_includes/base.njk`). Anyone with the link can still view it. To make it searchable, delete both.

## Publishing

`.github/workflows/deploy.yml` publishes to GitHub Pages whenever you push to `main`:

1. Create a GitHub repo and push this project to it.
2. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. At your domain registrar, add DNS records for `irisevangeline.me` pointing to GitHub Pages: four `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`.
4. In **Settings → Pages**, enter `irisevangeline.me` as the custom domain and turn on **Enforce HTTPS**.

Netlify or Cloudflare Pages also work: set the build command to `npm run build` and the output folder to `_site`.
