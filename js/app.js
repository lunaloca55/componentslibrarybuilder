const DEFAULT_STATE = {
  projectName: "My Component Library",
  brand: {
    name: "Northwind",
    logo: "",
    logoSize: 48,
    colors: {
      primary: "#0d6efd",
      secondary: "#6c757d",
      accent: "#6610f2",
      success: "#198754",
      danger: "#dc3545",
      warning: "#ffc107",
      info: "#0dcaf0",
      neutralBg: "#f8f9fa",
      neutralText: "#212529"
    }
  },
  typography: {
    fontStack: "system",
    baseSize: 16,
    lineHeight: 1.6,
    headingScale: 1.2
  },
  theme: {
    radius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    shadowStrength: 12,
    hoverLift: 2,
    spacingUnit: 8,
    buttonShadow: 10,
    textTransform: "none",
    letterSpacing: 0,
    buttonPaddingY: 10,
    buttonPaddingX: 18,
    focusRing: 4
  },
  componentOverrides: {},
  favorites: [],
  selectedComponentId: "btn-primary",
  previewTab: "component",
  viewportPreset: "default"
};

const STORAGE_KEY = "clb-state";
let state = loadState();
const PLACEHOLDER_LOGO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='12' fill='#e9ecef'/><path d='M18 36h28v4H18zM18 26h20v4H18z' fill='#6c757d'/></svg>"
  );

const elements = {
  projectName: document.getElementById("projectName"),
  saveProject: document.getElementById("saveProject"),
  loadProject: document.getElementById("loadProject"),
  resetProject: document.getElementById("resetProject"),
  exportProject: document.getElementById("exportProject"),
  brandName: document.getElementById("brandName"),
  brandLogo: document.getElementById("brandLogo"),
  logoPreview: document.getElementById("logoPreview"),
  logoSize: document.getElementById("logoSize"),
  colorControls: document.getElementById("colorControls"),
  swatchGrid: document.getElementById("swatchGrid"),
  contrastWarning: document.getElementById("contrastWarning"),
  fontStack: document.getElementById("fontStack"),
  baseFontSize: document.getElementById("baseFontSize"),
  lineHeight: document.getElementById("lineHeight"),
  headingScale: document.getElementById("headingScale"),
  typographyPreview: document.getElementById("typographyPreview"),
  radiusBase: document.getElementById("radiusBase"),
  borderWidth: document.getElementById("borderWidth"),
  shadowStrength: document.getElementById("shadowStrength"),
  hoverLift: document.getElementById("hoverLift"),
  spacingUnit: document.getElementById("spacingUnit"),
  buttonShadow: document.getElementById("buttonShadow"),
  borderStyle: document.getElementById("borderStyle"),
  textTransform: document.getElementById("textTransform"),
  letterSpacing: document.getElementById("letterSpacing"),
  focusRing: document.getElementById("focusRing"),
  buttonPaddingY: document.getElementById("buttonPaddingY"),
  buttonPaddingX: document.getElementById("buttonPaddingX"),
  componentList: document.getElementById("componentList"),
  componentFilters: document.getElementById("componentFilters"),
  componentSearch: document.getElementById("componentSearch"),
  componentCount: document.getElementById("componentCount"),
  componentControls: document.getElementById("componentControls"),
  previewArea: document.getElementById("previewArea"),
  viewportGrid: document.getElementById("viewportGrid"),
  syncScroll: document.getElementById("syncScroll"),
  stackViewports: document.getElementById("stackViewports"),
  viewportPreset: document.getElementById("viewportPreset"),
  copyHtml: document.getElementById("copyHtml"),
  copyTokens: document.getElementById("copyTokens"),
  copyCss: document.getElementById("copyCss")
};

const colorFields = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "accent", label: "Accent" },
  { key: "success", label: "Success" },
  { key: "danger", label: "Danger" },
  { key: "warning", label: "Warning" },
  { key: "info", label: "Info" },
  { key: "neutralBg", label: "Neutral BG" },
  { key: "neutralText", label: "Neutral Text" }
];

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return { ...DEFAULT_STATE, ...JSON.parse(stored) };
    } catch (error) {
      return { ...DEFAULT_STATE };
    }
  }
  return { ...DEFAULT_STATE };
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setState(partial) {
  state = { ...state, ...partial };
  persistState();
  renderAll();
}

