import { useState, useEffect, useRef } from 'react'
import "./ButtonHeeHee.css";

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

    useEffect(()=>{
        if(currSong && srcRef.current){
            srcRef.current.load();
            srcRef.current.play();
        }
    });
    return (
        <>
            {btnProps.map((e, i) => (<DisplayButton key={i} filePath={e.path} title={e.title} newSongPlaying={newSong} />))}
            <div className='player'>
                <audio src={currSong ? currSong : null} ref={srcRef} controls/>
                {console.log('output')}
            </div>  
        </>
    );
}

export default ButtonHeeHee