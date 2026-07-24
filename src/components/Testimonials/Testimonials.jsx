import React from 'react';
import './Testimonials.scss';

function Testimonials({ testimonials }) {
    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="row text-center mb-5">
                    <div className="col-12">
                        <h2 className="section-title">Avaliações de Clientes</h2>
                    </div>
                </div>
                <div className="row">
                    {testimonials.map((testimonial, index) => (
                        <div className="col-lg-4 mb-4" key={testimonial.id}>
                            <div className="testimonial-card">
                                <div className="testimonial-text">
                                    {testimonial.text}
                                </div>
                                <div className="testimonial-author">
                                    <img src={testimonial.image} className="author-img" alt={testimonial.author} />
                                    <div>
                                        <h4 className="author-name">{testimonial.author}</h4>
                                        <p className="author-location">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;