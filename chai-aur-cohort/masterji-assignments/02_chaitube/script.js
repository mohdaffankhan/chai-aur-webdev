// Fetch and display YouTube videos
fetch("https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=20&sortBy=keep one:latest")
  .then(response => response.json())
  .then(data => {
    data.data.limit=20;
    data.data.currentPageItems = 20;
    console.log(data);
    data.data.page=1;
    const videos = data.data.data;
    const videoGrid = document.querySelector(".video-grid");

    videos.forEach(video => {
      const videoData = video.items;

      // Extract required fields
      const videoId = videoData.id;
      const title = videoData.snippet.title;
      const channelName = videoData.snippet.channelTitle;
      const thumbnail = videoData.snippet.thumbnails.maxres.url;
      const views = formatViews(parseInt(videoData.statistics.viewCount, 10));
      const uploadTime = timeSinceUpload(videoData.snippet.publishedAt);
      const duration = formatDuration(videoData.contentDetails.duration);
      const videoURL = `https://www.youtube.com/watch?v=${videoId}`;

      // 🎞 Create video card HTML
      const videoCard = `
        <div class="video-card" onClick="openVideo('${videoId}')">
          <div class="video-thumbnail">
            <img src="${thumbnail}" alt="Thumbnail">
            <span class="video-duration">${duration}</span>
          </div>
          <div class="video-info">
            <div class="channel-icon">
              <img src="assets/channel.jpg" alt="Channel Icon">
            </div>
            <div class="video-details">
              <div class="video-title">${title}</div>
              <div class="video-meta">${channelName} · ${views} views · ${uploadTime}</div>
            </div>
          </div>
        </div>
      `;

      videoGrid.insertAdjacentHTML("beforeend", videoCard);
    });
  })
  .catch(error => console.error("Error fetching videos:", error));

/**
 * 📊 Formats view count into human-readable format.
 * @param {number} views - Number of views
 * @returns {string} - Formatted views
 */
function formatViews(views) {
  if (views >= 1_000_000_000) return (views / 1_000_000_000).toFixed(1) + "B";
  if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M";
  if (views >= 1_000) return (views / 1_000).toFixed(1) + "K";
  return views.toString();
}

/* Converts upload date to relative time (e.g., "2 weeks ago"). */
function timeSinceUpload(uploadDate) {
  const uploadTime = new Date(uploadDate);
  const now = new Date();
  const diff = Math.floor((now - uploadTime) / 1000); // Difference in seconds

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diff / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

/* Formats video duration from ISO format (PT#H#M#S) to HH:MM:SS or MM:SS.*/
function formatDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (match[1] || "").replace("H", "") || 0;
  const minutes = (match[2] || "").replace("M", "") || 0;
  const seconds = (match[3] || "").replace("S", "") || 0;

  if (hours > 0) {
    return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.padStart(2, "0")}`;
}

/* Opens a video in a new tab.*/
function openVideo(videoId) {
  window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
}

/*Toggles the sidebar visibility.*/
function toggleSidebar() {
  document.querySelector(".sidebar").classList.toggle("hidden");
  document.querySelector(".main-content").classList.toggle("full");
}

// Search Functionality
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", () => {
  filterVideos(searchInput);
  searchInput.value = ""; // Clear input field after search
});

/* Filters videos based on search input.*/
function filterVideos(input) {
  const videoCards = document.querySelectorAll(".video-card");
  const searchTerm = input.value.toLowerCase();

  videoCards.forEach((card) => {
    const videoTitle = card.querySelector(".video-title").textContent.toLowerCase();
    card.style.display = videoTitle.includes(searchTerm) ? "block" : "none";
  });
}

// Reloads the page when clicking the ChaiTube logo
document.querySelector(".home").addEventListener("click", () => location.reload());
