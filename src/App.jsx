import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import './css/App.css';
import HomePage from './HomePage.jsx';
import AlbumsPage from './AlbumsPage.jsx';
import PlayerModal from './components/PlayerModal.jsx';
import songs from '../songs.js'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  const audioRef = useRef(null);
  const [playerState, setPlayerState] = useState({
    isOpen: false,
    currentTrackIndex: -1,
    nowPlayingTitle: 'Michael Jackson',
    albumImage: '',
    isAudioPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
  });

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return undefined;

    const syncMetadata = () => {
      setPlayerState((prev) => ({
        ...prev,
        duration: Number.isFinite(audio.duration) ? audio.duration : 0,
        currentTime: audio.currentTime || 0,
      }));
    };

    const syncTime = () => {
      setPlayerState((prev) => ({
        ...prev,
        currentTime: audio.currentTime || 0,
      }));
    };

    const syncPlayback = () => {
      setPlayerState((prev) => ({
        ...prev,
        isAudioPlaying: !audio.paused,
      }));
    };

    audio.addEventListener('loadedmetadata', syncMetadata);
    audio.addEventListener('timeupdate', syncTime);
    audio.addEventListener('play', syncPlayback);
    audio.addEventListener('pause', syncPlayback);

    return () => {
      audio.removeEventListener('loadedmetadata', syncMetadata);
      audio.removeEventListener('timeupdate', syncTime);
      audio.removeEventListener('play', syncPlayback);
      audio.removeEventListener('pause', syncPlayback);
    };
  }, []);

  const selectTrack = (song, index = -1) => {
    const audio = audioRef.current;

    if (!song || !audio) return;

    audio.src = song.path;
    audio.load();
    audio.play();

    setPlayerState((prev) => ({
      ...prev,
      currentTrackIndex: index >= 0 ? index : prev.currentTrackIndex,
      nowPlayingTitle: song.title,
      albumImage: song.album_image,
      isOpen: true,
      isAudioPlaying: true,
      currentTime: 0,
      duration: 0,
    }));
  };

  const goToTrack = (direction) => {
    if (!songs.length) return;

    const safeIndex = playerState.currentTrackIndex >= 0 ? playerState.currentTrackIndex : 0;
    const nextIndex = (safeIndex + direction + songs.length) % songs.length;
    const nextSong = songs[nextIndex];

    if (!nextSong) return;

    selectTrack(nextSong, nextIndex);
  };

  const handleTogglePlayback = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setPlayerState((prev) => ({ ...prev, isAudioPlaying: true }));
    } else {
      audio.pause();
      setPlayerState((prev) => ({ ...prev, isAudioPlaying: false }));
    }
  };

  const handleSeek = (time) => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = time;
    setPlayerState((prev) => ({ ...prev, currentTime: time }));
  };

  const handleVolumeChange = (volume) => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = volume;
    setPlayerState((prev) => ({ ...prev, volume }));
  };

  const setPlayerOpen = (value) => {
    setPlayerState((prev) => ({ ...prev, isOpen: value }));
  };

  return (
    <>
      <ScrollToTop />
      <audio ref={audioRef} className="audio-player" preload="metadata" onEnded={() => goToTrack(1)} />

      <PlayerModal
        isOpen={playerState.isOpen}
        title={playerState.nowPlayingTitle}
        albumImage={playerState.albumImage}
        isPlaying={playerState.isAudioPlaying}
        onToggle={handleTogglePlayback}
        onClose={() => setPlayerOpen(false)}
        currentTime={playerState.currentTime}
        duration={playerState.duration}
        onSeek={handleSeek}
        volume={playerState.volume}
        onVolumeChange={handleVolumeChange}
        onPrevious={() => goToTrack(-1)}
        onNext={() => goToTrack(1)}
      />

      <Routes>
        <Route
          index
          element={
            <HomePage
              props={songs}
              player={playerState}
              onSelectTrack={selectTrack}
              onTogglePlayback={handleTogglePlayback}
              onSeek={handleSeek}
              onPrevious={() => goToTrack(-1)}
              onNext={() => goToTrack(1)}
              setPlayerOpen={setPlayerOpen}
            />
          }
        />
        <Route
          path="albums"
          element={
            <AlbumsPage
              songs={songs}
              player={playerState}
              onSelectTrack={selectTrack}
              setPlayerOpen={setPlayerOpen}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App