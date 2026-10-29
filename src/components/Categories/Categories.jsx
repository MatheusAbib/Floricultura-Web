import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Categories.scss';

function Categories({ categories }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const total = categories.length;

    const isCategoryActive = (link) => {
        if (link.includes('#')) {
            const hashIndex = link.indexOf('#');
            const pathPart = link.slice(0, hashIndex) || '/';
            const normalizedPath = pathPart === '/' ? '/' : pathPart.replace(/\/$/, '');
            const normalizedCurrent = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');
            return normalizedPath === normalizedCurrent;
        }
        const normalizedLink = link.replace(/\/$/, '');
        const normalizedCurrent = currentPath.replace(/\/$/, '');
        return normalizedLink === normalizedCurrent;
    };

    return (
        <section className="categories-section">
            <div className="categories-header">
                <p className="categories-eyebrow">
                    <span className="categories-eyebrow-line" />
                    Explore o catálogo
                </p>

                <h2 className="categories-title">
                    Navegue por <em className="categories-hand">categoria.</em>
                </h2>
            </div>

            <ul className="categories-list">
                {categories.map((category, index) => {
                    const isAnchor = category.link.includes('#');
                    const number = String(index + 1).padStart(2, '0');
                    const isActive = isCategoryActive(category.link);

                    const content = (
                        <>
                            <span className="category-number">{number}</span>
                            <span className="category-icon">
                                <i className={`bi ${category.icon}`} aria-hidden="true" />
                            </span>
                            <span className="category-name">{category.name}</span>
                            <span className="category-arrow" aria-hidden="true">
                                ↗
                            </span>
                        </>
                    );

                    if (isAnchor) {
                        return (
                            <li className="category-item" key={category.id}>
                                <a
                                    href={category.link}
                                    className={`category-link ${isActive ? 'is-active' : ''}`}
                                >
                                    {content}
                                </a>
                            </li>
                        );
                    }

                    return (
                        <li className="category-item" key={category.id}>
                            <Link
                                to={category.link}
                                className={`category-link ${isActive ? 'is-active' : ''}`}
                            >
                                {content}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <p className="categories-footer">
                <span>{String(total).padStart(2, '0')}</span>
                categorias disponíveis
            </p>
        </section>
    );
}

export default Categories;