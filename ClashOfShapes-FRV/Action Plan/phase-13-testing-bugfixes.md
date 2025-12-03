# Phase 13: Testing & Bug Fixes

## Objective
Comprehensive testing of all game systems, cross-browser compatibility testing, performance validation, and bug fixing.

## Prerequisites
- Phase 12 completed (Hazards & Game Over Logic)

## Deliverables
- ✅ Complete game tested end-to-end
- ✅ All mechanics verified functional
- ✅ Performance validated (60 FPS)
- ✅ Cross-browser testing completed
- ✅ All bugs documented and fixed
- ✅ Final polish and adjustments

---

## Testing Sections

### Section 13.1: Player Mechanics Testing

#### Movement Tests
- [ ] Walk left/right at 120 px/s
- [ ] Run at 180 px/s with X button
- [ ] Friction applies correctly (0.8 multiplier)
- [ ] Player stops smoothly when releasing keys
- [ ] Movement works on all platform types
- [ ] Movement responsive and lag-free

#### Jump Tests
- [ ] Jump works with all jump keys (Arrow Up, W, Z, Space)
- [ ] Jump impulse -420 feels correct
- [ ] Can only jump when on ground
- [ ] Jump key must be released to jump again
- [ ] Jump works from all platform types
- [ ] Jump height consistent

#### Shape Morphing Tests
- [ ] Q cycles forward: Square → Circle → Triangle → Square
- [ ] E cycles backward: Square → Triangle → Circle → Square
- [ ] Shape change instant (no cooldown)
- [ ] Key must be released to morph again
- [ ] Morph works while in air
- [ ] Morph works while moving
- [ ] All three shapes render correctly
- [ ] 5 blue particles emit on morph

---

### Section 13.2: Combat System Testing

#### Rock-Paper-Scissors Logic (9 Combinations)
**Player Wins (3 combinations):**
- [ ] Circle beats Triangle
- [ ] Square beats Circle
- [ ] Triangle beats Square
- [ ] Enemy defeated (+100 points)
- [ ] "POW!" and "+100" text appear
- [ ] 10 red victory particles
- [ ] Player bounce-back
- [ ] Camera shake (intensity 4, 2 frames)

**Player Loses (3 combinations):**
- [ ] Triangle loses to Circle
- [ ] Circle loses to Square
- [ ] Square loses to Triangle
- [ ] Player takes 1 heart damage
- [ ] 10 red damage particles
- [ ] Player knockback
- [ ] 1.2s invulnerability
- [ ] Player flashing effect
- [ ] Camera shake (intensity 6, 3 frames)

**Draw (3 combinations):**
- [ ] Circle vs Circle
- [ ] Square vs Square
- [ ] Triangle vs Triangle
- [ ] No damage to either
- [ ] "CLASH!" text appears
- [ ] 5 white particles
- [ ] Both bounce back
- [ ] Can retry with different shape

---

### Section 13.3: Physics & Collision Testing

#### Gravity Tests
- [ ] Gravity 900 px/s² feels correct
- [ ] Player falls naturally
- [ ] Enemies affected by gravity

#### Collision Tests
- [ ] Player lands on ground tiles
- [ ] Player lands on platforms
- [ ] Player doesn't sink through floors
- [ ] Player can walk off platforms
- [ ] Player stops at walls (left/right collision)
- [ ] Player hits head on ceilings
- [ ] Collision resolution smooth (no jitter)
- [ ] AABB collision detection accurate

#### Enemy Collision Tests
- [ ] Enemies land on platforms
- [ ] Enemies patrol correctly
- [ ] Enemies reverse at patrol range
- [ ] Enemies don't fall through ground

---

### Section 13.4: Level Design Testing

#### Screen 1 (Tutorial, 0-800px)
- [ ] Player spawns at (100, 400)
- [ ] Can navigate to all platforms
- [ ] 1 Circle, 1 Square, 1 Triangle enemy present
- [ ] 5 coins collectible
- [ ] 1 orb accessible
- [ ] Can reach Screen 2

#### Screen 2 (Challenge, 800-1600px)
- [ ] Checkpoint activates correctly
- [ ] Platform jumping sequence navigable
- [ ] 3 spikes present and functional
- [ ] 2 Circle, 1 Square, 1 Triangle enemies
- [ ] 5 coins collectible
- [ ] 1 orb accessible
- [ ] Can reach Screen 3

