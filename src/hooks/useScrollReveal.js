import { useEffect, useRef, useState } from 'react'

export const useScrollReveal = (options = {}) => {
    const elementRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    // Optionally unobserve after revealing
                    if (options.once !== false) {
                        observer.unobserve(entry.target)
                    }
                } else if (options.once === false) {
                    setIsVisible(false)
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -50px 0px',
            }
        )

        const element = elementRef.current
        if (element) {
            observer.observe(element)
        }

        return () => {
            if (element) {
                observer.unobserve(element)
            }
        }
    }, [options.threshold, options.rootMargin, options.once])

    return [elementRef, isVisible]
}

export default useScrollReveal