function updateNested(path, value) {
  const [root, key] = path;
  state = {
    ...state,
    [root]: {
      ...state[root],
      [key]: value
    }
  };
  persistState();
  renderAll();
}

function updateColor(key, value) {
  state.brand.colors[key] = value;
  persistState();
  renderAll();
}

function updateTheme(key, value) {
  state.theme[key] = value;
  persistState();
  renderAll();
}

function updateTypography(key, value) {
  state.typography[key] = value;
  persistState();
  renderAll();
}

function buildControls() {
  elements.colorControls.innerHTML = "";
  colorFields.forEach((field) => {
    const wrapper = document.createElement("div");
    wrapper.className = "col-6";
    wrapper.innerHTML = `
      <label class="form-label">${field.label}</label>
      <input class="form-control form-control-color" type="color" value="${state.brand.colors[field.key]}" data-color-key="${field.key}" />
    `;
    elements.colorControls.appendChild(wrapper);
  });
}

function renderSwatches() {
  const swatches = [];
  const palette = [state.brand.colors.primary, state.brand.colors.secondary, state.brand.colors.accent];
  palette.forEach((color) => {
    swatches.push({ label: "Base", color });
    swatches.push({ label: "Tint", color: mixColor(color, "#ffffff", 0.2) });
    swatches.push({ label: "Light", color: mixColor(color, "#ffffff", 0.4) });
    swatches.push({ label: "Shade", color: mixColor(color, "#000000", 0.2) });
  });

  elements.swatchGrid.innerHTML = swatches
    .map((swatch) => `<div class="swatch" style="background:${swatch.color}"><span>${swatch.label}</span></div>`)
    .join("");
}

function renderTypographyPreview() {
  elements.typographyPreview.innerHTML = `
    <h4>Typography Preview</h4>
    <p class="lead">Lead paragraph for quick scanning.</p>
    <p>Body text demonstrates line height and sizing. <small class="text-muted">Muted text appears here.</small></p>
  `;
}

function applyTokens() {
  const root = document.documentElement;
  root.style.setProperty("--brand-primary", state.brand.colors.primary);
  root.style.setProperty("--brand-secondary", state.brand.colors.secondary);
  root.style.setProperty("--brand-accent", state.brand.colors.accent);
  root.style.setProperty("--brand-success", state.brand.colors.success);
  root.style.setProperty("--brand-danger", state.brand.colors.danger);
  root.style.setProperty("--brand-warning", state.brand.colors.warning);
  root.style.setProperty("--brand-info", state.brand.colors.info);
  root.style.setProperty("--brand-neutral-bg", state.brand.colors.neutralBg);
  root.style.setProperty("--brand-neutral-text", state.brand.colors.neutralText);
  root.style.setProperty("--radius-base", `${state.theme.radius}px`);
  root.style.setProperty("--shadow-card", `0 ${state.theme.shadowStrength}px ${state.theme.shadowStrength * 2}px rgba(0,0,0,0.12)`);
  root.style.setProperty("--btn-shadow", `0 ${state.theme.buttonShadow}px ${state.theme.buttonShadow * 2}px rgba(13,110,253,0.25)`);
  root.style.setProperty("--hover-translate", `translateY(-${state.theme.hoverLift}px)`);
  root.style.setProperty("--border-style", state.theme.borderStyle);
  root.style.setProperty("--text-transform", state.theme.textTransform);
  root.style.setProperty("--letter-spacing", `${state.theme.letterSpacing}em`);
  root.style.setProperty("--btn-padding-y", `${state.theme.buttonPaddingY}px`);
  root.style.setProperty("--btn-padding-x", `${state.theme.buttonPaddingX}px`);
  root.style.setProperty("--focus-ring-size", `${state.theme.focusRing / 16}rem`);
  root.style.setProperty("--font-size-base", `${state.typography.baseSize}px`);
  root.style.setProperty("--line-height-base", state.typography.lineHeight);
  root.style.setProperty("--heading-scale", state.typography.headingScale);
  root.style.setProperty("--border-width", `${state.theme.borderWidth}px`);
  root.style.setProperty("--spacing-unit", `${state.theme.spacingUnit}px`);

  document.body.style.background = state.brand.colors.neutralBg;
  document.body.style.color = state.brand.colors.neutralText;

  const fontFamily = getFontFamily(state.typography.fontStack);
  root.style.setProperty("--font-base", fontFamily);
  loadFont(state.typography.fontStack);

  renderHeadingStyles();
  updateContrastWarning();
}

