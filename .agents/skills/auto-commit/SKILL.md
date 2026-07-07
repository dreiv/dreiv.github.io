---
name: auto-commit
description: Stages changes, analyzes the diff to generate a Conventional Commit message, and waits for explicit user approval before committing.
tools: ['#terminal']
---

# Skill: Auto Commit

Use for: "commit my changes", "generate a commit", "save my work".

## Instructions:

Execute these steps in order. Do not skip steps. Do not run multiple steps at once.

1. **STAGE:** Run `git add .` in the terminal.
2. **DIFF:** Run `git diff --staged` in the terminal.
3. **READ & FORMAT:** Read the terminal diff output. Write exactly ONE commit message matching this exact format: `type: description` (Allowed types: feat, fix, chore, docs, refactor, style, test). Keep it under 50 characters.
4. **STOP & ASK:** Do not commit yet. You must stop here and ask the user:
   "Proposed commit message: `[Your Message Here]`. Do you approve? (Yes / No / Edit)"
5. **COMMIT & PUSH:** Wait for the user response.
   - If user says Yes: Run `git commit -m "[The Approved Message]"` AND THEN run `git push`.
   - If user gives an edit: Run `git commit -m "[The Edited Message]"` AND THEN run `git push`.
   - If user says No: Stop and do nothing.
