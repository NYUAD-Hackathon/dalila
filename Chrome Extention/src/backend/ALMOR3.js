//var hash_stem = require('./data.json');
//var hash_prefix = require('./data.json');

//analyzeSolutions("wsyktbwnhA");


function analyzeSolutions(word){

	word = toBuckwalter(word)
	var output = {}; 										//var (@output) = ();
    var solutions = []; 									//var @solutions = ();
    var cnt = 0; 											//var $cnt = 0;


    //// Handle deterministic (trivial) cases
    if(word.match(/^\s*$/) ){								//if ($word =~/^\s*$/){
		//#Word is just whitespace
		return [word];										//[$word];

    }else if (word.match(/[BCceGIJLMOPQRUVWX]/) || word.match(/^(\s|[aiuo\~\`FKN])*$/) ){//}elsif (( $word=~/[BCceGIJLMOPQRUVWX]/ ) || ($word=~/^(\s|[aiuo\~\`FKN])*$/)){
		////  Word is likely a non-Arabic word
		//var hash_res 		= hash["DEFAULT pos:noun"]		//$$hash{"DEFAULT pos:noun"}
		var default_obj 	= {}//hash_res; 				//var %DEFAULT=%{$$hash{"DEFAULT pos:noun"}};
		default_obj.diac 	= word; 						//$DEFAULT{"diac"}=$word;
		default_obj.lex 	= word;// + "_0";					//$DEFAULT{"lex"}=$word."_0";
		default_obj.bw 		= "FOREIGN";			//$DEFAULT{"bw"}=$word."/FOREIGN";
		default_obj.gloss	= word; 						//$DEFAULT{"gloss"}=$word;
		default_obj.source 	= "foreign";					//$DEFAULT{"source"}="foreign";
		return [default_obj];								//return [$analysis];
	}else if (word.match(/\d+/)){							//( $word=~/\d+/ ){
		//  Word contains digits
		//var hash_res 		= hash["DEFAULT pos:digit"]		//$$hash{"DEFAULT pos:digit"}
		var default_obj 	= {}//hash_res; 				//var %DEFAULT=%{$$hash{"DEFAULT pos:digit"}};
		default_obj.diac 	= word; 						//$DEFAULT{"diac"}=$word;
		default_obj.lex 	= word;							//$DEFAULT{"lex"}=$word."_0";
		default_obj.bw 		= "NOUN_NUM";					//$DEFAULT{"bw"}=$word."/NOUN_NUM";
		default_obj.gloss	= word; 						//$DEFAULT{"gloss"}=$word;
		//default_obj.source 	= "digit";					//$DEFAULT{"source"}="digit";
															//var $analysis=&featureHash2Str($$hash{"ORDER"},\%DEFAULT);
		return [default_obj];								//return [$analysis];
	}else if(isPunct(word)){								//elsif ( &isPunct($word) ){
		// Word is a string of punctuation characters (excepting those used by Buckwalter)
		//var hash_res 		= hash["DEFAULT pos:punc"]		//$$hash{"DEFAULT pos:punc"}
		var default_obj 	= {}//hash_res; 				//var %DEFAULT=%{$$hash{"DEFAULT pos:punc"}};
		default_obj.diac 	= word; 						//$DEFAULT{"diac"}=$word;
		default_obj.lex 	= word;							//$DEFAULT{"lex"}=$word."_0";
		default_obj.bw 		= "PUNC";						//$DEFAULT{"bw"}=$word."/PUNC";
		default_obj.gloss	= word; 						//$DEFAULT{"gloss"}=$word;
		//default_obj.source 	= "punc";					//$DEFAULT{"source"}="punc";
															//var $analysis=&featureHash2Str($$hash{"ORDER"},\%DEFAULT);
		return [default_obj]								//return [$analysis];
    }


    var matchword = word.replace(/(\s|[aiuo\~\`FKN\_])/g, "");		//matchword		=~s/(\s|[aiuo\~\`FKN\_])//g;
    var unvocword = matchword;										//var $unvocword=$matchword; #just no voc.
    matchword 	  = matchword.replace(/[>|<\{]/g, "A")				//$matchword=~s/[>|<\{]/A/g;
    matchword 	  = matchword.replace(/Y/g, "y")					//$matchword=~s/Y/y/g;
    matchword 	  = matchword.replace(/p/g, "h")					//$matchword=~s/p/h/g;

    if(matchword == ""){											//if ($matchword eq ""){
		matchword = word;											//$matchword = $word;
    }

    var max_prob = -1000000;
    var segmented = segmentword(matchword);							//var @segmented= @{ &segmentword($matchword,$hash) };
    for(var t=0; t<segmented.length; t++){							//foreach var $segmentation (@segmented) {
	 	var segmentation 	= segmented[t];						//#print "( $segmentation )\n";

		var prefix 			= segmentation[0];							//var ($prefix,$stem,$suffix) = split ("\t",$segmentation);
		var stem 			= segmentation[1];
		var suffix 			= segmentation[2];



	    console.log(prefix + " " + stem + " " + suffix)					//#  print "($prefix,$stem,$suffix)\n";

        var stem_value_list = hash_stem[stem];

	    for (var i in stem_value_list) {								//for(var u=0; u<hash_stem.length; u++){							//foreach var $stem_value (@{$$hash{"stem#$stem"}}){
            var stem_value = stem_value_list[i]
			//var stem_value	= hash_stem[u];
			var cat_b 		= stem_value["category"]					//var  $cat_b = $$stem_value{"XAMACAT"};

            var prefix_value_list = hash_prefix[prefix];

			for (var j in prefix_value_list) {						//for(var v=0; v<hash_prefix.length; v++){					//foreach var $prefix_value (@{$$hash{"pre#$prefix"}}) {
                var prefix_value = prefix_value_list[j];

		    	//var prefix_value 	= hash_prefix[v];
		    	var cat_a 			= prefix_value["category"] 			//var $cat_a = $$prefix_value{"XAMACAT"};

		    	if( table.table_AB[cat_a+"!"+cat_b]  ){ 				//if ( exists($$hash{"tAB#$cat_a $cat_b"}) ) {

                    var suffix_value_list = hash_suffix[suffix];
					for (var k in suffix_value_list) {				//for(var w=0; w<hash_suffix.length; w++){			//foreach var $suffix_value (@{$$hash{"suf#$suffix"}}) {
                        var suffix_value = suffix_value_list[k];
						//var suffix_value 	= hash_suffix[w];

						var cat_c 			= suffix_value["category"];	//var $cat_c = $$suffix_value{"XAMACAT"};

			    		if( table.table_BC[cat_b+"!"+cat_c]  ){
                        								//if ( exists($$hash{"tBC#$cat_b $cat_c"}) ) {
							if(  table.table_AC[cat_a+"!"+cat_c] ){										//if ( exists($$hash{"tAC#$cat_a $cat_c"}) ) {

				    			var voc_str 	= prefix_value.diac + stem_value.diac + suffix_value.diac;	//var $voc_str = $$prefix_value{"diac"}."+".$$stem_value{"diac"}."+".$$suffix_value{"diac"};
                                voc_str = replaceAll('_',' ', voc_str);
                                voc_str = replaceAll('undefined','', voc_str);
                                
				    			// TODO convert BWMorphotactics to javascript
				    			//voc_str		= BWMorphotactics(voc_str)												//$voc_str=&BWMorphotactics($voc_str);

				    			//var $unvoc_str=$voc_str;
				    			var unvoc_str 	= voc_str.replace(/(\s|[aiuo\~\`FKN\_])/g, "");						//$unvoc_str=~s/(\s|[aiuo\~\`FKN\_])//g;

				    			//IGNORE featureMergePSS
				    			//#prefer values in this order: STEM+DEFAULT < prefix < suffix
				    			var analysis 	= {}
				    			analysis.word 	= toUnicode(unvoc_str)

				    			analysis.diac 	= toUnicode(voc_str)
				    			analysis.pos 	= stem_value["pos"]														//var %analysis = %{ &featureMergePSS($prefix_value,$stem_value,$suffix_value) };
                                stem_value["lex"] = stem_value["lex"].replace(/(-[uiao])?\_\d$/, "")
                                analysis.lex = stem_value["lex"]

                                var bw     = prefix_value.bw + "+"+stem_value.bw + "+"+suffix_value.bw;  //var $voc_str = $$prefix_value{"diac"}."+".$$stem_value{"diac"}."+".$$suffix_value{"diac"};
                                console.log("original bw:", bw)
                                
                                //Replace undefined with empty
                                bw = replaceAll('undefined','', bw);

                                //Replace pluses in the beginning with empty
                                bw = replaceAll("^\\++", '', bw)
                                 //Replace pluses in the ending with empty
                                bw = replaceAll("\\++$", '', bw)
                                //Replace double pluses with single pluses
                                bw = replaceAll('\\++', "+", bw);

                                analysis.bw = bw
                                console.log("bw:",bw)


                                var current_prob = -999999;

                                if( lexModel.hasOwnProperty(analysis.lex) && posModel.hasOwnProperty(analysis.bw)){
                                        current_prob = lexModel[analysis.lex] + posModel[analysis.bw]
                                        console.log("lexModel[analysis.lex]:", lexModel[analysis.lex])
                                        console.log("posModel[analysis.bw]:", posModel[analysis.bw])
                                }else if(analysis.bw.match(/NOUN\_PROP/) != null){
                                    current_prob = -200
                                }



                                console.log("analysis.lex:", analysis.lex)
                                console.log("analysis.bw:", analysis.bw)
                                console.log("current_prob:",current_prob)


                                analysis.prob = current_prob; 

				    			analysis.lex 	= toUnicode(analysis.lex)														//var %analysis = %{ &featureMergePSS($prefix_value,$stem_value,$suffix_value) };

				   				analysis.lexgloss = stem_value["gloss"]																//# $analysis{"gloss"} = $$stem_value{"gloss"};

							    analysis.gloss 	= prefix_value["gloss"] + " "+ stem_value["gloss"] + " " + suffix_value["gloss"];	//$analysis{"gloss"} = $$prefix_value{"gloss"}."+".$$stem_value{"gloss"}."+".$$suffix_value{"gloss"};

                                console.log("unvoc_str:", unvoc_str)

                                console.log("analysis:",analysis)

                                console.log("prefix gloss:", prefix_value["gloss"])
                                console.log("stem gloss:", stem_value["gloss"])

                                console.log("suffix gloss:", suffix_value["gloss"])

						
                                //Check if current probablity is greater than the max_segmentation

                                if(current_prob>max_prob){
                                    max_prob = current_prob;

                                    output = analysis;
                                }
							}
			    		}
					}
		    	}
			}
	    }

	}

    //#@output=@{ &trimMalformed(&markMalformed($hash,\@output)) };
    //#@output=@{ &markMalformed($hash,\@output) };

    //#Hard-coded solutions:
    //#CLASS LATIN	pos:latin
    //#CLASS DIGIT	pos:digit
    //#CLASS PUNC	pos:punc
    //#CLASS else	pos:noun_prop

    //#if( @output == 0 ) { print STDERR "NO LEXICAL ANALYSES\n"; }


    // Probably a more efficient way of doing the following step ?
    //@output=@{ &unique(\@output) };
    console.log("selected:", output)
    return output;//return \@output;


}

function BWMorphotactics(str){			//sub BWMorphotactics {
    									//my ($str)=@_;

    //str = str.replace(/^((wa|fa)?(bi|ka)?Al)\+([tvd\*rzs\$SDTZln])/, "$1$4~" )   $str =~ s/^((wa|fa)?(bi|ka)?Al)\+([tvd\*rzs\$SDTZln])/$1$4~/; # not moon letters
    //$str =~ s/^((wa|fa)?lil)\+([tvd\*rzs\$SDTZln])/$1$3~/; # not moon letters
    //$str =~ s/A\+a([pt])/A$1/; # e.g.: Al+HayA+ap
    //$str =~ s/\{/A/g;
    //$str =~ s/\+//g;

    return str;							//return($str);

}

var segmentword = function(str){

    var segmented = [];
    var prefix_len = 0;
    var suffix_len = 0;
    var stem_len = 0;
    var prefix="";
    var suffix="";
    var stem="";
    var str_len = str.length;
    var max_prefix_len = 7;
    var max_suffix_len = 9;
    //var max_prefix_len = hash->{"#MAXPRELEN#"};
    //var max_suffix_len = hash->{"#MAXSUFLEN#"};

    while ( prefix_len <= max_prefix_len ) {
	prefix = str.substr(0, prefix_len);
	if ( hash_prefix.hasOwnProperty(prefix)) {
    // if (exists(hash["pre#$prefix"])) {
	    stem_len = (str_len - prefix_len);
	    suffix_len = 0;
	    while ((stem_len >= 1) && (suffix_len <= max_suffix_len)) {
		stem   = str.substr(prefix_len, stem_len);
		suffix = str.substr((prefix_len + stem_len), suffix_len);
        if (hash_suffix.hasOwnProperty(suffix)) {
//		if (exists(hash["suf#$suffix"])) {
		    segmented.push([prefix , stem , suffix]);
		}
		stem_len--;
		suffix_len++;
	    }
	};
	prefix_len++;
    };
    return segmented;
};

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function toUnicode(text){
//"""The function takes a text and returns a Unicode representation of it"""
 	text = replaceAll( "'" , "\u0621", text)

     text = replaceAll( "\\|" , "\u0622", text)

    text = replaceAll( ">" , "\u0623", text )

    text = replaceAll( "&" , "\u0624", text)

    text = replaceAll( "<" , "\u0625", text)

    text = replaceAll( "\\}" , "\u0626", text)

    text = replaceAll( "A" , "\u0627", text)

    text = replaceAll( "b" , "\u0628", text)

    text = replaceAll( "p" , "\u0629", text)

    text = replaceAll( "t" , "\u062A", text)

    text = replaceAll( "v" , "\u062B", text)

    text = replaceAll( "j" , "\u062C", text)

    text = replaceAll( "H" , "\u062D", text)

    text = replaceAll( "x" , "\u062E", text)

    text = replaceAll( "d" , "\u062F", text)

    text = replaceAll( "\\*" , "\u0630", text)

    text = replaceAll( "r" , "\u0631", text)

    text = replaceAll( "z" , "\u0632", text)

    text = replaceAll( "s" , "\u0633", text)

    text = replaceAll( "\\$" , "\u0634", text)

    text = replaceAll( "S" , "\u0635", text)

    text = replaceAll( "D" , "\u0636", text)

    text = replaceAll( "T" , "\u0637", text)

    text = replaceAll( "Z" , "\u0638", text)

    text = replaceAll( "E" , "\u0639", text)

    text = replaceAll( "g" , "\u063A", text)

    text = replaceAll( "_" , "\u0640", text)

    text = replaceAll( "f" , "\u0641", text)

    text = replaceAll( "q" , "\u0642", text)

    text = replaceAll( "k" , "\u0643", text)

    text = replaceAll( "l" , "\u0644", text)

    text = replaceAll( "m" , "\u0645", text)

    text = replaceAll( "n" , "\u0646", text)

    text = replaceAll( "h" , "\u0647", text)

    text = replaceAll( "w" , "\u0648", text)

    text = replaceAll( "Y" , "\u0649", text)

    text = replaceAll( "y" , "\u064A", text)

    text = replaceAll( "F" , "\u064B", text)

    text = replaceAll( "N" , "\u064C", text)

    text = replaceAll( "K" , "\u064D", text)

    text = replaceAll( "a" , "\u064E", text)

    text = replaceAll( "u" , "\u064F", text)

    text = replaceAll( "i" , "\u0650", text)

    text = replaceAll( "~" , "\u0651", text)

    text = replaceAll( "o" , "\u0652", text)

    text = replaceAll( "`" , "\u0670", text)

    text = replaceAll( "\\{" , "\u0671", text)

    return text
}

function toBuckwalter(text){

     text = replaceAll("\u0621", "'", text)

     text = replaceAll("\u0622", "|", text)

     text = replaceAll("\u0623", ">", text)

     text = replaceAll("\u0624", "&", text)

     text = replaceAll("\u0625", "<", text)

     text = replaceAll("\u0626", "}", text)

     text = replaceAll("\u0627", "A", text)

     text = replaceAll("\u0628","b", text) // baa'

     text = replaceAll("\u0629","p", text) // taa' marbuuTa

     text = replaceAll("\u062A", "t", text) // taa'

     text = replaceAll("\u062B","v", text) // thaa'

     text = replaceAll("\u062C","j", text) // jiim

     text = replaceAll("\u062D","H", text) // Haa'

     text = replaceAll("\u062E", "x", text)// khaa'

     text = replaceAll("\u062F", "d", text)// daal

     text = replaceAll("\u0630", "*", text)// dhaal

     text = replaceAll("\u0631", "r", text)// raa'

     text = replaceAll("\u0632", "z", text)// zaay

     text = replaceAll("\u0633","s", text) // siin

     text = replaceAll("\u0634", "$", text)// shiin

     text = replaceAll("\u0635","S", text) // Saad

     text = replaceAll("\u0636", "D", text)// Daad

     text = replaceAll("\u0637","T", text) // Taa'

     text = replaceAll("\u0638", "Z", text)// Zaa' (DHaa')

     text = replaceAll("\u0639", "E", text)// cayn

     text = replaceAll("\u063A", "g", text)// ghayn

     text = replaceAll("\u0640","_", text) // taTwiil

     text = replaceAll("\u0641","f", text) // faa'

     text = replaceAll("\u0642","q", text) // qaaf

     text = replaceAll("\u0643", "k", text)// kaaf

     text = replaceAll("\u0644", "l", text)// laam

     text = replaceAll("\u0645","m", text) // miim

     text = replaceAll("\u0646","n", text) // nuun

     text = replaceAll("\u0647", "h", text)// haa'

     text = replaceAll("\u0648", "w", text)// waaw

     text = replaceAll("\u0649", "Y", text)// 'alif maqSuura

     text = replaceAll("\u064A", "y", text)// yaa'

     text = replaceAll("\u064B", "F", text)// fatHatayn

     text = replaceAll("\u064C", "N", text) // Dammatayn

     text = replaceAll("\u064D", "K", text)// kasratayn

     text = replaceAll("\u064E", "a", text)// fatHa

     text = replaceAll("\u064F","u", text) // Damma

     text = replaceAll("\u0650", "i", text)// kasra

     text = replaceAll("\u0651", "~", text)// shaddah

     text = replaceAll("\u0652", "o", text)// sukuun

     text = replaceAll("\u0670","`", text) // dagger 'alif

     text = replaceAll("\u0671", "{", text)// waSla

     return text
 }

function isPunct(str) {
    return str.match(/^\s*[\-\=\"\_\:\#\@\!\?\^\/\(\)\[\]\%\;\\\+\.\,]+\s*$/);
}


window.analyzeSolutions = analyzeSolutions;