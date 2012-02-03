
/**
* Retrieve the correct path for JS files
*/
function prismTenancy(){

	var prism = "";
	var urlParts = window.location.href.split('/');

	if(urlParts[2] == "prism.talis.com"){

		prism = urlParts[3];

		if(prism == 'demo') {
			prism += '/' + urlParts[4]; }
	}

	return prism;
}


/**
* JQuery javascript to perform on page load
*/
jQuery(document).ready(function() {

	// Load the homepage image slider
	jQuery('#slider').coinslider({ width:562, height:438, navigation:false, delay:7000 });
	
	// Load Juice extensions
	juice.setDebug(false);
	juice.googleApiKey("ABQIAAAAKi1cC767naAPtNw6ExDJHBSr1cLuvfmD_hPnfKXXZtPgfYowlRRaiVfGUqzawVB9RWLIPD4MTDzgdw");

	juice.loadJs("http://juice-project.s3.amazonaws.com/extensions/JuiceSimpleInsert.js");
	juice.loadJs("http://juice-project.s3.amazonaws.com/panels/juiceBasicPanel.js");
	juice.loadJs("http://juice-project.s3.amazonaws.com/panels/juiceListPanel.js");

	juice.loadJs("http://juice-project.s3.amazonaws.com/metadefs/talis_prism_metadef.js");
	
	juice.loadJs("http://juice-project.s3.amazonaws.com/extensions/qrcode_juice.js");
	juice.loadJs("http://juice-project.s3.amazonaws.com/extensions/WorldCat.js");
	juice.loadJs("http://juice-project.s3.amazonaws.com/extensions/Amzcouk.js");
	juice.loadJs("http://juice-project.s3.amazonaws.com/extensions/delicious.js");
	juice.loadJs("http://juice-project.s3.amazonaws.com/extensions/copac.js");
	juice.loadJs("http://juice-project.s3.amazonaws.com/extensions/GBSEmbed.js");
	juice.loadJs("http://juice-project.s3.amazonaws.com/extensions/GoogleMap.js");

	juice.loadCss("http://juice-project.s3.amazonaws.com/juiceDefault.css");
	juice.loadCss("http://juice-project.s3.amazonaws.com/juiceOverlay.css");

	juice.loadJs("http://juice-project.s3.amazonaws.com/juiceOverlay-0.3.js");
	
	juice.onAllLoaded(runExtensions);
});


/**
* Builds a QR code image and inserts it before the table in the #details div
*/
function buildQRInsert(){
	
	var div = '<div id="QRwrapper"></div>';
	var insert = new JuiceInsert(div,"#details > .table","before");
	
	new qrcodeJuice(juice, insert, "QRwrapper", "title, location, shelfmark",'\n','s');
}

/** 
* Builds a Google Book Search and inserts it after the table in the #details div 
*/
function buildGBSInsert(){

	var div = '<div id="GBSPanel">' + 
		'<h2 class="title">Look Inside</h2>' + 
		'<div id="GBSViewer">' +
		'</div>' + 
	'</div>';

	var insert = new JuiceInsert(div, "#details .table", "after");
	new GBSEmbedJuice(juice, insert, "GBSViewer");
}

/**
* Builds the extensions link panel and inserts it into the sidebar 
*/
function buildExtensionsPanel(){

	var div = '<div id="extensionsPanel">' +
		'<h2 class="title">Extensions</h2>' +
		'<div id="extContent">' +
		'</div>' +
	'</div>';

	var insert = new JuiceInsert(div,"#itemActions","append");
	//new simpleInsertJuice(juice, insert);
	
	var panel = new JuiceListPanel(insert,"extContent",'juiceXInactiveText','juiceXActiveText',null);
	juice.addPanel(panel);
	

	new worldcatJuice(juice,'http://talis-rjw.s3.amazonaws.com/arielx/images/worldcat.jpg','Search WorldCat',null,"iframe-overlay",insert);
	new amzcoukJuice(juice,'http://library.corporate-ir.net/library/17/176/176060/mediaitems/109/a.co.uk_logo_RGB.jpg','Search Amazon.co.uk');
	new deliciousJuice(juice,'http://talis-rjw.s3.amazonaws.com/arielx/images/Delicious.jpg','Bookmark with Delicious');
	new copacJuice(juice,'http://copac.ac.uk/img/85x67_copac.gif','Search Copac');
}

