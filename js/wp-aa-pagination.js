//LOCALHOST
//var api_url = "http://localhost:6020/api/profile/";
//STAGING ENVIRONMENT
var api_url =  "https://staging.artworkarchive.com/api/profile/";

function hideAllPublicPieces()
{
    console.log("hideAllPublicPieces");
    //var pieces_ids = $('#public_pieces_ids').val();
    var pieces_ids = document.getElementById("public_pieces_ids").value;
    var pieces_ids_list = pieces_ids.split(",");
    for (var i = 0; i < pieces_ids_list.length; i++) {
        console.log("hidding piece id " + pieces_ids_list[i]);
        $('#public-piece-section-' + pieces_ids_list[i]).hide();
    }
    console.log(pieces_ids);
}

function showNextPublicPiecesPage(artist_slug, total_pages, page_size)
{
    console.log("showNextPublicPiecesPage");
    var page = document.getElementById("selected_page").value;
    console.log(total_pages);
    console.log(page);
    if ( (page + 1) >= total_pages )
    {
        page = total_pages;
    }
    else
    {
        page = page + 1;
    }
    document.getElementById("selected_page").value = page;
    onPageSelection(artist_slug, page, page_size);
}

function showPrevPublicPiecesPage(artist_slug, total_pages, page_size)
{
    console.log("showPrevPublicPiecesPage");
    var page = document.getElementById("selected_page").value;
    console.log(total_pages);
    console.log(page);
    if ( (page - 1) <= 0 )
    {
        page = 1;
    }
    else
    {
        page = page - 1;
    }
    document.getElementById("selected_page").value = page;
    onPageSelection(artist_slug, page, page_size);
}

function onPageSelection(artist_slug, page, page_size)
{
    hideAllPublicPieces();
  /*console.log("onPageSelection");
  console.log("artist_slug: "+artist_slug);
  console.log("page: "+page);
  console.log("page_size: "+page_size);
  */
  var final_url = api_url + artist_slug + '?page=' + page + '&page_size=' + page_size;
  console.log("trying to hit : "+final_url);

    $.ajax({
        url: final_url,
        complete: function (response) {
            //$('#output').html(response.responseText);
            //console.log(response.responseText);
            var jsonobj = JSON.parse(response.responseText);
            //console.log(jsonobj);
            //console.log(jsonobj.public_pieces);
            for (var i = 0; i < jsonobj.public_pieces.length; i++) {
                console.log("showing....");
                //console.log(jsonobj.public_pieces[i].id);
                console.log(jsonobj.public_pieces[i].name);
                $('#public-piece-section-'+jsonobj.public_pieces[i].id).show();
            }
            /*for (var public_pieces in jsonobj) {
                
                //$('#public-piece-section-'+jsonobj.public_pieces[0].id).hide();

                if (jsonobj.hasOwnProperty(public_pieces)) {
                    console.log(jsonobj[public_pieces]);
                    //$('#public-piece-section-'+jsonobj.public_pieces[0].id).show();
                }
            }*/
        },
        error: function () {
            
            console.log('Bummer: there was an error!');
        },
    });
    return false;

}