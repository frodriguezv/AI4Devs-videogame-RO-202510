# Phase 3: Physics & Collision System

## Objective
Implement gravity, jumping mechanic, and AABB collision detection/resolution system.

## Prerequisites
- Phase 2 completed (Player Entity & Basic Movement)

## Deliverables
- ✅ Gravity system (900 px/s²)
- ✅ Jump mechanic with -420 impulse
- ✅ AABB collision detection function
- ✅ Collision resolution with smallest overlap method
- ✅ Basic ground/platform tiles for testing
- ✅ Player can jump and land on platforms

---

## Implementation Steps

### Step 3.1: Create GroundTile Class
```javascript
class GroundTile {
  constructor(x, y, width = 16, height = 16) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = '#8B4513'; // Brown
  }

  render(ctx, camera) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y,
      bottom: this.y + this.height
    };
  }
}
```

### Step 3.2: Add Gravity to Player Update
```javascript
// In Player.update() method, add after movement logic:

// Apply gravity
this.velocityY += gameState.gravity * deltaTime;

// Update vertical position
this.y += this.velocityY * deltaTime;

// Keep player within level bounds (horizontal)
this.x = Math.max(0, Math.min(this.x, gameState.levelWidth - this.width));
```

### Step 3.3: Implement Jump Mechanic
```javascript
// In Player.update() method, add before gravity:

// Jump
if ((input.isKeyPressed('arrowup') || input.isKeyPressed('w') ||
     input.isKeyPressed('z') || input.isKeyPressed(' ')) && this.onGround) {
  this.velocityY = -420; // Jump impulse
  input.resetKey('arrowup');
  input.resetKey('w');
  input.resetKey('z');
  input.resetKey(' ');
}
```

### Step 3.4: Implement AABB Collision Detection
```javascript
function checkCollision(a, b) {
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

### Step 3.5: Implement Collision Resolution
```javascript
function resolveCollision(entity, tile) {
  const entityBounds = entity.getBounds();
  const tileBounds = tile.getBounds();

  // Calculate overlap on all sides
  const overlapLeft = entityBounds.right - tileBounds.left;
  const overlapRight = tileBounds.right - entityBounds.left;
  const overlapTop = entityBounds.bottom - tileBounds.top;
  const overlapBottom = tileBounds.bottom - entityBounds.top;

  // Find smallest overlap
  const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

  // Resolve based on smallest overlap
  if (minOverlap === overlapTop && entity.velocityY > 0) {
    // Collision from top (landing on platform)
    entity.y = tileBounds.top - entity.height;
    entity.velocityY = 0;
    entity.onGround = true;
  } else if (minOverlap === overlapBottom && entity.velocityY < 0) {
    // Collision from bottom (hitting ceiling)
    entity.y = tileBounds.bottom;
    entity.velocityY = 0;
  } else if (minOverlap === overlapLeft && entity.velocityX > 0) {
    // Collision from left
    entity.x = tileBounds.left - entity.width;
    entity.velocityX = 0;
  } else if (minOverlap === overlapRight && entity.velocityX < 0) {
    // Collision from right
    entity.x = tileBounds.right;
    entity.velocityX = 0;
  }
}
```

### Step 3.6: Create Test Level with Ground Tiles
```javascript
// Add to game initialization
let tiles = [];

function initGame() {
  // Create player
  player = new Player(100, 400);

  // Create ground tiles for testing
  tiles = [];

  // Ground floor (from x=0 to x=800)
  for (let x = 0; x < 800; x += 16) {
    tiles.push(new GroundTile(x, 550, 16, 16));
  }

  // Test platform at (300, 450)
  for (let x = 300; x < 450; x += 16) {
    tiles.push(new GroundTile(x, 450, 16, 16));
  }

  // Test platform at (500, 350)
  for (let x = 500; x < 650; x += 16) {
    tiles.push(new GroundTile(x, 350, 16, 16));
  }
}
```

### Step 3.7: Update Collision Handling in Update Function
```javascript
function update(deltaTime) {
  if (gameState.paused || gameState.gameOver) return;

  // Update player
  if (player) {
    player.update(deltaTime);

    // Check collisions with tiles
    for (const tile of tiles) {
      if (checkCollision(player, tile)) {
        resolveCollision(player, tile);
      }
    }
  }
}
```

### Step 3.8: Update Render Function to Draw Tiles
```javascript
function render() {
  // Clear main canvas
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Render tiles
  for (const tile of tiles) {
    tile.render(ctx);
  }

  // Render player
  if (player) {
    player.render(ctx);
  }

  // Clear UI canvas
  uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
}
```

---

## Testing Checklist

### Physics Tests
- [ ] Player falls down when not on ground (gravity working)
- [ ] Gravity feels appropriate (900 px/s²)
- [ ] Player accelerates realistically when falling

### Jump Tests
- [ ] Player jumps when pressing jump keys (Arrow Up, W, Z, Space)
- [ ] Jump impulse feels correct (-420)
- [ ] Player cannot jump while in air (only when onGround is true)
- [ ] Jump key must be released and pressed again to jump (not continuous)

### Collision Tests
- [ ] Player lands on ground tiles
- [ ] Player lands on platforms
- [ ] Player stops at platform surfaces (not sinking through)
- [ ] Player can walk off platforms and fall
- [ ] Player cannot walk through walls (left/right collision)
- [ ] Player hits head on ceiling when jumping under platform

### Integration Tests
- [ ] Player can jump from ground to first platform
- [ ] Player can jump from platform to platform
- [ ] Movement and jumping feel smooth together
- [ ] No jittering or vibrating when on ground

---

## Code Quality Checklist
- [ ] Collision detection is accurate and efficient
- [ ] Collision resolution uses smallest overlap method
- [ ] Physics constants are clearly defined
- [ ] Code is well-commented explaining collision logic

---

## Success Criteria
- ✅ Gravity applies correctly (900 px/s²)
- ✅ Jump mechanic works with -420 impulse
- ✅ Player can only jump when on ground
- ✅ AABB collision detection working
- ✅ Collision resolution working for all 4 directions
- ✅ Player lands on platforms without sinking
- ✅ Test level with ground and platforms created
- ✅ Physics feel good and responsive

---

## Common Issues & Solutions

### Issue: Player sinks through ground
**Solution**: Ensure collision resolution is called AFTER position update. Check that onGround is set correctly in resolveCollision

### Issue: Player sticks to walls
**Solution**: Verify that velocityX is set to 0 in horizontal collision resolution

### Issue: Player can jump infinitely
**Solution**: Check that jump only works when onGround is true, and that onGround is reset to false in updateBase()

### Issue: Collision resolution causes jittering
**Solution**: Ensure smallest overlap method is used. Check that entity velocity is set to 0 in the collision direction

### Issue: Player floats above ground
**Solution**: Check collision detection bounds are correct. Verify entity position is adjusted properly in resolveCollision

---

## Next Phase
Once Phase 3 is complete and tested, proceed to:
**[Phase 4: Shape Morphing Mechanic](./phase-04-shape-morphing.md)**
