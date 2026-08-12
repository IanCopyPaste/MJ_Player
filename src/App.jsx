// /import { useState, useEffect } from 'react'
import './App.css'
import ButtonHeeHee from './components/ButtonHeeHee.jsx'

  const mjMusic = [
    {path:'../public/songs/billie_jean.m4a', title:'billie jean'},
    {path:'../public/songs/beat_it.m4a', title:'beat it'}
  ]

function App() {
  return(
    <div>
        <ButtonHeeHee btnProps={mjMusic}/>
    </div>
  );
}

export default App
