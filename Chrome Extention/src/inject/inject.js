chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});

$(document).ready(function() {

    var popover = $("<div>").addClass('dalila_popover').hide();
    $('body').append(popover);


    var p = $('p');
    p.css({ cursor: 'pointer' });

    p.dblclick(function(e) {
        var range = window.getSelection() || document.getSelection() || document.selection.createRange();
        var word = $.trim(range.toString());
        if(word != '') {
            showPopover(word, event.pageX, event.pageY);
        }
        range.collapse();
        e.stopPropagation();
    });

});



function showPopover(word, x, y) {
    dalilaProcess(word, function(result) {

        jQuery(document).one('mousemove', function(e) {
            $('.dalila_popover').hide();
        });

        var popover = $('.dalila_popover');


        popover.show();
        popover.html( JSON.stringify(result) );

        var html = JSON.stringify(result);
        popover.html(html)

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



function dalilaProcess(word, callback) {

    var result = {
    	word: 'ومحيكتبهاش',
    	diac: 'وِما حَيِكْتِبهاش',
    	tok: 'و+ما+ح+يكتب+ها+ش',
    	pos: 'verb',
    	lex: 'كَتَب',
    	gloss: 'and he will not write it',
    	lexgloss: 'write'
    };

    callback(result);
};