/**
* Builds the Google Map showing all the library locations
*/
function buildLibraryLocations() {

	var bhamlocs = [
		{ point : {lt: 52.480257, lg: -1.904882}, id : "Birmingham Central Library", 	title : "Birmingham Central Library", body : "Chamberlain Square <br/>Birmingham <br/>B3 3HQ <br/>United Kingdom <br/>"},
    { point : {lt: 52.445041, lg: -1.824157}, id : "Acocks Green Library", 				title : "Acocks Green Library", body : "Shirley Road <br/>Birmingham <br/>B27 7XH <br/>United Kingdom <br/>"},
    { point : {lt: 52.503812, lg: -1.895830}, id : "Aston Library", 							title : "Aston Library", body : "Albert Road <br/>Birmingham <br/>B6 5NQ  <br/>United Kingdom <br/>"},
    { point : {lt: 52.458916, lg: -1.885501}, id : "Balsall Heath Library", 			title : "Balsall Heath Library", body : "Moseley Road <br/>Balsall Heath <br/>Birmingham <br/>B12 9BX  <br/>United Kingdom <br/>"},
    { point : {lt: 52.436064, lg: -1.998500}, id : "Bartley Green Library", 			title : "Bartley Green Library", body : "Adams Hill  <br/>Birmingham <br/>B32 3QG   <br/>United Kingdom <br/>"},
    { point : {lt: 52.514065, lg: -1.901494}, id : "Birchfield Library", 					title : "Birchfield Library", body : "Birchfield Road <br/>Birmingham <br/>B20 3BX  <br/>United Kingdom <br/>"},
    { point : {lt: 52.492326, lg: -1.871659}, id : "Bloomsbury Library", 					title : "Bloomsbury Library", body : "Nechells Parkway  <br/>Birmingham <br/>B7 4PT  <br/>United Kingdom <br/>"},
    { point : {lt: 52.492326, lg: -1.871659}, id : "Boldmere Library", 						title : "Boldmere Library", body : "119 Boldmere Road  <br/>Birmingham <br/>B73 5TU  <br/>United Kingdom <br/>"},
    { point : {lt: 52.521875, lg: -1.784308}, id : "Castle Vale Library", 				title : "Castle Vale Library", body : "Turnhouse Road  <br/>Birmingham <br/>B35 6PR  <br/>United Kingdom <br/>"},
    { point : {lt: 52.407523, lg: -1.889397}, id : "Druids Heath Library", 				title : "Druids Heath Library", body : "Idmiston Croft  <br/>Birmingham <br/>B14 5NJ  <br/>United Kingdom <br/>"},
    { point : {lt: 52.526040, lg: -1.836304}, id : "Erdington Library", 					title : "Erdington Library", body : "Orphanage Road  <br/>Birmingham <br/>B24 9HP <br/>United Kingdom <br/>"},
    { point : {lt: 52.404607, lg: -2.016948}, id : "Frankley Library", 						title : "Frankley Library", body : "Frankley Community High School  <br/>New Street <br/>Birmingham <br/>B45 0EU <br/>United Kingdom <br/>"},
    { point : {lt: 52.490473, lg: -1.794595}, id : "Glebe Farm Library", 					title : "Glebe Farm Library", body : "Glebe Farm Road  <br/>Birmingham <br/>B33 9NA  <br/>United Kingdom <br/>"},
    { point : {lt: 52.433888, lg: -1.846632}, id : "Hall Green Library", 					title : "Hall Green Library", body : "1221 Stratford Road  <br/>Hall Green <br/>Birmingham <br/>B28 9AD  <br/>United Kingdom <br/>"},
    { point : {lt: 52.502470, lg: -1.929348}, id : "Handsworth Library", 					title : "Handsworth Library", body : "Soho Road  <br/>Birmingham <br/>B21 9DP  <br/>United Kingdom <br/>"},
    { point : {lt: 52.458412, lg: -1.951538}, id : "Harborne Library", 						title : "Harborne Library", body : "High Street <br/>Birmingham <br/>B17 9QG <br/>United Kingdom <br/>"},
    { point : {lt: 52.521280, lg: -1.935198}, id : "Hawthorn House Library", 			title : "Hawthorn House Library", body : "Hamstead Hall Road <br/>Birmingham <br/>B20 1HX  <br/>United Kingdom <br/>"},
    { point : {lt: 52.476340, lg: -1.788536}, id : "Kents Moat Library", 					title : "Kents Moat Library", body : "55-57 Pool Way  <br/>Birmingham <br/>B33 8NF  <br/>United Kingdom <br/>"},
    { point : {lt: 52.437616, lg: -1.892956}, id : "Kings Heath Library", 				title : "Kings Heath Library", body : "High Street <br/>Birmingham <br/>B14 7SW  <br/>United Kingdom <br/>"},
    { point : {lt: 52.410133, lg: -1.928275}, id : "Kings Norton Library", 				title : "Kings Norton Library", body : "Pershore Road South <br/>Birmingham <br/>B30 3EU  <br/>United Kingdom <br/>"},
    { point : {lt: 52.551970, lg: -1.885334}, id : "Kingstanding Library", 				title : "Kingstanding Library", body : "Kingstanding Road <br/>Birmingham <br/>B44 9ST  <br/>United Kingdom <br/>"},
    { point : {lt: 52.477699, lg: -1.923630}, id : "Ladywood Community and Health Centre", title : "Ladywood Community and Health Centre", body : "St.Vincent Street West <br/>Birmingham <br/>B16 8RP <br/>United Kingdom <br/>"},
    { point : {lt: 52.587460, lg: -1.824961}, id : "Mere Green Library", 					title : "Mere Green Library", body : "30A Mere Green Road <br/>Birmingham <br/>B75 5BT <br/>United Kingdom <br/>"},
    { point : {lt: 52.414987, lg: -1.967434}, id : "Northfield Library", 					title : "Northfield Library", body : "77 Church Road <br/>Birmingham <br/>B31 2LB <br/>United Kingdom <br/>"},
    { point : {lt: 52.534245, lg: -1.879277}, id : "Perry Common Library", 				title : "Perry Common Library", body : "College Road <br/>Birmingham <br/>B44 0HH <br/>United Kingdom <br/>"},
    { point : {lt: 52.460274, lg: -1.987181}, id : "Quinton Library", 						title : "Quinton Library", body : "Ridgacre Road <br/>Birmingham <br/>B32 2TW  <br/>United Kingdom <br/>"},
    { point : {lt: 52.441217, lg: -1.938360}, id : "Selly Oak Library", 					title : "Selly Oak Library", body : "669 Bristol Road <br/>Birmingham <br/>B29 6AE <br/>United Kingdom <br/>"},
    { point : {lt: 52.495259, lg: -1.776279}, id : "Shard End Library", 					title : "Shard End Library", body : "Shustoke Road <br/>Birmingham <br/>B34 7BA  <br/>United Kingdom <br/>"},
    { point : {lt: 52.461874, lg: -1.783041}, id : "Sheldon Library", 						title : "Sheldon Library", body : "Brays Road <br/>Birmingham <br/>B26 2RJ  <br/>United Kingdom <br/>"},
    { point : {lt: 52.471264, lg: -1.857131}, id : "Small Heath Library", 				title : "Small Heath Library", body : "Muntz Street <br/>Birmingham <br/>B10 9RX  <br/>United Kingdom <br/>"},
    { point : {lt: 52.460079, lg: -1.816621}, id : "South Yardley Library", 			title : "South Yardley Library", body : "Yardley Road <br/>Birmingham <br/>B25 8LT  <br/>United Kingdom <br/>"},
    { point : {lt: 52.449499, lg: -1.864558}, id : "Sparkhill Library", 					title : "Sparkhill Library", body : "641 Stratford Road <br/>Birmingham <br/>B11 4EA  <br/>United Kingdom <br/>"},
    { point : {lt: 52.485375, lg: -1.920819}, id : "Spring Hill Library", 				title : "Spring Hill Library", body : "Spring Hill <br/>Birmingham <br/>B18 7BH  <br/>United Kingdom <br/>"},
    { point : {lt: 52.428866, lg: -1.923553}, id : "Stirchley Library", 					title : "Stirchley Library", body : "Bournville Lane <br/>Birmingham <br/>B30 2JT <br/>United Kingdom <br/>"},
    { point : {lt: 52.562457, lg: -1.823217}, id : "Sutton Coldfield Library", 		title : "Sutton Coldfield Library", body : "Lower Parade <br/>Sutton Coldfield  <br/>Birmingham <br/>B72 1XX  <br/>United Kingdom <br/>"},
    { point : {lt: 52.533668, lg: -1.920055}, id : "Tower Hill Library", 					title : "Tower Hill Library", body : "Tower Hill <br/>Birmingham <br/>B42 1LG  <br/>United Kingdom <br/>"},
    { point : {lt: 52.541079, lg: -1.800714}, id : "Walmley Library", 						title : "Walmley Library", body : "Walmley Road <br/>Sutton Coldfield  <br/>Birmingham <br/>B76 1NP  <br/>United Kingdom <br/>"},
    { point : {lt: 52.494798, lg: -1.835344}, id : "Ward End Library", 						title : "Ward End Library", body : "Washwood Heath Road  <br/>Birmingham <br/>B8 2HF  <br/>United Kingdom <br/>"},
    { point : {lt: 52.439036, lg: -1.968049}, id : "Weoley Castle Library", 			title : "Weoley Castle Library", body : "76 Beckbury Road <br/>Birmingham <br/>B29 5HR  <br/>United Kingdom <br/>"},
    { point : {lt: 52.400592, lg: -1.960125}, id : "West Heath Library", 					title : "West Heath Library", body : "The Fordrough  <br/>Birmingham <br/>B31 3LX  <br/>United Kingdom <br/>"},
    { point : {lt: 52.418648, lg: -1.859168}, id : "Yardley Wood Library", 				title : "Yardley Wood Library", body : "Highfield Road <br/>Birmingham <br/>B14 4DU  <br/>United Kingdom <br/>"} ];


	//$jq('#hpCenterHead').append("Library Locations");
	var div = '<div id="LocMapPanel"></div>';
	var insert = new JuiceInsert(div,"#libraryLocs","append");
	
	var mapOps1 = {
			height 				: "200px",
			width 				: "335px",
			defaultZoom 	: 10,
			defaultCenter	: {lt: 51.481436,lg: -0.085402},
			points 				: bhamlocs };

	new GoogleMapJuice(juice, insert, "libraryLocations", mapOps1);
}


/**
* Run Juice extensions
*/
function runExtensions(){

	talis_prism_metadef();
	
	switch(jQuery("body").attr("id")){
	
		case "index": 				frontPage(); 		break;
		case "searchaction": 	resultsPage();	break;
		case "renderitem":		itemPage();			break;
	}
}

 
/**
* Front Page functionality
*/
function frontPage(){
	buildLibraryLocations();
}

 
/**
* Results Page functionality
*/
function resultsPage(){
}

 
/**
* Item Page functionality
*/
function itemPage(){
	
	buildQRInsert();
	buildGBSInsert();
	buildExtensionsPanel();
}