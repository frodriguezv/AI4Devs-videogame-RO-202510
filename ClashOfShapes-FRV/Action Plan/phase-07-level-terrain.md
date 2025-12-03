# Phase 7: Level Design & Terrain

## Objective
Build the complete 3-screen level layout with all platforms and terrain according to PRD specifications.

## Prerequisites
- Phase 6 completed (Combat System)

## Deliverables
- ✅ Level class with init() method
- ✅ Screen 1 (Tutorial, 0-800px) with easy platforming
- ✅ Screen 2 (Challenge, 800-1600px) with platforms and checkpoint
- ✅ Screen 3 (Final, 1600-2400px) with enemy gauntlet
- ✅ Complete level dimensions: 2400×600
- ✅ Strategic platform placement
- ✅ All 10 enemies placed according to PRD

---

## Implementation Steps

### Step 7.1: Create Level Class
```javascript
class Level {
  static init() {
    const tiles = [];
    const enemiesData = [];

    // Ground floor across entire level (y=550)
    for (let x = 0; x < gameState.levelWidth; x += gameState.tileSize) {
      tiles.push(new GroundTile(x, 550, 16, 16));
    }

    // SCREEN 1: Tutorial Section (0-800px)
    Level.buildScreen1(tiles, enemiesData);

    // SCREEN 2: Challenge Section (800-1600px)
    Level.buildScreen2(tiles, enemiesData);

    // SCREEN 3: Final Section (1600-2400px)
    Level.buildScreen3(tiles, enemiesData);

    return { tiles, enemiesData };
  }

  static buildScreen1(tiles, enemiesData) {
    // Platform at x=300, y=450 (width: 150px)
    for (let x = 300; x < 450; x += 16) {
      tiles.push(new GroundTile(x, 450, 16, 16));
    }

    // Platform at x=550, y=350 (width: 150px)
    for (let x = 550; x < 700; x += 16) {
      tiles.push(new GroundTile(x, 350, 16, 16));
    }

    // Elevated platform for Orb #1 at x=650, y=300
    for (let x = 650; x < 750; x += 16) {
      tiles.push(new GroundTile(x, 300, 16, 16));
    }

    // Enemies for Screen 1
    // 1 Circle enemy (Rock, 60 px/s)
    enemiesData.push({ x: 200, y: 500, shape: 'circle', speed: 60 });

    // 1 Square enemy (Paper, 50 px/s)
    enemiesData.push({ x: 400, y: 400, shape: 'square', speed: 50 });

    // 1 Triangle enemy (Scissors, 70 px/s)
    enemiesData.push({ x: 600, y: 300, shape: 'triangle', speed: 70 });
  }

  static buildScreen2(tiles, enemiesData) {
    // Platform jumping section
    // Platform 1 at x=850, y=450
    for (let x = 850; x < 950; x += 16) {
      tiles.push(new GroundTile(x, 450, 16, 16));
    }

    // Platform 2 at x=1050, y=400
    for (let x = 1050; x < 1150; x += 16) {
      tiles.push(new GroundTile(x, 400, 16, 16));
    }

    // Platform 3 at x=1250, y=350
    for (let x = 1250; x < 1350; x += 16) {
      tiles.push(new GroundTile(x, 350, 16, 16));
    }

    // Platform after spikes at x=1450, y=450
    for (let x = 1450; x < 1600; x += 16) {
      tiles.push(new GroundTile(x, 450, 16, 16));
    }

    // Enemies for Screen 2
    // 2 Circle enemies
    enemiesData.push({ x: 900, y: 400, shape: 'circle', speed: 60 });
    enemiesData.push({ x: 1300, y: 300, shape: 'circle', speed: 60 });

    // 1 Square enemy
    enemiesData.push({ x: 1100, y: 350, shape: 'square', speed: 50 });

    // 1 Triangle enemy
    enemiesData.push({ x: 1500, y: 400, shape: 'triangle', speed: 70 });
  }

  static buildScreen3(tiles, enemiesData) {
    // Upper platform for enemies at y=350
    for (let x = 1650; x < 1900; x += 16) {
      tiles.push(new GroundTile(x, 350, 16, 16));
    }

    // Mid platform at x=1950, y=450
    for (let x = 1950; x < 2100; x += 16) {
      tiles.push(new GroundTile(x, 450, 16, 16));
    }

    // Final platform sequence
    // Platform 1 at x=2150, y=400
    for (let x = 2150; x < 2230; x += 16) {
      tiles.push(new GroundTile(x, 400, 16, 16));
    }

    // Platform 2 (with Orb #3) at x=2250, y=300
    for (let x = 2250; x < 2350; x += 16) {
      tiles.push(new GroundTile(x, 300, 16, 16));
    }

    // Enemies for Screen 3
    // Upper platform enemies
    enemiesData.push({ x: 1700, y: 300, shape: 'triangle', speed: 70 });
    enemiesData.push({ x: 1800, y: 300, shape: 'square', speed: 50 });

    // Lower ground enemies
    enemiesData.push({ x: 1700, y: 500, shape: 'circle', speed: 60 });
    enemiesData.push({ x: 2000, y: 400, shape: 'triangle', speed: 70 });
  }
}
```

