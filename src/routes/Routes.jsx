import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import AllMovies from '../pages/AllMovies';
import AddMovie from '../pages/AddMovie';
import UpdateMovie from '../pages/UpdateMovie';
import MovieDetails from '../pages/MovieDetails';
import MyFavorites from '../pages/MyFavorites';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from '../pages/ForgotPassword';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/movies',
                element: <AllMovies />
            },
            {
                path: '/movies/:id',
                element: <MovieDetails />,
                // loader: ({ params }) => fetch(`/movies/${params.id}`)
                loader: ({ params }) => fetch(`http://localhost:5000/movies/${params.id}`)
            },
            {
                path: '/add-movie',
                element: (
                    <PrivateRoute>
                        <AddMovie />
                    </PrivateRoute>
                )
            },
            {
                path: '/update-movie/:id',
                element: (
                    <PrivateRoute>
                        <UpdateMovie />
                    </PrivateRoute>
                )
            },
            {
                path: '/favorites',
                element: (
                    <PrivateRoute>
                        <MyFavorites />
                    </PrivateRoute>
                )
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />
            }
        ]
    }
]);

export default router;