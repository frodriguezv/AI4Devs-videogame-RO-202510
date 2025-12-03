# Add/Enhance Jump Mechanics - Shape Shifter Game

## Objective
Implement or enhance jump mechanics for the Shape Shifter platformer game, including basic jumping, double jump, wall jump, variable jump height, and coyote time.

## Current State Analysis

### Existing Jump Implementation
The game currently has basic jump mechanics implemented in `src/js/entities/Player.js`:

```javascript
// Jump (only when on ground)
if ((input.isKeyPressed('arrowup') || input.isKeyPressed('w') ||
     input.isKeyPressed('z') || input.isKeyPressed(' ')) && this.onGround) {
    this.velocityY = CONFIG.PLAYER.JUMP_IMPULSE; // Jump impulse (-420)
}
```

**Current Features:**
- Single jump when on ground
- Jump impulse: -420 pixels/second
- Gravity: 900 px/s²
- Multiple input options (Arrow Up, W, Z, Space)
- Key reset to prevent holding for continuous jumps

## Enhancement Options

Choose which jump mechanics to implement based on game design needs:

---

## Option 1: Variable Jump Height (RECOMMENDED)

### Description
Allow players to control jump height by holding the jump button. Short taps = small jumps, hold = full jump.

### Implementation Steps

1. **Add config values** (`src/js/config.js`):
```javascript
PLAYER: {
    // ... existing ...
    JUMP_IMPULSE: -420,
    MIN_JUMP_HEIGHT_MULTIPLIER: 0.4, // Minimum jump is 40% of full jump
    JUMP_HOLD_DURATION: 0.2, // How long holding affects jump (200ms)
}
```

2. **Update Player class** (`src/js/entities/Player.js`):
```javascript
constructor(x, y, particleSystem) {
    // ... existing ...
    this.jumping = false;
    this.jumpHoldTime = 0;
}

update(deltaTime, input) {
    // ... existing code ...

    // Variable jump height
    const jumpKeys = ['arrowup', 'w', 'z', ' '];
    const jumpPressed = jumpKeys.some(key => input.isKeyPressed(key));

    // Start jump
    if (jumpPressed && this.onGround && !this.jumping) {
        this.velocityY = CONFIG.PLAYER.JUMP_IMPULSE;
        this.jumping = true;
        this.jumpHoldTime = 0;
        console.log('Jump started');
    }

    // Continue jump while holding
    if (this.jumping && jumpPressed && this.jumpHoldTime < CONFIG.PLAYER.JUMP_HOLD_DURATION) {
        this.jumpHoldTime += deltaTime;
        // Apply upward force while holding
        this.velocityY += CONFIG.PLAYER.JUMP_IMPULSE * 0.15 * deltaTime;
    }

    // Release jump early
    if (this.jumping && !jumpPressed) {
        // Apply minimum jump height
        if (this.velocityY < 0) {
            this.velocityY *= CONFIG.PLAYER.MIN_JUMP_HEIGHT_MULTIPLIER;
        }
        this.jumping = false;
    }

    // Stop jump when landing
    if (this.onGround && this.jumping) {
        this.jumping = false;
        this.jumpHoldTime = 0;
    }

    // ... rest of existing code ...
}
```

### Testing
- Tap jump button quickly = short hop
- Hold jump button = full height jump
- Release early = jump cuts short
- Jump height should feel responsive and controllable

---

## Option 2: Double Jump

### Description
Allow player to jump once more while in the air.

### Implementation Steps

1. **Add config value** (`src/js/config.js`):
```javascript
PLAYER: {
    // ... existing ...
    MAX_JUMPS: 2, // 1 = ground only, 2 = ground + double jump
}
```

2. **Update Player class** (`src/js/entities/Player.js`):
```javascript
constructor(x, y, particleSystem) {
    // ... existing ...
    this.jumpsRemaining = CONFIG.PLAYER.MAX_JUMPS;
}

update(deltaTime, input) {
    // ... existing code ...

    // Jump logic with double jump
    const jumpKeys = ['arrowup', 'w', 'z', ' '];
    const jumpPressed = jumpKeys.some(key => input.isKeyPressed(key));

    if (jumpPressed && this.jumpsRemaining > 0) {
        this.velocityY = CONFIG.PLAYER.JUMP_IMPULSE;
        this.jumpsRemaining--;

        // Visual feedback for double jump
        if (this.jumpsRemaining === 0 && !this.onGround) {
            this.particleSystem.emitRadial(
                this.x + this.width / 2,
                this.y + this.height / 2,
                8,
                '#4A90E2',
                120,
                0.3
            );
            console.log('Double jump!');
        }

        // Reset keys
        jumpKeys.forEach(key => input.resetKey(key));
    }

    // Reset jumps when landing
    if (this.onGround) {
        this.jumpsRemaining = CONFIG.PLAYER.MAX_JUMPS;
    }

    // ... rest of existing code ...
}
```

