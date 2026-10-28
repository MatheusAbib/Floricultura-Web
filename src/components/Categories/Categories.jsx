import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.scss';

function Categories({ categories }) {
    return (
        <section className="categories-section py-7">
            <div className="container">
                <div className="row text-center mb-5">
                    <div className="col-12">
                    </div>
                </div>
                <div className="row g-4">
                    {categories.map((category) => {
                        const isAnchor = category.link.includes('#');

                        const content = (
                            <div className="category-card">
                                <div className="category-icon">
                                    <i className={`bi ${category.icon}`}></i>
                                </div>
                                <h3 className="category-title">{category.name}</h3>
                            </div>
                        );

                        if (isAnchor) {
                            return (
                                <div className="col-6 col-md-4 col-lg-2" key={category.id}>
                                    <a href={category.link} className="text-decoration-none">
                                        {content}
                                    </a>
                                </div>
                            );
                        }

                        return (
                            <div className="col-6 col-md-4 col-lg-2" key={category.id}>
                                <Link to={category.link} className="text-decoration-none">
                                    {content}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Categories;