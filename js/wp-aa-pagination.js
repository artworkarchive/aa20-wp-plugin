//LOCALHOST
//var api_url = "http://localhost:6020/api/profile/";
//STAGING ENVIRONMENT
var api_url =  "https://staging.artworkarchive.com/api/profile/";

function generateHTMLForPieces(json_decoded)
{
    var html = "";
    var html_hiddens = "";
    $('#aawp-pieces-section').html("");
    $('#aawp-data-section').html("");
    for (var i = 0; i < json_decoded.public_pieces.length; i++) {
        //show only selected page pieces
        //$('#public-piece-section-'+jsonobj.public_pieces[i].id).show();
        //console.log(json_decoded.public_pieces[i].id);
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-img' value='" + json_decoded.public_pieces[i].primary_image_medium_url + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-id' value='" + json_decoded.public_pieces[i].id + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-name' value='" + json_decoded.public_pieces[i].name + "' />";
        if(json_decoded.public_pieces[i].price != undefined)
        {
            html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-price' value='" + json_decoded.public_pieces[i].price + "' />";
        }
        if(json_decoded.public_pieces[i].inventory_number != undefined)
        {
            html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-inventory_number' value='" + json_decoded.public_pieces[i].inventory_number + "' />";
        }
        
        html += '<div class="aawp-thumb">' +
        '<img src="' + json_decoded.public_pieces[i].primary_image_thumb_url + '" alt="Public Piece ' + json_decoded.public_pieces[i].name + '">' +
        '<div class="aawp-overlay">' +
            '<div class="aawp-overlay-text">' +
                '<ul>' +
                    '<li>' + json_decoded.public_pieces[i].name + '</li>';
                    if(json_decoded.public_pieces[i].price != undefined)
                    {
                        html +='<li>' + json_decoded.public_pieces[i].price + '</li>';
                    }
                    html +='<li><span onclick="onIndividualPieceSelection(' + json_decoded.public_pieces[i].id + ')"> View </span></li>' +
                '</ul>' +
            '</div>' +
        '</div>' +
      '</div>';
      //console.log(html);
    }
    $('#aawp-data-section').html(html_hiddens);
    $('#aawp-pieces-section').html(html);
}

function generateHTMLForPagination(json_decoded)
{
    console.log("generateHTMLForPagination");

    var user_slug = $('#aawp-user-slug').val();
    console.log("user_slug: "+user_slug);

    $('#aawp-pagination-section').html("");
    var html_pagination_control = "";

    html_pagination_control += '<a style="color:#333;" href="#" onclick="showPrevPublicPiecesPage(&quot;'+user_slug+'&quot;,'+(json_decoded.total_pages)+','+(json_decoded.page_size)+')">«</a>';
    for (var i = 0; i < json_decoded.total_pages; i++) {
        html_pagination_control += '<a style="color: rgb(0, 196, 255);" id="page-selection-number-'+(i+1)+'" href="#" onclick="onPageSelection(&quot;'+user_slug+'&quot;,'+(json_decoded.total_pages)+','+(i+1)+','+(json_decoded.page_size)+');">'+(i+1)+'</a>';
    }
    html_pagination_control += '<a style="color:#333;" href="#" onclick="showNextPublicPiecesPage(&quot;'+user_slug+'&quot;,'+(json_decoded.total_pages)+','+(json_decoded.page_size)+')">»</a>';

    $('#aawp-pagination-section').html(html_pagination_control);
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
    
    var final_url = api_url + artist_slug + '?page=' + page + '&page_size=' + page_size;
    //call api pieces with pagination
    $.ajax({
        url: final_url,
        complete: function (response) {
            var jsonobj = JSON.parse(response.responseText);
            generateHTMLForPieces(jsonobj);
            $('#main_loader').hide();
        },
        error: function () {
            console.log('TODO: there was an error!');
            $('#main_loader').hide();
        },
    });
    return false;
}

function onIndividualPieceSelection(piece_id){
    console.log("onIndividualPieceSelection");
    console.log(piece_id);
    window.location.href = '#aa-wp-global-piece-viewer-modal-popup';
    $("#aawp-popup-piece-image").attr("src","");
    $("#aawp-popup-piece-name").text("");
    $("#aawp-popup-piece-details").html("");
    //#aa-wp-global-piece-viewer-modal-popup
    //awp-popup-piece-image
    //aawp-popup-piece-name
    //aawp-popup-piece-details
    console.log("....");
    var piece_id = $("#public-piece-" + piece_id + "-hidden-for-id").val();
    var piece_name = $("#public-piece-" + piece_id + "-hidden-for-name").val();
    var piece_image = $("#public-piece-" + piece_id + "-hidden-for-img").val();
    var html_ul_details = "<ul class='aawp-li-style-none'>";
    if($("#public-piece-" + piece_id + "-hidden-for-price").val() !== undefined)
    {
        var piece_price = $("#public-piece-" + piece_id + "-hidden-for-price").val();
        html_ul_details += "<li>Price: " + piece_price + "</li>";
        console.log("$$$$$$"+piece_price);
    }
    if($("#public-piece-" + piece_id + "-hidden-for-inventory_number").val() !== undefined)
    {
        var inventory_number = $("#public-piece-" + piece_id + "-hidden-for-inventory_number").val();
        html_ul_details += "<li>Inventory Number: " + inventory_number + "</li>";
        console.log("######"+inventory_number);
    }
    html_ul_details += "</ul>";
    console.log("...."+piece_id);
    console.log("...."+piece_name);
    console.log("...."+piece_image);
    $("#aawp-popup-piece-image").attr("src",piece_image);
    $("#aawp-popup-piece-name").text(piece_name);
    $("#aawp-popup-piece-details").html(html_ul_details);
}

function onPageLoad(artist_slug)
{
    var page = 1;
    var page_size = 5;
    //show loader
    $('#main_loader').show();
    
    //set the actual selected page with color
    $('#page-selection-number-'+page).css('color', '#00c4ff');

    // hit artwork archive public api
    var final_url = api_url + artist_slug + '?page=' + page + '&page_size=' + page_size;
    var html = '';

    //call api pieces with pagination
    $.ajax({
        url: final_url,
        complete: function (response) {
            //if response success parse json response to HTML
            var json_decoded = JSON.parse(response.responseText);
            $('#aawp-user-slug').val("");
            $('#aawp-user-slug').val(artist_slug);
            generateHTMLForPieces(json_decoded);
            generateHTMLForPagination(json_decoded);
            $('#main_loader').hide();
        },
        error: function () {
            console.log('TODO: there was an error!');
            $('#main_loader').hide();
        },
    });
    return false;
}