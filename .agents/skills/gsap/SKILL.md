---
name: gsap
description: Cheatsheet and guidelines for implementing GSAP animations in React
---

# GSAP in React

When building animations with GSAP in this Next.js/React project:

1. **Always use the official `@gsap/react` hook**:
   ```tsx
   import { useRef } from 'react';
   import gsap from 'gsap';
   import { useGSAP } from '@gsap/react';

   // Register plugin once
   gsap.registerPlugin(useGSAP);
   
   // In components
   export function AnimatedBox() {
     const container = useRef(null);
     useGSAP(() => {
       gsap.to('.box', { opacity: 1, y: 0 });
     }, { scope: container });
     
     return <div ref={container}><div className="box">Content</div></div>;
   }
   ```
2. **Use Server/Client Boundaries**:
   Animations require client-side execution. Ensure any component using `useGSAP` has the `"use client"` directive at the top of the file, as per `AGENTS.md` guidelines for isolated client boundaries.
3. **Respect Performance**:
   Use standard CSS transforms (`x`, `y`, `scale`, `rotation`) and `opacity` to ensure hardware acceleration and buttery 60fps performance.
