# Phase 8: Collectibles & Scoring

## Objective
Implement coins, orbs, collection detection, scoring system, and text feedback.

## Prerequisites
- Phase 7 completed (Level Design & Terrain)

## Deliverables
- ✅ Coin class (yellow 16×16, +10 points)
- ✅ Orb class (purple 16×16, progression item)
- ✅ Bobbing animation (sin wave)
- ✅ Collection detection and feedback
- ✅ 18 coins placed throughout level
- ✅ 3 orbs placed (one per screen)
- ✅ "+10" and "ORB!" text effects

---

## Implementation Steps

### Step 8.1: Create Collectible Base Class
```javascript
class Collectible {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.baseY = y; // Store original Y for bobbing
    this.color = color;
    this.collected = false;
    this.bobSpeed = 2; // rad/s
    this.bobAmplitude = 20; // pixels
    this.bobTime = Math.random() * Math.PI * 2; // Random starting phase
  }

  update(deltaTime) {
    if (this.collected) return;

    // Bobbing animation
    this.bobTime += this.bobSpeed * deltaTime;
    this.y = this.baseY + Math.sin(this.bobTime) * this.bobAmplitude;
  }

  render(ctx, camera) {
    if (this.collected) return;

    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.size,
      top: this.y,
      bottom: this.y + this.size
    };
  }
}
```

### Step 8.2: Create Coin Class
```javascript
class Coin extends Collectible {
  constructor(x, y) {
    super(x, y, 16, '#F4D03F'); // Yellow
    this.points = 10;
  }

  onCollect(player) {
    this.collected = true;
    gameState.score += this.points;

    // Text effect
    textEffects.push(new TextEffect(
      this.x + this.size / 2,
      this.y,
      '+10',
      '#F4D03F',
      16,
      0.5
    ));
  }
}
```

### Step 8.3: Create Orb Class
```javascript
class Orb extends Collectible {
  constructor(x, y) {
    super(x, y, 16, '#9B59B6'); // Purple
  }

  onCollect(player) {
    this.collected = true;
    gameState.orbsCollected++;

    // Text effect
    textEffects.push(new TextEffect(
      this.x + this.size / 2,
      this.y,
      'ORB!',
      '#9B59B6',
      18,
      0.7
    ));

    // If all 3 orbs collected, show goal activation message
    // (Goal will be implemented in Phase 12)
    if (gameState.orbsCollected === 3) {
      console.log('All orbs collected! Goal activated!');
    }
  }
}
```

### Step 8.4: Add Collectibles to Level Class
```javascript
// Update Level.init() to return collectibles
static init() {
  const tiles = [];
  const enemiesData = [];
  const collectibles = [];

  // ... existing tile and enemy code ...

  // Add collectibles
  Level.placeCollectibles(collectibles);

  return { tiles, enemiesData, collectibles };
}

static placeCollectibles(collectibles) {
  // SCREEN 1: 5 coins + 1 orb
  collectibles.push(new Coin(250, 500));
  collectibles.push(new Coin(350, 420));
  collectibles.push(new Coin(450, 420));
  collectibles.push(new Coin(600, 320));
  collectibles.push(new Coin(750, 320));
  collectibles.push(new Orb(700, 270)); // Orb #1 on elevated platform

  // SCREEN 2: 5 coins + 1 orb
  collectibles.push(new Coin(900, 420));
  collectibles.push(new Coin(1100, 370));
  collectibles.push(new Coin(1200, 500));
  collectibles.push(new Coin(1300, 320));
  collectibles.push(new Coin(1500, 420));
  collectibles.push(new Orb(1500, 420)); // Orb #2 after spike section

  // SCREEN 3: 8 coins + 1 orb
  collectibles.push(new Coin(1650, 500));
  collectibles.push(new Coin(1750, 320));
  collectibles.push(new Coin(1850, 320));
  collectibles.push(new Coin(1950, 500));
  collectibles.push(new Coin(2000, 420));
  collectibles.push(new Coin(2100, 420));
  collectibles.push(new Coin(2180, 370));
  collectibles.push(new Coin(2280, 270));
  collectibles.push(new Orb(2320, 270)); // Orb #3 on final platform
}
```

### Step 8.5: Update initGame() to Handle Collectibles
```javascript
let collectibles = [];

function initGame() {
  // ... existing code ...

  // Initialize level
  const levelData = Level.init();
  tiles = levelData.tiles;
  collectibles = levelData.collectibles;

  // ... rest of existing code ...
}
```

