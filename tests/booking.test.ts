import assert from "node:assert/strict";
import test from "node:test";
import { getBookingHref, getBookingMessage } from "../lib/booking";

test("appointment messages retain supplied details without form instructions", () => {
  const message = getBookingMessage("en", {
    service: " Signature facial ",
    preferredDate: "2026-10-10",
    preferredTime: "20:45",
    message: " Please advise & confirm. ",
  });
  assert.match(message, /Service: Signature facial/);
  assert.match(message, /Preferred date: 2026-10-10/);
  assert.match(message, /Preferred time: 08:45 PM — Dubai time \(GMT\+4\)/);
  assert.match(message, /Message: Please advise & confirm\./);
  assert.match(message, /Please confirm availability\. Thank you\.$/);
  assert.doesNotMatch(message, /optional|undefined|Category:/);
});

test("empty details are omitted and service guidance is conditional", () => {
  const message = getBookingMessage("en", {
    needsGuidance: true,
    message: "   ",
  });
  assert.match(message, /help choosing a service/);
  assert.doesNotMatch(
    message,
    /Service:|Preferred date:|Preferred time:|Message:/,
  );
  assert.doesNotMatch(
    getBookingMessage("en", { service: "Facial", needsGuidance: true }),
    /help choosing/,
  );
});

test("general contact messages do not claim to request an appointment", () => {
  const message = getBookingMessage("en", {
    kind: "contact",
    name: "Guest",
    topic: "Feedback",
    message: "Thank you for your help.",
  });
  assert.match(message, /Name: Guest\nEnquiry topic: Feedback\nMessage:/);
  assert.doesNotMatch(message, /appointment|confirm availability/);
});

test("package and membership enquiries request details and pricing", () => {
  for (const kind of ["package", "membership"] as const) {
    const message = getBookingMessage("en", { kind, [kind]: "Signature" });
    assert.match(message, new RegExp(`enquire about a ${kind}`));
    assert.match(message, /Signature/);
    assert.match(message, /details and pricing/);
    assert.doesNotMatch(message, /appointment|confirm availability/);
  }
});

test("Arabic WhatsApp links preserve text, punctuation and newlines", () => {
  const enquiry = {
    service: "العناية بالبشرة",
    message: "سؤال & تفاصيل + #",
    preferredTime: "09:15",
  };
  const message = getBookingMessage("ar", enquiry);
  assert.match(message, /الخدمة: العناية بالبشرة/);
  assert.match(message, /(?:09:15|٠٩:١٥) صباحاً/);
  assert.match(message, /توقيت دبي/);
  assert.doesNotMatch(message, /optional|Service|Royal Longevity/);
  assert.equal(
    new URL(getBookingHref("ar", enquiry)).searchParams.get("text"),
    message,
  );
});

test("out-of-hours and non-quarter-hour times are omitted", () => {
  for (const preferredTime of ["08:45", "21:00", "12:10", "invalid"]) {
    assert.doesNotMatch(
      getBookingMessage("en", { preferredTime }),
      /Preferred time:/,
    );
  }
});
