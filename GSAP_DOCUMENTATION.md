# GSAP Animation Documentation

## Table of Contents
1. [Overview](#overview)
2. [Performance Section](#performance-section)
3. [Showcase Section](#showcase-section)
4. [Key GSAP Concepts Used](#key-gsap-concepts-used)
5. [Dependencies](#dependencies)

---

## Overview

This documentation covers the GSAP (GreenSock Animation Platform) animations used in the **Performance** and **Showcase** sections of the Apple Web project. GSAP is a powerful JavaScript animation library that provides smooth, high-performance animations with precise control.

### What is GSAP?

GSAP is a JavaScript library for creating animations. It offers:
- **High Performance**: Hardware-accelerated animations
- **ScrollTrigger**: Scroll-based animations
- **Timeline**: Sequencing multiple animations
- **React Integration**: `useGSAP` hook for React components

---

## Performance Section

**File**: `src/components/Performance.tsx`

### Purpose

The Performance section showcases graphics performance features with animated images that position themselves on scroll and fade in text content as the user scrolls.

### Imports

```typescript
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { performanceImages, performanceImgPositions } from "../constants/index.js";
import { useMediaQuery } from "react-responsive";
```

### Key Elements

1. **Section Reference**: A ref to the main section element for GSAP scoping
2. **Mobile Detection**: Uses `react-responsive` to detect mobile devices
3. **Two Animation Systems**:
   - Text fade-in animation (all devices)
   - Image positioning animation (desktop only)

---

### Animation 1: Text Fade-In

```typescript
gsap.fromTo(
    ".content p",
    { opacity: 0, y: 10 },
    {
        opacity: 1,
        y: 0,
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".content p",
            start: "top bottom",
            end: "center center",
            scrub: true,
            invalidateOnRefresh: true,
        },
    }
);
```

#### How It Works

**Method**: `gsap.fromTo()`
- Animates elements **from** one state **to** another state
- More explicit control than `.to()` or `.from()`

**Target**: `.content p`
- Targets all `<p>` elements inside the `.content` div
- This is the text description of graphics performance

**From State** (Initial):
- `opacity: 0` - Text is invisible
- `y: 10` - Text is 10 pixels below its final position

**To State** (Final):
- `opacity: 1` - Text becomes fully visible
- `y: 0` - Text moves to its natural position

**Ease**: `power1.out`
- Creates a deceleration effect
- Animation starts fast and slows down at the end
- Makes the fade feel natural and smooth

**ScrollTrigger Configuration**:

| Property | Value | Purpose |
|----------|-------|---------|
| `trigger` | `.content p` | Element that triggers the animation |
| `start` | `"top bottom"` | Animation starts when the **top** of the element hits the **bottom** of the viewport |
| `end` | `"center center"` | Animation ends when the **center** of the element hits the **center** of the viewport |
| `scrub` | `true` | Ties animation progress directly to scroll position (smooth scrubbing) |
| `invalidateOnRefresh` | `true` | Recalculates animation on window resize |

#### Visual Timeline

```
Scroll Position:     [Element enters viewport] → [Element centered] → [Element exits]
Text Opacity:        0 ────────────────────────→ 1 ─────────────────→ 1
Text Y Position:     10px ─────────────────────→ 0px ────────────────→ 0px
```

---

### Animation 2: Image Positioning Timeline

```typescript
const tl = gsap.timeline({
    defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
    scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "center center",
        scrub: 1,
        invalidateOnRefresh: true,
    },
});

performanceImgPositions.forEach((item) => {
    if (item.id === "p5") return; // Skip p5 (background image)

    const selector = `.${item.id}`;
    const vars = {};
    
    if (typeof item.left === "number") vars.left = `${item.left}%`;
    if (typeof item.right === "number") vars.right = `${item.right}%`;
    if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;
    if (item.transform) vars.transform = item.transform;

    tl.to(selector, vars, 0);
});
```

#### How It Works

**Condition**: Only runs on desktop (`if (isMobile) return;`)
- Mobile devices skip this animation for performance
- Images remain in their default CSS positions on mobile

**Method**: `gsap.timeline()`
- A timeline is a container for multiple animations
- Allows precise sequencing and synchronization
- All animations in this timeline share the same ScrollTrigger

**Timeline Configuration**:

| Property | Value | Purpose |
|----------|-------|---------|
| `defaults.duration` | `2` | Default duration for all animations (2 seconds) |
| `defaults.ease` | `"power1.inOut"` | Easing function: accelerates then decelerates |
| `defaults.overwrite` | `"auto"` | Automatically handles conflicting animations |

**ScrollTrigger Configuration**:

| Property | Value | Purpose |
|----------|-------|---------|
| `trigger` | `sectionRef.current` | The entire Performance section triggers animation |
| `start` | `"top bottom"` | Starts when section top hits viewport bottom |
| `end` | `"center center"` | Ends when section center hits viewport center |
| `scrub` | `1` | Smooth scrubbing with 1-second lag for smoothness |
| `invalidateOnRefresh` | `true` | Recalculates on resize |

#### Image Positioning Logic

**Data Source**: `performanceImgPositions` from constants

```typescript
const performanceImgPositions = [
    { id: "p1", left: 5, bottom: 65 },           // Top left
    { id: "p2", right: 10, bottom: 60 },         // Top right
    { id: "p3", right: -5, bottom: 45 },         // Right, slightly off-screen
    { id: "p4", right: -10, bottom: 0 },         // Bottom right, off-screen
    { id: "p5", left: 20, bottom: 50 },          // Background (skipped in animation)
    { id: "p6", left: 2, bottom: 30 },           // Left middle
    { id: "p7", left: -5, bottom: 0 },           // Bottom left, slightly off-screen
];
```

**Process**:

1. **Loop Through Each Image**: Iterates over `performanceImgPositions`
2. **Skip p5**: The background image (p5) is excluded from positioning animation
3. **Build Animation Variables**:
   - Dynamically creates CSS properties based on data
   - Converts numbers to percentage strings (e.g., `5` → `"5%"`)
   - Supports `left`, `right`, `bottom`, and `transform` properties
4. **Add to Timeline**: `tl.to(selector, vars, 0)`
   - The `0` parameter means all images animate **simultaneously**
   - They all start at position 0 in the timeline

#### Why Skip p5?

The `p5` image (performance5.jpg) serves as a background element and doesn't need repositioning. It remains static while other images move around it, creating depth and visual hierarchy.

#### Animation Flow

```
Initial State (CSS):  Images in default positions
          ↓
User Scrolls Down
          ↓
GSAP Timeline Starts: All images begin moving to their target positions
          ↓
Scroll Progress:      Images gradually move (scrubbed to scroll position)
          ↓
Final State:          All images reach their designated positions
```

---

### Mobile Responsiveness

```typescript
const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

useGSAP(
    () => {
        // Text animation (runs on all devices)
        gsap.fromTo(".content p", ...);

        // Early return for mobile
        if (isMobile) return;

        // Image positioning (desktop only)
        const tl = gsap.timeline(...);
    },
    { scope: sectionRef, dependencies: [isMobile] }
);
```

**Why This Approach?**

1. **Performance**: Complex positioning animations can lag on mobile devices
2. **Screen Space**: Mobile screens have limited space; fixed layouts work better
3. **User Experience**: Simpler animations on mobile reduce cognitive load

**useGSAP Configuration**:
- `scope: sectionRef` - Limits GSAP queries to the Performance section (better performance)
- `dependencies: [isMobile]` - Re-runs animation setup when device type changes

---

### Complete Animation Breakdown

#### Timeline of Events

```
User Scroll Position:
───────────────────────────────────────────────────────────────────
|                    |                    |                        |
Section enters       Text starts fading   Section centered,       Section exits
viewport bottom      Images repositioning animations complete     viewport top
```

#### Simultaneous Animations

1. **Text Content**: Fades in and moves up
2. **Image p1**: Moves to left: 5%, bottom: 65%
3. **Image p2**: Moves to right: 10%, bottom: 60%
4. **Image p3**: Moves to right: -5%, bottom: 45% (slightly off-screen right)
5. **Image p4**: Moves to right: -10%, bottom: 0% (bottom right, off-screen)
6. **Image p5**: Remains static (skipped)
7. **Image p6**: Moves to left: 2%, bottom: 30%
8. **Image p7**: Moves to left: -5%, bottom: 0% (bottom left, slightly off-screen)

---

## Showcase Section

**File**: `src/components/three/showcase.tsx`

### Purpose

The Showcase section features a pinned video with a scaling mask animation and fading content. It demonstrates the M4 chip capabilities with immersive scroll-based effects.

### Imports

```typescript
import { useMediaQuery } from "react-responsive"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
```

### Key Elements

1. **Video Background**: Autoplay video showing gaming content
2. **SVG Mask**: Apple logo mask that scales up on scroll
3. **Content Section**: Text content that fades in after mask scales
4. **Tablet Detection**: Different behavior for tablet/mobile vs desktop

---

### Animation: Pin, Scale, and Fade

```typescript
useGSAP(() => {
    if(!isTablet) {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#showcase',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                pin: true,
            }
        });

        timeline
            .to('.mask img', {
                transform: 'scale(1.1)'
            })
            .to('.content', { 
                opacity: 1, 
                y: 0, 
                ease: 'power1.in' 
            });
    }
}, [isTablet])
```

#### How It Works

**Condition**: Desktop only
```typescript
if(!isTablet)
```
- Only runs on devices wider than 1024px
- Tablets and mobile devices see static content

**Method**: `gsap.timeline()`
- Creates a sequence of animations
- Two animations chained together with `.to()`

---

### ScrollTrigger Configuration

| Property | Value | Purpose |
|----------|-------|---------|
| `trigger` | `'#showcase'` | The showcase section triggers the animation |
| `start` | `'top top'` | Starts when section top hits viewport top |
| `end` | `'bottom top'` | Ends when section bottom hits viewport top |
| `scrub` | `true` | Ties animation to scroll position |
| `pin` | `true` | **Pins the section in place during animation** |

#### Understanding `pin: true`

This is the key feature of this animation:

```
Normal Scroll Behavior:
──────────────────────────────────────────
[Section] → [Scrolls up] → [Disappears]

With pin: true:
──────────────────────────────────────────
[Section] → [Stays fixed] → [Animations play] → [Unpins and scrolls]
```

**What Happens**:
1. User scrolls to the showcase section
2. Section "sticks" to the viewport (like `position: fixed`)
3. Animations play while the section is pinned
4. After animations complete, section unpins and normal scroll resumes

**Duration**:
- The section remains pinned from `start: 'top top'` to `end: 'bottom top'`
- This means it stays pinned for the **entire height** of the section
- Gives enough scroll distance for both animations to complete

---

### Animation 1: Mask Scale

```typescript
.to('.mask img', {
    transform: 'scale(1.1)'
})
```

**Target**: `.mask img`
- The Apple logo SVG inside the mask div
- Initially at scale(1) (normal size)

**Effect**: `transform: 'scale(1.1)'`
- Scales the logo to 110% of its original size
- Creates a subtle zoom/reveal effect
- Makes the video behind it more visible

**Timing**:
- This is the **first** animation in the timeline
- Starts immediately when the section is pinned
- Duration determined by scroll distance (due to `scrub: true`)

#### Visual Effect

```
Initial State:       [Apple Logo Mask] ← Small, video less visible
        ↓ (User scrolls)
Final State:         [Apple Logo Mask] ← 10% larger, more video visible
```

The mask growing larger gradually reveals more of the gaming video underneath, creating an immersive effect.

---

### Animation 2: Content Fade-In

```typescript
.to('.content', { 
    opacity: 1, 
    y: 0, 
    ease: 'power1.in' 
})
```

**Target**: `.content`
- The text content section describing M4 chip features
- Includes headings and performance statistics

**From State** (Assumed Initial CSS):
- `opacity: 0` - Invisible
- `y: 20` or similar - Slightly below final position (set via CSS)

**To State**:
- `opacity: 1` - Fully visible
- `y: 0` - Natural position

**Ease**: `'power1.in'`
- Acceleration easing
- Starts slow and speeds up
- Creates a dynamic entrance effect

**Timing**:
- This is the **second** animation in the timeline
- Starts **after** the mask scale completes
- Sequential chaining with `.to()`

#### Timeline Sequence

```
Timeline Position:   0% ──────────── 50% ──────────── 100%
Mask Scale:          1.0 → → → → → 1.1 [Complete]
Content Fade:               [Waiting] → → → Opacity 0→1, Y movement
```

**Chaining**: Because we use `.to()` twice without time parameters, they play sequentially:
1. First: Mask scales up
2. Then: Content fades in

---

### Mobile/Tablet Behavior

```typescript
const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })

useGSAP(() => {
    if(!isTablet) {
        // Desktop animations
    }
    // No animations on mobile
}, [isTablet])
```

**On Mobile/Tablet**:
- No GSAP animations run
- Section scrolls normally
- Content is visible by default (CSS handles this)
- Video still autoplays

**Why?**

1. **Performance**: Pinning and complex animations can be janky on mobile
2. **UX**: Mobile users scroll faster; pinning can be disorienting
3. **Screen Real Estate**: Mobile screens are smaller; static layouts work better

---

### HTML Structure

```jsx
<section id='showcase'>
   <div className="media">
    <video src="/videos/game.mp4" autoPlay muted playsInline loop />
    <div className="mask">
      <img src="/mask-logo.svg" alt="Mask logo" />
    </div>
   </div>
   
   <div className="content">
    <div className="wrapper">
        <div className="lg:max-w-md">
            <h2>Rocket Chip</h2>
            {/* M4 chip description */}
        </div>
        <div className="max-w-3xs space-y-14">
            {/* Performance statistics */}
        </div>
    </div>
   </div>
</section>
```

**Layers** (bottom to top):
1. `<video>` - Gaming video background
2. `.mask img` - Apple logo mask (SVG) that scales
3. `.content` - Text overlay that fades in

**CSS Mask Effect**:
The `.mask` likely uses CSS `mask-image` or similar to create the cutout effect, where the video is only visible through the logo shape.

---

### Complete Animation Flow

#### User Experience Timeline

```
Scroll Event:
─────────────────────────────────────────────────────────────────

User scrolls down
     ↓
Showcase section reaches top of viewport
     ↓
[SECTION PINS] ← Section stops scrolling, stays fixed
     ↓
[MASK SCALES] ← Apple logo grows from 100% to 110%
     ↓
Mask animation completes
     ↓
[CONTENT FADES IN] ← Text opacity 0→1, moves up
     ↓
Content animation completes
     ↓
[SECTION UNPINS] ← Section releases, normal scroll resumes
```

#### Visual Progression

```
State 1: Section enters
┌─────────────────┐
│   [Video]       │
│   ████ Logo     │  ← Small mask
│                 │
└─────────────────┘

State 2: Mask scaling (section pinned)
┌─────────────────┐
│   [Video]       │
│   █████ Logo    │  ← Growing mask
│                 │
└─────────────────┘

State 3: Content fading in (section still pinned)
┌─────────────────┐
│   [Video]       │
│   ██████ Logo   │  ← Full mask
│   "M4 Chip..."  │  ← Fading in
└─────────────────┘

State 4: Complete (section unpins)
┌─────────────────┐
│   [Video]       │
│   ██████ Logo   │  ← Full mask
│   "M4 Chip..."  │  ← Fully visible
│   "4x faster"   │
└─────────────────┘
```

---

## Key GSAP Concepts Used

### 1. **useGSAP Hook**

**Purpose**: React integration for GSAP

```typescript
import { useGSAP } from "@gsap/react";

useGSAP(() => {
    // GSAP animations here
}, { scope: ref, dependencies: [dep1, dep2] });
```

**Benefits**:
- Automatic cleanup on unmount
- Proper React lifecycle integration
- Scoped queries for better performance
- Dependency tracking

**Options**:
- `scope`: Limits GSAP selectors to a specific element (like a section ref)
- `dependencies`: Re-runs setup when dependencies change (like React's useEffect)

---

### 2. **Timeline**

**Purpose**: Sequence multiple animations

```typescript
const timeline = gsap.timeline({
    scrollTrigger: { /* config */ },
    defaults: { /* default props */ }
});

timeline
    .to('.element1', { x: 100 })
    .to('.element2', { opacity: 0 })
    .to('.element3', { scale: 1.5 }, "<"); // "<" means start with previous
```

**Position Parameter** (third argument):
- `0` - All start at time 0 (simultaneous)
- No parameter - Sequential (one after another)
- `"<"` - Start with previous animation
- `"+=1"` - Start 1 second after previous
- `"-=0.5"` - Start 0.5 seconds before previous ends

---

### 3. **ScrollTrigger**

**Purpose**: Trigger animations based on scroll position

```typescript
scrollTrigger: {
    trigger: '.element',      // What element triggers
    start: 'top center',      // When to start
    end: 'bottom top',        // When to end
    scrub: true,              // Tie to scroll position
    pin: true,                // Pin element during animation
    markers: true,            // Debug markers (dev only)
    invalidateOnRefresh: true // Recalculate on resize
}
```

**Start/End Values**:
Format: `"[trigger-point] [viewport-point]"`

Examples:
- `"top top"` - Trigger top hits viewport top
- `"top center"` - Trigger top hits viewport center
- `"bottom bottom"` - Trigger bottom hits viewport bottom
- `"top bottom"` - Trigger top hits viewport bottom

**Scrub**:
- `true` - Animation tied directly to scroll (1:1)
- `1` - Animation tied to scroll with 1-second smoothing lag
- `false` - Animation plays independently when triggered

**Pin**:
- `true` - Element stays fixed during animation
- `false` - Element scrolls normally

---

### 4. **Animation Methods**

#### `gsap.to()`
Animate **to** a state (from current state)

```typescript
gsap.to('.element', { x: 100, opacity: 0 });
```

#### `gsap.from()`
Animate **from** a state (to current state)

```typescript
gsap.from('.element', { opacity: 0, y: 50 });
```

#### `gsap.fromTo()`
Explicit control: animate **from** one state **to** another

```typescript
gsap.fromTo('.element', 
    { opacity: 0, y: 50 },     // from
    { opacity: 1, y: 0 }        // to
);
```

---

### 5. **Easing Functions**

Control the acceleration curve of animations

| Ease | Effect | Best For |
|------|--------|----------|
| `power1.out` | Deceleration | Fade-ins, UI elements entering |
| `power1.in` | Acceleration | Elements exiting, dramatic entrances |
| `power1.inOut` | Accel then decel | Position changes, smooth movements |
| `linear` | Constant speed | Progress bars, uniform movements |
| `elastic` | Bouncy | Playful UI, attention-grabbing |

**Power Levels**: `power1`, `power2`, `power3`, `power4`
- Higher numbers = more dramatic curve
- `power1` is subtle, `power4` is extreme

---

### 6. **Transform Properties**

GSAP animates transforms efficiently (GPU-accelerated)

```typescript
{
    x: 100,              // translateX(100px)
    y: 50,               // translateY(50px)
    scale: 1.5,          // scale(1.5)
    rotation: 45,        // rotate(45deg)
    opacity: 0.5,        // opacity: 0.5
    transform: 'scale(1.1)' // Direct transform string
}
```

**Best Practices**:
- Use `x`, `y` instead of `left`, `top` (better performance)
- Use `scale` instead of `width`, `height` for size changes
- Avoid animating `width`, `height`, `margin`, `padding` (causes reflow)

---

## Dependencies

### Required Packages

```json
{
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "gsap": "^3.13.0",
    "react-responsive": "^9.0.0"
  }
}
```

### Installation

```bash
npm install gsap @gsap/react react-responsive
```

---

### GSAP Plugin Registration

**File**: `src/app.tsx`

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
```

**Important**: 
- ScrollTrigger must be registered before use
- Register in your main app file (runs once on app load)
- Required for any scroll-based animations

---

## Performance Best Practices

### Used in This Project

1. **GPU Acceleration**:
   - Animating `transform` and `opacity` (not `left`/`top`)
   - Leverages hardware acceleration

2. **Scoped Queries**:
   ```typescript
   useGSAP(() => {}, { scope: sectionRef });
   ```
   - Limits DOM queries to section
   - Faster than global queries

3. **Mobile Detection**:
   - Disables complex animations on mobile
   - Reduces battery drain and improves performance

4. **invalidateOnRefresh**:
   - Recalculates animations on window resize
   - Prevents broken layouts on orientation change

5. **Auto Cleanup**:
   - `useGSAP` automatically cleans up animations on unmount
   - Prevents memory leaks

---

## Debugging Tips

### Enable Markers (Development Only)

```typescript
scrollTrigger: {
    trigger: '#showcase',
    start: 'top top',
    end: 'bottom top',
    markers: true,  // Add this line
    scrub: true,
}
```

Shows visual markers on the page:
- Green: Start position
- Red: End position
- Purple: Trigger element

### Check Animation State

```typescript
// Log timeline progress
timeline.eventCallback("onUpdate", () => {
    console.log("Progress:", timeline.progress());
});
```

---

## Common Issues & Solutions

### Issue 1: Animations Not Running on Mobile

**Cause**: Conditional checks for `isMobile` or `isTablet`

**Solution**: Check your media query breakpoints:
```typescript
const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
```

---

### Issue 2: Jumpy Animations

**Cause**: No easing or wrong easing function

**Solution**: Add appropriate easing:
```typescript
gsap.to('.element', { 
    x: 100, 
    ease: 'power1.out'  // Smooth deceleration
});
```

---

### Issue 3: Animation Doesn't Reset on Scroll Back

**Cause**: Using `.from()` without reversing logic

**Solution**: Use `.fromTo()` for explicit control:
```typescript
gsap.fromTo('.element', 
    { opacity: 0 },    // Explicit start state
    { opacity: 1 }     // Explicit end state
);
```

---

### Issue 4: ScrollTrigger Not Working

**Causes**:
1. ScrollTrigger not registered
2. Wrong trigger selector
3. Start/end values incorrect

**Solutions**:
```typescript
// 1. Register in app.tsx
gsap.registerPlugin(ScrollTrigger);

// 2. Use correct selector
scrollTrigger: {
    trigger: '#showcase',  // Must exist in DOM
    markers: true,         // Debug with markers
}

// 3. Verify start/end values
start: 'top top',   // Format: "[trigger point] [viewport point]"
end: 'bottom top',
```

---

## Additional Resources

- **GSAP Docs**: [https://greensock.com/docs/](https://greensock.com/docs/)
- **ScrollTrigger Docs**: [https://greensock.com/docs/v3/Plugins/ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- **Easing Visualizer**: [https://greensock.com/ease-visualizer/](https://greensock.com/ease-visualizer/)

---

## Summary

### Performance Section
- **Text Animation**: Fades in with scroll
- **Image Positioning**: 6 images move to specific positions simultaneously
- **Mobile**: Desktop only (images static on mobile)
- **Technique**: `fromTo()` for text, Timeline for images

### Showcase Section
- **Pinning**: Section stays fixed during animation
- **Mask Scale**: Apple logo grows 10%
- **Content Fade**: Text fades in after mask scales
- **Mobile**: Desktop only (static on mobile)
- **Technique**: Timeline with sequential animations

Both sections demonstrate scroll-driven storytelling, using GSAP's ScrollTrigger to create immersive, performance-optimized animations that enhance the user experience without compromising mobile performance.
