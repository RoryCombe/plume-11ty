class PlumeHero2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const heading = this.getAttribute('heading') || 'Default Heading';
    const description = this.getAttribute('description') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .hero {
          background: #f8f9fa;
          padding: 5rem 2rem;
          text-align: center;
        }
        .hero-content {
          max-width: 700px;
          margin: 0 auto;
        }
        h2 {
          font-size: 3rem;
          font-weight: 600;
          margin: 0 0 1.5rem 0;
          color: #1a1a1a;
          line-height: 1.2;
        }
        .description {
          font-size: 1.25rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }
        @media (max-width: 768px) {
          .hero {
            padding: 3rem 1.5rem;
          }
          h2 {
            font-size: 2rem;
          }
          .description {
            font-size: 1.1rem;
          }
        }
      </style>
      <section class="hero">
        <div class="hero-content">
          <h2>${this.escapeHtml(heading)}</h2>
          ${description ? `<p class="description">${this.escapeHtml(description)}</p>` : ''}
        </div>
      </section>
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

customElements.define('plume-hero-2', PlumeHero2);
