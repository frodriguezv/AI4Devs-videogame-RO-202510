# Shape Shifter Game - Complete Action Plan

## Overview
This action plan breaks down the development of the HTML5 Canvas Platformer "Shape Shifter" into 13 manageable phases. Each phase builds upon the previous one, following a logical progression from core systems to polish.

## Project Information
- **Game Title**: Shape Shifter (Rock-Paper-Scissors Platformer)
- **Technology**: HTML5 Canvas, Vanilla JavaScript (ES6+)
- **Architecture**: Modular structure with separate HTML, CSS, and JavaScript files
- **Target**: 800×600 pixel canvas, 60 FPS performance

---

## Development Phases

### [Phase 1: Core Setup & Game Loop](./phase-01-core-setup.md)
**Objective**: Establish the foundation with HTML structure, canvas setup, and game loop
- Create index.html with dual canvas setup (game + UI)
- Implement requestAnimationFrame game loop with fixed timestep
- Set up basic rendering and update cycles
- Create InputManager for keyboard handling

**Deliverable**: Functioning game loop with FPS counter

---

### [Phase 2: Player Entity & Basic Movement](./phase-02-player-movement.md)
**Objective**: Implement player character with movement controls
- Create Entity base class
- Implement Player class with position and velocity
- Add keyboard movement (left/right at 120 px/s, run at 180 px/s)
- Render player as blue square (32×32)

**Deliverable**: Player shape visible and moving horizontally

---

### [Phase 3: Physics & Collision System](./phase-03-physics-collision.md)
**Objective**: Add gravity, jumping, and collision detection
- Implement gravity (900 px/s²)
- Add jump mechanic (-420 impulse)
- Create AABB collision detection
- Implement collision resolution with ground/platforms
- Add friction (0.8 multiplier)

**Deliverable**: Player can jump and collide with platforms

---

### [Phase 4: Shape Morphing Mechanic](./phase-04-shape-morphing.md)
**Objective**: Implement the core shape-shifting mechanic
- Add shape property to Player (circle, square, triangle)
- Implement Q/E key cycling (forward/backward)
- Create rendering methods for all three shapes
- Add shape transformation particle effects (5 blue sparkles)

**Deliverable**: Player can morph between three shapes with visual feedback

---

### [Phase 5: Enemy System & AI](./phase-05-enemy-system.md)
**Objective**: Create enemy entities with patrol behavior
- Implement Enemy class extending Entity
- Add patrol AI (left-right movement)
- Create enemies for all three shapes (Circle, Square, Triangle)
- Implement enemy rendering (32×32 red shapes)
- Set different speeds per enemy type (60/50/70 px/s)

**Deliverable**: Enemies patrol platforms autonomously

---

### [Phase 6: Combat System (Rock-Paper-Scissors)](./phase-06-combat-system.md)
**Objective**: Implement Rock-Paper-Scissors combat logic
- Create combat resolution system
- Implement winning match logic (+100 points, enemy defeat)
- Implement losing match logic (-1 heart, knockback)
- Implement draw logic (both bounce back)
- Add invulnerability system (1.2s after damage)
- Create combat particle effects (victory, damage, clash)
- Add combat text effects ("POW!", "CLASH!", "+100")
- Implement camera shake for impacts

**Deliverable**: Full combat system with visual feedback

---

### [Phase 7: Level Design & Terrain](./phase-07-level-terrain.md)
**Objective**: Build the 3-screen level layout
- Create GroundTile class (16×16 brown tiles)
- Implement Level class with init() method
- Build Screen 1 (Tutorial section, 0-800px)
- Build Screen 2 (Challenge section, 800-1600px)
- Build Screen 3 (Final section, 1600-2400px)
- Place platforms strategically
- Set level bounds (2400×600)

**Deliverable**: Complete 3-screen playable level

---

