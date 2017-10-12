# Dalila
The Arabic Dialect Guide

## Description
Dalila is a Chrome extension that utilizes cutting edge natural language processing (NLP) research to help 
learners of Arabic and Arabic dialects by providing dialectal word analysis and definitions. 

## Usage
1. Users can enable Dalila by downloading the Chrome extension.
2. A double click on any Arabic word on the webpage triggers Dalila to provide:
  * Diacritized form.
  * Part-of-speech and dictionary citation form.
  * English definition.
  

## Extension Components
#### Frontend:
  * An Arabic word gets deteced as Arabic text once its double clicked by the user. 
  * The selected word is sent to the backend to get the analysis.
  * The analysis is displayed in pop-up box.

#### Backend:
  * Receive the word from the frontend.
  * The word will be segmeted into "Prefix+Stem+Suffix"
  * Each part will be checked against a dictionary to find multiple possible valid forms.
  * The form with the highest probability gets selected with its respective definition and part-of-speech.
    * Probabilities are obtained from Arabic natural language processing annotated corpora.
  * The dictionaries and probability models are developed by researchers at New York University Abu Dhabi and Columbia University.  
  * Top analysis is sent to the front end.


## NYUAD Hackathon Information 
 * Students: 
    * Hiba Bejaoui, ESPRIT, Tunisia
    * Maeda Hanafi, NYU AD, UAE
    * Fatima Al Neyadi, UAE University, UAE
    * Sara Al Kendi, UAE University, UAE 
 * Presentation requirements: 
    * 4 microphones, computer demonstration 
 * [Presentation slides](https://docs.google.com/presentation/d/1tOl_8XdK3v8lIlrsPqHpMGWvr_zH8KNDx9lIW5xlxMA/edit?usp=sharing)