function renderHeadingStyles() {
  const styleId = "heading-styles";
  let styleTag = document.getElementById(styleId);
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = styleId;
    document.head.appendChild(styleTag);
  }
  const base = state.typography.baseSize;
  const scale = state.typography.headingScale;
  const sizes = [
    base * Math.pow(scale, 5),
    base * Math.pow(scale, 4),
    base * Math.pow(scale, 3),
    base * Math.pow(scale, 2),
    base * Math.pow(scale, 1),
    base
  ];
  styleTag.textContent = `
    h1 { font-size: ${sizes[0].toFixed(2)}px; }
    h2 { font-size: ${sizes[1].toFixed(2)}px; }
    h3 { font-size: ${sizes[2].toFixed(2)}px; }
    h4 { font-size: ${sizes[3].toFixed(2)}px; }
    h5 { font-size: ${sizes[4].toFixed(2)}px; }
    h6 { font-size: ${sizes[5].toFixed(2)}px; }
    .btn, .form-control, .card, .accordion-item, .nav-tabs .nav-link {
      border-radius: ${state.theme.radius}px;
      border-width: ${state.theme.borderWidth}px;
    }
  `;
}

function updateContrastWarning() {
  const contrast = getContrastRatio(state.brand.colors.primary, state.brand.colors.neutralBg);
  elements.contrastWarning.classList.toggle("d-none", contrast >= 4.5);
}

function renderComponentList() {
  const search = elements.componentSearch.value.toLowerCase();
  const activeFilter = document.querySelector(".component-filter.active");
  const filterValue = activeFilter ? activeFilter.dataset.filter : "all";

  const filtered = COMPONENTS.filter((component) => {
    const matchesSearch = component.name.toLowerCase().includes(search) || component.category.toLowerCase().includes(search);
    const matchesFilter =
      filterValue === "all" ||
      (filterValue === "favorites" && state.favorites.includes(component.id)) ||
      component.category === filterValue;
    return matchesSearch && matchesFilter;
  });

  elements.componentCount.textContent = filtered.length;
  elements.componentList.innerHTML = filtered
    .map((component) => {
      const isActive = component.id === state.selectedComponentId;
      const isFav = state.favorites.includes(component.id);
      return `
        <div class="component-item ${isActive ? "active" : ""}" data-component-id="${component.id}">
          <div>
            <div class="fw-semibold">${component.name}</div>
            <small class="text-muted">${component.category}</small>
          </div>
          <button class="btn btn-sm ${isFav ? "btn-warning" : "btn-outline-secondary"}" data-favorite-id="${component.id}">
            <i class="bi ${isFav ? "bi-star-fill" : "bi-star"}"></i>
          </button>
        </div>
      `;
    })
    .join("");
}

function renderFilters() {
  elements.componentFilters.innerHTML = [
    { label: "All", value: "all" },
    { label: "Favorites", value: "favorites" },
    ...COMPONENT_CATEGORIES.map((cat) => ({ label: cat, value: cat }))
  ]
    .map(
      (filter) => `
        <button class="btn btn-sm btn-outline-dark me-2 mb-2 component-filter ${filter.value === "all" ? "active" : ""}" data-filter="${filter.value}">
          ${filter.label}
        </button>
      `
    )
    .join("");
}

function getComponentState(component) {
  return {
    ...component.defaultProps,
    ...(state.componentOverrides[component.id] || {})
  };
}

