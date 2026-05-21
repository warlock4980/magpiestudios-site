const STORAGE_KEY = "magpie-red-light-sessions-v1";
const LANG_KEY = "magpie-red-light-lang-v1";
const CONSENT_KEY = "magpie-analytics-consent";
const CHAT_API_URL = window.RED_LIGHT_CHAT_API_URL || "https://magpiestudios-chat.onrender.com/chat";

const form = document.getElementById("sessionForm");
const sessionDate = document.getElementById("sessionDate");
const durationInput = document.getElementById("durationMinutes");
const painBefore = document.getElementById("painBefore");
const painAfter = document.getElementById("painAfter");
const painBeforeValue = document.getElementById("painBeforeValue");
const painAfterValue = document.getElementById("painAfterValue");
const timerDisplay = document.getElementById("timerDisplay");
const sessionList = document.getElementById("sessionList");
const barChart = document.getElementById("barChart");
const chatLauncher = document.getElementById("chatLauncher");
const chatPanel = document.getElementById("chatPanel");
const chatClose = document.getElementById("chatClose");
const chatExpand = document.getElementById("chatExpand");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const cookieBanner = document.getElementById("cookie-consent");
const cookieAccept = document.getElementById("cookie-consent-accept");
const cookieDecline = document.getElementById("cookie-consent-decline");

