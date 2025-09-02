// Header Component - Automatically injects header into all pages
(function() {
  'use strict';
  
  // Create header HTML structure
  function createHeader() {
    const header = document.createElement('header');    
    return header;
  }
  
  // Get the correct home link based on current page depth
  function getHomeLink() {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const depth = pathSegments.length;
    
    // For root level, just use index.html
    if (depth === 0) {
      return 'index.html';
    }
    
    // For nested pages, go up the appropriate number of levels
    const homeLink = '../'.repeat(depth) + 'index.html';
    return homeLink;
  }
  
  // Inject header into page
  function injectHeader() {
    const existingHeader = document.querySelector('header');
    if (existingHeader) {
      existingHeader.remove();
    }
    
    const header = createHeader();
    const body = document.body;
    
    // Insert header at the beginning of body
    body.insertBefore(header, body.firstChild);
    
    // Update home link
    const homeLink = header.querySelector('.navbar-brand');
    homeLink.href = getHomeLink();
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }
})();
