var selectedAnswers = [null, null, null];   //array con le risposte selezionate
for(let a of document.querySelectorAll('.choice-grid div')) {   //aggiungo il listener per il click
    a.addEventListener('click', selectAnswer);
}

function selectAnswer(event) {
    const selected = event.currentTarget;   

    if(selectedAnswers.includes(null))  //se ancora non sono state selezionate risposte per ogni domanda
        checkForSelection(selected);
}

function checkForSelection(selected) {
    switch(selected.dataset.questionId) {   //switch sul numero di domanda
        case 'one':
            select(selected, 0);
            break;
        case 'two':
            select(selected, 1);
            break;
        case 'three':
            select(selected, 2);
            break;
    }
}

function select(selected, question) {
    if(selectedAnswers[question] !== null) {    //sostituisco la risposta selezionata per la domanda
        selectedAnswers[question].querySelector('.checkbox').src = 'images/unchecked.png';
        selectedAnswers[question].classList.remove('selected');
    }
    selectedAnswers[question] = selected;   //salvo la selezione per la domanda
    selectedAnswers[question].classList.add('selected');
    selectedAnswers[question].querySelector('.checkbox').src = 'images/checked.png';

    const selectString = '[data-question-id="' + selected.dataset.questionId + '"]';
    
    for(let a of document.querySelectorAll(selectString)) { //seleziono tutte le risposte di quella domanda
        if(a !== selected) {
            a.classList.add('unselected');  //e gli aggiungo la classe unselected
        }
    }

    if(!selectedAnswers.includes(null)) //se sono state selezionate risposte per ogni domanda
        showResults();
}

function showResults() {
    const resultDiv = document.querySelector('#result')
    const restartButton = resultDiv.querySelector('#restart');
    const resultTitle = document.querySelector('#resultTitle');
    const resultContent = document.querySelector('#resultContent');

    restartButton.addEventListener('click', restart); 

    findResult(resultTitle, resultContent);

    resultDiv.classList.remove('hidden');
}

function restart() {
    for(let a of document.querySelectorAll('.choice-grid div')) {   //ripristino tutte le risposte 
        a.classList.remove('unselected');
        if(selectedAnswers.includes(a)) {
            a.classList.remove('selected');
            a.querySelector('.checkbox').src = 'images/unchecked.png';
        }
    }

    selectedAnswers = [null, null, null];
    document.querySelector('#result').classList.add('hidden');
}

// Cerco qual è eventualmente l'id di risposta più scelto, altrimenti scelgo la prima selezione
function findResult(title, content) {
    const results = [];
    let result;

    for(let a of selectedAnswers)
        results.push(a.dataset.choiceId);

    for(i = 0; i < results.length; i++) {
        for(j = i + 1; j < results.length; j++) {
            if(results[i] === results[j]) {
                result = results[i];
            }
        }
    }

    if(result === undefined)
        result = results[0];
    
    title.textContent = RESULTS_MAP[result].title;
    content.textContent = RESULTS_MAP[result].contents;
}