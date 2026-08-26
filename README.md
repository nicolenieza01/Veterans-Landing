# Veterans Landing — website

A static site with a landing page and one page per community. Right now that's
**Joy Road** and **Iris Manor**; adding a third takes about two minutes and no
new files.

No build step, no framework, no database. Upload the folder and it works.

---

## 1. Adding a property

Open `assets/js/properties.js`. Copy one whole `{ ... }` block, paste it at the
end of the list, change the values, save.

That's it. A new tab appears in the navigation, a new card appears on the home
page, the community gets its own page at `#/your-slug`, and it shows up in the
inquiry form's dropdown. Nothing else to touch.

The fields are commented in the file. The ones worth knowing:

| Field | What it does |
|---|---|
| `slug` | the web address, like `#/joy-road`. Lowercase, no spaces |
| `accent` | `"navy"` or `"iris"`, tints that property's hero and headings |
| `motif` | optional decorative flower behind the hero. Only `"iris"` exists so far |
| `photo` | drop the image in `assets/img/` and point here |
| `count` | leave it `""` and the unit-count line is hidden for that plan |
| `stats` | the three facts in the strip under the hero |
| `units` | `plan` picks the floor-plan drawing: `oneBed`, `efficiency`, `twoBed` |
| `pending: true` | greys the price and adds a "Pricing coming soon" tag |

The home page's own copy — headline, the four "why we're different" cards, the
programs list — is at the bottom of the same file under `window.HOME`.

---

## 2. Before you go live — fill in the blanks

All contact details live in **one file**: `assets/js/config.js`.

Anything still marked `TODO` shows on the live page with a **gold highlight** so
it can't ship by accident. Right now that's:

| What | Where it shows |
|---|---|
| Phone number | Contact block, footer |
| Email address | Contact block, and where the inquiry form sends |

Also in that file: office hours, website URL, and social links. Leave a social
link as `""` and that button disappears automatically.

**Pricing.** Both communities show 1BR 700 sq ft $1,500, Efficiency 600 sq ft
$1,100, 2BR 900 sq ft $2,250. Iris Manor also shows unit counts (49 / 8 / 6) from
its brochure. Joy Road's counts are blank, so those lines are hidden until you
fill in `count` in `assets/js/properties.js`.

---

## 3. The inquiry form

Out of the box it runs in **mailto mode**: the visitor hits "Send inquiry" and
their email app opens with everything filled in and addressed to you. Works
anywhere with zero setup, but they have to press Send themselves.

To have inquiries land in your inbox automatically:

1. Sign up free at [formspree.io](https://formspree.io) and create a form.
2. Copy the URL it gives you (like `https://formspree.io/f/abcdwxyz`).
3. In `assets/js/config.js`:

```js
form: {
  mode: "endpoint",
  endpoint: "https://formspree.io/f/abcdwxyz"
}
```

---

## 4. Swapping the building photos

The two hero photos were cropped out of your brochures, so they're fairly low
resolution — replacing them is the single biggest visual upgrade available.
Keep the filenames:

```
assets/img/joy-road-building.jpg
assets/img/iris-manor-building.jpg
```

Landscape, ideally 1600×1000 or larger. Your two brochure logos are also in
`assets/img/` (`logo-joy-road.png`, `logo-iris-manor.png`) — unused right now,
but there if you want them.

---

## 5. Deploying

Any of these work. The whole site is just files.

**Netlify (easiest, free)** — go to [app.netlify.com/drop](https://app.netlify.com/drop)
and drag the `veterans-landing` folder onto the page. Live URL in about ten
seconds; point `veteranslanding.org` at it under Site settings → Domain management.

**Vercel** — `vercel.com/new`, import the folder or a GitHub repo. No framework
preset; choose "Other".

**GitHub Pages** — push the folder to a repo, then Settings → Pages → deploy from
branch → `main` / root.

**Traditional host (GoDaddy, Bluehost, cPanel)** — upload the *contents* of the
folder into `public_html`. `index.html` must sit at the top level.

**Preview locally** — from inside the folder run `python3 -m http.server 8000`
and open `http://localhost:8000`.

---

## 6. File map

```
veterans-landing/
├── index.html              page shell, header, contact section, footer
├── README.md               this file
└── assets/
    ├── css/styles.css      all styling; design tokens at the top
    ├── js/properties.js    >>> the communities + home page copy <<<
    ├── js/config.js        >>> contact details, social, form settings <<<
    ├── js/site.js          renders the pages, handles the form
    └── img/                building photos, brochure logos, favicon
```

### Changing colors

Top of `assets/css/styles.css`, in the `:root` block. The star textures on the
heroes and the dark band are also defined there, as `--star-navy` and
`--star-white`:

```css
--ground:#f6f8fc;   /* page background */
--navy:#12294f;     /* headings and primary buttons */
--gold:#bd8a1c;     /* accents, the tri-bar mark, current-tab underline */
--iris:#5b3a9e;     /* the Iris Manor accent */
--green:#2b7a5b;    /* rent figures */
```

---

## Notes

- Deep links work: `yoursite.com/#/joy-road` opens straight to that community.
  Good for printing on a flyer for one property.
- Floor plans are schematic drawings, not surveyed plans. Every room has a proper
  door with a swing arc, but if the real layouts differ, the drawings live in the
  `PLANS` object near the top of `assets/js/site.js`.
- Keyboard accessible, mobile-first, no horizontal scroll down to 320px.
- The Equal Housing Opportunity line in the footer is worth confirming with your
  property manager or attorney for your jurisdiction's exact wording.
