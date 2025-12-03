# Shape Shifter - Project Architecture

## Overview
Shape Shifter is built with a **professional modular architecture** using vanilla JavaScript ES6+ modules, organized in a clean folder structure for maintainability and scalability.

---

## Architecture Philosophy

### Modular Design
- **Separation of Concerns**: Each module has a single, well-defined responsibility
- **ES6 Modules**: Using native JavaScript import/export for dependency management
- **No Build Tools Required**: Direct ES6 module loading in modern browsers
- **Scalable Structure**: Easy to add new features without affecting existing code

### Code Organization Principles
1. **Core Systems** (`js/core/`): Fundamental game infrastructure
2. **Entities** (`js/entities/`): Game characters (player, enemies)
3. **Systems** (`js/systems/`): Reusable game systems (particles, physics, collisions)
4. **Objects** (`js/objects/`): Level objects (tiles, collectibles, hazards)
5. **Level** (`js/level/`): Level design and generation
6. **UI** (`js/ui/`): User interface and HUD
7. **Utils** (`js/utils/`): Helper functions and utilities

---

## Project Structure

```
src/
├── index.html                      # Main HTML file
├── css/                            # Stylesheets
│   ├── main.css                    # Main game styles
│   └── ui.css                      # UI-specific styles
├── js/                             # JavaScript modules
│   ├── main.js                     # Entry point
│   ├── config.js                   # Game configuration constants
│   │
│   ├── core/                       # Core game systems
│   │   ├── Game.js                 # Main game class, game loop
│   │   ├── InputManager.js         # Keyboard input handling
│   │   └── Camera.js               # Camera system
│   │
│   ├── entities/                   # Game entities
│   │   ├── Entity.js               # Base entity class
│   │   ├── Player.js               # Player character
│   │   └── Enemy.js                # Enemy entities
│   │
│   ├── systems/                    # Reusable systems
│   │   ├── ParticleSystem.js       # Particle effects
│   │   ├── PhysicsSystem.js        # Physics utilities
│   │   ├── CollisionSystem.js      # Collision detection
│   │   └── TextEffect.js           # Floating text effects
│   │
│   ├── objects/                    # Game objects
│   │   ├── GroundTile.js           # Platform tiles
│   │   ├── Collectible.js          # Base collectible class
│   │   ├── Coin.js                 # Coin collectible
│   │   ├── Orb.js                  # Orb collectible
│   │   ├── Spike.js                # Spike hazard
│   │   ├── Checkpoint.js           # Checkpoint system
│   │   └── Goal.js                 # Level goal
│   │
│   ├── level/                      # Level management
│   │   └── Level.js                # Level design and generation
│   │
│   ├── ui/                         # UI components
│   │   └── UIManager.js            # HUD and UI rendering
│   │
│   └── utils/                      # Utilities
│       └── helpers.js              # Helper functions
│
└── assets/                         # Assets (if needed)
    └── .gitkeep
```

---

## Module Dependency Graph

```
main.js
  └─> Game.js
       ├─> config.js (CONFIG, COLORS)
       ├─> InputManager.js
       ├─> Camera.js
       ├─> Player.js
       │    └─> Entity.js
       ├─> Enemy.js
       │    └─> Entity.js
       ├─> ParticleSystem.js
       ├─> TextEffect.js
       ├─> CollisionSystem.js
       ├─> Level.js
       │    ├─> GroundTile.js
       │    ├─> Coin.js → Collectible.js
       │    ├─> Orb.js → Collectible.js
       │    ├─> Spike.js
       │    ├─> Checkpoint.js
       │    └─> Goal.js
       └─> UIManager.js
```

---

## Key Architecture Components

### 1. Configuration (config.js)
**Purpose**: Centralized game constants
```javascript
export const CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    GRAVITY: 900,
    PLAYER: { /* player settings */ },
    ENEMY: { /* enemy settings */ },
    // ...
};

export const COLORS = {
    BACKGROUND: '#1a1a2e',
    PLAYER_BLUE: '#4A90E2',
    // ...
};
```

