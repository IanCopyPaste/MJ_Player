import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import playMusicIcon from './assets/PlayerAssets/playMusic.png';

// Images
import Mj_header4 from './assets/HomePageAssets/Mj_header4.jpg';
import movieImg1 from './assets/LegacyPageImages/michael_movie.jpg';
import movieImg2 from './assets/LegacyPageImages/michael_movie2.jpg';
import movieImg3 from './assets/LegacyPageImages/michael_movie3.jpg';

import './css/LegacyPage.css';

function LegacyPage({ player, setPlayerOpen }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />

            <main className="legacy-page">
                {player && !player.isOpen && (
                    <button
                        type="button"
                        className="floating-player-button"
                        onClick={() => setPlayerOpen(true)}
                        aria-label="Toggle music player"
                    >
                        <img src={playMusicIcon} alt="Open music player" />
                    </button>
                )}

                <section className="legacy-hero" style={{ backgroundImage: `url(${Mj_header4})` }}>
                    <div className="legacy-hero-overlay"></div>
                    <div className="legacy-hero-content">
                        <p className="eyebrow">A Timeless Impact</p>
                        <h1>The Architect of Modern Pop</h1>
                    </div>
                </section>

                <section className="legacy-influence">
                    <div className="legacy-influence-content">
                        <h2>Redefining the Genre</h2>
                        <p>
                            Michael Jackson didn't just participate in pop music; he completely redefined what it could be. By seamlessly blending R&B, rock, pop, and dance into a cohesive, electrifying sound, he broke down musical and racial barriers that had long divided the industry.
                        </p>
                        <p>
                            He elevated the music video from a simple promotional tool into a cinematic art form, paving the way for MTV and setting a gold standard that artists still strive to reach today. His influence extends beyond music into fashion, dance, and global humanitarian efforts, solidifying him as the true King of Pop.
                        </p>
                    </div>
                </section>

                <section className="movie-section">
                    <div className="movie-section-header">
                        <p className="eyebrow">The Highly Anticipated Biopic</p>
                        <h2>Michael</h2>
                        <p>
                            Starring his very own nephew, Jaafar Jackson, the upcoming cinematic experience promises to deliver an honest and untold portrayal of the brilliant yet complicated man who became a global phenomenon. 
                        </p>
                    </div>

                    <div className="movie-gallery">
                        <div className="movie-gallery-item">
                            <img src={movieImg1} alt="Jaafar Jackson as Michael Jackson scene 1" />
                        </div>
                        <div className="movie-gallery-item">
                            <img src={movieImg2} alt="Jaafar Jackson as Michael Jackson scene 2" />
                        </div>
                        <div className="movie-gallery-item">
                            <img src={movieImg3} alt="Jaafar Jackson as Michael Jackson scene 3" />
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
}

export default LegacyPage;
