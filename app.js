$(function() {
    players = {
        alive: [],
        dead: []
    };
    $.ajax({
        url: 'players.json'
    }).done(function(data) {
        
        for (var slug in data) {
            if (data.hasOwnProperty(slug)) {
                var player = data[slug];
                player['slug'] = slug;
                if(!player.status) {
                    players.dead.push(player);
                } else {
                    players.alive.push(player);
                }
            }
        }

        for (i = 0; i < players.alive.length; i++) {
            var player = players.alive[i];
            $('<div>')
                .attr('id', player.slug)
                .addClass('player alive')
                .append( $('<img>').attr('src', 'profiles/'+player.slug+'.jpg') )
                .append( $('<h4>').text(player.name) )
                .append( $('<span>').text('Kills: '+player.kills) )
                .appendTo($('#living'));
        }
        
        for (i = 0; i < players.dead.length; i++) {
            var player = players.dead[i];
            $('<div>')
                .attr('id', player.slug)
                .addClass('player dead')
                .append( $('<img>').attr('src', 'profiles/'+player.slug+'.jpg') )
                .append( $('<h4>').text(player.name) )
                .append( $('<span>').text('Kills: '+player.kills) )
                .appendTo($('#deceased'));
        }
        
    }).fail(function() {
        console.log('Ajax Error');
    });
});