**Benefits**:
- Single source of truth for all constants
- Easy to tune game balance
- No magic numbers in code

---

### 2. Core Systems (core/)

#### Game.js
**Purpose**: Main game controller
- Game loop (requestAnimationFrame with fixed timestep)
- State management (score, health, game over, etc.)
- Update cycle coordination
- Render cycle coordination

#### InputManager.js
**Purpose**: Keyboard input abstraction
- Centralized key state tracking
- Key press consumption (for one-time actions)
- Prevents default browser behavior for game keys

#### Camera.js
**Purpose**: Viewport and visual effects
- Smooth camera following (lerp)
- Level bounds clamping
- Camera shake effects

---

### 3. Entity System (entities/)

#### Entity.js (Base Class)
**Purpose**: Common entity functionality
```javascript
class Entity {
    constructor(x, y, width, height)
    updateBase()  // Reset per-frame state
    update(deltaTime)  // Override in subclasses
    render(ctx, camera)  // Override in subclasses
    getBounds()  // AABB collision bounds
}
```

#### Player.js
**Purpose**: Player character
- Extends Entity
- Shape morphing (circle, square, triangle)
- Movement (walk, run, jump)
- Invulnerability system

#### Enemy.js
**Purpose**: Enemy AI
- Extends Entity
- Patrol behavior
- Shape-specific properties
- Combat interaction

---

### 4. Systems (systems/)

#### ParticleSystem.js
**Purpose**: Visual particle effects
- Victory particles (enemy defeat)
- Damage particles (player hit)
- Collision sparks
- Shape morph effects

#### PhysicsSystem.js
**Purpose**: Physics utilities
- Gravity application
- Velocity integration
- Physics helper functions

#### CollisionSystem.js
**Purpose**: Collision detection and resolution
- AABB collision detection
- Collision resolution (smallest overlap method)
- Combat outcome determination

#### TextEffect.js
**Purpose**: Floating text feedback
- Score popups (+10, +100)
- Combat text (POW!, CLASH!)
- Collectible text (ORB!, CHECKPOINT!)

---

### 5. Level Objects (objects/)

All level objects share common patterns:
- `render(ctx, camera)`: Draw on canvas
- `getBounds()`: Return collision bounds
- Game-specific logic

Objects include:
- **GroundTile**: Platform tiles
- **Collectible**: Base class for collectibles
- **Coin**: +10 score collectible
- **Orb**: Progression collectible (need 3)
- **Spike**: Hazard that damages player
- **Checkpoint**: Respawn point
- **Goal**: Level completion trigger

---

### 6. Level Management (level/)

#### Level.js
**Purpose**: Level design and initialization
- Static methods for level generation
- Returns level data (tiles, enemies, collectibles, hazards, etc.)
- Organized by screen sections (Screen 1, 2, 3)

---

### 7. UI Management (ui/)

#### UIManager.js
**Purpose**: HUD and overlay rendering
- Health bar (5 hearts)
- Score display
- Orbs collected counter
- Current shape indicator
- Game over / level complete screens

---

## ES6 Module Usage

### Exporting
```javascript
// config.js
export const CONFIG = { /* ... */ };
export const COLORS = { /* ... */ };

// InputManager.js
export class InputManager { /* ... */ }

// helpers.js
export function checkCollision(a, b) { /* ... */ }
export function resolveCollision(entity, tile) { /* ... */ }
```

### Importing
```javascript
// Game.js
import { CONFIG, COLORS } from '../config.js';
import { InputManager } from './InputManager.js';
import { Camera } from './Camera.js';

// main.js
import { Game } from './core/Game.js';
```

**Important Notes**:
- Always include `.js` extension in imports
- Use relative paths (`./`, `../`)
- Must serve from HTTP server (CORS requirement)

---