function renderComponentControls() {
  const component = COMPONENTS.find((item) => item.id === state.selectedComponentId);
  if (!component) {
    elements.componentControls.innerHTML = "<p class=\"text-muted small\">Select a component to edit.</p>";
    return;
  }

  const values = getComponentState(component);
  const controlsHtml = component.controls
    .map((control) => {
      const value = values[control.key];
      if (control.type === "select") {
        return `
          <div class="mb-3">
            <label class="form-label">${control.label}</label>
            <select class="form-select" data-control-key="${control.key}">
              ${control.options.map((option) => `<option value="${option}" ${String(option) === String(value) ? "selected" : ""}>${option}</option>`).join("")}
            </select>
          </div>
        `;
      }
      if (control.type === "toggle") {
        return `
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" data-control-key="${control.key}" ${value ? "checked" : ""} />
            <label class="form-check-label">${control.label}</label>
          </div>
        `;
      }
      return `
        <div class="mb-3">
          <label class="form-label">${control.label}</label>
          <input class="form-control" type="text" data-control-key="${control.key}" value="${value}" />
        </div>
      `;
    })
    .join("");

  elements.componentControls.innerHTML = `
    ${controlsHtml}
    <div class="note-box mt-3 small">${component.notes}</div>
  `;
}

function renderPreview() {
  const component = COMPONENTS.find((item) => item.id === state.selectedComponentId);
  const tokens = buildTokenPayload();
  const renderTargets = document.querySelectorAll("[data-viewport-body]");

  const componentHtml = component ? component.render(getComponentState(component), tokens) : "";
  const templateHtml = renderTemplates(tokens);
  const kitchenHtml = renderKitchenSink(tokens);

  const tab = state.previewTab;
  const html = tab === "component" ? componentHtml : tab === "templates" ? templateHtml : kitchenHtml;

  renderTargets.forEach((target) => {
    target.innerHTML = html;
  });
}

function renderTemplates(tokens) {
  return `
    <div class="d-grid gap-4">
      ${COMPONENTS.find((item) => item.id === "header-simple").render(getComponentState(findComponent("header-simple")), tokens)}
      ${COMPONENTS.find((item) => item.id === "hero-basic").render(getComponentState(findComponent("hero-basic")), tokens)}
      ${COMPONENTS.find((item) => item.id === "feature-grid").render(getComponentState(findComponent("feature-grid")), tokens)}
      ${COMPONENTS.find((item) => item.id === "testimonial-cards").render(getComponentState(findComponent("testimonial-cards")), tokens)}
      ${COMPONENTS.find((item) => item.id === "footer-columns").render(getComponentState(findComponent("footer-columns")), tokens)}
    </div>
  `;
}

function renderKitchenSink(tokens) {
  return COMPONENTS.map((component) => {
    const html = component.render(getComponentState(component), tokens);
    return `
      <section class="mb-5">
        <h3 class="mb-3">${component.name}</h3>
        ${html}
      </section>
    `;
  }).join("");
}

function findComponent(id) {
  return COMPONENTS.find((item) => item.id === id);
}

