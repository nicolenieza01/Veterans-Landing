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
    phone:         "TODO: (313) 000 0000",
    email:         "TODO: info@veteranslanding.org",
    website:       "www.veteranslanding.org",
    officeAddress: "12850 W Chicago, Detroit, MI 48228",
    hours:         "Monday to Friday, 9:00 AM to 5:00 PM"
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
    mode: "mailto",
    endpoint: "https://formspree.io/f/YOUR_FORM_ID"
  }
};
