import { useSelector } from 'react-redux';

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
        <section>
            <h2>Danh sách video:</h2>
            <ul>
                {videos.map((video) => (
                    <li key={video.id.videoId}>
                        <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} width="200" />
                        <p>{video.snippet.title}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default VideoList;
