# Phase 5: Enemy System & AI

## Objective
Create enemy entities with patrol AI behavior for all three shape types.

## Prerequisites
- Phase 4 completed (Shape Morphing Mechanic)

## Deliverables
- ✅ Enemy class extending Entity
- ✅ Patrol AI (left-right movement with patrol range)
- ✅ Three enemy types: Circle (60 px/s), Square (50 px/s), Triangle (70 px/s)
- ✅ Red colored enemies (32×32)
- ✅ Shape-specific enemy rendering
- ✅ Enemies patrol independently

---

## Implementation Steps

### Step 5.1: Create Enemy Class
```javascript
class Enemy extends Entity {
  constructor(x, y, shape, speed) {
    super(x, y, 32, 32);
    this.shape = shape; // 'circle', 'square', or 'triangle'
    this.color = '#E24A4A'; // Red
    this.speed = speed;
    this.direction = 1; // 1 = right, -1 = left
    this.patrolRange = 200;
    this.startX = x;
    this.alive = true;
  }

  update(deltaTime) {
    if (!this.alive) return;

    this.updateBase();

    // Apply gravity
    this.velocityY += gameState.gravity * deltaTime;

    // Patrol movement
    this.velocityX = this.direction * this.speed;

    // Update position
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;

    // Check patrol range
    if (this.x > this.startX + this.patrolRange) {
      this.direction = -1; // Turn left
      this.x = this.startX + this.patrolRange;
    } else if (this.x < this.startX - this.patrolRange) {
      this.direction = 1; // Turn right
      this.x = this.startX - this.patrolRange;
    }
  }

  render(ctx, camera) {
    if (!this.alive) return;

    ctx.save();
    ctx.fillStyle = this.color;

    // Render based on shape
    if (this.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.shape === 'square') {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else if (this.shape === 'triangle') {
      ctx.beginPath();
      ctx.moveTo(this.x + this.width / 2, this.y);
      ctx.lineTo(this.x + this.width, this.y + this.height);
      ctx.lineTo(this.x, this.y + this.height);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }
}
```

### Step 5.2: Initialize Enemy Array
```javascript
// Add to game initialization
let enemies = [];

function initGame() {
  // ... existing code ...

  // Create test enemies
  enemies = [];

  // Circle enemy (Rock, 60 px/s)
  enemies.push(new Enemy(300, 500, 'circle', 60));

  // Square enemy (Paper, 50 px/s)
  enemies.push(new Enemy(500, 400, 'square', 50));

  // Triangle enemy (Scissors, 70 px/s)
  enemies.push(new Enemy(200, 300, 'triangle', 70));
}
```

### Step 5.3: Update Enemies in Update Function
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

  // Update enemies
  for (const enemy of enemies) {
    enemy.update(deltaTime);

    // Check enemy collisions with tiles
    for (const tile of tiles) {
      if (checkCollision(enemy, tile)) {
        resolveCollision(enemy, tile);
      }
    }
  }

  // Update particle system
  if (particleSystem) {
    particleSystem.update(deltaTime);
  }
}
```

### Step 5.4: Render Enemies in Render Function
```javascript
function render() {
  // Clear main canvas
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Render tiles
  for (const tile of tiles) {
    tile.render(ctx);
  }

  // Render enemies
  for (const enemy of enemies) {
    enemy.render(ctx);
  }

  // Render player
  if (player) {
    player.render(ctx);
  }

  // Render particles
  if (particleSystem) {
    particleSystem.render(ctx);
  }

  // Clear UI canvas
  uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
}
```

### Step 5.5: Add Platform Edge Detection (Optional Enhancement)
```javascript
// Add to Enemy.update() method for better AI:

// Reverse direction at platform edges (optional)
// This prevents enemies from walking off platforms
// Comment out if you want enemies to fall off platforms
```

---

## Testing Checklist

### Enemy Rendering Tests
- [ ] Circle enemies render as red circles (32×32)
- [ ] Square enemies render as red squares (32×32)
- [ ] Triangle enemies render as red triangles (32×32)
- [ ] All enemies use red color (#E24A4A)

### Patrol AI Tests
- [ ] Enemies move left and right automatically
- [ ] Enemies reverse direction at patrol range limits
- [ ] Circle enemies move at 60 px/s
- [ ] Square enemies move at 50 px/s
- [ ] Triangle enemies move at 70 px/s
- [ ] Patrol range is approximately 200 pixels

### Physics Tests
- [ ] Enemies affected by gravity
- [ ] Enemies land on platforms
- [ ] Enemies don't fall through ground
- [ ] Enemies collide with terrain properly

### Multiple Enemies Test
- [ ] Multiple enemies can exist simultaneously
- [ ] Each enemy patrols independently
- [ ] Enemies don't affect each other's movement
- [ ] All three enemy types can coexist

---

## Code Quality Checklist
- [ ] Enemy class properly extends Entity
- [ ] Patrol logic is clear and maintainable
- [ ] Shape-specific rendering matches player rendering
- [ ] Speed constants are configurable per enemy type

---

## Success Criteria
- ✅ Enemy class created extending Entity
- ✅ Three enemy shapes: Circle, Square, Triangle
- ✅ Patrol AI with left-right movement working
- ✅ Patrol range of 200 pixels implemented
- ✅ Different speeds: Circle (60), Square (50), Triangle (70)
- ✅ Red color (#E24A4A) for all enemies
- ✅ Enemies render with correct shapes (32×32)
- ✅ Enemies affected by gravity and collision
- ✅ Multiple enemies can coexist independently

---

## Common Issues & Solutions

### Issue: Enemies fall through ground
**Solution**: Ensure enemies are added to collision detection loop with tiles

### Issue: Enemies don't reverse direction
**Solution**: Check patrol range logic. Verify startX is set correctly and direction flips at range limits

### Issue: Enemies move at wrong speed
**Solution**: Verify speed parameter is passed correctly to Enemy constructor (60, 50, 70)

### Issue: Enemy shapes render incorrectly
**Solution**: Copy rendering code from Player class. Ensure shape property is set correctly

### Issue: Enemies jitter when reversing
**Solution**: Clamp enemy position to patrol range when reversing to prevent overshooting

### Issue: Enemies walk off platforms
**Solution**: Either accept this behavior or implement platform edge detection in update method

---

## Next Phase
Once Phase 5 is complete and tested, proceed to:
**[Phase 6: Combat System (Rock-Paper-Scissors)](./phase-06-combat-system.md)**
