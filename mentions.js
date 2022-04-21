function initialize() {
    function script() {
        if (!document.getElementsByClassName("page_name")[0]) { return; }
        if (document.getElementById("mentions-link")) { return; }
        
        var regex = /id=([0-9]+)/;

        var link = document.querySelector(".page_counter")
        var id;

        var match = link.href.match(regex);
        if (match) {
            id = match[1];
        } else {
            regex = 
            id = link.attributes.onclick.value.match(/event, ([0-9]+)/)[1];
        }

        var small = document.createElement("small");

        var elem = document.createElement("a");
            elem.id = "mentions-link";
            elem.href = '/feed?obj='+id+'&q=&section=mentions'
        var elemText = document.createTextNode(" [m]");
        elem.appendChild(elemText);

        small.appendChild(elem);

        document.getElementsByClassName("page_name")[0].appendChild(small);
    }

    let currentLocation = document.location.href;

    const observer = new MutationObserver((mutationList) => {
      if (currentLocation !== document.location.href) {
        currentLocation = document.location.href;
        script();
      }
    });

    observer.observe(
      document.querySelector('body'),
      {
        childList: true,
        subtree: true,
      });

  function inject(fn) {
    const script = document.createElement('script')
    script.text = `(${fn.toString()})();`
    document.documentElement.appendChild(script)
  }

  inject(script);
}

if (document.readyState !== "loading") {
    initialize();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initialize();
    });
}