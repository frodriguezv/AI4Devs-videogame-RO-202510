# Documentation Rules - Shape Shifter Game Development

## Overview
This document defines the documentation requirements and rules for implementing the Shape Shifter game. All developers (AI or human) must follow these rules to ensure consistent, thorough documentation throughout the development process.

---

## Core Documentation Principles

### 1. Document Everything
- Every phase must be documented
- Every decision must be recorded
- Every challenge must be noted
- Every deviation from plan must be explained

### 2. Document As You Go
- Update documentation immediately after completing each phase
- Do not batch documentation for multiple phases
- Fresh documentation is more accurate

### 3. Be Specific and Detailed
- Provide concrete examples
- Include code snippets for key implementations
- Describe visual results
- Note exact error messages if issues occurred

### 4. Make It Useful
- Write for future reference
- Include troubleshooting information
- Document "why" decisions, not just "what"
- Think: "Will this help someone understand what happened?"

---

## Required Documentation

### Process Documentation (`Process/Process.md`)

#### When to Update
- **Immediately after completing each phase**
- Before moving to the next phase
- After fixing any significant bugs

#### What to Include
For each phase entry:

1. **Phase Information**
   - Phase number and name
   - Date completed (YYYY-MM-DD format)
   - Time spent (estimated hours/minutes)

2. **Summary of Work**
   - Brief description of what was implemented
   - Key classes or systems created
   - Major features added

3. **Challenges Encountered**
   - Any difficulties during implementation
   - How they were resolved
   - Alternative approaches considered

4. **Deviations from Plan**
   - Any changes from original phase plan
   - Reasons for deviations
   - Impact on future phases

5. **Testing Results**
   - Brief summary of testing
   - Any issues found and fixed
   - Performance observations

6. **Notes for Future Phases**
   - Anything to be aware of
   - Technical debt created
   - Suggestions for improvements

#### Example Entry Format
```markdown
## Phase X: [Phase Name]
**Date**: 2024-01-15
**Time Spent**: ~2 hours

### Summary
Implemented [brief description]. Created [classes/systems]. Added [features].

### Key Implementations
- Created `ClassName` with methods X, Y, Z
- Implemented [system name] using [approach]
- Added [feature] to handle [use case]

### Challenges
- **Challenge 1**: [Description]
  - Solution: [How it was resolved]
- **Challenge 2**: [Description]
  - Solution: [How it was resolved]

### Deviations from Plan
- Changed [X] to [Y] because [reason]
- Added [feature] not in original plan to [reason]

### Testing Results
- All checklist items passed ✅
- Performance: [X] FPS average
- Issues found: [None / List of issues]

### Notes for Future
- [Technical debt or considerations]
- [Recommendations]
```

---

### Phase Output Documentation (`Process/phase-outputs/phase-XX-output.md`)

#### When to Create
- **After completing each phase**
- One file per phase (phase-01-output.md, phase-02-output.md, etc.)

#### What to Include

1. **Phase Overview**
   - Phase number, name, date
   - Objective recap
   - Prerequisites met

2. **Implementation Details**
   - Detailed description of what was built
   - Architecture decisions
   - Code organization

3. **Code Highlights**
   - Key code snippets with explanations
   - Important functions or methods
   - Novel or complex implementations

4. **Visual Results**
   - Screenshots (if available) or detailed descriptions
   - What player sees after this phase
   - UI/visual changes

5. **Testing Performed**
   - Which tests from checklist were run
   - Results of each test
   - Any edge cases discovered

6. **Issues and Resolutions**
   - Bugs encountered
   - How they were fixed
   - Root cause analysis

7. **Metrics**
   - Performance (FPS, load time, etc.)
   - Code size (if relevant)
   - Complexity added

8. **Learnings and Insights**
   - What worked well
   - What could be improved
   - Technical insights gained

#### Example Output File Structure
```markdown
# Phase X Output: [Phase Name]

## Overview
- **Phase**: X of 13
- **Date Completed**: 2024-01-15
- **Objective**: [Recap objective]
- **Status**: ✅ Complete

## What Was Implemented

### Classes Created
1. **ClassName**
   - Purpose: [Description]
   - Key Methods: method1(), method2()
   - Properties: prop1, prop2

### Systems Added
1. **System Name**
   - Description: [What it does]
   - How it works: [Technical approach]
   - Integration: [How it connects to other systems]

### Features Implemented
- Feature 1: [Description]
- Feature 2: [Description]

## Code Highlights

### Key Implementation 1
```javascript
// Code snippet with explanation
class Example {
  // ...
}
```
**Explanation**: [Why this code matters]

### Key Implementation 2
[Another important code snippet]

## Visual Results

### Before This Phase
- [Description of state before]

### After This Phase
- [Description of state after]
- [What player can now do]
- [Visual changes]

## Testing Results

### Tests Performed
- ✅ Test 1: [Description] - PASSED
- ✅ Test 2: [Description] - PASSED
- ⚠️ Test 3: [Description] - ISSUE (resolved)

### Edge Cases Discovered
- [Edge case 1 and how handled]

### Performance Metrics
- FPS: [Average FPS]
- Memory: [If relevant]
- Load Time: [If relevant]

## Issues and Resolutions

### Issue 1: [Title]
- **Problem**: [Description]
- **Cause**: [Root cause]
- **Solution**: [How fixed]
- **Prevention**: [How to avoid in future]

## Deviations from Plan
- [Any changes from phase plan]
- [Reasons for changes]

## Learnings
- [What worked well]
- [What was challenging]
- [Insights gained]

## Next Phase Considerations
- [Anything important for next phase]
- [Technical debt created]
- [Recommendations]
```

