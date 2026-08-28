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

## 3. The rental application

Your Word application is now an online form: all ten sections, revealed when someone
clicks "Start the application" in the Apply section. Online is the only way to apply,
so every submission arrives the same way and nothing gets lost on paper.

To change a question, edit it in `index.html` inside the `<form id="applicationForm">`
block. Sections are numbered the same way as your Word document, so section 4 in the
file is section 4 in the original.

### Getting applications by email

Form handling comes free with Netlify, but you have to switch the notification on once:

1. Deploy the site to Netlify.
2. Submit a test application yourself so Netlify registers the form.
3. In Netlify: **Site configuration → Forms → Form notifications → Add notification
   → Email notification**.
4. Send it to **diaz.victor.d@gmail.com**. Repeat for both forms, `application`
   and `inquiry`.

Every submission is also stored in Netlify under **Forms**, so nothing is lost even
if an email goes astray. The free tier covers 100 submissions a month.

**If you host anywhere other than Netlify** (GitHub Pages, GoDaddy, and so on) this
does not work, because those hosts only serve files and cannot receive a form. Open
`assets/js/config.js` and set `mode: "mailto"` instead. The application will then
open the applicant's own email app with their answers filled in, addressed to you.

### Getting a text when an application arrives

`netlify/functions/submission-created.js` sends a short text to 517-290-8083 the
moment an application comes in. It says who applied and their callback number, and
deliberately leaves the personal details out of the message. Those stay in the
email. It does nothing until you give it credentials:

1. Create an account at [twilio.com](https://twilio.com) and buy a phone number.
   Budget about $1.15 a month for the number and under a cent per text.
2. In Netlify: **Site configuration → Environment variables**, add four:

   | Name | Value |
   |---|---|
   | `TWILIO_ACCOUNT_SID` | from your Twilio console |
   | `TWILIO_AUTH_TOKEN` | from your Twilio console |
   | `TWILIO_FROM` | your Twilio number, like `+13135550147` |
   | `ALERT_TO` | `+15172908083` |

3. Redeploy the site, then send yourself a test application.

Two cheaper alternatives if you would rather skip Twilio: connect the Netlify form
to Zapier or Make and let them send the text, or add a second Netlify email
notification pointed at your carrier's email-to-text gateway. The gateway trick is
free but depends on your carrier and is not guaranteed to arrive.

### A word about what you are collecting

The application asks for date of birth, the last four of an ID, income, and rental
history. It does not ask for a Social Security number or any medical information,
which keeps it much safer to run online. Treat the Netlify dashboard and the
receiving inbox as confidential records, and note your own document's closing line:
have Michigan housing counsel review the application before you rely on it
operationally.

---

## 4. The inquiry form and photos

The short "Request information" form in the Contact section works the same way as
the application: Netlify catches it, or it falls back to the visitor's email app.

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
    ├── js/site.js          renders the pages, handles both forms
    └── img/                building photos, brochure logos, favicon
netlify.toml                Netlify settings, nothing to change
netlify/functions/
    submission-created.js   sends the text alert (see section 3)
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
