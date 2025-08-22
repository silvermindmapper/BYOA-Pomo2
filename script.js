class PomodoroTimer {
    constructor() {
        this.timeLeft = 30 * 60; // 25 minutes in seconds
        this.totalTime = 30 * 60;
        this.isRunning = false;
        this.interval = null;
        this.sessionCount = 0;
        this.currentMode = 'focus';
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }

    initializeElements() {
        this.timeDisplay = document.getElementById('time');
        this.timerLabel = document.getElementById('timer-label');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.sessionCountDisplay = document.getElementById('session-count');
        this.progressFill = document.getElementById('progress-fill');
        this.modeButtons = document.querySelectorAll('.mode-btn');
    }

    bindEvents() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchMode(e.target));
        });

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.isRunning) {
                    this.pause();
                } else {
                    this.start();
                }
            } else if (e.code === 'KeyR') {
                this.reset();
            }
        });
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.complete();
            }
        }, 1000);
    }

    pause() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        
        clearInterval(this.interval);
    }

    reset() {
        this.pause();
        this.timeLeft = this.totalTime;
        this.updateDisplay();
    }

    complete() {
        this.pause();
        
        // Add completion animation
        this.timeDisplay.classList.add('timer-complete');
        setTimeout(() => {
            this.timeDisplay.classList.remove('timer-complete');
        }, 500);

        // Play notification sound (if supported)
        this.playNotification();
        
        // Show notification
        this.showNotification();
        
        // Update session count for focus sessions
        if (this.currentMode === 'focus') {
            this.sessionCount++;
            this.sessionCountDisplay.textContent = this.sessionCount;
        }
        
        // Auto-switch to next mode
        this.autoSwitchMode();
    }

    switchMode(button) {
        // Remove active class from all buttons
        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get mode and time from button data
        const mode = button.dataset.mode;
        const time = parseInt(button.dataset.time);
        
        this.currentMode = mode;
        this.totalTime = time * 60;
        this.timeLeft = this.totalTime;
        
        // Update timer label
        const labels = {
            'focus': 'Productive Time',
            'short-break': 'Short Break',
            'long-break': 'Long Break'
        };
        this.timerLabel.textContent = labels[mode];
        
        // Reset timer
        this.reset();
    }

    autoSwitchMode() {
        if (this.currentMode === 'focus') {
            // After focus session, switch to short break
            const shortBreakBtn = document.querySelector('[data-mode="short-break"]');
            this.switchMode(shortBreakBtn);
        } else {
            // After break, switch back to focus
            const focusBtn = document.querySelector('[data-mode="focus"]');
            this.switchMode(focusBtn);
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        
        this.timeDisplay.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress bar
        const progress = ((this.totalTime - this.timeLeft) / this.totalTime) * 100;
        this.progressFill.style.width = `${progress}%`;
    }

    playNotification() {
        // Create a simple notification sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }

    showNotification() {
        if ('Notification' in window && Notification.permission === 'granted') {
            const messages = {
                'focus': 'Focus session completed! Time for a break.',
                'short-break': 'Short break completed! Ready to focus again?',
                'long-break': 'Long break completed! Ready for the next session?'
            };
            
            new Notification('Pomo Refresh', {
                body: messages[this.currentMode],
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23667eea"/><circle cx="50" cy="50" r="35" fill="white"/><circle cx="50" cy="50" r="25" fill="%23667eea"/></svg>'
            });
        } else if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
});
