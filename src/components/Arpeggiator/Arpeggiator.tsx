/* This doesn't work yet, I'm still experimenting with it */
import React, { useState } from 'react';
import * as Tone from 'tone';

const validNoteNames = new Set(['A', 'Ab', 'A#', 'B', 'Bb', 'C', 'C#', 'D', 'Db', 'D#', 'E', 'Eb', 'F', 'F#', 'G', 'G#', 'Gb']);
const validNoteSuffixes = new Set(['0','1','2','3','4','5','6','7']);

const checkNote = (input: string) => {
    if(input.length === 2) {
        return validNoteNames.has(input[0]) && validNoteSuffixes.has(input[1]);
    }
    if(input.length === 3) {
        return validNoteNames.has(input.slice(0,2)) && validNoteSuffixes.has(input[2]);
    }
    return false;
}

const validateInput = (input: string) => input.split(' ').every(checkNote);

const defaultPattern = 'C4 G4 C5 D5 Eb5 D5 C5 G5 Eb5 C6 G5 Eb6 D6 C6 Ab5 G5';

export const Arpeggiator = () => {
   const synth = new Tone.Synth().toDestination();
   const [notes, setNotes] = useState(defaultPattern);
   const [pattern, setPattern] = useState(new Tone.Pattern((time, note : any) => {
       synth.triggerAttackRelease(note, '16n', time);
   }, notes.split(' '), 'up'));
   const [displayPattern, setDisplayPattern] = useState(defaultPattern);

   const stopMusic = () => {
       Tone.Transport.stop();
       Tone.Transport.cancel(0);
   }
   // change type or e when you find it
   const handleNoteChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setNotes(e.target.value);
    }

    const playMusic = () => {
        pattern.start(0);
        Tone.Transport.start('+0.1');
    }

    const submitPattern = () => {
        if(validateInput(notes)) {
            setPattern(new Tone.Pattern((time, note: any) => {
                synth.triggerAttackRelease(note, '16n', time);
            }, notes.split(' '), 'up'));
            setDisplayPattern(notes);
        } else {
           alert('invalid note string');
        }
    }

    return (
        <div id='arpeggiator'>
            <p>Enter a pattern into the text box that you want to play.  The pattern should consist of note names (C4, Eb5, etc.) separated by spaces</p>
            <p>Click Play to play the currently submitted pattern, Stop to stop playing, and Submit Pattern to submit the pattern in the text box.</p>
            <span id='arpeggiator-input' style={{display: 'flex', flexDirection: 'row'}}>
                <input value={notes} onChange={handleNoteChange} style={{width: '50%'}}/>
                <button onClick={submitPattern}>Submit Pattern</button>
            </span>
            <p>Current pattern: <span id='current-pattern' style={{color: 'darkgrey'}}>{displayPattern}</span></p>
            <div id='play-buttons' style={{display: 'flex', flexDirection: 'row'}}>
                <button onClick={playMusic}>Play</button>
                <button onClick={stopMusic}>Stop</button>
            </div>
            <p style={{color: 'darkred'}}>After clicking stop you need to resubmit the pattern for it to play again.  I'm currently working on figuring out why that is</p>
        </div>
    );
}