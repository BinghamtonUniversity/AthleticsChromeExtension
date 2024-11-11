app.callback(function() {
    app.data.baseurl = 'https://hermesprod.binghamton.edu/athleticsplugin';
    app.data.current_sport_id = 0;
    var get_scores = function() {
        app.get(app.data.baseurl+'/scores?sport_id='+app.data.current_sport_id,function(scores) {
            app.data.scores = scores;
            app.data.stories = scores.map(score => {
                    if (score.story && score.story.content_date) {
                        const date = new Date(score.story.content_date);
                        const options = { year: 'numeric', month: 'short', day: 'numeric' };
                        score.story.content_date = date.toLocaleDateString('en-US', options);
                    }
                    return score.story;
                })
                .filter(story => story && story.title)
                .reverse();
            app.data.score_chunks = chunkArray(app.data.scores,4);
            app.data.score_chunks = app.data.score_chunks.map((chunk, index) => {
                return {
                    index: index, 
                    isActive: index === 0,
                    scores: chunk.map(score => {
                        const date = new Date(score.date);
                        const dateOptions = { month: 'short', day: 'numeric' };
                        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        
                        score.date = date.toLocaleDateString('en-US', dateOptions);
                        score.time = date.toLocaleTimeString('en-US', timeOptions).toLowerCase();
                        return score;
                    })
                };
            });
            app.update();
        });
    }

    get_scores();

    function chunkArray(arr, size) {
        var chunked = [];
        for (var i = 0; i < arr.length; i += size) {
            chunked.push(arr.slice(i, i + size));
        }
        return chunked;
    }


    app.get(app.data.baseurl+'/stream',function(stream) {
        app.data.stream = stream.stream.map(item => {
            const date = new Date(item.data.content_date);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            item.data.content_date = date.toLocaleDateString('en-US', options);
            return item;
        });
        // console.log(app.data.stream);
        app.update();
    });

    const toggleDarkMode = function() {
        const bodyElement = document.body;
        const toggleSwitch = document.getElementById('dark-mode-toggle');
        
        if (toggleSwitch.checked) {
            bodyElement.classList.remove('light-mode');
            bodyElement.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled'); 
        } else {
            bodyElement.classList.remove('dark-mode');
            bodyElement.classList.add('light-mode');
            localStorage.setItem('dark-mode', 'disabled'); 
        }
    };
    
    // Check local storage for dark mode preference
    const storedPreference = localStorage.getItem('dark-mode');
    const toggleSwitch = document.getElementById('dark-mode-toggle');
    
    if (storedPreference === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleSwitch.checked = true; 
    } else {
        document.body.classList.add('light-mode'); // default to light mode
    }
    
  
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', toggleDarkMode);
    }

   
    app.click('.plus-button-container button', function(event) {
        const dropdownLinks = event.target.nextElementSibling;
        if (dropdownLinks.style.display === 'none' || dropdownLinks.style.display === '') {
            dropdownLinks.style.display = 'block';
        } else {
            dropdownLinks.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.plus-button-container')) {
            document.querySelectorAll('.dropdown-links').forEach(link => {
                link.style.display = 'none'; // Hide all dropdowns if click is outside of the plus-button
            });
        }
    });
    
    // chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    //     if (info.status === 'complete' && tab.url === "chrome://newtab/") {
    //         // Update frequent websites when a new tab is opened
    //         chrome.storage.session.get('frequentWebsites').then(result => {
    //             app.data.frequentWebsites = result.frequentWebsites
    //             console.log("Frequent websites updated:", app.data.frequentWebsites);
    //             app.update();
    //         }).catch(error => {
    //             console.error("Failed to get frequent websites:", error);
    //         });
    //     }
    // });

    // initial call to set the frequent websites
    chrome.storage.session.get('frequentWebsites').then(result => {
        app.data.frequentWebsites = result.frequentWebsites || [];
        app.update();
    }).catch(error => {
        console.error("Failed to get frequent websites:", error);
    });
   
});

