# Flashy

Flashy is a streamlined flashcard CRUD application featuring a clean and user-friendly interface. Explore the live application at [Flashy](https://flashy-lilac.vercel.app/).

This project was bootstrapped using `create-t3-app`.

## Getting Started

### Prerequisites

- `node`
- `docker`
- `npm`, `pnpm` or any package manager of your choice

### Running the Application Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/shahank42/flashy
   cd flashy
   ```

2. **Set Up Environment Variables:**
   Copy the contents of `.env.example` to a new `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

3. **Initialize the Database:**
   Execute the following script to set up a local MySQL database instance:
   ```bash
   ./start-database.sh
   ```

4. **Install Dependencies:**
   Use `pnpm` to install all required dependencies:
   ```bash
   pnpm install
   ```

5. **Run the Development Server:**
   Start the development server with:
   ```bash
   pnpm run dev
   ```

   > **Note:** Using `bun` may cause TypeScript errors. It is recommended to use `pnpm` or `npm` for a smoother experience.

## Future Enhancements

- **Optimistic UI Updates:** Improve the user experience with real-time interface feedback.
- **Loading States:** Add loading indicators for submit buttons to enhance UX.
- **State Management:** Integrate `tanstack-query` for more efficient state management, cache invalidation, and promise resolution.
- **Dark Mode:** Implement dark mode for better accessibility and aesthetics.
- **Color Scheme:** Consider refining the color palette to achieve a cleaner look.