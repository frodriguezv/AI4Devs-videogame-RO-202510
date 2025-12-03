# Phase 6: Combat System (Rock-Paper-Scissors)

## Objective
Implement the Rock-Paper-Scissors combat logic with complete visual feedback system.

## Prerequisites
- Phase 5 completed (Enemy System & AI)

## Deliverables
- ✅ Rock-Paper-Scissors combat resolution
- ✅ Winning match: +100 points, enemy defeat, bounce-back
- ✅ Losing match: -1 heart, knockback, invulnerability
- ✅ Draw: both bounce back, no damage
- ✅ Combat particles (victory, damage, clash)
- ✅ Combat text effects ("POW!", "CLASH!", "+100")
- ✅ Camera shake system
- ✅ Invulnerability flashing

---

## Implementation Steps

### Step 6.1: Implement Rock-Paper-Scissors Logic
```javascript
// Add helper function for combat resolution
function getCombatResult(playerShape, enemyShape) {
  // Returns: 'win', 'lose', or 'draw'

  if (playerShape === enemyShape) {
    return 'draw';
  }

  // Circle (Rock) beats Triangle (Scissors)
  if (playerShape === 'circle' && enemyShape === 'triangle') return 'win';

  // Square (Paper) beats Circle (Rock)
  if (playerShape === 'square' && enemyShape === 'circle') return 'win';

  // Triangle (Scissors) beats Square (Paper)
  if (playerShape === 'triangle' && enemyShape === 'square') return 'win';

  // All other cases are losses
  return 'lose';
}
```

### Step 6.2: Create TextEffect Class
```javascript
class TextEffect {
  constructor(x, y, text, color, size, duration) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.size = size;
    this.duration = duration;
    this.maxDuration = duration;
    this.velocityY = -50; // Float upward
  }

  update(deltaTime) {
    this.y += this.velocityY * deltaTime;
    this.duration -= deltaTime;
  }

  render(ctx, camera) {
    const alpha = this.duration / this.maxDuration;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.font = `bold ${this.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }

  isDead() {
    return this.duration <= 0;
  }
}

// Add text effects array
let textEffects = [];
```

### Step 6.3: Implement Camera Shake
```javascript
class Camera {
  constructor(width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.shakeIntensity = 0;
    this.shakeDuration = 0;
    this.shakeX = 0;
    this.shakeY = 0;
  }

  shake(intensity, duration) {
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
  }

  update() {
    if (this.shakeDuration > 0) {
      this.shakeX = (Math.random() - 0.5) * this.shakeIntensity * 2;
      this.shakeY = (Math.random() - 0.5) * this.shakeIntensity * 2;
      this.shakeDuration--;
    } else {
      this.shakeX = 0;
      this.shakeY = 0;
    }
  }

  apply(ctx) {
    ctx.translate(-this.x + this.shakeX, -this.y + this.shakeY);
  }
}

// Initialize camera
let camera = null;

// In initGame():
camera = new Camera(800, 600);
```

### Step 6.4: Implement Combat Collision Detection
```javascript
// Add to update() function after player update:

// Check player-enemy collisions
for (const enemy of enemies) {
  if (enemy.alive && checkCollision(player, enemy) && !player.invulnerable) {
    handleCombat(player, enemy);
  }
}
```

### Step 6.5: Implement Combat Handler
```javascript
function handleCombat(player, enemy) {
  const result = getCombatResult(player.shape, enemy.shape);

  // Calculate collision point
  const collisionX = (player.x + enemy.x) / 2 + 16;
  const collisionY = (player.y + enemy.y) / 2 + 16;

  if (result === 'win') {
    // Player wins - enemy defeated
    enemy.alive = false;
    gameState.score += 100;

    // Text effects
    textEffects.push(new TextEffect(enemy.x + 16, enemy.y + 16, 'POW!', '#FFD700', 24, 0.5));
    textEffects.push(new TextEffect(enemy.x + 16, enemy.y - 4, '+100', '#00FF00', 18, 0.6));

    // Victory particles (10 red particles from enemy center)
    particleSystem.emit(enemy.x + 16, enemy.y + 16, 10, '#E24A4A', 100, 0.5);

    // Player bounce-back
    const directionX = player.x < enemy.x ? -1 : 1;
    player.velocityX = directionX * 100;
    player.velocityY = -200;

    // Camera shake
    camera.shake(4, 2);

  } else if (result === 'lose') {
    // Player loses - take damage
    gameState.health--;
    player.setInvulnerable(1.2);

    // Damage particles (10 red sparkles from player center)
    particleSystem.emitRadial(player.x + 16, player.y + 16, 10, '#E74C3C', 150, 0.3);

    // Player knockback
    const directionX = player.x < enemy.x ? -1 : 1;
    player.velocityX = directionX * 200;
    player.velocityY = -200;

    // Camera shake
    camera.shake(6, 3);

    // Check game over
    if (gameState.health <= 0) {
      gameState.gameOver = true;
    }

  } else {
    // Draw - both bounce back
    textEffects.push(new TextEffect(collisionX, collisionY, 'CLASH!', '#FFFFFF', 18, 0.3));

    // Collision sparks (5 white particles)
    particleSystem.emitRadial(collisionX, collisionY, 5, '#FFFFFF', 50, 0.5);

    // Both bounce back
    const directionX = player.x < enemy.x ? -1 : 1;
    player.velocityX = directionX * 100;
    player.velocityY = -200;
    enemy.velocityX = -directionX * 100;
    enemy.velocityY = -200;
  }
}
```

### Step 6.6: Update ParticleSystem with emit() Method
```javascript
// Add to ParticleSystem class:

