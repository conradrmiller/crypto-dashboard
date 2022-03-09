import { useEffect, useState } from "react";
import axios from "axios";

const NewsFeed = () => {
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const options = {
            method: "GET",
            url: "https://www.reddit.com/r/CryptoCurrency/hot.json?limit=10",
        };

        axios
            .request(options)
            .then((response) => {
                // console.log(response.data.data.children);
                setArticles(response.data.data.children);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // console.log('articles:', articles);



    return (
        <div className="news-feed">
            <h2>News Feed</h2>
            {articles?.map((article, _index) => (
                <div key={_index} className="news-feed_item">
                    <a href={article.data.url}><p className="news-feed_text">{article.data.title}</p></a>
                </div>
            ))}
        </div>
    );
};

export default NewsFeed;
