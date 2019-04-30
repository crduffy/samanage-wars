
$(document).ready(function(){
    var dataset;
    $.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7PSLUBbZJ2aQlnTyzZp7YL4oP8yaPRibga_BrXuSXrFCnXKXTBJhJMGDsJezL89gkrwwQq0-I9r32/pub?gid=0&single=true&output=csv',function(data){
        dataSet = csvArray(data);
        $('#scores').DataTable( {
            data: dataSet ,
            "columns": [
                { "title": "Code Name" },
                { "title": "Name" },
                { "title": "Points" },
                { "title": "Dead" },
                { "title": "Kills" },
                //{ "data": "Scouting Report"},
                //{ "data": "Line"}
            ],

            "order": [[ 3, "asc" ], [2, "desc"], [0, "asc"]],
            "paging":   false,
            "createdRow": function ( row, data, index ) {
                if ( data[3] == 'Yes' ) {
                    $(row).addClass('dead');
                }
            }
        } );

    });




});

function csvArray(csv){

    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");

    for(var i=1;i<lines.length;i++){
        var obj = [];
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj.push(currentline[j].trim());
        }
        result.push(obj);

    }
    return result;
}

