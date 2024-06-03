const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const transcriptionDiv = document.getElementById('transcription');

let recognition;
let isRecognizing = false;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'fr-FR';

    recognition.onstart = () => {
        isRecognizing = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        transcriptionDiv.textContent = '';
    };

    recognition.onend = () => {
        isRecognizing = false;
        startButton.disabled = false;
        stopButton.disabled = true;
    };

    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        transcriptionDiv.innerHTML = `<strong>Final:</strong> ${finalTranscript}<br/><strong>Interim:</strong> ${interimTranscript}`;
    };
} else {
    startButton.disabled = true;
    alert('Web Speech API non supportée par ce navigateur.');
}

startButton.addEventListener('click', () => {
    if (!isRecognizing) {
        recognition.start();
    }
});

stopButton.addEventListener('click', () => {
    if (isRecognizing) {
        recognition.stop();
    }
});