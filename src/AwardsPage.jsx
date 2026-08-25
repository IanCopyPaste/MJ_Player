import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import playMusicIcon from './assets/PlayerAssets/playMusic.png';
import Mj_header from './assets/HomePageAssets/Mj_header.jpg';
import ThrillerCover from './assets/AlbumImages/Thriller.jpg';
import DangerousCover from './assets/AlbumImages/Dangerous.jpg';
import BadCover from './assets/AlbumImages/Bad.jpg';
import OffTheWallCover from './assets/AlbumImages/OffTheWall.jpg';

import './css/AwardsPage.css';

const awardsData = [
    {
        id: 1,
        title: '13 Grammy Awards',
        description: 'Including the Grammy Legend Award and Grammy Lifetime Achievement Award. He won an unprecedented 8 Grammys in a single night for Thriller.',
        image: ThrillerCover,
        category: 'Music & Recording',
    },
    {
        id: 2,
        title: '26 American Music Awards',
        description: 'Awarded the prestigious "Artist of the Century" and "Artist of the 1980s".',
        image: BadCover,
        category: 'Music & Recording',
    },
    {
        id: 3,
        title: '39 Guinness World Records',
        description: 'Recognized as the "Most Successful Entertainer of All Time" and the highest-earning deceased artist.',
        image: DangerousCover,
        category: 'Global Achievements',
    },
    {
        id: 4,
        title: '16 World Music Awards',
        description: 'Including Best-Selling Pop Male Artist of the Millennium.',
        image: OffTheWallCover,
        category: 'International',
    }
];

function AwardsPage({ player, setPlayerOpen }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Header />

            <main className="awards-page">
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

                <section className="awards-hero" style={{ backgroundImage: `url(${Mj_header})` }}>
                    <div className="awards-hero-overlay"></div>
                    <div className="awards-hero-content">
                        <p className="eyebrow">The Most Awarded Artist in History</p>
                        <h1>Hall of Fame</h1>
                        <p className="awards-subtitle">
                            A testament to the unparalleled legacy of the King of Pop. 
                            From shattering records to breaking barriers, his achievements remain unmatched.
                        </p>
                    </div>
                </section>

                <section className="awards-stats-banner">
                    <div className="stat-item">
                        <h2>800+</h2>
                        <p>Global Awards</p>
                    </div>
                    <div className="stat-item">
                        <h2>2</h2>
                        <p>Rock & Roll Hall of Fame Inductions</p>
                    </div>
                    <div className="stat-item">
                        <h2>1st</h2>
                        <p>Artist to sell over 100 million copies of one album</p>
                    </div>
                </section>

                <section className="awards-grid-section">
                    <div className="section-header">
                        <h2>Monumental Milestones</h2>
                        <p>A look at the cornerstone awards that defined an era.</p>
                    </div>

                    <div className="awards-grid">
                        {awardsData.map(award => (
                            <article key={award.id} className="award-card">
                                <div className="award-image-wrap">
                                    <img src={award.image} alt={award.title} />
                                    <div className="award-category">{award.category}</div>
                                </div>
                                <div className="award-content">
                                    <h3>{award.title}</h3>
                                    <p>{award.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="legacy-quote">
                    <blockquote>
                        "I'm just happy to be creating. It's the most beautiful thing in the world."
                    </blockquote>
                    <cite>— Michael Jackson</cite>
                </section>

            </main>

            <Footer />
        </>
    );
}

export default AwardsPage;
