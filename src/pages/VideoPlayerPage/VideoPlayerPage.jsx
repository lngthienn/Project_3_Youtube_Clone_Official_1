import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

function VideoPlayerPage() {
    const { videoId } = useParams();
    return (
        <section>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} controls width="100%" height="500px" />
        </section>
    );
}

export default VideoPlayerPage;
