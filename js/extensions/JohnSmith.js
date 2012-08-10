//copac.js
//Extension to launch search of John Smith Bookshop based on meta value of 'ISBN'.
//Adapted from the standard copac extension 26/4/12.  Tim Graves

//Note: This version of the extension

//Constructor arguments:
//arg: src - url to logo to display in selection panel
//arg: text - text to display in selection panel
//arg: target - selector to append this link to

function JohnSmithJuice(target, src,text){

    text=text || "Search the University Bookshop";

    if(juice.hasMeta("isbns")){
        var isbns = juice.getMeta("isbns");
        var selString = isbns[0];
        var url = "http://www.jscampus.co.uk/shop/product_display.asp?productID=" + escape(selString);

        var html = '<a href="'+url+'" class="JohnSmithLink"><img src="'+src+'" alt="'+text+'" title="'+text+'"></a>';
        var link=$(html);

        $(target).append(link);

    }

}