# Clash of Shapes

A 2D platformer game with Rock-Paper-Scissors combat mechanics where you play as a shape-shifting character battling various enemy shapes.

## 🎮 Game Description

**Clash of Shapes** is a fun and dynamic platformer where the player can morph between three different shapes (Circle, Square, and Triangle), each with unique strengths and weaknesses based on Rock-Paper-Scissors mechanics. Navigate through challenging levels, defeat enemies by matching the right shape, collect orbs, and reach the goal!

## 🚀 How to Run the Project

### Option 1: Using Python (Recommended)

1. Navigate to the project directory:
```bash
cd ClashOfShapes-FRV
```

2. Start a local HTTP server using Python:
```bash
python3 -m http.server 8000
```

3. Open your browser and navigate to:
```
http://localhost:8000/src/
```

### Option 2: Using Node.js (http-server)

1. Install http-server globally (if not already installed):
```bash
npm install -g http-server
```

2. Navigate to the project directory and start the server:
```bash
cd ClashOfShapes-FRV
http-server -p 8000
```

3. Open your browser and navigate to:
```
http://localhost:8000/src/
```

### Option 3: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `src/index.html`
3. Select "Open with Live Server"

## 🎯 How to Play

### Controls

- **Move:** Arrow Keys or WASD
- **Jump:** Space / W / ↑ / Z (hold for higher jump)
- **Run:** Hold X (faster movement)
- **Morph Shape:** Q (previous) / E (next)
- **Instructions:** Press I to view help screen
- **Pause:** ESC

### Combat System (Rock-Paper-Scissors)

- 🔵 **Circle** (Rock) beats 🔺 **Triangle** (Scissors)
- 🔺 **Triangle** (Scissors) beats 🔷 **Square** (Paper)
- 🔷 **Square** (Paper) beats 🔵 **Circle** (Rock)

Match your shape to the enemy's weakness to defeat them!

### Objectives

- Collect all 3 **Orbs** 🟣 scattered across the level
- Reach the **Goal** 🏁 at the end
- Collect **Coins** 💛 for extra points
- Avoid **Spikes** 🔻 and enemies

### Enemy Types

1. **🔵 Circle Enemy (Cyan)**
   - Fast ground patrol
   - Moves horizontally at high speed
   - Weak to: Square

2. **🔷 Square Enemy (Red)**
   - Flying enemy
   - Chases the player through the air
   - Weak to: Circle

3. **🔺 Triangle Enemy (Yellow)**
   - Jumping enemy
   - Performs random mini-jumps while patrolling
   - Weak to: Triangle

## 🎨 Features

- **Shape Morphing Mechanic:** Transform between 3 shapes on the fly
- **Rock-Paper-Scissors Combat:** Strategic shape-based combat system
- **Enhanced Jump Mechanics:**
  - Variable jump height (tap vs hold)
  - Coyote time (grace period after leaving platform)
  - Jump buffering (press jump slightly early)
- **Visual Polish:**
  - Particle effects
  - Text effects for feedback
  - Enemy animations (walking, jumping, flying)
  - Squash and stretch effects
  - Blinking and facial expressions
- **Audio System:** Sound effects for actions and events
- **Multiple Enemy Types:** Each with unique behaviors and AI
- **Checkpoint System:** Save progress at checkpoints
- **Scoring System:** Points for coins, defeating enemies, and completing levels
- **Random Enemy Positions:** Enemies spawn in different locations each playthrough

## 📁 Project Structure

```
ClashOfShapes-FRV/
├── src/
│   ├── index.html           # Main HTML file
│   ├── js/
│   │   ├── main.js          # Entry point
│   │   ├── config.js        # Game configuration
│   │   ├── core/            # Core game systems
│   │   │   ├── Game.js      # Main game loop
│   │   │   ├── InputManager.js
│   │   │   └── Camera.js
│   │   ├── entities/        # Game entities
│   │   │   ├── Player.js
│   │   │   ├── PlayerFace.js
│   │   │   ├── PlayerLimbs.js
│   │   │   ├── Enemy.js
│   │   │   ├── CircleEnemy.js
│   │   │   ├── SquareEnemy.js
│   │   │   └── TriangleEnemy.js
│   │   ├── objects/         # Game objects
│   │   │   ├── Coin.js
│   │   │   ├── Orb.js
│   │   │   ├── Spike.js
│   │   │   ├── Checkpoint.js
│   │   │   └── Goal.js
│   │   ├── systems/         # Game systems
│   │   │   ├── CollisionSystem.js
│   │   │   ├── ParticleSystem.js
│   │   │   ├── TextEffect.js
│   │   │   └── AudioManager.js
│   │   ├── level/           # Level design
│   │   │   └── Level.js
│   │   └── ui/              # User interface
│   │       ├── UIManager.js
│   │       └── InstructionsScreen.js
│   └── assets/              # Game assets
│       └── audio/           # MIDI sound effects
├── Prompts/                 # Development prompts
└── README.md                # This file
```

## 🎵 Audio

The game includes MIDI-based sound effects for various actions:
- Jump
- Shape morph
- Combat (hit/defeat)
- Collectibles
- Checkpoint
- Level complete

## 🛠️ Technologies Used

- **HTML5 Canvas** - Rendering
- **JavaScript ES6+** - Game logic
- **Web Audio API** - Sound effects
- **CSS3** - Styling

## 🎓 Game Mechanics

### Enhanced Jump System
- **Variable Jump Height:** Tap for a short hop, hold for maximum height
- **Coyote Time:** 100ms grace period to jump after leaving a platform
- **Jump Buffering:** Press jump 100ms before landing for responsive controls

### Enemy AI
- **Circle Enemy:** Fast horizontal patrol with direction reversal at boundaries
- **Square Enemy:** 2D flying with player detection and chase behavior
- **Triangle Enemy:** Ground patrol with random jumping at 1-2.5 second intervals

### Scoring
- Defeat enemy: +100 points
- Collect coin: +10 points
- Complete level: +500 points
- No deaths bonus: +200 points

## 📝 Development

This game was developed as part of the AI4Devs course, demonstrating modern game development practices with vanilla JavaScript and HTML5 Canvas.

### Key Features Implemented:
- Modular architecture with separation of concerns
- Entity-Component pattern
- Physics simulation with collision detection
- Particle system for visual effects
- Event-driven audio system
- State management
- Camera system with following and screen shake
- Level design with multiple screens

## 🎮 Tips & Strategy

- Study enemy patterns before engaging
- Morph strategically to counter each enemy type
- Hold X to run and build momentum for longer jumps
- Explore thoroughly to find all coins and orbs
- Watch out for flying enemies in open areas
- Time your approach carefully with jumping enemies

## 📄 License

This project is part of the AI4Devs educational program.

## 👥 Credits

- Game Design & Development: AI4Devs Course Project
- Visual Design: Geometric shapes with modern aesthetics
- Audio: MIDI-based sound effects

---

**Enjoy playing Clash of Shapes!** 🎮✨
