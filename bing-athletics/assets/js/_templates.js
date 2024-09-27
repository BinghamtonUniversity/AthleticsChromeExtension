window.templates = {
main: `
    

    <div style="margin:40px 20px 0px 20px;">
       <div style="position: absolute; top: 20px; right: 20px; display: flex; align-items: center;">
            <span style="font-size: 13px; margin-right: 10px;">Dark Mode</span>
            <label class="switch">
                <input type="checkbox" id="dark-mode-toggle">
                <span class="slider round"></span>
            </label>
        </div>
        <div style="text-align:center;">
            <img id="logo" src="assets/icons/Binghamton-Athletics.png" style="height:280px;width:700px;object-fit:cover;" alt="Google Logo">
            <form id="search-form" action="https://www.google.com/search" method="GET">
                <input id="search-input" type="text" name="q" style="width: 600px; height: 40px; font-size: 18px;" required><br>
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
                                        <span class="date">{{date}}</span>
                                        
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

        <!--Nested template for news-->
        
            <div class="news-container">
                <h3 class="news-header"><span><img src="assets/icons/bearcat.png" alt="Icon" style="width: 40px; margin-right: 10px;"></span>More News</h3>
                <div class="list-group">
                    {{#stream}}
                    <a href="{{data.content_url}}" target="_blank">
                        <div class="row align-items-center fixed-row">
                            <div class="col-sm-4">
                                {{#data.content_image_url}}
                                <img src="{{data.content_image_url}}" alt="{{{data.content_title}}}"/>
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
`,
};