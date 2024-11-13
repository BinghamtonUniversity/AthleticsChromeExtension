window.templates = {
main: `
    

    <div style="margin:40px 20px 0px 20px;position:relative;">
       <div style="position: absolute; top: 10px; right: 20px; display: flex; align-items: center;">
            <a href="http://bmail.binghamton.edu" target="_blank" class="gmail-link">Gmail</a>

            <span class="dark-mode-text">Dark Mode</span>
            <label class="switch">
                <input type="checkbox" id="dark-mode-toggle">
                <span class="slider round"></span>
            </label>
        </div>
        <div style="text-align:center;">
            <a href="https://binghamtonbearcats.com/" target="_blank">
                <img id="logo" src="assets/icons/Binghamton-Athletics.png" style="height:280px;width:700px;object-fit:cover;" alt="Binghamton Athletics Logo">
            </a>
            <form id="search-form" action="https://www.google.com/search" method="GET">
                <input id="search-input" type="text" name="q" style="width: 600px; height: 40px; font-size: 18px;" required autofocus><br>
                <button id="search-button" type="submit" style="margin-top:10px; height: 40px; font-size: 16px;">Google Search</button>
            </form>
        </div>

        

        <div class='flex-container'>

        <div class="container my-carousel-container" style="margin: 30px auto;">
            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                

                <!-- Wrapper for slides -->
                <div class="my-carousel-container2">
                    <div class="carousel-inner">
                        {{#each score_chunks}}
                        <div class="item {{#if isActive}}active{{/if}}">
                            <div class="row score-row">
                                {{#each scores}} 
                                <div class="col-sm-3">
                                    <div class="score-entry">
                                        <div class="date-plus-container">          
                                            <span class="date">{{date}}, {{time}} / {{location}}</span>
                                            {{#media}}{{#video}}{{#stats}}
                                            <div class="plus-button-container">
                                                <button class="btn btn-success btn-xs">+</button>
                                                <div class="dropdown-links" style="display:none;">
                                                   <a href="{{video}}" target="_blank">Watch</a>
                                                   <a href="{{stats}}" target="_blank">Stats</a>
                                                </div>
                                            </div>
                                            {{/stats}}
                                            {{else}}
                                                {{#story}}{{#content_url}}
                                                <div class="plus-button-container">
                                                    <button class="btn btn-success btn-xs">+</button>
                                                    <div class="dropdown-links" style="display:none;">
                                                        <a href="{{content_url}}" target="_blank">Recap</a>
                                                    </div>
                                                </div>
                                                {{/content_url}}{{/story}}
                                            {{/video}}{{/media}}
                                            
                                        </div>
                                        <!-- Sport Title and Team Score -->
                                        <span class="teams">
                                            <img src="assets/icons/bicon32.png" style="width:16px;">
                                            <strong>{{sport.title}}</strong>
                                            {{#result}}{{#team_score}}
                                            <strong>{{team_score}}</strong>
                                            {{/team_score}}{{/result}}
                                        </span>

                                        <!-- Opponent Name and Opponent Score -->
                                        <span class="teams">
                                            <img src="https://binghamtonbearcats.com/{{opponent.image}}" style="width:16px;">
                                            {{opponent.name}}
                                            {{#result}}{{#team_score}}
                                            <strong>{{opponent_score}}</strong>
                                            {{/team_score}}{{/result}}
                                        </span>
                                    </div>
                                </div>
                                {{/each}}
                            </div>
                        </div>
                        {{/each}}
                    </div>
                </div>

               
                <!-- Controls -->
                <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                    <span class="fa fa-arrow-left" aria-hidden="true"></span>
                </a>
                <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                    <span class="fa fa-arrow-right" aria-hidden="true"></span>
                </a>
            </div>
            <div class='composite-calendar'>
                <a href="https://binghamtonbearcats.com/calendar" target="_blank" class="calendar-link">See full calendar</a>
            </div>
        </div>
        </div>

        

        <!-- Wrapper containing the box with two scrollable columns -->
        <div class="box-wrapper">
            <div class="box-container">
                
                <!-- Left Column: News stories -->
                <div class="col-sm-6">
                    <div class="scrollable-container">
                        <h3 class="news-header">
                            <span>
                                <img src="assets/icons/bearcat.ico" alt="Icon" style="width: 40px; margin-right: 10px;">
                            </span>More News
                        </h3>
                        <div class="list-group">
                            {{#stories}}
                            <a href="{{content_url}}" target="_blank">
                                <div class="row align-items-center fixed-row">
                                    <div class="col-sm-4">
                                        {{#content_image_url}}
                                        <img src="{{content_image_url}}" alt="{{{content_title}}}" />
                                        {{/content_image_url}}
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="content-wrapper">
                                            <h4 class="list-group-item-heading">{{{content_title}}}</h4>
                                            <div class="story-footer">
                                                <small class="text-muted">{{content_date}}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            {{/stories}}
                        </div>
                    </div>
                </div>

                <!-- Right Column: Stream -->
                <div class="col-sm-6">
                    <div class="scrollable-container">
                        <h3 class="news-header">
                            <span>
                                <img src="assets/icons/fb_icon48.png" alt="Icon" style="width: 40px; margin-right: 10px;">
                                
                            </span>@BinghamtonAthletics
                            
                        </h3>
                        <div class="list-group">
                            {{#stream}}
                            <a href="{{data.content_url}}" target="_blank">
                                <div class="row align-items-center fixed-row">
                                    <div class="col-sm-4">
                                        {{#data.content_image_url}}
                                        <img src="{{data.content_image_url}}" alt="{{{data.content_title}}}" />
                                        {{/data.content_image_url}}
                                    </div>
                                    <div class="col-sm-8">
                                       <div class="content-wrapper">
                                            <h4 class="list-group-item-heading">{{{data.content_title}}}</h4>
                                            <div class="story-footer">
                                                <small class="text-muted">{{data.content_date}}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            {{/stream}}
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Frequent Websites -->
        <div class="frequent-websites-container">
            {{#frequentWebsites}}
            <div class="frequent-website">
                <a href="{{url}}" target="_blank">
                    <img src="https://www.google.com/s2/favicons?domain={{url}}&sz=64" alt="{{title}}" class="website-icon">
                    <span>{{title}}</span>
                </a>
            </div>
            {{/frequentWebsites}}
            {{#shortcuts}}
                <div class="frequent-website">
                    <!-- Edit Shortcut Modal -->
                    <div id="shortcut-edit-modal" class="modal">
                        <div class="modal-content">
                            <h2>Edit Shortcut</h2>
                            <form id="shortcut-edit-form">
                                <label for="shortcut-edit-url">URL:</label>
                                <input type="url" id="shortcut-edit-url" required>
                                
                                <label for="shortcut-edit-name">Name:</label>
                                <input type="text" id="shortcut-edit-name" required>
                                
                                <div class="edit-modal-buttons">
                                    <button type="button" class="edit-cancel-button">Cancel</button>
                                    <button type="submit" class="edit-button">Done</button>
                                </div>
                            </form>
                            <div id="url-edit-error-message" style="color: red; display: none; padding:5px;">Please enter a valid URL starting with http:// or https://.</div>
                        </div>
                    </div>

                    <!-- Three dots menu button -->
                    <div class="menu-container">
                        <button class="menu-button">⋮</button>
                        <div class="menu-options">
                            <button class="edit-option">Edit</button>
                            <button class="remove-option">Remove</button>
                        </div>
                    </div>
                    <a href="{{url}}" target="_blank">
                        <div class="website-info">
                            <img src="https://www.google.com/s2/favicons?domain={{url}}&sz=64" alt="{{name}}" class="website-icon">
                            <span>{{name}}</span>
                        </div>    
                    </a> 
                </div>
            {{/shortcuts}}
            {{#addShortcuts}}
                <div class="frequent-website add-shortcut">
                    <!-- Add Shortcut Modal -->
                    <div id="shortcut-modal" class="modal">
                        <div class="modal-content">
                            <h2>Add Shortcut</h2>
                            <form id="shortcut-form">
                                <label for="shortcut-url">URL:</label>
                                <input type="url" id="shortcut-url" required>
                                
                                <label for="shortcut-name">Name:</label>
                                <input type="text" id="shortcut-name" required>
                                
                                <div class="modal-buttons">
                                    <button type="button" class="cancel-button">Cancel</button>
                                    <button type="submit" class="submit-button">Done</button>
                                </div>
                            </form>
                            <div id="url-add-error-message" style="color: red; display: none; padding:5px;">Please enter a valid URL starting with http:// or https://.</div>
                        </div>
                    </div>

                    <img src="assets/icons/plus_grey.png" alt="Add Shortcut" class="website-icon">
                    <span>Add Shortcut</span>
                </div>
            {{/addShortcuts}}
        </div>


    </div>

`,
};

