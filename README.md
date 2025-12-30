# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

====
a1v1
App 1 is desktop
App2 is for iOS

===
Art Pomorado timer

Version one 
Use the Art Institute of Chicago api 
Add a pom timer with a filling section
Each time the timer ends, you get a new image
Button to go full screen

Version two
Account login with Google or Apple 
That login creates logins/credentials for other museum API’s 
Those get stored in a local database 
Figure out which art museum API I can do this with 

Version three 
you can have favorites 
Each time the timer ends, you can pick from three images for your next session
You have the option to choose from random images or a selection of favorites

Version 4 
A library of unlocked images
Donation section
With link to each of the pages of 


App 1 is desktop
App2 is for iOS


==
Prompt for a1v1

Art Pomodoro Timer - Detailed Specifications
Version One: MVP Art Pomodoro Timer
Core Features
Art Institute of Chicago API Integration
* Use the ARTIC API (https://api.artic.edu/api/v1/artworks)
* Fetch random artwork on each timer start
* Display artwork metadata: title, artist, date, medium
* Use IIIF image service for optimal image loading
* Image URL format: https://www.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg
* Handle API rate limits and errors gracefully with fallback images
Pomodoro Timer Functionality
* Default session: 25 minutes work, 5 minutes break
* Settings to customize work/break durations
* Visual timer display showing remaining time (MM:SS format)
* Audio notification when timer completes (subtle chime, user can toggle)
* Start/Pause/Reset controls
* Session counter (track completed pomodoros in current session)
Filling Section Animation
* Circular or rectangular progress indicator that fills as timer counts down
* Smooth animation synchronized with timer
* Color coding: work sessions (one color), break sessions (different color)
* Option for linear progress bar or circular fill animation
* Fill should be visually distinct but not distracting from artwork
Full Screen Mode
* Button to enter/exit fullscreen (F11 keyboard shortcut support)
* Hide UI controls in fullscreen except on hover
* Artwork scales to fill screen while maintaining aspect ratio
* Minimal overlay showing timer and session count in fullscreen
Technical Requirements
* Responsive design: works on desktop and tablet
* Preload next artwork during current session to ensure smooth transitions
* Local storage to persist timer settings between sessions
* Clean, minimal UI that doesn't compete with artwork
* Accessibility: keyboard navigation, screen reader support
*  react for web and have responsive design for desktop and mobile.
* use tailwindcss for styling
* framer motion for animation

And it’s perfect!

