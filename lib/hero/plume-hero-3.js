class PlumeHero3 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Default Title';
    const subtitle = this.getAttribute('subtitle') || '';
    const imageUrl = this.getAttribute('image-url') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          min-height: 500px;
          background: white;
        }
        .hero-content {
          padding: 4rem 3rem;
        }
        h1 {
          font-size: 3rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          color: #1a1a1a;
          line-height: 1.2;
        }
        .subtitle {
          font-size: 1.25rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }
        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #999;
          font-size: 1.2rem;
        }
        .hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 768px) {
          .hero {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .hero-content {
            padding: 3rem 2rem;
          }
          h1 {
            font-size: 2rem;
          }
          .hero-image {
            min-height: 300px;
          }
        }
      </style>
      <section class="hero">
        <div class="hero-content">
          <h1>${this.escapeHtml(title)}</h1>
          ${subtitle ? `<p class="subtitle">${this.escapeHtml(subtitle)}</p>` : ''}
        </div>
        <div class="hero-image">
          ${
            imageUrl
              ? `<img src="${this.escapeHtml(imageUrl)}" alt="${this.escapeHtml(title)}">`
              : '<span>Image Placeholder</span>'
          }
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

customElements.define('plume-hero-3', PlumeHero3);
