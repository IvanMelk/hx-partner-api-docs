// SPA Sidebar with Dynamic Content Loading
document.addEventListener('DOMContentLoaded', function() {
  // Check if sidebar already exists, if not load it
  if (!document.querySelector('.sidebar')) {
    loadSidebar();
  }
  
  // Check current URL and load appropriate content
  loadContentFromURL();
  
  // Setup navigation event listeners
  setupNavigation();
  
  // Global navigation prevention for SPA
  setupGlobalNavigationPrevention();
});

// Also check when the page loads to handle direct URL access
window.addEventListener('load', function() {
  // If no sidebar exists after page load, inject it
  if (!document.querySelector('.sidebar')) {
    loadSidebar();
    loadContentFromURL();
    setupNavigation();
    setupGlobalNavigationPrevention();
  }
});

function loadSidebar() {
  const sidebarHTML = `
    <div class="sidebar">
      <div class="sidebar-header">
        <svg width="100%" viewBox="0 0 156 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M47.2293 26.5938V38.9502H44.808V26.5938H47.2293ZM46.4216 26.5938H52.6148V28.7304H46.4216V26.5938ZM46.4216 31.3415H52.2639V33.4413H46.4216V31.3415ZM46.4216 36.8136H52.6148V38.9502H46.4216V36.8136Z"  fill="#FFFFFF"></path><path d="M64.7031 26.5938L60.9313 32.5771L64.9663 38.9502H61.8962L59.4584 34.5188L56.9329 38.9502H53.8628L58.0038 32.5771L54.3014 26.5938H57.3715L59.4767 30.4772L61.6349 26.5938H64.7031Z"  fill="#FFFFFF"></path><path d="M68.9136 26.5938V38.9502H66.4045V26.5938H68.9136ZM67.9304 26.5938H70.3682C71.3386 26.5938 72.1664 26.7519 72.8499 27.07C73.5334 27.3881 74.0578 27.8405 74.4197 28.4289C74.7815 29.0173 74.9642 29.7178 74.9642 30.5287C74.9642 31.3286 74.7833 32.0255 74.4197 32.6212C74.0578 33.2151 73.5334 33.6711 72.8499 33.9892C72.1664 34.3073 71.3386 34.4655 70.3682 34.4655H67.9304V32.3289H70.3682C71.0353 32.3289 71.5616 32.1762 71.9472 31.8692C72.3327 31.5639 72.5264 31.1171 72.5264 30.5269C72.5264 29.9275 72.3327 29.477 71.9472 29.1772C71.5616 28.8775 71.0353 28.7268 70.3682 28.7268H67.9304V26.5938Z"  fill="#FFFFFF"></path><path d="M79.3336 26.5938V38.9502H76.9123V26.5938H79.3336ZM78.5259 26.5938H84.7191V28.7304H78.5259V26.5938ZM78.5259 31.3415H84.3682V33.4413H78.5259V31.3415ZM78.5259 36.8136H84.7191V38.9502H78.5259V36.8136Z"  fill="#FFFFFF"></path><path d="M89.7537 26.5938V38.9502H87.1917V26.5938H89.7537ZM88.8071 38.9502V36.6554H91.2814C91.8187 36.6554 92.3286 36.5819 92.8074 36.4348C93.2861 36.2877 93.7083 36.056 94.0701 35.7379C94.4319 35.4198 94.717 35.0171 94.9217 34.528C95.1264 34.0389 95.2287 33.4542 95.2287 32.772C95.2287 32.0898 95.1264 31.5033 94.9217 31.016C94.717 30.5269 94.4338 30.1242 94.0701 29.8061C93.7083 29.488 93.2861 29.2563 92.8074 29.1092C92.3286 28.9621 91.8187 28.8886 91.2814 28.8886H88.8071V26.5938H91.3692C92.6557 26.5938 93.7814 26.8476 94.7463 27.3532C95.7111 27.8589 96.4622 28.5741 97.0013 29.4972C97.5386 30.4221 97.809 31.5125 97.809 32.772C97.809 34.0315 97.5404 35.1237 97.0013 36.0468C96.4641 36.9698 95.7111 37.6851 94.7463 38.1908C93.7814 38.6964 92.6557 38.9502 91.3692 38.9502H88.8071Z"  fill="#FFFFFF"></path><path d="M102.297 26.5938V38.9502H99.7533V26.5938H102.297Z"  fill="#FFFFFF"></path><path d="M103.719 26.5938H112.841V28.8702H109.526V38.9502H107.017V28.8702H103.719V26.5938Z"  fill="#FFFFFF"></path><path d="M116.805 26.5938V38.9502H114.261V26.5938H116.805Z"  fill="#FFFFFF"></path><path d="M119.243 30.1849C119.57 29.4016 120.027 28.7231 120.612 28.1457C121.196 27.5683 121.884 27.1252 122.673 26.8126C123.462 26.5019 124.32 26.3456 125.242 26.3456C126.178 26.3456 127.037 26.5019 127.821 26.8126C128.605 27.1252 129.292 27.5683 129.882 28.1457C130.473 28.7231 130.929 29.4016 131.251 30.1849C131.573 30.9682 131.733 31.8287 131.733 32.7702C131.733 33.7006 131.573 34.5611 131.251 35.3554C130.929 36.1498 130.48 36.8411 129.901 37.4295C129.321 38.0179 128.638 38.4739 127.848 38.7976C127.059 39.1212 126.191 39.283 125.242 39.283C124.296 39.283 123.426 39.1212 122.636 38.7976C121.847 38.4739 121.16 38.0179 120.575 37.4295C119.99 36.8411 119.541 36.1498 119.225 35.3554C118.908 34.5611 118.751 33.6987 118.751 32.7702C118.753 31.8306 118.916 30.9682 119.243 30.1849ZM121.893 34.8718C122.22 35.4841 122.671 35.9659 123.243 36.3189C123.815 36.672 124.482 36.8485 125.242 36.8485C126.003 36.8485 126.67 36.672 127.242 36.3189C127.814 35.9659 128.261 35.4841 128.583 34.8718C128.905 34.2595 129.065 33.559 129.065 32.772C129.065 31.9832 128.908 31.2844 128.592 30.6721C128.276 30.0598 127.832 29.5781 127.258 29.2251C126.684 28.872 126.012 28.6955 125.241 28.6955C124.48 28.6955 123.813 28.872 123.241 29.2251C122.668 29.5781 122.218 30.0598 121.891 30.6721C121.564 31.2844 121.399 31.985 121.399 32.772C121.401 33.5608 121.566 34.2595 121.893 34.8718Z"  fill="#FFFFFF"></path><path d="M144.84 26.5938V39.568L136.103 31.29V38.9502H133.681V25.976L142.418 34.254V26.5938H144.84Z"  fill="#FFFFFF"></path><path d="M149.427 36.0027C149.737 36.3447 150.079 36.6095 150.454 36.797C150.828 36.9846 151.232 37.0802 151.664 37.0802C152.166 37.0802 152.575 36.9515 152.892 36.6922C153.208 36.4329 153.365 36.0799 153.365 35.6331C153.365 35.2451 153.268 34.9325 153.076 34.6972C152.882 34.4618 152.597 34.254 152.217 34.0701C151.837 33.8881 151.373 33.6914 150.823 33.4781C150.53 33.3714 150.194 33.228 149.814 33.046C149.434 32.8639 149.074 32.6286 148.736 32.3399C148.396 32.0512 148.116 31.6982 147.894 31.2808C147.671 30.8634 147.561 30.3596 147.561 29.7712C147.561 29.0651 147.738 28.4565 148.096 27.9435C148.453 27.4323 148.939 27.037 149.553 26.7611C150.167 26.4853 150.854 26.3456 151.614 26.3456C152.398 26.3456 153.072 26.478 153.641 26.7428C154.207 27.0075 154.682 27.3422 155.063 27.7485C155.443 28.1549 155.739 28.576 155.949 29.0099L153.984 30.104C153.82 29.8098 153.624 29.5432 153.396 29.3004C153.167 29.0596 152.908 28.8647 152.616 28.7176C152.323 28.5705 151.991 28.4969 151.616 28.4969C151.124 28.4969 150.757 28.6109 150.51 28.8408C150.264 29.0706 150.141 29.3372 150.141 29.6443C150.141 29.9514 150.24 30.218 150.439 30.4478C150.638 30.6777 150.942 30.8946 151.351 31.1006C151.76 31.3065 152.274 31.5161 152.895 31.7276C153.294 31.8692 153.675 32.0457 154.045 32.2571C154.414 32.4686 154.746 32.7242 155.044 33.0257C155.342 33.3273 155.576 33.6785 155.746 34.0849C155.916 34.4912 156 34.9583 156 35.4878C156 36.0873 155.883 36.6242 155.649 37.0949C155.415 37.5656 155.094 37.9628 154.684 38.2864C154.275 38.61 153.816 38.8582 153.306 39.0274C152.798 39.1984 152.263 39.283 151.702 39.283C150.953 39.283 150.255 39.1377 149.606 38.8509C148.957 38.5622 148.392 38.1706 147.914 37.6778C147.435 37.1831 147.06 36.6481 146.792 36.0707L148.581 34.8001C148.833 35.2598 149.116 35.6607 149.427 36.0027Z"  fill="#FFFFFF"></path><path d="M47.0776 13.5792V25.1633H44.7257V13.5792H47.0776ZM45.4987 17.9315H53.9524V20.0663H45.4987V17.9315ZM54.8077 13.5792V25.1633H52.4558V13.5792H54.8077Z"  fill="#FFFFFF"></path><path d="M59.559 13.5792V21.2082C59.559 21.8701 59.7326 22.4034 60.078 22.8042C60.4234 23.2069 60.9351 23.4092 61.6149 23.4092C62.2947 23.4092 62.8082 23.2087 63.1536 22.8042C63.4989 22.4015 63.6707 21.8701 63.6707 21.2082V13.5792H66.0226V21.3571C66.0226 22.0411 65.913 22.6424 65.6937 23.1609C65.4744 23.6794 65.1637 24.1152 64.7654 24.4683C64.3651 24.8213 63.8955 25.0898 63.3582 25.27C62.821 25.452 62.2398 25.5421 61.6149 25.5421C60.9789 25.5421 60.3923 25.452 59.855 25.27C59.3178 25.0879 58.8518 24.8213 58.4571 24.4683C58.0623 24.1152 57.7553 23.6794 57.536 23.1609C57.3167 22.6424 57.2071 22.0411 57.2071 21.3571V13.5792H59.559Z"  fill="#FFFFFF"></path><path d="M70.7758 13.5792V25.1633H68.4239V13.5792H70.7758ZM69.8548 13.5792H72.2889C73.199 13.5792 73.972 13.7337 74.6079 14.0426C75.2439 14.3515 75.7318 14.7818 76.0717 15.3334C76.4116 15.885 76.5816 16.5304 76.5816 17.2696C76.5816 17.9977 76.4116 18.6413 76.0717 19.1984C75.7318 19.7556 75.2439 20.1895 74.6079 20.4966C73.972 20.8055 73.199 20.9599 72.2889 20.9599H69.8548V19.0734H72.1409C72.5576 19.0734 72.9157 19.0054 73.2191 18.8675C73.5206 18.7295 73.7527 18.531 73.919 18.2717C74.0835 18.0124 74.1657 17.7017 74.1657 17.3376C74.1657 16.9735 74.0835 16.6628 73.919 16.4035C73.7545 16.1443 73.5206 15.9457 73.2191 15.8078C72.9175 15.6699 72.5576 15.6018 72.1409 15.6018H69.8548V13.5792ZM73.5224 19.7684L77.2723 25.1633H74.4928L71.0389 19.7684H73.5224Z"  fill="#FFFFFF"></path><path d="M77.4696 13.5792H86.022V15.714H82.9135V25.1633H80.5616V15.714H77.4696V13.5792Z"  fill="#FFFFFF"></path><path d="M89.7391 13.5792V25.1633H87.3543V13.5792H89.7391Z"  fill="#FFFFFF"></path><path d="M97.8145 18.974H103.489C103.522 19.8566 103.419 20.6896 103.183 21.4729C102.948 22.2562 102.58 22.9494 102.082 23.5488C101.583 24.1501 100.965 24.6227 100.232 24.9628C99.4975 25.3048 98.6587 25.4758 97.7158 25.4758C96.8276 25.4758 96.0071 25.3269 95.2561 25.029C94.505 24.7312 93.8526 24.3119 93.2989 23.7713C92.7452 23.2307 92.3175 22.5853 92.016 21.8351C91.7145 21.0849 91.5646 20.263 91.5646 19.3694C91.5646 18.4757 91.72 17.6575 92.0325 16.911C92.345 16.1663 92.7817 15.5301 93.3409 15.0005C93.9001 14.471 94.558 14.0628 95.3145 13.7759C96.0711 13.4891 96.8934 13.3456 97.7816 13.3456C98.571 13.3456 99.2801 13.456 99.9124 13.6766C100.543 13.8973 101.102 14.2043 101.59 14.596C102.078 14.9876 102.496 15.4547 102.849 15.9934L100.843 17.1684C100.557 16.6609 100.159 16.2509 99.6492 15.9364C99.1394 15.622 98.5162 15.4639 97.7834 15.4639C97.0926 15.4639 96.4622 15.622 95.892 15.9364C95.3218 16.2509 94.8686 16.7014 94.536 17.2842C94.2016 17.869 94.0335 18.564 94.0335 19.3694C94.0335 20.1637 94.198 20.8624 94.5269 21.4619C94.8558 22.0631 95.3017 22.5302 95.8664 22.8611C96.4311 23.1921 97.0689 23.3576 97.7816 23.3576C98.253 23.3576 98.6752 23.2951 99.048 23.1664C99.4208 23.0395 99.7406 22.8611 100.009 22.6295C100.278 22.3978 100.504 22.133 100.693 21.8351C100.879 21.5373 101.022 21.2118 101.12 20.8588H97.8145V18.974Z"  fill="#FFFFFF"></path><path d="M107.765 13.5792V25.1633H105.413V13.5792H107.765ZM106.844 13.5792H109.278C110.188 13.5792 110.961 13.7337 111.597 14.0426C112.233 14.3515 112.721 14.7818 113.061 15.3334C113.401 15.885 113.571 16.5304 113.571 17.2696C113.571 17.9977 113.401 18.6413 113.061 19.1984C112.721 19.7556 112.233 20.1895 111.597 20.4966C110.961 20.8055 110.188 20.9599 109.278 20.9599H106.844V19.0734H109.13C109.547 19.0734 109.905 19.0054 110.208 18.8675C110.51 18.7295 110.742 18.531 110.908 18.2717C111.073 18.0124 111.155 17.7017 111.155 17.3376C111.155 16.9735 111.073 16.6628 110.908 16.4035C110.744 16.1443 110.51 15.9457 110.208 15.8078C109.907 15.6699 109.547 15.6018 109.13 15.6018H106.844V13.5792ZM110.512 19.7684L114.261 25.1633H111.482L108.028 19.7684H110.512Z"  fill="#FFFFFF"></path><path d="M117.88 13.5792V21.2082C117.88 21.8701 118.053 22.4034 118.397 22.8042C118.742 23.2069 119.254 23.4092 119.936 23.4092C120.615 23.4092 121.129 23.2087 121.474 22.8042C121.82 22.4015 121.991 21.8701 121.991 21.2082V13.5792H124.343V21.3571C124.343 22.0411 124.234 22.6424 124.014 23.1609C123.795 23.6794 123.484 24.1152 123.086 24.4683C122.686 24.8213 122.216 25.0898 121.679 25.27C121.142 25.452 120.561 25.5421 119.936 25.5421C119.3 25.5421 118.713 25.452 118.176 25.27C117.639 25.0879 117.173 24.8213 116.778 24.4683C116.383 24.1152 116.076 23.6794 115.857 23.1609C115.637 22.6424 115.528 22.0411 115.528 21.3571V13.5792H117.88Z"  fill="#FFFFFF"></path><path d="M125.593 13.5792H134.146V15.714H131.037V25.1633H128.685V15.714H125.593V13.5792Z"  fill="#FFFFFF"></path><path d="M137.748 13.5792V25.1633H135.478V13.5792H137.748ZM136.991 13.5792H142.797V15.5816H136.991V13.5792ZM136.991 18.0308H142.468V20.0001H136.991V18.0308ZM136.991 23.1609H142.797V25.1633H136.991V23.1609Z"  fill="#FFFFFF"></path><path d="M155.576 13.5792V25.7425L147.386 17.9812V25.1633H145.116V13L153.306 20.7613V13.5792H155.576Z"  fill="#FFFFFF"></path><path d="M34.6152 43.1255L28.6711 23.4908L32.6848 12.1909C33.1825 10.8187 34.0288 10.6836 35.4012 10.5894V10.0452H28.8239V10.5894C30.1457 10.5423 31.2126 11.0133 31.2126 12.4735C31.2126 12.662 31.2003 12.9099 30.9083 13.8866L28.2596 22.1037L25.1478 10.5906H27.9381V10.0465H18.6234V0.933206H21.4174V0.389038H11.1505V0.933206H13.9457V25.7989H8.0275V10.5894H10.8289V10.0452H0.555786V10.5894H3.34982V43.1255H0.555786V43.6696H10.8203V43.1255H8.02626V26.6455H13.9445V53.068H11.1505V53.6122H21.4174V53.068H18.6234V43.6696H26.3514V43.1255C25.8339 43.1094 25.2106 42.9879 24.5983 42.8503C23.5462 42.6135 22.9956 42.1673 22.743 41.6405C22.605 41.3517 22.5558 41.0381 22.5631 40.722C22.5866 39.713 23.3085 37.9627 23.3085 37.9627L26.0791 30.2563L29.8858 43.1255H27.0918V43.6696H37.4117V43.1255H34.6152ZM20.0438 42.347C19.6706 42.6891 19.2135 42.9445 18.6234 43.0598V10.5894H20.2323L25.6689 28.718L21.6355 39.3076C21.6355 39.3076 21.33 40.179 20.9924 40.9314C20.8249 41.3046 20.4109 42.0111 20.0438 42.347Z"  fill="#FFFFFF"></path></svg>
       
      </div>
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="#" data-page="home" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a href="#" data-page="/HX/V1/index.html" class="nav-link">V1 API</a>
          </li>
          <li class="nav-item">
            <a href="#" data-page="/HX/V2/index.html" class="nav-link">V2 API</a>
            <ul class="nav-submenu">
              <li class="nav-item">
                <a href="#" data-page="/HX/V2/inventory-api/index.html" class="nav-link">Inventory API</a>
                <ul class="nav-submenu">
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/inventory-api/endpoints/ships.html" class="nav-link">Ships</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/inventory-api/endpoints/voyages.html" class="nav-link">Voyages</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/inventory-api/endpoints/package.html" class="nav-link">Package</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/inventory-api/endpoints/ports.html" class="nav-link">Ports</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/inventory-api/endpoints/excursions.html" class="nav-link">Excursions</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/inventory-api/endpoints/refdata.html" class="nav-link">Reference Data</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a href="#" data-page="/HX/V2/booking-api/index.html" class="nav-link">Booking API</a>
                <ul class="nav-submenu">
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/search-package.html" class="nav-link">Search Package</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/create-quote.html" class="nav-link">Create Quote</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/get-quote.html" class="nav-link">Get Quote</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/commit-quote.html" class="nav-link">Commit Quote</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/get-booking.html" class="nav-link">Get Booking</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/search-extras.html" class="nav-link">Search Extras</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/add-extras.html" class="nav-link">Add Extras</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/remove-extras.html" class="nav-link">Remove Extras</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/search-supplemental-packages.html" class="nav-link">Search Supplemental Packages</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/add-supplemental-package.html" class="nav-link">Add Supplemental Package</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/delete-supplemental-package.html" class="nav-link">Delete Supplemental Package</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/delete-supplemental-package-passenger.html" class="nav-link">Delete Supplemental Package Passenger</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" data-page="/HX/V2/booking-api/endpoints/delete-quote.html" class="nav-link">Delete Quote</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">Generated Models</a>
                <ul class="nav-submenu">
                      <li class="nav-item">
                        <a href="#" class="nav-link">BookingApi</a>
                        <ul class="nav-submenu">
                          <li class="nav-item">
                            <a href="#" class="nav-link">Bookings</a>
                            <ul class="nav-submenu">
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Bookings.Booking.html" class="nav-link">Booking</a>
                              </li>
                            </ul>
                          </li>
                          <li class="nav-item">
                            <a href="#" class="nav-link">Quote</a>
                            <ul class="nav-submenu">
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.AddSupplementalPackageRequest.html" class="nav-link">AddSupplementalPackageRequest</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.CommitQuoteRequest.html" class="nav-link">CommitQuoteRequest</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.CommitQuoteResponse.html" class="nav-link">CommitQuoteResponse</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.CreateQuoteRequest.html" class="nav-link">CreateQuoteRequest</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.CreateQuoteRequest.Cabin.html" class="nav-link">CreateQuoteRequest.Cabin</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.CreateQuoteRequest.Passenger.html" class="nav-link">CreateQuoteRequest.Passenger</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.QuoteResponse.html" class="nav-link">QuoteResponse</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.QuoteResponse.Package.html" class="nav-link">QuoteResponse.Package</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.QuoteResponse.Passenger.html" class="nav-link">QuoteResponse.Passenger</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.QuoteResponse.PaymentInformation.html" class="nav-link">QuoteResponse.PaymentInformation</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.QuoteResponse.Supplemental.html" class="nav-link">QuoteResponse.Supplemental</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.QuoteResponse.SupplementalPackage.html" class="nav-link">QuoteResponse.SupplementalPackage</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.QuoteResponse.Voyage.html" class="nav-link">QuoteResponse.Voyage</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Quote.SelectableRoute.html" class="nav-link">SelectableRoute</a>
                              </li>
                            </ul>
                          </li>
                          <li class="nav-item">
                            <a href="#" class="nav-link">Search</a>
                            <ul class="nav-submenu">
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Search.ExtraAddonResult.html" class="nav-link">ExtraAddonResult</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Search.ExtraMealResult.html" class="nav-link">ExtraMealResult</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Search.ExtraSearchResult.html" class="nav-link">ExtraSearchResult</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Search.FlightStage.html" class="nav-link">FlightStage</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Search.ItineraryStage.html" class="nav-link">ItineraryStage</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Search.PackageSearchResult.html" class="nav-link">PackageSearchResult</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Search.PackageSearchResult.Cabin.html" class="nav-link">PackageSearchResult.Cabin</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Search.PackageSearchResult.Departure.html" class="nav-link">PackageSearchResult.Departure</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Search.PackageSearchResult.Passenger.html" class="nav-link">PackageSearchResult.Passenger</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Search.SelectableRoute.html" class="nav-link">SelectableRoute</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Search.SupplementalPackageResult.html" class="nav-link">SupplementalPackageResult</a>
                              </li>
                            </ul>
                          </li>
                          <li class="nav-item">
                            <a href="#" class="nav-link">Supplementals</a>
                            <ul class="nav-submenu">
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Supplementals.ExtraAddon.html" class="nav-link">ExtraAddon</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Supplementals.ExtraExcursion.html" class="nav-link">ExtraExcursion</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Supplementals.ExtraMeal.html" class="nav-link">ExtraMeal</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Supplementals.IncludedAddon.html" class="nav-link">IncludedAddon</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Supplementals.IncludedExcursion.html" class="nav-link">IncludedExcursion</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Supplementals.IncludedMeal.html" class="nav-link">IncludedMeal</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Supplementals.ManageExtrasRequest.html" class="nav-link">ManageExtrasRequest</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Supplementals.ManageExtrasRequest.AddonSelection.html" class="nav-link">ManageExtrasRequest.AddonSelection</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Supplementals.ManageExtrasRequest.ExcursionSelection.html" class="nav-link">ManageExtrasRequest.ExcursionSelection</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Supplementals.ManageExtrasRequest.MealSelection.html" class="nav-link">ManageExtrasRequest.MealSelection</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Supplementals.MealDetail.html" class="nav-link">MealDetail</a>
                              </li>
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.BookingApi.Supplementals.PassengerPrice.html" class="nav-link">PassengerPrice</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li class="nav-item">
                        <a href="#" class="nav-link">Legacy</a>
                        <ul class="nav-submenu">
                          <li class="nav-item">
                            <a href="#" class="nav-link">Refdata</a>
                            <ul class="nav-submenu">
                              <li class="nav-item">
                                <a href="#" data-page="/HX/V2/_generated/Partner.Public.Legacy.Refdata.Excursion.Image.html" class="nav-link">Excursion.Image</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  `;
  
  const body = document.body;
  body.insertBefore(document.createRange().createContextualFragment(sidebarHTML), body.firstChild);
}

