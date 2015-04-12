# Dalila
The Arabic Dialect Guide

##Description
Dalila utilizes cutting edge NLP research to help people learning Arabic and non-dialect speakers through a chrome extension that provides word analysis and definitions. 

##Usage
1. Users are only required to have chrome browser which has the extension added.
2. Double click on any Arabic word on the webpage then the extension will provide:
  * Diacritized form.
  * Part-of-speach.
  * English definition.
  

##Extension Components
####Frontend:
  * An Arabic word gets deteced as Arabic text once its double clicked by the user. 
  * The selected word will be sent to the backend to get the analysis.
  * The analysis will be displayed in pop-up box.

####Backend:
  * Receive the word from the frontend.
  * The word will be segmeted into "Prefix+Stem+Suffix"
  * Each part will be checked against a dictionary to find multiple possible valid forms.
  * The form with the highest probability gets selected with its respective definition and part-of-speech.
    * Probabilities are obtained from Arabic natural language processing research
  * All analysis is sent to the front end.



