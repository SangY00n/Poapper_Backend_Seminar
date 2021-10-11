const fs = require('fs');

const myTextbook = {
    "title": "Computer Systems",
    "author": ["Randal E. Bryant",
        "David R. O'Hallaron"
    ],
    "publisher": "PEARSON"
};
const textbookJSON = JSON.stringify(myTextbook);

const textbook = fs.writeFileSync('textbook.json', textbookJSON);