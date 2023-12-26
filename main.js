const outTxtBox = document.getElementById("outTxt");
const inTxtBox = document.getElementById("inTxt");
const matchWordsAndPunctuation = /[\p{L}\p{N}]+|[\p{P}\p{S}]+|\s+/gu;
const specChar = {"?": "¿", "!": "¡"}
const popup = document.getElementById("popup");

function textReverse(txt) {
    outTxtBox.value = txt.split('\n')
    .map(line => {
      // Use match to find words and punctuation, defaulting to an empty array if no matches are found
      const tokens = line.match(matchWordsAndPunctuation) || [];
      return tokens
        .map(token => {
          if (/[\p{L}\p{N}]/u.test(token)) {
            // It's a word, reverse it using Array.from() for correct Unicode handling
            return Array.from(token).reverse().join('');
          } else {
            // It's punctuation or space, return as is
            return token in specChar ? specChar[token] : token;
          }
        })
        .join('');
    })
    .join('\n');
}

function copyToClipboard() {
    // Use the Clipboard API to copy the text
    navigator.clipboard.writeText(outTxtBox.value).then(() => {
        console.log('Text copied to clipboard');
        popup.classList.add("show");
        setTimeout(function() {
            popup.classList.remove("show");
          }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

function clearText() {
    inTxtBox.value = "";
    outTxtBox.value = "";
}
