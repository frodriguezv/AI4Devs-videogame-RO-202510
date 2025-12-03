# Phase 4: Shape Morphing Mechanic

## Objective
Implement the core shape-shifting mechanic with three shapes (Circle, Square, Triangle) and visual feedback.

## Prerequisites
- Phase 3 completed (Physics & Collision System)

## Deliverables
- ✅ Three shape types: Circle (Rock), Square (Paper), Triangle (Scissors)
- ✅ Q key cycles forward through shapes
- ✅ E key cycles backward through shapes
- ✅ Shape-specific rendering for all three shapes
- ✅ 5 blue sparkle particles when morphing
- ✅ Instant transformation (no cooldown)

---

## Implementation Steps

### Step 4.1: Add Shape Property to Player
```javascript
// Already exists in Player constructor, but verify:
this.shape = 'square'; // 'circle', 'square', or 'triangle'
```

### Step 4.2: Implement Shape Cycling Methods
```javascript
// Add to Player class:

cycleShapeForward() {
  const shapes = ['square', 'circle', 'triangle'];
  const currentIndex = shapes.indexOf(this.shape);
  const nextIndex = (currentIndex + 1) % shapes.length;
  this.shape = shapes[nextIndex];
  this.onShapeMorph();
}

cycleShapeBackward() {
  const shapes = ['square', 'circle', 'triangle'];
  const currentIndex = shapes.indexOf(this.shape);
  const prevIndex = (currentIndex - 1 + shapes.length) % shapes.length;
  this.shape = shapes[prevIndex];
  this.onShapeMorph();
}

onShapeMorph() {
  // Emit particles (will be implemented in Step 4.5)
  // For now, just a placeholder
  console.log(`Morphed to ${this.shape}`);
}
```

### Step 4.3: Add Shape Morphing Input Handling
```javascript
// Add to Player.update() method, before movement logic:

// Shape morphing (Q and E keys)
if (input.isKeyPressed('q')) {
  this.cycleShapeForward();
  input.resetKey('q'); // Consume key press to prevent continuous switching
}

if (input.isKeyPressed('e')) {
  this.cycleShapeBackward();
  input.resetKey('e'); // Consume key press to prevent continuous switching
}
```

### Step 4.4: Implement Shape-Specific Rendering
```javascript
// Update Player.render() method:

render(ctx, camera) {
  ctx.save();

  // Flash effect when invulnerable
  if (this.invulnerable && Math.floor(Date.now() / 100) % 2 === 0) {
    ctx.globalAlpha = 0.5;
  }

  ctx.fillStyle = this.color;

  // Render based on current shape
  if (this.shape === 'circle') {
    // Draw circle
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (this.shape === 'square') {
    // Draw square
    ctx.fillRect(this.x, this.y, this.width, this.height);
  } else if (this.shape === 'triangle') {
    // Draw triangle (pointing up)
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y); // Top point
    ctx.lineTo(this.x + this.width, this.y + this.height); // Bottom right
    ctx.lineTo(this.x, this.y + this.height); // Bottom left
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}
```

### Step 4.5: Create Particle System for Morph Effect
```javascript
class Particle {
  constructor(x, y, velocityX, velocityY, color, size, lifetime) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.color = color;
    this.size = size;
    this.lifetime = lifetime;
    this.maxLifetime = lifetime;
  }

  update(deltaTime) {
    // Apply gravity
    this.velocityY += 300 * deltaTime;

    // Update position
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;

    // Decrease lifetime
    this.lifetime -= deltaTime;
  }

  render(ctx, camera) {
    const alpha = this.lifetime / this.maxLifetime;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    ctx.restore();
  }

  isDead() {
    return this.lifetime <= 0;
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  emitRadial(x, y, count, color, speed, lifetime) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speedVariation = 0.5 + Math.random() * 0.5;
      const velocityX = Math.cos(angle) * speed * speedVariation;
      const velocityY = Math.sin(angle) * speed * speedVariation;
      const size = 2 + Math.random() * 4; // Random size 2-6
      this.particles.push(new Particle(x, y, velocityX, velocityY, color, size, lifetime));
    }
  }

  update(deltaTime) {
    // Update all particles
    for (const particle of this.particles) {
      particle.update(deltaTime);
    }

    // Remove dead particles
    this.particles = this.particles.filter(p => !p.isDead());
  }

  render(ctx, camera) {
    for (const particle of this.particles) {
      particle.render(ctx, camera);
    }
  }
}
```