### Testing
- Jump once on ground
- Jump again in mid-air
- Both jumps should have same height
- Blue particles on double jump
- Jumps reset when landing

---

## Option 3: Coyote Time

### Description
Allow player to jump for a brief moment after walking off a ledge (feels more forgiving).

### Implementation Steps

1. **Add config value** (`src/js/config.js`):
```javascript
PLAYER: {
    // ... existing ...
    COYOTE_TIME: 0.1, // 100ms grace period after leaving ground
}
```

2. **Update Player class** (`src/js/entities/Player.js`):
```javascript
constructor(x, y, particleSystem) {
    // ... existing ...
    this.coyoteTimer = 0;
    this.wasOnGround = false;
}

update(deltaTime, input) {
    // Track coyote time
    if (this.onGround) {
        this.coyoteTimer = CONFIG.PLAYER.COYOTE_TIME;
        this.wasOnGround = true;
    } else if (this.wasOnGround && this.coyoteTimer > 0) {
        this.coyoteTimer -= deltaTime;
        if (this.coyoteTimer <= 0) {
            this.wasOnGround = false;
        }
    }

    // Jump with coyote time
    const jumpKeys = ['arrowup', 'w', 'z', ' '];
    const jumpPressed = jumpKeys.some(key => input.isKeyPressed(key));
    const canJump = this.onGround || (this.coyoteTimer > 0 && this.wasOnGround);

    if (jumpPressed && canJump) {
        this.velocityY = CONFIG.PLAYER.JUMP_IMPULSE;
        this.coyoteTimer = 0; // Use up coyote time
        this.wasOnGround = false;
        jumpKeys.forEach(key => input.resetKey(key));
        console.log('Jump (coyote:', this.coyoteTimer > 0, ')');
    }

    // ... rest of existing code ...
}
```

### Testing
- Walk off platform edge
- Press jump within 100ms after leaving edge
- Should still jump even though not touching ground
- More forgiving platforming feel

---

## Option 4: Jump Buffer

### Description
If player presses jump slightly before landing, execute jump immediately upon landing.

### Implementation Steps

1. **Add config value** (`src/js/config.js`):
```javascript
PLAYER: {
    // ... existing ...
    JUMP_BUFFER_TIME: 0.1, // 100ms buffer window
}
```

2. **Update Player class** (`src/js/entities/Player.js`):
```javascript
constructor(x, y, particleSystem) {
    // ... existing ...
    this.jumpBufferTimer = 0;
}

update(deltaTime, input) {
    // Update jump buffer
    if (this.jumpBufferTimer > 0) {
        this.jumpBufferTimer -= deltaTime;
    }

    // Detect jump input
    const jumpKeys = ['arrowup', 'w', 'z', ' '];
    const jumpPressed = jumpKeys.some(key => input.isKeyPressed(key));

    if (jumpPressed) {
        this.jumpBufferTimer = CONFIG.PLAYER.JUMP_BUFFER_TIME;
        jumpKeys.forEach(key => input.resetKey(key));
    }

    // Execute buffered jump on landing
    if (this.onGround && this.jumpBufferTimer > 0) {
        this.velocityY = CONFIG.PLAYER.JUMP_IMPULSE;
        this.jumpBufferTimer = 0;
        console.log('Buffered jump executed');
    }

    // ... rest of existing code ...
}
```

### Testing
- Press jump button just before landing
- Should jump immediately upon touching ground
- Makes platforming feel more responsive

---

## Option 5: Wall Jump (ADVANCED)

### Description
Allow player to jump off walls by pressing opposite direction + jump.

### Implementation Steps

1. **Add config values** (`src/js/config.js`):
```javascript
PLAYER: {
    // ... existing ...
    WALL_JUMP_IMPULSE_Y: -380,
    WALL_JUMP_IMPULSE_X: 200,
    WALL_SLIDE_SPEED: 100, // Max fall speed when sliding on wall
}
```

2. **Update Player class** (`src/js/entities/Player.js`):
```javascript
constructor(x, y, particleSystem) {
    // ... existing ...
    this.onWall = false;
    this.wallDirection = 0; // -1 = left wall, 1 = right wall
}

update(deltaTime, input) {
    // ... existing collision code detects walls and sets this.onWall and this.wallDirection ...

    // Wall slide
    if (this.onWall && !this.onGround && this.velocityY > 0) {
        this.velocityY = Math.min(this.velocityY, CONFIG.PLAYER.WALL_SLIDE_SPEED);
    }

    // Wall jump
    const jumpKeys = ['arrowup', 'w', 'z', ' '];
    const jumpPressed = jumpKeys.some(key => input.isKeyPressed(key));

    if (jumpPressed && this.onWall && !this.onGround) {
        // Jump away from wall
        this.velocityY = CONFIG.PLAYER.WALL_JUMP_IMPULSE_Y;
        this.velocityX = -this.wallDirection * CONFIG.PLAYER.WALL_JUMP_IMPULSE_X;

        // Particles
        this.particleSystem.emitRadial(
            this.x + this.width / 2,
            this.y + this.height / 2,
            6,
            '#FFFFFF',
            100,
            0.3
        );

        jumpKeys.forEach(key => input.resetKey(key));
        console.log('Wall jump!');
    }

    // ... rest of existing code ...
}
```

