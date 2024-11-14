chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.create({ url: "https://binghamtonbearcats.com/" });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (key === "frequentWebsites") {
          chrome.storage.session.set({ frequentWebsites: newValue });
      }
  }
});

chrome.tabs.onCreated.addListener(function(tab) {
  // Check if the frequent websites have already been updated
  chrome.storage.session.get('frequentWebsitesUpdated').then(result => {
    if (!result.frequentWebsitesUpdated) {
      chrome.storage.session.get('frequentWebsites').then(result => {
        let currentFrequentWebsites = result.frequentWebsites || [];

        chrome.history.search({ text: '', maxResults: 20 }, function(data) {
          let visitedWebsites = data.sort((a, b) => b.visitCount - a.visitCount).slice(0,3);
          const newFrequentWebsites = visitedWebsites.map(page => ({
            url: page.url,
            title: page.title
          }));
          currentFrequentWebsites = newFrequentWebsites;

          // Update frequent websites in session storage
          chrome.storage.session.set({ frequentWebsites: currentFrequentWebsites })
          // Set the flag so it doesn't update again
          chrome.storage.session.set({ frequentWebsitesUpdated: true });
        });
      }).catch(error => {
        console.error("Failed to get frequent websites:", error);
      });
    }
  });
});

function updateFrequentWebsites() {
  chrome.history.search({ text: '', maxResults: 20 }, function (data) {
      const visitedWebsites = data.sort((a, b) => b.visitCount - a.visitCount).slice(0,3);
      const frequentWebsites = visitedWebsites.map(page => ({
          url: page.url,
          title: page.title
      }));

      chrome.storage.session.set({ "frequentWebsites": frequentWebsites });
  });
}

// initial call to set the frequent websites
updateFrequentWebsites();