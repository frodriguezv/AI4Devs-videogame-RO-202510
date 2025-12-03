# Continue Shape Shifter Game Development - Phases 5-13

## Context

You are continuing the development of the **Shape Shifter** HTML5 Canvas platformer game. The foundation has been successfully completed through Phase 4.

### Current Status
- **Phases Completed**: 1-4 (30.8% complete)
- **Time Spent So Far**: ~1 hour 45 minutes
- **Current Phase**: Phase 5 - Enemy System & AI
- **Local Server**: Running on port 8000

### What's Already Built

#### Phase 1: Core Setup & Game Loop ✅
- Professional folder structure (`src/css/`, `src/js/core/`, `src/js/entities/`, etc.)
- Dual canvas system (game + UI overlay)
- ES6 module architecture
- RequestAnimationFrame game loop with fixed timestep (60 FPS)
- InputManager for keyboard handling
- Configuration system (`config.js`)
- Pause functionality

#### Phase 2: Player Entity & Basic Movement ✅
- Entity base class (`src/js/entities/Entity.js`)
- Player class (`src/js/entities/Player.js`)
- Horizontal movement (walk 120 px/s, run 180 px/s)
- Arrow keys + WASD controls
- Friction system

#### Phase 3: Physics & Collision System ✅
- Gravity (900 px/s²)
- Jump mechanic (-420 impulse)
- AABB collision detection (`src/js/systems/CollisionSystem.js`)
- GroundTile class (`src/js/objects/GroundTile.js`)
- Collision resolution with smallest-overlap method
- Test level with platforms

#### Phase 4: Shape Morphing Mechanic ✅
- Three shapes: Circle, Square, Triangle (all 32×32, blue)
- Q/E key cycling (forward/backward)
- Shape-specific rendering
- Particle system (`src/js/systems/ParticleSystem.js`)
- Blue sparkle particles on morph

---

## Your Mission

**Complete Phases 5-13** to finish the Shape Shifter game, following the same high-quality standards used in phases 1-4.

---

## Execution Instructions

### General Guidelines

1. **Sequential Execution**: Complete phases in order (5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13)
2. **Read Phase Documents**: Each phase has a detailed markdown file in `Action Plan/`
3. **Follow Standards**: Maintain the same code quality, modularity, and organization
4. **Test After Each Phase**: Verify functionality before moving to next phase
5. **Document Progress**: Update `Process/Process.md` and create `Process/phase-outputs/phase-XX-output.md` after each phase
6. **Update Todo List**: Use TodoWrite tool to track progress

### Code Quality Standards

- **ES6+ Syntax**: Use modern JavaScript (classes, arrow functions, const/let, modules)
- **Modular Structure**: Separate files for each class/system
- **Clean Code**: Well-commented, organized, maintainable
- **No Magic Numbers**: Use CONFIG constants
- **Separation of Concerns**: Clear division between systems
- **DRY Principle**: No duplicate code

### File Organization

```
src/js/
├── core/           # Core systems (Game, InputManager, Camera)
├── entities/       # Game entities (Entity, Player, Enemy)
├── systems/        # Game systems (CollisionSystem, ParticleSystem, etc.)
├── objects/        # Game objects (GroundTile, Coin, Orb, Spike, Checkpoint, Goal)
├── level/          # Level management (Level.js)
├── ui/             # UI components (UIManager.js)
└── utils/          # Utility functions
```

---

## Remaining Phases Breakdown

### Phase 5: Enemy System & AI
**Objective**: Create enemy entities with patrol behavior for all three shapes

**Key Tasks**:
- Create Enemy class extending Entity
- Implement patrol AI (left-right movement within range)
- Create three enemy types: Circle (60 px/s), Square (50 px/s), Triangle (70 px/s)
- Add shape-specific rendering (red shapes)
- Integrate collision with platforms

**Deliverables**:
- `src/js/entities/Enemy.js`
- Enemies patrol autonomously
- Different speeds per shape type

**Success Criteria**:
- Enemies render as red shapes (32×32)
- Enemies patrol platforms without falling off
- Enemies turn around at patrol boundaries
- Enemies collide with platforms properly