function loadHomeContent() {
  const contentDiv = document.getElementById('content');
  contentDiv.innerHTML = `
    <article>
      <h1>HX Partner API Documentation</h1>

      <p>Welcome to the Hurtigruten Expeditions Partner API documentation. This site provides comprehensive information on how to integrate with Hurtigruten Expeditions' expedition services.</p>

      <h2>Overview</h2>
      <p>Hurtigruten Expeditions offers the Expeditions API to provide access to expedition cruises:</p>
      <ul>
        <li><strong>Hurtigruten Expeditions (HX) API</strong>: Access to expedition cruises, including booking, availability, pricing, and detailed content about ships, cabins, excursions, and ports.</li>
      </ul>

      <h2>Getting Started</h2>
      <p>To start using the Hurtigruten Expeditions APIs, follow these steps:</p>
      <ol>
        <li><strong>Contact us for credentials</strong>: Reach out to our support team via the <a href="https://hurtigruten.atlassian.net/servicedesk/customer/portal/13/group/159">support portal</a> to get your API credentials.</li>
        <li><strong>Authenticate with Auth0</strong>: Use your credentials to obtain a bearer token from Auth0.</li>
        <li><strong>Make API Requests</strong>: Use the bearer token to authenticate your requests to the Hurtigruten Expeditions APIs.</li>
      </ol>

      <div>
        <h5>Note</h5>
        <p>Agencies integrating through a tech partner should contact their tech partner to initiate the signup process on their behalf.</p>
      </div>

      <h2>API Sections</h2>

      <div>
        <h3>Hurtigruten Expeditions (HX) API</h3>
        <p>The HX API provides access to Hurtigruten Expeditions' expedition services. You can use this API to check availability, book cruises, and retrieve detailed information about expedition ships, cabins, excursions, and ports.</p>
        <ul>
          <li><strong>V1 API</strong>: Stable, production-ready version of the API</li>
          <li><strong>V2 API</strong>: Next generation API with enhanced features (currently in preview)</li>
        </ul>
      </div>

      <h2>Authentication</h2>
      <p>Authentication may work differently depending on which API you're using. Please refer to the Getting Started page for each specific API for detailed instructions on how to authenticate.</p>
      <p>All API requests require authentication via a bearer token from Auth0.</p>

      <div>
        <h5>Note</h5>
        <p>API credentials are specific to the HX API. Please ensure you have the correct credentials for accessing the expedition services.</p>
      </div>

      <h2>Support</h2>
      <p>If you have any questions or need assistance, please contact our support team via the <a href="https://hurtigruten.atlassian.net/servicedesk/customer/portal/13/group/159">support portal</a>.</p>
    </article>
  `;
}

