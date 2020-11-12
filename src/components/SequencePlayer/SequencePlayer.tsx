import * as Tone from 'tone';
import React from 'react';

const defaultNotes = ['C4','C5','Eb4','G4'];

interface SequencePlayerProps {
    bpm?: number; // default 100
    notes?: Array<string>; // default defaultNotes
    subdivision?: string; // default '8n'
}

const makePart = (seq: Array<string>, sub: string) => {
    // probably want to set playback rate here too
    const part = new Tone.Part();
    seq.forEach(note => part.add(sub, note));
    return part;
}

export const SequencePlayer = ({ bpm, notes, subdivision} : SequencePlayerProps) => {
    const part = makePart(notes ?? defaultNotes, subdivision ?? '8n');
    // use this value later
    console.log(bpm ?? 100);
    return (<button onClick={() => {
        part.start();
        Tone.Transport.start();
    }}>
        Play
    </button>);
}