const COMPONENT_CATEGORIES = [
  "Buttons/CTAs",
  "Typography",
  "Content Blocks",
  "Navigation",
  "Hero",
  "Forms",
  "Footer",
  "Utility",
  "States"
];

const COMPONENTS = [
  {
    id: "btn-primary",
    name: "Primary Button",
    category: "Buttons/CTAs",
    notes: "Use for primary actions. Pair with secondary or outline buttons.",
    recommended: ".btn.btn-brand",
    defaultProps: {
      label: "Get Started",
      size: "md",
      pill: false,
      loading: false,
      fullWidth: false,
      disabled: false
    },
    controls: [
      { key: "label", label: "Label", type: "text" },
      { key: "size", label: "Size", type: "select", options: ["sm", "md", "lg"] },
      { key: "pill", label: "Pill", type: "toggle" },
      { key: "loading", label: "Loading", type: "toggle" },
      { key: "fullWidth", label: "Full width", type: "toggle" },
      { key: "disabled", label: "Disabled", type: "toggle" }
    ],
    render: (props) => {
      const sizeClass = props.size === "md" ? "" : `btn-${props.size}`;
      const pillClass = props.pill ? "rounded-pill" : "";
      const widthClass = props.fullWidth ? "w-100" : "";
      const content = props.loading
        ? `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Loading`
        : props.label;
      return `<button class="btn btn-brand ${sizeClass} ${pillClass} ${widthClass}" ${props.disabled ? "disabled" : ""}>${content}</button>`;
    }
  },
  {
    id: "btn-secondary",
    name: "Secondary Button",
    category: "Buttons/CTAs",
    notes: "Use for secondary actions. Pair with primary for hierarchy.",
    recommended: ".btn.btn-secondary",
    defaultProps: { label: "Secondary", outline: false, size: "md" },
    controls: [
      { key: "label", label: "Label", type: "text" },
      { key: "outline", label: "Outline", type: "toggle" },
      { key: "size", label: "Size", type: "select", options: ["sm", "md", "lg"] }
    ],
    render: (props) => {
      const sizeClass = props.size === "md" ? "" : `btn-${props.size}`;
      const variant = props.outline ? "btn-outline-secondary" : "btn-secondary";
      return `<button class="btn ${variant} ${sizeClass}">${props.label}</button>`;
    }
  },
  {
    id: "btn-outline",
    name: "Outline Button",
    category: "Buttons/CTAs",
    notes: "Outline buttons are great for tertiary actions.",
    recommended: ".btn.btn-outline-primary",
    defaultProps: { label: "Outline", size: "md" },
    controls: [
      { key: "label", label: "Label", type: "text" },
      { key: "size", label: "Size", type: "select", options: ["sm", "md", "lg"] }
    ],
    render: (props) => {
      const sizeClass = props.size === "md" ? "" : `btn-${props.size}`;
      return `<button class="btn btn-outline-primary ${sizeClass}">${props.label}</button>`;
    }
  },
  {
    id: "btn-ghost",
    name: "Ghost Button",
    category: "Buttons/CTAs",
    notes: "Ghost buttons are subtle and work well on tinted surfaces.",
    recommended: ".btn.btn-ghost",
    defaultProps: { label: "Ghost", size: "md", icon: true },
    controls: [
      { key: "label", label: "Label", type: "text" },
      { key: "size", label: "Size", type: "select", options: ["sm", "md", "lg"] },
      { key: "icon", label: "Show icon", type: "toggle" }
    ],
    render: (props) => {
      const sizeClass = props.size === "md" ? "" : `btn-${props.size}`;
      const icon = props.icon ? "<i class=\"bi bi-arrow-right ms-2\"></i>" : "";
      return `<button class="btn btn-ghost ${sizeClass}">${props.label}${icon}</button>`;
    }
  },
  {
    id: "btn-icon",
    name: "Icon Button",
    category: "Buttons/CTAs",
    notes: "Use for compact actions. Include aria-labels for accessibility.",
    recommended: "aria-label + .btn.btn-outline-primary",
    defaultProps: { label: "", icon: "bi-heart", size: "md" },
    controls: [
      { key: "icon", label: "Icon class", type: "text" },
      { key: "size", label: "Size", type: "select", options: ["sm", "md", "lg"] }
    ],
    render: (props) => {
      const sizeClass = props.size === "md" ? "" : `btn-${props.size}`;
      return `<button class="btn btn-outline-primary ${sizeClass}" aria-label="Icon action"><i class="bi ${props.icon}"></i></button>`;
    }
  },
  {
    id: "text-styles",
    name: "Text Styles",
    category: "Typography",
    notes: "Apply to headings, lead, and helper text for consistency.",
    recommended: "Bootstrap headings + .lead + .text-muted",
    defaultProps: { eyebrow: "Eyebrow", headline: "Design for growth", subhead: "Build cohesive components fast." },
    controls: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "headline", label: "Headline", type: "text" },
      { key: "subhead", label: "Subhead", type: "text" }
    ],
    render: (props) => `
      <div>
        <p class="text-uppercase small text-secondary mb-2">${props.eyebrow}</p>
        <h1>${props.headline}</h1>
        <p class="lead text-muted">${props.subhead}</p>
        <p>Rich text sample with <a href="#" class="link-underline">link</a>, inline <code>code</code>, and <strong>bold</strong> text.</p>
        <ul>
          <li>Bullet list item</li>
          <li>Another item</li>
        </ul>
        <blockquote class="blockquote">
          <p>"This is a blockquote to show typographic rhythm."</p>
        </blockquote>
      </div>
    `
  },
  {
    id: "feature-grid",
    name: "Feature Card Grid",
    category: "Content Blocks",
    notes: "Use 3-up cards for highlights; stacks on smaller screens.",
    recommended: ".row + .card.card-hover",
    defaultProps: { title: "Core Features", items: 3 },
    controls: [
      { key: "title", label: "Section title", type: "text" },
      { key: "items", label: "Cards", type: "select", options: [2, 3, 4] }
    ],
    render: (props) => {
      const cards = Array.from({ length: Number(props.items) }, (_, i) => `
        <div class="col-md-4">
          <div class="card card-hover h-100 p-3">
            <div class="card-body">
              <h5 class="card-title">Feature ${i + 1}</h5>
              <p class="text-muted">Short description of the feature benefit.</p>
            </div>
          </div>
        </div>
      `).join("");
      return `
        <section>
          <h3 class="mb-4">${props.title}</h3>
          <div class="row g-3">${cards}</div>
        </section>
      `;
    }
  },
  {
    id: "testimonial-cards",
    name: "Testimonial Cards",
    category: "Content Blocks",
    notes: "Showcase customer quotes with avatars or logos.",
    recommended: ".card + .list-inline",
    defaultProps: { quote: "This toolkit saved us weeks of design work.", name: "Alex Rivera" },
    controls: [
      { key: "quote", label: "Quote", type: "text" },
      { key: "name", label: "Name", type: "text" }
    ],
    render: (props) => `
      <div class="row g-3">
        <div class="col-md-6">
          <div class="card h-100 p-3">
            <div class="card-body">
              <p class="mb-3">"${props.quote}"</p>
              <div class="d-flex align-items-center gap-2">
                <div class="rounded-circle bg-secondary-subtle" style="width:40px;height:40px"></div>
                <div>
                  <strong>${props.name}</strong>
                  <div class="text-muted small">Product Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card h-100 p-3">
            <div class="card-body">
              <p class="mb-3">"The components are polished and easy to customize."</p>
              <div class="d-flex align-items-center gap-2">
                <div class="rounded-circle bg-secondary-subtle" style="width:40px;height:40px"></div>
                <div>
                  <strong>Jamie Lee</strong>
                  <div class="text-muted small">Design Lead</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "stats-row",
    name: "Stats Row",
    category: "Content Blocks",
    notes: "Use for KPIs; emphasize with contrast background.",
    recommended: ".d-flex + .display-6",
    defaultProps: { label: "Active users", value: "12k" },
    controls: [
      { key: "label", label: "Label", type: "text" },
      { key: "value", label: "Value", type: "text" }
    ],
    render: (props) => `
      <div class="row text-center g-3">
        <div class="col-md-4">
          <div class="p-3 bg-body-tertiary rounded-3">
            <div class="display-6">${props.value}</div>
            <div class="text-muted">${props.label}</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 bg-body-tertiary rounded-3">
            <div class="display-6">98%</div>
            <div class="text-muted">Satisfaction</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 bg-body-tertiary rounded-3">
            <div class="display-6">24/7</div>
            <div class="text-muted">Support</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "two-column",
    name: "Two Column Text + Image",
    category: "Content Blocks",
    notes: "Pair narrative with imagery; stack on mobile.",
    recommended: ".row.align-items-center",
    defaultProps: { headline: "Build faster", body: "Use blocks to assemble pages quickly." },
    controls: [
      { key: "headline", label: "Headline", type: "text" },
      { key: "body", label: "Body", type: "text" }
    ],
    render: (props) => `
      <div class="row align-items-center g-4">
        <div class="col-md-6">
          <h2>${props.headline}</h2>
          <p class="text-muted">${props.body}</p>
          <button class="btn btn-brand">Learn more</button>
        </div>
        <div class="col-md-6">
          <div class="ratio ratio-16x9 bg-secondary-subtle rounded-3"></div>
        </div>
      </div>
    `
  },
  {
    id: "faq-accordion",
    name: "FAQ Accordion",
    category: "Content Blocks",
    notes: "Use accordions for common questions.",
    recommended: ".accordion",
    defaultProps: { question: "How fast can I ship?", answer: "Most teams launch in days." },
    controls: [
      { key: "question", label: "Question", type: "text" },
      { key: "answer", label: "Answer", type: "text" }
    ],
    render: (props) => `
      <div class="accordion" id="faqAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              ${props.question}
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne">
            <div class="accordion-body">${props.answer}</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Can I customize colors?
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo">
            <div class="accordion-body">Yes, adjust tokens in the left panel.</div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "header-simple",
    name: "Simple Header",
    category: "Navigation",
    notes: "Include brand, navigation, and CTA.",
    recommended: ".navbar.navbar-expand-lg",
    defaultProps: { cta: "Get started", sticky: false, theme: "light" },
    controls: [
      { key: "cta", label: "CTA label", type: "text" },
      { key: "sticky", label: "Sticky", type: "toggle" },
      { key: "theme", label: "Theme", type: "select", options: ["light", "dark"] }
    ],
    render: (props, tokens) => {
      const themeClass = props.theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-white";
      const stickyClass = props.sticky ? "sticky-top" : "";
      const logo = tokens.brand.logo
        ? `<img src="${tokens.brand.logo}" alt="${tokens.brand.name}" style="height:${tokens.brand.logoSize}px" class="me-2"/>`
        : "";
      return `
        <nav class="navbar navbar-expand-lg ${themeClass} ${stickyClass} border rounded-3 px-3">
          <a class="navbar-brand" href="#">${logo}${tokens.brand.name}</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto gap-2">
              <li class="nav-item"><a class="nav-link" href="#">Product</a></li>
              <li class="nav-item"><a class="nav-link" href="#">Pricing</a></li>
              <li class="nav-item"><a class="nav-link" href="#">About</a></li>
            </ul>
            <button class="btn btn-brand ms-lg-3">${props.cta}</button>
          </div>
        </nav>
      `;
    }
  },
  {
    id: "header-dropdown",
    name: "Header with Dropdown",
    category: "Navigation",
    notes: "Use dropdowns for grouped navigation.",
    recommended: ".dropdown-menu",
    defaultProps: { label: "Solutions" },
    controls: [
      { key: "label", label: "Dropdown label", type: "text" }
    ],
    render: (props, tokens) => {
      const logo = tokens.brand.logo
        ? `<img src="${tokens.brand.logo}" alt="${tokens.brand.name}" style="height:${tokens.brand.logoSize}px" class="me-2"/>`
        : "";
      return `
        <nav class="navbar navbar-expand-lg bg-white border rounded-3 px-3">
          <a class="navbar-brand" href="#">${logo}${tokens.brand.name}</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarDropdown">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarDropdown">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">${props.label}</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Analytics</a></li>
                  <li><a class="dropdown-item" href="#">Automation</a></li>
                  <li><a class="dropdown-item" href="#">Security</a></li>
                </ul>
              </li>
              <li class="nav-item"><a class="nav-link" href="#">Docs</a></li>
            </ul>
          </div>
        </nav>
      `;
    }
  },
  {
    id: "header-offcanvas",
    name: "Offcanvas Header",
    category: "Navigation",
    notes: "Use for mobile menus; includes offcanvas panel.",
    recommended: ".offcanvas",
    defaultProps: { cta: "Sign up" },
    controls: [{ key: "cta", label: "CTA label", type: "text" }],
    render: (props, tokens) => {
      const logo = tokens.brand.logo
        ? `<img src="${tokens.brand.logo}" alt="${tokens.brand.name}" style="height:${tokens.brand.logoSize}px" class="me-2"/>`
        : "";
      return `
        <nav class="navbar bg-white border rounded-3 px-3">
          <a class="navbar-brand" href="#">${logo}${tokens.brand.name}</a>
          <button class="btn btn-outline-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu">Menu</button>
        </nav>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasMenu">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title">${tokens.brand.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="list-unstyled d-grid gap-2">
              <li><a href="#" class="link-underline">Product</a></li>
              <li><a href="#" class="link-underline">Resources</a></li>
              <li><a href="#" class="link-underline">Support</a></li>
            </ul>
            <button class="btn btn-brand w-100 mt-3">${props.cta}</button>
          </div>
        </div>
      `;
    }
  },
  {
    id: "hero-basic",
    name: "Hero Basic",
    category: "Hero",
    notes: "Use for simple hero with CTA pair.",
    recommended: ".display-5 + .lead",
    defaultProps: { headline: "Launch your next product", subhead: "Compose components quickly.", primary: "Start now", secondary: "View docs" },
    controls: [
      { key: "headline", label: "Headline", type: "text" },
      { key: "subhead", label: "Subhead", type: "text" },
      { key: "primary", label: "Primary CTA", type: "text" },
      { key: "secondary", label: "Secondary CTA", type: "text" }
    ],
    render: (props) => `
      <section class="p-4 p-md-5 bg-white rounded-4 shadow-sm">
        <h1 class="display-5">${props.headline}</h1>
        <p class="lead text-muted">${props.subhead}</p>
        <div class="d-flex gap-2 flex-wrap">
          <button class="btn btn-brand">${props.primary}</button>
          <button class="btn btn-outline-secondary">${props.secondary}</button>
        </div>
      </section>
    `
  },
  {
    id: "hero-overlay",
    name: "Hero Image Overlay",
    category: "Hero",
    notes: "Use background image overlay for storytelling.",
    recommended: ".bg-dark.text-white",
    defaultProps: { headline: "Design that converts", subhead: "Craft pages with confidence." },
    controls: [
      { key: "headline", label: "Headline", type: "text" },
      { key: "subhead", label: "Subhead", type: "text" }
    ],
    render: (props) => `
      <section class="text-white rounded-4 p-5" style="background: linear-gradient(120deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=60') center/cover;">
        <div class="col-md-8">
          <h1>${props.headline}</h1>
          <p class="lead">${props.subhead}</p>
          <button class="btn btn-brand">Build now</button>
        </div>
      </section>
    `
  },
  {
    id: "hero-form",
    name: "Hero with Form",
    category: "Hero",
    notes: "Combine hero copy with a lead capture form.",
    recommended: ".input-group",
    defaultProps: { headline: "Grow your list", button: "Notify me" },
    controls: [
      { key: "headline", label: "Headline", type: "text" },
      { key: "button", label: "Button label", type: "text" }
    ],
    render: (props) => `
      <section class="p-4 p-md-5 bg-white rounded-4 shadow-sm">
        <div class="row align-items-center g-4">
          <div class="col-md-6">
            <h1>${props.headline}</h1>
            <p class="text-muted">Capture leads with a simple form and clear promise.</p>
          </div>
          <div class="col-md-6">
            <form class="d-grid gap-2">
              <input class="form-control" type="email" placeholder="Work email" required />
              <button class="btn btn-brand">${props.button}</button>
              <small class="text-muted">We respect your privacy.</small>
            </form>
          </div>
        </div>
      </section>
    `
  },
  {
    id: "hero-video",
    name: "Hero with Video",
    category: "Hero",
    notes: "Use a video placeholder to communicate product value.",
    recommended: ".ratio.ratio-16x9",
    defaultProps: { headline: "Show the product" },
    controls: [{ key: "headline", label: "Headline", type: "text" }],
    render: (props) => `
      <section class="row g-4 align-items-center">
        <div class="col-md-6">
          <h1>${props.headline}</h1>
          <p class="text-muted">Pair hero content with a demo video placeholder.</p>
          <button class="btn btn-brand">Watch demo</button>
        </div>
        <div class="col-md-6">
          <div class="ratio ratio-16x9 bg-secondary-subtle rounded-4"></div>
        </div>
      </section>
    `
  },
  {
    id: "contact-form",
    name: "Contact Form",
    category: "Forms",
    notes: "Use for contact or inquiry forms with accessible labels.",
    recommended: ".form-control + .form-label",
    defaultProps: { heading: "Contact us", button: "Send message" },
    controls: [
      { key: "heading", label: "Heading", type: "text" },
      { key: "button", label: "Button", type: "text" }
    ],
    render: (props) => `
      <form class="p-4 bg-white rounded-4 shadow-sm">
        <h3 class="mb-3">${props.heading}</h3>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">First name</label>
            <input class="form-control" placeholder="Jamie" />
          </div>
          <div class="col-md-6">
            <label class="form-label">Last name</label>
            <input class="form-control" placeholder="Smith" />
          </div>
          <div class="col-12">
            <label class="form-label">Email</label>
            <input class="form-control" type="email" placeholder="you@company.com" />
          </div>
          <div class="col-12">
            <label class="form-label">Message</label>
            <textarea class="form-control" rows="3"></textarea>
          </div>
          <div class="col-12">
            <button class="btn btn-brand">${props.button}</button>
          </div>
        </div>
      </form>
    `
  },
  {
    id: "lead-form",
    name: "Lead Capture Form",
    category: "Forms",
    notes: "Show success and error states for validation guidance.",
    recommended: ".is-valid + .is-invalid",
    defaultProps: { button: "Get updates" },
    controls: [{ key: "button", label: "Button", type: "text" }],
    render: (props) => `
      <form class="p-4 bg-white rounded-4 shadow-sm">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input class="form-control is-valid" value="hello@brand.com" />
          <div class="valid-feedback">Looks good!</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Company</label>
          <input class="form-control is-invalid" placeholder="" />
          <div class="invalid-feedback">Please add your company name.</div>
        </div>
        <button class="btn btn-brand">${props.button}</button>
      </form>
    `
  },
  {
    id: "input-group",
    name: "Input Group",
    category: "Forms",
    notes: "Use for compact search or subscription forms.",
    recommended: ".input-group",
    defaultProps: { placeholder: "Search", button: "Go" },
    controls: [
      { key: "placeholder", label: "Placeholder", type: "text" },
      { key: "button", label: "Button", type: "text" }
    ],
    render: (props) => `
      <div class="input-group">
        <span class="input-group-text">🔍</span>
        <input class="form-control" placeholder="${props.placeholder}" />
        <button class="btn btn-brand">${props.button}</button>
      </div>
    `
  },
  {
    id: "checkbox-group",
    name: "Checkbox & Radio Group",
    category: "Forms",
    notes: "Group related options with labels.",
    recommended: ".form-check",
    defaultProps: { label: "I agree to updates" },
    controls: [{ key: "label", label: "Checkbox label", type: "text" }],
    render: (props) => `
      <div class="d-grid gap-2">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="check1" checked />
          <label class="form-check-label" for="check1">${props.label}</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="group" id="radio1" checked />
          <label class="form-check-label" for="radio1">Option one</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="group" id="radio2" />
          <label class="form-check-label" for="radio2">Option two</label>
        </div>
      </div>
    `
  },
  {
    id: "select-textarea",
    name: "Select + Textarea",
    category: "Forms",
    notes: "Include select, textarea, and floating label examples.",
    recommended: ".form-select + .form-floating",
    defaultProps: { label: "Tell us about your project" },
    controls: [{ key: "label", label: "Textarea label", type: "text" }],
    render: (props) => `
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Team size</label>
          <select class="form-select">
            <option>1-5</option>
            <option>6-20</option>
            <option>21-50</option>
          </select>
        </div>
        <div class="col-md-6 form-floating">
          <textarea class="form-control" placeholder="Leave a comment" style="height:100px"></textarea>
          <label>${props.label}</label>
        </div>
      </div>
    `
  },
  {
    id: "footer-columns",
    name: "Footer with Columns",
    category: "Footer",
    notes: "Use for navigation-heavy footers with social links.",
    recommended: ".row + .list-unstyled",
    defaultProps: { heading: "Company" },
    controls: [{ key: "heading", label: "Column heading", type: "text" }],
    render: (props, tokens) => `
      <footer class="bg-dark text-white p-4 rounded-4">
        <div class="row g-4">
          <div class="col-md-4">
            <h5>${tokens.brand.name}</h5>
            <p class="text-white-50">Build consistent UI with reusable blocks.</p>
          </div>
          <div class="col-md-2">
            <h6>${props.heading}</h6>
            <ul class="list-unstyled">
              <li><a class="text-white-50" href="#">About</a></li>
              <li><a class="text-white-50" href="#">Careers</a></li>
              <li><a class="text-white-50" href="#">Blog</a></li>
            </ul>
          </div>
          <div class="col-md-2">
            <h6>Resources</h6>
            <ul class="list-unstyled">
              <li><a class="text-white-50" href="#">Docs</a></li>
              <li><a class="text-white-50" href="#">Support</a></li>
              <li><a class="text-white-50" href="#">API</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h6>Follow</h6>
            <div class="d-flex gap-2">
              <span class="badge text-bg-secondary">X</span>
              <span class="badge text-bg-secondary">IG</span>
              <span class="badge text-bg-secondary">YT</span>
            </div>
          </div>
        </div>
      </footer>
    `
  },
  {
    id: "footer-minimal",
    name: "Minimal Footer",
    category: "Footer",
    notes: "Use for simple legal footers.",
    recommended: ".border-top",
    defaultProps: { legal: "Privacy" },
    controls: [{ key: "legal", label: "Legal link", type: "text" }],
    render: (props, tokens) => `
      <footer class="border-top pt-3 d-flex flex-wrap justify-content-between align-items-center">
        <span class="text-muted">© 2024 ${tokens.brand.name}</span>
        <a href="#" class="text-muted">${props.legal}</a>
      </footer>
    `
  },
  {
    id: "footer-newsletter",
    name: "Newsletter Footer",
    category: "Footer",
    notes: "Combine signup with quick links.",
    recommended: ".input-group",
    defaultProps: { button: "Subscribe" },
    controls: [{ key: "button", label: "Button label", type: "text" }],
    render: (props) => `
      <footer class="bg-body-tertiary p-4 rounded-4">
        <div class="row g-3 align-items-center">
          <div class="col-md-6">
            <h5>Stay in the loop</h5>
            <p class="text-muted">Monthly updates with new components.</p>
          </div>
          <div class="col-md-6">
            <div class="input-group">
              <input class="form-control" type="email" placeholder="Email address" />
              <button class="btn btn-brand">${props.button}</button>
            </div>
          </div>
        </div>
      </footer>
    `
  },
  {
    id: "alerts",
    name: "Alerts",
    category: "States",
    notes: "Use for system feedback and status updates.",
    recommended: ".alert",
    defaultProps: { message: "Success!" },
    controls: [{ key: "message", label: "Message", type: "text" }],
    render: (props) => `
      <div class="d-grid gap-2">
        <div class="alert alert-success">${props.message} Your changes were saved.</div>
        <div class="alert alert-info">Heads up! New updates are available.</div>
        <div class="alert alert-warning">Warning! Review your settings.</div>
        <div class="alert alert-danger">Error! Something went wrong.</div>
      </div>
    `
  },
  {
    id: "badges",
    name: "Badges & Tags",
    category: "Utility",
    notes: "Badges highlight status or categories.",
    recommended: ".badge",
    defaultProps: { label: "New" },
    controls: [{ key: "label", label: "Label", type: "text" }],
    render: (props) => `
      <div class="d-flex gap-2 flex-wrap">
        <span class="badge text-bg-primary">${props.label}</span>
        <span class="badge text-bg-secondary">Beta</span>
        <span class="badge text-bg-success">Live</span>
        <span class="badge text-bg-light text-dark">Neutral</span>
      </div>
    `
  },
  {
    id: "breadcrumbs",
    name: "Breadcrumbs",
    category: "Utility",
    notes: "Provide hierarchical navigation cues.",
    recommended: ".breadcrumb",
    defaultProps: { current: "Current" },
    controls: [{ key: "current", label: "Current label", type: "text" }],
    render: (props) => `
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">Library</a></li>
          <li class="breadcrumb-item active" aria-current="page">${props.current}</li>
        </ol>
      </nav>
    `
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "Utility",
    notes: "Use for paged content navigation.",
    recommended: ".pagination",
    defaultProps: { page: 2 },
    controls: [{ key: "page", label: "Active page", type: "select", options: [1, 2, 3, 4] }],
    render: (props) => {
      const page = Number(props.page);
      return `
        <nav aria-label="Pagination">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Prev</a></li>
            ${[1, 2, 3, 4].map((num) => `
              <li class="page-item ${num === page ? "active" : ""}"><a class="page-link" href="#">${num}</a></li>
            `).join("")}
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      `;
    }
  },
  {
    id: "modal",
    name: "Modal",
    category: "States",
    notes: "Use modals sparingly for critical actions.",
    recommended: ".modal",
    defaultProps: { title: "Confirm action" },
    controls: [{ key: "title", label: "Title", type: "text" }],
    render: (props) => `
      <div class="border rounded-4 p-4">
        <button class="btn btn-brand" data-bs-toggle="modal" data-bs-target="#demoModal">Open modal</button>
      </div>
      <div class="modal fade" id="demoModal" tabindex="-1" aria-labelledby="demoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="demoModalLabel">${props.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">Proceed with the action?</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-brand">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Utility",
    notes: "Use for organized content sections.",
    recommended: ".nav-tabs",
    defaultProps: { active: "Profile" },
    controls: [{ key: "active", label: "Active tab", type: "text" }],
    render: (props) => `
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item"><button class="nav-link ${props.active === "Profile" ? "active" : ""}">Profile</button></li>
        <li class="nav-item"><button class="nav-link ${props.active === "Settings" ? "active" : ""}">Settings</button></li>
        <li class="nav-item"><button class="nav-link ${props.active === "Billing" ? "active" : ""}">Billing</button></li>
      </ul>
      <div class="border border-top-0 p-3">Tab content goes here.</div>
    `
  },
  {
    id: "toast",
    name: "Toast",
    category: "States",
    notes: "Use for subtle, timed notifications.",
    recommended: ".toast",
    defaultProps: { message: "New project saved" },
    controls: [{ key: "message", label: "Message", type: "text" }],
    render: (props) => `
      <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Update</strong>
          <small>just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${props.message}</div>
      </div>
    `
  },
  {
    id: "skeleton",
    name: "Loading Skeleton",
    category: "States",
    notes: "Use for loading placeholders.",
    recommended: ".skeleton",
    defaultProps: { lines: 3 },
    controls: [{ key: "lines", label: "Lines", type: "select", options: [2, 3, 4] }],
    render: (props) => {
      const lines = Number(props.lines);
      return `
        <div class="d-grid gap-2">
          ${Array.from({ length: lines }, () => '<div class="skeleton"></div>').join("")}
        </div>
      `;
    }
  },
  {
    id: "empty-state",
    name: "Empty State",
    category: "States",
    notes: "Use for empty data scenarios.",
    recommended: ".text-center",
    defaultProps: { title: "No results", action: "Create item" },
    controls: [
      { key: "title", label: "Title", type: "text" },
      { key: "action", label: "Action label", type: "text" }
    ],
    render: (props) => `
      <div class="text-center p-4">
        <div class="display-6">📭</div>
        <h4 class="mt-3">${props.title}</h4>
        <p class="text-muted">Try adjusting filters or create a new entry.</p>
        <button class="btn btn-brand">${props.action}</button>
      </div>
    `
  },
  {
    id: "hover-interactions",
    name: "Hover & Focus States",
    category: "Utility",
    notes: "Use for subtle micro-interactions and focus treatments.",
    recommended: ".card-hover + .link-underline + .btn-brand",
    defaultProps: { linkLabel: "Explore features" },
    controls: [{ key: "linkLabel", label: "Link label", type: "text" }],
    render: (props) => `
      <div class="d-grid gap-3">
        <div class="card card-hover p-3">
          <h5>Hoverable card</h5>
          <p class="text-muted">Cards lift with subtle elevation.</p>
        </div>
        <a href="#" class="link-underline">${props.linkLabel}</a>
        <button class="btn btn-brand">Focus ring sample</button>
      </div>
    `
  }
];
