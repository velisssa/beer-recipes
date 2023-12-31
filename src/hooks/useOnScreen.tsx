import {useEffect, useState, useRef, MutableRefObject} from 'react';

export function useOnScreen(ref: MutableRefObject<HTMLLIElement | null>) {
    const [isOnScreen, setIsOnScreen] = useState<boolean>(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(([entry]) =>
            setIsOnScreen(entry.isIntersecting)
        );
    }, []);

    useEffect(() => {
        if (ref.current) {
            observerRef.current?.observe(ref.current!);
        }

        return () => {
            observerRef.current?.disconnect();
        };
    }, [ref]);

    return isOnScreen;
}