import Pagination from '../../features/youtubeSearch/Pagination';
import VideoList from '../../features/youtubeSearch/VideoList';

const ResultsPage = () => {
    return (
        <section>
            <VideoList />
            <Pagination />
        </section>
    );
};

export default ResultsPage;
