/* Translations + the `i18n` Alpine component the whole page hangs off.
   English lives in the markup as the no-JS fallback; every other language
   resolves through t(), falling back to English for any missing key. */
(function () {
    var I18N = {
        en: {
            "meta.title": "Sonco — The real estate platform that works while you sell",
            "meta.description": "CRM, listings, and follow-ups in one workspace — with AI built in, not bolted on. One price per office, everything included.",
            "nav.features": "Features",
            "nav.pricing": "Pricing",
            "nav.contact": "Contact",
            "nav.langLabel": "Language",
            "hero.cta": "Request a demo",
            "hero.alt": "The Sonco workspace showing the client pipeline and listing details.",
            "features.title": "Built for the way agents work",
            "features.crm.title": "Every client, clearly organised",
            "features.crm.body": "All your buyers, sellers, and leads together — see their full history, requirements, and next steps. Nothing falls through the cracks between viewings.",
            "features.listings.title": "Every property on one record",
            "features.listings.body": "Photos, descriptions, prices, keys and owner paperwork in one place. Update it once and everyone in the office is looking at the same thing.",
            "features.web.title": "A website that runs itself",
            "features.web.body": "Every agency gets a fast, polished site connected straight to Sonco — listings publish themselves, enquiries land in your CRM, nothing to maintain.",
            "features.portals.title": "Published to every portal",
            "features.portals.body": "Kyero, Idealista, thinkSPAIN and the rest, fed from the same record. Switch a portal on or off per listing and the feed follows.",
            "why.title": "Why Sonco",
            "why.industry.title": "Built in the industry",
            "why.industry.body": "Made by someone who works in real estate every day — not a tech company guessing.",
            "why.size.title": "Any size of agency",
            "why.size.body": "The same workspace fits a single agent, a busy office, or a multi-national franchise.",
            "why.fast.title": "Fast everywhere",
            "why.fast.body": "Pages load in under 50ms — on office wifi or a phone at a viewing.",
            "why.secure.title": "Secure by design",
            "why.secure.body": "Passwordless sign-in — nothing to forget, nothing to steal.",
            "footer.privacy": "Privacy",
            "footer.terms": "Terms",
            "footer.contact": "Contact",
            "hero.title": "<em>The</em> real estate platform for agencies {where}",
            "hero.subtitle": "Listings, contacts and your website in one place, published to every portal your buyers use. Built by an agent who works here.",
            "hero.ctaNote": "20 minutes, on your own listings. No commitment.",
            "founder.title": "Built by an estate agent, not a software company",
            "founder.body1": "I'm Scott, an estate agent on the Costa Blanca. I built Sonco because the software I used every day was made by people who had never sat with a buyer, re-typed a listing into four portals, or answered a portal enquiry at nine at night.",
            "founder.body2": "Sonco is what I wanted on my own desk: one place for listings, contacts and the website, that publishes everywhere and never asks you to type the same thing twice. Every agency that signs up gets me on the setup call.",
            "founder.role": "Founder, Sonco",
            "faq.title": "Common questions",
            "faq.q1": "How long does setup take?",
            "faq.a1": "One call. We import your listings and contacts, connect your portal feeds and put your website live, with you on the phone. Most agencies are working in Sonco the same week.",
            "faq.q2": "Can you import from my current system?",
            "faq.a2": "Yes. Contacts come in from a spreadsheet export with a guided column match, and listings with their photos come in from the portal feed you already publish. You keep working while it runs.",
            "faq.q3": "Do I keep my own portal accounts?",
            "faq.a3": "Yes. Your Kyero, Idealista and other accounts stay yours. Sonco produces the feed each portal reads, and you switch each portal on or off per listing.",
            "faq.q4": "What happens to my data if I leave?",
            "faq.a4": "It stays yours. Export your contacts as a spreadsheet at any time, and on request we hand you a complete copy of your agency's data and photos. Nothing is held back and nothing is charged for it.",
            "faq.q5": "Does it work with more than one office?",
            "faq.q6": "Who owns the website?",
            "faq.a6": "You do. It runs on your own domain under your own name, logo and colours, and every enquiry lands straight in your CRM. Nothing to host and nothing to update.",
            "faq.q7": "Which languages does it work in?",
            "faq.a7": "The workspace runs in English and Spanish. Listing text is translated per language for your website and the portals, and every email to a contact goes out in that contact's language.",
            "form.title": "See Sonco on your own listings",
            "form.body": "Tell us a little about your agency and we'll set up a 20-minute demo on your listings, in your language.",
            "form.name": "Your name",
            "form.agency": "Agency",
            "form.email": "Email",
            "form.phone": "Phone (optional)",
            "form.agents": "How many agents?",
            "form.agents1": "Just me",
            "form.agents2": "2 to 5",
            "form.agents3": "6 to 10",
            "form.agents4": "More than 10",
            "form.message": "Anything we should know? (optional)",
            "form.submit": "Request a demo",
            "form.sending": "Sending…",
            "form.sentTitle": "Thanks, we'll be in touch",
            "form.sentBody": "You'll hear from Scott within one working day to fix a time.",
            "form.error": "That didn't send. Email us at hello@sonco.ai instead.",
            "form.privacy": "Used only to arrange your demo.",
            "nav.about": "About",
            "nav.faq": "FAQ",
            "portals.title": "Every portal, connected.",
            "faq.a5": "Yes. Each user works in one or several branches and every list filters by branch. The Office plan is one office; several offices are the Group plan, priced on a quote.",
            "more.deals.title": "Every deal, end to end",
            "more.deals.body": "From offer to completion on one record: milestone dates, the commission, who did what and when. Nothing typed twice.",
            "more.matching.title": "Buyers matched automatically",
            "more.matching.body": "Every new listing is checked against every buyer's saved search the moment it goes live, and they hear about it in their own language.",
            "more.drafts.title": "AI drafts, you decide",
            "more.drafts.body": "Listing descriptions and enquiry replies drafted from the record, every number checked against it before you see a word.",
            "more.translate.title": "Listings in every language",
            "more.translate.body": "One description, translated for the portals and your website in the languages your buyers read.",
            "more.viewings.title": "Viewings as a tour",
            "more.viewings.body": "Several properties on one viewing, a time per stop, directions for the drive and a reminder before each one.",
            "more.timeline.title": "One timeline per record",
            "more.timeline.body": "Notes, changes, emails and viewings on a property, a contact or a deal, with who did it and when.",
            "more.interest.title": "How each listing is doing",
            "more.interest.body": "Website views, enquiries and viewings per property, this month against last, for the call with the owner.",
            "more.search.title": "Natural-language search",
            "more.search.body": "Ask for “three-bed villa in Moraira under 400k” and get exactly that. No filter forms.",
            "more.metrics.title": "The numbers that run the office",
            "more.metrics.body": "Listings, pipeline, commission earned and response times, live, by branch.",
            "more.tasks.title": "Tasks and reminders",
            "more.tasks.body": "Follow-ups, callbacks and paperwork against any record, with a reminder that fires when you said.",
            "more.data.title": "In from your old system, out whenever you want",
            "more.data.body": "Contacts from a spreadsheet, listings and photos from your portal feed. Export your contacts any time; your whole agency on request.",
            "more.documents.title": "Private documents, GDPR built in",
            "more.documents.body": "Passports, contracts and mandates on the record, served only to staff who may see them. Erasure and data-subject exports by name.",
            "pricing.title": "Simple pricing. Everything included.",
            "pricing.subtitle": "One product, priced by how many of you use it. No feature gating, unlimited properties.",
            "pricing.trial": "14-day free trial on the Office plan. No card needed.",
            "pricing.periodLabel": "Billing period",
            "pricing.monthly": "Pay monthly",
            "pricing.yearly": "Pay yearly",
            "pricing.yearlyNote": "Pay yearly and get 12 months for the price of 10.",
            "pricing.perMonthVat": "/month + IVA",
            "pricing.perYearVat": "/year + IVA",
            "pricing.solo.name": "Solo",
            "pricing.solo.who": "1 user, 1 office",
            "pricing.solo.onboarding": "Self-serve, no onboarding fee",
            "pricing.solo.storage": "20 GB storage",
            "pricing.office.name": "Office",
            "pricing.office.who": "Up to 9 users, 1 office",
            "pricing.office.onboarding": "€250 migration & onboarding, waived for founding agencies",
            "pricing.office.extra": "€8/month per extra user",
            "pricing.office.storage": "50 GB storage",
            "pricing.group.name": "Group",
            "pricing.group.who": "10+ users or several offices",
            "pricing.group.price": "Let's talk",
            "pricing.group.onboarding": "Migration & onboarding in your quote",
            "pricing.cta": "Request a demo",
            "pricing.contactCta": "Get in touch",
            "pricing.inc1.title": "Unlimited properties",
            "pricing.inc1.body": "No listing caps, no tiers.",
            "pricing.inc2.title": "Your agency website",
            "pricing.inc2.body": "Included, not an add-on.",
            "pricing.inc3.title": "AI included",
            "pricing.inc3.body": "Descriptions, translations and summaries under fair use. No credits to buy.",
            "pricing.inc4.title": "Publishing, all in",
            "pricing.inc4.body": "Portal feeds, alerts and enquiries, in and out.",
            "pricing.inc5.title": "Video & virtual tours",
            "pricing.inc5.body": "Embed from YouTube, Vimeo or Matterport.",
            "pricing.inc6.title": "Your data, exportable",
            "pricing.inc6.body": "Full export in open formats, whenever you ask."
        },
        es: {
            "meta.title": "Sonco — La plataforma inmobiliaria que trabaja mientras tú vendes",
            "meta.description": "CRM, inmuebles y seguimientos en un solo espacio de trabajo, con IA integrada de verdad. Un precio por oficina, todo incluido.",
            "nav.features": "Funciones",
            "nav.pricing": "Precios",
            "nav.contact": "Contacto",
            "nav.langLabel": "Idioma",
            "hero.cta": "Solicita una demo",
            "hero.alt": "El espacio de trabajo de Sonco con el pipeline de clientes y los detalles de un inmueble.",
            "features.title": "Diseñada para cómo trabajan los agentes",
            "features.crm.title": "Cada cliente, perfectamente organizado",
            "features.crm.body": "Compradores, vendedores y leads, todos juntos: consulta su historial completo, sus requisitos y los próximos pasos. Nada se pierde entre visita y visita.",
            "features.listings.title": "Cada inmueble en una sola ficha",
            "features.listings.body": "Fotos, descripciones, precios, llaves y documentación del propietario en un mismo sitio. Actualízalo una vez y toda la oficina ve lo mismo.",
            "features.web.title": "Una web que se gestiona sola",
            "features.web.body": "Cada agencia recibe una web rápida y cuidada conectada directamente a Sonco: los inmuebles se publican solos, las solicitudes llegan a tu CRM y no hay nada que mantener.",
            "features.portals.title": "Publicado en todos los portales",
            "features.portals.body": "Kyero, Idealista, thinkSPAIN y los demás, alimentados desde la misma ficha. Activa o desactiva un portal por inmueble y el feed se ajusta solo.",
            "why.title": "Por qué Sonco",
            "why.industry.title": "Nacida en el sector",
            "why.industry.body": "Creada por alguien que trabaja en el sector inmobiliario cada día, no por una tecnológica haciendo suposiciones.",
            "why.size.title": "Para agencias de cualquier tamaño",
            "why.size.body": "El mismo espacio de trabajo sirve para un agente independiente, una oficina con mucho movimiento o una franquicia multinacional.",
            "why.fast.title": "Rápida en todas partes",
            "why.fast.body": "Las páginas cargan en menos de 50 ms, con el wifi de la oficina o con el móvil en una visita.",
            "why.secure.title": "Segura por diseño",
            "why.secure.body": "Acceso sin contraseñas: nada que olvidar, nada que robar.",
            "footer.privacy": "Privacidad",
            "footer.terms": "Términos",
            "footer.contact": "Contacto",
            "hero.title": "<em>La</em> plataforma inmobiliaria para agencias {where}",
            "hero.subtitle": "Inmuebles, contactos y tu web en un solo lugar, publicados en todos los portales que usan tus compradores. Creado por un agente que trabaja aquí.",
            "hero.ctaNote": "20 minutos, con tus propios inmuebles. Sin compromiso.",
            "founder.title": "Creado por un agente inmobiliario, no por una empresa de software",
            "founder.body1": "Soy Scott, agente inmobiliario en la Costa Blanca. Creé Sonco porque el software que usaba cada día lo habían hecho personas que nunca se habían sentado con un comprador, ni habían vuelto a teclear un inmueble en cuatro portales, ni contestado una solicitud de un portal a las nueve de la noche.",
            "founder.body2": "Sonco es lo que quería tener en mi propia mesa: un solo lugar para inmuebles, contactos y la web, que publica en todas partes y nunca te pide escribir lo mismo dos veces. En cada agencia que se da de alta, la llamada de puesta en marcha la hago yo.",
            "founder.role": "Fundador de Sonco",
            "faq.title": "Preguntas frecuentes",
            "faq.q1": "¿Cuánto tarda la puesta en marcha?",
            "faq.a1": "Una llamada. Importamos tus inmuebles y contactos, conectamos los feeds de los portales y ponemos tu web en marcha, contigo al teléfono. La mayoría de las agencias trabajan en Sonco esa misma semana.",
            "faq.q2": "¿Podéis importar desde mi sistema actual?",
            "faq.a2": "Sí. Los contactos entran desde una hoja de cálculo con una asignación guiada de columnas, y los inmuebles con sus fotos desde el feed de portal que ya publicas. Tú sigues trabajando mientras tanto.",
            "faq.q3": "¿Conservo mis cuentas en los portales?",
            "faq.a3": "Sí. Tus cuentas de Kyero, Idealista y el resto siguen siendo tuyas. Sonco genera el feed que lee cada portal, y tú activas o desactivas cada portal por inmueble.",
            "faq.q4": "¿Qué pasa con mis datos si me voy?",
            "faq.a4": "Siguen siendo tuyos. Exporta tus contactos en una hoja de cálculo cuando quieras y, si lo pides, te entregamos una copia completa de los datos y fotos de tu agencia. No se retiene nada ni se cobra por ello.",
            "faq.q5": "¿Funciona con más de una oficina?",
            "faq.q6": "¿De quién es la web?",
            "faq.a6": "Tuya. Funciona en tu propio dominio con tu nombre, tu logo y tus colores, y cada solicitud llega directamente a tu CRM. Nada que alojar y nada que actualizar.",
            "faq.q7": "¿En qué idiomas funciona?",
            "faq.a7": "El espacio de trabajo funciona en español e inglés. Los textos de los inmuebles se traducen por idioma para tu web y los portales, y cada email a un contacto sale en el idioma de ese contacto.",
            "form.title": "Mira Sonco con tus propios inmuebles",
            "form.body": "Cuéntanos un poco sobre tu agencia y preparamos una demo de 20 minutos con tus inmuebles, en tu idioma.",
            "form.name": "Tu nombre",
            "form.agency": "Agencia",
            "form.email": "Email",
            "form.phone": "Teléfono (opcional)",
            "form.agents": "¿Cuántos agentes sois?",
            "form.agents1": "Solo yo",
            "form.agents2": "De 2 a 5",
            "form.agents3": "De 6 a 10",
            "form.agents4": "Más de 10",
            "form.message": "¿Algo que debamos saber? (opcional)",
            "form.submit": "Solicita una demo",
            "form.sending": "Enviando…",
            "form.sentTitle": "Gracias, te escribimos pronto",
            "form.sentBody": "Scott te contactará en un día laborable para fijar una hora.",
            "form.error": "No se ha podido enviar. Escríbenos a hello@sonco.ai.",
            "form.privacy": "Solo lo usamos para organizar tu demo.",
            "nav.about": "Sobre Sonco",
            "nav.faq": "Preguntas",
            "portals.title": "Todos los portales, conectados.",
            "faq.a5": "Sí. Cada usuario trabaja en una o varias oficinas y todos los listados se filtran por oficina. El plan Agencia es para una oficina; varias oficinas van en el plan Grupo, con presupuesto.",
            "more.deals.title": "Cada operación, de principio a fin",
            "more.deals.body": "De la oferta a la firma en una sola ficha: fechas clave, la comisión, quién hizo qué y cuándo. Nada se escribe dos veces.",
            "more.matching.title": "Compradores cruzados automáticamente",
            "more.matching.body": "Cada nuevo inmueble se compara con la búsqueda guardada de cada comprador en cuanto se publica, y se enteran en su propio idioma.",
            "more.drafts.title": "La IA redacta, tú decides",
            "more.drafts.body": "Descripciones de inmuebles y respuestas a solicitudes redactadas a partir de la ficha, con cada cifra comprobada antes de que veas una palabra.",
            "more.translate.title": "Inmuebles en todos los idiomas",
            "more.translate.body": "Una descripción, traducida para los portales y tu web a los idiomas que leen tus compradores.",
            "more.viewings.title": "Visitas como una ruta",
            "more.viewings.body": "Varios inmuebles en una sola visita, una hora por parada, indicaciones para el trayecto y un recordatorio antes de cada una.",
            "more.timeline.title": "Una cronología por ficha",
            "more.timeline.body": "Notas, cambios, emails y visitas de un inmueble, un contacto o una operación, con quién lo hizo y cuándo.",
            "more.interest.title": "Cómo va cada inmueble",
            "more.interest.body": "Visitas a la web, solicitudes y visitas presenciales por inmueble, este mes frente al anterior, para la llamada con el propietario.",
            "more.search.title": "Búsqueda en lenguaje natural",
            "more.search.body": "Pide «chalet de tres habitaciones en Moraira por menos de 400k» y obtén exactamente eso. Sin formularios de filtros.",
            "more.metrics.title": "Las cifras que mueven la oficina",
            "more.metrics.body": "Inmuebles, cartera, comisiones y tiempos de respuesta, en directo, por oficina.",
            "more.tasks.title": "Tareas y recordatorios",
            "more.tasks.body": "Seguimientos, llamadas y papeleo sobre cualquier ficha, con un recordatorio que salta cuando tú dijiste.",
            "more.data.title": "Entra desde tu sistema anterior, sale cuando quieras",
            "more.data.body": "Contactos desde una hoja de cálculo, inmuebles y fotos desde tu feed de portal. Exporta tus contactos cuando quieras; toda tu agencia, si lo pides.",
            "more.documents.title": "Documentos privados, RGPD incluido",
            "more.documents.body": "Pasaportes, contratos y hojas de encargo en la ficha, visibles solo para el personal autorizado. Supresión y exportación de datos personales por nombre.",
            "pricing.title": "Precios sencillos. Todo incluido.",
            "pricing.subtitle": "Un solo producto, según cuántos lo usáis. Sin funciones capadas, inmuebles ilimitados.",
            "pricing.trial": "14 días de prueba gratis en el plan Agencia. Sin tarjeta.",
            "pricing.periodLabel": "Periodo de facturación",
            "pricing.monthly": "Pago mensual",
            "pricing.yearly": "Pago anual",
            "pricing.yearlyNote": "Paga al año y llévate 12 meses por el precio de 10.",
            "pricing.perMonthVat": "/mes + IVA",
            "pricing.perYearVat": "/año + IVA",
            "pricing.solo.name": "Agente",
            "pricing.solo.who": "1 usuario, 1 oficina",
            "pricing.solo.onboarding": "Alta por tu cuenta, sin cuota",
            "pricing.solo.storage": "20 GB de almacenamiento",
            "pricing.office.name": "Agencia",
            "pricing.office.who": "Hasta 9 usuarios, 1 oficina",
            "pricing.office.onboarding": "250 € de migración y puesta en marcha, gratis para agencias fundadoras",
            "pricing.office.extra": "8 €/mes por usuario adicional",
            "pricing.office.storage": "50 GB de almacenamiento",
            "pricing.group.name": "Grupo",
            "pricing.group.who": "10+ usuarios o varias oficinas",
            "pricing.group.price": "Hablemos",
            "pricing.group.onboarding": "Migración y puesta en marcha en tu presupuesto",
            "pricing.cta": "Solicita una demo",
            "pricing.contactCta": "Escríbenos",
            "pricing.inc1.title": "Inmuebles ilimitados",
            "pricing.inc1.body": "Sin límites de anuncios ni niveles.",
            "pricing.inc2.title": "La web de tu agencia",
            "pricing.inc2.body": "Incluida, no un extra.",
            "pricing.inc3.title": "IA incluida",
            "pricing.inc3.body": "Descripciones, traducciones y resúmenes con uso razonable. Sin créditos que comprar.",
            "pricing.inc4.title": "Publicación, todo incluido",
            "pricing.inc4.body": "Feeds de portales, alertas y solicitudes, de entrada y de salida.",
            "pricing.inc5.title": "Vídeo y tours virtuales",
            "pricing.inc5.body": "Inserta desde YouTube, Vimeo o Matterport.",
            "pricing.inc6.title": "Tus datos, exportables",
            "pricing.inc6.body": "Exportación completa en formatos abiertos, cuando lo pidas."
        }
    };

    var SUPPORTED = Object.keys(I18N);

    /* {where} in hero.title. worker.mjs classifies the visitor's IP into one of
       these keys on <html data-place>; the wording per language lives here, so
       switching language re-renders without another request. */
    var PLACES = {
        blanca:    { en: "on the Costa Blanca",     es: "de la Costa Blanca" },
        sol:       { en: "on the Costa del Sol",    es: "de la Costa del Sol" },
        brava:     { en: "on the Costa Brava",      es: "de la Costa Brava" },
        calida:    { en: "on the Costa C\u00e1lida",    es: "de la Costa C\u00e1lida" },
        almeria:   { en: "on the Costa de Almer\u00eda", es: "de la Costa de Almer\u00eda" },
        luz:       { en: "on the Costa de la Luz",  es: "de la Costa de la Luz" },
        balearics: { en: "in the Balearics",        es: "de Baleares" },
        spain:     { en: "in Spain",                es: "de Espa\u00f1a" },
        costas:    { en: "on the costas",           es: "de la costa" }
    };

    function where(lang) {
        var key = document.documentElement.getAttribute("data-place");
        var place = PLACES[key] || PLACES.costas;
        return place[lang] || place.en;
    }

    var LANG_KEY = "sonco-lang";
    var LEGACY_LANG_KEY = "sonnco-lang";

    function initialLang() {
        var stored = null;
        // Read the old key too, so the rename doesn't silently drop the
        // language a returning visitor already chose.
        try { stored = localStorage.getItem(LANG_KEY) || localStorage.getItem(LEGACY_LANG_KEY); } catch (e) {}
        var candidates = [
            new URLSearchParams(location.search).get("lang"),
            stored,
            (navigator.language || "en").slice(0, 2).toLowerCase()
        ];
        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i] && SUPPORTED.indexOf(candidates[i]) !== -1) return candidates[i];
        }
        return "en";
    }

    document.addEventListener("alpine:init", function () {
        Alpine.data("i18n", function () {
            return {
                lang: initialLang(),
                languages: { en: "English", es: "Español" },
                init: function () {
                    this.applyDocument();
                    // Complete the key migration on first load, not only when
                    // the visitor next changes language.
                    this.persist();
                    this.$watch("lang", function () {
                        this.persist();
                        this.applyDocument();
                    }.bind(this));
                },
                persist: function () {
                    try {
                        localStorage.setItem(LANG_KEY, this.lang);
                        localStorage.removeItem(LEGACY_LANG_KEY);
                    } catch (e) {}
                },
                applyDocument: function () {
                    document.documentElement.lang = this.lang;
                    document.title = this.t("meta.title");
                    var desc = document.querySelector('meta[name="description"]');
                    if (desc) desc.setAttribute("content", this.t("meta.description"));
                },
                t: function (key) {
                    var dict = I18N[this.lang] || I18N.en;
                    var value = dict[key] != null ? dict[key] : I18N.en[key];
                    if (value == null) return "";
                    return value.indexOf("{where}") === -1
                        ? value
                        : value.replace("{where}", where(this.lang));
                }
            };
        });
    });
})();
