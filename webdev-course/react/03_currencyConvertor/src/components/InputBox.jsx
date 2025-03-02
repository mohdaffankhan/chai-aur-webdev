import React, { useId, useState } from "react";

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "USD",
    amountDisabled = false, // industry standard to use these
    currencyDisabled = false, // industry standard to use these
    className = "",
}) {
    const amountInputId = useId();// never use id as a key

    const [isFocused, setIsFocused] = useState(false); // for styling - on click "0" will be cleared

    const handleFocus = () => {
        if (amount === 0) {
            onAmountChange(""); // Clears the value when clicked if it's 0
        }
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (amount === "") {
            onAmountChange(0); // Sets it back to 0 when focus is lost and nothing is entered
        }
        setIsFocused(false);
    };

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    ${label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisabled}
                    value={amount}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange(e.target.value)}
                    disabled={currencyDisabled}
                >
                    {currencyOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        // key is recommended(required) to be used whenever we have a list for better performance
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
