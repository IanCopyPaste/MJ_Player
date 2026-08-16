import './css/ButtonHeeHee.css';

function DisplayButton({ song, onSelectTrack }) {
    return (
        <button className='btnTitle' onClick={() => onSelectTrack(song)}>{song.title}</button>
    );
}

function ButtonHeeHee({ btnProps, onSelectTrack }) {
    return (
        <div className='song-buttons'>
            {btnProps.map((song, index) => (
                <DisplayButton
                    key={song.song_id || `${song.title}-${index}`}
                    song={song}
                    onSelectTrack={onSelectTrack || (() => {})}
                />
            ))}
        </div>
    );
}

export default ButtonHeeHee