**Read**: `Action Plan/phase-05-enemy-system.md`

---

### Phase 6: Combat System (Rock-Paper-Scissors)
**Objective**: Implement the Rock-Paper-Scissors combat logic

**Key Tasks**:
- Implement combat resolution:
  - Circle beats Triangle
  - Square beats Circle
  - Triangle beats Square
- Winning match: Enemy defeat, +100 points, particles, camera shake
- Losing match: -1 heart, knockback, invulnerability, particles
- Draw: Both bounce back
- Add combat particle effects (victory, damage, clash)
- Add combat text effects ("POW!", "CLASH!", "+100")
- Implement camera shake system

**Deliverables**:
- Combat logic in Game.js
- Camera shake in Camera class
- TextEffect system for floating text
- All 9 combat combinations working

**Success Criteria**:
- All 9 shape combinations work correctly
- Visual feedback is satisfying
- Camera shake feels impactful
- Invulnerability prevents damage

**Read**: `Action Plan/phase-06-combat-system.md`

---

### Phase 7: Level Design & Terrain
**Objective**: Build the complete 3-screen level (2400×600)

**Key Tasks**:
- Create Level class (`src/js/level/Level.js`)
- Build Screen 1 (0-800px): Tutorial section
- Build Screen 2 (800-1600px): Challenge section
- Build Screen 3 (1600-2400px): Final section
- Place all enemies strategically (10 total)
- Create complete platform layout

**Deliverables**:
- `src/js/level/Level.js`
- Full 2400×600 level
- Strategic enemy placement
- Difficulty progression

**Success Criteria**:
- Level is navigable from start to finish
- Platforms support intended jumps
- Enemy placement creates interesting challenges
- Difficulty ramps across 3 screens

**Read**: `Action Plan/phase-07-level-terrain.md`

---

### Phase 8: Collectibles & Scoring
**Objective**: Add coins, orbs, and scoring system

**Key Tasks**:
- Create Coin class (yellow, +10 points)
- Create Orb class (purple, progression item - need 3 for goal)
- Add bobbing animation (sin wave)
- Implement collection detection
- Place 18 coins and 3 orbs throughout level
- Add text effects for collection

**Deliverables**:
- `src/js/objects/Coin.js`
- `src/js/objects/Orb.js`
- Collectibles with bobbing animation
- Score tracking

**Success Criteria**:
- Coins and orbs render correctly
- Bobbing animation is smooth
- Collection detection is accurate
- Score updates correctly

**Read**: `Action Plan/phase-08-collectibles-scoring.md`

---

### Phase 9: Camera System
**Objective**: Implement smooth camera following

**Key Tasks**:
- Create Camera class (`src/js/core/Camera.js`)
- Implement smooth lerp following (10% lerp factor)
- Add camera clamping to level bounds
- Integrate camera shake from Phase 6
- Apply camera transform to world rendering

**Deliverables**:
- `src/js/core/Camera.js`
- Smooth camera following player
- Camera clamped to level bounds

**Success Criteria**:
- Camera follows player smoothly
- No jittering or stuttering
- Camera stays within level bounds
- Shake effect works with camera

**Read**: `Action Plan/phase-09-camera-system.md`

---

### Phase 10: UI/HUD
**Objective**: Create user interface and HUD elements

**Key Tasks**:
- Create UIManager class (`src/js/ui/UIManager.js`)
- Implement health bar (5 hearts)
- Add score display
- Add orbs collected counter (X/3)
- Add current shape indicator
- Render UI on separate canvas

**Deliverables**:
- `src/js/ui/UIManager.js`
- Complete HUD showing all game state
- Shape indicator with icon and name

**Success Criteria**:
- All UI elements visible and updating
- Health bar shows damage correctly
- Score updates in real-time
- Shape indicator shows current shape

**Read**: `Action Plan/phase-10-ui-hud.md`

---

### Phase 11: Visual Effects & Polish
**Objective**: Add all remaining particle and text effects

**Key Tasks**:
- Verify all 4 particle types work:
  - Victory particles (red, on enemy defeat)
  - Damage particles (red sparkles, on player hit)
  - Clash particles (white, on draw)
  - Morph particles (blue, already done in Phase 4)