function setupNavigation() {
  // Add click handlers for submenu toggles
  const submenus = document.querySelectorAll('.nav-submenu');
  submenus.forEach(submenu => {
    const parentLink = submenu.previousElementSibling;
    if (parentLink && parentLink.classList.contains('nav-link')) {
      parentLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Toggle the submenu state
        const wasExpanded = submenu.classList.contains('expanded');
        
        if (wasExpanded) {
          submenu.classList.remove('expanded');
          parentLink.classList.remove('expanded');
        } else {
          submenu.classList.add('expanded');
          parentLink.classList.add('expanded');
        }
      });
    }
  });
  
  // Add click handlers for navigation links
  const navLinks = document.querySelectorAll('.nav-link[data-page]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('=== NAVIGATION CLICK DEBUG ===');
      console.log('Link clicked:', link.textContent);
      console.log('Data-page:', link.getAttribute('data-page'));
      console.log('Current URL before click:', window.location.href);
      console.log('Event type:', e.type);
      console.log('Event target:', e.target);
      console.log('Event currentTarget:', e.currentTarget);
      
      // Prevent default behavior and stop propagation
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      const page = link.getAttribute('data-page');
      console.log('About to load page:', page);
      
      // Update active state
      setActiveLink(page);
      
      // Load the content
      if (page === 'home') {
        console.log('Loading home content');
        loadHomeContent();
      } else {
        console.log('Loading page content:', page);
        loadContent(page);
      }
      
      // Expand parent submenus for active link
      let parent = link.closest('.nav-submenu');
      while (parent) {
        parent.classList.add('expanded');
        const parentLink = parent.previousElementSibling;
        if (parentLink && parentLink.classList.contains('nav-link')) {
          parentLink.classList.add('expanded');
        }
        parent = parent.parentElement.closest('.nav-submenu');
      }
      
      console.log('URL after click:', window.location.href);
      console.log('=== END NAVIGATION DEBUG ===');
      
      // Return false to ensure no navigation happens
      return false;
    });
  });
}

