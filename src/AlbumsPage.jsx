import { useMemo, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BadCover from './assets/AlbumImages/Bad.jpg';
import BenCover from './assets/AlbumImages/Ben.jpg';
import DangerousCover from './assets/AlbumImages/Dangerous.jpg';
import ForeverMichaelCover from './assets/AlbumImages/ForeverMichael.jpg';
import GotToBeThereCover from './assets/AlbumImages/GotToBeThere.jpg';
import InvincibleCover from './assets/AlbumImages/Invincible.jpg';
import MusicAndMeCover from './assets/AlbumImages/MusicAndMe.jpg';
import OffTheWallCover from './assets/AlbumImages/OffTheWall.jpg';
import ThrillerCover from './assets/AlbumImages/Thriller.jpg';
import playMusicIcon from './assets/PlayerAssets/playMusic.png';
import dropDownIcon from './assets/AlbumPageImages/DropDown.png';
import dropUpIcon from './assets/AlbumPageImages/DropUp.png';
import './css/AlbumsPage.css';

const albumCovers = {
    Bad: BadCover,
    Ben: BenCover,
    Dangerous: DangerousCover,
    ForeverMichael: ForeverMichaelCover,
    GotToBeThere: GotToBeThereCover,
    Invincible: InvincibleCover,
    MusicAndMe: MusicAndMeCover,
    OffTheWall: OffTheWallCover,
    Thriller: ThrillerCover,
};

const getCoverKey = (albumImage) => albumImage.split('/').pop().replace('.jpg', '');

function AlbumsPage({ songs, player, onSelectTrack, setPlayerOpen }) {
    const [openAlbum, setOpenAlbum] = useState('');

    const albums = useMemo(() => {
        const groupedAlbums = new Map();

        songs.forEach((song, index) => {
            if (!groupedAlbums.has(song.album)) {
                groupedAlbums.set(song.album, {
                    name: song.album,
                    releaseDate: song.release_date,
                    cover: albumCovers[getCoverKey(song.album_image)],
                    songs: [],
                });
            }

            groupedAlbums.get(song.album).songs.push({ song, index });
        });

        return [...groupedAlbums.values()];
    }, [songs]);

    const toggleAlbum = (albumName) => {
        setOpenAlbum((currentAlbum) => currentAlbum === albumName ? '' : albumName);
    };

    return (
        <>
            <Header />

            <main className="albums-page">
                {!player.isOpen && (
                    <button
                        type="button"
                        className="floating-player-button"
                        onClick={() => setPlayerOpen(true)}
                        aria-label="Open music player"
                    >
                        <img src={playMusicIcon} alt="Open music player" />
                    </button>
                )}

                <section className="albums-hero">
                    <p className="eyebrow">The complete collection</p>
                    <h1>Michael Jackson albums</h1>
                    <p>Explore every album and choose a song to start listening.</p>
                </section>

                <section className="albums-list-section" aria-label="Michael Jackson album list">
                    <div className="albums-list-heading">
                        <div>
                            <p className="eyebrow">Discography</p>
                            <h2>All albums</h2>
                        </div>
                        <span>{albums.length} albums</span>
                    </div>

                    <div className="albums-list">
                        {albums.map((album, index) => {
                            const isOpen = openAlbum === album.name;

                            return (
                                <article className={`album-dropdown ${isOpen ? 'is-open' : ''}`} key={album.name}>
                                    <button
                                        type="button"
                                        className="album-dropdown-trigger"
                                        onClick={() => toggleAlbum(album.name)}
                                        aria-expanded={isOpen}
                                        aria-controls={`songs-${index}`}
                                    >
                                        <img src={album.cover} alt={`${album.name} album cover`} />
                                        <span className="album-dropdown-info">
                                            <span className="album-dropdown-title">{album.name}</span>
                                            <span className="album-dropdown-meta">Michael Jackson · {album.releaseDate}</span>
                                        </span>
                                        <span className="album-song-count">{album.songs.length} songs</span>
                                        <span className="album-chevron" aria-hidden="true">
                                            <img src={isOpen ? dropDownIcon : dropUpIcon} alt="" />
                                        </span>
                                    </button>

                                    <div
                                        className={`album-song-panel ${isOpen ? 'is-open' : ''}`}
                                        id={`songs-${index}`}
                                        aria-hidden={!isOpen}
                                    >
                                        {album.songs.map(({ song, index: songIndex }, songNumber) => (
                                            <button
                                                type="button"
                                                className="album-song-row"
                                                key={song.song_id}
                                                onClick={() => onSelectTrack(song, songIndex)}
                                            >
                                                <span className="album-song-number">{String(songNumber + 1).padStart(2, '0')}</span>
                                                <span className="album-song-title">{song.title}</span>
                                                <span className="album-song-play">Play</span>
                                            </button>
                                        ))}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default AlbumsPage;
