import { useState, useEffect } from 'react';
import './ComingSoon.css';

const calculateTimeLeft = (targetDate: Date) => {
    const now = new Date();
    const difference = +targetDate - +now;
    let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    return timeLeft;
};

export const ComingSoon = () => {
    const targetDate = new Date('2025-02-06T00:00:00'); // February 6th, 2025
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <section className="coming-soon-container">
            <div className="content-wrapper">
                <div className="countdown-wrapper">
                    <div className="info-box">
                        <h3>Menu Scheduler</h3>
                        <p><em>Our website is under construction!</em></p>
                        <div className="countdown">
                            {Object.entries(timeLeft).map(([unit, value], i) => (
                                <div className="count-item" key={i}>
                                    <div className="count-box">
                                        <span className="count-time">{value}</span>
                                        <span className="count-format">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};