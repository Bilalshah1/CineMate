import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToHash = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Wait for DOM to mount
            setTimeout(() => {
                const el = document.querySelector(hash);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 0);
        }
    }, [hash]);
};

export default useScrollToHash;
