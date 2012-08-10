// Localised Juice extention file by Matt Machell

// **********README************
// This file is compatible with Juice version 0.7+
// It assumes you will load Juice after you load jQuery and you use $ not an alias
// It assumes you keep the Juice folder structure intact for easy extension loading
// This file includes the Google Books embed as an example extension

//run on page ready
$(function () {

	//allow showing of debug info. Set to false for your live tenancy
    $.juice.setDebug(true);
    
    //load required extensions from local copy
    $.juice.loadExtensions('JuiceSimpleInsert','GBSEmbed','extendedbyJuice','AspireList','QuickLink');
	$.juice.loadJs("http://prism.talis.com/sussex-ac-sandbox/assets/-/js/panels/juiceListPanel.js");
     $.juice.loadJs("http://prism.talis.com/sussex-ac-sandbox/assets/-/js/panels/juiceBasicPanel.js");
	$.juice.loadCss("http://prism.talis.com/sussex-ac-sandbox/assets/-/js/panels/juiceDefault.css");

	
    //when all are loaded run them
    $.juice.ready(runExtensions);
});

function runExtensions(){
    //run metadefs to scrape needed information
    talis_prism_metadef();

    	//run extensions depending on context
    switch($("body").attr("id")){
        //homepage
        case "index":
            frontPage();
            break;
        
        //search results page
        case "searchaction":
            resultsPage();
            break;
            
            
        //individual item page    
        case "renderitem":
            itemPage();
            break;
    }   

	//add extended by attribution
    new extendedbyJuice(juice);
    
}

function frontPage(){
    // Functionality to run on the catalogue home
}

function resultsPage(){ 
   // Functionality to run on the search results page
}

function itemPage(){        
    // Item Page functionality

    if($.juice.hasMeta()) {   
    	//add htmlboilerplate
	    var div = '<div id="GBSPanel" style="display: block; width: 100%">' + 
	    	'<h2 class="title">Look Inside</h2>' + 
	    	'<div id="GBSViewer" style="width: 100%; height: 800px"></div>' + 
	    	'</div>';
		//add insert
	    var insert = new JuiceInsert(div,"#details ","after");
	    
	    //add embeded google book in insert	    
	    new GBSEmbedJuice($.juice,insert,"GBSViewer");

		//add embedded QR Codes
               // var qrcodediv = '<div id="QRPanel"><div id="QRDiv"></div>';
                //var insert = new JuiceInsert(qrcodediv,"#itemControl .image","append");
                //new qrcodeJuice(juice,insert,"QRDiv","author,title,shelfmark",'\n','s');

        //copac test

 //    $('#itemActions').append('<div class="juiceOtherSources"><h2>Other Sources</h2></div>');
//	new copacJuice('.juiceOtherSources', 'http://copac.ac.uk/img/85x67_copac.gif','Search Copac');

	//John Smith Bookshop
//new JohnSmithJuice('.juiceOtherSources', 'http://www.johnsmith.co.uk/images/jslogo.gif','Search the University of Sussex Bookshop');


    }  
	timeMsg();  
}

		// Link to Aspire Lists
function readingList() {
new AspireListJuice('#itemActions','append','http://liblists.sussex.ac.uk', {title:'Reading Lists', style:'margin-bottom:1em;'});
}

function timeMsg() {
	var t=setTimeout("readingList()",1000);
}






