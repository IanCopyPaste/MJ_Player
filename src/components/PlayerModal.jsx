import './css/PlayerModal.css';
import playMusicIcon from '../assets/HomePageAssets/playMusic.png';

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
    onToggle,
    onClose,
    currentTime,
    duration,
    onSeek,
    onPrevious,
    onNext,
}) {
    if (!isOpen) return null;

    const progress = duration ? (currentTime / duration) * 100 : 0;

    return (
        <div className="music-modal-backdrop">
            <div className="music-modal" role="dialog" aria-modal="true">
                <button type="button" className="music-modal-close" onClick={onClose} aria-label="Close player">
                    ×
                </button>

                <div className="music-modal-header">
                    <div className="music-modal-icon-wrap">
                        <img src={playMusicIcon} alt="Now playing icon" />
                    </div>

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
                    <button type="button" className="music-modal-toggle" onClick={onToggle}>
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <button type="button" className="music-modal-skip" onClick={onNext} aria-label="Next song">
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlayerModal;
