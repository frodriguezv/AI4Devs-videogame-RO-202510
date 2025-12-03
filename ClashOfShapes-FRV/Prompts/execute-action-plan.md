# Execute Complete Action Plan - Shape Shifter Game

## Context
You are an AI development assistant tasked with implementing the complete Shape Shifter HTML5 Canvas platformer game. You have access to the comprehensive Product Requirements Document (PRD) and a detailed 13-phase action plan.

## Objective
Execute all 13 phases of the action plan sequentially to build a fully functional HTML5 Canvas platformer game featuring a Rock-Paper-Scissors shape-morphing mechanic.

## Instructions

### Before You Begin
1. Read the PRD document at `PRD/prd.md` to understand all game specifications
2. Review the complete action plan at `Action Plan/action-plan.md`
3. Understand that you'll be building a professional modular structure
4. Code will be organized in separate files (HTML, CSS modules, JavaScript modules)

### Execution Guidelines

#### Sequential Phase Execution
- **Execute phases in order**: Phase 1 → Phase 2 → ... → Phase 13
- **Do not skip phases**: Each phase builds on the previous one
- **Test after each phase**: Verify functionality before moving to the next phase
- **Document progress**: Update `Process/Process.md` after completing each phase
- **Document outputs**: Create output documentation in `Process/phase-outputs/phase-XX-output.md`

#### Development Process for Each Phase
1. **Read Phase Document**: Carefully read the phase markdown file (e.g., `phase-01-core-setup.md`)
2. **Understand Objectives**: Review the phase objectives and deliverables
3. **Implement Step-by-Step**: Follow implementation steps in order
4. **Write/Edit Code**: Create or modify the `index.html` file as specified
5. **Test Functionality**: Complete the testing checklist for that phase
6. **Verify Success Criteria**: Ensure all success criteria are met
7. **Document**: Record what was done and any issues encountered
8. **Move to Next Phase**: Only proceed when current phase is complete

#### Code Development Rules
- **Modular Structure**: Organized folder structure with separate files
- **CSS Files**: Separate stylesheets in `src/css/` folder
- **JavaScript Modules**: ES6 modules organized by functionality in `src/js/`
- **No External Dependencies**: Pure vanilla JavaScript, no libraries
- **ES6+ Syntax**: Use modern JavaScript (classes, arrow functions, const/let, modules)
- **Clean Code**: Well-commented, organized, and maintainable
- **Separation of Concerns**: Clear division between config, core systems, entities, etc.

#### Testing Requirements
- Test in browser after each phase
- Use browser console to check for errors
- Verify visual appearance matches specifications
- Test all controls and interactions
- Confirm performance (60 FPS target)

#### Documentation Requirements
After each phase:
1. Update `Process/Process.md` with:
   - Phase number and name
   - Date completed
   - Summary of work done
   - Any challenges or issues
   - Time spent (estimated)

2. Create `Process/phase-outputs/phase-XX-output.md` with:
   - Detailed description of what was implemented
   - Code snippets of key additions
   - Screenshots or descriptions of visual results
   - Test results
   - Any deviations from plan

### Phase-by-Phase Execution Plan

#### Phase 1: Core Setup & Game Loop
- Create professional folder structure (`src/css/`, `src/js/core/`, etc.)
- Set up `index.html` with dual canvas (game + UI)
- Create separate CSS files (`main.css`, `ui.css`)
- Implement `config.js` with game constants
- Create `InputManager.js` module
- Create `Game.js` with game loop and fixed timestep
- Create `main.js` entry point
- **Verification**: Game loop running, canvas visible, ES6 modules loading, no errors

#### Phase 2: Player Entity & Basic Movement
- Create Entity base class
- Implement Player class
- Add horizontal movement (walk/run)
- **Verification**: Blue square moves left/right smoothly

#### Phase 3: Physics & Collision System
- Add gravity (900 px/s²)
- Implement jump (-420 impulse)
- Create AABB collision detection
- Add collision resolution
- Create test platforms
- **Verification**: Player jumps and lands on platforms

#### Phase 4: Shape Morphing Mechanic
- Implement Q/E shape cycling
- Add shape-specific rendering (circle, square, triangle)
- Create particle system
- Emit blue sparkles on morph
- **Verification**: All three shapes render, particles appear

#### Phase 5: Enemy System & AI
- Create Enemy class
- Implement patrol AI
- Add three enemy types (circle, square, triangle)
- Different speeds (60/50/70 px/s)
- **Verification**: Enemies patrol autonomously

#### Phase 6: Combat System
- Implement Rock-Paper-Scissors logic
- Handle winning match (enemy defeat, +100 points)
- Handle losing match (damage, knockback, invulnerability)
- Handle draw (both bounce)
- Add combat particles and text effects
- Implement camera shake
- **Verification**: All 9 combat combinations work correctly

