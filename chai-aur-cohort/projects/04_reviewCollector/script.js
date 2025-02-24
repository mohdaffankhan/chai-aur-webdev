document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewForm");
  const reviewsList = document.getElementById("reviewsList");
  
  loadReviews();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const review = document.getElementById("review").value.trim();
    
    if (!name || !review) {
      alert("Please fill all fields");
      return;
    }

    const reviewData = { name, review };
    saveReview(reviewData);
    
    const reviewCard = createReviewCard(reviewData);
    reviewsList.prepend(reviewCard);

    form.reset();
  });

  function createReviewCard({ name, review }) {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
        <div class="review-content">${review}</div>
        <div class="review-author"><em>~ ${name}</em></div>
    `;
    return card;
  }

  function saveReview(reviewData) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.unshift(reviewData);
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.forEach(reviewData => {
      const reviewCard = createReviewCard(reviewData);
      reviewsList.appendChild(reviewCard);
    });
  }
});