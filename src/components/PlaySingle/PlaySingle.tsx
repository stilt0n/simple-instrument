import React, { useState } from 'react';
import * as Tone from 'tone';

const notes = 'C4 Db4 D4 Eb4 E4 F4 Gb4 G4 Ab4 A4 Bb4 B4 C5'.split(' ');
const rhythms = '2n 4n 8n 16n'.split(' ');


export const PlaySingle = () => {
    const [note, setNote] = useState('C4');
    const [rhythm, setRhythm] = useState('4n');
    const synth = new Tone.Synth().toDestination();

    const onPlayHandler = () => {
        console.log(`this will play ${note} for a duration of ${rhythm}`);
        synth.triggerAttackRelease(note, rhythm);
    }

    return (
        <div className='single-note-player'>
            <p>select a note:</p>
            <select value={note} onChange={(e) => setNote(e.target.value)}>
                {notes.map(n => <option value={n} key={n}>{n}</option>)}
            </select>
            <p>select a rhythm:</p>
            <select value={rhythm} onChange={(e) => setRhythm(e.target.value)}>
                {rhythms.map(r => <option value={r} key={r}>{r}</option>)}
            </select>
            <button onClick={onPlayHandler}>play</button>
        </div>
    );
}