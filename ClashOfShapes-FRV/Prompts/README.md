# Execution Prompts - Shape Shifter Game

This folder contains execution prompts for implementing the Shape Shifter game. Each prompt provides detailed instructions for completing a specific phase of development.

## Available Prompts

### Main Execution Prompt
- **[execute-action-plan.md](./execute-action-plan.md)**: Complete guide for executing all 13 phases

### Individual Phase Prompts

#### Phase 1: Core Setup & Game Loop
- **[prompt-phase-01.md](./prompt-phase-01.md)**: HTML structure, canvas setup, game loop, input manager

#### Phase 2: Player Entity & Basic Movement
- **[prompt-phase-02.md](./prompt-phase-02.md)**: Entity class, Player class, horizontal movement, walk/run

#### Phase 3: Physics & Collision System
- **[prompt-phase-03.md](./prompt-phase-03.md)**: Gravity, jumping, AABB collision, collision resolution

#### Phase 4: Shape Morphing Mechanic
- **[prompt-phase-04.md](./prompt-phase-04.md)**: Shape cycling (Q/E), three shapes rendering, particle effects

#### Phase 5: Enemy System & AI
- **[prompt-phase-05.md](./prompt-phase-05.md)**: Enemy class, patrol AI, three enemy types

#### Phase 6: Combat System
- **[prompt-phase-06.md](./prompt-phase-06.md)**: Rock-Paper-Scissors logic, combat outcomes, visual feedback

#### Phase 7: Level Design & Terrain
- **[prompt-phase-07.md](./prompt-phase-07.md)**: Level class, 3-screen layout, platform placement

#### Phase 8: Collectibles & Scoring
- **[prompt-phase-08.md](./prompt-phase-08.md)**: Coins, orbs, bobbing animation, scoring system

#### Phase 9: Camera System
- **[prompt-phase-09.md](./prompt-phase-09.md)**: Camera following, smooth lerp, bounds clamping

#### Phase 10: UI/HUD
- **[prompt-phase-10.md](./prompt-phase-10.md)**: Health bar, score display, shape indicator, pause screen

#### Phase 11: Visual Effects & Polish
- **[prompt-phase-11.md](./prompt-phase-11.md)**: Verify particles, text effects, polish animations

#### Phase 12: Hazards & Game Over Logic
- **[prompt-phase-12.md](./prompt-phase-12.md)**: Spikes, pits, checkpoints, goal, respawn, win/loss screens

#### Phase 13: Testing & Bug Fixes
- **[prompt-phase-13.md](./prompt-phase-13.md)**: Comprehensive testing, cross-browser, performance, bug fixes

## How to Use These Prompts

### For AI Development Assistants
1. Start with `execute-action-plan.md` to understand the overall process
2. Execute phases sequentially (1 → 2 → 3 → ... → 13)
3. Use the individual phase prompts for detailed implementation instructions
4. Follow the testing checklist in each phase
5. Document progress as specified

### For Human Developers
1. Read `execute-action-plan.md` for project overview
2. Use phase prompts as implementation guides
3. Each prompt includes:
   - Step-by-step instructions
   - Code specifications
   - Testing checklist
   - Success criteria
   - Common issues & solutions

### Execution Order
**IMPORTANT**: Phases must be executed in order:
```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 →
Phase 8 → Phase 9 → Phase 10 → Phase 11 → Phase 12 → Phase 13
```

Each phase builds on the previous one. Skipping phases will cause issues.

## Prompt Structure

Each phase prompt contains:
1. **Phase Overview**: Number, name, objective
2. **Prerequisites**: What must be done first
3. **Implementation Instructions**: Step-by-step guide
4. **Specifications**: Detailed requirements
5. **Testing Checklist**: Verification steps
6. **Success Criteria**: When phase is complete
7. **Common Issues**: Troubleshooting guide
8. **Documentation Requirements**: What to record
9. **Next Steps**: Link to next phase

## Documentation Requirements

For each phase, you must:
1. **Update Process.md**: Add phase completion entry
2. **Create phase output file**: Document implementation details

See `Rules/documentation-rules.md` for complete documentation guidelines.

## Quick Reference

### Phase Dependencies
- **Phase 1**: No dependencies (start here)
- **Phases 2-3**: Linear sequence
- **Phase 4**: Requires Phases 1-3 (player movement + physics)
- **Phase 5**: Requires Phase 4 (needs Entity class)
- **Phase 6**: Requires Phases 4-5 (shapes + enemies)
- **Phases 7-8**: Requires Phase 6 (combat system)
- **Phase 9**: Requires Phase 8 (level exists)
- **Phase 10**: Requires Phase 9 (camera system)
- **Phases 11-12**: Require Phase 10 (UI + all systems)
- **Phase 13**: Requires all previous phases (testing)

### Critical Phases
- **Phase 1**: Foundation (cannot skip)
- **Phase 6**: Core mechanic (Rock-Paper-Scissors combat)
- **Phase 9**: Camera (required for level navigation)
- **Phase 12**: Win/loss conditions (required for completion)
- **Phase 13**: Testing (ensures quality)

## Additional Resources

- **Action Plan**: `../Action Plan/action-plan.md`
- **Phase Details**: `../Action Plan/phase-XX-*.md`
- **PRD**: `../PRD/prd.md`
- **Documentation Rules**: `../Rules/documentation-rules.md`
- **Process Template**: `../Process/Process.md`

## Notes for Prompt Creation

Each phase prompt follows this template structure:
```markdown
# Execute Phase X: [Name]

## Phase Overview
**Phase**: X of 13
**Name**: [Phase Name]
**Objective**: [Brief objective]

## Prerequisites
[List of prerequisites]

## Your Task
[Clear description of what to implement]

## Implementation Instructions
[Step-by-step guide]

## Testing Checklist
[Verification steps]

## Success Criteria
[When phase is complete]

## Common Issues & Solutions
[Troubleshooting]

## Documentation Requirements
[What to document]

## Next Steps
[Link to next phase]

## Reference Documents
[Links to relevant docs]
```

---

**Note**: All 13 phase prompts should be created following this structure. Currently implemented:
- ✅ execute-action-plan.md (main prompt)
- ✅ prompt-phase-01.md (Core Setup)
- ✅ prompt-phase-06.md (Combat System)
- ⚠️ Remaining prompts (phases 2-5, 7-13) should be created following the same pattern

**For expedited development**: Refer directly to the detailed phase markdown files in the `Action Plan` folder, which contain all necessary implementation details.
