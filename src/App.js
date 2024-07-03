/**  https://api.coinpaprika.com/v1/tickers : coin API url */

import { useState, useEffect } from 'react';

function App() {
    const [loading, setLoading] = useState(true); // 데이터 로딩
    const [coins, setCoins] = useState([]); // 모든 코인 데이터 저장
    const [userInput, setUserInput] = useState(''); // 사용자 입력값 저장
    const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장

    useEffect(() => {
        fetch('https://api.coinpaprika.com/v1/tickers')
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setLoading(false);
                // console.log(json.map((coin) => coin.symbol));
            });
    }, []);

    /** async await , try catch 변경 */
    // useEffect(() => {
    //     const fetchCoins = async () => {
    //         try {
    //             const response = await fetch('https://api.coinpaprika.com/v1/tickers');
    //             const json = await response.json();
    //             setCoins(json);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Failed to fetch coins:', error);
    //         }
    //     };

    //     fetchCoins();
    // }, []);

    const handleSearch = (event) => {
        const inputValue = event.target.value.toLowerCase(); // 입력값을 소문자로 변환
        setUserInput(inputValue);
        if (inputValue.trim() === '') {
            setSearchResults([]); // 입력값이 없으면 검색 결과 빈 배열
        } else {
            const results = coins.filter((coin) => coin.symbol.toLowerCase().includes(inputValue));
            setSearchResults(results);
        }
    };

    return (
        <div className="coinContainer">
            <h1>The Coins {loading ? '' : `: ${coins.length}`}</h1>
            {loading ? (
                <strong>Loading...</strong>
            ) : (
                <select>
                    {coins.map((coin, index) => (
                        <option key={coin.id}>
                            {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
                        </option>
                    ))}
                </select>
            )}
            <hr />
            <input
                className="coinInput"
                onChange={handleSearch}
                value={userInput}
                type="text"
                placeholder="Search coins"
            />
            <div className="coinResult">
                {searchResults.map((coin) => (
                    <div key={coin.id}>
                        <p>
                            {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
