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

        <div id="sports_form"></div>

        <div class="row">
            {{#scores}}
                <div class="col-sm-1">
                    {{date}}
                    {{sport.title}}
                    {{#opponent.image}}
                        <img src="https://binghamtonbearcats.com/{{opponent.image}}" style="width:16px;">
                    {{/opponent.image}} {{opponent.name}}
                    {{#result}}
                        {{#team_score}}
                            {{team_score}} {{opponent_score}}
                        {{/team_score}}
                        {{#prescore}}
                            {{prescore}}
                        {{/prescore}}
                    {{/result}}
                </div>
            {{/scores}}
        </div>

        <div class="row">
            {{#stream}}
            <div class="col-sm-3">
                <div class="panel panel-default">
                    <div class="panel-body">
                        {{{data.content_title}}}
                    </div>
                </div>
            </div>
            {{/stream}}
        </div>
    </div>
`,
};