function generateThemeCSS(state) {
  const tokens = state.brand.colors;
  const theme = state.theme;
  const typography = state.typography;
  const headingScale = typography.headingScale;
  const baseSize = typography.baseSize;
  const sizes = [
    baseSize * Math.pow(headingScale, 5),
    baseSize * Math.pow(headingScale, 4),
    baseSize * Math.pow(headingScale, 3),
    baseSize * Math.pow(headingScale, 2),
    baseSize * Math.pow(headingScale, 1),
    baseSize
  ];

  return `:root {
  --brand-primary: ${tokens.primary};
  --brand-secondary: ${tokens.secondary};
  --brand-accent: ${tokens.accent};
  --brand-success: ${tokens.success};
  --brand-danger: ${tokens.danger};
  --brand-warning: ${tokens.warning};
  --brand-info: ${tokens.info};
  --brand-neutral-bg: ${tokens.neutralBg};
  --brand-neutral-text: ${tokens.neutralText};
  --radius-base: ${theme.radius}px;
  --shadow-card: 0 ${theme.shadowStrength}px ${theme.shadowStrength * 2}px rgba(0,0,0,0.12);
  --btn-shadow: 0 ${theme.buttonShadow}px ${theme.buttonShadow * 2}px rgba(13,110,253,0.25);
  --hover-translate: translateY(-${theme.hoverLift}px);
  --border-style: ${theme.borderStyle};
  --text-transform: ${theme.textTransform};
  --letter-spacing: ${theme.letterSpacing}em;
  --btn-padding-y: ${theme.buttonPaddingY}px;
  --btn-padding-x: ${theme.buttonPaddingX}px;
  --focus-ring-size: ${theme.focusRing / 16}rem;
  --font-size-base: ${typography.baseSize}px;
  --line-height-base: ${typography.lineHeight};
  --heading-scale: ${typography.headingScale};
  --border-width: ${theme.borderWidth}px;
  --spacing-unit: ${theme.spacingUnit}px;
}

body {
  font-family: ${getFontFamily(typography.fontStack)};
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  letter-spacing: var(--letter-spacing);
  background: var(--brand-neutral-bg);
  color: var(--brand-neutral-text);
}

h1 { font-size: ${sizes[0].toFixed(2)}px; }
h2 { font-size: ${sizes[1].toFixed(2)}px; }
h3 { font-size: ${sizes[2].toFixed(2)}px; }
h4 { font-size: ${sizes[3].toFixed(2)}px; }
h5 { font-size: ${sizes[4].toFixed(2)}px; }
h6 { font-size: ${sizes[5].toFixed(2)}px; }

.btn, .card, .form-control, .accordion-item, .nav-tabs .nav-link {
  border-radius: var(--radius-base);
  border-width: var(--border-width);
  border-style: var(--border-style);
}

.btn-brand {
  background: var(--brand-primary);
  border-color: var(--brand-primary);
  color: #fff;
  box-shadow: var(--btn-shadow);
}

.btn-brand:hover,
.btn-brand:focus {
  background: color-mix(in srgb, var(--brand-primary), #000 10%);
  border-color: color-mix(in srgb, var(--brand-primary), #000 12%);
  transform: var(--hover-translate);
}

.btn {
  padding: var(--btn-padding-y) var(--btn-padding-x);
  text-transform: var(--text-transform);
  letter-spacing: var(--letter-spacing);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-transform: var(--text-transform);
  letter-spacing: var(--letter-spacing);
}

.btn-ghost {
  background: transparent;
  border: 1px solid var(--brand-primary);
  color: var(--brand-primary);
}

.link-underline {
  position: relative;
  text-decoration: none;
}

.link-underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}

.link-underline:hover::after,
.link-underline:focus::after {
  transform: scaleX(1);
}

.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: var(--hover-translate);
  box-shadow: var(--shadow-card);
}

.btn:focus-visible,
.form-control:focus-visible,
.form-select:focus-visible {
  box-shadow: 0 0 0 var(--focus-ring-size) color-mix(in srgb, var(--brand-primary), transparent 70%);
}

@media (prefers-reduced-motion: reduce) {
  .link-underline::after,
  .card-hover,
  .btn-brand {
    transition: none;
  }
}
`;
}

function generateKitchenSinkPage(state, components) {
  const tokens = buildTokenPayload();
  const content = components
    .map((component) => `<section class="mb-5"><h3 class="mb-3">${component.name}</h3>${component.render({
      ...component.defaultProps,
      ...(state.componentOverrides[component.id] || {})
    }, tokens)}</section>`)
    .join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${state.projectName} Kitchen Sink</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" />
  <link rel="stylesheet" href="theme.css" />
</head>
<body class="bg-light">
  <main class="container py-4">
    <h1 class="mb-4">${state.projectName}</h1>
    ${content}
  </main>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
}

function exportProject(state, components) {
  const tokens = buildTokenPayload();
  const themeCss = generateThemeCSS(state);
  const kitchenSink = generateKitchenSinkPage(state, components);

  const componentSnippets = components.reduce((acc, component) => {
    acc[`${component.id}.html`] = component.render(
      { ...component.defaultProps, ...(state.componentOverrides[component.id] || {}) },
      tokens
    );
    return acc;
  }, {});

  if (window.JSZip) {
    const zip = new JSZip();
    zip.file("tokens.json", JSON.stringify(tokens, null, 2));
    zip.file("theme.css", themeCss);
    const componentFolder = zip.folder("components");
    Object.entries(componentSnippets).forEach(([name, html]) => {
      componentFolder.file(name, html);
    });
    zip.file("kitchen-sink.html", kitchenSink);
    zip.generateAsync({ type: "blob" }).then((blob) => {
      downloadBlob(blob, `${state.projectName.replace(/\s+/g, "-").toLowerCase()}-export.zip`);
    });
  } else {
    downloadFile("tokens.json", JSON.stringify(tokens, null, 2));
    downloadFile("theme.css", themeCss);
    Object.entries(componentSnippets).forEach(([name, html]) => {
      downloadFile(name, html);
    });
    downloadFile("kitchen-sink.html", kitchenSink);
  }
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  downloadBlob(blob, filename);
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}
