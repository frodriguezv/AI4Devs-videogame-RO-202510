# Phase 9: Camera System

## Objective
Implement smooth camera following with lerp, level bound clamping, and proper world-to-screen transformation.

## Prerequisites
- Phase 8 completed (Collectibles & Scoring)

## Deliverables
- ✅ Camera class with smooth follow (10% lerp)
- ✅ Camera clamped to level bounds
- ✅ Camera follows player in both X and Y axes
- ✅ Camera shake system (already implemented, enhance if needed)
- ✅ Proper camera transform applied to all world objects

---

## Implementation Steps

### Step 9.1: Enhance Camera Class with Following
```javascript
class Camera {
  constructor(width, height, levelWidth, levelHeight) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.levelWidth = levelWidth;
    this.levelHeight = levelHeight;
    this.shakeIntensity = 0;
    this.shakeDuration = 0;
    this.shakeX = 0;
    this.shakeY = 0;
    this.lerpFactor = 0.1; // 10% lerp for smooth following
  }

  follow(target) {
    if (!target) return;

    // Calculate target camera position (center player in viewport)
    const targetX = target.x + target.width / 2 - this.width / 2;
    const targetY = target.y + target.height / 2 - this.height / 2;

    // Smooth lerp to target position
    this.x += (targetX - this.x) * this.lerpFactor;
    this.y += (targetY - this.y) * this.lerpFactor;

    // Clamp to level bounds
    this.x = Math.max(0, Math.min(this.x, this.levelWidth - this.width));
    this.y = Math.max(0, Math.min(this.y, this.levelHeight - this.height));
  }

  shake(intensity, duration) {
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
  }

  update() {
    // Update shake effect
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
    // Apply camera transform (translate world by -camera position + shake)
    ctx.translate(-this.x + this.shakeX, -this.y + this.shakeY);
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.shakeX = 0;
    this.shakeY = 0;
    this.shakeDuration = 0;
  }
}
```

### Step 9.2: Update Camera Initialization
```javascript
function initGame() {
  // ... existing code ...

  // Create camera with level dimensions
  camera = new Camera(800, 600, gameState.levelWidth, gameState.levelHeight);

  // ... rest of existing code ...
}
```

### Step 9.3: Update Camera in Update Function
```javascript
function update(deltaTime) {
  if (gameState.paused || gameState.gameOver) return;

  // ... existing update code ...

  // Update camera to follow player
  if (camera && player) {
    camera.follow(player);
    camera.update();
  }

  // ... rest of existing code ...
}
```

### Step 9.4: Apply Camera Transform in Render Function
```javascript
function render() {
  // Clear main canvas
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();

  // Apply camera transform
  if (camera) {
    camera.apply(ctx);
  }

  // Render all world objects (now transformed by camera)
  // Render tiles
  for (const tile of tiles) {
    tile.render(ctx, camera);
  }

  // Render collectibles
  for (const collectible of collectibles) {
    collectible.render(ctx, camera);
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

  // Clear UI canvas (no camera transform for UI)
  uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);

  // UI rendering will be added in Phase 10
}
```

### Step 9.5: Remove Camera Parameter from Render Methods (Optional)
Since camera transform is applied globally, individual render methods don't need the camera parameter unless they need camera position info. You can keep or remove based on preference.

---

## Testing Checklist

### Camera Following Tests
- [ ] Camera follows player horizontally as player moves right
- [ ] Camera follows player vertically as player jumps/falls
- [ ] Camera movement is smooth (10% lerp, not instant)
- [ ] Player stays roughly centered in viewport (when not at edges)
- [ ] Camera doesn't jitter or shake unexpectedly

### Camera Bounds Tests
- [ ] Camera doesn't show area left of x=0
- [ ] Camera doesn't show area right of x=2400
- [ ] Camera doesn't show area above y=0
- [ ] Camera doesn't show area below y=600
- [ ] Camera stops at edges smoothly (no jarring)

### Camera at Start Tests
- [ ] Camera starts at (0, 0) or follows player from spawn
- [ ] Player visible at spawn position (100, 400)
- [ ] Screen 1 visible initially

### Camera at End Tests
- [ ] Camera reaches rightmost screen (Screen 3)
- [ ] Goal area is visible when player reaches it
- [ ] Camera doesn't overshoot level bounds

### Camera Shake Tests
- [ ] Shake still works with camera following
- [ ] Shake doesn't break camera bounds
- [ ] Shake returns to smooth follow after duration

### Visual Tests
- [ ] All objects scroll smoothly with camera
- [ ] No objects flicker or disappear
- [ ] UI stays fixed (not affected by camera)
- [ ] No rendering artifacts at screen edges

---

## Code Quality Checklist
- [ ] Camera class is clean and well-organized
- [ ] Lerp factor is configurable (0.1 for 10%)
- [ ] Camera bounds clamping is correct
- [ ] Camera transform is applied efficiently

---

## Success Criteria
- ✅ Camera class with follow() method
- ✅ Smooth lerp following at 10% lerp factor
- ✅ Camera follows player in both X and Y axes
- ✅ Camera clamped to level bounds (0-1600 X, 0-0 Y adjusted for viewport)
- ✅ Camera centers player in viewport when possible
- ✅ Camera shake still functional
- ✅ All world objects transform correctly with camera
- ✅ UI remains fixed (no camera transform)

---

## Common Issues & Solutions

### Issue: Camera follows player instantly (not smooth)
**Solution**: Verify lerp factor is 0.1 (10%). Check that lerp formula uses (target - current) * lerpFactor

### Issue: Player disappears off screen
**Solution**: Check camera.follow() centers player correctly. Verify camera bounds allow player to be visible

### Issue: Camera shows black areas outside level
**Solution**: Ensure level bounds are correct (2400×600). Verify clamping logic: Math.max(0, Math.min(x, levelWidth - cameraWidth))

### Issue: Objects render at wrong position
**Solution**: Verify camera.apply() uses ctx.translate(-camera.x + shakeX, -camera.y + shakeY)

### Issue: Camera jitters or stutters
**Solution**: Check that camera updates every frame in update(). Verify lerp calculation is smooth

### Issue: UI scrolls with camera
**Solution**: Ensure UI is rendered on separate canvas AFTER ctx.restore(), not inside camera transform

---

## Next Phase
Once Phase 9 is complete and tested, proceed to:
**[Phase 10: UI/HUD](./phase-10-ui-hud.md)**
