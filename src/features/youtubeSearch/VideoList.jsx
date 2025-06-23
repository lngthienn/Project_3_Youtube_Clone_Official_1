import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../../styles/features/youtubeSearch/VideoList.module.scss';

function VideoList() {
    const videos = useSelector((state) => state.youtube.videos);
    const status = useSelector((state) => state.youtube.status);
    const error = useSelector((state) => state.youtube.error);

    if (status === 'loading') {
        return <p>Đang tìm kiếm video...</p>;
    }

    if (status === 'failed') {
        return <p>Đã xảy ra lỗi: {error}</p>;
    }

    if (videos.length === 0 && status === 'succeeded') {
        return <p>Không tìm thấy video nào.</p>;
    }

    return (
        <section className={styles.videoList}>
            <h2>Danh sách video:</h2>
            {videos.map((video) => (
                <div className={styles.videoListItem}>
                    <div className={styles.card}>
                        <Link to={`/results/video/${video.id.videoId}`}>
                            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                        </Link>
                    </div>
                    <div className={styles.videoInfo}>
                        <Link to={`/results/video/${video.id.videoId}`}>
                            <h1>{video.snippet.title}</h1>
                        </Link>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default VideoList;
