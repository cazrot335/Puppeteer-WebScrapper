import puppeteer from "puppeteer";

const getQuotes = async () => {
    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will in full width and height)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    // On this new page:
    // - open the "http://quotes.toscrape.com/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto("http://quotes.toscrape.com/", {
        waitUntil: "domcontentloaded",
    });

    // Get page data
    const quotes = await page.evaluate(() => {
        // Fetch all elements with class "col-md-8"
        const quoteElements = document.querySelectorAll(".col-md-8 .quote");

        // Create an array to store the quotes
        const quotes = [];

        // Loop through each quote element
        quoteElements.forEach((quoteElement) => {
            // Fetch the sub-elements from the quote element
            // Get the displayed text and author (`.innerText`)
            const textElement = quoteElement.querySelector(".text");
            const authorElement = quoteElement.querySelector(".author");

            // Check if the elements exist before accessing their `innerText` properties
            if (textElement && authorElement) {
                const text = textElement.innerText;
                const author = authorElement.innerText;

                // Create an object with the quote details
                const quote = { text, author };

                // Add the quote to the quotes array
                quotes.push(quote);
            }
        });

        return quotes;
    });

    // Display the quotes
    console.log(quotes);

    // Close the browser
    await browser.close();

    return quotes;
};

// Start the scraping
getQuotes();
