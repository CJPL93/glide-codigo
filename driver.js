(function () {
  function getParam(params, name) {
    for (var i = 0; i < params.length; i++) {
      if (params[i].name === name) return params[i];
    }
    return { value: undefined };
  }

  function run(manifest, params) {
    var args = manifest.params.map(function (p) {
      return getParam(params, p.name);
    });
    return window.function.apply(null, args);
  }

  fetch("glide.json")
    .then(function (r) { return r.json(); })
    .then(function (manifest) {
      window.addEventListener("message", function (event) {
        if (event.data && event.data.params !== undefined) {
          var result = run(manifest, event.data.params);
          event.source.postMessage(
            { result: result, callID: event.data.callID },
            "*"
          );
        } else if (event.data === "getManifest") {
          event.source.postMessage({ manifest: manifest }, "*");
        }
      });
    });
})();
