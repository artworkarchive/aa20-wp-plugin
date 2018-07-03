
var api_url =  "https://www.artworkarchive.com/api/profile/";

var page = 1;
var page_size = 20;

function removePieceQueryParam() {
    if (history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.pushState({ path: newurl }, '', newurl);
    }
}

function generateHTMLHiddensForIndividualPiece(json_decoded)
{
    var html_hiddens = "";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-img' value='" + json_decoded.primary_image_medium_url + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-id' value='" + json_decoded.id + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-name' value='" + json_decoded.name + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-description' value='" + json_decoded.description + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-slug' value='" + json_decoded.slug + "' />";
    html_hiddens += "<input type=hidden id='" + json_decoded.slug + "' value='" + json_decoded.id + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-price' value='" + json_decoded.price + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-inventory_number' value='" + json_decoded.inventory_number + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-subject_matter' value='" + json_decoded.subject_matter + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-framed_height' value='" + json_decoded.framed_height + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-framed_width' value='" + json_decoded.framed_width + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-framed_depth' value='" + json_decoded.framed_depth + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-framed' value='" + json_decoded.framed + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-creation_date_display' value='" + json_decoded.creation_date_display + "' />";
    
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-framed_size_str' value='" + json_decoded.framed_size_str + "' />";
    html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-size_str' value='" + json_decoded.size_str + "' />";
    
    //create collections string
    var piece_colletions = "";
    if (Array.isArray(json_decoded.collections))
    {
        for (var j = 0; j < json_decoded.collections.length; j++)
        {
            piece_colletions += json_decoded.collections[j].name + " ";
        }
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.id + "-hidden-for-collections' value='" + piece_colletions + "' />";
    }

    jQuery('#aawp-data-section').append(html_hiddens);
}

function generateHTMLForPieces(json_decoded)
{
    var html = "";
    var html_hiddens = "";
    jQuery('#aawp-pieces-section').html("");
    jQuery('#aawp-data-section').html("");
    for (var i = 0; i < json_decoded.public_pieces.length; i++) {
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-img' value='" + json_decoded.public_pieces[i].primary_image_large_url + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-id' value='" + json_decoded.public_pieces[i].id + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-name' value='" + json_decoded.public_pieces[i].name + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-description' value='" + json_decoded.public_pieces[i].description + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-slug' value='" + json_decoded.public_pieces[i].slug + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-medium' value='" + json_decoded.public_pieces[i].medium + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-height' value='" + json_decoded.public_pieces[i].height + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-width' value='" + json_decoded.public_pieces[i].width + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-sale_status' value='" + json_decoded.public_pieces[i].sale_status + "' />";

        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-subject_matter' value='" + json_decoded.public_pieces[i].subject_matter + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-framed_height' value='" + json_decoded.public_pieces[i].framed_height + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-framed_width' value='" + json_decoded.public_pieces[i].framed_width + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-framed_depth' value='" + json_decoded.public_pieces[i].framed_depth + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-framed' value='" + json_decoded.public_pieces[i].framed + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-creation_date_display' value='" + json_decoded.public_pieces[i].creation_date_display + "' />";

        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-framed_size_str' value='" + json_decoded.public_pieces[i].framed_size_str + "' />";
        html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-size_str' value='" + json_decoded.public_pieces[i].size_str + "' />";

        //create collections string
        var piece_colletions = "";
        if (Array.isArray(json_decoded.public_pieces[i].collections))
        {
            for (var j = 0; j < json_decoded.public_pieces[i].collections.length; j++)
            {
                piece_colletions += json_decoded.public_pieces[i].collections[j].name + " ";
            }
            html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-collections' value='" + piece_colletions + "' />";
        }

        html_hiddens += "<input type=hidden id='" + json_decoded.public_pieces[i].slug + "' value='" + json_decoded.public_pieces[i].id + "' />";
        if(json_decoded.public_pieces[i].price != undefined)
        {
            html_hiddens += "<input type=hidden id='public-piece-" + json_decoded.public_pieces[i].id + "-hidden-for-price' value='" + json_decoded.public_pieces[i].price + "' />";
        }
        
        html += '<div class="aawp-thumb">' +
        '<a href="?piece=' + json_decoded.public_pieces[i].slug + '">' +
        '<img src="' + json_decoded.public_pieces[i].primary_image_medium_url + '" alt="Public Piece ' + json_decoded.public_pieces[i].name + '"/>' +
        '<div class="aawp-overlay">' +
            '<div class="aawp-overlay-text">' +
                '<ul class="aawp-li-style-none no-pad-bottom">' +
                    '<li>' + json_decoded.public_pieces[i].name + '</li>';
                    if(json_decoded.public_pieces[i].price != undefined)
                    {
                        html +='<li>' + json_decoded.public_pieces[i].price + '</li>';
                    }
        html += '</ul>' +
            '</div>' +
        '</div>' +
        '</a>' +
      '</div>';
    }
    jQuery('#aawp-data-section').html(html_hiddens);
    jQuery('#aawp-pieces-section').html(html);
    salvattore.registerGrid(document.querySelector('#aawp-pieces-section'));

    // Handle modal closing url updates.
    jQuery(document).on(jQuery.modal.AFTER_CLOSE, function (event, modal) {
        // clear piece query param
        removePieceQueryParam();
    });
}

