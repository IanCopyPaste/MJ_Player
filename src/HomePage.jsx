//component
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PlayerModal from './components/PlayerModal';
import ButtonHeeHee from './components/ButtonHeeHee';
import Mj_header from './assets/HomePageAssets/Mj_header.jpg';
import Mj_header2 from './assets/HomePageAssets/Mj_header2.jpg';
import Mj_header3 from './assets/HomePageAssets/Mj_header3.jpg';
import Mj_header4 from './assets/HomePageAssets/Mj_header4.jpg';
import Mj_header5 from './assets/HomePageAssets/Mj_header5.jpg';

//css
import './css/HomePage.css';

const typingWords = ['Legend', 'Performer', 'Icon'];
const heroImages = [Mj_header5, Mj_header, Mj_header2, Mj_header3, Mj_header4];

function HomePage({ props }) {
    const [wordIndex, setWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [nowPlayingTitle, setNowPlayingTitle] = useState('Michael Jackson');
    const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const currentWord = typingWords[wordIndex];

        if (displayText === currentWord && !isDeleting) {
            const pauseTimeout = setTimeout(() => setIsDeleting(true), 1000);
            return () => clearTimeout(pauseTimeout);
        }

        const speed = isDeleting ? 80 : 120;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                const nextText = currentWord.slice(0, displayText.length + 1);
                setDisplayText(nextText);
            } else {
                const nextText = currentWord.slice(0, displayText.length - 1);
                setDisplayText(nextText);

                if (nextText === '') {
                    setIsDeleting(false);
                    setWordIndex((prev) => (prev + 1) % typingWords.length);
                }
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, wordIndex]);

    useEffect(() => {
        const slideTimer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroImages.length);
        }, 3000);

        return () => clearInterval(slideTimer);
    }, []);

    useEffect(() => {
        const audio = document.querySelector('.audio-player');

        if (!audio) return undefined;

        const syncMetadata = () => {
            setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
            setCurrentTime(audio.currentTime || 0);
        };

        const syncTime = () => setCurrentTime(audio.currentTime || 0);
        const syncPlayback = () => setIsAudioPlaying(!audio.paused);

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

    useEffect(() => {
        const handleSongClick = (event) => {
            const songButton = event.target.closest('.btnTitle');

            if (!songButton) return;

            const title = songButton.textContent?.trim() || 'Michael Jackson';
            const nextIndex = (props || []).findIndex((item) => item.title === title);

            if (nextIndex !== -1) {
                setCurrentTrackIndex(nextIndex);
            }

            setNowPlayingTitle(title);
            setIsPlayerOpen(true);
            setIsAudioPlaying(true);
        };

        document.addEventListener('click', handleSongClick);

        return () => document.removeEventListener('click', handleSongClick);
    }, [props]);

    const goToTrack = (direction) => {
        const songList = props || [];

        if (!songList.length) return;

        const safeIndex = currentTrackIndex >= 0 ? currentTrackIndex : 0;
        const nextIndex = (safeIndex + direction + songList.length) % songList.length;
        const nextSong = songList[nextIndex];
        const audio = document.querySelector('.audio-player');

        if (!audio || !nextSong) return;

        audio.src = nextSong.path;
        audio.load();
        audio.play();

        setCurrentTrackIndex(nextIndex);
        setNowPlayingTitle(nextSong.title);
        setCurrentTime(0);
        setDuration(0);
        setIsAudioPlaying(true);
        setIsPlayerOpen(true);
    };

    const handleTogglePlayback = () => {
        const audio = document.querySelector('.audio-player');

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
        const audio = document.querySelector('.audio-player');

        if (!audio) return;

        audio.currentTime = time;
        setCurrentTime(time);
    };

    return (
        <>
            <Header />

            <main className="home-page">
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

                {!isPlayerOpen && (
                    <button
                        type="button"
                        className="floating-player-button"
                        onClick={() => setIsPlayerOpen(true)}
                        aria-label="Toggle music player"
                    >
                        <img src={Mj_header5} alt="Open music player" />
                    </button>
                )}

                <section className="hero-section">
                    <div className="hero-slideshow" aria-label="Michael Jackson slideshow">
                        {heroImages.map((image, index) => (
                            <div
                                key={image}
                                className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${image})` }}
                            />
                        ))}
                    </div>

                    <div className="hero-copy">
                        <p className="eyebrow">The King of Pop</p>
                        <h1>Michael Jackson</h1>
                        <h2 className="typewriter-wrap">
                            <span className="typewriter-text">
                                {displayText}
                                <span className="typewriter-cursor" aria-hidden="true" />
                            </span>
                        </h2>

                        <p className="hero-text">
                            Michael Jackson redefined music, dance, and performance with a
                            voice that moved generations and a stage presence that felt larger
                            than life. From the electrifying rhythms of Thriller to the soul of
                            Man in the Mirror, his legacy still shines across the world.
                        </p>

                        <div className="hero-actions">
                            <a href="#featured" className="primary-button">Listen now</a>
                            <a href="#story" className="secondary-button">Explore his story</a>
                        </div>

                        <div className="hero-stats">
                            <div>
                                <strong>13</strong>
                                <span>Grammy Awards</span>
                            </div>
                            <div>
                                <strong>750M+</strong>
                                <span>Records sold</span>
                            </div>
                            <div>
                                <strong>∞</strong>
                                <span>Influence</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="image-frame">
                            <img src={Mj_header} alt="Michael Jackson performing on stage" />
                        </div>
                    </div>
                </section>

                <section className="story-section" id="story">
                    <div className="section-heading">
                        <p className="eyebrow">A legacy that still moves us</p>
                        <h3>Why Michael Jackson still matters</h3>
                    </div>

                    <div className="feature-grid">
                        <article className="feature-card">
                            <span className="feature-number">01</span>
                            <h4>Unmatched stage energy</h4>
                            <p>
                                His performances blended precision choreography, emotion, and
                                charisma into something unforgettable.
                            </p>
                        </article>

                        <article className="feature-card">
                            <span className="feature-number">02</span>
                            <h4>Iconic sound</h4>
                            <p>
                                Michael's songs crossed genres and generations, creating anthems that
                                still feel timeless.
                            </p>
                        </article>

                        <article className="feature-card">
                            <span className="feature-number">03</span>
                            <h4>Global influence</h4>
                            <p>
                                He inspired artists, dancers, and fans around the world to dream
                                bigger and perform with purpose.
                            </p>
                        </article>
                    </div>
                </section>

                <section className="featured-section" id="featured">
                    <div className="section-heading inline-heading">
                        <div>
                            <p className="eyebrow">Featured tracks</p>
                            <h3>Start with the classics</h3>
                        </div>
                    </div>

                    <div className="featured-player">
                        <ButtonHeeHee btnProps={props} />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default HomePage;