chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.create({ url: "https://binghamtonbearcats.com/" });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (key === "frequentWebsites") {
          chrome.storage.session.set({ frequentWebsites: newValue });
          // console.log("Storage updated");
      }
  }
});

chrome.tabs.onCreated.addListener(function(tab) {
  // Check if the frequent websites have already been updated
  chrome.storage.session.get('frequentWebsitesUpdated').then(result => {
    if (!result.frequentWebsitesUpdated) {
      chrome.storage.session.get('frequentWebsites').then(result => {
        let currentFrequentWebsites = result.frequentWebsites || [];

        chrome.history.search({ text: '', maxResults: 100 }, function(data) {
          let visitedWebsites = data.sort((a, b) => b.visitCount - a.visitCount).slice(0,5);
          const newFrequentWebsites = visitedWebsites.map(page => ({
            url: page.url,
            title: page.title
          }));
          currentFrequentWebsites = newFrequentWebsites;

          // Update frequent websites in session storage
          chrome.storage.session.set({ frequentWebsites: currentFrequentWebsites })
          // console.log("Frequent websites updated:", currentFrequentWebsites);

          // Set the flag so it doesn't update again
          chrome.storage.session.set({ frequentWebsitesUpdated: true });
        });
      }).catch(error => {
        console.error("Failed to get frequent websites:", error);
      });
    }
  });
});

// setTimeout(() => {
//   chrome.storage.session.set({ frequentWebsitesUpdated: false });
// }, 600);

// chrome.tabs.onCreated.addListener(function(tab) {
//   chrome.storage.session.get('frequentWebsites').then(result => {
//     let currentFrequentWebsites = result.frequentWebsites || [];

//     chrome.history.search({ text: '', maxResults: 20 }, function(data) {
//       console.log(data);
//       let visitedWebsites = data.sort((a, b) => b.visitCount - a.visitCount).slice(0,5);
//       const newFrequentWebsites = visitedWebsites.map(page => ({
//         url: page.url,
//         title: page.title
//       }));
//       currentFrequentWebsites = newFrequentWebsites;

//       // Update frequent websites in session storage
//       chrome.storage.session.set({ frequentWebsites: currentFrequentWebsites })
//       console.log("Frequent websites updated:", currentFrequentWebsites);
//     });
//   }).catch(error => {
//     console.error("Failed to get frequent websites:", error);
//   });
// });


function updateFrequentWebsites() {
  chrome.history.search({ text: '', maxResults: 100 }, function (data) {
      const visitedWebsites = data.sort((a, b) => b.visitCount - a.visitCount).slice(0,5);
      const frequentWebsites = visitedWebsites.map(page => ({
          url: page.url,
          title: page.title
      }));

      chrome.storage.session.set({ "frequentWebsites": frequentWebsites });
  });
}

// initial call to set the frequent websites
updateFrequentWebsites();