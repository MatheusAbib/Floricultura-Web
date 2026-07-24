import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.scss';

function Categories({ categories }) {
    return (
        <section className="categories-section py-7">
            <div className="container">
                <div className="row text-center mb-5">
                    <div className="col-12">
                        <h2 className="section-title">Outras Categorias</h2>
                    </div>
                </div>
                <div className="row g-4">
                    {categories.map((category, index) => (
                        <div className="col-6 col-md-4 col-lg-2" key={category.id}>
                            <Link to={category.link} className="text-decoration-none">
                                <div className="category-card">
                                    <div className="category-icon">
                                        <i className={`bi ${category.icon}`}></i>
                                    </div>
                                    <h3 className="category-title">{category.name}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categories;