### [Phase 8: Collectibles & Scoring](./phase-08-collectibles-scoring.md)
**Objective**: Add collectible items and scoring system
- Implement Coin class (yellow 16×16, +10 points)
- Implement Orb class (purple 16×16, progression item)
- Add bobbing animation (sin wave)
- Create collection detection and feedback
- Implement scoring system
- Add text effects for collections
- Place 18 coins and 3 orbs throughout level

**Deliverable**: Collectibles with scoring and visual feedback

---

### [Phase 9: Camera System](./phase-09-camera-system.md)
**Objective**: Implement smooth camera following
- Create Camera class
- Implement smooth lerp following (10% lerp)
- Add camera clamping to level bounds
- Implement camera shake system
- Apply camera transform to world rendering

**Deliverable**: Smooth camera that follows player

---

### [Phase 10: UI/HUD](./phase-10-ui-hud.md)
**Objective**: Create user interface and HUD elements
- Implement health bar (5 hearts)
- Add score display
- Add orbs collected counter (X/3)
- Add current shape indicator
- Create pause screen overlay (ESC key)
- Render UI on separate canvas

**Deliverable**: Complete HUD showing game state

---

### [Phase 11: Visual Effects & Polish](./phase-11-visual-effects.md)
**Objective**: Add particle systems and polish effects
- Create Particle class with lifetime and gravity
- Create ParticleSystem manager
- Implement TextEffect class for floating text
- Add particle effects for all combat outcomes
- Add shape morph particle effects
- Polish animations and transitions
- Verify all 8 text effect types work
- Verify all 4 particle effect types work

**Deliverable**: Polished visual feedback for all actions

---

### [Phase 12: Hazards & Game Over Logic](./phase-12-hazards-gameOver.md)
**Objective**: Add hazards, checkpoints, goal, and completion logic
- Implement Spike hazard (16×16 red triangles)
- Implement pit detection (fall below level)
- Create Checkpoint system (gray → cyan when activated)
- Create Goal system (requires 3 orbs, green pulsing)
- Add respawn logic with invulnerability
- Implement Game Over screen with restart button
- Implement Level Complete screen with play again button
- Add victory condition and bonus points

**Deliverable**: Complete game with win/loss conditions

---

### [Phase 13: Testing & Bug Fixes](./phase-13-testing-bugfixes.md)
**Objective**: Test all systems and fix bugs
- Test all player movements and physics
- Test all three shape transformations
- Test combat against all enemy types (9 combinations)
- Test collision with all terrain types
- Test all collectibles and scoring
- Verify camera behavior
- Test game over and level complete flows
- Test checkpoint respawn
- Performance testing (verify 60 FPS)
- Cross-browser testing
- Fix any discovered bugs

**Deliverable**: Fully tested, bug-free game

---

## Dependencies Between Phases

```
Phase 1 (Core Setup)
    ↓
Phase 2 (Player Movement)
    ↓
Phase 3 (Physics & Collision)
    ↓
Phase 4 (Shape Morphing) ────┐
    ↓                         ↓
Phase 5 (Enemy System)       │
    ↓                         ↓
Phase 6 (Combat System) ←────┘
    ↓
Phase 7 (Level Design)
    ↓
Phase 8 (Collectibles) ───────┐
    ↓                          │
Phase 9 (Camera System)       │
    ↓                          │
Phase 10 (UI/HUD) ←───────────┘
    ↓
Phase 11 (Visual Effects)
    ↓
Phase 12 (Hazards & Game Over)
    ↓
Phase 13 (Testing)
```

---

## Success Criteria

### Technical Requirements
- ✅ 60 FPS stable performance
- ✅ Responsive controls with no input lag
- ✅ Accurate collision detection
- ✅ Smooth camera follow with no jitter
- ✅ All visual effects rendering correctly

### Gameplay Requirements
- ✅ Shape morphing is intuitive and responsive
- ✅ Rock-Paper-Scissors mechanic is clear
- ✅ Combat feedback is satisfying
- ✅ Level difficulty ramps across 3 screens
- ✅ Player understands mechanic within first screen

