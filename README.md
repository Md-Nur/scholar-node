# Scholar Node

Scholar Node is a modern, open-source journal management system designed to streamline the academic publishing process. Built with speed and usability in mind, it provides a comprehensive platform for managing journals, articles, authors, and editorial workflows.

## 🚀 Features

### Public Portal
- **Journal Archive**: Browse through past volumes and issues.
- **Article Discovery**: Search and explore articles with detailed abstracts and keyword indexing.
- **Announcements**: Stay updated with the latest news from the editorial board.
- **Testimonials**: Read feedback from researchers and reviewers.
- **Submissions Guide**: Clear instructions for authors on how to submit their work.
- **Indexing Info**: Transparent information about abstracting and indexing services.

### Admin Dashboard
- **Content Management**: Effortlessly manage volumes, issues, and articles.
- **Author & Editor Profiles**: Maintain a database of contributors and editorial board members.
- **Announcements & Testimonials**: Control what appears on the front page.
- **Static Pages**: Create and edit informational pages (e.g., About, Contact).
- **Settings**: Global configuration for the journal's name and other essential metadata.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: Custom Auth with [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [PostgreSQL](https://www.postgresql.org/) database

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd scholar-node
   ```

2. **Install dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add your database connection string:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/scholar_node"
   ```

4. **Database Migration**:
   ```bash
   npx prisma db push
   ```

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `app/`: Next.js pages, layouts, and API routes.
- `components/`: Reusable React components (Admin and Public).
- `lib/`: Utility functions and shared logic (e.g., database client).
- `prisma/`: Database schema and migration files.
- `public/`: Static assets like images and fonts.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Generates Prisma client and builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
