import { useEffect, useRef, useState } from 'react';
import './css/MusicPage.css';
import Header from './components/Header';
import Footer from './components/Footer';
import PlayerModal from './components/PlayerModal';
import Mj_header5 from './assets/HomePageAssets/Mj_header5.jpg';

function MusicPage({ props = [] }) {
    const audioRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [nowPlayingTitle, setNowPlayingTitle] = useState('Michael Jackson');

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return undefined;

        const handleLoadedMetadata = () => {
            setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
            setCurrentTime(audio.currentTime || 0);
        };

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
        const handlePlay = () => setIsAudioPlaying(true);
        const handlePause = () => setIsAudioPlaying(false);

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handlePause);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handlePause);
        };
    }, []);

    const playTrack = (index) => {
        const song = props[index];
        const audio = audioRef.current;

        if (!song || !audio) return;

        audio.src = song.path;
        audio.load();
        audio.play();

        setCurrentIndex(index);
        setNowPlayingTitle(song.title);
        setIsPlayerOpen(true);
        setIsAudioPlaying(true);
    };

    const handleTogglePlayback = () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (audio.paused) {
            audio.play();
            setIsAudioPlaying(true);
        } else {
            audio.pause();
            setIsAudioPlaying(false);
        }
    };

    const handleSeek = (time) => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.currentTime = time;
        setCurrentTime(time);
    };

    const goToTrack = (direction) => {
        if (!props.length) return;

        const safeIndex = currentIndex >= 0 ? currentIndex : 0;
        const nextIndex = (safeIndex + direction + props.length) % props.length;

        playTrack(nextIndex);
    };

    return (
        <>
            <Header />

            <main className="music-page">
                <audio ref={audioRef} className="audio-player" preload="metadata" />

                <PlayerModal
                    isOpen={isPlayerOpen}
                    title={nowPlayingTitle}
                    isPlaying={isAudioPlaying}
                    onToggle={handleTogglePlayback}
                    onClose={() => setIsPlayerOpen(false)}
                    currentTime={currentTime}
                    duration={duration}
                    onSeek={handleSeek}
                    onPrevious={() => goToTrack(-1)}
                    onNext={() => goToTrack(1)}
                />

                <button
                    type="button"
                    className="floating-player-button"
                    onClick={() => setIsPlayerOpen((prev) => !prev)}
                    aria-label="Toggle music player"
                >
                    <img src={Mj_header5} alt="Open music player" />
                </button>

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