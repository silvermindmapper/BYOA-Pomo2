# Pomo Refresh - Pomodoro Timer

A beautiful, modern Pomodoro timer that runs in your browser. Stay focused and productive with this clean, distraction-free timer.

## Features

- **Three Timer Modes**:
  - Focus Time (25 minutes)
  - Short Break (5 minutes)
  - Long Break (15 minutes)

- **Modern UI**: Clean, responsive design with smooth animations
- **Session Tracking**: Count your completed focus sessions
- **Progress Bar**: Visual progress indicator
- **Auto-switching**: Automatically switches between focus and break modes
- **Notifications**: Browser notifications when timer completes
- **Sound Alerts**: Audio notification when timer finishes
- **Keyboard Shortcuts**:
  - Spacebar: Start/Pause timer
  - R key: Reset timer

## How to Use

1. **Open the Timer**: Simply open `index.html` in your web browser
2. **Choose Mode**: Select Focus, Short Break, or Long Break
3. **Start Timer**: Click "Start" or press Spacebar
4. **Take Breaks**: The timer will automatically switch to break mode after focus sessions
5. **Track Progress**: Watch your session count and progress bar

## Pomodoro Technique

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.

### Basic Workflow:
1. Decide on the task to be done
2. Set the timer to 25 minutes
3. Work on the task until the timer rings
4. Take a short break (5 minutes)
5. After four focus sessions, take a longer break (15 minutes)

## Browser Compatibility

This timer works in all modern browsers that support:
- ES6 Classes
- CSS Grid and Flexbox
- Web Audio API
- Notifications API

## Files

- `index.html` - Main HTML structure
- `styles.css` - Modern, responsive styling
- `script.js` - Timer functionality and interactions
- `README.md` - This documentation

## Getting Started

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Allow notifications when prompted (optional)
4. Start your first Pomodoro session!

## Customization

You can easily customize the timer by modifying the time values in `script.js`:

```javascript
// In the constructor, change these values:
this.timeLeft = 25 * 60; // 25 minutes
this.totalTime = 25 * 60;
```

Or modify the button data attributes in `index.html`:

```html
<button class="mode-btn active" data-mode="focus" data-time="25">Focus</button>
```

## Tips for Best Results

- Use in a quiet environment during focus sessions
- Take breaks away from your computer
- Stay hydrated during your sessions
- Don't skip breaks - they're essential for productivity
- Track your sessions to build consistency

Enjoy your focused work sessions! 🍅
# BYOA-Pomo2