function setupEventListeners() {
  elements.projectName.addEventListener("input", (event) => {
    setState({ projectName: event.target.value });
  });

  elements.saveProject.addEventListener("click", () => {
    persistState();
    toast("Project saved to localStorage.");
  });

  elements.loadProject.addEventListener("click", () => {
    state = loadState();
    renderAll();
    toast("Project loaded from localStorage.");
  });

  elements.resetProject.addEventListener("click", () => {
    state = { ...DEFAULT_STATE };
    persistState();
    renderAll();
  });

  elements.exportProject.addEventListener("click", () => {
    exportProject(state, COMPONENTS);
  });

  elements.brandName.addEventListener("input", (event) => updateNested(["brand", "name"], event.target.value));

  elements.brandLogo.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateNested(["brand", "logo"], reader.result);
    };
    reader.readAsDataURL(file);
  });

  elements.logoSize.addEventListener("input", (event) => updateNested(["brand", "logoSize"], Number(event.target.value)));

  elements.fontStack.addEventListener("change", (event) => updateTypography("fontStack", event.target.value));
  elements.baseFontSize.addEventListener("input", (event) => updateTypography("baseSize", Number(event.target.value)));
  elements.lineHeight.addEventListener("input", (event) => updateTypography("lineHeight", Number(event.target.value)));
  elements.headingScale.addEventListener("input", (event) => updateTypography("headingScale", Number(event.target.value)));

  elements.radiusBase.addEventListener("input", (event) => updateTheme("radius", Number(event.target.value)));
  elements.borderWidth.addEventListener("input", (event) => updateTheme("borderWidth", Number(event.target.value)));
  elements.borderStyle.addEventListener("change", (event) => updateTheme("borderStyle", event.target.value));
  elements.shadowStrength.addEventListener("input", (event) => updateTheme("shadowStrength", Number(event.target.value)));
  elements.hoverLift.addEventListener("input", (event) => updateTheme("hoverLift", Number(event.target.value)));
  elements.spacingUnit.addEventListener("input", (event) => updateTheme("spacingUnit", Number(event.target.value)));
  elements.buttonShadow.addEventListener("input", (event) => updateTheme("buttonShadow", Number(event.target.value)));
  elements.textTransform.addEventListener("change", (event) => updateTheme("textTransform", event.target.value));
  elements.letterSpacing.addEventListener("input", (event) => updateTheme("letterSpacing", Number(event.target.value)));
  elements.focusRing.addEventListener("input", (event) => updateTheme("focusRing", Number(event.target.value)));
  elements.buttonPaddingY.addEventListener("input", (event) => updateTheme("buttonPaddingY", Number(event.target.value)));
  elements.buttonPaddingX.addEventListener("input", (event) => updateTheme("buttonPaddingX", Number(event.target.value)));

  elements.componentSearch.addEventListener("input", renderComponentList);

  elements.componentFilters.addEventListener("click", (event) => {
    const button = event.target.closest(".component-filter");
    if (!button) return;
    document.querySelectorAll(".component-filter").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderComponentList();
  });

  elements.componentList.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest("[data-favorite-id]");
    if (favoriteButton) {
      const id = favoriteButton.dataset.favoriteId;
      toggleFavorite(id);
      return;
    }
    const item = event.target.closest(".component-item");
    if (!item) return;
    state.selectedComponentId = item.dataset.componentId;
    persistState();
    renderAll();
  });

  elements.componentControls.addEventListener("input", (event) => {
    const control = event.target.closest("[data-control-key]");
    if (!control) return;
    const key = control.dataset.controlKey;
    const component = findComponent(state.selectedComponentId);
    const value = control.type === "checkbox" ? control.checked : control.value;
    state.componentOverrides[component.id] = {
      ...getComponentState(component),
      [key]: value
    };
    persistState();
    renderAll();
  });

  elements.colorControls.addEventListener("input", (event) => {
    const input = event.target.closest("[data-color-key]");
    if (!input) return;
    updateColor(input.dataset.colorKey, input.value);
  });

  document.querySelectorAll("[data-preview-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-preview-tab]").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      state.previewTab = button.dataset.previewTab;
      persistState();
      renderPreview();
    });
  });

  elements.syncScroll.addEventListener("change", () => syncScroll());
  elements.stackViewports.addEventListener("change", () => {
    elements.viewportGrid.classList.toggle("stacked", elements.stackViewports.checked);
  });

  elements.viewportPreset.addEventListener("change", (event) => {
    state.viewportPreset = event.target.value;
    persistState();
    applyViewportPreset();
  });

  elements.copyHtml.addEventListener("click", () => {
    const component = findComponent(state.selectedComponentId);
    const html = component.render(getComponentState(component), buildTokenPayload());
    copyToClipboard(html);
  });

  elements.copyTokens.addEventListener("click", () => {
    const component = findComponent(state.selectedComponentId);
    const data = {
      component: component.name,
      recommended: component.recommended,
      overrides: state.componentOverrides[component.id] || {},
      tokens: buildTokenPayload()
    };
    copyToClipboard(JSON.stringify(data, null, 2));
  });

  elements.copyCss.addEventListener("click", () => {
    copyToClipboard(generateThemeCSS(state));
  });

  attachViewportScrollHandlers();
}

function toggleFavorite(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((fav) => fav !== id);
  } else {
    state.favorites.push(id);
  }
  persistState();
  renderComponentList();
}

