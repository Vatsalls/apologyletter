// Synthesizes a soft, romantic music box / kalimba chime tune using Web Audio API
class RomanticMusicBox {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;

  private notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25  // E5
  ];

  // A romantic, cheerful pentatonic tune pattern
  private melody = [2, 4, 5, 4, 2, 0, 1, 2, 4, 5, 6, 5, 4, 2, 0, 2];

  public toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (this.isPlaying) return;
    
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isPlaying = true;

      let index = 0;
      this.timer = window.setInterval(() => {
        if (!this.ctx || !this.isPlaying) return;
        
        const noteFreq = this.notes[this.melody[index % this.melody.length]];
        this.playChime(noteFreq);
        index++;
      }, 600);

    } catch (err) {
      console.error("Audio Context initialization failed:", err);
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }

  private playChime(freq: number) {
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Music box chime envelope
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);
    } catch (e) {
      // Ignore audio glitches
    }
  }
}

export const musicBox = new RomanticMusicBox();
