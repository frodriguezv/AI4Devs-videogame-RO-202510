# Phase 2: Player Entity & Basic Movement

## Objective
Implement the player character with basic horizontal movement and rendering.

## Prerequisites
- Phase 1 completed (Core Setup & Game Loop)

## Deliverables
- ✅ Entity base class created
- ✅ Player class extending Entity
- ✅ Player rendering as blue square (32×32)
- ✅ Horizontal movement controls (left/right)
- ✅ Walk speed (120 px/s) and run speed (180 px/s)

---

## Implementation Steps

### Step 2.1: Create Entity Base Class
```javascript
class Entity {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityX = 0;
    this.velocityY = 0;
    this.onGround = false;
  }

  updateBase() {
    // Reset ground state (will be set by collision detection)
    this.onGround = false;
  }

  update(deltaTime) {
    // Override in subclasses
  }

  render(ctx, camera) {
    // Override in subclasses
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

### Step 2.2: Create Player Class
```javascript
class Player extends Entity {
  constructor(x, y) {
    super(x, y, 32, 32);
    this.shape = 'square'; // Starting shape
    this.color = '#4A90E2'; // Blue
    this.walkSpeed = 120;
    this.runSpeed = 180;
    this.invulnerable = false;
    this.invulnerabilityTimer = 0;
  }

  update(deltaTime) {
    this.updateBase();

    // Handle horizontal movement
    let targetSpeed = 0;
    const isRunning = input.isKeyPressed('x');
    const moveSpeed = isRunning ? this.runSpeed : this.walkSpeed;

    // Left movement
    if (input.isKeyPressed('arrowleft') || input.isKeyPressed('a')) {
      targetSpeed = -moveSpeed;
    }
    // Right movement
    if (input.isKeyPressed('arrowright') || input.isKeyPressed('d')) {
      targetSpeed = moveSpeed;
    }

    // Apply movement
    if (targetSpeed !== 0) {
      this.velocityX = targetSpeed;
    } else {
      // Apply friction when not moving
      this.velocityX *= 0.8;
    }

    // Update position
    this.x += this.velocityX * deltaTime;

    // Update invulnerability timer
    if (this.invulnerable) {
      this.invulnerabilityTimer -= deltaTime;
      if (this.invulnerabilityTimer <= 0) {
        this.invulnerable = false;
      }
    }
  }

  render(ctx, camera) {
    ctx.save();

    // Flash effect when invulnerable
    if (this.invulnerable && Math.floor(Date.now() / 100) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }

    ctx.fillStyle = this.color;

    // For now, always render as square
    // Shape morphing will be added in Phase 4
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.restore();
  }

  setInvulnerable(duration) {
    this.invulnerable = true;
    this.invulnerabilityTimer = duration;
  }
}
```

### Step 2.3: Initialize Player in Game State
```javascript
// Add to game initialization
let player = null;

function initGame() {
  // Create player at starting position
  player = new Player(100, 400);
}

// Call initGame after window loads
window.addEventListener('load', () => {
  initGame();
  gameLoop(0);
});
```

### Step 2.4: Update the Update Function
```javascript
function update(deltaTime) {
  if (gameState.paused || gameState.gameOver) return;

  // Update player
  if (player) {
    player.update(deltaTime);
  }
}
```

### Step 2.5: Update the Render Function
```javascript
function render() {
  // Clear main canvas
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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

### Visual Tests
- [ ] Player renders as blue square (32×32)
- [ ] Player spawns at position (100, 400)
- [ ] Player color is correct blue (#4A90E2)

### Movement Tests
- [ ] Arrow Left / A key moves player left
- [ ] Arrow Right / D key moves player right
- [ ] Walking speed feels appropriate (120 px/s)
- [ ] Holding X while moving increases speed (180 px/s)
- [ ] Releasing movement keys causes player to slow down (friction)
- [ ] Player doesn't drift when no keys are pressed

### Input Tests
- [ ] Multiple movement keys can be pressed simultaneously
- [ ] Movement is smooth and responsive
- [ ] No input lag

---

## Code Quality Checklist
- [ ] Entity base class properly abstracts common functionality
- [ ] Player class extends Entity correctly
- [ ] Movement logic is clear and well-commented
- [ ] No magic numbers (speeds defined as named constants)

---

## Success Criteria
- ✅ Entity base class created with common properties
- ✅ Player class extends Entity
- ✅ Player renders as 32×32 blue square
- ✅ Player spawns at (100, 400)
- ✅ Left/right movement works with arrow keys and WASD
- ✅ Walk speed (120 px/s) and run speed (180 px/s) implemented
- ✅ Friction applies when not moving (0.8 multiplier)
- ✅ Movement is smooth and responsive

---

## Common Issues & Solutions

### Issue: Player moves too fast or too slow
**Solution**: Verify walkSpeed and runSpeed values (120 and 180). Check that deltaTime is properly passed to update

### Issue: Player doesn't stop when releasing keys
**Solution**: Ensure friction (0.8 multiplier) is applied when targetSpeed is 0

### Issue: Player renders at wrong position
**Solution**: Check spawn coordinates (100, 400) and ensure rendering uses this.x and this.y

### Issue: Run button not working
**Solution**: Verify X key is properly detected by InputManager and isRunning logic is correct

---

## Next Phase
Once Phase 2 is complete and tested, proceed to:
**[Phase 3: Physics & Collision System](./phase-03-physics-collision.md)**
