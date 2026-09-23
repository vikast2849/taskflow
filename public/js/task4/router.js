/**
 * Task 4 Module: Client-Side Routing for SPA UX
 * Cognifyz Technologies Full Stack Development Internship - Level 2 Task 4
 */

export class ClientRouter {
  constructor(routes, defaultRoute = '#tasks') {
    this.routes = routes;
    this.defaultRoute = defaultRoute;

    window.addEventListener('hashchange', () => this.handleRoute());
  }

  init() {
    if (!window.location.hash || !this.routes[window.location.hash]) {
      window.location.hash = this.defaultRoute;
    } else {
      this.handleRoute();
    }
  }

  handleRoute() {
    const hash = window.location.hash || this.defaultRoute;
    const targetViewId = this.routes[hash] || this.routes[this.defaultRoute];

    // Toggle view containers
    document.querySelectorAll('.t4-view').forEach(view => {
      view.classList.remove('active');
    });

    const activeView = document.getElementById(targetViewId);
    if (activeView) {
      activeView.classList.add('active');
    }

    // Toggle navigation buttons
    document.querySelectorAll('.t4-nav-btn').forEach(btn => {
      if (btn.getAttribute('href') === hash) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Scroll smoothly to top of view container
    const mainSection = document.getElementById('spaMainContent');
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}
