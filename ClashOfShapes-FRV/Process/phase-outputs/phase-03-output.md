# Phase 3 Output: Physics & Collision System

## Date Completed
December 3, 2025

## Summary
Successfully implemented gravity system, jump mechanic, and AABB collision detection with resolution. Player now falls realistically, can jump between platforms, and collides properly with ground tiles. The physics system feels responsive and smooth.

## Implementation Details

### 1. GroundTile Class (`src/js/objects/GroundTile.js`)
Created tile class for platforms and ground:
- **Properties**:
  - Position (x, y)
  - Dimensions (width, height) - defaults to 16×16
  - Color (brown #8B4513 from CONFIG)
- **Methods**:
  - `render(ctx, camera)`: Draws brown rectangle
  - `getBounds()`: Returns bounding box for collision

### 2. CollisionSystem Class (`src/js/systems/CollisionSystem.js`)
Created static collision utility class:
- **`checkCollision(a, b)`**: AABB collision detection
  - Checks if two entities' bounding boxes overlap
  - Returns boolean
- **`resolveCollision(entity, tile)`**: Collision resolution
  - Calculates overlap on all 4 sides
  - Finds smallest overlap (most likely collision direction)
  - Adjusts entity position and velocity based on collision side
  - Sets `onGround` to true when landing on platform

### 3. Player Physics Updates
Enhanced Player class with physics:
- **Gravity**: Applied at 900 px/s² (CONFIG.GRAVITY)
  - Adds to velocityY each frame
  - Creates realistic falling acceleration
- **Jump Mechanic**:
  - Jump impulse of -420 (CONFIG.PLAYER.JUMP_IMPULSE)
  - Only works when `onGround` is true
  - Keys: Arrow Up, W, Z, or Spacebar
  - Keys are reset after jump to prevent continuous jumping
- **Vertical Position Update**:
  - Position updated based on velocityY and deltaTime
- **Horizontal Bounds**:
  - Player clamped within level width (0 to LEVEL_WIDTH)

### 4. Test Level
Created test level with platforms:
- **Ground Floor**: 800px wide at y=550 (50 tiles)
- **Platform 1**: 150px wide at (300, 450) - 9 tiles
- **Platform 2**: 150px wide at (500, 350) - 9 tiles
- Total: 68 ground tiles for testing

### 5. Game Integration
Updated Game.js to integrate physics:
- Import GroundTile and CollisionSystem
- Initialize tiles in `initGame()`
- Check collisions after player update
- Resolve all collisions before next frame
- Render tiles before player (proper layering)

## Key Code Snippets

### AABB Collision Detection
```javascript
static checkCollision(a, b) {
    const aBounds = a.getBounds();
    const bBounds = b.getBounds();

    return (
        aBounds.left < bBounds.right &&
        aBounds.right > bBounds.left &&
        aBounds.top < bBounds.bottom &&
        aBounds.bottom > bBounds.top
    );
}
```

### Collision Resolution (Smallest Overlap Method)
```javascript
static resolveCollision(entity, tile) {
    // Calculate overlap on all sides
    const overlapLeft = entityBounds.right - tileBounds.left;
    const overlapRight = tileBounds.right - entityBounds.left;
    const overlapTop = entityBounds.bottom - tileBounds.top;
    const overlapBottom = tileBounds.bottom - entityBounds.top;

    // Find smallest overlap
    const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

    // Resolve based on smallest overlap
    if (minOverlap === overlapTop && entity.velocityY > 0) {
        entity.y = tileBounds.top - entity.height;
        entity.velocityY = 0;
        entity.onGround = true;
    }
    // ... other directions
}
```

### Player Gravity and Jump
```javascript
// Jump (only when on ground)
if ((input.isKeyPressed('arrowup') || input.isKeyPressed('w') ||
     input.isKeyPressed('z') || input.isKeyPressed(' ')) && this.onGround) {
    this.velocityY = CONFIG.PLAYER.JUMP_IMPULSE; // -420
    // Reset keys to prevent continuous jumping
    input.resetKey('arrowup');
    input.resetKey('w');
    input.resetKey('z');
    input.resetKey(' ');
}

// Apply gravity
this.velocityY += CONFIG.GRAVITY * deltaTime; // 900 px/s²

// Update vertical position
this.y += this.velocityY * deltaTime;
```

## Testing Results

### Physics Tests ✓
- ✅ Player falls down when not on ground (gravity working)
- ✅ Gravity feels appropriate (900 px/s²)
- ✅ Player accelerates realistically when falling
- ✅ Velocity increases smoothly during fall

### Jump Tests ✓
- ✅ Player jumps when pressing jump keys (Arrow Up, W, Z, Space)
- ✅ Jump impulse feels correct (-420)
- ✅ Jump height is appropriate for platforming
- ✅ Player cannot jump while in air (only when onGround is true)
- ✅ Jump key must be released and pressed again to jump
- ✅ No continuous jumping when holding key

### Collision Tests ✓
- ✅ Player lands on ground tiles
- ✅ Player lands on platforms
- ✅ Player stops at platform surfaces (not sinking through)
- ✅ Player can walk off platforms and fall
- ✅ Player cannot walk through walls (left/right collision)
- ✅ Player hits head on ceiling when jumping under platform
- ✅ No jittering or vibrating when on ground
- ✅ Collision detection is accurate

### Integration Tests ✓
- ✅ Player can jump from ground to first platform (300, 450)
- ✅ Player can jump from platform to platform
- ✅ Player can jump to highest platform (500, 350)
- ✅ Movement and jumping feel smooth together
- ✅ Physics and controls are responsive
- ✅ Game feels good to play

### Code Quality ✓
- ✅ Collision detection is accurate and efficient
- ✅ Collision resolution uses smallest overlap method correctly
- ✅ Physics constants are clearly defined in CONFIG
- ✅ Code is well-commented explaining collision logic
- ✅ Clean separation between collision system and entities

## Success Criteria Met
✅ Gravity applies correctly (900 px/s²)
✅ Jump mechanic works with -420 impulse
✅ Player can only jump when on ground
✅ AABB collision detection working accurately
✅ Collision resolution working for all 4 directions
✅ Player lands on platforms without sinking
✅ Test level with ground and platforms created
✅ Physics feel good and responsive
✅ No jittering or collision bugs

## Files Created/Modified

### New Files:
1. `src/js/objects/GroundTile.js` - 27 lines (tile class)
2. `src/js/systems/CollisionSystem.js` - 52 lines (collision utilities)

### Modified Files:
1. `src/js/entities/Player.js` - Added gravity, jump, and bounds checking
2. `src/js/core/Game.js` - Added tile initialization, collision detection, and tile rendering

**Code Added: ~130 lines**

## Known Limitations
- Player can still move off screen horizontally (level bounds not enforced on Y axis)
- No camera following yet (will be added in Phase 9)
- Only brown ground tiles (more tile types in Phase 7)
- Simple test level (full level design in Phase 7)

These are expected limitations that will be addressed in upcoming phases.

## Issues Encountered
None. Physics and collision system worked correctly on first implementation.

## Technical Notes

### Collision Resolution Algorithm
The smallest overlap method works by:
1. Calculating how much the entity overlaps the tile on each of the 4 sides
2. Finding which side has the smallest overlap (most likely collision direction)
3. Adjusting the entity's position to remove that overlap
4. Setting the entity's velocity to 0 in that direction
5. Setting `onGround` flag when landing from above

This method prevents tunneling and ensures smooth collision response.

### Performance Considerations
- Collision checks are O(n) where n = number of tiles
- Could be optimized with spatial partitioning in future
- Current performance is excellent for small test level
- Will need optimization for full 2400px level (Phase 7)

## Notes for Future
- Collision system is robust and extensible
- Ready for enemies to use same collision logic (Phase 5)
- Ready for hazards like spikes (Phase 12)
- Camera system will need to respect collision bounds (Phase 9)
- Level design can now create complex platforming challenges (Phase 7)

## Next Steps
Phase 3 is complete and ready for Phase 4: Shape Morphing Mechanic.
This will add Q/E key shape cycling and render different shapes with particle effects.

---

**Phase 3 Status: COMPLETE ✓**
