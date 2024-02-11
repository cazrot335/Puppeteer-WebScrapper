import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';

const app = express();
app.use(cors()); // Add this line

// ... rest of your code

let quotes = []; // This should be your scrapped quotes

app.get('/quotes', (req, res) => {
  res.json(quotes);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

const getQuotes = async () => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto("http://quotes.toscrape.com/", {
        waitUntil: "domcontentloaded",
    });

    quotes = await page.evaluate(() => {
        const quoteElements = document.querySelectorAll(".col-md-8 .quote");
        const quotes = [];

        quoteElements.forEach((quoteElement) => {
            const textElement = quoteElement.querySelector(".text");
            const authorElement = quoteElement.querySelector(".author");

            if (textElement && authorElement) {
                const text = textElement.innerText;
                const author = authorElement.innerText;
                const quote = { text, author };
                quotes.push(quote);
            }
        });

        return quotes;
    });

    // console.log(quotes);
    await browser.close();
};

getQuotes();
