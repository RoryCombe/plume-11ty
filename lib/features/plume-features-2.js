class PlumeFeatures2 extends HTMLElement {
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
          background: #f8f9fa;
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
          color: #1a1a1a;
        }
        .features-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .feature {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 2rem;
          align-items: start;
          background: white;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .feature-icon {
          width: 60px;
          height: 60px;
          background: #667eea;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }
        .feature-content {
          flex: 1;
        }
        .feature-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: #1a1a1a;
        }
        .feature-description {
          color: #666;
          line-height: 1.6;
          margin: 0;
        }
        @media (max-width: 768px) {
          .feature {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
      </style>
      <section class="features">
        <div class="features-content">
          <h2>${this.escapeHtml(title)}</h2>
          <div class="features-list">
            ${parsedFeatures
              .map(
                (feature) => `
              <div class="feature">
                <div class="feature-icon">${feature.icon || '✨'}</div>
                <div class="feature-content">
                  <h3 class="feature-title">${this.escapeHtml(feature.title)}</h3>
                  <p class="feature-description">${this.escapeHtml(feature.description)}</p>
                </div>
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

customElements.define('plume-features-2', PlumeFeatures2);
