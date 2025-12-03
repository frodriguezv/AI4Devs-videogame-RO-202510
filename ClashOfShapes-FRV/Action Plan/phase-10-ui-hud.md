# Phase 10: UI/HUD

## Objective
Create complete user interface with health bar, score display, orbs counter, shape indicator, and pause screen.

## Prerequisites
- Phase 9 completed (Camera System)

## Deliverables
- ✅ Health bar with 5 hearts (top-left)
- ✅ Score display
- ✅ Orbs collected counter (X/3)
- ✅ Current shape indicator with icon and name
- ✅ Pause screen overlay (ESC key)
- ✅ UI rendered on separate canvas (no camera transform)

---

## Implementation Steps

### Step 10.1: Implement Heart Drawing Function
```javascript
function drawHeart(ctx, x, y, size, filled) {
  ctx.save();

  if (filled) {
    ctx.fillStyle = '#E74C3C'; // Red
  } else {
    ctx.strokeStyle = '#E74C3C';
    ctx.lineWidth = 2;
  }

  // Draw heart shape using bezier curves
  ctx.beginPath();
  ctx.moveTo(x + size / 2, y + size / 4);

  // Left curve
  ctx.bezierCurveTo(
    x + size / 2, y,
    x, y,
    x, y + size / 4
  );
  ctx.bezierCurveTo(
    x, y + size / 2,
    x + size / 2, y + (3 * size) / 4,
    x + size / 2, y + size
  );

  // Right curve
  ctx.bezierCurveTo(
    x + size / 2, y + (3 * size) / 4,
    x + size, y + size / 2,
    x + size, y + size / 4
  );
  ctx.bezierCurveTo(
    x + size, y,
    x + size / 2, y,
    x + size / 2, y + size / 4
  );

  ctx.closePath();

  if (filled) {
    ctx.fill();
  } else {
    ctx.stroke();
  }

  ctx.restore();
}
```

### Step 10.2: Implement UI Rendering Function
```javascript
function renderUI() {
  // Clear UI canvas
  uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);

  // Health Bar (5 hearts at top-left)
  const heartSize = 20;
  const heartSpacing = 25;
  const heartY = 20;

  for (let i = 0; i < 5; i++) {
    const heartX = 20 + i * heartSpacing;
    const filled = i < gameState.health;
    drawHeart(uiCtx, heartX, heartY, heartSize, filled);
  }

  // Score Display
  uiCtx.save();
  uiCtx.fillStyle = '#FFFFFF';
  uiCtx.font = 'bold 20px Arial';
  uiCtx.fillText(`Score: ${gameState.score}`, 20, 60);

  // Orbs Collected
  uiCtx.fillText(`Orbs: ${gameState.orbsCollected}/3`, 20, 90);

  // Current Shape Indicator
  uiCtx.fillText('Shape:', 20, 120);

  // Draw shape icon
  const shapeIconX = 90;
  const shapeIconY = 100;
  const shapeIconSize = 20;
  uiCtx.fillStyle = '#4A90E2'; // Blue

  if (player) {
    if (player.shape === 'circle') {
      uiCtx.beginPath();
      uiCtx.arc(shapeIconX + shapeIconSize / 2, shapeIconY + shapeIconSize / 2, shapeIconSize / 2, 0, Math.PI * 2);
      uiCtx.fill();
    } else if (player.shape === 'square') {
      uiCtx.fillRect(shapeIconX, shapeIconY, shapeIconSize, shapeIconSize);
    } else if (player.shape === 'triangle') {
      uiCtx.beginPath();
      uiCtx.moveTo(shapeIconX + shapeIconSize / 2, shapeIconY);
      uiCtx.lineTo(shapeIconX + shapeIconSize, shapeIconY + shapeIconSize);
      uiCtx.lineTo(shapeIconX, shapeIconY + shapeIconSize);
      uiCtx.closePath();
      uiCtx.fill();
    }

    // Shape name text
    uiCtx.fillStyle = '#FFFFFF';
    uiCtx.font = '16px Arial';
    let shapeName = '';
    if (player.shape === 'circle') shapeName = 'Circle (Rock)';
    else if (player.shape === 'square') shapeName = 'Square (Paper)';
    else if (player.shape === 'triangle') shapeName = 'Triangle (Scissors)';
    uiCtx.fillText(shapeName, 120, 115);
  }

  uiCtx.restore();

  // Pause Screen
  if (gameState.paused) {
    uiCtx.save();
    // Dark overlay
    uiCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    uiCtx.fillRect(0, 0, uiCanvas.width, uiCanvas.height);

    // Pause text
    uiCtx.fillStyle = '#FFFFFF';
    uiCtx.font = 'bold 40px Arial';
    uiCtx.textAlign = 'center';
    uiCtx.fillText('PAUSED', uiCanvas.width / 2, uiCanvas.height / 2 - 20);

    uiCtx.font = '20px Arial';
    uiCtx.fillText('Press ESC to resume', uiCanvas.width / 2, uiCanvas.height / 2 + 20);
    uiCtx.restore();
  }
}
```

