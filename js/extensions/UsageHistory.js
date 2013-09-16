//UsageHistory.js
//Extension to provide a link to usage history using bibid.


//Constructor arguments:
//arg: target - selector to append this link to
//arg: hostname - hostname of bibinfo script, e.g. bibinfo.lib.sussex.ac.uk
//arg: text - text of the link


function UsageHistoryAdd(target, hostname, text){

    text=text || "Usage History";
	target=target || "#footer";
	hostname=hostname || "bibinfo.lib.sussex.ac.uk";

    if(juice.hasMeta("workid")){
        var bibid = juice.getMeta("workid");
        //var selString = isbns[0];
        var url = "http://" + hostname + "/bibinfo/?bibid=" + escape(bibid);

        var html = '| <a href="'+url+'" class="AspireLink" target="_blank" id="UsageHistoryAdd"> '+text+' </a> |';
        var link=$(html);

        $(target).append(link);

    }

}


