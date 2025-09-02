// Clean TOC Navigation Script - No Animations
document.addEventListener('DOMContentLoaded', function() {
    // Handle TOC navigation
    const tocLinks = document.querySelectorAll('.toc .nav-link');
    const currentPath = window.location.pathname;
    
    tocLinks.forEach(link => {
        // Remove active class from all links
        link.classList.remove('active');
        
        // Check if this link matches the current page
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith(linkPath) || 
            (currentPath.endsWith('/') && linkPath === 'index.html') ||
            (currentPath.endsWith('/v2-clean/') && linkPath === 'index.html') ||
            (currentPath.endsWith('/v2-clean/HX/') && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Handle mobile TOC toggle - no animations
    const tocToggle = document.querySelector('[data-bs-toggle="offcanvas"]');
    const tocOffcanvas = document.querySelector('#tocOffcanvas');
    const closeBtn = document.querySelector('.btn-close');
    
    if (tocToggle && tocOffcanvas) {
        tocToggle.addEventListener('click', function() {
            tocOffcanvas.classList.add('show');
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                tocOffcanvas.classList.remove('show');
            });
        }
        
        // Close on backdrop click
        tocOffcanvas.addEventListener('click', function(e) {
            if (e.target === tocOffcanvas) {
                tocOffcanvas.classList.remove('show');
            }
        });
    }
    
    // Auto-populate TOC content
    const tocContainer = document.querySelector('#toc');
    if (tocContainer && !tocContainer.innerHTML.trim()) {
        // If TOC is empty, populate it based on current page
        let tocContent = '';
        
        if (currentPath.includes('/HX/V1/')) {
            tocContent = `
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link" href="../../index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../index.html">HX API</a>
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link active" href="index.html">V1 API</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="../V2/index.html">V2 API</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            `;
        } else if (currentPath.includes('/HX/V2/')) {
            tocContent = `
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link" href="../../index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../index.html">HX API</a>
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" href="../V1/index.html">V1 API</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" href="index.html">V2 API</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            `;
        } else if (currentPath.includes('/HX/')) {
            tocContent = `
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link" href="../index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="index.html">HX API</a>
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" href="V1/index.html">V1 API</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="V2/index.html">V2 API</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            `;
        } else {
            tocContent = `
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link active" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="HX/index.html">HX API</a>
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" href="HX/V1/index.html">V1 API</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="HX/V2/index.html">V2 API</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            `;
        }
        
        tocContainer.innerHTML = tocContent;
    }
});
