import styles from '../../../styles/components/Header/HeaderSearch/HeaderSearch.module.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchVideos, clearVideos } from '../../../features/youtubeSearch/youtubeSlice';
import { useNavigate } from 'react-router-dom';

function HeaderSearch() {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    const currentKeyword = useSelector((state) => state.youtube.currentKeyword);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim().toLowerCase() === currentKeyword.toLowerCase()) return;

        dispatch(clearVideos());
        dispatch(searchVideos({ keyword }));
        navigate('/results');
    };

    return (
        <section className={styles.headerSearch}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Nhập để tìm kiếm..."
                    className={styles.searchInput}
                />
            </form>
        </section>
    );
}

export default HeaderSearch;
