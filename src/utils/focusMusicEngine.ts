/**
 * Focus Music for Work and Studying, Background Music for Concentration, Study Music
 * Web Audio API ambient relaxing synthesizer for peaceful bakery background ambiance.
 */

class FocusMusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private volume: number = 0.35; // Comfortable background level
  private step: number = 0;

  // Calming chords (frequencies in Hz) representing peaceful ambient focus progression:
  // Cmaj7 -> Am9 -> Fmaj7 -> Gsus4 (warm electric piano / meditation study tones)
  private chordProgressions = [
    // Cmaj7: C3, G3, B3, E4, G4
    [130.81, 196.00, 246.94, 329.63, 392.00],
    // Am9: A2, E3, G3, C4, B4
    [110.00, 164.81, 196.00, 261.63, 493.88],
    // Fmaj7: F2, C3, A3, E4, A4
    [87.31, 130.81, 220.00, 329.63, 440.00],
    // Gsus4 / G6: G2, D3, G3, C4, E4
    [98.00, 146.83, 196.00, 261.63, 329.63],
  ];

  public getTrackName(): string {
    return 'Focus Music for Work and Studying, Background Music for Concentration, Study Music';
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      // Lowpass filter for smooth, warm focus/lo-fi quality (no harsh high frequencies)
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(800, this.ctx.currentTime);
      lowpass.Q.setValueAtTime(1.2, this.ctx.currentTime);

      this.masterGain.connect(lowpass);
      lowpass.connect(this.ctx.destination);
    }
  }

  private playWarmNote(freq: number, startTime: number, duration: number, velocity: number = 0.15) {
    if (!this.ctx || !this.masterGain) return;

    // Dual oscillator: Warm Sine (fundamental) + Triangle (harmonic richness)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'triangle';
    // Subtle detune for rich chorus feel
    osc2.frequency.setValueAtTime(freq, startTime);
    osc2.detune.setValueAtTime(3.5, startTime);

    // Envelope: Gentle attack, long relaxing decay
    const attack = 0.4;
    const release = 2.2;
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(velocity, startTime + attack);
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.4, startTime + duration * 0.6);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + release);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + release + 0.1);
    osc2.stop(startTime + duration + release + 0.1);
  }

  private scheduleNextMeasure() {
    if (!this.isPlaying || !this.ctx) return;

    const chord = this.chordProgressions[this.step % this.chordProgressions.length];
    const now = this.ctx.currentTime;
    const chordDuration = 4.2; // seconds per calming chord

    // Play bass root softly
    this.playWarmNote(chord[0], now, chordDuration, 0.18);

    // Arpeggiate chord tones gently like soft raindrops / warm keys
    chord.slice(1).forEach((freq, idx) => {
      const noteDelay = idx * 0.38;
      this.playWarmNote(freq, now + noteDelay, chordDuration - noteDelay, 0.12);
    });

    // Add high shimmering focus bell tone occasionally
    if (this.step % 2 === 0 && chord[3]) {
      this.playWarmNote(chord[3] * 2, now + 1.8, 2.5, 0.04);
    }

    this.step++;

    // Schedule next chord
    this.timerId = window.setTimeout(() => {
      this.scheduleNextMeasure();
    }, (chordDuration - 0.2) * 1000);
  }

  public async start(): Promise<boolean> {
    try {
      this.initContext();
      if (!this.ctx) return false;

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      if (this.isPlaying) return true;

      this.isPlaying = true;
      this.scheduleNextMeasure();
      return true;
    } catch (err) {
      console.warn('Audio playback not allowed or failed:', err);
      this.isPlaying = false;
      return false;
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }
}

export const focusMusic = new FocusMusicEngine();
