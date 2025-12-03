# Create MIDI Sound Effects for Clash of Shapes

## Objective
Generate MIDI sound effects for the Clash of Shapes game and convert them to web-compatible audio formats (WAV/MP3/OGG) for optimal browser playback.

## Sound Effects Required

### 1. Player Jump
- **Musical Characteristics**: Quick upward pitch sweep
- **Technical Specs**:
  - Start note: C4 (middle C)
  - End note: C5 (one octave up)
  - Duration: 200-300ms
  - Velocity: 80-100
  - Instrument: Square wave or sine wave (MIDI program 80-81)
  - Pattern: Ascending arpeggio or pitch bend
- **Feel**: Light, bouncy, optimistic

### 2. Enemy Hit (Clash)
- **Musical Characteristics**: Metallic collision sound
- **Technical Specs**:
  - Notes: Dissonant chord (e.g., C3, C#3, D3 played simultaneously)
  - Duration: 150-200ms
  - Velocity: 100-127 (loud)
  - Instrument: Metallic percussion (MIDI program 117) or distorted guitar (30)
  - Pattern: Quick attack with fast decay
- **Feel**: Sharp, metallic, impactful

### 3. Enemy Hit (POW)
- **Musical Characteristics**: Explosive impact sound
- **Technical Specs**:
  - Notes: Low punch (C2, C3) followed by high crack (C5, C6)
  - Duration: 250-350ms
  - Velocity: 120-127 (very loud)
  - Instrument: Synth bass (39) + synth lead (81)
  - Pattern: Low note (0-100ms) → brief silence (100-150ms) → high notes (150-350ms)
- **Feel**: Powerful, explosive, satisfying

### 4. Enemy Hit (Player is Damaged)
- **Musical Characteristics**: Downward pitch sweep indicating pain/damage
- **Technical Specs**:
  - Start note: A4
  - End note: A2 (two octaves down)
  - Duration: 400-500ms
  - Velocity: 90-110
  - Instrument: Synth lead (81) or distorted guitar (30)
  - Pattern: Descending glissando or rapid descending notes
  - Optional: Add slight vibrato effect
- **Feel**: Painful, urgent, warning

### 5. Pickup Orb
- **Musical Characteristics**: Magical, mystical collection sound
- **Technical Specs**:
  - Notes: Ascending arpeggio (E4, G4, B4, E5)
  - Duration: 300-400ms
  - Velocity: 70-90 (medium-loud)
  - Instrument: Bells (14), music box (10), or celesta (8)
  - Pattern: Quick ascending notes with slight delay between each
  - Optional: Add reverb effect if possible
- **Feel**: Magical, valuable, enchanting

### 6. Pick Up Coin
- **Musical Characteristics**: Classic coin/ring sound
- **Technical Specs**:
  - Notes: B5, E6 (perfect fifth interval)
  - Duration: 100-150ms
  - Velocity: 80-100
  - Instrument: Bells (14) or music box (10)
  - Pattern: Two quick notes in succession (B5 at 0ms, E6 at 50ms)
- **Feel**: Bright, cheerful, rewarding (classic "ding")

### 7. Checkpoint Enabled
- **Musical Characteristics**: Confirmation jingle indicating progress saved
- **Technical Specs**:
  - Notes: Major triad arpeggio (C4, E4, G4, C5)
  - Duration: 600-800ms
  - Velocity: 85-105
  - Instrument: Vibraphone (11), marimba (12), or bells (14)
  - Pattern: Ascending arpeggio with slight delay between notes
  - Optional: Final note sustains slightly longer
- **Feel**: Reassuring, accomplished, safe

### 8. Level Goal Achieved
- **Musical Characteristics**: Victory fanfare
- **Technical Specs**:
  - Notes: Triumphant progression (C4, E4, G4, C5, E5, G5, C6)
  - Duration: 1000-1500ms
  - Velocity: 100-127 (loud and celebratory)
  - Instrument: Brass section (61), trumpet (56), or synth brass (63)
  - Pattern: Ascending fanfare with rhythmic emphasis
  - Suggested rhythm: Quarter, quarter, half, quarter, quarter, half, whole
- **Feel**: Triumphant, victorious, celebratory

### 9. Game Over
- **Musical Characteristics**: Sad, descending failure sound
- **Technical Specs**:
  - Notes: Descending chromatic or minor scale (C4, B3, Bb3, A3, Ab3, G3)
  - Duration: 1500-2000ms
  - Velocity: 70-90 (moderate, somber)
  - Instrument: Strings (48-49), synth pad (89-90), or organ (19)
  - Pattern: Slow descending notes with gradual decay
  - Optional: Add diminuendo (fade out) toward the end
- **Feel**: Melancholic, defeated, somber

## Implementation Approach

### Option 1: Generate MIDI + Convert to Web Audio (Recommended)

**Step 1**: Generate MIDI files using Python with `midiutil` library
```python
from midiutil import MIDIFile

# Example for Player Jump
track = 0
channel = 0
time = 0
tempo = 120
volume = 100

midi = MIDIFile(1)
midi.addTempo(track, time, tempo)

# Add ascending notes for jump
midi.addNote(track, channel, 60, 0.0, 0.1, 100)  # C4
midi.addNote(track, channel, 64, 0.1, 0.1, 100)  # E4
midi.addNote(track, channel, 67, 0.2, 0.1, 100)  # G4
midi.addNote(track, channel, 72, 0.3, 0.1, 100)  # C5

with open("player_jump.mid", "wb") as output_file:
    midi.writeFile(output_file)
```

**Step 2**: Convert MIDI to WAV/MP3/OGG using:
- **FluidSynth** (command-line tool): `fluidsynth -ni soundfont.sf2 input.mid -F output.wav -r 44100`
- **TiMidity++**: `timidity input.mid -Ow -o output.wav`
- **Online converters** or DAW software (GarageBand, Audacity, etc.)

**Step 3**: Optimize for web:
- Convert WAV to MP3/OGG for smaller file sizes
- Use FFmpeg: `ffmpeg -i input.wav -b:a 128k output.mp3`
- Target sample rate: 44100 Hz
- Target bitrate: 96-128 kbps for sound effects

### Option 2: Web Audio API Direct Synthesis (Alternative)

Generate sounds directly in JavaScript using Web Audio API oscillators. This eliminates the need for audio files but requires more complex code.

### Option 3: JavaScript MIDI Generation

Use `midi-writer-js` library to generate MIDI files in the browser, then convert using Web Audio API with a soundfont player like `soundfont-player`.

## File Structure

After generation, organize files as:
```
src/
  assets/
    audio/
      sfx/
        player_jump.mp3
        player_jump.ogg
        enemy_clash.mp3
        enemy_clash.ogg
        enemy_pow.mp3
        enemy_pow.ogg
        player_damaged.mp3
        player_damaged.ogg
        pickup_orb.mp3
        pickup_orb.ogg
        pickup_coin.mp3
        pickup_coin.ogg
        checkpoint.mp3
        checkpoint.ogg
        level_complete.mp3
        level_complete.ogg
        game_over.mp3
        game_over.ogg
```

## Audio Integration Code Example

```javascript
class AudioManager {
    constructor() {
        this.sounds = {};
        this.enabled = true;
    }

    async loadSound(name, mp3Path, oggPath) {
        const audio = new Audio();
        // Try OGG first (better compression), fallback to MP3
        audio.src = audio.canPlayType('audio/ogg') ? oggPath : mp3Path;
        await audio.load();
        this.sounds[name] = audio;
    }

    play(name, volume = 1.0) {
        if (!this.enabled || !this.sounds[name]) return;

        const sound = this.sounds[name].cloneNode();
        sound.volume = volume;
        sound.play();
    }
}

// Usage in game
const audio = new AudioManager();
await audio.loadSound('jump', 'assets/audio/sfx/player_jump.mp3', 'assets/audio/sfx/player_jump.ogg');
audio.play('jump', 0.7);
```

## Quality Guidelines

1. **Duration**: Keep sound effects short (under 2 seconds except for game over/victory)
2. **Volume**: Normalize all audio files to consistent levels
3. **Format**: Provide both MP3 and OGG for cross-browser compatibility
4. **File Size**: Keep individual files under 50KB when possible
5. **Sample Rate**: 44100 Hz is standard for web audio
6. **Bit Rate**: 96-128 kbps is sufficient for sound effects

## Testing Checklist

- [ ] All 9 sound effects generated as MIDI files
- [ ] MIDI files converted to WAV format
- [ ] WAV files converted to MP3 and OGG
- [ ] Audio files normalized to consistent volume levels
- [ ] Files organized in correct directory structure
- [ ] Audio plays correctly in Chrome, Firefox, and Safari
- [ ] Sound effects match the intended emotional feel
- [ ] File sizes are optimized for web delivery
- [ ] No clipping or distortion in audio playback

## Tools & Resources

**Python Libraries**:
- `midiutil`: pip install MIDIUtil
- `pretty_midi`: pip install pretty_midi

**Conversion Tools**:
- FluidSynth: https://www.fluidsynth.org/
- TiMidity++: http://timidity.sourceforge.net/
- FFmpeg: https://ffmpeg.org/

**Soundfonts** (for MIDI to audio conversion):
- FluidR3_GM.sf2 (General MIDI soundfont)
- MuseScore_General.sf3
- Free soundfonts: https://musescore.org/en/handbook/3/soundfonts-and-sfz-files

**Online Tools**:
- MIDI to MP3 converters
- Audio normalization tools
- Format converters

## Next Steps

1. Set up Python environment with `midiutil`
2. Generate all 9 MIDI files based on specifications above
3. Install FluidSynth or TiMidity++ for conversion
4. Convert MIDI to WAV using a good quality soundfont
5. Convert WAV to MP3 and OGG using FFmpeg
6. Create audio directory structure
7. Implement AudioManager class in game
8. Test all sound effects in-game
9. Adjust volumes and timing as needed based on gameplay feel
