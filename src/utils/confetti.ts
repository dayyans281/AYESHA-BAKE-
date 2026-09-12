import confetti from 'canvas-confetti';

/**
 * Bulletproof Confetti Trigger
 * Solves the known browser/worker bug where OffscreenCanvas throws:
 * "Uncaught TypeError: canvas.getBoundingClientRect is not a function"
 * By explicitly setting `useWorker: false`, canvas-confetti uses the DOM canvas
 * directly on the main thread and avoids the broken worker resize path.
 */

let instance: confetti.CreateTypes | null = null;

function getConfettiInstance() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  if (!instance) {
    try {
      instance = confetti.create(null as unknown as HTMLCanvasElement, {
        resize: true,
        useWorker: false,
        disableForReducedMotion: true,
      });
    } catch (err) {
      console.warn('Could not initialize custom confetti instance, falling back:', err);
    }
  }

  return instance;
}

export function triggerConfetti(options?: confetti.Options): Promise<null> | void {
  try {
    const fire = getConfettiInstance();
    if (fire) {
      return fire({
        origin: { y: 0.6 },
        spread: 70,
        particleCount: 50,
        ...options,
      });
    }
  } catch (error) {
    // Gracefully handle any unexpected canvas/DOM errors
    console.warn('Confetti animation skipped:', error);
  }
}

export default triggerConfetti;
