
export const renderRating = (rating) => {
    let stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars.push('bi-star-fill');
    }
    
    if (hasHalfStar) {
        stars.push('bi-star-half');
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars.push('bi-star');
    }
    
    return stars;
};