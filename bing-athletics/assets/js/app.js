app.callback(function() {
    app.data.baseurl = 'https://hermesprod.binghamton.edu/athleticsplugin';
    app.data.current_sport_id = 0;
    var get_scores = function() {
        app.get(app.data.baseurl+'/scores?sport_id='+app.data.current_sport_id,function(scores) {
            app.data.scores = scores;
            app.update();
        });
    }

    get_scores();

    app.get(app.data.baseurl+'/sports',function(sports) {
        app.data.sports = sports.sports;
        app.data.sports.unshift({sport:0,sportInfo:{sport_title:'All Sports'}});
        app.update();

        app.form('sports_form','#sports_form').on('change',function(event) {
            var form_data = event.form.get();
            if (app.data.current_sport_id != form_data.sport_id) {
                app.data.current_sport_id = form_data.sport_id;
                app.update();
                get_scores();
            }
        })
    });

    app.get(app.data.baseurl+'/stream',function(stream) {
        app.data.stream = stream.stream;
        app.update();
    });
});

