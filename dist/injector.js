// Get the current src URL of the iframe
const srcUrl = window.parent.document.getElementById("upbond-iframe");
if (srcUrl) {
  // Create a new URL object of the parent page
  const parentUrl = new URL(window.parent.document.location.href);
  const backupUrl = localStorage.getItem("upbond_widget");

  // Get the query parameter value from the parent URL
  let loggedIn = parentUrl.searchParams.get("loggedIn");
  let rehydrate = parentUrl.searchParams.get("rehydrate");
  let selectedAddress = parentUrl.searchParams.get("selectedAddress");
  let state = parentUrl.searchParams.get("state");
  let verifier = parentUrl.searchParams.get("verifier");

  if (backupUrl) {
    const uri = JSON.parse(backupUrl);
    // console.log("GET URI:", uri);
    if (uri) {
      loggedIn = uri.loggedIn;
      rehydrate = uri.rehydrate;
      selectedAddress = uri.selectedAddress;
      state = uri.state;
      verifier = uri.verifier;
    }
  }

  if (loggedIn && verifier && rehydrate && selectedAddress && state) {
    // Add the query parameter to the updatedSrcUrl variable
    const updatedSrcUrl = `${srcUrl.src}&loggedIn=${loggedIn}&rehydrate=${rehydrate}&verifier=${verifier}&selectedAddress=${selectedAddress}&state=${state}`;

    // Update the src attribute of the iframe with the new URL
    window.parent.document.getElementById("upbond-iframe").src = updatedSrcUrl;
    localStorage.setItem("upbond_widget", JSON.stringify({ selectedAddress, rehydrate, verifier, state, loggedIn }));
    window.history.replaceState(null, "", window.location.origin + window.location.pathname);
  }
}

window.addEventListener("message", function (event) {
  if (event.data.type === "UPBOND_WIDGET_REDIRECT") {
    window.location.href = event.data.value;
  }
  if (event.data.type === "UPBOND_SELECTED_ADDRESS") {
    localStorage.setItem("upbond_selectedAddress", event.data.value);
  }
  if (event.data.type === "UPBOND_METADATA") {
    localStorage.setItem("upbond_metadata", JSON.stringify(event.data.value));
  }
  if (event.data.type === "UPBOND_LOGOUT") {
    localStorage.removeItem("upbond_selectedAddress");
    localStorage.removeItem("upbond_widget");
  }
});