function attachViewportScrollHandlers() {
  document.querySelectorAll(".viewport-body").forEach((body) => {
    body.onscroll = () => syncScroll(body);
  });
}

function syncScroll(source) {
  if (!elements.syncScroll.checked || !source) return;
  const bodies = Array.from(document.querySelectorAll(".viewport-body"));
  bodies.forEach((body) => {
    if (body !== source) {
      body.scrollTop = source.scrollTop;
    }
  });
}

function applyViewportPreset() {
  const widths = {
    default: { mobile: 375, tablet: 768, desktop: 1200 },
    compact: { mobile: 320, tablet: 640, desktop: 1024 },
    wide: { mobile: 414, tablet: 900, desktop: 1400 }
  };
  const preset = widths[state.viewportPreset] || widths.default;
  document.querySelectorAll(".viewport").forEach((viewport) => {
    const type = viewport.dataset.viewport;
    const width = preset[type] || 375;
    viewport.style.maxWidth = `${width}px`;
  });
}

function buildTokenPayload() {
  return {
    brand: {
      name: state.brand.name,
      logo: state.brand.logo,
      logoSize: state.brand.logoSize,
      colors: { ...state.brand.colors }
    },
    typography: { ...state.typography },
    theme: { ...state.theme }
  };
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    toast("Copied to clipboard.");
  });
}

function toast(message) {
  const toast = document.createElement("div");
  toast.className = "toast align-items-center text-bg-dark border-0 position-fixed bottom-0 end-0 m-3 show";
  toast.role = "alert";
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function getFontFamily(key) {
  if (key === "inter") return "'Inter', system-ui, sans-serif";
  if (key === "poppins") return "'Poppins', system-ui, sans-serif";
  if (key === "source-sans") return "'Source Sans 3', system-ui, sans-serif";
  return "system-ui, -apple-system, 'Segoe UI', sans-serif";
}

function loadFont(key) {
  const fontLinks = {
    inter: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
    poppins: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap",
    "source-sans": "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap"
  };
  const existing = document.getElementById("font-loader");
  if (existing) existing.remove();
  if (!fontLinks[key]) return;
  const link = document.createElement("link");
  link.id = "font-loader";
  link.rel = "stylesheet";
  link.href = fontLinks[key];
  document.head.appendChild(link);
}

function mixColor(color1, color2, amount) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const mix = c1.map((channel, index) => Math.round(channel + (c2[index] - channel) * amount));
  return rgbToHex(mix[0], mix[1], mix[2]);
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function getContrastRatio(color1, color2) {
  const lum1 = relativeLuminance(color1);
  const lum2 = relativeLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const srgb = channel / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function renderAll() {
  elements.projectName.value = state.projectName;
  elements.brandName.value = state.brand.name;
  elements.logoPreview.src = state.brand.logo || PLACEHOLDER_LOGO;
  elements.logoSize.value = state.brand.logoSize;
  elements.fontStack.value = state.typography.fontStack;
  elements.baseFontSize.value = state.typography.baseSize;
  elements.lineHeight.value = state.typography.lineHeight;
  elements.headingScale.value = state.typography.headingScale;
  elements.radiusBase.value = state.theme.radius;
  elements.borderWidth.value = state.theme.borderWidth;
  elements.borderStyle.value = state.theme.borderStyle;
  elements.shadowStrength.value = state.theme.shadowStrength;
  elements.hoverLift.value = state.theme.hoverLift;
  elements.spacingUnit.value = state.theme.spacingUnit;
  elements.buttonShadow.value = state.theme.buttonShadow;
  elements.textTransform.value = state.theme.textTransform;
  elements.letterSpacing.value = state.theme.letterSpacing;
  elements.focusRing.value = state.theme.focusRing;
  elements.buttonPaddingY.value = state.theme.buttonPaddingY;
  elements.buttonPaddingX.value = state.theme.buttonPaddingX;
  elements.viewportPreset.value = state.viewportPreset;

  buildControls();
  renderSwatches();
  renderTypographyPreview();
  applyTokens();
  renderFilters();
  renderComponentList();
  renderComponentControls();
  renderPreview();
  applyViewportPreset();
  attachViewportScrollHandlers();
}

setupEventListeners();
renderAll();
