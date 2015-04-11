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
        $('.dalila_popover').show().html(result.stem.gloss).css({top:y, left:x})
    });
}



function dalilaProcess(word, callback) {

    var result = {
        prefix: {
            name: 'wmbt',
            category: 'Pref-IV-yu-ELSE',
            diac: 'wimA_bitu',
            bw: 'wi/PART/NEG_PART/PROG_PART/IV2MS',
            gloss: 'so/and_+_not_+_[present-tense]_+_you_',
            pos: 'verb'
        },
        suffix: {
            name: 'km',
            category: 'Suff-NOM-stem-V-POSS',
            diac: 'kum',
            bw: 'kum/POSS_PRON_2P',
            gloss: 'your_'

        },
        stem: {
            name: 'brA',
            category: 'N',
            diac: 'barA',
            lex:'bariy_1',
            bw:'barA/ADJ',
            gloss:'innocent;exempt_',
            pos:'adj'
        }
    };

    callback(result);
};