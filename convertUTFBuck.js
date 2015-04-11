function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function toUnicode(text){
//"""The function takes a text and returns a Unicode representation of it"""
 	text = replaceAll( "'" , "\u0621", text)

    text = replaceAll( "|" , "\u0622", text)

    text = replaceAll( ">" , "\u0623", text )

    text = replaceAll( "&" , "\u0624", text)

    text = replaceAll( "<" , "\u0625", text)

    text = replaceAll( "}" , "\u0626", text)

    text = replaceAll( "A" , "\u0627", text)

    text = replaceAll( "b" , "\u0628", text)

    text = replaceAll( "p" , "\u0629", text)

    text = replaceAll( "t" , "\u062A", text)

    text = replaceAll( "v" , "\u062B", text)

    text = replaceAll( "j" , "\u062C", text)

    text = replaceAll( "H" , "\u062D", text)

    text = replaceAll( "x" , "\u062E", text)

    text = replaceAll( "d" , "\u062F", text)

    text = replaceAll( "*" , "\u0630", text)

    text = replaceAll( "r" , "\u0631", text)

    text = replaceAll( "z" , "\u0632", text)

    text = replaceAll( "s" , "\u0633", text)

    text = replaceAll( "$" , "\u0634", text)

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

    text = replaceAll( "{" , "\u0671", text)

    return text
}

function buckwalter(text){

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