emit(x, y, count, color, speed, lifetime) {
  // Circular pattern emission (evenly distributed)
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const velocityX = Math.cos(angle) * speed;
    const velocityY = Math.sin(angle) * speed;
    const size = 2 + Math.random() * 4;
    this.particles.push(new Particle(x, y, velocityX, velocityY, color, size, lifetime));
  }
}
```

### Step 6.7: Update Text Effects in Update Function
```javascript
// In update() function, add:

// Update text effects
for (const effect of textEffects) {
  effect.update(deltaTime);
}
textEffects = textEffects.filter(e => !e.isDead());

// Update camera
if (camera) {
  camera.update();
}
```

### Step 6.8: Render Text Effects
```javascript
// In render() function, add after particles:

// Render text effects
for (const effect of textEffects) {
  effect.render(ctx, camera);
}
```

### Step 6.9: Apply Camera Transform
```javascript
// Update render() function to use camera:

function render() {
  // Clear main canvas
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();

  // Apply camera transform (for now, no actual following, just shake)
  if (camera) {
    ctx.translate(camera.shakeX, camera.shakeY);
  }

  // Render tiles
  for (const tile of tiles) {
    tile.render(ctx, camera);
  }

  // Render enemies
  for (const enemy of enemies) {
    enemy.render(ctx, camera);
  }

  // Render player
  if (player) {
    player.render(ctx, camera);
  }

  // Render particles
  if (particleSystem) {
    particleSystem.render(ctx, camera);
  }

  // Render text effects
  for (const effect of textEffects) {
    effect.render(ctx, camera);
  }

  ctx.restore();

  // Clear UI canvas
  uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
}
```

---

## Testing Checklist

### Combat Logic Tests
- [ ] Circle player beats Triangle enemy (win)
- [ ] Square player beats Circle enemy (win)
- [ ] Triangle player beats Square enemy (win)
- [ ] Triangle player loses to Circle enemy (lose)
- [ ] Circle player loses to Square enemy (lose)
- [ ] Square player loses to Triangle enemy (lose)
- [ ] Same shapes result in draw (all 3 combinations)

### Victory Feedback Tests
- [ ] "POW!" text appears when winning
- [ ] "+100" score text appears when winning
- [ ] Score increases by 100
- [ ] 10 red particles explode from enemy
- [ ] Player bounces back
- [ ] Camera shakes (intensity 4, 2 frames)
- [ ] Enemy disappears (marked as not alive)

### Damage Feedback Tests
- [ ] Health decreases by 1 when losing
- [ ] Player knocked back
- [ ] 10 red sparkle particles emit from player
- [ ] Camera shakes (intensity 6, 3 frames)
- [ ] Player becomes invulnerable for 1.2 seconds
- [ ] Player flashes during invulnerability
- [ ] Game over when health reaches 0

### Draw Feedback Tests
- [ ] "CLASH!" text appears
- [ ] 5 white particles emit at collision point
- [ ] Both player and enemy bounce back
- [ ] No damage to either
- [ ] Can retry with different shape

### Invulnerability Tests
- [ ] No collision detection during invulnerability
- [ ] Invulnerability lasts 1.2 seconds
- [ ] Player flashes (50% alpha) during invulnerability

---

## Success Criteria
- ✅ Rock-Paper-Scissors logic implemented correctly (9 combinations)
- ✅ Winning match: enemy defeated, +100 points, bounce-back
- ✅ Losing match: -1 heart, knockback, invulnerability
- ✅ Draw: both bounce, no damage
- ✅ Victory particles (10 red, circular pattern)
- ✅ Damage particles (10 red sparkles, radial)
- ✅ Clash particles (5 white)
- ✅ Text effects ("POW!", "CLASH!", "+100")
- ✅ Camera shake for impacts
- ✅ Invulnerability system working

---

## Common Issues & Solutions

### Issue: Combat triggers multiple times
**Solution**: Ensure invulnerability is set after combat. Check that alive flag prevents further collisions with dead enemies

### Issue: Wrong combat outcome
**Solution**: Verify getCombatResult() logic matches Rock-Paper-Scissors rules exactly

### Issue: Particles don't appear
**Solution**: Check particleSystem.emit() and emitRadial() are called with correct parameters

### Issue: Text effects not visible
**Solution**: Ensure text effects render after particles but before UI. Check font size and color

### Issue: Camera shake too intense or not visible
**Solution**: Adjust shake intensity (4 for victory, 6 for damage) and duration (frames)

### Issue: Player can be hit while invulnerable
**Solution**: Check that checkCollision with enemies includes !player.invulnerable condition

---

## Next Phase
Once Phase 6 is complete and tested, proceed to:
**[Phase 7: Level Design & Terrain](./phase-07-level-terrain.md)**
