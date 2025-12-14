class PlumeFeatures1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
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
          background: white;
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
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }
        .feature {
          text-align: center;
        }
        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
        }
        .feature-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: #1a1a1a;
        }
        .feature-description {
          color: #666;
          line-height: 1.6;
          margin: 0;
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

customElements.define('plume-features-1', PlumeFeatures1);