### Completion Requirements
- ✅ All 13 phases completed
- ✅ All features from PRD implemented
- ✅ No critical bugs
- ✅ Game is playable from start to finish
- ✅ Victory and defeat conditions work correctly

---

## How to Use This Action Plan

1. **Sequential Execution**: Complete phases in order (1-13)
2. **Read Phase Details**: Each phase has detailed implementation steps
3. **Follow Prompts**: Use provided prompts from `/Prompts` folder
4. **Document Progress**: Update `/Process/Process.md` after each phase
5. **Test Incrementally**: Test after each phase before moving forward
6. **Reference PRD**: Refer to `/PRD/prd.md` for specifications

---

## File Structure After Completion

```
ClashOfShapes-FRV/
├── src/                                 # Source code directory
│   ├── index.html                       # Main HTML file
│   ├── css/                             # Stylesheets
│   │   ├── main.css                     # Main game styles
│   │   └── ui.css                       # UI/HUD styles
│   ├── js/                              # JavaScript modules
│   │   ├── main.js                      # Entry point, game initialization
│   │   ├── config.js                    # Game configuration constants
│   │   ├── core/                        # Core game systems
│   │   │   ├── Game.js                  # Main game class
│   │   │   ├── InputManager.js          # Keyboard input handling
│   │   │   └── Camera.js                # Camera system
│   │   ├── entities/                    # Game entities
│   │   │   ├── Entity.js                # Base entity class
│   │   │   ├── Player.js                # Player character
│   │   │   └── Enemy.js                 # Enemy entities
│   │   ├── systems/                     # Game systems
│   │   │   ├── ParticleSystem.js        # Particle effects
│   │   │   ├── PhysicsSystem.js         # Physics utilities
│   │   │   ├── CollisionSystem.js       # Collision detection
│   │   │   └── TextEffect.js            # Floating text effects
│   │   ├── objects/                     # Game objects
│   │   │   ├── GroundTile.js            # Platform tiles
│   │   │   ├── Collectible.js           # Base collectible
│   │   │   ├── Coin.js                  # Coin collectible
│   │   │   ├── Orb.js                   # Orb collectible
│   │   │   ├── Spike.js                 # Spike hazard
│   │   │   ├── Checkpoint.js            # Checkpoint system
│   │   │   └── Goal.js                  # Level goal
│   │   ├── level/                       # Level management
│   │   │   └── Level.js                 # Level design and initialization
│   │   ├── ui/                          # UI components
│   │   │   └── UIManager.js             # HUD and UI rendering
│   │   └── utils/                       # Utility functions
│   │       └── helpers.js               # Helper functions
│   └── assets/                          # Assets (if needed)
│       └── .gitkeep
├── PRD/
│   └── prd.md                           # Product Requirements Document
├── Action Plan/
│   ├── action-plan.md                   # This file
│   ├── phase-01-core-setup.md
│   ├── phase-02-player-movement.md
│   ├── phase-03-physics-collision.md
│   ├── phase-04-shape-morphing.md
│   ├── phase-05-enemy-system.md
│   ├── phase-06-combat-system.md
│   ├── phase-07-level-terrain.md
│   ├── phase-08-collectibles-scoring.md
│   ├── phase-09-camera-system.md
│   ├── phase-10-ui-hud.md
│   ├── phase-11-visual-effects.md
│   ├── phase-12-hazards-gameOver.md
│   └── phase-13-testing-bugfixes.md
├── Prompts/
│   ├── execute-action-plan.md
│   ├── prompt-phase-01.md
│   ├── prompt-phase-02.md
│   ├── ... (through phase-13)
│   └── prompt-phase-13.md
├── Rules/
│   └── documentation-rules.md
└── Process/
    ├── Process.md                       # Living document of implementation
    └── phase-outputs/                   # Output documentation per phase
        ├── phase-01-output.md
        ├── phase-02-output.md
        └── ... (through phase-13)
```

---

_This action plan provides a clear roadmap for implementing the Shape Shifter game according to the PRD specifications._
