# 🎬 Movie Explorer

Hey there! Welcome to my cool movie explorer project. It's going to show you an endless scroll of popular movies with the ability to search for what movie you're looking for.

## 🛠 How It All Fits Together

1. You start scrolling through movies.
2. the Intersection Observer notices when you're near the bottom.
3. It tells React Query, "Hey, we need more movies!"
4. React Query checks if it already has the next batch cached.
5. If it does, boom! Instant movies. If not, it fetches new ones from the server.
6. The new movies appear, and you keep scrolling happily!

## 🎉 The Result

A super smooth, fast, and data-efficient way to browse through tons of movies.

Happy movie browsing! 🍿✨

## 🏃‍♂️ Running the Project with Next.js

1. **Clone the repo**
  
2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up your environment variable:**
   Create a `.env` file in the root of your project and add your TMDB API key:
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here

   NEXT_PUBLIC_API_BASE_URL=https://api.themoviedb.org/3

   NEXT_PUBLIC_API_IMAGE_POSTER=https://image.tmdb.org/t/p/w342

   NEXT_PUBLIC_API_IMAGE_BACKDROP=https://image.tmdb.org/t/p/w1280
   ```