### Step 4.6: Initialize Particle System
```javascript
// Add to game initialization
let particleSystem = null;

function initGame() {
  // ... existing code ...

  // Create particle system
  particleSystem = new ParticleSystem();
}
```

### Step 4.7: Emit Particles on Shape Morph
```javascript
// Update Player.onShapeMorph() method:

onShapeMorph() {
  // Emit 5 blue sparkle particles radially
  const centerX = this.x + this.width / 2;
  const centerY = this.y + this.height / 2;
  particleSystem.emitRadial(centerX, centerY, 5, '#4A90E2', 100, 0.3);
}
```

### Step 4.8: Update and Render Particles
```javascript
// In update() function, add:
if (particleSystem) {
  particleSystem.update(deltaTime);
}

// In render() function, add after player rendering:
if (particleSystem) {
  particleSystem.render(ctx);
}
```

---

## Testing Checklist

### Shape Rendering Tests
- [ ] Circle shape renders correctly (blue circle)
- [ ] Square shape renders correctly (blue square)
- [ ] Triangle shape renders correctly (blue triangle pointing up)
- [ ] All shapes are same size (32×32)
- [ ] All shapes are blue color (#4A90E2)

### Shape Cycling Tests
- [ ] Q key cycles forward: Square → Circle → Triangle → Square
- [ ] E key cycles backward: Square → Triangle → Circle → Square
- [ ] Shape change is instant (no delay)
- [ ] Key must be released and pressed again to cycle (not continuous)
- [ ] Shape morphing works while in air
- [ ] Shape morphing works while moving

### Particle Effect Tests
- [ ] 5 blue particles emit when morphing
- [ ] Particles spread radially from player center
- [ ] Particles fade out over 0.3 seconds
- [ ] Particles have gravity applied
- [ ] Particles don't cause performance issues

### Visual Tests
- [ ] Shape transitions are clear and visible
- [ ] Particle effect is satisfying
- [ ] No visual glitches during morphing

---

## Code Quality Checklist
- [ ] Shape rendering code is clean and organized
- [ ] Particle system is efficient and reusable
- [ ] Shape cycling logic is clear
- [ ] No duplicate code for shape rendering

---

## Success Criteria
- ✅ Three shapes implemented: Circle, Square, Triangle
- ✅ Q key cycles forward through shapes
- ✅ E key cycles backward through shapes
- ✅ All three shapes render correctly at 32×32 size
- ✅ Blue color (#4A90E2) for all shapes
- ✅ 5 blue sparkle particles emit when morphing
- ✅ Instant transformation with no cooldown
- ✅ Shape morphing works in air and while moving
- ✅ Particle system functional and efficient

---

## Common Issues & Solutions

### Issue: Shape doesn't change when pressing Q/E
**Solution**: Verify input.resetKey() is called to consume the key press. Check that cycleShape methods are called correctly

### Issue: Shape renders incorrectly
**Solution**: Check canvas drawing code for each shape. Verify ctx.beginPath() and ctx.closePath() are used for circle and triangle

### Issue: Particles don't appear
**Solution**: Verify particleSystem is initialized and emitRadial is called with correct parameters. Check that particles are rendered after player

### Issue: Shape changes continuously when holding key
**Solution**: Ensure input.resetKey() is called immediately after shape change to consume the key press

### Issue: Triangle renders upside down
**Solution**: Check triangle drawing coordinates. Top point should be at (x + width/2, y)

---

## Next Phase
Once Phase 4 is complete and tested, proceed to:
**[Phase 5: Enemy System & AI](./phase-05-enemy-system.md)**
