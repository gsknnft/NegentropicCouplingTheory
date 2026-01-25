import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

const globalWindow = window as unknown as Record<string, any>;

globalWindow.ncf ??= {
  runSimulation: vi.fn().mockResolvedValue({ success: false, error: "mock" }),
  step: vi.fn().mockResolvedValue({ success: false, error: "mock" }),
  getState: vi.fn().mockResolvedValue({ success: false, error: "mock" }),
  reset: vi.fn().mockResolvedValue({ success: false, error: "mock" }),
  uploadScenario: vi.fn().mockResolvedValue({ success: false, error: "mock" }),
};

globalWindow.quantum ??= {
  getStatus: vi.fn().mockResolvedValue({ initialized: false, mode: "classical" }),
};

globalWindow.transportBench ??= {
  runBench: vi.fn().mockResolvedValue({ summary: { scenarios: [] } }),
};

if (!globalWindow.matchMedia) {
  globalWindow.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

const noop = () => {};
const gradient = { addColorStop: () => {} };
const ctxProxy = new Proxy(
  {
    createLinearGradient: () => gradient,
    createRadialGradient: () => gradient,
  },
  {
    get: (target, prop) => (prop in target ? (target as any)[prop] : noop),
  },
);

HTMLCanvasElement.prototype.getContext = () => ctxProxy as unknown as CanvasRenderingContext2D;
