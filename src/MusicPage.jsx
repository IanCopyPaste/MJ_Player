import './css/MusicPage.css';
import Header from './components/Header';
import Footer from './components/Footer';
import playMusicIcon from './assets/HomePageAssets/playMusic.png';

function MusicPage({ props = [], player, onSelectTrack, setPlayerOpen }) {
    const playTrack = (index) => {
        const song = props[index];

        if (!song) return;

        onSelectTrack(song, index);
    };

    return (
        <>
            <Header />

            <main className="music-page">
                {!player.isOpen && (
                    <button
                        type="button"
                        className="floating-player-button"
                        onClick={() => setPlayerOpen(true)}
                        aria-label="Toggle music player"
                    >
                        <img src={playMusicIcon} alt="Open music player" />
                    </button>
                )}

                <div className="music-page-header">
                    <p className="eyebrow">Michael Jackson</p>
                    <h1>Music Collection</h1>
                </div>

                <div className="song-list">
                    {props.map((song, index) => (
                        <button
                            key={song.song_id || `${song.title}-${index}`}
                            type="button"
                            className="song-row"
                            onClick={() => playTrack(index)}
                        >
                            <div className="song-meta">
                                <span className="song-number">{String(index + 1).padStart(2, '0')}</span>
                                <div>
                                    <strong>{song.title}</strong>
                                    <span>{song.album}</span>
                                </div>
                            </div>
                            <span className="song-year">{song.release_date}</span>
                        </button>
                    ))}
                </div>
            </main>

            <Footer />
        </>
    );
}

export default MusicPage;