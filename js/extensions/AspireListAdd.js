//AspireListAdd.js
//Extension to provide a link to add the item to a list on Talis Aspire on meta value of 'ISBN'.


//Constructor arguments:
//arg: target - selector to append this link to
//arg: hostname - hostname of tennacy, e.g. liblists.sussex.ac.uk
//arg: text - text of the link


function AspireListAdd(target, hostname, text){

    text=text || "Bookmark on Aspire Reading Lists";
	target=target || "#footer";
	hostname=hostname || "liblists.sussex.ac.uk";

    if(juice.hasMeta("isbns")){
        var isbns = juice.getMeta("isbns");
        var selString = isbns[0];
        var url = "http://" + hostname + "/ui/forms/bookmarklet.html?rft.isbn=" + escape(selString);

        var html = '<a href="'+url+'" class="AspireLink" target="_blank" id="AspireListAdd">'+text+'</a>';
        var link=$(html);

        $(target).append(link);

    }

}


