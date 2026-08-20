import { useEffect, useState } from 'react';
import './css/PlayerModal.css';
import playMusicIcon from '../assets/PlayerAssets/playMusic.png';
import playIcon from '../assets/PlayerAssets/play.png';
import pauseIcon from '../assets/PlayerAssets/pause.png';
import badCover from '../assets/AlbumImages/Bad.jpg';
import benCover from '../assets/AlbumImages/Ben.jpg';
import dangerousCover from '../assets/AlbumImages/Dangerous.jpg';
import foreverMichaelCover from '../assets/AlbumImages/ForeverMichael.jpg';
import gotToBeThereCover from '../assets/AlbumImages/GotToBeThere.jpg';
import invincibleCover from '../assets/AlbumImages/Invincible.jpg';
import musicAndMeCover from '../assets/AlbumImages/MusicAndMe.jpg';
import offTheWallCover from '../assets/AlbumImages/OffTheWall.jpg';
import thrillerCover from '../assets/AlbumImages/Thriller.jpg';

const albumCovers = {
    Bad: badCover,
    Ben: benCover,
    Dangerous: dangerousCover,
    ForeverMichael: foreverMichaelCover,
    GotToBeThere: gotToBeThereCover,
    Invincible: invincibleCover,
    MusicAndMe: musicAndMeCover,
    OffTheWall: offTheWallCover,
    Thriller: thrillerCover,
};

const formatTime = (value) => {
    if (!Number.isFinite(value) || value <= 0) return '0:00';

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

function PlayerModal({
    isOpen,
    title,
    isPlaying,
    albumImage,
    onToggle,
    onClose,
    currentTime,
    duration,
    onSeek,
    volume,
    onVolumeChange,
    onPrevious,
    onNext,
}) {
    const [isMounted, setIsMounted] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            return undefined;
        }

        const closeTimer = setTimeout(() => setIsMounted(false), 220);
        return () => clearTimeout(closeTimer);
    }, [isOpen]);

    if (!isMounted) return null;

    const progress = duration ? (currentTime / duration) * 100 : 0;
    const albumCoverKey = albumImage?.split('/').pop()?.replace('.jpg', '');
    const albumCover = albumCovers[albumCoverKey] || playMusicIcon;

    const handleVolumeWheel = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const change = event.deltaY < 0 ? 0.05 : -0.05;
        const nextVolume = Math.min(1, Math.max(0, volume + change));

        onVolumeChange(nextVolume);
    };

    return (
        <div className={`music-modal-backdrop ${isOpen ? 'is-open' : 'is-closing'}`}>
            <div className="music-modal" role="dialog" aria-modal="true">
                <div className="music-modal-art">
                    <img key={albumCover} src={albumCover} alt={`${title || 'Michael Jackson'} album cover`} />
                </div>

                <div className="music-modal-content">
                    <button type="button" className="music-modal-close" onClick={onClose} aria-label="Close player">
                        ×
                    </button>

                    <div className="music-modal-header">
                        <div className="music-modal-info">
                            <p className="music-modal-label">Now playing</p>
                            <h3>{title || 'Michael Jackson'}</h3>
                        </div>
                    </div>

                    <div className="music-modal-progress">
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            step="0.1"
                            value={currentTime || 0}
                            onChange={(event) => onSeek(Number(event.target.value))}
                            aria-label="Adjust playback position"
                        />
                        <div className="music-modal-time">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                        <div className="music-modal-progress-fill" style={{ width: `${progress}%` }} />
                    </div>

                    <div className="music-modal-controls">
                        <button type="button" className="music-modal-skip" onClick={onPrevious} aria-label="Previous song">
                            &lt;
                        </button>
                        <button
                            type="button"
                            className="music-modal-toggle"
                            onClick={onToggle}
                            aria-label={isPlaying ? 'Pause music' : 'Play music'}
                        >
                            <img src={isPlaying ? pauseIcon : playIcon} alt="" aria-hidden="true" />
                        </button>
                        <button type="button" className="music-modal-skip" onClick={onNext} aria-label="Next song">
                            &gt;
                        </button>
                    </div>

                    <label className="music-modal-volume" onWheel={handleVolumeWheel}>
                        <span>Volume</span>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(event) => onVolumeChange(Number(event.target.value))}
                            aria-label="Adjust volume"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default PlayerModal;
