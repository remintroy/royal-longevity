// Policy wording transcribed from Website Privacy_Terms and Conditions.pdf.
// Unconfirmed dates are omitted; contact placeholders use the website contact page.
export type LegalBlock =
  | { type: "paragraph" | "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "contact"; text: string };
export type LegalDocument = {
  dates: string[];
  introduction: LegalBlock[];
  sections: { id: string; title: string; blocks: LegalBlock[] }[];
};
export type LegalSlug = "privacy" | "terms" | "disclaimer";
export const legalDocuments: Record<LegalSlug, LegalDocument> = {
  privacy: {
    dates: [],
    introduction: [
      {
        type: "paragraph",
        text: 'Royal Longevity Center Personal Care and Beauty LLC, and its affiliated, licensed and/or operated departments and businesses "Royal Longevity", respects the privacy of visitors, customers, members, patients, partners and users of our website and digital services.',
      },
      {
        type: "paragraph",
        text: "This Privacy Policy explains how we collect, use, store, protect and disclose personal information when you visit www.royallongevity.ae, contact us, make an appointment, purchase a service or product, register for a membership or package, participate in promotions, or otherwise interact with Royal Longevity.",
      },
    ],
    sections: [
      {
        id: "section-1",
        title: "1. Information We May Collect",
        blocks: [
          {
            type: "paragraph",
            text: "Depending on how you interact with us, we may collect:",
          },
          {
            type: "heading",
            text: "Identity information",
          },
          {
            type: "paragraph",
            text: "Name, nationality, date of birth, gender where relevant, identification details where legally required.",
          },
          {
            type: "heading",
            text: "Contact information",
          },
          {
            type: "paragraph",
            text: "Mobile number, telephone number, email address, residential or correspondence address.",
          },
          {
            type: "heading",
            text: "Booking and service information",
          },
          {
            type: "paragraph",
            text: "Appointments, services requested, preferred specialists, visit history, memberships, packages, payments, vouchers and loyalty information.",
          },
          {
            type: "heading",
            text: "Beauty and wellness information",
          },
          {
            type: "paragraph",
            text: "Information relevant to services requested, preferences, allergies, contraindications, treatment history and other information reasonably necessary to provide a safe service.",
          },
          {
            type: "heading",
            text: "Health and clinical information",
          },
          {
            type: "paragraph",
            text: "Where you use a licensed medical or clinical service, we may collect health, medical, diagnostic, treatment and related information necessary for the provision, documentation and management of healthcare services.",
          },
          {
            type: "paragraph",
            text: "Health-related information will only be accessed and processed by appropriately authorized personnel for legitimate purposes and subject to applicable UAE health, confidentiality and data-protection requirements.",
          },
          {
            type: "paragraph",
            text: "UAE legislation specifically regulates the use, handling and confidentiality of health information.",
          },
          {
            type: "heading",
            text: "Technical information",
          },
          {
            type: "paragraph",
            text: "IP address, browser type, device information, operating system, approximate location, website activity, pages visited, referring source and similar technical information.",
          },
          {
            type: "heading",
            text: "Communication information",
          },
          {
            type: "paragraph",
            text: "Messages, enquiries, telephone interactions, WhatsApp communications, feedback, complaints, survey responses and correspondence with us.",
          },
          {
            type: "heading",
            text: "Marketing information",
          },
          {
            type: "paragraph",
            text: "Marketing preferences, campaign interactions, promotions used and communication preferences.",
          },
        ],
      },
      {
        id: "section-2",
        title: "2. How We Use Your Information",
        blocks: [
          {
            type: "paragraph",
            text: "We may use personal information to:",
          },
          {
            type: "list",
            items: [
              "manage appointments and reservations;",
              "provide beauty, wellness, fitness, hospitality, retail and clinical services;",
              "maintain customer and patient records;",
              "administer memberships, packages and loyalty programmes;",
              "process payments, refunds and financial transactions;",
              "communicate booking confirmations, reminders and service information;",
              "provide customer support;",
              "improve customer experience and service quality;",
              "conduct customer surveys and satisfaction analysis;",
              "investigate complaints and incidents;",
              "send marketing communications were permitted and where the required consent lawful basis exists;",
              "manage internal operations, staff performance and service quality;",
              "prevent fraud, misuse and unauthorized transactions;",
              "comply with legal, regulatory and licensing obligations;",
              "protect the rights, safety and property of Royal Longevity, its customers and third parties.",
            ],
          },
          {
            type: "paragraph",
            text: "The UAE personal-data framework generally requires a lawful basis for processing personal data and gives data subjects rights relating to their information.",
          },
        ],
      },
      {
        id: "section-3",
        title: "3. Marketing Communications",
        blocks: [
          {
            type: "paragraph",
            text: "We may receive promotional communications from Royal Longevity concerning services, memberships, packages, events, products, special offers or related activities.",
          },
          {
            type: "paragraph",
            text: "Where consent is required, we will seek the appropriate consent. We may withdraw marketing preferences through the available unsubscribe mechanism or by contacting us.",
          },
          {
            type: "paragraph",
            text: "Consumer-protection rules in the UAE also address the use of consumer data for marketing purposes.",
          },
          {
            type: "paragraph",
            text: "Withdrawal of marketing consent does not affect transactional or operational communications that are necessary for bookings, payments, memberships, security or legal obligations.",
          },
        ],
      },
      {
        id: "section-4",
        title: "4. Sharing Information",
        blocks: [
          {
            type: "paragraph",
            text: "Royal Longevity may share relevant information with:",
          },
          {
            type: "list",
            items: [
              "licensed Royal Longevity departments and affiliated operating entities;",
              "employees and authorized specialists;",
              "healthcare professionals where applicable;",
              "payment providers and financial service providers;",
              "IT , hosting, CRM, booking, communication and software providers;",
              "accounting, audit, legal and professional advisers;",
              "government and regulatory authorities where required;",
              "insurers or other parties where necessary for legitimate business or legal purposes.",
            ],
          },
          {
            type: "paragraph",
            text: "We will seek to limit disclosure to information reasonably necessary for the relevant purpose.",
          },
          {
            type: "paragraph",
            text: "Where service providers process information on our behalf, we expect appropriate contractual and technical safeguards.",
          },
        ],
      },
      {
        id: "section-5",
        title: "5. International Transfers",
        blocks: [
          {
            type: "paragraph",
            text: "Some technology, cloud, payment, CRM or communications providers may process information outside the UAE.",
          },
          {
            type: "paragraph",
            text: "Where personal information is transferred internationally, Royal Longevity will apply the safeguards required by applicable UAE data-protection law. The UAE personal-data framework contains specific requirements relating to cross-border transfers.",
          },
        ],
      },
      {
        id: "section-6",
        title: "6. Cookies and Tracking Technologies",
        blocks: [
          {
            type: "paragraph",
            text: "Our website may use cookies and similar technologies for:",
          },
          {
            type: "list",
            items: [
              "essential website functionality;",
              "security;",
              "remembering user preferences;",
              "analytics;",
              "improving website performance;",
              "understanding website usage;",
              "marketing and advertising where applicable.",
            ],
          },
          {
            type: "paragraph",
            text: "Where required, non-essential cookies will be subject to appropriate consent mechanisms.",
          },
        ],
      },
      {
        id: "section-7",
        title: "7. Data Security",
        blocks: [
          {
            type: "paragraph",
            text: "Royal Longevity will implement reasonable technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, loss or misuse.",
          },
          {
            type: "paragraph",
            text: "However, no website, network or electronic transmission can be guaranteed to be completely secure.",
          },
        ],
      },
      {
        id: "section-8",
        title: "8. Data Retention",
        blocks: [
          {
            type: "paragraph",
            text: "We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including service delivery, accounting, legal, regulatory, medical, dispute-resolution and recordkeeping requirements.",
          },
          {
            type: "paragraph",
            text: "Different categories of information may therefore have different retention periods.",
          },
        ],
      },
      {
        id: "section-9",
        title: "9. Your Rights",
        blocks: [
          {
            type: "paragraph",
            text: "Subject to applicable UAE law and any relevant exceptions, you may have rights concerning your personal information, including requesting access, correction, restriction or cessation of certain processing.",
          },
          {
            type: "paragraph",
            text: "The UAE Personal Data Protection Law expressly provides rights concerning inaccurate personal data and restriction or stopping certain processing.",
          },
          {
            type: "paragraph",
            text: "Requests may be submitted to:",
          },
          {
            type: "contact",
            text: "For privacy and data-protection requests, contact our team through our Contact page.",
          },
          {
            type: "paragraph",
            text: "We may need to verify your identity before processing a request.",
          },
        ],
      },
      {
        id: "section-10",
        title: "10. Children's Privacy",
        blocks: [
          {
            type: "paragraph",
            text: "Our website and services are not intended to knowingly collect personal information from children except where the relevant service is lawfully provided with the involvement or consent of a parent, legal guardian or otherwise authorized person.",
          },
        ],
      },
      {
        id: "section-11",
        title: "11. Third-Party Websites",
        blocks: [
          {
            type: "paragraph",
            text: "Our website may contain links to third-party websites, social media platforms, payment providers or other external services.",
          },
          {
            type: "paragraph",
            text: "Royal Longevity is not responsible for the privacy practices, security or content of third-party websites.",
          },
        ],
      },
      {
        id: "section-12",
        title: "12. Changes to This Privacy Policy",
        blocks: [
          {
            type: "paragraph",
            text: "We may update this Privacy Policy from time to time. The latest version will be published on this page with its effective date.",
          },
        ],
      },
      {
        id: "section-13",
        title: "13. Contact Us",
        blocks: [
          {
            type: "paragraph",
            text: "Royal Longevity Center Personal Care and Beauty LLC",
          },
          {
            type: "paragraph",
            text: "Ajman, United Arab Emirates",
          },
          {
            type: "paragraph",
            text: "Website: www.royallongevity.ae",
          },
          {
            type: "contact",
            text: "Contact our team through our Contact page.",
          },
        ],
      },
    ],
  },
  terms: {
    dates: [],
    introduction: [
      {
        type: "paragraph",
        text: "These Terms & Conditions govern your use of the Royal Longevity website and, where applicable, your booking, purchase or participation in services offered through Royal Longevity.",
      },
      {
        type: "paragraph",
        text: "By using the website or submitting a booking or purchase, you acknowledge that you have read and accepted these Terms & Conditions.",
      },
    ],
    sections: [
      {
        id: "section-1",
        title: "1. About Royal Longevity",
        blocks: [
          {
            type: "paragraph",
            text: "Royal Longevity is a luxury beauty, wellness, fitness, hospitality, retail and lifestyle destination in Ajman, UAE.",
          },
          {
            type: "paragraph",
            text: "Certain services may be operated by separately licensed departments, specialist partners, joint ventures or affiliated entities. Where a service is provided by a separately licensed operator, that operator may have additional terms applicable to the relevant service.",
          },
        ],
      },
      {
        id: "section-2",
        title: "2. Website Use",
        blocks: [
          {
            type: "paragraph",
            text: "You agree to use this website lawfully and not to:",
          },
          {
            type: "list",
            items: [
              "misuse the website;",
              "attempt unauthorized access;",
              "interfere with website security;",
              "introduce malicious software;",
              "copy or reproduce protected content without authorization;",
              "use the website for fraudulent or unlawful purposes.",
            ],
          },
        ],
      },
      {
        id: "section-3",
        title: "3. Information on the Website",
        blocks: [
          {
            type: "paragraph",
            text: "We aim to keep website information accurate and current. However, images, prices, service descriptions, availability, promotional offers, opening hours and other information may change without notice.",
          },
          {
            type: "paragraph",
            text: "The website may contain conceptual, illustrative or promotional images that may not represent the exact final service, facility or product.",
          },
        ],
      },
      {
        id: "section-4",
        title: "4. Appointments and Bookings",
        blocks: [
          {
            type: "paragraph",
            text: "Appointments are subject to availability and confirmation.",
          },
          {
            type: "paragraph",
            text: "A booking may require contact information, deposit or payment depending on the service.",
          },
          {
            type: "paragraph",
            text: "Royal Longevity reserves the right to modify or cancel a booking where necessary because of operational, technical, safety, regulatory or other legitimate reasons.",
          },
        ],
      },
      {
        id: "section-5",
        title: "5. Cancellation and No-Show Policy",
        blocks: [
          {
            type: "paragraph",
            text: "Cancellation, rescheduling, deposit and no-show rules may differ depending on the department, service, package or membership.",
          },
          {
            type: "paragraph",
            text: "The applicable policy presented at the time of booking shall apply.",
          },
        ],
      },
      {
        id: "section-6",
        title: "6. Prices and Payments",
        blocks: [
          {
            type: "paragraph",
            text: "Prices displayed on the website are subject to change.",
          },
          {
            type: "paragraph",
            text: "Unless expressly stated otherwise, applicable taxes, fees or charges will be presented during the relevant transaction.",
          },
          {
            type: "paragraph",
            text: "For UAE e-commerce transactions, applicable electronic-commerce and consumer-protection requirements must also be observed.",
          },
        ],
      },
      {
        id: "section-7",
        title: "7. Memberships",
        blocks: [
          {
            type: "paragraph",
            text: "Memberships may include specific validity periods, usage limitations, blackout periods, booking requirements, guest privileges and renewal rules.",
          },
          {
            type: "paragraph",
            text: "Memberships are personal unless expressly stated otherwise.",
          },
          {
            type: "paragraph",
            text: "Unused benefits may expire according to the applicable membership terms.",
          },
        ],
      },
      {
        id: "section-8",
        title: "8. Packages",
        blocks: [
          {
            type: "paragraph",
            text: "Packages may include a defined number of services, specified validity periods and usage conditions.",
          },
          {
            type: "paragraph",
            text: "Package services are subject to availability and applicable booking requirements.",
          },
          {
            type: "paragraph",
            text: "Unless specifically stated, packages are not transferable, exchangeable or refundable after use or commencement, subject to applicable law.",
          },
        ],
      },
      {
        id: "section-9",
        title: "9. Promotions and Offers",
        blocks: [
          {
            type: "paragraph",
            text: "Promotions are subject to their individual terms.",
          },
          {
            type: "paragraph",
            text: "Royal Longevity may specify eligibility, validity period, redemption limits and excluded services.",
          },
          {
            type: "paragraph",
            text: "Promotions cannot be combined unless expressly stated.",
          },
        ],
      },
      {
        id: "section-10",
        title: "10. Health, Medical and Wellness Disclaimer",
        blocks: [
          {
            type: "paragraph",
            text: "Information appearing on the website regarding health, wellness, aesthetics, fitness or medical services is for general informational purposes and does not constitute medical advice unless specifically provided by a duly licensed healthcare professional as part of an appropriate clinical relationship.",
          },
          {
            type: "paragraph",
            text: "Medical and clinical services are subject to the applicable UAE licensing and healthcare requirements. UAE legislation separately regulates healthcare facilities and health-information systems.",
          },
          {
            type: "paragraph",
            text: "Patients should provide complete and accurate information relevant to their treatment.",
          },
          {
            type: "paragraph",
            text: "No website content should be understood as a guarantee of a particular medical, aesthetic, cosmetic, wellness or fitness outcome.",
          },
        ],
      },
      {
        id: "section-11",
        title: "11. Results and Outcomes",
        blocks: [
          {
            type: "paragraph",
            text: "Individual results may differ according to personal characteristics, health, lifestyle, compliance, treatment protocol and other factors.",
          },
          {
            type: "paragraph",
            text: "Royal Longevity does not guarantee that a particular aesthetic, beauty, wellness, fitness or clinical result will be achieved.",
          },
        ],
      },
      {
        id: "section-12",
        title: "12. User Responsibilities",
        blocks: [
          {
            type: "paragraph",
            text: "Users are responsible for providing accurate information and informing the relevant professional of any material health conditions, allergies, medications, contraindications or other information relevant to safe service delivery.",
          },
        ],
      },
      {
        id: "section-13",
        title: "13. Gift Cards and Vouchers",
        blocks: [
          {
            type: "paragraph",
            text: "Gift cards and vouchers are subject to their specific validity, redemption and usage conditions.",
          },
          {
            type: "paragraph",
            text: "Lost or unauthorized gift cards may not be replaceable unless otherwise required by applicable law.",
          },
        ],
      },
      {
        id: "section-14",
        title: "14. Intellectual Property",
        blocks: [
          {
            type: "paragraph",
            text: "All website content, including trademarks, logos, photographs, graphics, designs, text, videos, concepts and other materials, belongs to Royal Longevity or its respective licensors unless otherwise stated.",
          },
          {
            type: "paragraph",
            text: "No material may be copied, reproduced, modified, distributed or commercially used without prior written authorization.",
          },
        ],
      },
      {
        id: "section-15",
        title: "15. User-Generated Content",
        blocks: [
          {
            type: "paragraph",
            text: "Where Royal Longevity permits reviews, testimonials, photographs or other user content, you confirm that you have the right to submit the material and that it does not unlawfully infringe third-party rights.",
          },
          {
            type: "paragraph",
            text: "By submitting content, you grant Royal Longevity a non-exclusive right to use it for legitimate business, marketing or communication purposes, subject to applicable law and any required consent.",
          },
        ],
      },
      {
        id: "section-16",
        title: "16. Privacy",
        blocks: [
          {
            type: "paragraph",
            text: "Your use of the website is also governed by the Royal Longevity Privacy Policy.",
          },
        ],
      },
      {
        id: "section-17",
        title: "17. Third-Party Services",
        blocks: [
          {
            type: "paragraph",
            text: "The website may use or link to external services, including payment providers, maps, social media, booking systems, analytics providers and communication platforms.",
          },
          {
            type: "paragraph",
            text: "Third-party services may have their own terms and privacy policies.",
          },
        ],
      },
      {
        id: "section-18",
        title: "18. Limitation of Liability",
        blocks: [
          {
            type: "paragraph",
            text: "To the extent permitted by UAE law, Royal Longevity shall not be liable for indirect, incidental or consequential loss arising from use of the website or temporary website unavailability.",
          },
          {
            type: "paragraph",
            text: "Nothing in these Terms is intended to exclude or limit liability where such exclusion or limitation is prohibited by applicable law.",
          },
        ],
      },
      {
        id: "section-19",
        title: "19. Force Majeure",
        blocks: [
          {
            type: "paragraph",
            text: "Royal Longevity shall not be responsible for delays, interruption or inability to provide services caused by circumstances beyond its reasonable control, including government action, emergencies, natural disasters, major technical failures, epidemics, infrastructure failures or other force majeure events.",
          },
        ],
      },
      {
        id: "section-20",
        title: "20. Changes to Services",
        blocks: [
          {
            type: "paragraph",
            text: "Royal Longevity may modify, suspend or discontinue any website feature, department, service, facility, package or promotion where reasonably necessary.",
          },
        ],
      },
      {
        id: "section-21",
        title: "21. Governing Law",
        blocks: [
          {
            type: "paragraph",
            text: "These Terms & Conditions shall be governed by the applicable laws of the United Arab Emirates and the Emirate of Ajman.",
          },
          {
            type: "paragraph",
            text: "Any dispute shall be subject to the jurisdiction of the competent courts of Ajman, UAE, unless applicable law requires otherwise.",
          },
        ],
      },
      {
        id: "section-22",
        title: "22. Contact",
        blocks: [
          {
            type: "paragraph",
            text: "Royal Longevity Center Personal Care and Beauty LLC",
          },
          {
            type: "paragraph",
            text: "Ajman, United Arab Emirates",
          },
          {
            type: "paragraph",
            text: "Website: www.royallongevity.ae",
          },
          {
            type: "contact",
            text: "Contact our team through our Contact page.",
          },
        ],
      },
    ],
  },
  disclaimer: {
    dates: [],
    introduction: [],
    sections: [
      {
        id: "section-1",
        title: "1. General Website Information",
        blocks: [
          {
            type: "paragraph",
            text: "The information presented on the Royal Longevity website is provided for general informational and promotional purposes only.",
          },
          {
            type: "paragraph",
            text: "Information about beauty, wellness, fitness, nutrition, aesthetics, spa treatments, medical services, products, memberships, packages and other services is intended to help visitors understand the services available at Royal Longevity.",
          },
          {
            type: "paragraph",
            text: "Website content does not replace professional advice, examination, diagnosis or consultation.",
          },
        ],
      },
      {
        id: "section-2",
        title: "2. Medical & Clinical Services",
        blocks: [
          {
            type: "paragraph",
            text: "Certain services offered through Royal Longevity may be medical, aesthetic or clinical in nature and may only be provided by appropriately licensed professionals and facilities.",
          },
          {
            type: "paragraph",
            text: "Information published on the website regarding medical, aesthetic or health-related services does not constitute medical advice, diagnosis or treatment.",
          },
          {
            type: "paragraph",
            text: "A website visitor should not rely solely on website information when making a medical or health-related decision.",
          },
          {
            type: "paragraph",
            text: "A qualified healthcare professional must assess the individual circumstances of each client/patient before determining whether a particular treatment or procedure is appropriate.",
          },
        ],
      },
      {
        id: "section-3",
        title: "3. Individual Results",
        blocks: [
          {
            type: "paragraph",
            text: "Beauty, aesthetic, wellness and medical results vary from person to person.",
          },
          {
            type: "paragraph",
            text: "Results may depend on factors including age, health condition, skin or hair condition, lifestyle, medical history, treatment protocol, compliance and individual response.",
          },
          {
            type: "paragraph",
            text: "Royal Longevity does not guarantee any particular result, outcome or improvement.",
          },
          {
            type: "paragraph",
            text: "Before-and-after photographs, testimonials and examples displayed on the website are illustrative and may not represent the results that every client will achieve.",
          },
        ],
      },
      {
        id: "section-4",
        title: "4. Health Information Provided by the Client",
        blocks: [
          {
            type: "paragraph",
            text: "Clients are responsible for providing accurate and complete information regarding relevant:",
          },
          {
            type: "list",
            items: [
              "medical conditions;",
              "allergies;",
              "medications;",
              "previous treatments;",
              "pregnancy;",
              "contraindications;",
              "injuries;",
              "health conditions; and",
              "other information that may affect the safe provision of a service.",
            ],
          },
          {
            type: "paragraph",
            text: "Failure to provide accurate information may affect the suitability or safety of a treatment.",
          },
        ],
      },
      {
        id: "section-5",
        title: "5. Treatment Suitability",
        blocks: [
          {
            type: "paragraph",
            text: "Royal Longevity or the relevant licensed specialist may determine that a service, treatment or procedure is not suitable for a particular client.",
          },
          {
            type: "paragraph",
            text: "A booking or enquiry does not automatically mean that the requested treatment will be provided.",
          },
          {
            type: "paragraph",
            text: "Where professional assessment identifies a contraindication or safety concern, the service may be postponed, modified or declined.",
          },
        ],
      },
      {
        id: "section-6",
        title: "6. Emergency / Medical Assistance",
        blocks: [
          {
            type: "paragraph",
            text: "The website is not an emergency medical service.",
          },
          {
            type: "paragraph",
            text: "For an emergency, users should immediately contact the appropriate UAE emergency services or seek urgent medical attention.",
          },
        ],
      },
      {
        id: "section-7",
        title: "7. Fitness, Gym & Wellness",
        blocks: [
          {
            type: "paragraph",
            text: "Information regarding fitness, exercise, Pilates, swimming, sauna, massage, wellness and related activities is provided for general informational purposes.",
          },
          {
            type: "paragraph",
            text: "Participation in physical activity carries inherent risks.",
          },
          {
            type: "paragraph",
            text: "Clients should disclose relevant health conditions and seek appropriate professional advice where necessary before undertaking activities that may affect their health or safety.",
          },
        ],
      },
      {
        id: "section-8",
        title: "8. Products & Supplements",
        blocks: [
          {
            type: "paragraph",
            text: "Information regarding beauty, wellness, nutrition or related products is not intended to constitute medical advice.",
          },
          {
            type: "paragraph",
            text: "Customers should follow the manufacturer's instructions and seek professional advice where appropriate, particularly when using products in connection with a medical condition, pregnancy, allergies or medication.",
          },
        ],
      },
      {
        id: "section-9",
        title: "9. Website Accuracy",
        blocks: [
          {
            type: "paragraph",
            text: "Royal Longevity makes reasonable efforts to maintain accurate website information.",
          },
          {
            type: "paragraph",
            text: "However, service availability, prices, opening hours, treatment descriptions, practitioners, facilities, photographs, packages and promotions may change without prior notice.",
          },
          {
            type: "paragraph",
            text: "Images may be illustrative and may not always represent the exact current appearance of a facility, product or service.",
          },
        ],
      },
      {
        id: "section-10",
        title: "10. Third-Party Information",
        blocks: [
          {
            type: "paragraph",
            text: "The website may contain links to external websites, social media accounts, booking platforms, payment providers or other third-party services.",
          },
          {
            type: "paragraph",
            text: "Royal Longevity is not responsible for the content, accuracy, privacy practices or availability of third-party websites.",
          },
        ],
      },
      {
        id: "section-11",
        title: "11. No Professional Reliance",
        blocks: [
          {
            type: "paragraph",
            text: "Nothing on the Royal Longevity website should be interpreted as:",
          },
          {
            type: "paragraph",
            text: "medical advice; diagnosis; treatment advice; a guaranteed health outcome; financial advice; or a guarantee that a particular service is suitable for every person.",
          },
        ],
      },
      {
        id: "section-12",
        title: "12. Acceptance",
        blocks: [
          {
            type: "paragraph",
            text: "By using the Royal Longevity website, the visitor acknowledges that website information is provided for general informational purposes and agrees to review the applicable service, booking, membership, package and treatment terms before proceeding.",
          },
        ],
      },
    ],
  },
};