const translations = {
  en: {
    "nav.tracker": "Tracker",
    "nav.trends": "Trends",
    "nav.devices": "Devices",
    "hero.eyebrow": "Private session journal",
    "hero.title": "Red Light Therapy Tracker",
    "hero.lede": "Log sessions, comfort changes, device settings, and consistency without turning your wellness notes into a spreadsheet.",
    "hero.start": "Start logging",
    "hero.shop": "Shop NovaaLab",
    "hero.protocol": "Sample routine",
    "hero.local": "Local-first logs",
    "hero.csv": "CSV export",
    "hero.assistant": "AI-assisted guidance",
    "affiliate.disclosureShort": "Disclosure: Magpie Studios LLC may earn a commission if you buy through affiliate links on this page, at no extra cost to you.",
    "tracker.eyebrow": "Session",
    "tracker.title": "Log a session",
    "tracker.export": "Export CSV",
    "tracker.save": "Save session",
    "form.date": "Date",
    "form.bodyArea": "Body area",
    "form.device": "Device",
    "form.wavelength": "Wavelength",
    "form.duration": "Duration",
    "form.distance": "Distance",
    "form.painBefore": "Discomfort before",
    "form.painAfter": "Discomfort after",
    "form.notes": "Notes",
    "form.notesPlaceholder": "What changed? Sitting tolerance, setup, consistency, or anything worth remembering.",
    "body.tailbone": "Tailbone / coccyx",
    "body.lowerBack": "Lower back",
    "body.neck": "Neck / shoulders",
    "body.knee": "Knee / joint",
    "body.skin": "Skin / face",
    "body.other": "Other",
    "wave.redNir": "Red + NIR",
    "wave.red": "660 nm red",
    "wave.nir": "850 nm near infrared",
    "wave.unknown": "Mixed / unknown",
    "distance.contact": "Direct contact",
    "distance.six": "6 inches",
    "distance.twelve": "12 inches",
    "distance.eighteen": "18 inches",
    "distance.unknown": "Other / unknown",
    "timer.eyebrow": "Timer",
    "timer.start": "Start",
    "timer.pause": "Pause",
    "timer.reset": "Reset",
    "metrics.sessions": "Sessions",
    "metrics.minutes": "Total minutes",
    "metrics.change": "Avg change",
    "metrics.streak": "Streak",
    "trends.eyebrow": "Last 7 days",
    "trends.title": "Minutes logged",
    "recent.eyebrow": "Recent",
    "recent.title": "Session history",
    "recent.clear": "Clear",
    "info.protocolsTitle": "Track routines",
    "info.protocolsText": "Save the body area, device, wavelength, distance, duration, and before/after comfort score for each session.",
    "info.patternsTitle": "Spot patterns",
    "info.patternsText": "Use weekly minutes, streaks, and average change to see whether your routine is staying consistent.",
    "info.ownershipTitle": "Keep ownership",
    "info.ownershipText": "Your entries stay in this browser unless site/browser data is cleared. Export CSV before clearing data, using private browsing, or switching devices.",
    "build.eyebrow": "Need a page like this?",
    "build.title": "Magpie Studios builds polished product websites, trackers, and launch pages.",
    "build.text": "From affiliate-ready landing pages to interactive tools, we ship clean, fast, compliance-aware web experiences with the kind of details people remember.",
    "build.cta": "Hire Magpie Studios",
    "family.eyebrow": "Magpie family",
    "family.title": "Built beside the rest of the Magpie stack.",
    "family.labsLabel": "Magpie Labs",
    "family.labsTitle": "Research and active projects",
    "family.labsText": "Public notes on the research work that sharpens Magpie products.",
    "family.grubLabel": "GrubTrucks",
    "family.grubTitle": "Food-truck discovery",
    "family.grubText": "A live product for finding food trucks and helping vendors reach customers.",
    "family.studioLabel": "Magpie Studios",
    "family.studioTitle": "Apps, tools, and product experiments",
    "family.studioText": "The studio home for shipped tools, support, and future releases.",
    "shop.eyebrow": "Affiliate partner",
    "shop.title": "Need a red light device?",
    "shop.text": "NovaaLab offers accessible red light therapy products. Use your own judgment, read product details carefully, and talk to a qualified clinician for persistent or severe discomfort.",
    "shop.cta": "Shop NovaaLab",
    "affiliate.disclosureLong": "Disclosure: Magpie Studios LLC may earn a commission if you purchase through this link, at no extra cost to you.",
    "legal.title": "Health note",
    "legal.text": "This tracker is for personal logging and education. It is not medical advice and is not intended to diagnose, treat, cure, or prevent any disease. Seek medical care for severe, persistent, worsening, or unexplained symptoms.",
    "footer.copyright": "Copyright 2026 Magpie Studios LLC. Built in Arizona.",
    "footer.trademark": "Red Light Therapy Tracker and the Magpie mark are product marks of Magpie Studios LLC.",
    "cookie.text": "We use Google Analytics, with your consent, to count aggregate visits and improve this page. Affiliate links may earn Magpie Studios LLC a commission. See the Magpie Studios privacy policy for details.",
    "cookie.accept": "Accept analytics",
    "cookie.decline": "Decline",
    "chat.title": "Magpie Wellness Assistant",
    "chat.subtitle": "Session logging help",
    "chat.mode": "Tracker help",
    "chat.use": "Use tracker",
    "chat.log": "What to log",
    "chat.export": "Export",
    "chat.novaa": "NovaaLab",
    "chat.placeholder": "Ask about logging sessions...",
    "chat.send": "Send",
    "chat.footnote": "Informational only. Not medical advice. Do not share sensitive personal details.",
    "chat.expand": "Expand tracker assistant",
    "chat.collapse": "Collapse tracker assistant",
    "chat.thinking": "Checking the Magpie assistant...",
    "empty.sessions": "No sessions yet. Save your first one.",
    "recent.notes": "Notes",
    "recent.pain": "Discomfort",
    "unit.minutes": "minutes",
    "unit.min": "min",
    "unit.daysShort": "d",
    "confirm.clear": "Clear all saved red light therapy sessions from this browser?",
    chatIntro: "Hi. I can help you log sessions, understand the tracker, export data, and find the NovaaLab link. I cannot provide medical advice.",
    chatNoSessions: "You have no saved sessions yet. Start with one simple entry: body area, duration, distance, discomfort before, discomfort after, and one note about how sitting or movement felt.",
    chatStats: ({ count, minutes, avg }) => `You have ${count} saved session${count === 1 ? "" : "s"}, ${minutes} total minutes, and an average before/after change of ${avg.toFixed(1)} points. Export CSV if you want a backup or a doctor-friendly record.`,
    chatMedical: "I can help with tracking, but I cannot give medical advice or diagnose symptoms. For severe, persistent, worsening, bleeding, or unexplained symptoms, talk to a qualified clinician. The tracker is best used as a personal log you can export and discuss.",
    chatNovaa: 'The NovaaLab link is in the Devices section. Magpie Studios LLC may earn a commission if you buy through that link, at no extra cost to you. <a href="#shop">Jump to devices</a>.',
    chatExport: "Use the Export CSV button at the top of the tracker panel. It downloads your saved sessions from this browser as a spreadsheet-friendly file.",
    chatPrivacy: "Your entries are stored locally in this browser with localStorage. There is no account system in this MVP, so export CSV before clearing browser data or switching devices.",
    chatTimer: "Set the duration, then use Start, Pause, or Reset in the timer block. Saving a session uses the duration field, so adjust that number if your actual session ran shorter or longer.",
    chatLog: "For a useful entry, log body area, duration, distance, wavelength if known, discomfort before and after, and one note about function: sitting tolerance, setup, sleep, exercise, or skin response.",
    chatHow: "Start with one body area and keep the routine consistent for a few sessions: same device, similar distance, similar duration, and honest before/after scores. Consistency makes your trend chart more meaningful.",
    chatDefault: "I can help with session logging, CSV export, privacy, timer use, NovaaLab affiliate links, and what to track. I stay away from medical advice; use this as a personal journal and bring concerning symptoms to a clinician.",
    chatOfflineFallback: "I could not reach the Magpie assistant, so here is the local fallback: I can help with session logging, CSV export, privacy, timer use, NovaaLab affiliate links, and what to track. For medical concerns, talk to a qualified clinician.",
  },
  es: {
    "nav.tracker": "Tracker",
    "nav.trends": "Tendencias",
    "nav.devices": "Dispositivos",
    "hero.eyebrow": "Diario privado de sesiones",
    "hero.title": "Tracker de Terapia de Luz Roja",
    "hero.lede": "Registra sesiones, cambios de comodidad, ajustes del dispositivo y constancia sin convertir tus notas de bienestar en una hoja de cálculo.",
    "hero.start": "Empezar registro",
    "hero.shop": "Comprar NovaaLab",
    "hero.protocol": "Rutina de ejemplo",
    "hero.local": "Registros locales",
    "hero.csv": "Exportación CSV",
    "hero.assistant": "Guía asistida por IA",
    "affiliate.disclosureShort": "Divulgación: Magpie Studios LLC puede ganar una comisión si compras mediante enlaces de afiliado en esta página, sin costo adicional para ti.",
    "tracker.eyebrow": "Sesión",
    "tracker.title": "Registrar sesión",
    "tracker.export": "Exportar CSV",
    "tracker.save": "Guardar sesión",
    "form.date": "Fecha",
    "form.bodyArea": "Zona del cuerpo",
    "form.device": "Dispositivo",
    "form.wavelength": "Longitud de onda",
    "form.duration": "Duración",
    "form.distance": "Distancia",
    "form.painBefore": "Molestia antes",
    "form.painAfter": "Molestia después",
    "form.notes": "Notas",
    "form.notesPlaceholder": "¿Qué cambió? Tolerancia al sentarte, configuración, constancia o algo que quieras recordar.",
    "body.tailbone": "Coxis",
    "body.lowerBack": "Espalda baja",
    "body.neck": "Cuello / hombros",
    "body.knee": "Rodilla / articulación",
    "body.skin": "Piel / rostro",
    "body.other": "Otra zona",
    "wave.redNir": "Roja + NIR",
    "wave.red": "Roja 660 nm",
    "wave.nir": "Infrarroja cercana 850 nm",
    "wave.unknown": "Mixta / desconocida",
    "distance.contact": "Contacto directo",
    "distance.six": "6 pulgadas",
    "distance.twelve": "12 pulgadas",
    "distance.eighteen": "18 pulgadas",
    "distance.unknown": "Otra / desconocida",
    "timer.eyebrow": "Temporizador",
    "timer.start": "Iniciar",
    "timer.pause": "Pausar",
    "timer.reset": "Reiniciar",
    "metrics.sessions": "Sesiones",
    "metrics.minutes": "Minutos totales",
    "metrics.change": "Cambio prom.",
    "metrics.streak": "Racha",
    "trends.eyebrow": "Últimos 7 días",
    "trends.title": "Minutos registrados",
    "recent.eyebrow": "Reciente",
    "recent.title": "Historial de sesiones",
    "recent.clear": "Borrar",
    "info.protocolsTitle": "Registra rutinas",
    "info.protocolsText": "Guarda zona del cuerpo, dispositivo, longitud de onda, distancia, duración y puntuación de comodidad antes/después de cada sesión.",
    "info.patternsTitle": "Detecta patrones",
    "info.patternsText": "Usa minutos semanales, rachas y cambio promedio para ver si tu rutina se mantiene constante.",
    "info.ownershipTitle": "Mantén control",
    "info.ownershipText": "Tus registros permanecen en este navegador salvo que borres datos del sitio o del navegador. Exporta CSV antes de borrar datos, usar navegación privada o cambiar de dispositivo.",
    "build.eyebrow": "¿Necesitas una página como esta?",
    "build.title": "Magpie Studios crea sitios de producto, trackers y páginas de lanzamiento bien pulidas.",
    "build.text": "Desde landing pages listas para afiliados hasta herramientas interactivas, entregamos experiencias web limpias, rápidas y cuidadas con detalles que la gente recuerda.",
    "build.cta": "Contratar Magpie Studios",
    "family.eyebrow": "Familia Magpie",
    "family.title": "Construido junto al resto del stack Magpie.",
    "family.labsLabel": "Magpie Labs",
    "family.labsTitle": "Investigación y proyectos activos",
    "family.labsText": "Notas públicas sobre el trabajo de investigación que fortalece los productos Magpie.",
    "family.grubLabel": "GrubTrucks",
    "family.grubTitle": "Descubrimiento de food trucks",
    "family.grubText": "Un producto vivo para encontrar food trucks y ayudar a vendedores a llegar a clientes.",
    "family.studioLabel": "Magpie Studios",
    "family.studioTitle": "Apps, herramientas y experimentos de producto",
    "family.studioText": "El hogar del estudio para herramientas publicadas, soporte y futuros lanzamientos.",
    "shop.eyebrow": "Socio afiliado",
    "shop.title": "¿Necesitas un dispositivo de luz roja?",
    "shop.text": "NovaaLab ofrece productos accesibles de terapia de luz roja. Usa tu criterio, lee los detalles del producto y habla con un profesional de salud si tienes molestias persistentes o severas.",
    "shop.cta": "Comprar NovaaLab",
    "affiliate.disclosureLong": "Divulgación: Magpie Studios LLC puede ganar una comisión si compras mediante este enlace, sin costo adicional para ti.",
    "legal.title": "Nota de salud",
    "legal.text": "Este tracker es para registro personal y educación. No es consejo médico y no está diseñado para diagnosticar, tratar, curar ni prevenir enfermedades. Busca atención médica si tienes síntomas severos, persistentes, que empeoran o sin explicación.",
    "footer.copyright": "Copyright 2026 Magpie Studios LLC. Construido en Arizona.",
    "footer.trademark": "Red Light Therapy Tracker y la marca Magpie son marcas de producto de Magpie Studios LLC.",
    "cookie.text": "Usamos Google Analytics, con tu consentimiento, para contar visitas agregadas y mejorar esta página. Los enlaces de afiliado pueden generar una comisión para Magpie Studios LLC. Consulta la política de privacidad de Magpie Studios para más detalles.",
    "cookie.accept": "Aceptar analytics",
    "cookie.decline": "Rechazar",
    "chat.title": "Asistente Wellness de Magpie",
    "chat.subtitle": "Ayuda para registrar sesiones",
    "chat.mode": "Ayuda del tracker",
    "chat.use": "Usar tracker",
    "chat.log": "Qué registrar",
    "chat.export": "Exportar",
    "chat.novaa": "NovaaLab",
    "chat.placeholder": "Pregunta sobre el registro...",
    "chat.send": "Enviar",
    "chat.footnote": "Solo informativo. No es consejo médico. No compartas datos personales sensibles.",
    "chat.expand": "Expandir asistente del tracker",
    "chat.collapse": "Contraer asistente del tracker",
    "chat.thinking": "Consultando el asistente Magpie...",
    "empty.sessions": "Aún no hay sesiones. Guarda la primera.",
    "recent.notes": "Notas",
    "recent.pain": "Molestia",
    "unit.minutes": "minutos",
    "unit.min": "min",
    "unit.daysShort": "d",
    "confirm.clear": "¿Borrar todas las sesiones de terapia de luz roja guardadas en este navegador?",
    chatIntro: "Hola. Puedo ayudarte a registrar sesiones, entender el tracker, exportar datos y encontrar el enlace de NovaaLab. No puedo dar consejo médico.",
    chatNoSessions: "Aún no tienes sesiones guardadas. Empieza con una entrada simple: zona del cuerpo, duración, distancia, molestia antes, molestia después y una nota sobre cómo se sintió sentarte o moverte.",
    chatStats: ({ count, minutes, avg }) => `Tienes ${count} ${count === 1 ? "sesión guardada" : "sesiones guardadas"}, ${minutes} minutos totales y un cambio promedio antes/después de ${avg.toFixed(1)} puntos. Exporta CSV si quieres respaldo o un registro fácil de compartir con tu médico.`,
    chatMedical: "Puedo ayudar con el registro, pero no puedo dar consejo médico ni diagnosticar síntomas. Para síntomas severos, persistentes, que empeoran, con sangrado o sin explicación, habla con un profesional de salud. El tracker funciona mejor como registro personal que puedes exportar y comentar.",
    chatNovaa: 'El enlace de NovaaLab está en la sección Dispositivos. Magpie Studios LLC puede ganar una comisión si compras mediante ese enlace, sin costo adicional para ti. <a href="#shop">Ir a dispositivos</a>.',
    chatExport: "Usa el botón Exportar CSV en la parte superior del panel del tracker. Descarga tus sesiones guardadas en este navegador como un archivo compatible con hojas de cálculo.",
    chatPrivacy: "Tus entradas se guardan localmente en este navegador con localStorage. Este MVP no tiene sistema de cuenta, así que exporta CSV antes de borrar datos del navegador o cambiar de dispositivo.",
    chatTimer: "Ajusta la duración y usa Iniciar, Pausar o Reiniciar en el bloque del temporizador. Guardar una sesión usa el campo de duración, así que ajusta ese número si tu sesión duró más o menos.",
    chatLog: "Para una entrada útil, registra zona del cuerpo, duración, distancia, longitud de onda si la sabes, molestia antes y después, y una nota funcional: tolerancia al sentarte, configuración, sueño, ejercicio o respuesta de la piel.",
    chatHow: "Empieza con una zona del cuerpo y mantén la rutina constante por varias sesiones: mismo dispositivo, distancia similar, duración similar y puntuaciones honestas antes/después. La constancia hace más útil la gráfica.",
    chatDefault: "Puedo ayudar con registro de sesiones, exportación CSV, privacidad, temporizador, enlaces de afiliado de NovaaLab y qué registrar. Evito consejo médico; usa esto como diario personal y consulta síntomas preocupantes con un profesional.",
    chatOfflineFallback: "No pude contactar al asistente Magpie, así que va el respaldo local: puedo ayudar con registro de sesiones, exportación CSV, privacidad, temporizador, enlaces de afiliado de NovaaLab y qué registrar. Para temas médicos, habla con un profesional de salud.",
  },
};

