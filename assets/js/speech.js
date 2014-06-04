var startRec = document.querySelector('#start_button');
var recognizing = false;
var language = 'pt-BR';

var SpeechRecognition = window.SpeechRecognition ||
                        window.webkitSpeechRecognition ||
                        window.mozSpeechRecognition ||
                        window.msSpeechRecognition ||
                        window.oSpeechRecognition;

if (SpeechRecognition !== undefined) {
    var recognition = new SpeechRecognition;
    recognition.lang = language;

    recognition.onstart = function() {
      recognizing = true;
      startRec.style.opacity = '1';
      console.log('Fale Calmamente.');
    };

    recognition.onerror = function(event) {
      console.log('Reconheceu um erro.');
    }

    recognition.onend = function() {
      recognizing = false;
      //function addItem locaction: assets/js/app.js
      var newItem = setTimeout(function() { addItem() }, 1000);

      startRec.style.opacity = '.7';
      console.log('Concluído!');
    }

    recognition.onresult = function(event) {
      if (event.results.length > 0) {
        inspeech.value = event.results[0][0].transcript;
      }
      console.log(text);
    }

    startRec.onclick = function(event) {
      event.preventDefault();
      recognition.start();
    }

} else {
    console.error('Your browser do not support the Web Speech API');
}