3. **Update collision detection** (`src/js/systems/CollisionSystem.js`):
```javascript
static resolveCollision(entity, obstacle) {
    // ... existing code ...

    // Detect wall collision for player
    if (entity.constructor.name === 'Player') {
        if (Math.abs(overlapX) > Math.abs(overlapY) && Math.abs(overlapX) < 5) {
            entity.onWall = true;
            entity.wallDirection = overlapX > 0 ? -1 : 1;
        }
    }
}
```

### Testing
- Touch wall while in air
- Should slide down slowly
- Press jump = launch away from wall
- White particles on wall jump
- Can chain wall jumps

---

## Combined Implementation (ALL FEATURES)

For the best player experience, combine:
1. **Variable Jump Height** - Essential for platformer feel
2. **Coyote Time** - Makes movement forgiving
3. **Jump Buffer** - Makes input feel responsive
4. **Double Jump** (Optional) - Adds mobility
5. **Wall Jump** (Optional) - Advanced mechanic

### Priority Order
1. Variable Jump Height (HIGH - improves feel)
2. Coyote Time (HIGH - reduces frustration)
3. Jump Buffer (MEDIUM - subtle improvement)
4. Double Jump (LOW - design choice)
5. Wall Jump (LOW - complex, changes game design)

---

## Testing Checklist

### Basic Jump Tests
- [ ] Jump activates with all input keys (Up, W, Z, Space)
- [ ] Jump only works when on ground (or coyote time)
- [ ] Jump height matches configured impulse
- [ ] Gravity applies correctly
- [ ] Can't jump while already in air (unless double jump)

### Variable Jump Height Tests
- [ ] Short tap = short hop (40% height)
- [ ] Full hold = full jump height
- [ ] Release early cuts jump short
- [ ] Feels responsive and controllable

### Double Jump Tests
- [ ] Can jump again in mid-air
- [ ] Double jump has same height as first jump
- [ ] Particles appear on double jump
- [ ] Jumps reset when landing

### Coyote Time Tests
- [ ] Can jump within 100ms after leaving ledge
- [ ] Doesn't allow infinite air jumps
- [ ] Feels natural and forgiving

### Jump Buffer Tests
- [ ] Pressing jump before landing executes on landing
- [ ] Buffer window is 100ms
- [ ] Doesn't conflict with other jump mechanics

### Wall Jump Tests (if implemented)
- [ ] Slides down wall at reduced speed
- [ ] Wall jump launches away from wall
- [ ] Can chain wall jumps
- [ ] Particles appear on wall jump

---

## Integration Instructions

1. **Backup current code** before making changes
2. **Choose which features** to implement based on game design
3. **Update config.js** with new constants
4. **Modify Player.js** with chosen mechanics
5. **Test thoroughly** with testing checklist
6. **Adjust values** in config.js for game feel
7. **Document changes** in Process.md

---

## Configuration Tuning

After implementation, adjust these values for best feel:

```javascript
PLAYER: {
    JUMP_IMPULSE: -420,              // Higher = jump higher (try -450 to -380)
    MIN_JUMP_HEIGHT_MULTIPLIER: 0.4, // Lower = more variable (try 0.3-0.5)
    JUMP_HOLD_DURATION: 0.2,         // Longer = more control (try 0.15-0.25)
    COYOTE_TIME: 0.1,                // Longer = more forgiving (try 0.08-0.15)
    JUMP_BUFFER_TIME: 0.1,           // Longer = more forgiving (try 0.08-0.15)
    MAX_JUMPS: 2,                    // 1=no double jump, 2=double jump, 3=triple jump
}
```

---

## References

- **Current Implementation**: `src/js/entities/Player.js` (lines 84-92)
- **Physics Config**: `src/js/config.js` (PLAYER section)
- **Collision System**: `src/js/systems/CollisionSystem.js`

---

## Expected Outcome

After implementing the chosen jump mechanics:
- Player movement feels responsive and satisfying
- Platforming is forgiving with coyote time and jump buffer
- Jump height is controllable with variable jump
- Advanced mobility with double jump/wall jump (if implemented)
- Game feel is significantly improved

**Recommended Start**: Implement Variable Jump Height first, as it has the biggest impact on game feel with minimal complexity.
