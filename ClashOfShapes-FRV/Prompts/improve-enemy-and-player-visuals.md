# Improve Enemy and Player Visuals and Behavior

## Objective
Enhance the visual design of enemies and player by adding anthropomorphic features (eyes, limbs) and implement unique movement behaviors for each enemy shape type to create more engaging and distinct gameplay.

## Enemy Visual Enhancements

### General Requirements for All Enemies
Each enemy should have distinct anthropomorphic features to make them feel more alive and character-like:

1. **Eyes**
   - Position: Upper portion of the shape
   - Style: Simple cartoon eyes (circles with pupils)
   - Animation: Eyes should follow the player or blink occasionally
   - Size: Proportional to enemy size (5-10% of enemy width)
   - Optional: Different eye expressions based on state (idle, chasing, damaged)

2. **Arms**
   - Position: Sides of the shape
   - Style: Simple stick-like arms or geometric appendages
   - Animation: Arms should swing or move as the enemy moves
   - Count: 2 arms (one on each side)
   - Optional: Arms can raise when attacking or detecting player

3. **Legs/Feet**
   - Position: Bottom of the shape
   - Style: Simple stick legs with small circular/rectangular feet
   - Animation: Walking animation when moving, idle stance when stationary
   - Count: 2 legs with feet
   - Optional: Running animation for faster movement states

### Color Coding by Enemy Type

Each enemy shape should have a unique, distinct color to make them easily identifiable:

- **Square Enemy**: `#FF6B6B` (Red) or `#E74C3C` (Crimson)
- **Circle Enemy**: `#4ECDC4` (Teal) or `#3498DB` (Blue)
- **Triangle Enemy**: `#FFE66D` (Yellow) or `#F39C12` (Orange)

**Color Guidelines**:
- Use vibrant, saturated colors for good visibility
- Ensure sufficient contrast with background
- Consider adding a darker outline or border (2-3px) for better definition
- Optional: Slight color variation or gradient for visual depth

## Enemy Movement Behaviors

### 1. Square Enemy (Flying Enemy)

**Movement Characteristics**:
- **Axes**: Can move on both X and Y axes (full 2D movement)
- **Speed**: Medium speed (e.g., 100-120 pixels/second)
- **Behavior**: Flying/hovering movement pattern
- **Pattern Suggestions**:
  - Sine wave flight path (smooth up and down)
  - Chase player directly through the air
  - Patrol patterns with vertical and horizontal components
  - Can navigate over obstacles and platforms

**Technical Implementation**:
```javascript
class SquareEnemy extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.color = '#FF6B6B';
        this.canFly = true;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 100;
    }

    update(deltaTime, player) {
        // Flying AI: can move freely in 2D space
        // Example: Chase player directly
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            this.velocityX = (dx / distance) * this.speed;
            this.velocityY = (dy / distance) * this.speed;
        }

        this.x += this.velocityX * deltaTime;
        this.y += this.velocityY * deltaTime;
    }
}
```

### 2. Circle Enemy (Fast Ground Enemy)

**Movement Characteristics**:
- **Axes**: Can only move on X axis (horizontal ground movement)
- **Speed**: Fast speed (e.g., 150-180 pixels/second)
- **Behavior**: Quick ground runner, fastest of all enemies
- **Pattern Suggestions**:
  - Rapid back-and-forth patrol
  - Quick charge toward player when detected
  - Bounce off walls/edges at high speed
  - Cannot jump or fly (ground-bound)

**Technical Implementation**:
```javascript
class CircleEnemy extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.color = '#4ECDC4';
        this.canFly = false;
        this.velocityX = 150; // Faster than other enemies
        this.velocityY = 0; // Cannot move vertically on its own
        this.speed = 150;
        this.direction = 1; // 1 for right, -1 for left
    }

    update(deltaTime) {
        // Horizontal-only movement
        this.velocityX = this.speed * this.direction;
        this.x += this.velocityX * deltaTime;

        // Apply gravity (for ground contact)
        this.velocityY += this.gravity * deltaTime;
        this.y += this.velocityY * deltaTime;

        // Reverse direction on collision or edge
        if (this.hitWallOrEdge()) {
            this.direction *= -1;
        }
    }
}
```

### 3. Triangle Enemy (Jumping Enemy)

