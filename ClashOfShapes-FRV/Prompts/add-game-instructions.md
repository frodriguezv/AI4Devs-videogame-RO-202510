# Prompt: Add Game Instructions Screen

## Objective
Create an instructions/tutorial screen that explains the game mechanics, controls, and objectives to players before they start playing.

## Requirements

### 1. Instructions Screen UI
Create a new screen that displays before the game starts or can be accessed via a menu button:

**Layout:**
- Title: "How to Play - Clash of Shapes"
- Dark background with good contrast for readability
- Organized sections with clear headers
- Visual icons or sprites to demonstrate controls
- "Press SPACE to Start" or "Press ESC to Close" at the bottom

### 2. Controls Section
Display all game controls with clear labels:

**Movement:**
- Arrow Keys or WASD - Move left/right
- Space/W/Up Arrow/Z - Jump (hold for higher jump)
- X - Hold to Run (faster movement)

**Shape Morphing:**
- Q - Morph to previous shape (Square → Triangle → Circle → Square...)
- E - Morph to next shape (Square → Circle → Triangle → Square...)

### 3. Game Mechanics Section

**Shape Combat System (Rock-Paper-Scissors):**
- 🔵 **Circle (Rock)** beats 🔺 **Triangle (Scissors)**
- 🔺 **Triangle (Scissors)** beats 🔷 **Square (Paper)**
- 🔷 **Square (Paper)** beats 🔵 **Circle (Rock)**
- Match your shape to the enemy's weakness to defeat them!
- Losing a clash costs 1 health point

**Jump Mechanics:**
- Tap jump for a small hop
- Hold jump for a higher jump
- Coyote time: Brief grace period after leaving a platform
- Jump buffering: Press jump slightly early before landing

**Health System:**
- Start with 5 hearts ❤️
- Lose hearts when hit by enemies or hazards
- Game over at 0 hearts (respawn at last checkpoint)

### 4. Objectives Section

**Main Goal:**
- Collect all 3 Orbs 🟣 scattered across the level
- Reach the Goal flag 🏁 at the end

**Collectibles:**
- 💛 **Coins:** Increase your score (10 points each)
- 🟣 **Orbs:** Required to unlock the goal (collect all 3)

**Hazards:**
- 🔻 **Spikes:** Avoid these - they damage you!
- **Pits:** Falling off the map respawns you at checkpoint

**Checkpoints:**
- 🔵 **Checkpoint:** Saves your progress
- Respawn here if you lose all health

### 5. Enemy Types Section

Display the 3 enemy types with their behaviors:

**🔵 Circle Enemy (Cyan/Teal):**
- Fast ground enemy
- Patrols horizontally at high speed
- Weak to: Square (Paper)

**🔷 Square Enemy (Red):**
- Flying enemy
- Can chase you through the air
- Detects and follows player
- Weak to: Circle (Rock)

**🔺 Triangle Enemy (Yellow):**
- Jumping enemy
- Performs random mini-jumps while patrolling
- Unpredictable movement
- Weak to: Triangle (Scissors)

### 6. Tips & Strategy Section

**Pro Tips:**
- 💡 Study enemy patterns before engaging
- 💡 Use shape morphing strategically - change to counter each enemy
- 💡 Hold X to run and build momentum for longer jumps
- 💡 Explore thoroughly to find all coins and orbs
- 💡 Flying enemies can reach high places - be careful!
- 💡 Triangle enemies jump randomly - time your approach carefully

### 7. Scoring Section

**Points:**
- Defeating enemy: +100 points
- Collecting coin: +10 points
- Reaching checkpoint: Bonus
- Completing level: +500 points
- No deaths bonus: +200 points

### 8. Implementation Details

**Technical Requirements:**
- Create new `InstructionsScreen` class or modal overlay
- Add keyboard input to dismiss/navigate (ESC, SPACE, ENTER)
- Include "Show at startup" toggle option (save to localStorage)
- Add "Instructions" button to main menu and pause menu
- Use consistent styling with game's visual theme
- Optional: Add simple animations or sprite demonstrations

**Display Options:**
1. **Startup Screen:** Show before game starts (first time only, or with toggle)
2. **Pause Menu:** Access via "How to Play" button when paused
3. **Main Menu:** Accessible from title screen

**Navigation:**
- Single page with scroll if needed
- OR multiple pages with "Next/Previous" buttons
- OR tabs for different sections (Controls, Combat, Objectives, Enemies)

### 9. Visual Design Guidelines

**Style:**
- Match game's aesthetic (geometric shapes, clean lines)
- Use game's color palette
- Dark background (#1a1a2e) with white/cyan text
- Colored shape icons matching enemy colors
- Simple, readable font
- Adequate spacing between sections

**Icons/Sprites:**
- Show actual game sprites for enemies
- Keyboard key graphics for controls
- Heart icons for health
- Coin/Orb sprites for collectibles

### 10. Accessibility

- Clear, readable font size (minimum 14-16px)
- High contrast text on background
- Support both keyboard and click navigation
- Option to re-read instructions anytime
- Brief and scannable - not overwhelming with text

## Success Criteria

✅ Instructions screen is clear and easy to understand
✅ All controls are documented with visual aids
✅ Combat system (rock-paper-scissors) is explained clearly
✅ Enemy types and behaviors are described
✅ Players understand the objectives and how to win
✅ Screen can be accessed both at startup and during gameplay
✅ Visual design matches game aesthetic
✅ Easy to dismiss/navigate

## Notes

- Keep instructions concise - players want to start playing quickly
- Use visual examples wherever possible (show, don't just tell)
- Consider a brief in-game tutorial for first-time players
- Add optional "Skip Tutorial" button for experienced players
- Test with someone unfamiliar with the game to ensure clarity

## Example Layout Structure

```
┌─────────────────────────────────────────┐
│         HOW TO PLAY - CLASH OF SHAPES   │
├─────────────────────────────────────────┤
│                                         │
│  [CONTROLS]                             │
│  ← → ↑ ↓ / WASD - Move & Jump          │
│  Q / E - Morph Shape                    │
│  X - Run                                │
│                                         │
│  [COMBAT - Rock Paper Scissors]         │
│  🔵 Circle → 🔺 Triangle                │
│  🔺 Triangle → 🔷 Square                │
│  🔷 Square → 🔵 Circle                  │
│                                         │
│  [OBJECTIVE]                            │
│  • Collect 3 Orbs 🟣                    │
│  • Reach the Goal 🏁                    │
│                                         │
│  [ENEMIES]                              │
│  🔵 Fast Runner | 🔷 Flying | 🔺 Jumper │
│                                         │
│     Press SPACE to Start Playing        │
└─────────────────────────────────────────┘
```
