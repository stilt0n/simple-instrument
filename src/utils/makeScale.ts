import _ from 'lodash';
/* This utility allows you to make a scale using a number which corresponds to
a midi note or a note name such as 'C5' the number of octaves you want, and the scale
type (major, minor, harmonic, etc.)*/
const MAJOR_TEMPLATE = [0,2,4,5,7,9,11];
const MINOR_TEMPLATE = [0,2,3,5,7,8,10];
const HARMONIC_MINOR_TEMPLATE = [0,2,3,5,7,8,11];

const scaleMap: Record<string, Array<number>> = {
    'MAJOR': MAJOR_TEMPLATE,
    'MINOR': MINOR_TEMPLATE,
    'HARMONIC': HARMONIC_MINOR_TEMPLATE
};

type ScaleType = 'MAJOR' | 'MINOR' | 'HARMONIC';

const NOTES = 'C C# D D# E F F# G G# A A# B'.split(' ');
const OCTAVES = '_1 0 1 2 3 4 5 6 7 8 9'.split(' ');
const MIDI_NOTES = _.flatten(OCTAVES.map(oct => NOTES.map(note => `${note}${oct}`)));

const ENHARMONICS: Record<string, string> = {
    'Db': 'C#',
    'Eb': 'D#',
    'Gb': 'F#',
    'Ab': 'G#',
    'Bb': 'A#'
};

const convertToSharp = (note: string) => {
    let noteName = ENHARMONICS[note.slice(0,2)];
    return noteName ? `${noteName}${note[2]}` : note;
}

const makeScaleBase = (scale: ScaleType, startingPitch: number) => scaleMap[scale].map(note => MIDI_NOTES[note + startingPitch]);

export const makeScale = (scale: ScaleType, startingPitch: number | string, octaves: number=1, includeOctave: boolean=true) => {

    if(typeof startingPitch === 'string') {
        if(startingPitch[1] === 'b') {
            startingPitch = convertToSharp(startingPitch);
        }
        startingPitch = MIDI_NOTES.indexOf(startingPitch);
    }

    let scaleArr: Array<string> = [];
    
    for(let i = 0; i < octaves; ++i) {
        const offset = i * 12;
        scaleArr = [...scaleArr, ...makeScaleBase(scale, startingPitch + offset)];
    }

    if(includeOctave) {
        scaleArr.push(MIDI_NOTES[startingPitch + 12 * octaves]);
    }

    return scaleArr;
}