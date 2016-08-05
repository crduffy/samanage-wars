/*$(function() {
    $.ajax({
        url: 'players-new.json'
    }).done(function(data) {
        
        for (var slug in data) {
            if (data.hasOwnProperty(slug)) {

                $('<tr>')
                    .attr('id', slug)

                    .addClass((data[slug].Dead ? 'dead' : ''))
                    .append( $('<td>').text(slug))
                    .append( $('<td>').text(data[slug].Points))
                    .appendTo($('#players'));
            }
        }


    }).fail(function() {
        console.log('Ajax Error');
    });
});*/
$(document).ready(function(){
    $('#scores').DataTable( {
        "ajax": {
            "url": 'players-new.json',
            "dataSrc": "abtwars",
        },
        "columns": [
            { "data": "Code Name" },
            { "data": "Name" },
            { "data": "Points" },
            { "data": "Dead" },
            { "data": "Kills" }
        ],
        "order": [[ 3, "asc" ], [2, "desc"], [0, "asc"]],
        "paging":   false,
        "createdRow": function ( row, data, index ) {
            if ( data["Dead"] == 'Yes' ) {
                $(row).addClass('dead');
            }
        }
    } );

});
