# TinyLink

TinyLink is a minimal, user-friendly URL shortener and manager. Effortlessly create short links with optional custom codes and track click statistics.

## Features

- 🔗 **Shorten URLs**: Quickly shorten long URLs to simple short links.
- ✏️ **Custom codes**: Choose a custom short code for your link, or let TinyLink generate one.
- 📋 **Personal Link Management**: View, manage, and delete all your created short links in one place.
- 📝 **Descriptions**: Add optional descriptions or notes to each short link.
- 📊 **Click Tracking**: Monitor total click counts per link.
- 💡 **Statistics View**: Click on a link's code to see detailed statistics and info.


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/tinylink.git
   cd tinylink
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables:**

   Create a `.env.local` file in the root directory for any required configuration (e.g., database URL).

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. **Visit** [http://localhost:3000](http://localhost:3000) to see TinyLink.

## Usage

- Fill out the **Add New Link** form (title, target URL, optional custom code and description).
- Manage all your links from the list below the form.
- Use the "Copy" button to quickly copy a short URL.
- Delete links with the trash button.
- Click the "Stats" option to view link analytics (click counts, timestamps, etc.).

## Tech Stack

- **Frontend:** [React](https://react.dev/) (with Next.js 13 App Router)
- **Backend:** API routes in Next.js
- **Database:** 
- **Styling:** Tailwind CSS

## Project Structure

- `app/page.js` — Main home & link manager UI
- `app/code/[code]/page.js` — Per-link statistics page
- `pages/api/links` — Link CRUD API endpoints
- `lib/` — (for database helpers, if provided)
- `styles/` — Global styles


## License

MIT


---
