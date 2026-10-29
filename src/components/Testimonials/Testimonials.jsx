import React from 'react';
import './Testimonials.scss';

function Testimonials({ testimonials }) {
    return (
        <section className="testimonials-section">
            <div className="testimonials-header">
                <p className="testimonials-eyebrow">
                    <span className="testimonials-eyebrow-line" />
                    Quem já adotou
                </p>

                <h2 className="testimonials-title">
                    Histórias de quem levou um pouco de{' '}
                    <em className="testimonials-hand">verde</em> pra casa.
                </h2>
            </div>

            <div className="testimonials-grid">
                {testimonials.map((testimonial) => (
                    <article className="testimonial-card" key={testimonial.id}>
                        <span className="testimonial-quote" aria-hidden="true">“</span>

                        <p className="testimonial-text">
                            {testimonial.text}
                        </p>

                        <div className="testimonial-author">
                            <img
                                src={testimonial.image}
                                className="testimonial-author-img"
                                alt={testimonial.author}
                            />
                            <div className="testimonial-author-info">
                                <h3 className="testimonial-author-name">
                                    {testimonial.author}
                                </h3>
                                <p className="testimonial-author-location">
                                    {testimonial.location}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;