import { useState, useEffect, useRef } from 'react'
import "./css/ButtonHeeHee.css";

function DisplayButton({ filePath, title, newSongPlaying }) {
    function playSound(file) {
        newSongPlaying(file);
        console.log(file);
    }
    return (
        <>
            <button className='btnTitle' onClick={() => playSound(filePath)}>{title}</button>
        </>
    );
}

function ButtonHeeHee({ btnProps }) {
    const [currSong, newSong] = useState('')
    const srcRef = useRef(null);

    useEffect(() => {
        if (currSong && srcRef.current) {
            srcRef.current.load();
            srcRef.current.play();
        }
    }, [currSong]);
    return (
        <>
            <div className='song-buttons'>
                {btnProps.map((e, i) => (<DisplayButton key={i} filePath={e.path} title={e.title} newSongPlaying={newSong} />))}
            </div>
            <div className='player'>
                <div className='audio-shell'>
                    <audio className='audio-player' src={currSong ? currSong : null} ref={srcRef} controls />
                </div>
            </div>  
        </>
    );
}

export default ButtonHeeHee