**Movement Characteristics**:
- **Axes**: Primarily X axis movement with random Y axis mini-jumps
- **Speed**: Normal/medium speed (e.g., 80-100 pixels/second)
- **Behavior**: Unpredictable hopping movement
- **Pattern Suggestions**:
  - Random mini-jumps at intervals (every 1-3 seconds)
  - Jump height: 30-60 pixels
  - Maintains current horizontal speed during jumps
  - Creates erratic, harder-to-predict movement pattern

**Technical Implementation**:
```javascript
class TriangleEnemy extends Enemy {
    constructor(x, y) {
        super(x, y);
        this.color = '#FFE66D';
        this.canFly = false;
        this.velocityX = 80;
        this.velocityY = 0;
        this.speed = 80;
        this.jumpTimer = 0;
        this.jumpInterval = this.getRandomJumpInterval();
        this.isGrounded = false;
    }

    getRandomJumpInterval() {
        // Random interval between 1-3 seconds
        return 1000 + Math.random() * 2000;
    }

    performMiniJump() {
        if (this.isGrounded) {
            // Random jump force between -200 and -300
            this.velocityY = -200 - Math.random() * 100;
            this.isGrounded = false;
            this.jumpTimer = 0;
            this.jumpInterval = this.getRandomJumpInterval();
        }
    }

    update(deltaTime) {
        // Horizontal movement continues as normal
        this.x += this.velocityX * deltaTime;

        // Gravity
        this.velocityY += this.gravity * deltaTime;
        this.y += this.velocityY * deltaTime;

        // Check if grounded
        if (this.checkGroundCollision()) {
            this.isGrounded = true;
            this.velocityY = 0;
        }

        // Random mini-jump timer
        this.jumpTimer += deltaTime * 1000;
        if (this.jumpTimer >= this.jumpInterval) {
            this.performMiniJump();
        }
    }
}
```

## Player Visual Enhancements

### Face Features

**Requirements**:
- **Eyes**: Two expressive eyes that convey emotion
  - Position: Upper-middle portion of the player shape
  - Style: Simple circles or ovals with pupils
  - Animation: Blink animation, look direction based on movement
  - Expressions: Normal (idle), determined (running), surprised (damaged)

- **Mouth** (Optional):
  - Position: Below eyes
  - Style: Simple line or curve
  - Animation: Smile (collecting items), frown (taking damage)

**Implementation Suggestion**:
```javascript
class PlayerFace {
    constructor(player) {
        this.player = player;
        this.eyeOffsetY = -player.height * 0.2;
        this.leftEyeOffsetX = -player.width * 0.2;
        this.rightEyeOffsetX = player.width * 0.2;
        this.blinkTimer = 0;
        this.isBlinking = false;
    }

    draw(ctx) {
        const x = this.player.x;
        const y = this.player.y + this.eyeOffsetY;

        // Draw eyes
        if (!this.isBlinking) {
            this.drawEye(ctx, x + this.leftEyeOffsetX, y);
            this.drawEye(ctx, x + this.rightEyeOffsetX, y);
        } else {
            // Draw closed eyes (horizontal lines)
            this.drawClosedEye(ctx, x + this.leftEyeOffsetX, y);
            this.drawClosedEye(ctx, x + this.rightEyeOffsetX, y);
        }
    }

    drawEye(ctx, x, y) {
        // White of eye
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();

        // Pupil
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}
```

### Arms

**Requirements**:
- **Position**: Sides of the player shape
- **Count**: 2 arms (left and right)
- **Style**: Simple geometric arms (rectangles or lines)
- **Animation States**:
  - Idle: Arms down or slight sway
  - Running: Arms swing back and forth
  - Jumping: Arms raised up
  - Attacking: Arm extends forward

**Size Guidelines**:
- Length: 40-60% of player body height
- Width: 10-15% of player body width

### Legs and Feet

**Requirements**:
- **Position**: Bottom of the player shape
- **Count**: 2 legs with 2 feet
- **Style**: Simple stick legs with small feet (circles or rectangles)
- **Animation States**:
  - Idle: Static stance, slight bob
  - Walking/Running: Alternating leg movement
  - Jumping: Legs bent or tucked
  - Landing: Slightly bent on impact

**Size Guidelines**:
- Leg length: 30-50% of player body height
- Foot size: 20-30% of player body width

