import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import ResultsPage from './pages/ResultsPage/ResultsPage';
import VideoPlayerPage from './pages/VideoPlayerPage/VideoPlayerPage';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/results/video/:videoId" element={<VideoPlayerPage />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
