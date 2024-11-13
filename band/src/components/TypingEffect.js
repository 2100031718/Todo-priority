// TypingEffect.js
import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed = 50 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + text.charAt(index));
            index++;
            if (index === text.length) {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [text, speed]);

    return <span>{displayedText}</span>;
};

export default TypingEffect;
