import { useState } from "react";
import axios from "axios";

import ExchangeRate from "./ExchangeRate";

const CurrencyConverter = () => {
    const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"];
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState("BTC");
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] =
        useState("BTC");
    const [amount, setAmount] = useState(1);
    const [result, setResult] = useState(0)
    const [exchangedData, setExchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0
    })
    
    // console.log(exchangeRate);

    const convert = () => {
        const options = {
          method: 'GET',
          url: `https://api.coinbase.com/v2/exchange-rates?currency=${chosenPrimaryCurrency}`,
        };
        
        axios.request(options).then( (response) => {

            setResult(response.data.data.rates[chosenSecondaryCurrency] * amount)

            setExchangedData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: response.data.data.rates[chosenSecondaryCurrency]
            })
            
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className="currency-converter">
            <h2>CurrencyConverter</h2>
            <div className="currency-converter_wrapper">
            <div className="input-box">
                <table>
                    <tbody>
                        <tr>
                            <td>Primary Currency:</td>
                            <td>
                                <input
                                    type="number"
                                    name="currency-amount-1"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </td>
                            <td>
                                <select
                                    value={chosenPrimaryCurrency}
                                    name="currency-option-1"
                                    className="currency-options"
                                    onChange={(e) =>
                                        setChosenPrimaryCurrency(e.target.value)
                                    }
                                >
                                    {currencies.map((currency, _index) => (
                                        <option key={_index}>{currency}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>Secondary Currency:</td>
                            <td>
                                <input
                                    type="number"
                                    name="currency-amount-2"
                                    value={result}
                                    disabled={true}
                                />
                            </td>
                            <td>
                                <select
                                    value={chosenSecondaryCurrency}
                                    name="currency-option-2"
                                    className="currency-options"
                                    onChange={(e) =>
                                        setChosenSecondaryCurrency(
                                            e.target.value
                                        )
                                    }
                                >
                                    {currencies.map((currency, _index) => (
                                        <option key={_index}>{currency}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button id="convert-button" onClick={convert}>
                    Convert
                </button>
            </div>
            <ExchangeRate 
                exchangedData={exchangedData}
            />
            </div>
        </div>
    );
};

export default CurrencyConverter;
