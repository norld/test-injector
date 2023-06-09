// Get the current src URL of the iframe
const srcUrl = window.document.getElementById("upbond-iframe");
if (srcUrl) {
  // Create a new URL object of the parent page
  const parentUrl = new URL(window.document.location.href);

  // Get the query parameter value from the parent URL
  const loggedIn = parentUrl.searchParams.get("loggedIn");
  const rehydrate = parentUrl.searchParams.get("rehydrate");
  const selectedAddress = parentUrl.searchParams.get("selectedAddress");
  const state = parentUrl.searchParams.get("state");
  const verifier = parentUrl.searchParams.get("verifier");

  if (loggedIn && verifier && rehydrate && selectedAddress && state) {
    // Add the query parameter to the updatedSrcUrl variable
    const updatedSrcUrl = `${srcUrl.url}&loggedIn=${loggedIn}&rehydrate=${rehydrate}&verifier=${verifier}&selectedAddress=${selectedAddress}&state=${state}`;

    // Update the src attribute of the iframe with the new URL
    // window.document.getElementById("upbond-iframe").src = updatedSrcUrl;
  }
}