### Step 7.2: Update initGame() to Use Level Class
```javascript
function initGame() {
  // Create player
  player = new Player(100, 400);

  // Initialize level
  const levelData = Level.init();
  tiles = levelData.tiles;

  // Create enemies from level data
  enemies = [];
  for (const enemyData of levelData.enemiesData) {
    enemies.push(new Enemy(enemyData.x, enemyData.y, enemyData.shape, enemyData.speed));
  }

  // Create particle system
  particleSystem = new ParticleSystem();

  // Create camera
  camera = new Camera(800, 600);

  // Reset text effects
  textEffects = [];

  // Reset game state
  gameState.score = 0;
  gameState.health = 5;
  gameState.orbsCollected = 0;
  gameState.paused = false;
  gameState.gameOver = false;
  gameState.levelComplete = false;
}
```

### Step 7.3: Verify Enemy Count
According to PRD:
- Screen 1: 1 Circle, 1 Square, 1 Triangle = 3 enemies
- Screen 2: 2 Circle, 1 Square, 1 Triangle = 4 enemies
- Screen 3: 1 Circle, 1 Square, 2 Triangle = 4 enemies
- **Total: 4 Circle, 3 Square, 4 Triangle = 11 enemies**

(Note: PRD states 10 enemies but count shows 11. Adjust as needed or follow PRD exactly.)

---

## Testing Checklist

### Level Structure Tests
- [ ] Level is 2400 pixels wide (3 screens at 800px each)
- [ ] Level is 600 pixels tall
- [ ] Ground floor exists across entire level at y=550

### Screen 1 Tests (0-800px)
- [ ] Flat ground at spawn area
- [ ] Platform at (300, 450) for progression
- [ ] Elevated platform at (550, 350)
- [ ] Platform at (650, 300) for Orb #1
- [ ] 1 Circle enemy present
- [ ] 1 Square enemy present
- [ ] 1 Triangle enemy present
- [ ] Player can navigate from start to screen 2

### Screen 2 Tests (800-1600px)
- [ ] Platform jumping section with 3 platforms
- [ ] Platform heights increase: 450, 400, 350
- [ ] Checkpoint position ready (will add in Phase 12)
- [ ] 2 Circle enemies present
- [ ] 1 Square enemy present
- [ ] 1 Triangle enemy present
- [ ] Player can navigate platform sequence

### Screen 3 Tests (1600-2400px)
- [ ] Upper platform at y=350 for enemy gauntlet
- [ ] Final platform sequence exists
- [ ] Platform at (2250, 300) for Orb #3
- [ ] 1 Circle enemy on lower ground
- [ ] 1 Square enemy on upper platform
- [ ] 2 Triangle enemies (1 upper, 1 lower)
- [ ] Player can reach final platforms

### Enemy Placement Tests
- [ ] Total enemy count matches PRD (10 or 11)
- [ ] Enemies are on stable platforms
- [ ] Enemy patrol ranges don't cause falling
- [ ] Mix of all three shapes throughout level

### Traversal Tests
- [ ] Player can walk from start to end
- [ ] All platforms are reachable with jump height
- [ ] No impossible jumps
- [ ] No dead ends that trap player

---

## Code Quality Checklist
- [ ] Level class is well-organized
- [ ] Screen sections are clearly separated
- [ ] Platform coordinates are consistent
- [ ] Enemy placement makes sense strategically

---

## Success Criteria
- ✅ Level class with init() method created
- ✅ Complete 2400×600 level built
- ✅ Screen 1 (Tutorial) fully implemented
- ✅ Screen 2 (Challenge) fully implemented
- ✅ Screen 3 (Final) fully implemented
- ✅ All platforms placed strategically
- ✅ All 10 enemies (or 11) placed correctly
- ✅ Level is fully traversable
- ✅ Difficulty curve progresses across screens

---

## Common Issues & Solutions

### Issue: Platforms not rendering
**Solution**: Verify tiles array is populated correctly and rendered in render() function

### Issue: Player falls through platforms
**Solution**: Ensure collision detection loop includes all tiles

### Issue: Enemies fall off platforms
**Solution**: Either adjust patrol ranges or accept this behavior per PRD

### Issue: Can't reach certain platforms
**Solution**: Verify jump height (-420) can reach platform gaps. Adjust platform spacing if needed

### Issue: Level too difficult
**Solution**: This is expected for later screens. Ensure Screen 1 is easy for tutorial

---

## Next Phase
Once Phase 7 is complete and tested, proceed to:
**[Phase 8: Collectibles & Scoring](./phase-08-collectibles-scoring.md)**