**Implementation Example**:
```javascript
class PlayerLimbs {
    constructor(player) {
        this.player = player;
        this.armAngle = 0;
        this.legPhase = 0;
        this.animationSpeed = 10; // Adjust based on player speed
    }

    update(deltaTime) {
        if (this.player.isMoving) {
            this.armAngle += deltaTime * this.animationSpeed;
            this.legPhase += deltaTime * this.animationSpeed;
        } else {
            // Return to idle position
            this.armAngle *= 0.95;
            this.legPhase *= 0.95;
        }
    }

    draw(ctx) {
        this.drawArms(ctx);
        this.drawLegs(ctx);
    }

    drawArms(ctx) {
        const swingAmount = Math.sin(this.armAngle) * 15; // Degrees

        // Left arm
        this.drawArm(ctx, -1, -swingAmount);

        // Right arm
        this.drawArm(ctx, 1, swingAmount);
    }

    drawLegs(ctx) {
        const walkCycle = Math.sin(this.legPhase);

        // Left leg
        this.drawLeg(ctx, -1, walkCycle);

        // Right leg
        this.drawLeg(ctx, 1, -walkCycle);
    }

    drawArm(ctx, side, angle) {
        // Implement arm drawing with rotation
    }

    drawLeg(ctx, side, phase) {
        // Implement leg drawing with walking animation
    }
}
```

## Integration Guidelines

### File Structure
```
src/
  entities/
    enemies/
      Enemy.js (base class)
      SquareEnemy.js (flying, red)
      CircleEnemy.js (fast ground, teal)
      TriangleEnemy.js (jumping, yellow)
    player/
      Player.js (main class)
      PlayerFace.js (facial features)
      PlayerLimbs.js (arms and legs)
      PlayerAnimations.js (animation controller)
  utils/
    AnimationHelper.js (reusable animation functions)
```

### Drawing Order
To ensure proper visual layering:
1. Body shape (main shape)
2. Arms (behind body)
3. Legs (bottom of body)
4. Face (on top of body)
5. Eyes (on top of face)
6. Accessories/effects (on top)

### Animation Timing
- **Blink animation**: Every 3-5 seconds, duration 100-150ms
- **Walking animation**: Cycle completes every 0.5-1 second
- **Arm swing**: Matches walking cycle
- **Jump animation**: Instant pose change on jump start/land

## Visual Style Considerations

### Consistency
- Maintain consistent line weights (2-3px outlines)
- Use same eye style across all characters
- Keep limb proportions similar across all entities

### Readability
- Ensure features are visible at game scale
- Test visibility on different backgrounds
- Features should read clearly at 32x32, 48x48, and 64x64 sizes

### Performance
- Use simple shapes for limbs (rectangles, circles)
- Minimize complex path calculations
- Consider sprite-based animation for more detailed features
- Batch draw calls where possible

## Testing Checklist

- [ ] Each enemy type has unique color
- [ ] Square enemy can move freely in 2D space (fly)
- [ ] Circle enemy is noticeably faster and ground-bound
- [ ] Triangle enemy performs random mini-jumps at intervals
- [ ] All enemies have visible eyes
- [ ] All enemies have visible arms
- [ ] All enemies have visible legs/feet
- [ ] Player has expressive face with eyes
- [ ] Player has animated arms
- [ ] Player has animated legs and feet
- [ ] Animations run smoothly at 60 FPS
- [ ] Features are visible at various zoom levels
- [ ] Visual style is consistent across all characters
- [ ] No visual glitches or clipping issues
- [ ] Enemy movement patterns feel distinct and fun

## Advanced Features (Optional)

### Particle Effects
- Dust/smoke particles when enemies land from jumps
- Speed lines for fast-moving circle enemies
- Wing/jet particles for flying square enemies

### Dynamic Expressions
- Eyes widen when player is detected
- Angry expression when chasing player
- Dizzy/stunned expression when hit
- Defeated expression when destroyed

### Shadow Effects
- Simple circular shadows under all entities
- Shadow scales with jump height
- Shadow opacity based on height from ground

### Squash and Stretch
- Slight squash on landing (vertical compression)
- Stretch during fast movement or jumps
- Adds more life and cartoon appeal to movements

## Next Steps

1. Create base Enemy class with visual rendering methods
2. Implement SquareEnemy with flying behavior and red color
3. Implement CircleEnemy with fast horizontal movement and teal color
4. Implement TriangleEnemy with random jump behavior and yellow color
5. Add eyes, arms, and legs to all enemy classes
6. Create PlayerFace class with expressive features
7. Create PlayerLimbs class with animated arms and legs
8. Integrate limb animations with player movement states
9. Test all enemy behaviors and visual features
10. Refine animations and timing based on gameplay feel
11. Optimize rendering performance
12. Add advanced features as desired