## Development Workflow

### Local Development
1. **Start Local Server**:
   ```bash
   # Python
   python -m http.server 8000

   # VS Code
   # Use "Live Server" extension
   ```

2. **Open in Browser**:
   ```
   http://localhost:8000/src/
   ```

3. **Browser Console**:
   - Check for errors
   - Debug with `console.log()`
   - Access game instance: `window.game`

### Adding New Features
1. Determine appropriate folder (core, entities, systems, objects, etc.)
2. Create new module file
3. Export class/functions
4. Import where needed
5. Test in isolation
6. Integrate with Game.js

---

## Advantages of This Architecture

### Maintainability
- **Easy to Find Code**: Logical organization by functionality
- **Single Responsibility**: Each module has one clear purpose
- **Easy to Modify**: Changes localized to specific modules

### Scalability
- **Easy to Add Features**: Create new module, import where needed
- **No Code Duplication**: Reusable systems (particles, physics, etc.)
- **Clean Dependencies**: Clear import/export relationships

### Testability
- **Isolated Modules**: Each module can be tested independently
- **Dependency Injection**: Easy to mock dependencies
- **No Globals**: Everything explicitly imported

### Professional Quality
- **Industry Standard**: Modular architecture is professional standard
- **Team Collaboration**: Multiple developers can work on different modules
- **Version Control Friendly**: Changes isolated to specific files

---

## Performance Considerations

### Efficient Module Loading
- Modern browsers optimize ES6 module loading
- Modules are cached after first load
- Tree-shaking friendly (for future builds)

### Runtime Performance
- No performance overhead from modularization
- Modules compiled to efficient code
- Fixed timestep ensures consistent physics

---

## Future Enhancements

### Possible Additions
1. **Build System** (optional):
   - Rollup/Webpack for bundling
   - Code minification
   - Tree-shaking for smaller bundle

2. **TypeScript** (optional):
   - Type safety
   - Better IDE support
   - Compile to JavaScript modules

3. **Asset Loading** (if needed):
   - Image loader module
   - Sound loader module
   - Asset management system

---

## Comparison: Single File vs Modular

### ❌ Single File Approach (What We Avoided)
```html
<html>
<style>
  /* All CSS here (hundreds of lines) */
</style>
<body>
  <canvas></canvas>
</body>
<script>
  // All JavaScript here (thousands of lines)
  // class Player { }
  // class Enemy { }
  // class Game { }
  // ... everything mixed together
</script>
</html>
```

**Problems**:
- Hard to navigate (one huge file)
- Difficult to maintain
- Merge conflicts in version control
- No code reusability
- Not professional

### ✅ Modular Approach (What We Built)
```
src/
├── index.html (clean, minimal)
├── css/ (organized styles)
└── js/ (organized by functionality)
    ├── core/
    ├── entities/
    ├── systems/
    └── ...
```

**Benefits**:
- Easy to navigate
- Easy to maintain
- Clean version control
- Reusable code
- Professional quality

---

## Best Practices

### Module Design
- ✅ One class per file
- ✅ Descriptive file names matching class names
- ✅ Clear import/export statements
- ✅ Avoid circular dependencies
- ✅ Keep modules focused and small

### Code Organization
- ✅ Group related functionality
- ✅ Use consistent naming conventions
- ✅ Comment complex logic
- ✅ Keep config separate from logic
- ✅ Separate concerns (rendering, logic, state)

### Development
- ✅ Test modules individually
- ✅ Use browser dev tools
- ✅ Keep console clean (no errors)
- ✅ Use meaningful variable names
- ✅ Follow ES6+ best practices

---

## Summary

The Shape Shifter game uses a **professional modular architecture** that:
- Separates concerns clearly
- Uses ES6 modules for organization
- Follows industry best practices
- Is maintainable and scalable
- Provides excellent developer experience

This architecture ensures the game remains clean, professional, and easy to work with as it grows in complexity.
