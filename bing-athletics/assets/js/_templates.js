window.templates = {
main: `
    

    <div style="margin:40px 20px 0px 20px;position:relative;">
       <div style="position: absolute; top: 10px; right: 20px; display: flex; align-items: center;">
            <span style="font-size: 13px; margin-right: 10px;">Dark Mode</span>
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
        <!--<div id="sports_form"></div>-->

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
                                            <span class="date">{{date}}/{{location}}</span>
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
                                            <img src="assets/icons/icon32.png" style="width:16px;">
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
                                <img src="assets/icons/bearcat.png" alt="Icon" style="width: 40px; margin-right: 10px;">
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
                                        <h4 class="list-group-item-heading">{{{content_title}}}</h4>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="blue" class="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                            </svg>
                            <span style="margin-left:5px;">@BinghamtonAthletics</span>
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
                                        <h4 class="list-group-item-heading">{{{data.content_title}}}</h4>
                                    </div>
                                </div>
                            </a>
                            {{/stream}}
                        </div>
                    </div>
                </div>

            </div>
        </div>


    </div>

`,
};

