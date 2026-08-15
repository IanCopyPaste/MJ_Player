import { Routes, Route } from 'react-router'
import './css/App.css'
import HomePage from './HomePage.jsx';
import MusicPage from './MusicPage.jsx';

const songs = [
    {
        song_id: 'x7k2m9qp',
        title: 'Billie Jean',
        album: 'Thriller',
        release_date: 'November 30, 1982',
        path: '/songs/thriller/billie_jean.m4a'
    },
    {
        song_id: 'a3f8j1wz',
        title: 'Beat It',
        album: 'Thriller',
        release_date: 'February 14, 1983',
        path: '/songs/thriller/beat_it.m4a'
    },
    {
        song_id: 'q9d4t6ln',
        title: 'Thriller',
        album: 'Thriller',
        release_date: 'January 23, 1984',
        path: '/songs/thriller/thriller.m4a'
    },
    {
        song_id: 'r5v2c8xh',
        title: 'Wanna Be Startin\' Somethin\'',
        album: 'Thriller',
        release_date: 'May 9, 1983',
        path: '/songs/thriller/wanna_be_startin_somethin.m4a'
    },
    {
        song_id: 'h4d1r9vy',
        title: 'Human Nature',
        album: 'Thriller',
        release_date: 'July 3, 1983',
        path: '/songs/thriller/human_nature.m4a'
    },
    {
        song_id: 'm1b7y3sk',
        title: 'Smooth Criminal',
        album: 'Bad',
        release_date: 'October 14, 1988',
        path: '/songs/bad/smooth_criminal.m4a'
    },
    {
        song_id: 'p6w9e2ju',
        title: 'Bad',
        album: 'Bad',
        release_date: 'September 7, 1987',
        path: '/songs/bad/bad.m4a'
    },
    {
        song_id: 'z4h8n5cd',
        title: 'Man in the Mirror',
        album: 'Bad',
        release_date: 'January 6, 1988',
        path: '/songs/bad/man_in_the_mirror.m4a'
    },
    {
        song_id: 'k2t6g1vf',
        title: 'The Way You Make Me Feel',
        album: 'Bad',
        release_date: 'November 17, 1987',
        path: '/songs/bad/the_way_you_make_me_feel.m4a'
    },
    {
        song_id: 'y9r3l7bm',
        title: 'Black or White',
        album: 'Dangerous',
        release_date: 'November 11, 1991',
        path: '/songs/dangerous/black_or_white.m4a'
    },
    {
        song_id: 'e5n1o8dq',
        title: 'Remember the Time',
        album: 'Dangerous',
        release_date: 'February 16, 1992',
        path: '/songs/dangerous/remember_the_time.m4a'
    },
    {
        song_id: 'w3c9f4ta',
        title: 'Don\'t Stop \'Til You Get Enough',
        album: 'Off the Wall',
        release_date: 'July 28, 1979',
        path: '/songs/off_the_wall/dont_stop_til_you_get_enough.m4a'
    },
    {
        song_id: 'g8j2l6nx',
        title: 'Rock with You',
        album: 'Off the Wall',
        release_date: 'October 20, 1979',
        path: '/songs/off_the_wall/rock_with_you.m4a'
    },
    {
        song_id: 'i6f8k2op',
        title: 'You Are Not Alone',
        album: 'HIStory',
        release_date: 'August 15, 1995',
        path: '/songs/history/you_are_not_alone.m4a'
    },
    {
        song_id: 'u1s5t7bc',
        title: 'Earth Song',
        album: 'HIStory',
        release_date: 'November 27, 1995',
        path: '/songs/history/earth_song.m4a'
    },
];
function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage props={songs} />} />
        <Route path="/music" element={<MusicPage props={songs} />} />
      </Routes>
    </> 
  );
}

export default App