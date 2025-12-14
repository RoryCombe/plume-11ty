class PlumePricing1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
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
          background: #f8f9fa;
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
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .plan {
          background: white;
          padding: 2.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .plan-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: #1a1a1a;
        }
        .plan-price {
          font-size: 3rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
          color: #667eea;
        }
        .plan-period {
          color: #666;
          margin: 0 0 1.5rem 0;
        }
        .plan-features {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          text-align: left;
        }
        .plan-features li {
          padding: 0.5rem 0;
          color: #666;
        }
        .plan-features li:before {
          content: "✓ ";
          color: #667eea;
          font-weight: bold;
          margin-right: 0.5rem;
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
          transition: background 0.2s;
        }
        .plan-button:hover {
          background: #5568d3;
        }
      </style>
      <section class="pricing">
        <div class="pricing-content">
          <h2>${this.escapeHtml(title)}</h2>
          <div class="plans">
            ${parsedPlans
              .map(
                (plan) => `
              <div class="plan">
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

customElements.define('plume-pricing-1', PlumePricing1);
