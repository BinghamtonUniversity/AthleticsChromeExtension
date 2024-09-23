window.templates = {
main: `
    <div style="margin:100px 20px 0px 20px;">
        <div style="text-align:center;">
            <img id="logo" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" style="height:92px;width:272px;margin-bottom: 20px;" alt="Google Logo">
            <form id="search-form" action="https://www.google.com/search" method="GET">
                <input id="search-input" type="text" name="q" required><br>
                <button id="search-button" type="submit">Google Search</button>
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
                                            <img src="assets/icons/icon16.png" style="width:16px;">
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
        <div class="scrollable-wrapper">
            <div class="scrollable-container">
                <h3 class="news-header"><span><img src="assets/icons/icon48.png" alt="Icon" style="width: 40px; margin-right: 10px;"></span>More News</h3>
                <div class="list-group">
                    {{#stream}}
                    <a href="{{data.content_url}}" target="_blank" class="list-group-item">
                       <div class="row">
                            <div class="col-xs-12">
                                <img src="{{data.content_image_url}}" alt="{{{data.content_title}}}" class="img-responsive" style="max-width: 100%; height: auto;"/>
                                <h4 class="list-group-item-heading" style="margin-top:10px;">{{{data.content_title}}}</h4>
                            </div>
                        </div>
                    </a>
                    {{/stream}}
                </div>
            </div>
        </div>
        
    </div>
`,
};