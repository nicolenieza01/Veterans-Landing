/* =========================================================================
   VETERANS LANDING — PROPERTIES
   -------------------------------------------------------------------------
   THIS FILE IS THE WHOLE SITE'S CONTENT FOR EACH COMMUNITY.

   TO ADD A THIRD PROPERTY: copy one whole { ... } block below, paste it
   at the end of the list, change the values, and save. A new tab appears
   in the navigation and a new card appears on the home page automatically.
   Nothing else to touch.

   Field notes
     slug ......... the web address: #/joy-road  (lowercase, dashes, no spaces)
     name ......... short name used on tabs and cards
     accent ....... "navy" or "iris" — tints the hero and headings
     photo ........ put the image in assets/img/ and point to it here
     stats ........ three short facts shown under the hero
     amenities .... icon names: wifi, appliance, laundry, people, shield,
                    handshake, briefcase, chart, book, monitor, flag
     motif ........ optional decorative flower, currently only "iris"
     units ........ plan: "oneBed" | "efficiency" | "twoBed"
                    count: "" hides the unit-count line
                    pending: true greys the price and adds a "coming soon" tag
   ========================================================================= */

window.PROPERTIES = [

  /* ------------------------------------------------------------ JOY ROAD */
  {
    slug: "joy-road",
    name: "Joy Road",
    accent: "navy",
    tagline: "A place to live. A community to belong. A future to build.",
    address: "18401-18511 Joy Rd, Detroit, MI 48228",
    photo: "assets/img/joy-road-building.jpg",
    photoAlt: "The Veterans Landing Joy Road apartment building",
    cardBlurb: "Brick community on Joy Road with a resource center on site and programs that lead to real work.",
    intro: "Veterans Landing Joy Road offers safe, stable housing for veterans in a community designed around dignity, opportunity, and belonging.",

    stats: [
      { value: "3", label: "Floor plans" },
      { value: "1 Gb", label: "Internet included" },
      { value: "On site", label: "Resource center" }
    ],

    amenities: [
      { icon: "wifi",      title: "1 Gigabit Internet",       text: "High-speed connectivity throughout the community." },
      { icon: "appliance", title: "Electric Appliances",      text: "Energy-efficient, veteran-friendly living." },
      { icon: "laundry",   title: "On-Site Laundry",          text: "Laundry facilities right on the property." },
      { icon: "people",    title: "Veterans Resource Center", text: "On-site support, programs, and meeting space." },
      { icon: "shield",    title: "Safe & Secure",            text: "A secure community with a veteran-first focus." }
    ],

    units: [
      { name: "1 Bedroom",  plan: "oneBed",     size: "700 sq ft", rent: "$1,500", count: "" },
      { name: "Efficiency", plan: "efficiency", size: "600 sq ft", rent: "$1,100", count: "" },
      { name: "2 Bedroom",  plan: "twoBed",     size: "900 sq ft", rent: "$2,250", count: "" }
    ],
    unitsNote: "Floor plans are representative and may vary. Contact us for current availability.",

    programs: [
      "VA-connected social services",
      "On-site group meetings",
      "Paid employment training",
      "Career placement support",
      "Financial-literacy education",
      "Computer and technology access"
    ],

    community: [
      "Veterans group meetings",
      "Peer connection",
      "VA-connected social services"
    ],
    support: [
      "Paid employment training",
      "Career placement support",
      "Financial-literacy education",
      "Technology access and laptop support",
      "Banking and direct-deposit assistance"
    ]
  },

  /* ---------------------------------------------------------- IRIS MANOR */
  {
    slug: "iris-manor",
    name: "Iris Manor",
    accent: "iris",
    motif: "iris",
    tagline: "A place to live. A community to belong. A future to build.",
    address: "12850 W Chicago, Detroit, MI 48228",
    photo: "assets/img/iris-manor-building.jpg",
    photoAlt: "The Veterans Landing Iris Manor apartment building",
    cardBlurb: "63 apartments on W Chicago with a resource center, secure grounds, and support built into daily life.",
    intro: "Veterans Landing Iris Manor offers safe, stable, and affordable housing for veterans in a community designed with their needs in mind. Here, veterans find more than an apartment. They find support, resources, and opportunity.",

    stats: [
      { value: "63", label: "Apartments" },
      { value: "3", label: "Floor plans" },
      { value: "On site", label: "Resource center" }
    ],

    amenities: [
      { icon: "wifi",      title: "1 Gigabit Internet",       text: "High-speed connectivity throughout the community." },
      { icon: "appliance", title: "Electric Appliances",      text: "Energy-efficient, veteran-friendly living." },
      { icon: "laundry",   title: "On-Site Laundry",          text: "Three washers and three dryers, coin-operated." },
      { icon: "people",    title: "Veterans Resource Center", text: "On-site support, programs, and meeting space." },
      { icon: "shield",    title: "Safe & Secure",            text: "A secure community with a veteran-first focus." }
    ],

    units: [
      { name: "1 Bedroom",  plan: "oneBed",     size: "700 sq ft", rent: "$1,500", count: "49" },
      { name: "Efficiency", plan: "efficiency", size: "600 sq ft", rent: "$1,100", count: "8"  },
      { name: "2 Bedroom",  plan: "twoBed",     size: "900 sq ft", rent: "$2,250", count: "6"  }
    ],
    unitsNote: "Floor plans are representative and may vary.",

    programs: [
      "VA-connected social services",
      "On-site group meetings",
      "Paid employment training",
      "Career placement support",
      "Financial-literacy education",
      "Computer and technology access"
    ],

    community: [
      "Veterans group meetings",
      "Peer connection",
      "VA-connected social services"
    ],
    support: [
      "Paid employment training",
      "Career placement support",
      "Financial-literacy education",
      "Technology access and laptop support",
      "Banking and direct-deposit assistance"
    ]
  }

];

/* -------------------------------------------------------------------------
   HOME PAGE COPY — the shared story shown before someone picks a property.
   ------------------------------------------------------------------------- */
window.HOME = {
  headline: "A place to live.\nA community to belong.\nA future to build.",
  lede: "Veterans Landing is a veteran owned housing community in Detroit. We provide safe, stable, affordable apartments, plus the support, resources, and opportunity that turn an apartment into a future.",

  difference: [
    { icon: "people",    title: "On-Site Resources",           text: "Programs and services that help veterans thrive, in the building where they live." },
    { icon: "shield",    title: "Safe & Secure Community",     text: "Grounds and neighbors focused on safety, respect, and camaraderie." },
    { icon: "flag",      title: "Veteran-Focused Living",      text: "Built by veterans, for veterans, designed around how service members actually live." },
    { icon: "handshake", title: "Pathways to a Better Future", text: "Support, training, and opportunities that open doors and keep them open." }
  ],

  programs: [
    { icon: "handshake", title: "VA-connected social services", text: "Direct lines into the benefits and services veterans have earned." },
    { icon: "people",    title: "On-site group meetings",       text: "Peer connection and veterans groups, steps from your door." },
    { icon: "briefcase", title: "Paid employment training",     text: "Get paid while you build the skills for the next job." },
    { icon: "chart",     title: "Career placement support",     text: "Help finding work that fits, and help keeping it." },
    { icon: "book",      title: "Financial-literacy education", text: "Budgeting, banking, and direct-deposit assistance." },
    { icon: "monitor",   title: "Computer and technology access", text: "Computers, internet, and laptop support on site." }
  ]
};