const valueKeyMaps = {
  bodyArea: {
    "Tailbone / coccyx": "body.tailbone",
    "Lower back": "body.lowerBack",
    "Neck / shoulders": "body.neck",
    "Knee / joint": "body.knee",
    "Skin / face": "body.skin",
    Other: "body.other",
  },
  wavelength: {
    "Red + NIR": "wave.redNir",
    "660 nm red": "wave.red",
    "850 nm near infrared": "wave.nir",
    "Mixed / unknown": "wave.unknown",
  },
  distance: {
    "Direct contact": "distance.contact",
    "6 inches": "distance.six",
    "12 inches": "distance.twelve",
    "18 inches": "distance.eighteen",
    "Other / unknown": "distance.unknown",
  },
};

let timerSeconds = 0;
let timerRemaining = 0;
let timerHandle = null;
let currentLang = getSavedLanguage();

function getSavedLanguage() {
  try {
    return localStorage.getItem(LANG_KEY) === "es" ? "es" : "en";
  } catch (error) {
    return "en";
  }
}

function locale() {
  return currentLang === "es" ? "es-MX" : "en-US";
}

function t(key) {
  const value = translations[currentLang]?.[key] ?? translations.en[key] ?? key;
  return typeof value === "function" ? value({}) : value;
}

function message(key, params = {}) {
  const value = translations[currentLang]?.[key] ?? translations.en[key] ?? "";
  return typeof value === "function" ? value(params) : value;
}

