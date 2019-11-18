// Функция возвращает перемешанный массив пар слов.
const randomNumber = () => {
    return Math.random() - 0.5;
};

const sortPairs = words => {
    if (words && typeof words === 'string') {
        return words.trim().toLowerCase().split('\n').sort(randomNumber);
    }
    else {
        console.log('Words not found.');
    }
};

const getWord = (pairs, currentPair, lang = 0) => {
    if (pairs[currentPair]) {
        return pairs[currentPair].split('=')[lang].trim();
    }
    else {
        console.log('Пара слов не определена.');
        return '';
    }
};

const showWord = (pairs, currentPair) => {
    const display = document.getElementById('display');
    display.textContent = getWord(pairs, currentPair);
};

const showHelp = (pairs, currentPair) => {
    const input = document.getElementById('put');
    input.value = getWord(pairs, currentPair,1);
};

const clearInput = () => {
    const input = document.getElementById('put');
    input.value = '';
};

const init = () => {
    let pairs = sortPairs(words);
    let currentPair = 0;

    const checkTranslate = () => {
        const input = document.getElementById('put');
        const value = input.value.trim().toLowerCase();

        if (value === getWord(pairs, currentPair,1)){
            console.log('OK');
            input.classList.remove('not-valid');

            if (currentPair < pairs.length - 1) {
                currentPair++;
                showWord(pairs, currentPair);
                clearInput();
            }
            else {
                // Начать заново.
                pairs = sortPairs(words);
                currentPair = 0;
                showWord(pairs, currentPair);
                clearInput();
            }
        }
        else {
            input.classList.add('not-valid');
            console.log('ERR');
        }
    };

    const sendBtn = document.getElementById('send');
    sendBtn.addEventListener('click', () => checkTranslate(pairs, currentPair));

    const helpBtn = document.getElementById('help');
    helpBtn.addEventListener('click', () => showHelp(pairs, currentPair));


    showWord(pairs, currentPair);
    clearInput();
};

window.onload = init;