/* =========================================================================
   VETERANS LANDING — SITE CONFIG
   -------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT FOR CONTACT DETAILS.
   Change the values between the quotes, save, and re-upload this file.
   Anything left as "TODO" shows up on the page with a gold highlight so
   you can spot it before you go live.
   ========================================================================= */

window.SITE_CONFIG = {

  general: {
    // Main leasing/office contact — shown in the header, contact block, footer.
    phone:         "(517)290-8083 ",
    email:         "diaz.victor.d@gmail.com harshnarayankar6@gmail.com nicole.niezabytowski@gmail.com",
    website:       "https://veteranslanding.netlify.app/",
    officeAddress: "12850 W Chicago, Detroit, MI 48228",
    hours:         "Monday to Friday, 9:00 AM to 5:00 PM"
  },

  // Where completed rental applications go, and who gets a text when one
  // arrives. The email address below is used by the fallback if an online
  // send ever fails; the live notifications are set in Netlify itself
  // (Site configuration -> Forms -> Form notifications). See the README.
  applications: {
    email: "diaz.victor.d@gmail.com",
    alertPhone: "517-290-8083"
  },

  // Social links. Leave a value empty ("") to hide that button entirely.
  social: {
    facebook:  "",
    instagram: "",
    linkedin:  ""
  },

  /* -----------------------------------------------------------------------
     INQUIRY FORM
     "mailto"   opens the visitor's email app pre-filled. Works anywhere with
                no signup, but the visitor has to press Send themselves.
     "endpoint" posts to a form service so inquiries land in your inbox
                automatically. Sign up at formspree.io (free tier), then
                paste your form URL below and set mode to "endpoint".
     ----------------------------------------------------------------------- */
  form: {
    // "netlify"  = saved on your Netlify site and emailed to you. Nothing to sign
    //              up for beyond Netlify itself. This is the default.
    // "endpoint" = posts to Formspree or similar. Paste the URL below.
    // "mailto"   = opens the visitor's own email app, pre-filled. Use this if you
    //              host anywhere other than Netlify.
    // If a send ever fails, the site falls back to mailto so nothing is lost.
    mode: "netlify",
    endpoint: "https://formspree.io/f/YOUR_FORM_ID"
  }
};
