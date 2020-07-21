import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons/';

import axios from 'axios';

export default function QuoteBox() {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [color, setColor] = useState('');

    const colors = [
        '#7fdbda',
        '#006a71',
        '#6a2c70',
        '#febf63',
        '#221f3b',
        '#6f4a8e',
        '#99b898',
        '#ff847c',
        '#e84a5f',
        '#900d0d',
    ];

    const handleClick = () => {
        axios
            .get(
                'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
            )
            .then((res) => {
                // Random number
                const quotes = res.data.quotes;

                let randQuote;
                do {
                    randQuote = Math.floor(Math.random() * 102);
                } while (quotes[randQuote].quote === quote);

                let randColor;
                do {
                    randColor = Math.floor(Math.random() * 10);
                } while (colors[randColor] === color);

                setQuote(quotes[randQuote].quote);
                setAuthor(quotes[randQuote].author);
                setColor(colors[randColor]);
            });
    };

    useEffect(() => {
        handleClick();
    }, []);

    useEffect(() => {
        document.querySelector('.container').style.backgroundColor = color;
        document.querySelector('#quote-box').style.color = color;
        document.querySelector('#tweet-quote').style.backgroundColor = color;
        document.querySelector('#tumblr-quote').style.backgroundColor = color;
        document.querySelector('#new-quote').style.backgroundColor = color;
    });

    const twitterUrl =
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + quote + '" ' + author);

    const tubmlrUrl =
        'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
        encodeURIComponent(author) +
        '&content=' +
        encodeURIComponent(quote) +
        '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button';

    return (
        <div className='container'>
            <div id='quote-box'>
                <h3 id='text'>
                    <FontAwesomeIcon icon={faQuoteLeft} /> {quote}
                </h3>
                <p id='author'>- {author}</p>
                <div className='footer'>
                    <a href={twitterUrl} target='__blank' id='tweet-quote'>
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href={tubmlrUrl} target='__blank' id='tumblr-quote'>
                        <FontAwesomeIcon icon={faTumblr} />
                    </a>
                    <button onClick={handleClick} id='new-quote'>
                        New Quote
                    </button>
                </div>
            </div>
        </div>
    );
}
