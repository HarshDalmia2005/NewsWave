import React, { useState, useEffect, useRef, useCallback } from 'react';
import NewsCard from './NewsCard';
import Loader from './Loader';
import { useParams } from 'react-router-dom';

const TopHeadlines = ({ progress, setProgress }) => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const params = useParams();
    const observer = useRef();

    const handleApi = async () => {
        try {
            setIsLoading(true);
            setProgress(10);
            const paramCategory = params.category ? `category=${params.category}&` : "";
            const response = await fetch(`https://newswave-backend-wzew.onrender.com/news/top-headlines?${paramCategory}page=${page}&language=en&pageSize=4`);
            setProgress(30);
            const news = await response.json();
            setProgress(70);

            if (news.success === false) {
                setError(news.message);
                setIsLoading(false);
                setProgress(100)
                return;
            }

            if (news.message == "No more news to fetch") {
                setIsLoading(false);
                setProgress(100)
                return;
            }

            if (news.data.totalResults > 0) {
                const newsArticles = news.data.articles;
                // setData(prevData => [...prevData, ...newsArticles]);
                setData(prevData => {
                    const combinedData = [...prevData, ...newsArticles];

                    // Remove duplicates based on the article URL
                    const uniqueData = Array.from(new Set(combinedData.map(a => a.url)))
                        .map(url => combinedData.find(a => a.url === url));

                    return uniqueData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
                });
            } else {
                setError('No more news for this category...');
            }
            setProgress(100);
            setIsLoading(false);
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            console.log(err);
        }
    };

    useEffect(() => {
        setPage(1); // Reset page when category changes
        setData([]); // Clear current data when category changes
        handleApi();
    }, [params.category]);

    useEffect(() => {
        if (page > 1) {
            handleApi();
        }
    }, [page]);

    const lastNewsCardElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        }, { threshold: 0.5 });
        if (node) observer.current.observe(node);
    }, [isLoading]);

    return (
        <div>
            <h2 className='font-bold text-white text-3xl mt-28 text-center'>NewsWave - Top Headlines ({(params.category && <span>{params.category}</span>)})</h2>
            <div className="news grid md:grid-cols-4 ml-3 mt-10 gap-2">
                {data.map((item, index) => {
                    if (index === data.length - 1) {
                        return (
                            <div className="newscard" ref={lastNewsCardElementRef} key={index}>
                                <NewsCard
                                    title={item.title}
                                    description={item.description}
                                    publishedAt={item.publishedAt}
                                    author={item.author}
                                    urlToImage={item.urlToImage}
                                    url={item.url}
                                    source={item.source.name}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div className="newscard" key={index}>
                                <NewsCard
                                    title={item.title}
                                    description={item.description}
                                    publishedAt={item.publishedAt}
                                    author={item.author}
                                    urlToImage={item.urlToImage}
                                    url={item.url}
                                    source={item.source.name}
                                />
                            </div>
                        );
                    }
                })}
            </div>
            {isLoading && !error && <Loader />}
            {!isLoading && data.length === 0 && !error && <p className="text-center text-white">No more news for this category...</p>}
            {error && <p className="text-center text-white">{error}...</p>}
        </div>
    );
};

export default TopHeadlines;
