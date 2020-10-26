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

const defaultPattern = 'C3 G3 C4 D4 Eb4 G4 C5 D5';

export const Arpeggiator = () => {
    const synth = new Tone.Synth().toDestination();
    const [noteString, setNoteString] = useState(defaultPattern);
    const [seq, setSeq] = useState(new Tone.Sequence((time, note) => {
        synth.triggerAttackRelease(note, '16n');
    }, defaultPattern.split(' ')));

    const handlePlay = () => {
        Tone.Transport.bpm.value = 130;
        if(validateInput(noteString)) {
            
            setSeq(new Tone.Sequence((time, note) => {
                synth.triggerAttackRelease(note, '16n');
            }, noteString.split(' ')));

            seq.start();
            Tone.Transport.start();

        } else {
            alert('please use a valid note string');
        }
    }

    const handleStop = () => {
        Tone.Transport.stop();
    }

    return (
        <div className='arpeggiator'>
            <p>Input a note string for the arpeggiator.  Note strings should be individual notes (e.g Ab3) separated by spaces:</p>
            <input type='text' value={noteString} onChange={(e) => setNoteString(e.target.value)}/>
            <button onClick={handlePlay}>Play</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    )
}