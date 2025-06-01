# My Next.js Personal Site Template

This is a clean, minimalist, and fast personal website template for academics, researchers, and students, built with Next.js, Tailwind CSS, and ShadCN UI components. It's designed for easy customization and deployment, especially for static hosting platforms like GitHub Pages.

The template focuses on showcasing your profile, blog posts (or "posts"), and research projects.

## Sections

- **About (Homepage)**: Your profile, news updates, recent research highlights, and contact information.
- **Posts (Blog)**: A reverse chronological list of your blog posts, grouped by year.
- **Research**: A showcase of your research projects, presented as expandable items.

## Getting Started

### Prerequisites

- Node.js (v18.x or later recommended)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git scholar-blog
    cd scholar-blog
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

## Customization

This template is designed to be easily personalized.

### 1. Site Configuration (`src/config/site.ts`)

The most important file for personalization is `src/config/site.ts`. Open this file and edit the values to reflect your information:

- `siteName`: The name of your blog/site (e.g., "My Research Hub").
- `name`: Your first and last name.
- `title`: Your professional title (e.g., "PhD Candidate", "Software Engineer").
- `email`: Your contact email address.
- `socials`: URLs for your GitHub and LinkedIn profiles.
- `university`: Your university affiliation (optional).
- `aboutMe`: An array of strings, where each string is a paragraph for your "About Me" section.
- `newsItems`: An array of news updates, each with a `date` and `content`.
- `footerGhUser`: Information for the "themed by" link in the footer. You can change this to your own GitHub or remove it.
- `profileImageAlt`: Alt text for your profile picture.

### 2. Profile Image

The profile image on the homepage is a placeholder.
To update it:

1.  Add your image to the `public/` directory (e.g., `public/images/profile.jpg`).
2.  Update the `SiteConfig.profileImage` prop of the `Image` component in `src/config/site.ts`.
3.  Also, update `siteConfig.profileImageAlt` in `src/config/site.ts` with appropriate alt text.

### 3. Blog Posts (`src/app/blog/data.ts`)

Blog posts are managed in `src/app/blog/data.ts`. Each post is an object in the `posts` array with the following structure:

```typescript
export interface Post {
  slug: string; // Unique URL-friendly identifier
  title: string;
  summary: string; // Short summary for listings and metadata
  publicationDate: string; // YYYY-MM-DD format
  content: string; // Markdown content for the full post
  readingTimeMinutes?: number; // Optional estimated reading time
}
```

- To add a new post, create a new object in the `posts` array.
- Use Markdown for the `content`.
- The `slug` will be part of the URL (e.g., `/blog/your-slug-here`).

### 4. Research Items (`src/app/research/data.ts`)

Research projects are managed in `src/app/research/data.ts`. Each project is an object in the `projects` array:

```typescript
export interface Project {
  id: string; // Unique identifier
  title: string;
  summary: string; // Short summary for the collapsed accordion view
  description: string; // Detailed Markdown content for the expanded view
  links: Array<{ name: string; url: string }>;
  year: number;
  status: "Completed" | "Ongoing" | "Concept";
}
```

- The `description` field supports Markdown. This content is rendered in the expandable section of each research item.
- **Interactive Details**: To create a unique and interactive look for each expanded research item, you can customize its corresponding detail component in the `src/app/research/details/` directory (e.g., `src/app/research/details/AiClimateModelDetails.tsx`). These components are dynamically loaded and are Client Components (marked with `'use client';`), so you can add custom React components, state management, event handlers, and any interactive elements you need (like charts, simulations, or data visualizations). The template provides placeholder interactive sections in these detail components as examples.
- `links` are for external resources like GitHub repositories, papers, or demos.

### 5. Styling (Optional)

- **Global Styles & Theme**: Colors and base styles are defined in `src/app/globals.css` using CSS variables for ShadCN UI. You can adjust these to change the overall theme.
- **Tailwind CSS**: For more advanced styling, you can modify Tailwind classes directly in the components or update `tailwind.config.ts`.

## Running the Development Server

To start the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) (or the port shown in your terminal) with your browser to see the result. The site will automatically reload when you make changes.

## Building for Static Export

This project is configured for static export, suitable for hosting on platforms like GitHub Pages, Vercel, Netlify, etc.

To build the static site:

```bash
npm run build
```

This command generates an `out` directory in the root of your project. This `out` directory contains all the static HTML, CSS, JavaScript, and image files for your site.

## Deployment

### GitHub Pages (Recommended for this template)

A GitHub Actions workflow is included (`.github/workflows/deploy.yml`) that automatically builds and deploys your site to GitHub Pages when you push to the `main` branch.

**Setup for GitHub Pages:**

1.  Push your code to a GitHub repository.
2.  In your GitHub repository settings, go to **Settings > Pages**.
3.  Under **Build and deployment**, select **GitHub Actions** as the **Source**.
4.  The workflow should run automatically on your next push to `main`.

Your site will be available at `https://<your-username>.github.io/<your-repo-name>/`.

### Other Static Hosts

Deploy the contents of the `out` folder (generated by `npm run build`) to any static hosting provider.

## License

This template is open-sourced under the MIT license. See the `LICENSE` file for more details. (You may want to add a LICENSE file if one doesn't exist).
