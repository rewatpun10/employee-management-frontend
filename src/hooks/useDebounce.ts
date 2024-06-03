import { useRef } from 'react';

export function useDebounce(callback: Function, delay: number) {
    const timer = useRef<NodeJS.Timeout | null>(null);

    const debouncedCallback = (...args: any) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedCallback;
}