---

## Documentation Standards

### File Naming
- **Process file**: `Process.md` (single file, continuously updated)
- **Output files**: `phase-XX-output.md` where XX is zero-padded (01, 02, 03, etc.)

### Markdown Formatting
- Use proper heading hierarchy (# for main, ## for sections, ### for subsections)
- Use code blocks with language specification (```javascript, ```html, etc.)
- Use lists for itemized information
- Use **bold** for emphasis
- Use checkboxes (- [ ] or - [✅]) for testing results

### Writing Style
- **Clear and concise**: No unnecessary verbosity
- **Technical but readable**: Balance detail with clarity
- **Objective**: State facts, not opinions (unless in Learnings section)
- **Professional**: Proper grammar and spelling

### Code Snippets
- Include only relevant portions of code
- Add comments explaining complex logic
- Show context (surrounding code) when helpful
- Specify which file/class the code belongs to

---

## Documentation Workflow

### Phase Completion Workflow
1. **Complete Phase Implementation**
   - Finish all implementation steps
   - Complete all testing checklist items
   - Verify all success criteria met

2. **Create Phase Output Document**
   - Create `phase-XX-output.md` file
   - Document implementation details
   - Include code snippets
   - Describe visual results
   - Record test results

3. **Update Process Document**
   - Add phase entry to `Process.md`
   - Summarize work done
   - Note challenges and solutions
   - Record deviations

4. **Review Documentation**
   - Ensure all required sections completed
   - Check for clarity and completeness
   - Verify code snippets are accurate

5. **Move to Next Phase**
   - Only after documentation is complete

### Bug Fix Workflow
When fixing bugs:
1. Document the bug in the phase output where it occurred
2. Update Process.md with a bug fix entry
3. Include: what broke, why, how fixed, test to prevent recurrence

---

## Documentation Quality Checklist

Before considering a phase complete, verify:
- [ ] Process.md updated with phase entry
- [ ] Phase output file created (phase-XX-output.md)
- [ ] All required sections included in both documents
- [ ] Code snippets provided for key implementations
- [ ] Visual results described or screenshotted
- [ ] Test results documented
- [ ] Challenges and solutions recorded
- [ ] Deviations from plan explained
- [ ] Writing is clear and professional
- [ ] Markdown formatting correct
- [ ] File naming conventions followed

---

## Documentation Benefits

### For Current Development
- Track progress systematically
- Remember decisions and rationale
- Identify patterns in challenges
- Learn from mistakes immediately

### For Future Reference
- Understand why code was written a certain way
- Recreate implementation if needed
- Onboard new developers quickly
- Troubleshoot issues by reviewing history

### For Project Management
- Demonstrate progress
- Estimate future work more accurately
- Identify bottlenecks
- Show value of work done

---

## Special Documentation Scenarios

### When Things Go Wrong
If a phase fails or needs to be restarted:
- Document the failure in detail
- Explain what went wrong and why
- Describe the recovery approach
- Record lessons learned

### When Making Significant Changes
If major deviations from plan are needed:
- Document the original plan
- Explain why change is necessary
- Describe the new approach
- Assess impact on future phases
- Update action plan if needed

### When Discovering Bugs from Previous Phases
- Document in the original phase's output file (add "Bug Fix" section)
- Also note in current phase where discovered
- Explain why the bug wasn't caught earlier

---

## Documentation Maintenance

### Keep Documentation Current
- Update immediately when changes occur
- Don't let documentation lag behind code
- Review and update outdated sections

### Regular Reviews
- After every 3-4 phases, review all documentation
- Ensure consistency across phases
- Fill in any gaps

### Final Documentation Review
- Before Phase 13 (Testing), review all documentation
- Ensure completeness and accuracy
- Create summary of entire development process

---

## Enforcement

### These Rules Are Mandatory
- Not optional suggestions
- Must be followed for every phase
- No exceptions without explicit approval

### Consequences of Poor Documentation
- Phase not considered complete
- Must go back and document properly
- Delays progress to next phase

### Quality Standards
- Documentation must be useful
- Documentation must be accurate
- Documentation must be complete

---

## Summary

**Remember**: Good documentation is as important as good code. Take the time to document properly. Your future self (and others) will thank you.

### Quick Checklist After Each Phase
✅ Code implemented and tested
✅ Process.md updated
✅ Phase output file created
✅ All required sections complete
✅ Documentation reviewed for quality

**Only then → Move to next phase**
