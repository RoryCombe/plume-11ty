class PlumePricing3 extends HTMLElement {
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
          background: #1a1a1a;
          color: white;
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
        }
        .plans {
          display: flex;
          justify-content: center;
          gap: 0;
          border-radius: 0.5rem;
          overflow: hidden;
        }
        .plan {
          background: #2a2a2a;
          padding: 3rem 2rem;
          border-right: 1px solid #3a3a3a;
          flex: 1;
          max-width: 350px;
        }
        .plan:last-child {
          border-right: none;
        }
        .plan.featured {
          background: #333;
          border: 2px solid #667eea;
        }
        .plan-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #667eea;
        }
        .plan-price {
          font-size: 3.5rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }
        .plan-period {
          color: #999;
          margin: 0 0 2rem 0;
          font-size: 0.9rem;
        }
        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
        }
        .plan-features li {
          padding: 0.5rem 0;
          color: #ccc;
          font-size: 0.95rem;
        }
        .plan-button {
          display: inline-block;
          width: 100%;
          padding: 0.75rem 1.5rem;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 0.25rem;
          font-weight: 600;
          text-align: center;
          transition: background 0.2s;
        }
        .plan-button:hover {
          background: #5568d3;
        }
        @media (max-width: 768px) {
          .plans {
            flex-direction: column;
          }
          .plan {
            border-right: none;
            border-bottom: 1px solid #3a3a3a;
            max-width: 100%;
          }
          .plan:last-child {
            border-bottom: none;
          }
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

customElements.define('plume-pricing-3', PlumePricing3);
