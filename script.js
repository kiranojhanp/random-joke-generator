const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Show Loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide Loading
const complete = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

//  Get Quote from API
const getQuote = async () => {
  loading();
  const apiURL = "https://official-joke-api.appspot.com/random_joke";

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    // manipulating DOM
    authorText.innerText = data.punchline ? data.punchline : "Unknown";
    quoteText.innerText = data.setup;

    //  reducing font size for long quotes
    data.length > 80
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");

    //   Stop Loader and show quote
    complete();
  } catch (error) {
    console.log(`whoops, no quote ${error}`);
  }
};

// Tweet Quote
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterURL, "_blank");
};

// Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//  On Load
getQuote();
