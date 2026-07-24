import React from 'react';
import { useInView } from 'react-intersection-observer';
import './FadeIn.scss';

function FadeIn({ children, delay = 0, direction = 'up' }) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '-50px 0px'
    });

    const directionClass = {
        up: 'fade-up',
        down: 'fade-down',
        left: 'fade-left',
        right: 'fade-right'
    };

    return (
        <div
            ref={ref}
            className={`fade-in ${directionClass[direction]} ${inView ? 'visible' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export default FadeIn;