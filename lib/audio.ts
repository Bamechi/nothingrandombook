/**
 * AmbienceEngine — optional, frequency-inspired ambient bed.
 * Pure Web Audio synthesis: a soft harmonic drone plus filtered "air".
 * Off by default; the visitor opts in with the sound toggle.
 */

const SCENE_FREQS = [
  174, 174, 285, 285, 396, 396, 417, 417, 528, 639, 741, 852,
  528, 396, 285, 417, 528, 639, 417, 396, 528, 741,
  639, 852, 417, 528, 396, 639, 528, 417, 285, 528, 741, 852,
  528, 285, 639, 417, 528, 741, 396, 528, 417, 639,
  741, 528, 639, 417, 852, 528, 396, 285, 639, 741,
  417, 528, 639, 528, 396, 285, 396, 528, 639, 852,
  528, 639, 417, 285, 528, 396, 528, 639, 741, 852,
  // Entries 71–81 — listening, conversation, energy, the red warning
  639, 639, 417, 741, 528, 639, 417, 528, 741, 852,
  // Entries 82–92 — the climb, the collective, stillness, canvas, clarity
  396, 528, 285, 852, 639, 741, 528, 417, 639, 528, 741,
  // Entries 93–103 — time, vision, streets, taste, standards, the flip
  417, 528, 639, 285, 741, 639, 528, 741, 528, 396, 852,
  // Entries 104–117 — ancestry, word, sacred pages, self, miracles
  285, 528, 417, 852, 639, 396, 528, 741, 417, 528, 852, 639, 417, 852,
  // memory wall, outro pages, author, finale — the exhale
  285, 174, 174, 285, 528,
];

export class AmbienceEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private oscA: OscillatorNode | null = null;
  private oscB: OscillatorNode | null = null;
  private oscGain: GainNode | null = null;
  private noiseGain: GainNode | null = null;
  private running = false;

  get isRunning() {
    return this.running;
  }

  async start() {
    if (this.running) return;
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    this.ctx = this.ctx || new Ctx();
    await this.ctx.resume();

    const ctx = this.ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(ctx.destination);

    // harmonic drone — two detuned sines an octave apart
    this.oscGain = ctx.createGain();
    this.oscGain.gain.value = 0.5;
    this.oscA = ctx.createOscillator();
    this.oscA.type = "sine";
    this.oscA.frequency.value = 174 / 2;
    this.oscB = ctx.createOscillator();
    this.oscB.type = "sine";
    this.oscB.frequency.value = 174;
    this.oscB.detune.value = 4;

    // slow amplitude breathing
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.18;
    lfo.connect(lfoGain);
    lfoGain.connect(this.oscGain.gain);

    this.oscA.connect(this.oscGain);
    this.oscB.connect(this.oscGain);
    this.oscGain.connect(this.master);

    // outdoor air — looped filtered noise
    const seconds = 4;
    const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 420;
    noiseFilter.Q.value = 0.4;
    this.noiseGain = ctx.createGain();
    this.noiseGain.gain.value = 0.05;
    noise.connect(noiseFilter);
    noiseFilter.connect(this.noiseGain);
    this.noiseGain.connect(this.master);

    this.oscA.start();
    this.oscB.start();
    lfo.start();
    noise.start();

    this.master.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 2.4);
    this.running = true;
  }

  /** Glide the drone to the frequency of the given scene index. */
  setScene(index: number) {
    if (!this.ctx || !this.oscA || !this.oscB || !this.running) return;
    const f = SCENE_FREQS[Math.max(0, Math.min(index, SCENE_FREQS.length - 1))];
    const t = this.ctx.currentTime;
    this.oscA.frequency.exponentialRampToValueAtTime(f / 2, t + 3.5);
    this.oscB.frequency.exponentialRampToValueAtTime(f, t + 3.5);
  }

  stop() {
    if (!this.ctx || !this.master || !this.running) return;
    const t = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(t);
    this.master.gain.linearRampToValueAtTime(0, t + 0.8);
    this.running = false;
    setTimeout(() => {
      this.ctx?.suspend();
    }, 900);
  }
}

let engine: AmbienceEngine | null = null;
export function getAmbience(): AmbienceEngine {
  if (!engine) engine = new AmbienceEngine();
  return engine;
}
