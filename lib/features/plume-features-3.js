class PlumeFeatures3 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title', 'features'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render();
    }
  }

  render() {
    const title = this.getAttribute('title') || 'Features';
    const features = this.getAttribute('features') || '[]';
    let parsedFeatures = [];
    try {
      parsedFeatures = JSON.parse(features);
    } catch (e) {
      // If parsing fails, use empty array
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .features {
          padding: 5rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .features-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        h2 {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin: 0 0 3rem 0;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .feature {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 2rem;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          text-align: center;
          transition: transform 0.2s, background 0.2s;
        }
        .feature:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
        }
        .feature-icon {
          font-size: 3rem;
          margin: 0 0 1rem 0;
        }
        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.75rem 0;
        }
        .feature-description {
          opacity: 0.9;
          line-height: 1.6;
          margin: 0;
          font-size: 0.95rem;
        }
      </style>
      <section class="features">
        <div class="features-content">
          <h2>${this.escapeHtml(title)}</h2>
          <div class="features-grid">
            ${parsedFeatures
              .map(
                (feature) => `
              <div class="feature">
                <div class="feature-icon">${feature.icon || '✨'}</div>
                <h3 class="feature-title">${this.escapeHtml(feature.title)}</h3>
                <p class="feature-description">${this.escapeHtml(feature.description)}</p>
              </div>
            `
              )
              .join('')}
          </div>
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

customElements.define('plume-features-3', PlumeFeatures3);