#### Screen 3 (Final, 1600-2400px)
- [ ] Enemy gauntlet challenging but fair
- [ ] Final platform sequence reachable
- [ ] 1 Circle, 1 Square, 2 Triangle enemies
- [ ] 8 coins collectible
- [ ] 1 orb accessible
- [ ] Goal at end accessible

---

### Section 13.5: Collectibles & Scoring Testing

#### Coins
- [ ] 18 total coins in level (5 + 5 + 8)
- [ ] Coins render as yellow circles (16×16)
- [ ] Bobbing animation smooth
- [ ] Collection adds +10 points
- [ ] "+10" text appears
- [ ] Collected coins disappear

#### Orbs
- [ ] 3 total orbs in level (1 per screen)
- [ ] Orbs render as purple circles (16×16)
- [ ] Bobbing animation smooth
- [ ] Collection increases counter
- [ ] "ORB!" text appears
- [ ] Orb counter shows X/3 correctly

#### Scoring
- [ ] Score starts at 0
- [ ] Coin collection: +10 points
- [ ] Enemy defeat: +100 points
- [ ] Level complete: +500 points
- [ ] No death bonus: +200 points
- [ ] Score displays correctly in UI

---

### Section 13.6: Camera System Testing

- [ ] Camera follows player smoothly (10% lerp)
- [ ] Camera centers player in viewport
- [ ] Camera clamped to level bounds
- [ ] Camera doesn't show black areas
- [ ] Camera shake works correctly
- [ ] Camera doesn't jitter or stutter
- [ ] All objects scroll with camera
- [ ] UI stays fixed (doesn't scroll)

---

### Section 13.7: UI/HUD Testing

#### Health Bar
- [ ] 5 hearts render at top-left
- [ ] Hearts show filled/empty correctly
- [ ] Hearts update when taking damage
- [ ] Hearts restore on respawn

#### Score Display
- [ ] Score displays at correct position
- [ ] Score updates in real-time
- [ ] Score readable on all backgrounds

#### Orbs Counter
- [ ] Shows "Orbs: 0/3" initially
- [ ] Updates to 1/3, 2/3, 3/3
- [ ] Readable and clear

#### Shape Indicator
- [ ] Shows current shape icon
- [ ] Shows shape name and type
- [ ] Updates instantly when morphing
- [ ] All three shapes display correctly

#### Pause Screen
- [ ] ESC toggles pause on/off
- [ ] Pause overlay appears
- [ ] Game freezes when paused
- [ ] Can resume correctly

---

### Section 13.8: Hazards & Victory Testing

#### Spikes
- [ ] 3 spikes render correctly
- [ ] Spike collision causes -1 heart
- [ ] Knockback works
- [ ] Invulnerability triggered

#### Pits
- [ ] Fall below level triggers respawn
- [ ] Respawn at checkpoint
- [ ] Health restored
- [ ] 2s invulnerability after respawn

#### Checkpoint
- [ ] Renders gray initially
- [ ] Turns cyan when activated
- [ ] "CHECKPOINT!" text appears
- [ ] Only activates once
- [ ] Respawn position saved

#### Goal
- [ ] Locked (gray) until 3 orbs collected
- [ ] "GOAL ACTIVATED!" appears with 3rd orb
- [ ] Turns green and pulses when active
- [ ] Touching active goal completes level
- [ ] Cannot complete before collecting orbs

#### Level Complete
- [ ] +500 points awarded
- [ ] +200 bonus if full health
- [ ] Level Complete screen appears
- [ ] Final score displayed
- [ ] Play Again button works

#### Game Over
- [ ] Triggers at 0 health
- [ ] Game Over screen appears
- [ ] Final score displayed
- [ ] Restart button works

---

### Section 13.9: Visual Effects Testing

#### Particle Effects
- [ ] Victory particles (10 red, circular)
- [ ] Damage particles (10 red, radial)
- [ ] Collision sparks (5 white, radial)
- [ ] Shape morph sparkles (5 blue, radial)
- [ ] All particles have gravity
- [ ] All particles fade out correctly
- [ ] Particles don't cause lag

#### Text Effects
- [ ] "POW!" (yellow, 24px, 0.5s)
- [ ] "+100" (green, 18px, 0.6s)
- [ ] "CLASH!" (white, 18px, 0.3s)
- [ ] "+10" (yellow, 16px, 0.5s)
- [ ] "ORB!" (purple, 18px, 0.7s)
- [ ] "CHECKPOINT!" (cyan, 18px, 0.7s)
- [ ] "GOAL ACTIVATED!" (green, 24px, 1.0s)
- [ ] All text floats upward
- [ ] All text fades out smoothly

---

### Section 13.10: Performance Testing

#### Frame Rate
- [ ] Maintains 60 FPS consistently
- [ ] No stuttering or lag
- [ ] Smooth gameplay throughout
- [ ] Performance stable with many objects

#### Memory
- [ ] No memory leaks
- [ ] Particles cleaned up properly
- [ ] Text effects cleaned up properly
- [ ] Dead enemies don't update/render

#### Optimization
- [ ] Fixed timestep working correctly
- [ ] No unnecessary calculations
- [ ] Render order efficient

---

### Section 13.11: Cross-Browser Testing

#### Chrome
- [ ] Game loads correctly
- [ ] All features work
- [ ] 60 FPS performance
- [ ] Input responsive

#### Firefox
- [ ] Game loads correctly
- [ ] All features work
- [ ] 60 FPS performance
- [ ] Input responsive

#### Safari
- [ ] Game loads correctly
- [ ] All features work
- [ ] Performance acceptable
- [ ] Input responsive

#### Edge
- [ ] Game loads correctly
- [ ] All features work
- [ ] 60 FPS performance
- [ ] Input responsive

#### Mobile Browsers (if applicable)
- [ ] Layout responsive
- [ ] Touch controls (if implemented)
- [ ] Performance acceptable

---

### Section 13.12: Integration Testing

#### Complete Playthrough Test
1. [ ] Start game at spawn
2. [ ] Morph to Circle, defeat Triangle enemy
3. [ ] Collect coins and Orb #1
4. [ ] Navigate to Screen 2
5. [ ] Activate checkpoint
6. [ ] Jump over spikes
7. [ ] Collect Orb #2
8. [ ] Navigate to Screen 3
9. [ ] Defeat enemy gauntlet
10. [ ] Collect Orb #3
11. [ ] Verify goal activates
12. [ ] Touch goal to complete level
13. [ ] Verify final score and bonuses
14. [ ] Click Play Again, verify restart

#### Death and Respawn Test
1. [ ] Take damage from enemy until 0 health
2. [ ] Verify respawn at checkpoint
3. [ ] Verify full health restored
4. [ ] Verify 2s invulnerability
5. [ ] Continue playing normally

---

## Bug Tracking Template

When bugs are found, document them as follows:

### Bug #1: [Bug Title]
- **Severity**: Critical / High / Medium / Low
- **Description**: [What happens]
- **Steps to Reproduce**: [How to trigger]
- **Expected Behavior**: [What should happen]
- **Actual Behavior**: [What actually happens]
- **Fix**: [How it was fixed]
- **Status**: Open / In Progress / Fixed / Verified

---

## Success Criteria

### Functional Requirements
- ✅ All player mechanics work correctly
- ✅ All combat outcomes work correctly (9 combinations)
- ✅ All level sections navigable
- ✅ All collectibles functional
- ✅ Camera system smooth and correct
- ✅ UI displays all information correctly
- ✅ All hazards and objectives functional
- ✅ Game Over and Level Complete screens work

### Performance Requirements
- ✅ 60 FPS stable throughout gameplay
- ✅ No memory leaks
- ✅ No stuttering or lag
- ✅ Fixed timestep physics correct

### Polish Requirements
- ✅ All visual effects satisfying
- ✅ All feedback clear and timely
- ✅ Controls responsive
- ✅ Game feels good to play

### Quality Requirements
- ✅ No critical bugs
- ✅ No game-breaking issues
- ✅ Cross-browser compatible
- ✅ Code is clean and maintainable

---

## Final Checks Before Release

- [ ] All 13 phases completed
- [ ] All features from PRD implemented
- [ ] All tests passed
- [ ] No critical or high-severity bugs
- [ ] Performance meets requirements (60 FPS)
- [ ] Code is documented and clean
- [ ] Game is fun and satisfying to play
- [ ] Level difficulty appropriate
- [ ] Instructions clear (controls in PRD)
- [ ] Ready for deployment

---

## Congratulations!

If all tests pass and all criteria are met, the Shape Shifter game is complete and ready to play! 🎉

**Game Summary:**
- HTML5 Canvas platformer
- Rock-Paper-Scissors shape-morphing mechanic
- 3-screen level with increasing difficulty
- Complete combat, collectibles, and progression systems
- Polished visual feedback and effects
- Built with vanilla JavaScript (ES6+)
- Single HTML file deployment
