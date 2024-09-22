app.callback(function() {
    app.data.baseurl = 'https://hermesprod.binghamton.edu/athleticsplugin';
    app.data.current_sport_id = 0;
    var get_scores = function() {
        app.get(app.data.baseurl+'/scores?sport_id='+app.data.current_sport_id,function(scores) {
            app.data.scores = scores;
            app.data.score_chunks = chunkArray(app.data.scores,4);
            app.data.score_chunks = app.data.score_chunks.map((chunk, index) => {
                return {
                    index: index, 
                    isActive: index === 0,
                    scores: chunk.map(score => {
                        const date = new Date(score.date);
                        const options = { month: 'short', day: 'numeric' };
                        score.date = date.toLocaleDateString('en-US', options);
                        return score;
                    })
                };
            });
            // console.log(app.data.score_chunks);
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

    

    app.get(app.data.baseurl+'/sports',function(sports) {
        app.data.sports = sports.sports;
        app.data.sports.unshift({sport:0,sportInfo:{sport_title:'All Sports'}});
        app.update();

        // app.form('sports_form','#sports_form').on('change',function(event) {
        //     var form_data = event.form.get();
        //     if (app.data.current_sport_id != form_data.sport_id) {
        //         app.data.current_sport_id = form_data.sport_id;
        //         get_scores();
        //         app.data.score_chunks = chunkArray(app.data.scores,4);
        //         app.update();
        //     }
        // })
    });

    app.get(app.data.baseurl+'/stream',function(stream) {
        app.data.stream = stream.stream;
        app.update();
    });
});