### Step 8.6: Update Collectibles in Update Function
```javascript
function update(deltaTime) {
  if (gameState.paused || gameState.gameOver) return;

  // ... existing player and enemy update code ...

  // Update collectibles
  for (const collectible of collectibles) {
    collectible.update(deltaTime);

    // Check collection
    if (!collectible.collected && player && checkCollision(player, collectible)) {
      collectible.onCollect(player);
    }
  }

  // ... rest of existing code ...
}
```

### Step 8.7: Render Collectibles
```javascript
function render() {
  // ... existing code ...

  ctx.save();
  if (camera) {
    ctx.translate(camera.shakeX, camera.shakeY);
  }

  // Render tiles
  for (const tile of tiles) {
    tile.render(ctx, camera);
  }

  // Render collectibles
  for (const collectible of collectibles) {
    collectible.render(ctx, camera);
  }

  // ... rest of existing code (enemies, player, particles, text effects) ...

  ctx.restore();

  // Clear UI canvas
  uiCtx.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
}
```

---

## Testing Checklist

### Coin Tests
- [ ] Coins render as yellow circles (16×16)
- [ ] Coins have bobbing animation
- [ ] 18 total coins placed across level
- [ ] Screen 1 has 5 coins
- [ ] Screen 2 has 5 coins
- [ ] Screen 3 has 8 coins
- [ ] Collecting coin adds +10 to score
- [ ] "+10" text effect appears when collected
- [ ] Collected coins disappear

### Orb Tests
- [ ] Orbs render as purple circles (16×16)
- [ ] Orbs have bobbing animation
- [ ] 3 total orbs placed across level
- [ ] Orb #1 on Screen 1 elevated platform (x=700, y=270)
- [ ] Orb #2 on Screen 2 after spikes (x=1500, y=420)
- [ ] Orb #3 on Screen 3 final platform (x=2320, y=270)
- [ ] Collecting orb increases orbsCollected counter
- [ ] "ORB!" text effect appears when collected
- [ ] Collected orbs disappear

### Animation Tests
- [ ] Bobbing animation is smooth (sin wave)
- [ ] Bob speed is 2 rad/s
- [ ] Bob amplitude is ±20 pixels
- [ ] Multiple collectibles bob independently (random phases)

### Collection Tests
- [ ] Collection detection works reliably
- [ ] Player must touch collectible to collect
- [ ] Collected items don't reappear
- [ ] Text effects display at correct position
- [ ] Multiple collectibles can be collected rapidly

### Scoring Tests
- [ ] Score increases correctly when collecting coins
- [ ] Score display updates (will verify in Phase 10)
- [ ] Orbs collected counter increases (will verify in Phase 10)

---

## Code Quality Checklist
- [ ] Collectible base class properly abstracts common functionality
- [ ] Coin and Orb classes extend Collectible cleanly
- [ ] Collectible placement is strategic and balanced
- [ ] Code is DRY (no duplication between Coin and Orb)

---

## Success Criteria
- ✅ Collectible base class created
- ✅ Coin class (yellow, 16×16, +10 points)
- ✅ Orb class (purple, 16×16, progression item)
- ✅ Bobbing animation (sin wave, 2 rad/s, ±20px)
- ✅ 18 coins placed (5, 5, 8 per screen)
- ✅ 3 orbs placed (1 per screen)
- ✅ Collection detection working
- ✅ "+10" and "ORB!" text effects
- ✅ Scoring system functional

---

## Common Issues & Solutions

### Issue: Collectibles not visible
**Solution**: Ensure collectibles are rendered after tiles but before player. Check color values

### Issue: Bobbing animation not smooth
**Solution**: Verify Math.sin() calculation uses correct time accumulation. Check bobSpeed and bobAmplitude values

### Issue: Collection not detected
**Solution**: Verify checkCollision() is called for each collectible. Ensure getBounds() returns correct coordinates

### Issue: Text effect appears at wrong position
**Solution**: Check TextEffect x/y calculation uses collectible.x + size/2 for centering

### Issue: Collected items reappear
**Solution**: Ensure collected flag is set to true. Check render() and update() skip collected items

### Issue: All collectibles bob in sync
**Solution**: Initialize bobTime with random phase: Math.random() * Math.PI * 2

---

## Next Phase
Once Phase 8 is complete and tested, proceed to:
**[Phase 9: Camera System](./phase-09-camera-system.md)**
