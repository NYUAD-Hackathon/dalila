// chrome.extension.sendMessage({}, function(response) {
// 	var readyStateCheckInterval = setInterval(function() {
// 	if (document.readyState === "complete") {
// 		clearInterval(readyStateCheckInterval);

// 		// ----------------------------------------------------------
// 		// This part of the script triggers when page is done loading
// 		console.log("Hello. This message was sent from scripts/inject.js");
// 		// ----------------------------------------------------------

// 	}
// 	}, 10);
// });

$(document).ready(function() {

    var popover = $("<div>").addClass('dalila_popover').hide();
    $('body').append(popover);


    // var p = $('*');
    // p.css({ cursor: 'pointer' });

    $(document).on('dblclick', '*', dblclickHandler);

    function dblclickHandler(e) {
        var range = window.getSelection() || document.getSelection() || document.selection.createRange();
        var word = $.trim(range.toString());
        if(word != '') {
            showPopover(word, event.pageX, event.pageY);
        }
        try {
            range.collapse();
        } catch(e) {}
        e.stopPropagation();
    }

});


function isArabic(str) {
    var chars = str.match("[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]");
    return !(chars==null);
}

function showPopover(word, x, y) {

    if(!isArabic(word)) return;

        dalilaProcess(word, function(result) {

        jQuery(document).one('mousemove', function(e) {
            $('.dalila_popover').hide();
        });

        var popover = $('.dalila_popover');


        var html = "";
        if(result.word == undefined && result.diac == undefined) {
            html = '<div class="dalila_gloss">Unknown word.</div>';
        } else {
            result.gloss = clean(result.gloss);
            html += '<div><div class="dalila_head">'+ result.diac +'</div><div class="dalila_lex"><span>(' + result.pos + ') </span>' + result.lex + '</div><div class="dalila_gloss">' + result.gloss + '</div></div>';
        }

        html += '<a href="http://visitabudhabi.ae/en/default.aspx" href="_blank"><img src="'+ chrome.extension.getURL('icons/ad.jpg') +'" /></a>';

        popover.html(html);

        popover.css('background-image', 'url(' + chrome.extension.getURL('icons/icon48.png') + ')');

        popover.show();

        popover.css({top:0, left:0})


        if($(window).width() - x < $(popover).width()) {
            popover.css({right:0, left:'auto'})
        } else if(x < $(popover).width()) {
            popover.css({left:0, right:'auto'})
        } else {
            x = x - popover.width()/2;
            popover.css({left:x, right:'auto'})
        }

        popover.css({width:300})
        y = y + 20;
        popover.css({top:y})

    });
}

function clean(word) {
    word = replaceAll("(\\+|\\_)"," ", word)
    word = replaceAll("(\\;)","/", word)
    return word.replace(/ +(?= )/g,'');
}

function dalilaProcess(word, callback) {

    var result = analyzeSolutions(word);
    // var result = {
    // 	word: 'ومحيكتبهاش',
    // 	diac: 'وِما حَيِكْتِبهاش',
    // 	tok: 'و+ما+ح+يكتب+ها+ش',
    // 	pos: 'verb',
    // 	lex: 'كَتَب',
    // 	gloss: 'and he will not write it',
    // 	lexgloss: 'write'
    // };

    callback(result);
};