### Step 10.3: Update Render Function to Call renderUI
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

  // Render all world objects
  for (const tile of tiles) {
    tile.render(ctx, camera);
  }

  for (const collectible of collectibles) {
    collectible.render(ctx, camera);
  }

  for (const enemy of enemies) {
    enemy.render(ctx, camera);
  }

  if (player) {
    player.render(ctx, camera);
  }

  if (particleSystem) {
    particleSystem.render(ctx, camera);
  }

  for (const effect of textEffects) {
    effect.render(ctx, camera);
  }

  ctx.restore();

  // Render UI (no camera transform)
  renderUI();
}
```

### Step 10.4: Implement Pause Functionality
```javascript
// Add to update() function at the beginning:

function update(deltaTime) {
  // Handle pause toggle (ESC key)
  if (input.isKeyPressed('escape')) {
    gameState.paused = !gameState.paused;
    input.resetKey('escape');
  }

  if (gameState.paused || gameState.gameOver) return;

  // ... rest of update code ...
}
```

---

## Testing Checklist

### Health Bar Tests
- [ ] 5 hearts render at top-left (x=20, y=20)
- [ ] Hearts are red (#E74C3C)
- [ ] Filled hearts show current health
- [ ] Empty hearts (outlined) show lost health
- [ ] Heart count updates when taking damage
- [ ] Hearts are visible on all backgrounds

### Score Display Tests
- [ ] Score displays as "Score: X" at x=20, y=60
- [ ] Score updates when collecting coins (+10)
- [ ] Score updates when defeating enemies (+100)
- [ ] Score is white and readable
- [ ] Font size is 20px bold

### Orbs Counter Tests
- [ ] Orbs display as "Orbs: X/3" at x=20, y=90
- [ ] Counter starts at 0/3
- [ ] Counter updates when collecting orbs
- [ ] Counter shows correct total (3)

### Shape Indicator Tests
- [ ] "Shape:" label at x=20, y=120
- [ ] Shape icon renders correctly for all 3 shapes
- [ ] Icon is blue (#4A90E2)
- [ ] Icon size is 20×20
- [ ] Shape name text shows correct name and type:
  - "Circle (Rock)"
  - "Square (Paper)"
  - "Triangle (Scissors)"
- [ ] Indicator updates instantly when morphing

### Pause Screen Tests
- [ ] ESC key toggles pause on/off
- [ ] Dark overlay appears when paused (rgba(0,0,0,0.5))
- [ ] "PAUSED" text centered (40px bold white)
- [ ] "Press ESC to resume" text centered (20px white)
- [ ] Game freezes when paused (no updates)
- [ ] Game resumes correctly when unpaused
- [ ] Pause can be toggled multiple times

### UI Layer Tests
- [ ] UI elements don't scroll with camera
- [ ] UI stays fixed on screen
- [ ] UI renders on top of game world
- [ ] UI is always visible regardless of camera position

---

## Code Quality Checklist
- [ ] Heart drawing function is reusable
- [ ] UI rendering is organized in separate function
- [ ] UI code is clean and maintainable
- [ ] Font sizes and colors match PRD specifications

---

## Success Criteria
- ✅ Health bar with 5 hearts at top-left
- ✅ Hearts show filled/empty based on health
- ✅ Score display showing current score
- ✅ Orbs counter showing X/3 format
- ✅ Current shape indicator with icon and name
- ✅ Shape indicator updates when morphing
- ✅ Pause screen with ESC key toggle
- ✅ Pause overlay with instructions
- ✅ UI rendered on separate canvas (no camera scroll)
- ✅ All UI elements visible and functional

---

## Common Issues & Solutions

### Issue: UI scrolls with camera
**Solution**: Ensure renderUI() is called AFTER ctx.restore() and renders on uiCanvas, not gameCanvas

### Issue: Hearts don't render correctly
**Solution**: Check bezier curve coordinates for heart shape. Verify drawHeart() function is correct

### Issue: Shape indicator doesn't update
**Solution**: Verify player.shape is checked in renderUI(). Ensure renderUI() is called every frame

### Issue: Pause doesn't work
**Solution**: Check ESC key detection and input.resetKey('escape') is called. Verify gameState.paused check in update()

### Issue: Text is hard to read
**Solution**: Verify white color (#FFFFFF) is used. Check font size matches specifications

### Issue: UI elements overlap
**Solution**: Adjust Y positions: hearts at 20, score at 60, orbs at 90, shape at 120

---

## Next Phase
Once Phase 10 is complete and tested, proceed to:
**[Phase 11: Visual Effects & Polish](./phase-11-visual-effects.md)**
