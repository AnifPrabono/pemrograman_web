// function
function searchMovie() {
    // mengkosongkan
    $('#movie-list').html('');

    // reuest ajax
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',

        // objek
        data: {
            'apikey': '2cfdf82a',
            's': $('#search-input').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;

                // looping
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-3">
                            <div class="card mb-3">
                                <img src="${data.Poster}" class="card-img-top" alt="...">
                                <div class="card-body" style="text-align:center;">
                                <h5 class="card-title">${data.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                                <a href="#" class="btn btn-primary see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                                </div>  
                            </div>
                        </div>
                    `);
                });

                // mengkosongkan
                $('#search-input').val('');

            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center">` + result.Error + `</h1>
                    </div>
                `)
            }
        }
    });
}

// a Event jquery
$('#search-button').on('click', function () {
    searchMovie();
});

//ketika tombol dilepas (keycode.info)
$('#search-input').on('keyup', function (e) {
    if (e.which === 13) {
        searchMovie();
    }
});

// event delegation
$('#movie-list').on('click', '.see-detail', function () {

    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': '2cfdf82a',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {

                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` + movie.Poster + `" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item" style="text-align:center;"><h3>` + movie.Title + `</h3></li>
                                    <li class="list-group-item">Released : ` + movie.Released + `</li>
                                    <li class="list-group-item">Genre : ` + movie.Genre + `</li>                 
                                    <li class="list-group-item">Director : ` + movie.Director + `</li>                 
                                    <li class="list-group-item">Actors : ` + movie.Actors + `</li>
                                    <li class="list-group-item">Website : ` + movie.Website + `</li>              
                                </ul>
                            </div>
                        </div>
                    </div>
                `);

            }
        }
    });

});