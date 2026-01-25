# 🧩 Negentropic Console (Electron Sandbox)

A real-time visualization of the **Negentropic Coupling Framework** built with Quantum-Electron for secure, context-isolated execution.

---

## Features

- **Live entropy & negentropy graphs** - Real-time visualization of information dynamics
- **Dynamic policy map** - Color-coded display of macro/balanced/defensive policies
- **Mesh coherence visualizer** - Force-directed graph showing network coupling
- **Interactive simulation controls** - Start, stop, step, and reset simulations
- **Auto-demo mode** - Automatic simulation for presentations and demos

---

## Architecture

The console is built with security-first principles:

- **Context Isolation**: `contextIsolation: true`
- **Sandboxed Renderer**: `sandbox: true`
- **No Node Integration**: `nodeIntegration: false`
- **Typed IPC Bridge**: Preload script exposes only safe, typed APIs

### Directory Structure

```
console/
├── src/
│   ├── main/
│   │   ├── index.ts          # Electron app entry
│   │   └── simulation.ts     # NCF simulation backend
│   ├── preload/
│   │   └── index.ts          # Safe IPC bridge (contextIsolation = true)
│   └── renderer/
│       ├── App.tsx           # React/Vite UI
│       ├── main.tsx          # Renderer entry point
│       ├── types.ts          # TypeScript type definitions
│       ├── components/
│       │   ├── EntropyField.tsx      # Time-series chart
│       │   ├── NegentropyGauge.tsx   # Live metrics display
│       │   ├── CouplingMap.tsx       # Force-directed graph
│       │   └── PolicyConsole.tsx     # Policy statistics
│       └── styles/
│           └── theme.css     # Dark theme styling
├── package.json
├── tsconfig.json
├── tsconfig.main.json
└── vite.config.ts
```

---

## Installation

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+ (for backend simulation, optional)

### Install Dependencies

```bash
cd console
npm install
```

---

## Usage

### Development Mode

Launch the console in development mode with hot-reload:

```bash
npm run dev:console
```

This will:
1. Start the Vite dev server at `http://localhost:5173`
2. Open the Electron window with DevTools
3. Enable hot-reload for instant updates

### Production Build

Build the console for production:

```bash
npm run build:console
```

The packaged application will be available in the `release/` directory.

---

## Components

### 1. Coupling Map

Force-directed graph visualization showing:
- Nodes as network agents
- Edges as communication channels
- Color-coded by policy:
  - 🟢 **Green** (Macro): N > 0.8 - High order, synchronized
  - 🟡 **Orange** (Balanced): 0.3 ≤ N ≤ 0.8 - Transitional
  - 🔴 **Red** (Defensive): N < 0.3 - Low order, fragmented

### 2. Negentropy Gauge

Real-time metrics display:
- **Negentropy (N)**: Order/coherence measure (0-1)
- **Coherence (C)**: Bidirectional alignment (0-1)
- **Entropy Velocity (v)**: Rate of informational change

### 3. Entropy Field Evolution

Time-series chart showing:
- Negentropy evolution over time
- Coherence trends
- Velocity fluctuations

### 4. Policy Console

Statistics and logs:
- Distribution of policies across edges
- Real-time edge metrics
- Policy assignment logs

### 5. NBO Visualization (theory mapping)

Negentropic Basin Operator outputs map cleanly into the UI as diagnostic layers:

- **Basin depth**: `epiplexity` -> glow intensity or bar height
- **Pressure**: `stable_state` -> arrow bias / directional indicator
- **Width / confidence**: `basin_width_raw`, `basin_width_penalty` -> ring width or halo thickness
- **Top contributors**: `topNodes` list, with `alignment` color
  - stabilizing = green
  - destabilizing = red
  - neutral = gray
- **Freshness**: `updatedAt` + `ageMs` -> staleness badge / faded styling

This keeps the telemetry shape stable while letting the UI decide how "fresh"
the NBO field needs to be for display or control hints.

---

## Security Features

The console implements Quantum-Electron security baseline:

1. **Context Isolation**: Renderer process cannot access Node.js APIs
2. **Sandbox Mode**: Renderer runs in restricted environment
3. **IPC Bridge**: Only whitelisted APIs exposed via preload script:
   ```typescript
   window.ncf = {
     runSimulation: (params) => ipcRenderer.invoke('ncf:run', params),
     step: () => ipcRenderer.invoke('ncf:step'),
     getState: () => ipcRenderer.invoke('ncf:state'),
     reset: (params) => ipcRenderer.invoke('ncf:reset', params)
   }
   ```

### Security Verification

✅ **CodeQL Security Scan**: Passed with 0 vulnerabilities  
✅ **Code Review**: All issues addressed  
✅ **TypeScript Strict Mode**: Enabled for type safety  
✅ **Dependency Audit**: No critical vulnerabilities

---

## API Reference

### `window.ncf.runSimulation(params)`

Initialize and run simulation.

**Parameters:**
- `nodes`: Number of nodes (default: 5)
- `edges`: Number of edges (default: 10)
- `mode`: Simulation mode - 'macro', 'defensive', or 'balanced' (default: 'macro')
- `steps`: Number of steps (default: 100)

**Returns:** `Promise<{ success: boolean, state: SimulationState }>`

### `window.ncf.step()`

Execute one simulation step.

**Returns:** `Promise<{ success: boolean, metrics: SimulationMetrics }>`

### `window.ncf.getState()`

Get current simulation state.

**Returns:** `Promise<{ success: boolean, state: SimulationState }>`

### `window.ncf.reset(params)`

Reset simulation with new parameters.

**Parameters:** Same as `runSimulation()`

**Returns:** `Promise<{ success: boolean, state: SimulationState }>`

---

## Troubleshooting

### Electron fails to start

Make sure all dependencies are installed:
```bash
npm install
```

### Vite dev server not found

The Electron window waits for Vite to start. If it times out, manually start Vite first:
```bash
npm run dev
```

Then in another terminal:
```bash
npm run electron:dev
```

### Build errors with TypeScript

Clean the build cache and rebuild:
```bash
rm -rf dist/
npm run build
```

---

## Related Files

- Main theory: [`../THEORY_NEGENTROPIC_COUPLING_v1.md`](../THEORY_NEGENTROPIC_COUPLING_v1.md)
- Python simulation: [`../models/NCF_simulation.py`](../models/NCF_simulation.py)
- Wolfram simulation: [`../models/NCF_simulation.wl`](../models/NCF_simulation.wl)

---

## License

MIT License - See [LICENSE.md](../LICENSE.md)

---

## Citation

> gsknnft (2025).  
> **The Negentropic Coupling Framework (NCF) v1.0.**  
> SigilNet Research Series.  
> https://github.com/gsknnft/NegatropicCouplingTheory
