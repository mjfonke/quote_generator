const quoteBox = document.getElementById('quote-box');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get Quotes From API
let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quoteBox.hidden = true;
}

// hide Loading
function complete() {
    quoteBox.hidden = false;
    loader.hidden = true;
}

// generate new quote
function newQuote() {
    loading();
    const randNum = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[randNum];
    if (!quote.author) {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // console.log(quote);
    // set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
};

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch (err) {
        // handling errors

    }

    complete();
};

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank');
};

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
getQuotes();
