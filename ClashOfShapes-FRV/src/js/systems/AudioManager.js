/**
 * AudioManager - Manages game sound effects
 * Handles loading, playing, and managing audio for Clash of Shapes
 */

export class AudioManager {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.7; // Master volume (0.0 to 1.0)
        this.loadingPromises = [];

        // Sound effect definitions
        this.soundDefinitions = {
            jump: {
                mp3: 'assets/audio/sfx/player_jump.mp3',
                ogg: 'assets/audio/sfx/player_jump.ogg',
                volume: 0.6
            },
            clash: {
                mp3: 'assets/audio/sfx/enemy_clash.mp3',
                ogg: 'assets/audio/sfx/enemy_clash.ogg',
                volume: 0.8
            },
            pow: {
                mp3: 'assets/audio/sfx/enemy_pow.mp3',
                ogg: 'assets/audio/sfx/enemy_pow.ogg',
                volume: 0.9
            },
            damaged: {
                mp3: 'assets/audio/sfx/player_damaged.mp3',
                ogg: 'assets/audio/sfx/player_damaged.ogg',
                volume: 0.7
            },
            pickupOrb: {
                mp3: 'assets/audio/sfx/pickup_orb.mp3',
                ogg: 'assets/audio/sfx/pickup_orb.ogg',
                volume: 0.5
            },
            pickupCoin: {
                mp3: 'assets/audio/sfx/pickup_coin.mp3',
                ogg: 'assets/audio/sfx/pickup_coin.ogg',
                volume: 0.6
            },
            checkpoint: {
                mp3: 'assets/audio/sfx/checkpoint.mp3',
                ogg: 'assets/audio/sfx/checkpoint.ogg',
                volume: 0.7
            },
            levelComplete: {
                mp3: 'assets/audio/sfx/level_complete.mp3',
                ogg: 'assets/audio/sfx/level_complete.ogg',
                volume: 0.8
            },
            gameOver: {
                mp3: 'assets/audio/sfx/game_over.mp3',
                ogg: 'assets/audio/sfx/game_over.ogg',
                volume: 0.6
            }
        };
    }

    /**
     * Initialize and load all sound effects
     * @returns {Promise} Resolves when all sounds are loaded
     */
    async init() {
        console.log('AudioManager: Initializing...');

        // Load all sound effects
        for (const [name, paths] of Object.entries(this.soundDefinitions)) {
            const promise = this.loadSound(name, paths.mp3, paths.ogg, paths.volume);
            this.loadingPromises.push(promise);
        }

        try {
            await Promise.all(this.loadingPromises);
            console.log('AudioManager: All sounds loaded successfully');
            return true;
        } catch (error) {
            console.error('AudioManager: Error loading sounds:', error);
            return false;
        }
    }

    /**
     * Load a single sound effect
     * @param {string} name - Sound identifier
     * @param {string} mp3Path - Path to MP3 file
     * @param {string} oggPath - Path to OGG file
     * @param {number} defaultVolume - Default volume for this sound
     * @returns {Promise}
     */
    async loadSound(name, mp3Path, oggPath, defaultVolume = 1.0) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();

            // Try OGG first (better compression), fallback to MP3
            const canPlayOgg = audio.canPlayType('audio/ogg; codecs="vorbis"');
            audio.src = canPlayOgg ? oggPath : mp3Path;

            // Store the audio element and its default volume
            this.sounds[name] = {
                audio: audio,
                defaultVolume: defaultVolume,
                isLoaded: false
            };

            audio.addEventListener('canplaythrough', () => {
                this.sounds[name].isLoaded = true;
                console.log(`AudioManager: Loaded ${name} (${audio.src})`);
                resolve();
            }, { once: true });

            audio.addEventListener('error', (e) => {
                console.error(`AudioManager: Error loading ${name}:`, e);
                reject(e);
            });

            // Start loading
            audio.load();
        });
    }

    /**
     * Play a sound effect
     * @param {string} name - Sound identifier
     * @param {number} volumeMultiplier - Optional volume multiplier (0.0 to 1.0)
     */
    play(name, volumeMultiplier = 1.0) {
        if (!this.enabled || !this.sounds[name]) {
            return;
        }

        const soundData = this.sounds[name];

        if (!soundData.isLoaded) {
            console.warn(`AudioManager: Sound "${name}" not loaded yet`);
            return;
        }

        // Clone the audio element to allow overlapping sounds
        const sound = soundData.audio.cloneNode();
        sound.volume = this.volume * soundData.defaultVolume * volumeMultiplier;

        // Play the sound
        sound.play().catch(error => {
            console.error(`AudioManager: Error playing ${name}:`, error);
        });

        // Clean up the cloned element after it finishes playing
        sound.addEventListener('ended', () => {
            sound.remove();
        });
    }

    /**
     * Set master volume
     * @param {number} volume - Volume level (0.0 to 1.0)
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    /**
     * Get current master volume
     * @returns {number} Current volume level
     */
    getVolume() {
        return this.volume;
    }

    /**
     * Enable audio playback
     */
    enable() {
        this.enabled = true;
        console.log('AudioManager: Audio enabled');
    }

    /**
     * Disable audio playback
     */
    disable() {
        this.enabled = false;
        console.log('AudioManager: Audio disabled');
    }

    /**
     * Toggle audio on/off
     * @returns {boolean} New enabled state
     */
    toggle() {
        this.enabled = !this.enabled;
        console.log(`AudioManager: Audio ${this.enabled ? 'enabled' : 'disabled'}`);
        return this.enabled;
    }

    /**
     * Check if audio is enabled
     * @returns {boolean} True if audio is enabled
     */
    isEnabled() {
        return this.enabled;
    }

    /**
     * Stop all currently playing sounds (if needed)
     */
    stopAll() {
        // Note: This would require tracking all cloned audio elements
        // For now, we'll just disable future sounds
        console.log('AudioManager: Stopping all sounds');
    }
}
