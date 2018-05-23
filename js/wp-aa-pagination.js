//LOCALHOST
//var api_url = "http://localhost:6020/api/profile/";
//STAGING ENVIRONMENT
var api_url =  "https://staging.artworkarchive.com/api/profile/";

function hideAllPublicPieces()
{
    var pieces_ids = document.getElementById("public_pieces_ids").value;
    var pieces_ids_list = pieces_ids.split(",");
    for (var i = 0; i < pieces_ids_list.length; i++) {
        $('#public-piece-section-' + pieces_ids_list[i]).hide();
    }
}

function unselectPaginControl(total_pages)
{
    //set all pagination control with black color
    for (var i = 0; i < total_pages; i++) {
        $('#page-selection-number-'+(i+1)).css('color', '#333');
    }
}

function showNextPublicPiecesPage(artist_slug, total_pages, page_size)
{
    var page = Number(document.getElementById("selected_page").value);
    page = page + 1;
    if ( page >= total_pages )
    {
        page = total_pages;
    }
    document.getElementById("selected_page").value = page;
    onPageSelection(artist_slug, total_pages, page, page_size);
}

function showPrevPublicPiecesPage(artist_slug, total_pages, page_size)
{
    var page = Number(document.getElementById("selected_page").value);
    page = page - 1;
    if ( page <= 0 )
    {
        page = 1;
    }
    document.getElementById("selected_page").value = page;
    onPageSelection(artist_slug, total_pages, page, page_size);
}

function onPageSelection(artist_slug, total_pages, page, page_size)
{
    //show loader
    $('#main_loader').show();
    //remove previously selected pages color
    unselectPaginControl(total_pages);
    //set the actual selected page with red color
    $('#page-selection-number-'+page).css('color', '#00c4ff');
    //hide all pieces
    hideAllPublicPieces();
    var final_url = api_url + artist_slug + '?page=' + page + '&page_size=' + page_size;
    //call api pieces with pagination
    $.ajax({
        url: final_url,
        complete: function (response) {
            var jsonobj = JSON.parse(response.responseText);
            for (var i = 0; i < jsonobj.public_pieces.length; i++) {
                //show only selected page pieces
                $('#public-piece-section-'+jsonobj.public_pieces[i].id).show();
            }
            $('#main_loader').hide();
        },
        error: function () {
            console.log('TODO: there was an error!');
            $('#main_loader').hide();
        },
    });
    return false;

}