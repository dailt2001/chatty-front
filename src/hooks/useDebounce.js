import { useState, useEffect } from 'react';
const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(value);
        }, delay || 500);
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return debounceValue;
};

export default useDebounce;
// search user: typing -> send too many request
// useDebounce => delay 2,3s after typing
// Vd search = '' useDebounce(search, 5000)
// search = 'a' -> make api request
// trong 5s neu go tiep thi ko gui request len server
