const Sanscript = require('@indic-transliteration/sanscript');

const dictionary = {
  'ಎ': 'a',
  'ಬಿ': 'b',
  'ಸಿ': 'c',
  'ಡಿ': 'd',
  'ಇ': 'e',
  'ಎಫ್': 'f',
  'ಜಿ': 'g',
  'ಎಚ್': 'h',
  'ಹೆಚ್': 'h',
  'ಹೆಚ್.': 'h.',
  'ಐ': 'i',
  'ಜೆ': 'j',
  'ಕೆ': 'k',
  'ಎಲ್': 'l',
  'ಎಂ': 'm',
  'ಎನ್': 'n',
  'ಒ': 'o',
  'ಪಿ': 'p',
  'ಕ್ಯೂ': 'q',
  'ಆರ್': 'r',
  'ಎಸ್': 's',
  'ಟಿ': 't',
  'ಯು': 'u',
  'ವಿ': 'v',
  'ಡಬ್ಲ್ಯೂ': 'w',
  'ವೈ': 'y',
  'ಎ.': 'a.',
  'ಬಿ.': 'b.',
  'ಸಿ.': 'c.',
  'ಡಿ.': 'd.',
  'ಇ.': 'e.',
  'ಎಫ್.': 'f.',
  'ಜಿ.': 'g.',
  'ಎಚ್.': 'h.',
  'ಐ.': 'i.',
  'ಜೆ.': 'j.',
  'ಕೆ.': 'k.',
  'ಎಲ್.': 'l.',
  'ಎಂ.': 'm.',
  'ಎನ್.': 'n.',
  'ಒ.': 'o.',
  'ಪಿ.': 'p.',
  'ಕ್ಯೂ.': 'q.',
  'ಆರ್.': 'r.',
  'ಎಸ್.': 's.',
  'ಟಿ.': 't.',
  'ಯು.': 'u.',
  'ವಿ.': 'v.',
  'ಡಬ್ಲ್ಯೂ.': 'w.',
  'ವೈ.': 'y.',
}
// Function to transliterate Kannada text to English
function transliterateKannadaToEnglish(kannadaText) {
  // Transliterate Kannada text to English
  return Sanscript.t(kannadaText, 'kannada', 'itrans_dravidian'); 
}

function capitalizeFirstLetter(word) {
    if (word.length === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function addSpaceBetweenEnglishLetters(text) {
    const englishLettersRegex = /([a-zA-Z])/g;

    return text.replace(englishLettersRegex, '$1 ').trim();
}
function checkInitials(word) {
  if (dictionary[word]) {
    return dictionary[word];
  }
  return word;
}

const convertKanToEng = (kannadaText) => {
    const words = addSpaceBetweenEnglishLetters(kannadaText).split(" ");
  const englishWords = [];
  words.forEach(word => {
    word = checkInitials(word);
    englishWords.push(capitalizeFirstLetter(transliterateKannadaToEnglish(word).toLowerCase()));
  })
    const englishText = englishWords.join(" ");
    return englishText;
}


module.exports = convertKanToEng;
