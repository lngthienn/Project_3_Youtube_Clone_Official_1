import { useSelector, useDispatch } from 'react-redux';
import { searchVideos, setPageFromCache, setCurrentPage } from './youtubeSlice';

function Pagination() {
    const dispatch = useDispatch();
    const pageTokens = useSelector((state) => state.youtube.pageTokens);
    const currentPage = useSelector((state) => state.youtube.currentPage);
    const currentKeyword = useSelector((state) => state.youtube.currentKeyword);
    const videoByPage = useSelector((state) => state.youtube.videoByPage);

    const handleClick = (index) => {
        const pageNumber = index + 1;
        const token = pageTokens[index];

        if (videoByPage[pageNumber]) {
            dispatch(setCurrentPage(pageNumber));
            dispatch(setPageFromCache({ pageNumber, videos: videoByPage[pageNumber] }));
        } else {
            dispatch(searchVideos({ keyword: currentKeyword, pageToken: token }));
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {pageTokens.slice(0, 4).map((_, index) => {
                const pageNum = index + 1;
                const isActive = Number(currentPage) === index + 1;

                return (
                    <button
                        key={pageNum}
                        onClick={() => handleClick(index)}
                        style={{
                            margin: '0 4px',
                            padding: '6px 12px',
                            fontWeight: isActive ? 'bold' : 'normal',
                            backgroundColor: isActive ? '#e2e2e2' : 'white',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {pageNum}
                    </button>
                );
            })}
        </div>
    );
}

export default Pagination;
