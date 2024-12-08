# MovieEra 🎬  
Your ultimate movie portal to explore, manage, and favorite your preferred films.

## Live Site 🌐  
[Visit MovieEra](https://movie-era-dc403.web.app/)

## Features ✨  
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.  
- **Dynamic Movie Management:** Add, update, and delete movies with seamless functionality.  
- **Favorite Movies:** Manage a personalized list of favorite movies for quick access.  
- **Search and Filters:** Quickly search for movies by title.  
- **Dark/Light Theme Toggle:** Choose your preferred viewing mode for an enhanced experience.  

## Pages and Functionality 📖  
1. **Home Page:**  
   - Static slider showcasing banners.  
   - Featured Movies section displaying the top 6 rated films.  
   - Additional sections for engaging movie-related content.  

2. **All Movies Page:**  
   - Explore all available movies in a structured 3-column grid layout.  
   - "See Details" button for a deeper dive into each movie's information.  

3. **Add Movie Page (Private Route):**  
   - Form for adding movies with validations for title, genre, duration, release year, rating, and summary.  
   - Data stored in the database with toast notifications for success or failure.  

4. **Movie Details Page (Private Route):**  
   - Detailed information about selected movies with options to delete or add them to your favorites.  

5. **Favorite Movies Page (Private Route):**  
   - View and manage your list of favorite movies with options to delete individual entries.  

6. **Authentication System:**  
   - Login and Register pages with Google social login.  
   - Robust form validations with user-friendly error notifications.  

## Technologies Used 🛠️  
- **Frontend:** React, React Router, Tailwind CSS.  
- **Backend:** Node.js, Express.js, MongoDB.  
- **Authentication:** Firebase Authentication with Google login support.  
- **Hosting:** Firebase for the client-side, Vercel for the server-side.  

## Additional Features 🚀  
- **Environment Variables:** Securely manage Firebase config keys and MongoDB credentials.  
- **404 Page:** User-friendly page for incorrect routes.  
- **Loading Spinner:** Visible when data is being fetched.  
- **Update Functionality:** Update movie details directly from the details page.  