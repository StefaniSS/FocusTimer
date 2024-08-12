import state from './state.js'
import * as timer from './timer.js'
import * as el from './elements.js'
import * as sounds from './sounds.js'

export function toggleRunning() {
    state.isRunning = document.documentElement.classList.toggle('running')

    timer.countdown()
    sounds.buttonPressAudio.play()
}

export function reset() {
    state.isRunning = false
    document.documentElement.classList.remove('running')
    timer.updateDisplay()

    sounds.buttonPressAudio.play()
}

export function plus() {
    addFiveMinutes();  // Chama a função de adicionar 5 minutos
    sounds.buttonPressAudio.play()
}

export function less() {
    subtractFiveMinutes();  // Chama a função de subtrair 5 minutos
    sounds.buttonPressAudio.play()
}

function addFiveMinutes() {
    let minutes = parseInt(el.minutes.textContent, 10);
    minutes += 5;
    el.minutes.textContent = String(minutes).padStart(2, '0');
}

function subtractFiveMinutes() {
    let minutes = parseInt(el.minutes.textContent, 10);
    if (minutes >= 5) {
        minutes -= 5;
    } else {
        minutes = 0;
    }
    el.minutes.textContent = String(minutes).padStart(2, '0');
}

const audioMap = {
    'forest': sounds.forestAudio,
    'rain': sounds.rainAudio,
    'coffee': sounds.coffeeAudio,
    'fire': sounds.fireAudio
};

// Alterna o estado do áudio
export function toggleMusic(soundType, button) {
    state.isMute = document.documentElement.classList.toggle('music-on');
    const audio = audioMap[soundType];

    if (state.isMute) {
        audio.play();
        button.classList.add('active');
    } else {
        audio.pause();
        button.classList.remove('active');
    }
}

// Adiciona eventos para cada botão de som
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#sounds button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const soundType = button.getAttribute('data-sound');
            
            // Remove a classe 'active' de todos os botões
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Alterna o áudio e adiciona a classe 'active' ao botão clicado
            toggleMusic(soundType, button);
        });
    });
});