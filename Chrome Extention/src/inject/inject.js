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
        range.collapse();
        e.stopPropagation();
    }

});



function showPopover(word, x, y) {
    dalilaProcess(word, function(result) {

        jQuery(document).one('mousemove', function(e) {
            $('.dalila_popover').hide();
        });

        var popover = $('.dalila_popover');


        var html = "";
        if(result.word == undefined && result.diac == undefined) {
            html = "Unknown word.";
        } else {
            html = '<table style="width: 100%;">';

            var labelsVsResults = [];
            labelsVsResults.push([ "Word" , result.word ])
            labelsVsResults.push([ "Diac" , result.diac ])
            labelsVsResults.push([ "Pos" , result.pos ])
            labelsVsResults.push([ "Lex" , result.lex ])
            labelsVsResults.push([ "Lexgloss" , result.lexgloss ])
            labelsVsResults.push([ "Gloss" , result.gloss ])

            for(var k in labelsVsResults) {
                var label = labelsVsResults[k][0];
                var value = labelsVsResults[k][1];
                html += '<tr><td style="width:80px">' + label + '</td><td>' + value + '</td></tr>';
            }

            html += '</table>';
        }



        popover.html(html);
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
