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


    app.click('.frequent-website.add-shortcut', function(event) {
        const modal = document.getElementById('shortcut-modal');
        const shortcutForm = document.getElementById('shortcut-form');
        const urlInput = document.getElementById('shortcut-url');
        const nameInput = document.getElementById('shortcut-name');
        const errorMessage = document.getElementById('url-add-error-message');
        const duplicateErrorMessage = document.getElementById('url-add-duplicate-message');

    
        // Open the modal
        modal.style.display = 'block';
    
        // Close modal on clicking outside the modal
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                shortcutForm.reset();
                errorMessage.style.display = 'none';
                duplicateErrorMessage.style.display = 'none';
            }
        };

        app.click('.submit-button', function(e) {
            e.preventDefault();
            e.stopPropagation();
            let url = urlInput.value.trim();
            const name = nameInput.value.trim();
            errorMessage.style.display = 'none';
            duplicateErrorMessage.style.display = 'none';

            if (url && name) {
                try {
                    url = new URL(url); 
                } catch (error) {
                    errorMessage.style.display = 'block'; // Show error message
                    return;
                }
                url = url.href;
                const isDuplicate = app.data.shortcuts.some(shortcut => shortcut.url === url);
                if (isDuplicate) {
                    // Show duplicate error message if the URL already exists
                    duplicateErrorMessage.style.display = 'block';
                    return;
                }

                const newShortcut = { url, name };
                app.data.shortcuts.push(newShortcut);
                localStorage.setItem('shortcuts', JSON.stringify(app.data.shortcuts));
                app.update();
                if (app.data.frequentWebsites.length + app.data.shortcuts.length >= 5) {
                    app.data.addShortcuts = null;
                }
            }
    
            // Close and reset modal
            modal.style.display = 'none';
            errorMessage.style.display = 'none';
            shortcutForm.reset();
        });

        app.click('.cancel-button', function(e) {
            e.preventDefault();
            e.stopPropagation();
            modal.style.display = 'none';
            shortcutForm.reset();
            errorMessage.style.display = 'none';
            duplicateErrorMessage.style.display = 'none';
        });
    });

    // Three dots menu options
    app.click('.remove-option', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const shortcutElement = e.target.closest('.frequent-website');
        const anchor = shortcutElement.querySelector('a');
        const targetUrl = anchor ? anchor.getAttribute('href') : null;
        if (targetUrl) {
            app.data.shortcuts = app.data.shortcuts.filter(shortcut => {
                return shortcut.url !== targetUrl;
            });
            localStorage.setItem('shortcuts', JSON.stringify(app.data.shortcuts));
            if (app.data.frequentWebsites.length + app.data.shortcuts.length < 5) {
                app.data.addShortcuts = Array(1).fill({});;
            }
            app.update();
        }
    });

    app.click('.edit-option', function(e) { 
        const shortcutForm = document.getElementById('shortcut-edit-form');
        const modal = document.getElementById('shortcut-edit-modal');
        const urlInput = document.getElementById('shortcut-edit-url');
        const nameInput = document.getElementById('shortcut-edit-name');
        const errorMessage = document.getElementById('url-edit-error-message');
        const duplicateErrorMessage = document.getElementById('url-edit-duplicate-message');
        const shortcutElement = e.target.closest('.frequent-website');
        const anchor = shortcutElement.querySelector('a');
        const targetUrl = anchor ? anchor.getAttribute('href') : null;


        errorMessage.style.display = 'none';
        duplicateErrorMessage.style.display = 'none';

        if (targetUrl) {
            const shortcutToEdit = app.data.shortcuts.find(shortcut => {
                return shortcut.url === targetUrl;
            });
            if (shortcutToEdit) {
                // Pre-fill the form fields with existing data
                urlInput.value = shortcutToEdit.url;
                nameInput.value = shortcutToEdit.name;
                
                modal.style.display = 'block';
               
                app.click('.edit-button', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    // Update the shortcut with new values from the form
                    let updatedUrl = urlInput.value.trim();
                    const updatedName = nameInput.value.trim();
                    
                    if (updatedUrl && updatedName) {
                        try {
                            updatedUrl = new URL(updatedUrl); 
                        } catch (error) {
                            errorMessage.style.display = 'block'; 
                            return;
                        }
                        //Check for duplicates
                        const isDuplicate = app.data.shortcuts.some(shortcut => shortcut.url === updatedUrl.href);
                        if (isDuplicate) {
                            duplicateErrorMessage.style.display = 'block';
                            return;
                        }
                        shortcutToEdit.url = updatedUrl.href;
                        shortcutToEdit.name = updatedName;
                        // Save updated shortcuts array to localStorage
                        localStorage.setItem('shortcuts', JSON.stringify(app.data.shortcuts));
                        app.update();
                        modal.style.display = 'none';
                        shortcutForm.reset();
                    }
                });
            }
        }
        app.click('.edit-cancel-button', function(e) {
            e.preventDefault();
            e.stopPropagation();
            modal.style.display = 'none';
            shortcutForm.reset();
            errorMessage.style.display = 'none';
            duplicateErrorMessage.style.display = 'none';
        });
    });
    
    // initial call to set the frequent websites
    chrome.storage.session.get('frequentWebsites').then(result => {
        app.data.frequentWebsites = result.frequentWebsites || [];
        const savedShortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
        app.data.shortcuts = savedShortcuts;
        (app.data.frequentWebsites.length + app.data.shortcuts.length >= 5)? app.data.addShortcuts = null : app.data.addShortcuts = Array(1).fill({});
        app.update();
    }).catch(error => {
        console.error("Failed to get frequent websites:", error);
    });
   
});

