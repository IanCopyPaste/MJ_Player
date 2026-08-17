import { useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router';
import './css/App.css';
import HomePage from './HomePage.jsx';
import PlayerModal from './components/PlayerModal.jsx';
import songs from '../songs.js'


function App() {
  const audioRef = useRef(null);
  const [playerState, setPlayerState] = useState({
    isOpen: false,
    currentTrackIndex: -1,
    nowPlayingTitle: 'Michael Jackson',
    isAudioPlaying: false,
    currentTime: 0,
    duration: 0,
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
    audio.addEventListener('ended', syncPlayback);

    return () => {
      audio.removeEventListener('loadedmetadata', syncMetadata);
      audio.removeEventListener('timeupdate', syncTime);
      audio.removeEventListener('play', syncPlayback);
      audio.removeEventListener('pause', syncPlayback);
      audio.removeEventListener('ended', syncPlayback);
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

  const setPlayerOpen = (value) => {
    setPlayerState((prev) => ({ ...prev, isOpen: value }));
  };

  return (
    <>
      <audio ref={audioRef} className="audio-player" preload="metadata" />

      <PlayerModal
        isOpen={playerState.isOpen}
        title={playerState.nowPlayingTitle}
        isPlaying={playerState.isAudioPlaying}
        onToggle={handleTogglePlayback}
        onClose={() => setPlayerOpen(false)}
        currentTime={playerState.currentTime}
        duration={playerState.duration}
        onSeek={handleSeek}
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
      </Routes>
    </>
  );
}

export default App