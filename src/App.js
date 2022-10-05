import LoginForm from "./components/Forms/LoginForm";
import SignUpForm from "./components/Forms/SignUpForm";
import HomePage from "./components/Home/HomePage";
import MoviePage from "./components/Movies/MoviePage";
import ShowsPage from "./components/Shows/ShowsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookmarkPage from "./components/Bookmark/BookmarkPage";
import { SearchProvider } from "./context/SearchContext";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { BookmarkProvider } from "./context/BookmarkContext";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Recommended from "./components/Home/Recommended";
import TrendingShows from "./components/Home/TrendingShows";
import { Helmet } from "react-helmet";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Helmet>
          <title>Entertainment Web App</title>
          <meta
            name="description"
            content="Get info for all your favorite movies and series"
          />
          <meta name="keywords" content="Movies, TV Shows" />
        </Helmet>
        <AuthProvider>
          <SearchProvider>
            <BookmarkProvider>
              <Routes>
                <Route path="/" element={<SignUpForm />} />
                <Route path="/LoginForm" element={<LoginForm />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="homepage" element={<HomePage />} />
                  <Route path="homepage/trending" element={<TrendingShows />} />
                  <Route path="recommended" element={<Recommended />} />
                  <Route path="moviepage" element={<MoviePage />} />
                  <Route path="showspage" element={<ShowsPage />} />
                  <Route path="bookmarkpage" element={<BookmarkPage />} />
                </Route>
              </Routes>
            </BookmarkProvider>
          </SearchProvider>
        </AuthProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
