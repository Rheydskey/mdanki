const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * @returns {string} File data digest
 */
function checksum(file_path) {
  return crypto
    .createHash('md5')
    .update(fs.readFileSync(file_path), 'utf8')
    .digest('hex');
}

const highlightDefault = '_' + checksum(path.resolve(__dirname, "../../resources/default.css")) + '.css';
const highlightDark = '_' + checksum(path.resolve(__dirname, "../../resources/dark.css")) + '.css';
const prismJs = '_' + checksum(path.resolve(__dirname, "../../resources/prism.js")) + '.js';
const highlightJs = '_' + checksum(path.resolve(__dirname, "../../resources/highlight.js")) + '.js';

const settings = {
  code: {
    defaultLanguage: 'bash',
    template       : 'dark', // [default | dark]
  },
  card: {
    separator         : '(?=^##\\s)',
    frontBackSeparator: '%',
    tagPattern        : '^\\[#(.*)\\]',
  },
  deck: {
    titleSeparator: '^#\\s',
    defaultName   : 'mdanki',
  },
  template: {
    formats: {
      question: `{{Front}}<link rel="stylesheet" href="${highlightDark}"></link>\n<script>var script;"undefined"==typeof hljs&&((script=document.createElement("script")).src="${prismJs}",script.async=!1,document.head.appendChild(script));\n(script=document.createElement("script")).src="${highlightJs}",script.async=!1,document.head.appendChild(script),document.head.removeChild(script);\n</script>` +
        `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+" crossorigin="anonymous">` + 
        `<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" integrity="sha384-7zkQWkzuo3B5mTepMUcHkMB5jZaolc2xDwL6VFqjFALcbeS9Ggm/Yr2r3Dy4lfFg" crossorigin="anonymous"></script>` + 
        `<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" integrity="sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk" crossorigin="anonymous" onload="renderMathInElement(document.body);"></script>`,
      answer  : '{{FrontSide}}\n\n<hr id="answer">\n\n{{Back}}',
      css     : '.card {\n font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;\n font-size: 16px;\n color: black;\nbackground-color: white;\n}\ncode[class*="language-"],pre[class*="language-"] {\n font-size: 0.9em !important;\n}',
    },
  },
  highlightDefault: highlightDefault,
  highlightDark: highlightDark,
  prismJs: prismJs,
  highlightJs: highlightJs,
};


module.exports = settings;
