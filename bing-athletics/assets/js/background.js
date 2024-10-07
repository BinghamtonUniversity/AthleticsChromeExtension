// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Binghamton Athletics extension installed.");
// });


chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (key === "frequentWebsites") {
          chrome.storage.session.set({ frequentWebsites: newValue }).then(() => {
            console.log("Frequent websites have changed.");
          }).catch(error => {
              console.error("Failed to save frequent website change:", error);
          });
      }
  }
});


chrome.tabs.onCreated.addListener(function(tab) {
  chrome.storage.session.get('frequentWebsites').then(result => {
    let currentFrequentWebsites = result.frequentWebsites || [];

    chrome.history.search({ text: '', maxResults: 5 }, function(data) {
      let visitedWebsites = data.sort((a, b) => b.visitCount - a.visitCount);
      const newFrequentWebsites = visitedWebsites.map(page => ({
        url: page.url,
        title: page.title
      }));
      currentFrequentWebsites = newFrequentWebsites;

      // Update frequent websites in session storage
      chrome.storage.session.set({ frequentWebsites: currentFrequentWebsites })
      // .then(() => {
      //   console.log("Frequent websites updated in session storage.");
      // }).catch(error => {
      //   console.error("Failed to update frequent websites:", error);
      // });
    });
  }).catch(error => {
    console.error("Failed to get frequent websites:", error);
  });
});


function updateFrequentWebsites() {
  chrome.history.search({ text: '', maxResults: 5 }, function (data) {
      const visitedWebsites = data.sort((a, b) => b.visitCount - a.visitCount); // Sort by visit count
      // console.log(visitedWebsites);
      const frequentWebsites = visitedWebsites.map(page => ({
          url: page.url,
          title: page.title
      }));

      chrome.storage.session.set({ "frequentWebsites": frequentWebsites })
      // .then(() => {
      //     console.log("Frequent websites are saved.");
      // }).catch(error => {
      //     console.error("Failed to save frequent websites:", error);
      // });
  });
}

// initial call to set the frequent websites
updateFrequentWebsites();