#### Phase 7: Level Design & Terrain
- Create Level class
- Build Screen 1 (Tutorial)
- Build Screen 2 (Challenge)
- Build Screen 3 (Final)
- Place all enemies strategically
- **Verification**: Complete 2400×600 level is navigable

#### Phase 8: Collectibles & Scoring
- Create Coin class (yellow, +10 points)
- Create Orb class (purple, progression)
- Add bobbing animation
- Place 18 coins and 3 orbs
- **Verification**: All collectibles functional with scoring

#### Phase 9: Camera System
- Enhance Camera class with follow()
- Implement smooth lerp (10%)
- Clamp to level bounds
- Apply camera transform
- **Verification**: Camera follows player smoothly

#### Phase 10: UI/HUD
- Draw health bar (5 hearts)
- Display score and orbs counter
- Show current shape indicator
- Add pause screen (ESC key)
- **Verification**: All UI elements visible and updating

#### Phase 11: Visual Effects & Polish
- Verify all 4 particle types
- Verify all text effects
- Polish animations
- **Verification**: All visual feedback working

#### Phase 12: Hazards & Game Over Logic
- Create Spike class
- Implement pit detection
- Create Checkpoint class
- Create Goal class (requires 3 orbs)
- Add respawn logic
- Create Game Over screen
- Create Level Complete screen
- **Verification**: Win/loss conditions working

#### Phase 13: Testing & Bug Fixes
- Complete all testing checklists
- Test cross-browser compatibility
- Fix all bugs
- Verify 60 FPS performance
- Final polish
- **Verification**: Game fully functional and polished

### Quality Standards

#### Code Quality
- Clean, readable code with clear variable names
- Proper indentation and formatting
- Helpful comments explaining complex logic
- No duplicate code (DRY principle)
- Organized class structure

#### Performance
- Maintains 60 FPS during gameplay
- No memory leaks
- Efficient rendering
- Proper cleanup of particles and effects

#### Functionality
- All features from PRD implemented
- All mechanics work as specified
- No critical bugs
- Game is playable from start to finish

#### User Experience
- Controls responsive and intuitive
- Visual feedback clear and satisfying
- Difficulty curve appropriate
- Game is fun to play

### Troubleshooting

#### If You Get Stuck
1. Re-read the phase documentation carefully
2. Check the PRD for specifications
3. Review the "Common Issues & Solutions" section in the phase document
4. Test smaller parts individually
5. Use console.log() to debug
6. Check browser console for errors

#### Common Development Issues
- **Canvas not rendering**: Check canvas width/height attributes
- **Game loop not running**: Verify requestAnimationFrame and window.load event
- **Collision not working**: Check getBounds() returns correct coordinates
- **Visual effects not appearing**: Ensure proper rendering order
- **Performance issues**: Check for infinite loops or missing cleanup

### Success Verification

#### After All Phases Complete
✅ Game runs at 60 FPS
✅ All player mechanics work (movement, jump, shape morph)
✅ All 9 combat combinations functional
✅ Level is navigable and balanced
✅ All collectibles and scoring work
✅ Camera follows smoothly
✅ UI displays correctly
✅ All visual effects satisfying
✅ Win/loss conditions work
✅ No critical bugs
✅ Cross-browser compatible
✅ Game is fun!

### Final Deliverable
A professional game project with:
- Organized folder structure (`src/css/`, `src/js/`)
- Modular JavaScript files (core, entities, systems, objects, level, ui, utils)
- Separate CSS stylesheets
- Complete game logic across all modules
- All classes properly organized by functionality
- Full level design
- All visual effects and polish
- Playable from start to finish
- Matching all PRD specifications
- Clean, maintainable, professional code architecture

---

## Execution Workflow Summary

```
1. Read PRD → Understand Requirements
2. Phase 1 → Build Foundation
3. Phase 2 → Player Movement
4. Phase 3 → Physics
5. Phase 4 → Shape Morphing
6. Phase 5 → Enemies
7. Phase 6 → Combat
8. Phase 7 → Level Design
9. Phase 8 → Collectibles
10. Phase 9 → Camera
11. Phase 10 → UI
12. Phase 11 → Polish
13. Phase 12 → Win/Loss
14. Phase 13 → Testing
15. Done! → Ship It! 🚀
```

---

## Important Notes
- **Stay organized**: Keep code well-structured even in a single file
- **Test frequently**: Catch bugs early
- **Document thoroughly**: Future you will thank you
- **Follow the plan**: Trust the phase sequence
- **Have fun**: You're building a game!

Good luck! Let's build an amazing game! 🎮