- Verify all 8 text effect types:
  - "POW!" (enemy defeat)
  - "+100" (score)
  - "CLASH!" (draw)
  - "+10" (coin)
  - "ORB!" (orb collection)
  - "CHECKPOINT!" (checkpoint activation)
  - "GOAL ACTIVATED!" (when 3rd orb collected)
- Polish all animations

**Deliverables**:
- Complete TextEffect system
- All particle effects polished
- All text effects functional

**Success Criteria**:
- All visual feedback is satisfying
- Particles don't cause performance issues
- Text effects are readable and clear

**Read**: `Action Plan/phase-11-visual-effects.md`

---

### Phase 12: Hazards & Game Over Logic
**Objective**: Add hazards, checkpoints, goal, and win/loss conditions

**Key Tasks**:
- Create Spike class (`src/js/objects/Spike.js`) - red triangular hazards
- Implement pit detection (fall below level height)
- Create Checkpoint class (`src/js/objects/Checkpoint.js`)
- Create Goal class (`src/js/objects/Goal.js`) - requires 3 orbs to activate
- Add respawn logic with invulnerability
- Create Game Over screen with restart button
- Create Level Complete screen with play again button
- Add victory condition and bonus points

**Deliverables**:
- All hazard classes
- Checkpoint system
- Goal with orb requirement
- Win/loss screens functional

**Success Criteria**:
- Spikes damage player correctly
- Pit detection works
- Checkpoints save spawn position
- Goal only activates with 3 orbs
- Game over and level complete screens work
- Restart/play again buttons reset game properly

**Read**: `Action Plan/phase-12-hazards-gameOver.md`

---

### Phase 13: Testing & Bug Fixes
**Objective**: Complete all testing and fix all bugs

**Key Tasks**:
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

**Deliverables**:
- Fully tested game
- All bugs fixed
- Performance verified
- Final polish

**Success Criteria**:
- Game runs at 60 FPS
- All mechanics work as specified
- No critical bugs
- Game is playable from start to finish
- Win/loss conditions work correctly

**Read**: `Action Plan/phase-13-testing-bugfixes.md`

---

## Documentation Requirements

### After Each Phase

1. **Update Process.md**:
   - Phase completion date
   - Time spent
   - Status (✅ Complete)
   - Summary of work done
   - Key implementations
   - Challenges encountered
   - Testing results
   - Notes for future

2. **Create Phase Output Document**:
   - `Process/phase-outputs/phase-XX-output.md`
   - Detailed description of implementation
   - Code snippets of key additions
   - Testing results
   - Files created/modified

3. **Update Todo List**:
   - Mark completed phase
   - Update in_progress to next phase
   - Keep remaining phases as pending

---

## Testing Workflow

### After Each Phase:
1. Test in browser (`http://localhost:8000`)
2. Check browser console for errors (F12)
3. Verify visual appearance
4. Test all controls and interactions
5. Confirm performance (should be 60 FPS)

### Common Issues to Check:
- ES6 modules loading correctly
- No console errors
- Collision detection accurate
- Physics feel good
- Visual effects satisfying
- Performance stable

---

## Important Notes

### ES6 Modules
- Requires local server (CORS restrictions)
- Server already running on port 8000
- Use `import/export` syntax
- Always include `.js` extension in imports

### PRD Reference
- Full specifications in `PRD/prd.md`
- Refer to PRD for exact measurements, colors, and behavior
- Follow PRD specifications precisely

### Phase Documents
- Each phase has detailed implementation steps
- Follow phase documents closely
- Common issues and solutions provided

### Code Architecture
- Maintain modular structure
- Keep files small and focused
- Use CONFIG constants
- Clean separation of concerns

---

## Success Metrics

### Final Game Should Have:
- ✅ 60 FPS stable performance
- ✅ All player mechanics work (movement, jump, shape morph)
- ✅ All 9 combat combinations functional
- ✅ Level is navigable and balanced
- ✅ All collectibles and scoring work
- ✅ Camera follows smoothly
- ✅ UI displays correctly
- ✅ All visual effects satisfying
- ✅ Win/loss conditions work
- ✅ No critical bugs
- ✅ Game is fun!

