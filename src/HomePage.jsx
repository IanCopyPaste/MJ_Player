//component
import { useEffect, useState } from 'react';
import Header from './components/Header';
import ButtonHeeHee from './components/ButtonHeeHee';
import Mj_header from './assets/HomePageAssets/Mj_header.jpg';

//css
import './css/HomePage.css';

const typingWords = ['Legend', 'Performer', 'Icon'];

function HomePage({ props }) {
    const [wordIndex, setWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

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

    return (
        <>
            <Header />

            <main className="home-page">
                <section className="hero-section">
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
        </>
    );
}

export default HomePage;