function generateHTMLForPagination(json_decoded)
{
    var user_slug = jQuery('#aawp-user-slug').val();

    jQuery('#aawp-pagination-section').html("");
    var html_pagination_control = "";

    html_pagination_control += '<a style="color:#333;" href="#" onclick="showPrevPublicPiecesPage(&quot;'+user_slug+'&quot;,'+(json_decoded.total_pages)+','+(json_decoded.page_size)+')">«</a>';
    for (var i = 0; i < json_decoded.total_pages; i++) {
        html_pagination_control += '<a style="color: rgb(0, 196, 255);" id="page-selection-number-'+(i+1)+'" href="#" onclick="onPageSelection(&quot;'+user_slug+'&quot;,'+(json_decoded.total_pages)+','+(i+1)+','+(json_decoded.page_size)+');">'+(i+1)+'</a>';
    }
    html_pagination_control += '<a style="color:#333;" href="#" onclick="showNextPublicPiecesPage(&quot;'+user_slug+'&quot;,'+(json_decoded.total_pages)+','+(json_decoded.page_size)+')">»</a>';

    jQuery('#aawp-pagination-section').html(html_pagination_control);
}

function unselectPaginControl(total_pages)
{
    //set all pagination control with black color
    for (var i = 0; i < total_pages; i++) {
        jQuery('#page-selection-number-'+(i+1)).css('color', '#333');
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
    jQuery('#main_loader').show();
    //remove previously selected pages color
    unselectPaginControl(total_pages);
    //set the actual selected page with red color
    jQuery('#page-selection-number-'+page).css('color', '#00c4ff');
    
    var final_url = api_url + artist_slug + '?page=' + page + '&page_size=' + page_size;
    //call api pieces with pagination
    jQuery.ajax({
        url: final_url,
        complete: function (response) {
            var jsonobj = JSON.parse(response.responseText);
            generateHTMLForPieces(jsonobj);
            jQuery('#main_loader').hide();
        },
        error: function () {
            jQuery('#main_loader').hide();
        },
    });
    return false;
}

function isPresent(value) {
    return value !== undefined
        && value !== "undefined"
        && value !== ""
        && value !== null
        && value !== "null";
}

function onIndividualPieceSelection(piece_id){
    
    //if selected piece is present on actual page
    if(isPresent(jQuery("#public-piece-" + piece_id + "-hidden-for-id").val()))
    {
        jQuery("#aawp-popup-piece-image").attr("src","");
        jQuery("#aawp-popup-piece-name").text("");
        jQuery("#aawp-popup-piece-details").html("");

        var piece_id = jQuery("#public-piece-" + piece_id + "-hidden-for-id").val();
        var piece_name = jQuery("#public-piece-" + piece_id + "-hidden-for-name").val();
        var piece_description = jQuery("#public-piece-" + piece_id + "-hidden-for-description").val();
        var piece_price = jQuery("#public-piece-" + piece_id + "-hidden-for-price").val();
        var piece_image = jQuery("#public-piece-" + piece_id + "-hidden-for-img").val();
        //var piece_slug = jQuery("#public-piece-" + piece_id + "-hidden-for-slug").val();

        var piece_medium = jQuery("#public-piece-" + piece_id + "-hidden-for-medium").val();
        var piece_size_str = jQuery("#public-piece-" + piece_id + "-hidden-for-size_str").val();
        //var piece_height = jQuery("#public-piece-" + piece_id + "-hidden-for-height").val();
        //var piece_width = jQuery("#public-piece-" + piece_id + "-hidden-for-width").val();
        var piece_sale_status = jQuery("#public-piece-" + piece_id + "-hidden-for-sale_status").val();
        var piece_price = jQuery("#public-piece-" + piece_id + "-hidden-for-price").val();

        var piece_subject_matter = jQuery("#public-piece-" + piece_id + "-hidden-for-subject_matter").val();
        //var piece_framed_height = jQuery("#public-piece-" + piece_id + "-hidden-for-framed_height").val();
        //var piece_framed_width = jQuery("#public-piece-" + piece_id + "-hidden-for-framed_width").val();
        //var piece_framed_depth = jQuery("#public-piece-" + piece_id + "-hidden-for-framed_depth").val();
        var piece_framed = jQuery("#public-piece-" + piece_id + "-hidden-for-framed").val();
        var piece_framed_size_str = jQuery("#public-piece-" + piece_id + "-hidden-for-framed_size_str").val();
        var piece_creation_date_display = jQuery("#public-piece-" + piece_id + "-hidden-for-creation_date_display").val();
        var piece_collections = jQuery("#public-piece-" + piece_id + "-hidden-for-collections").val();

        var html_ul_details = "<ul class='aawp-li-style-none'>";

        if(isPresent(piece_medium))
        {
            html_ul_details += "<li>" + piece_medium + "</li>";
        }
        if(isPresent(piece_size_str))
        {
            html_ul_details += "<li>" + piece_size_str + "</li>";
        }
        if(isPresent(piece_sale_status))
        {
            html_ul_details += "<li>" + piece_sale_status + "</li>";
        }
        if(isPresent(piece_framed) && isPresent(piece_framed_size_str))
        {
            html_ul_details += "<li>Framed: " + piece_framed_size_str + " </li>";
        }
        if(isPresent(piece_creation_date_display))
        {
            html_ul_details += "<li>Created: " + piece_creation_date_display + "</li>";
        }
        if(isPresent(piece_price))
        {
            html_ul_details += "<li>" + piece_price + "</li>";
        }
        if(isPresent(piece_subject_matter))
        {
            html_ul_details += "<li style='margin-top:2em;'>Subject Matter: " + piece_subject_matter + "</li>";
        }
        if(isPresent(piece_collections))
        {
            html_ul_details += "<li>Collections: " + piece_collections + "</li>";
        }
        if(isPresent(piece_description))
        {
            html_ul_details += "<li style='margin-top:2em;'>" + piece_description + "</li>";
        }
        html_ul_details += "</ul>";

        jQuery("#aawp-popup-piece-image").attr("src",piece_image);
        jQuery("#aawp-popup-piece-name").text(piece_name);
        jQuery("#aawp-popup-piece-details").html(html_ul_details);
    
        //show modal
        jQuery('a.aawp-open-modalpoup-button')[0].click();
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
    var piece_id = jQuery("#"+piece_slug).val();
    if(piece_id != undefined)
    {
        onIndividualPieceSelection(piece_id);
        return true;
    }
    else
    {
        //show loader
        jQuery('#main_loader').show();
        var final_url = api_url + artist_slug + '/piece/' + piece_slug;
        //get piece from the api using the piece slug name directly
        jQuery.ajax({
            url: final_url,
            complete: function (response) {
                //if response success parse json response to HTML
                var json_decoded = JSON.parse(response.responseText);
                generateHTMLHiddensForIndividualPiece(json_decoded);
                onIndividualPieceSelection(json_decoded.id);
                jQuery('#main_loader').hide();
            },
            error: function () {
                jQuery('#main_loader').hide();
            },
        });
    }
}

function onPageLoad(artist_slug)
{

    //show loader
    jQuery('#main_loader').show();

    //create HTML actual page pieces

    // hit artwork archive public api
    var final_url = api_url + artist_slug + '?page=' + page + '&page_size=' + page_size;
    var html = '';

    //call api pieces with pagination
    jQuery.ajax({
        url: final_url,
        complete: function (response) {
            //if response success parse json response to HTML
            var json_decoded = JSON.parse(response.responseText);
            jQuery('#aawp-user-slug').val("");
            jQuery('#aawp-user-slug').val(artist_slug);
            generateHTMLForPieces(json_decoded);
            generateHTMLForPagination(json_decoded);
            
            //read page parameters
            var piece_slug = getUrlVars()["piece"];

            if(piece_slug != undefined)
            {
                var pieceInfo = getIndividualPieceInfo(artist_slug, piece_slug);
            }
            else
            {
                //set the actual selected page with color
                jQuery('#page-selection-number-'+page).css('color', '#00c4ff');
            }

            jQuery('#main_loader').hide();

        },
        error: function () {
            jQuery('#main_loader').hide();
            return false;
        },
    });
    
    return false;
}