---

## Getting Started

1. **Read this entire prompt** to understand the scope
2. **Review current code** in `src/` folder to understand architecture
3. **Start with Phase 5**: Read `Action Plan/phase-05-enemy-system.md`
4. **Implement Phase 5** following the phase document
5. **Test thoroughly** before moving to Phase 6
6. **Document progress** in Process.md and phase output
7. **Continue sequentially** through all remaining phases

---

## Repository Structure Reference

```
ClashOfShapes-FRV/
├── src/                           # Source code (WORK HERE)
│   ├── index.html                 # Main HTML file
│   ├── css/                       # Stylesheets
│   │   ├── main.css
│   │   └── ui.css
│   └── js/                        # JavaScript modules
│       ├── main.js                # Entry point ✅
│       ├── config.js              # Game constants ✅
│       ├── core/                  # Core systems
│       │   ├── Game.js            # Main game class ✅
│       │   ├── InputManager.js    # Input handling ✅
│       │   └── Camera.js          # TODO: Phase 9
│       ├── entities/              # Game entities
│       │   ├── Entity.js          # Base class ✅
│       │   ├── Player.js          # Player character ✅
│       │   └── Enemy.js           # TODO: Phase 5
│       ├── systems/               # Game systems
│       │   ├── CollisionSystem.js # Collision detection ✅
│       │   ├── ParticleSystem.js  # Particles ✅
│       │   └── TextEffect.js      # TODO: Phase 11
│       ├── objects/               # Game objects
│       │   ├── GroundTile.js      # Platform tiles ✅
│       │   ├── Coin.js            # TODO: Phase 8
│       │   ├── Orb.js             # TODO: Phase 8
│       │   ├── Spike.js           # TODO: Phase 12
│       │   ├── Checkpoint.js      # TODO: Phase 12
│       │   └── Goal.js            # TODO: Phase 12
│       ├── level/                 # Level management
│       │   └── Level.js           # TODO: Phase 7
│       ├── ui/                    # UI components
│       │   └── UIManager.js       # TODO: Phase 10
│       └── utils/                 # Utilities
│           └── helpers.js         # As needed
├── PRD/
│   └── prd.md                     # Product Requirements Document
├── Action Plan/
│   ├── action-plan.md             # Overview
│   ├── phase-05-enemy-system.md   # START HERE
│   ├── phase-06-combat-system.md
│   ├── phase-07-level-terrain.md
│   ├── phase-08-collectibles-scoring.md
│   ├── phase-09-camera-system.md
│   ├── phase-10-ui-hud.md
│   ├── phase-11-visual-effects.md
│   ├── phase-12-hazards-gameOver.md
│   └── phase-13-testing-bugfixes.md
└── Process/
    ├── Process.md                 # Development log (UPDATE)
    └── phase-outputs/             # Phase documentation (CREATE)
        ├── phase-01-output.md     # ✅ Done
        ├── phase-02-output.md     # ✅ Done
        ├── phase-03-output.md     # ✅ Done
        ├── phase-04-output.md     # ✅ Done
        ├── phase-05-output.md     # TODO: Create after Phase 5
        └── ... (through phase-13)
```

---

## Quick Start Command

To begin immediately:

1. Verify server is running:
```bash
# If not running, start it:
cd src && python3 -m http.server 8000 &
```

2. Open `Action Plan/phase-05-enemy-system.md` and begin implementation

3. Use TodoWrite to track progress

---

## Helpful Reminders

- **Test in browser**: `http://localhost:8000`
- **Browser console**: F12 to check for errors
- **Don't skip phases**: Each builds on the previous
- **Document thoroughly**: Future you will thank you
- **Have fun**: You're building a game!

---

## Final Deliverable Goal

A professional, fully functional HTML5 Canvas platformer game featuring:
- Shape-shifting mechanic with Rock-Paper-Scissors combat
- 3-screen level with strategic enemy placement
- Collectibles and scoring system
- Smooth camera following
- Complete UI/HUD
- Satisfying visual effects
- Win/loss conditions
- 60 FPS performance
- Clean, maintainable code

---

**Let's finish this game! Good luck! 🎮🚀**
