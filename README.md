# Hurtigruten Expeditions Partner API Documentation - Clean Version

This is a clean, laconic duplicate of the v2 documentation without animations, transitions, and fancy effects.

## What was removed:

### CSS Changes:
- All `transition` properties and animations
- Box shadows and drop shadows
- Hover effects with transforms (translateY, etc.)
- Gradient backgrounds (replaced with solid colors)
- Fancy border radius (reduced from 8px to 4px)
- Loading states and opacity transitions
- Reduced motion preferences handling

### JavaScript Changes:
- Removed animation-related code from TOC navigation
- Simplified mobile TOC toggle without smooth transitions
- Updated path references to work with v2-clean directory

### Visual Changes:
- Removed hover animations on API section cards
- Removed button hover effects with transforms
- Removed link hover animations
- Simplified note boxes (no gradients)
- Removed shadow effects throughout
- Cleaner, more minimal appearance

## Features Retained:
- All original content and functionality
- Responsive design
- Dark/light theme support
- Navigation and TOC functionality
- Accessibility features (focus styles)
- Print styles

## Usage:
Simply open `index.html` in a web browser to view the clean documentation.

## File Structure:
```
v2-clean/
├── assets/
│   ├── main.css (cleaned version)
│   ├── toc.js (simplified version)
│   └── [other assets]
├── HX/
│   ├── V1/
│   ├── V2/
│   └── [API documentation]
├── HRN/
│   └── [HRN documentation]
├── index.html
├── toc.html
└── README.md
```

This version provides the same information and functionality as v2 but with a cleaner, more minimal appearance suitable for environments where animations and fancy effects are not desired.
