//LOCALHOST
//var api_url = "http://localhost:6020/api/profile/";
//STAGING ENVIRONMENT
var api_url =  "https://staging.artworkarchive.com/api/profile/";

var page = 1;
var page_size = 5;

function generateHTMLHiddensForIndividualPiece(json_decoded)
{
    var html_hiddens = "";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-img' value='" + json_decoded.primary_image_medium_url + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-id' value='" + json_decoded.id + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-name' value='" + json_decoded.name + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-slug' value='" + json_decoded.slug + "' />";
    html_hiddens += "<input type=hidden id='" + json_decoded.slug + "' value='" + json_decoded.id + "' />";
    if(json_decoded.price != undefined)
    {
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-price' value='" + json_decoded.price + "' />";
    }
    if(json_decoded.inventory_number != undefined)
    {
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-inventory_number' value='" + json_decoded.inventory_number + "' />";
    }
    $('#aawp-data-section').append(html_hiddens);
}

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
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-description' value='" + json_decoded.public_pieces[i].description + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-slug' value='" + json_decoded.public_pieces[i].slug + "' />";
        html_hiddens += "<input type=hidden id='" + json_decoded.public_pieces[i].slug + "' value='" + json_decoded.public_pieces[i].id + "' />";
        if(json_decoded.public_pieces[i].price != undefined)
        {
            html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-price' value='" + json_decoded.public_pieces[i].price + "' />";
        }
        
        html += '<div class="aawp-thumb">' +
        '<a href="?piece=' + json_decoded.public_pieces[i].slug + '">' +
        '<img src="' + json_decoded.public_pieces[i].primary_image_medium_url + '" alt="Public Piece ' + json_decoded.public_pieces[i].name + '">' +
        '<div class="aawp-overlay">' +
            '<div class="aawp-overlay-text">' +
                '<ul>' +
                    '<li>' + json_decoded.public_pieces[i].name + '</li>';
                    if(json_decoded.public_pieces[i].price != undefined)
                    {
                        html +='<li>' + json_decoded.public_pieces[i].price + '</li>';
                    }
                    //html +='<li><span onclick="onIndividualPieceSelection(' + json_decoded.public_pieces[i].id + ')"> View </span></li>' +
                '</ul>' +
            '</div>' +
        '</div>' +
        '</a>' +
      '</div>';
      //console.log(html);
    }
    $('#aawp-data-section').html(html_hiddens);
    $('#aawp-pieces-section').html(html);
    salvattore.registerGrid(document.querySelector('#aawp-pieces-section'));
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
    
    //if selected piece is present on actual page
    if($("#public-piece-" + piece_id + "-hidden-for-id").val() != undefined && $("#public-piece-" + piece_id + "-hidden-for-id").val() != '')
    {
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
        var piece_slug = $("#public-piece-" + piece_id + "-hidden-for-slug").val();
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
        if($("#public-piece-" + piece_id + "-hidden-for-description").val() !== undefined && $("#public-piece-" + piece_id + "-hidden-for-description").val() !== "undefined" && $("#public-piece-" + piece_id + "-hidden-for-description").val() !== "" && $("#public-piece-" + piece_id + "-hidden-for-description").val() !== null && $("#public-piece-" + piece_id + "-hidden-for-description").val() !== "null")
        {
            var description = $("#public-piece-" + piece_id + "-hidden-for-description").val();
            html_ul_details += "<li>Description: " + description + "</li>";
            console.log( "description: " + description);
        }
        html_ul_details += "</ul>";
        console.log("piece_id: "+piece_id);
        console.log("piece_name: "+piece_name);
        console.log("piece_image: "+piece_image);
        console.log("piece_slug: "+piece_slug);
        $("#aawp-popup-piece-image").attr("src",piece_image);
        $("#aawp-popup-piece-name").text(piece_name);
        $("#aawp-popup-piece-details").html(html_ul_details);
    
        //show modal
        $('a.aawp-open-modalpoup-button')[0].click();
        console.log("modal opened!");
        //window.location.href = '?slug='+piece_slug+'"#aa-wp-global-piece-viewer-modal-popup';
        //window.location.href = '?show=1&slug='+piece_slug;
    }
}

function removeUrlParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

function getUrlVars()
{
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getIndividualPieceInfo(artist_slug, piece_slug)
{
    var piece_id = $("#"+piece_slug).val();
    if(piece_id != undefined)
    {
        console.log('piece is already cached');
        onIndividualPieceSelection(piece_id);
        return true;
    }
    else
    {
        //show loader
        $('#main_loader').show();
        var final_url = api_url + artist_slug + '/piece/' + piece_slug;
        //get piece from the api using the piece slug name directly
        $.ajax({
            url: final_url,
            complete: function (response) {
                //if response success parse json response to HTML
                var json_decoded = JSON.parse(response.responseText);
                console.log(json_decoded);
                generateHTMLHiddensForIndividualPiece(json_decoded);
                onIndividualPieceSelection(json_decoded.id);
                $('#main_loader').hide();
            },
            error: function () {
                console.log('TODO: there was an error!');
                $('#main_loader').hide();
            },
        });
    }
}

function onPageLoad(artist_slug)
{
    //var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
    /*var url_string = window.location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get("c");
    */

    //show loader
    $('#main_loader').show();

    //create HTML actual page pieces

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
            
            //read page parameters
            var piece_slug = getUrlVars()["piece"];
            //console.log("url paramters (slug): " + slug);

            if(piece_slug != undefined)
            {
                console.log("View A Single Piece....");
                var pieceInfo = getIndividualPieceInfo(artist_slug, piece_slug);
                console.log("pieceInfo: "+ pieceInfo);
            }
            else
            {
                console.log("View ALL Pieces....");
                //set the actual selected page with color
                $('#page-selection-number-'+page).css('color', '#00c4ff');
            }

            $('#main_loader').hide();

        },
        error: function () {
            console.log('TODO: there was an error!');
            $('#main_loader').hide();
            return false;
        },
    });
    
    return false;
}