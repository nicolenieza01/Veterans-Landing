/* =========================================================================
   TEXT ALERT ON A NEW RENTAL APPLICATION
   -------------------------------------------------------------------------
   Netlify runs this automatically every time someone submits a form on the
   site. It sends a short text saying an application arrived, with the
   applicant's name and callback number. The application itself stays in the
   email and in your Netlify dashboard; personal details are deliberately
   kept OUT of the text message.

   TO TURN IT ON, add these four environment variables in Netlify under
   Site configuration -> Environment variables:

     TWILIO_ACCOUNT_SID   from twilio.com console
     TWILIO_AUTH_TOKEN    from twilio.com console
     TWILIO_FROM          the Twilio number you bought, like +13135550147
     ALERT_TO             where the alert goes, like +15172908083

   Until those are set, this function does nothing at all and the rest of the
   site is unaffected. Email notifications work with or without it.
   ========================================================================= */

exports.handler = async function (event) {
  const SID = process.env.TWILIO_ACCOUNT_SID;
  const TOKEN = process.env.TWILIO_AUTH_TOKEN;
  const FROM = process.env.TWILIO_FROM;
  const TO = process.env.ALERT_TO;

  if (!SID || !TOKEN || !FROM || !TO) {
    return { statusCode: 200, body: "Text alerts are not configured yet." };
  }

  let payload = {};
  try {
    payload = (JSON.parse(event.body) || {}).payload || {};
  } catch (e) {
    return { statusCode: 200, body: "Could not read the submission." };
  }

  const d = payload.data || {};
  const isApplication = payload.form_name === "application";

  const who = d["Legal name"] || d.name || "Name not given";
  const callback = d["Primary phone"] || d.phone || "no phone given";
  const property = d.Property || d.property || "property not specified";

  const body = isApplication
    ? "New Veterans Landing APPLICATION: " + who + ", " + callback +
      ", " + property + ". Full application is in your email."
    : "New Veterans Landing inquiry: " + who + ", " + callback + ".";

  try {
    const res = await fetch(
      "https://api.twilio.com/2010-04-01/Accounts/" + SID + "/Messages.json",
      {
        method: "POST",
        headers: {
          Authorization: "Basic " + Buffer.from(SID + ":" + TOKEN).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ To: TO, From: FROM, Body: body }).toString()
      }
    );
    return { statusCode: 200, body: res.ok ? "Alert sent." : "Twilio returned " + res.status };
  } catch (e) {
    return { statusCode: 200, body: "Alert failed but the submission was saved." };
  }
};
