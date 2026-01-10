# StreamShelf

**Your personal streaming library, reimagined.**

StreamShelf is a full-featured media library and streaming app that allows you to **organize, browse, and watch videos stored locally on your PC**. With a sleek, Netflix/Plex-inspired interface, StreamShelf demonstrates modern frontend and backend skills while providing a polished, user-friendly experience.

---

## 🏆 Features

- Beautiful **Next.js 16 + TypeScript + Tailwind CSS** frontend with responsive, animated UI.
- Seamless video browsing and playback, including metadata display (title, duration, thumbnail).
- Advanced visual effects powered by [ogl](https://www.npmjs.com/package/ogl) and animated interactions via [tw-animate-css](https://www.npmjs.com/package/tw-animate-css).
- Fully functional **local streaming server** powered by Node.js.
- Dynamic search, filters, and playlists for efficient video organization.
- Modular architecture for easy future expansion (React + Next.js App Router, `/app` + `/pages` structure).
- Optimized for performance and maintainability across large personal libraries.

---

## 🖥 Tech Stack

**Frontend:**
- Next.js 16 (App Router + `/app` directory)
- TypeScript
- Tailwind CSS
- [ogl](https://www.npmjs.com/package/ogl) (WebGL effects)
- [tw-animate-css](https://www.npmjs.com/package/tw-animate-css)
- [react-icons](https://www.npmjs.com/package/react-icons)

**Backend:**
- Node.js + FastAPI (Python)
- Local file system streaming with Node `fs`
- RESTful API for video metadata and playback management

---

## 📦 Installation / Getting Started

StreamShelf runs locally, giving you full control over your video library:

```bash
# Clone the repository
git clone https://github.com/LeeGrobler/stream-shelf.git
cd streamshelf

# Install dependencies
npm install

# Run the development server
npm run dev
```

The app is fully functional, providing local video browsing and playback, playlist management, and search features.

## 📸 Screenshots / Preview

(Add screenshots here showcasing video browsing, playback, and UI effects)

## 🚀 Roadmap / Future Enhancements

- Enhanced metadata scraping (automatic thumbnail generation, subtitles)
- User authentication for multi-user setups
- Smart recommendations and recently watched history
- Integration with external video services (optional)
- StreamShelf is designed to scale and evolve, making it both a portfolio showcase and a practical personal streaming solution.

## 💼 Purpose

**Primary goal**: showcase advanced frontend and backend development skills for recruiters.
**Secondary goal**: personal use as a complete, polished streaming app.
**Tertiary goal**: potential product for wider consumer use in the future.

The project demonstrates modern web development best practices, from architecture to UI design, while highlighting skills in React, Next.js, TypeScript, Tailwind, and API integration.

## 📬 Contact

**Portfolio**: lee-grobler.com
**LinkedIn**: linkedin.com/in/lee-grobler
