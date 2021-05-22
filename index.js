const installBTN = document.querySelector("#installBTN");
const installedText = document.querySelector("#installedText");

installBTN.style.display = "none";
installedText.style.display = "none";

if ("serviceWorker" in navigator) {
  window.navigator.serviceWorker
    .register("service-worker.js")
    .then((result) => {
      console.log(result);
      console.log("service-worker installed");
    });
}

let eventPrompt;

window.addEventListener("beforeinstallprompt", (installEvent) => {
  console.log("12");
  installEvent.preventDefault(); // to prevent default installation prompt in some chrome versions
  eventPrompt = installEvent; // save it in a variable to use it later
  console.log(eventPrompt);

  installBTN.style.display = "block";

  installBTN.addEventListener("click", (clickEvent) => {
    eventPrompt.prompt();
    eventPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("userAccepted");
        installBTN.style.display = "none";
        installedText.style.display = "block";
      } else {
        console.log("userRefused");
      }
      eventPrompt = null;
    });
  });
});