async function loadContent(pagePath) {
  const contentDiv = document.getElementById('content');
  
  try {
    // Show loading state
    contentDiv.innerHTML = '<div class="loading">Loading content...</div>';
    
    // Detect if we're running on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    // Fix path based on environment
    let fetchPath = pagePath;
    if (isGitHubPages && pagePath.startsWith('/')) {
      // On GitHub Pages, convert absolute paths to relative paths
      fetchPath = pagePath.substring(1);
    }
    
    console.log(`Loading content: original=${pagePath}, fetch=${fetchPath}, isGitHubPages=${isGitHubPages}, hostname=${window.location.hostname}, pathname=${window.location.pathname}`);
    
    // Fetch the content
    const response = await fetch(fetchPath);
    if (!response.ok) {
      // If the first attempt fails on GitHub Pages, try alternative path formats
      if (isGitHubPages) {
        console.log(`First attempt failed (${response.status}), trying alternative paths...`);
        console.log(`Current URL: ${window.location.href}`);
        console.log(`Repository path: ${window.location.pathname}`);
        
        // Try with repository name prefix
        const altPath = `hx-partner-api-docs${pagePath}`;
        console.log(`Trying alternative path: ${altPath}`);
        
        try {
          const altResponse = await fetch(altPath);
          console.log(`Alternative response status: ${altResponse.status}`);
          
          if (altResponse.ok) {
            console.log(`Alternative path succeeded: ${altPath}`);
            // Use the alternative response
            const html = await altResponse.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            let content = doc.querySelector('main') || 
                          doc.querySelector('article') || 
                          doc.querySelector('.content') ||
                          doc.querySelector('#content') ||
                          doc.body;
            
            if (content) {
              if (content.id === 'content') {
                // Content is already properly positioned, just update title
                const title = doc.querySelector('title');
                if (title) {
                  document.title = title.textContent;
                }
                // Don't update URL - stay in SPA mode
              } else {
                // Clean up the content and inject it
                contentDiv.innerHTML = content.innerHTML;
                
                // Fix relative paths in the loaded content for CSS and JS files
                const links = contentDiv.querySelectorAll('link[rel="stylesheet"]');
                const scripts = contentDiv.querySelectorAll('script[src]');
                
                links.forEach(link => {
                  const href = link.getAttribute('href');
                  if (href && href.startsWith('../../')) {
                    const newHref = href.replace(/^\.\.\/\.\.\/\.\.\/\.\.\//, '');
                    link.setAttribute('href', newHref);
                  }
                });
                
                scripts.forEach(script => {
                  const src = script.getAttribute('src');
                  if (src && src.startsWith('../../')) {
                    const newSrc = src.replace(/^\.\.\/\.\.\/\.\.\/\.\.\//, '');
                    script.setAttribute('src', newSrc);
                  }
                });
                
                // Update page title
                const title = doc.querySelector('title');
                if (title) {
                  document.title = title.textContent;
                }
                
                // Don't update URL - stay in SPA mode
              }
              return; // Exit early since we succeeded
            }
          } else {
            console.log(`Alternative path also failed: ${altPath} (${altResponse.status})`);
            
            // Try one more approach - check if we need to handle the path differently
            const currentPathParts = window.location.pathname.split('/');
            console.log(`Current path parts:`, currentPathParts);
            
            if (currentPathParts.length > 2 && currentPathParts[1] === 'hx-partner-api-docs') {
              // We're already in the repository context, try relative path
              const relativePath = pagePath.substring(1); // Remove leading slash
              console.log(`Trying relative path: ${relativePath}`);
              
              const relativeResponse = await fetch(relativePath);
              if (relativeResponse.ok) {
                console.log(`Relative path succeeded: ${relativePath}`);
                const html = await relativeResponse.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                let content = doc.querySelector('main') || 
                              doc.querySelector('article') || 
                              doc.querySelector('.content') ||
                              doc.querySelector('#content') ||
                              doc.body;
                
                if (content) {
                  if (content.id === 'content') {
                    const title = doc.querySelector('title');
                    if (title) {
                      document.title = title.textContent;
                    }
                    history.pushState({page: pagePath}, '', pagePath);
                  } else {
                    contentDiv.innerHTML = content.innerHTML;
                    
                    // Fix relative paths
                    const links = contentDiv.querySelectorAll('link[rel="stylesheet"]');
                    const scripts = contentDiv.querySelectorAll('script[src]');
                    
                    links.forEach(link => {
                      const href = link.getAttribute('href');
                      if (href && href.startsWith('../../')) {
                        const newHref = href.replace(/^\.\.\/\.\.\/\.\.\/\.\.\//, '');
                        link.setAttribute('href', newHref);
                      }
                    });
                    
                    scripts.forEach(script => {
                      const src = script.getAttribute('src');
                      if (src && src.startsWith('../../')) {
                        const newSrc = src.replace(/^\.\.\/\.\.\/\.\.\/\.\.\//, '');
                        script.setAttribute('src', newSrc);
                      }
                    });
                    
                    const title = doc.querySelector('title');
                    if (title) {
                      document.title = title.textContent;
                    }
                    
                    history.pushState({page: pagePath}, '', pagePath);
                  }
                  return; // Exit early since we succeeded
                }
              } else {
                console.log(`Relative path also failed: ${relativePath} (${relativeResponse.status})`);
              }
            }
          }
        } catch (error) {
          console.error('Error trying alternative paths:', error);
        }
      }
      
      // If we get here, all attempts failed
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Extract the main content from the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Find the main content (main, article, .content, or #content)
    let content = doc.querySelector('main') || 
                  doc.querySelector('article') || 
                  doc.querySelector('.content') ||
                  doc.querySelector('#content') ||
                  doc.body;
    
    if (content) {
      // If the content is already in #content, don't double-wrap it
      if (content.id === 'content') {
        // Content is already properly positioned, just update title
        const title = doc.querySelector('title');
        if (title) {
          document.title = title.textContent;
        }
        // Don't update URL - stay in SPA mode
      } else {
        // Clean up the content and inject it
        contentDiv.innerHTML = content.innerHTML;
        
        // Fix relative paths in the loaded content for CSS and JS files
        // This ensures that when content is loaded via SPA, relative paths still work
        const links = contentDiv.querySelectorAll('link[rel="stylesheet"]');
        const scripts = contentDiv.querySelectorAll('script[src]');
        
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('../../')) {
            // Convert relative paths to absolute paths from root
            const newHref = href.replace(/^\.\.\/\.\.\/\.\.\/\.\.\//, '');
            link.setAttribute('href', newHref);
          }
        });
        
        scripts.forEach(script => {
          const src = script.getAttribute('src');
          if (src && src.startsWith('../../')) {
            // Convert relative paths to absolute paths from root
            const newSrc = src.replace(/^\.\.\/\.\.\/\.\.\/\.\.\//, '');
            script.setAttribute('src', newSrc);
          }
        });
        
        // Update page title
        const title = doc.querySelector('title');
        if (title) {
          document.title = title.textContent;
        }
        
        // Don't update URL - stay in SPA mode
      }
    } else {
      throw new Error('No content found in the page');
    }
    
  } catch (error) {
    console.error('Error loading content:', error);
    contentDiv.innerHTML = `
      <div class="error">
        <h2>Error Loading Content</h2>
        <p>Could not load the requested page: ${pagePath}</p>
        <p>Error: ${error.message}</p>
        <button onclick="loadHomeContent()">Return to Home</button>
      </div>
    `;
    
    // If this was a page refresh, try to load home content as fallback
    if (pagePath === window.location.pathname) {
      console.log('Page refresh detected, falling back to home content');
      loadHomeContent();
      setActiveLink('home');
    }
  }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
  if (event.state && event.state.page) {
    if (event.state.page === 'home') {
      loadHomeContent();
    } else {
      loadContent(event.state.page);
    }
  }
});

// Function to load content based on current URL
function loadContentFromURL() {
  const currentPath = window.location.pathname;
  
  // If we're at the root, load home content
  if (currentPath === '/' || currentPath === '/index.html') {
    loadHomeContent();
    setActiveLink('home');
    return;
  }
  
  // Detect if we're running on GitHub Pages
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  // For GitHub Pages, remove the repository name prefix from the path
  // This handles cases where the URL is like /hx-partner-api-docs/HX/V2/...
  let normalizedPath = currentPath;
  if (isGitHubPages && currentPath.includes('/hx-partner-api-docs/')) {
    normalizedPath = '/' + currentPath.split('/hx-partner-api-docs/')[1];
  }
  
  console.log(`loadContentFromURL: currentPath=${currentPath}, normalizedPath=${normalizedPath}, isGitHubPages=${isGitHubPages}`);
  
  // Try to find a matching navigation link using the normalized path
  const matchingLink = document.querySelector(`.nav-link[data-page="${normalizedPath}"]`);
  if (matchingLink) {
    // Load the content for this page using the normalized path
    loadContent(normalizedPath);
    
    // Set this link as active
    setActiveLink(normalizedPath);
    
    // Expand parent submenus for this link
    let parent = matchingLink.closest('.nav-submenu');
    while (parent) {
      parent.classList.add('expanded');
      const parentLink = parent.previousElementSibling;
      if (parentLink && parentLink.classList.contains('nav-link')) {
        parentLink.classList.add('expanded');
      }
      parent = parent.parentElement.closest('.nav-submenu');
    }
  } else {
    // No matching link found, load home content
    loadHomeContent();
    setActiveLink('home');
  }
}

// Function to set the active link
function setActiveLink(pagePath) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-page="${pagePath}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

// Set initial active state for home page
document.addEventListener('DOMContentLoaded', function() {
  const homeLink = document.querySelector('.nav-link[data-page="home"]');
  if (homeLink) {
    homeLink.classList.add('active');
  }
});

// Function to prevent any unwanted navigation in the SPA
function setupGlobalNavigationPrevention() {
  // Prevent any clicks on links with data-page from navigating
  document.addEventListener('click', function(e) {
    const target = e.target.closest('.nav-link[data-page]');
    if (target) {
      console.log('Global click prevention caught:', target.getAttribute('data-page'));
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.returnValue = false;
      return false;
    }
  }, { passive: false, capture: true });
  
  // Prevent any form submissions or other navigation
  document.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, { passive: false, capture: true });
}
