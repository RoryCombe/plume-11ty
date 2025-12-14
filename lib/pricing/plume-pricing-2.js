class PlumePricing2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title', 'plans'];
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
    const title = this.getAttribute('title') || 'Pricing';
    const plans = this.getAttribute('plans') || '[]';
    let parsedPlans = [];
    try {
      parsedPlans = JSON.parse(plans);
    } catch (e) {
      // If parsing fails, use empty array
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .pricing {
          padding: 5rem 2rem;
          background: white;
        }
        .pricing-content {
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
        .plans {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .plan {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 3rem 2rem;
          border-radius: 1rem;
          position: relative;
          overflow: hidden;
        }
        .plan.featured {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .plan-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }
        .plan-price {
          font-size: 4rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }
        .plan-period {
          opacity: 0.9;
          margin: 0 0 2rem 0;
        }
        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
        }
        .plan-features li {
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .plan-features li:last-child {
          border-bottom: none;
        }
        .plan-button {
          display: inline-block;
          width: 100%;
          padding: 0.75rem 1.5rem;
          background: white;
          color: #667eea;
          text-decoration: none;
          border-radius: 0.25rem;
          font-weight: 600;
          text-align: center;
          transition: transform 0.2s;
        }
        .plan-button:hover {
          transform: translateY(-2px);
        }
      </style>
      <section class="pricing">
        <div class="pricing-content">
          <h2>${this.escapeHtml(title)}</h2>
          <div class="plans">
            ${parsedPlans
              .map(
                (plan, index) => `
              <div class="plan ${plan.featured ? 'featured' : ''}">
                <h3 class="plan-name">${this.escapeHtml(plan.name)}</h3>
                <div class="plan-price">$${this.escapeHtml(plan.price)}</div>
                <div class="plan-period">${this.escapeHtml(plan.period || '/month')}</div>
                <ul class="plan-features">
                  ${
                    plan.features
                      ? plan.features
                          .map(
                            (feature) => `
                    <li>${this.escapeHtml(feature)}</li>
                  `
                          )
                          .join('')
                      : ''
                  }
                </ul>
                <a href="${this.escapeHtml(plan.link || '#')}" class="plan-button">${this.escapeHtml(
                  plan.buttonText || 'Get Started'
                )}</a>
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

customElements.define('plume-pricing-2', PlumePricing2);