function labelFor(group, value) {
  const key = valueKeyMaps[group]?.[value];
  return key ? t(key) : value;
}

function applyLanguage(lang) {
  currentLang = lang === "es" ? "es" : "en";
  try {
    localStorage.setItem(LANG_KEY, currentLang);
  } catch (error) {}

  document.documentElement.lang = currentLang === "es" ? "es-MX" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const isActive = button.dataset.lang === currentLang;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  updateChatExpandLabel();
  render();
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function readSessions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function writeSessions(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function formatTimer(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function setTimerDisplay(seconds) {
  const text = formatTimer(seconds);
  const digits = text.replace(":", "").split("");
  const units = timerDisplay.querySelectorAll(".flip-unit");
  if (!units.length) {
    timerDisplay.textContent = text;
    return;
  }
  units.forEach((unit, index) => {
    if (unit.textContent !== digits[index]) {
      unit.textContent = digits[index];
      unit.dataset.value = digits[index];
      unit.classList.remove("is-flipping");
      void unit.offsetWidth;
      unit.classList.add("is-flipping");
    }
  });
}

function syncTimerFromDuration() {
  timerSeconds = Math.max(1, Number(durationInput.value || 1)) * 60;
  if (!timerHandle) {
    timerRemaining = timerSeconds;
    setTimerDisplay(timerRemaining);
  }
}

function updateRangeLabels() {
  painBeforeValue.textContent = painBefore.value;
  painAfterValue.textContent = painAfter.value;
}

function computeStreak(sessions) {
  const days = new Set(sessions.map((session) => session.date));
  let streak = 0;
  const cursor = new Date(todayIso() + "T00:00:00");
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function lastSevenDays() {
  const days = [];
  const now = new Date(todayIso() + "T00:00:00");
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function renderMetrics(sessions) {
  const totalMinutes = sessions.reduce((sum, session) => sum + Number(session.duration || 0), 0);
  const changes = sessions.map((session) => Number(session.painBefore) - Number(session.painAfter));
  const avgChange = changes.length ? changes.reduce((sum, value) => sum + value, 0) / changes.length : 0;
  document.getElementById("metricSessions").textContent = String(sessions.length);
  document.getElementById("metricMinutes").textContent = String(totalMinutes);
  document.getElementById("metricChange").textContent = avgChange.toFixed(1);
  document.getElementById("metricStreak").textContent = `${computeStreak(sessions)}${t("unit.daysShort")}`;
}

function renderChart(sessions) {
  const days = lastSevenDays();
  const minutesByDay = new Map(days.map((day) => [day, 0]));
  sessions.forEach((session) => {
    if (minutesByDay.has(session.date)) {
      minutesByDay.set(session.date, minutesByDay.get(session.date) + Number(session.duration || 0));
    }
  });

  const values = days.map((day) => minutesByDay.get(day));
  const maxValue = Math.max(1, ...values);
  barChart.innerHTML = days.map((day, index) => {
    const height = Math.max(8, Math.round((values[index] / maxValue) * 126));
    const label = new Date(day + "T00:00:00").toLocaleDateString(locale(), { weekday: "short" });
    return `
      <div class="bar">
        <div class="bar-fill" style="height:${height}px" title="${values[index]} ${t("unit.minutes")}"></div>
        <span>${escapeHtml(label)}</span>
      </div>
    `;
  }).join("");
}

function renderList(sessions) {
  const recent = [...sessions]
    .sort((a, b) => `${b.date}-${b.createdAt}`.localeCompare(`${a.date}-${a.createdAt}`))
    .slice(0, 6);

  if (!recent.length) {
    sessionList.innerHTML = `<div class="empty-state">${t("empty.sessions")}</div>`;
    return;
  }

  sessionList.innerHTML = recent.map((session) => {
    const change = Number(session.painBefore) - Number(session.painAfter);
    const sign = change > 0 ? "+" : "";
    const note = session.notes ? ` ${t("recent.notes")}: ${escapeHtml(session.notes)}` : "";
    return `
      <div class="session-item">
        <strong>${escapeHtml(session.date)} - ${escapeHtml(labelFor("bodyArea", session.bodyArea))}</strong>
        <span>${escapeHtml(session.duration)} ${t("unit.min")}, ${escapeHtml(labelFor("wavelength", session.wavelength))}, ${escapeHtml(labelFor("distance", session.distance))}</span>
        <span>${t("recent.pain")} ${escapeHtml(session.painBefore)} -> ${escapeHtml(session.painAfter)} (${sign}${change.toFixed(1)})${note}</span>
      </div>
    `;
  }).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render() {
  const sessions = readSessions();
  renderMetrics(sessions);
  renderChart(sessions);
  renderList(sessions);
}

function addChatMessage(role, html) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${role}`;
  bubble.innerHTML = html;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return bubble;
}

function trackerStatsReply() {
  const sessions = readSessions();
  if (!sessions.length) {
    return message("chatNoSessions");
  }
  const minutes = sessions.reduce((sum, session) => sum + Number(session.duration || 0), 0);
  const changes = sessions.map((session) => Number(session.painBefore) - Number(session.painAfter));
  const avg = changes.reduce((sum, value) => sum + value, 0) / changes.length;
  return message("chatStats", { count: sessions.length, minutes, avg });
}

function botReply(text) {
  const q = text.toLowerCase();
  if (matchesAny(q, ["medical", "doctor", "diagnos", "treat", "cure", "hemorrhoid", "médico", "medico", "diagnost", "tratar", "curar", "hemorroide", "sangrado"])) {
    return message("chatMedical");
  }
  if (matchesAny(q, ["novaa", "device", "shop", "affiliate", "dispositivo", "comprar", "afiliado", "enlace"])) {
    return message("chatNovaa");
  }
  if (matchesAny(q, ["export", "csv", "download", "exportar", "descargar", "datos"])) {
    return message("chatExport");
  }
  if (matchesAny(q, ["privacy", "stored", "data", "privacidad", "guardan", "localstorage"])) {
    return message("chatPrivacy");
  }
  if (matchesAny(q, ["timer", "duration", "temporizador", "duración", "duracion"])) {
    return message("chatTimer");
  }
  if (matchesAny(q, ["pain", "score", "log", "track", "what should", "dolor", "registrar", "anotar", "qué debo", "que debo"])) {
    return message("chatLog");
  }
  if (matchesAny(q, ["stats", "summary", "sessions", "progress", "estad", "resumen", "sesiones", "progreso"])) {
    return trackerStatsReply();
  }
  if (matchesAny(q, ["how", "use", "start", "cómo", "como", "usar", "empezar"])) {
    return message("chatHow");
  }
  return message("chatDefault");
}

function localCanAnswer(text) {
  const q = text.toLowerCase();
  return matchesAny(q, [
    "medical", "doctor", "diagnos", "treat", "cure", "hemorrhoid", "médico", "medico", "diagnost", "tratar", "curar", "hemorroide", "sangrado",
    "novaa", "device", "shop", "affiliate", "dispositivo", "comprar", "afiliado", "enlace",
    "export", "csv", "download", "exportar", "descargar", "datos",
    "privacy", "stored", "data", "privacidad", "guardan", "localstorage",
    "timer", "duration", "temporizador", "duración", "duracion",
    "pain", "score", "log", "track", "what should", "dolor", "registrar", "anotar", "qué debo", "que debo",
    "stats", "summary", "sessions", "progress", "estad", "resumen", "sesiones", "progreso",
    "how", "use", "start", "cómo", "como", "usar", "empezar",
  ]);
}

function chatContext() {
  const sessions = readSessions();
  const minutes = sessions.reduce((sum, session) => sum + Number(session.duration || 0), 0);
  const avgChange = sessions.length
    ? sessions.reduce((sum, session) => sum + (Number(session.painBefore) - Number(session.painAfter)), 0) / sessions.length
    : 0;
  return [
    "You are the Magpie Wellness Assistant for https://magpiestudios.app/red-light-tracker/.",
    "The page is a Red Light Therapy Tracker from Magpie Studios LLC.",
    "Keep answers brief, practical, and affiliate/FTC compliant.",
    "Never diagnose, prescribe, claim a cure, or tell users to treat a condition. Tell users to consult a qualified clinician for severe, persistent, worsening, bleeding, or unexplained symptoms.",
    "Do not ask for sensitive personal details. The tracker stores entries locally in the browser and supports CSV export.",
    "NovaaLab links are affiliate links; Magpie Studios LLC may earn a commission at no extra cost to the user.",
    `Current browser stats: ${sessions.length} saved sessions, ${minutes} total minutes, ${avgChange.toFixed(1)} average before/after point change.`,
    `Preferred language: ${currentLang === "es" ? "Spanish (LatAm)" : "English"}.`,
  ].join("\n");
}

async function remoteBotReply(text) {
  const response = await fetch(CHAT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `${chatContext()}\n\nVisitor question: ${text}`,
      history: [],
    }),
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(data.error || "Chat service error");
  }
  return data.reply || message("chatOfflineFallback");
}

async function replyToChat(text) {
  if (localCanAnswer(text)) {
    window.setTimeout(() => addChatMessage("bot", botReply(text)), 180);
    return;
  }

  const typing = addChatMessage("bot typing", t("chat.thinking"));
  try {
    const reply = await remoteBotReply(text);
    typing.remove();
    addChatMessage("bot", reply);
  } catch (error) {
    typing.remove();
    addChatMessage("bot", message("chatOfflineFallback"));
  }
}

function matchesAny(text, needles) {
  return needles.some((needle) => text.includes(needle));
}

function openChat() {
  chatPanel.hidden = false;
  chatLauncher.hidden = true;
  if (!chatMessages.children.length) {
    addChatMessage("bot", message("chatIntro"));
  }
  window.setTimeout(() => chatInput.focus(), 0);
}

function closeChat() {
  chatPanel.classList.remove("expanded");
  chatExpand.textContent = "↗";
  updateChatExpandLabel();
  chatPanel.hidden = true;
  chatLauncher.hidden = false;
}

function toggleChatExpanded() {
  const expanded = chatPanel.classList.toggle("expanded");
  chatExpand.textContent = expanded ? "↙" : "↗";
  updateChatExpandLabel();
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateChatExpandLabel() {
  const expanded = chatPanel?.classList.contains("expanded");
  const label = expanded ? t("chat.collapse") : t("chat.expand");
  chatExpand.setAttribute("aria-label", label);
  chatExpand.setAttribute("title", label);
}

function sessionFromForm() {
  const data = new FormData(form);
  const id = window.crypto && window.crypto.randomUUID
    ? window.crypto.randomUUID()
    : String(Date.now());
  return {
    id,
    createdAt: new Date().toISOString(),
    date: data.get("sessionDate"),
    bodyArea: data.get("bodyArea"),
    device: data.get("deviceName"),
    wavelength: data.get("wavelength"),
    duration: Number(data.get("durationMinutes")),
    distance: data.get("distance"),
    painBefore: Number(data.get("painBefore")),
    painAfter: Number(data.get("painAfter")),
    notes: data.get("notes") || "",
  };
}

function toCsv(sessions) {
  const headers = ["date", "bodyArea", "device", "wavelength", "duration", "distance", "painBefore", "painAfter", "notes", "createdAt"];
  const rows = sessions.map((session) => headers.map((header) => csvCell(session[header])).join(","));
  return [headers.join(","), ...rows].join("\n");
}

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function downloadCsv() {
  const sessions = readSessions();
  const blob = new Blob([toCsv(sessions)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `red-light-therapy-sessions-${todayIso()}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function startTimer() {
  if (timerHandle) return;
  if (!timerRemaining) syncTimerFromDuration();
  timerHandle = window.setInterval(() => {
    timerRemaining = Math.max(0, timerRemaining - 1);
    setTimerDisplay(timerRemaining);
    if (timerRemaining === 0) {
      pauseTimer();
    }
  }, 1000);
}

function pauseTimer() {
  if (timerHandle) {
    window.clearInterval(timerHandle);
    timerHandle = null;
  }
}

function resetTimer() {
  pauseTimer();
  syncTimerFromDuration();
}

function updateConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch (error) {}
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
      analytics_storage: value,
    });
  }
}

function initCookieConsent() {
  let saved = null;
  try {
    saved = localStorage.getItem(CONSENT_KEY);
  } catch (error) {}
  if (saved !== "granted" && saved !== "denied") {
    cookieBanner.hidden = false;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const sessions = readSessions();
  sessions.push(sessionFromForm());
  writeSessions(sessions);
  form.reset();
  sessionDate.value = todayIso();
  document.getElementById("deviceName").value = "NovaaLab device";
  durationInput.value = "15";
  painBefore.value = "4";
  painAfter.value = "1";
  updateRangeLabels();
  resetTimer();
  render();
});

document.querySelectorAll("[data-step]").forEach((button) => {
  button.addEventListener("click", () => {
    const step = Number(button.dataset.step);
    const next = Math.min(60, Math.max(1, Number(durationInput.value || 1) + step));
    durationInput.value = String(next);
    resetTimer();
  });
});

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

durationInput.addEventListener("input", resetTimer);
painBefore.addEventListener("input", updateRangeLabels);
painAfter.addEventListener("input", updateRangeLabels);
document.getElementById("startTimer").addEventListener("click", startTimer);
document.getElementById("pauseTimer").addEventListener("click", pauseTimer);
document.getElementById("resetTimer").addEventListener("click", resetTimer);
document.getElementById("exportCsv").addEventListener("click", downloadCsv);
document.getElementById("clearData").addEventListener("click", () => {
  if (window.confirm(t("confirm.clear"))) {
    writeSessions([]);
    render();
  }
});

cookieAccept.addEventListener("click", () => {
  updateConsent("granted");
  cookieBanner.hidden = true;
});

cookieDecline.addEventListener("click", () => {
  updateConsent("denied");
  cookieBanner.hidden = true;
});

chatLauncher.addEventListener("click", openChat);
chatClose.addEventListener("click", closeChat);
chatExpand.addEventListener("click", toggleChatExpanded);
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addChatMessage("user", escapeHtml(text));
  chatInput.value = "";
  replyToChat(text);
});
document.querySelectorAll("[data-chat-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    const text = currentLang === "es" ? button.dataset.chatPromptEs : button.dataset.chatPrompt;
    addChatMessage("user", escapeHtml(text));
    replyToChat(text);
  });
});

sessionDate.value = todayIso();
updateRangeLabels();
syncTimerFromDuration();
applyLanguage(currentLang);
initCookieConsent();
