# Chaitube - YouTube Video Listing

Welcome to **Chaitube** – a simple yet functional web application that fetches and displays YouTube videos from a public API. This project replicates a YouTube-style video listing page with a responsive grid layout, video filtering, and seamless video playback.

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Screenshots](#screenshots)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [API Reference](#api-reference)
- [Credits](#credits)
- [License](#license)

---

## Features

- **Fetch Videos from API:** Retrieves a list of YouTube videos from the [Free API](https://freeapi.hashnode.space/api-guide/apireference/getYoutubeVideos).
- **Video Thumbnails & Metadata:** Displays thumbnails, titles, and channel names.
- **Clickable Video Cards:** Clicking on a video opens it in YouTube.
- **Search Functionality:** Filter videos by title in real time without additional API calls.
- **Responsive Grid Layout:** Ensures a modern and structured UI for better viewing.
- **Sidebar Toggle:** A collapsible sidebar for improved navigation.

---

## Demo

To see the project in action, simply open `index.html` in your web browser.

---

## Screenshots  
![Chaitube Screenshot](assets/Screenshot.png)  

---

## Usage

- **View Videos:** Videos are fetched and displayed automatically when the page loads.
- **Search Videos:** Use the search bar to filter videos by title in real time.
- **Play Videos:** Click on any video thumbnail to open and watch it on YouTube.
- **Toggle Sidebar:** Click the sidebar toggle button to collapse or expand the sidebar.

---

### API Endpoint

This project uses the [FreeAPI YouTube Videos](https://freeapi.hashnode.space/api-guide/apireference/getYoutubeVideos) endpoint. You can modify the API call in `script.js` to use a different source.

---

## Technologies Used

- **HTML5:** Provides the structure of the web page.
- **CSS3:** Handles the styling and layout for a responsive UI.
- **JavaScript (ES6+):** Fetches data from the API and implements interactive features.
- **Free API:** Supplies the video data for listing.

---

## API Reference

- **Endpoint:** `GET https://api.freeapi.app/api/v1/public/youtube/videos`
- **Response Structure:** The API returns an array of video objects containing:
  - `id`: Unique video identifier
  - `snippet`: Contains `title`, `channelTitle`, `thumbnails`, `publishedAt`
  - `statistics`: Includes `viewCount`
  - `contentDetails`: Contains `duration`

For detailed documentation, visit [FreeAPI Guide](https://freeapi.hashnode.space/api-guide/apireference/getYoutubeVideos).

---

## Credits

- **API Provider:** Thanks to [Free API](https://freeapi.hashnode.space) for providing video data.
- **Open-Source Inspiration:** This project was inspired by YouTube’s UI and frontend development best practices.

---

## License

This project is open-source and available under the [MIT License](LICENSE).