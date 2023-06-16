// Get the current src URL of the iframe
const srcUrl = window.parent.document.getElementById("upbond-iframe");
if (srcUrl) {
  // Create a new URL object of the parent page
  const parentUrl = new URL(window.parent.document.location.href);

  // Get the query parameter value from the parent URL
  const loggedIn = parentUrl.searchParams.get("loggedIn");
  const rehydrate = parentUrl.searchParams.get("rehydrate");
  const selectedAddress = parentUrl.searchParams.get("selectedAddress");
  const state = parentUrl.searchParams.get("state");
  const verifier = parentUrl.searchParams.get("verifier");

  if (loggedIn && verifier && rehydrate && selectedAddress && state) {
    // Add the query parameter to the updatedSrcUrl variable
    const updatedSrcUrl = `${srcUrl.src}&loggedIn=${loggedIn}&rehydrate=${rehydrate}&verifier=${verifier}&selectedAddress=${selectedAddress}&state=${state}`;

    // Update the src attribute of the iframe with the new URL
    window.parent.document.getElementById("upbond-iframe").src = updatedSrcUrl;
    localStorage.setItem("upbond_widget", { selectedAddress, rehydrate, verifier, state, loggedIn });
    window.history.replaceState(null, "", window.location.origin + window.location.pathname);
  }
}

window.addEventListener("message", function (event) {
  if (event.data.type === "UPBOND_WIDGET_REDIRECT") {
    window.location.href = event.data.value;
  }
  if (event.data.type === "UPBOND_SELECTED_ADDRESS") {
    localStorage.setItem("upbond.selectedAddress", event.data.value);
  }
});
