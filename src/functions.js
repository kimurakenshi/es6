'use strict';
(function () {
  function makeRequest(url, timeout = 2000) {
    console.log("URL: " + url + " Timeout: " + timeout );
  }

  makeRequest("someUrl");
  makeRequest("someUrl", 300);
})();