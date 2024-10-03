"use client";
import { useState, useEffect } from 'react';

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const storeData = 'productData';
    const storeDataTime = 'productDataTime'; 
    const dataDuration = 9000; 

    useEffect(() => {
        const cachedData = localStorage.getItem(storeData);
        const cachedTime = localStorage.getItem(storeDataTime);
        const currentTime = Date.now();

        if (cachedData && cachedTime) {
            const isCacheValid = currentTime - parseInt(cachedTime) < dataDuration;
            if (isCacheValid) {
                setData(JSON.parse(cachedData)); 
                return;
            }else {
                localStorage.removeItem(storeData);
                localStorage.removeItem(storeDataTime);
            }
        }
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const cachedData = localStorage.getItem(storeData);
            const cachedTime = localStorage.getItem(storeDataTime);
            const currentTime = Date.now();

            if (cachedData && cachedTime) {
                const isCacheValid = currentTime - parseInt(cachedTime) < dataDuration;
                if (isCacheValid) {
                    setData(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }else {
                    localStorage.removeItem(storeData);
                    localStorage.removeItem(storeDataTime);
                }
            }

            const response = await fetch('https://dummyjson.com/products/1'); 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const fetchedData = await response.json();
            localStorage.setItem(storeData, JSON.stringify(fetchedData));
            localStorage.setItem(storeDataTime, Date.now().toString()); 
            setData(fetchedData);
        } catch (err:any) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Data Fetching with Caching</h1>
            <button onClick={fetchData}>Fetch Data</button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}
