const elements = {
    score: null,
    reponse: null,
    choix: null,
}

const mots = [
    'BECODE',
    'DANTE',
    'MIKE',
    'JAVASCRIPT',
    'FRONTEND',
    'BACKEND',
    'FULLSTACK',
    'SOUFFRIR',
    'CORDE',
    'TABOURET',
    'COURAGE',
    'ENTRAIDE',
    'AMBIANCE',
    'HTML',
    'CSS',
    'JAVA',
    'PHP',
    'DEVELOPPEUR',
    'LINUX',
    'MAC',
    'WINDOWS',
    'ORDINATEURS',
    'LOVE',
    'CYBERSECURITE',
    'DOMOTIQUE',
    'VEILLE',
    'SOMMEIL',
    'MANGER',
    'CAFE',
    'REDBULL'
]

let choix = [];

let mot = '';

let wordMapping = [];
let choicesMapping = [];
let scoreCount = 1;
let maxScore = 8;

 const init = () => {
  //   console.log('>> #init')

     //je lie les elements
     elements.score = document.querySelector('#score');
     elements.reponse = document.querySelector('#reponse');
     elements.choix = document.querySelector('#choix');

    // Sélectionner une lettre

    mot = pickWord();
   // console.log("mot", mot);
    // Créer un word mapping
    wordMapping = getWordMapping(mot);
   // console.log('wordMapping', wordMapping)
    //  -Créer les choix    
    choix = createChoices();
   // console.log(choix);
    choicesMapping = getChoicesMapping(choix);
    // Afficher les lettres
    displayWord(wordMapping);

    // Afficher les choix
    displayChoises(choicesMapping);
    //      -créer choices mapping    

    console.log(choicesMapping);
    // Afficher les scores
    //displayScore();
    
    // Prendre en compte les choix du joueur
    //  - mouse events
    elements.choix.addEventListener('click', ({ target }) => {
        //evt : mouseEvent evt.target => { target }
        if(target.matches('li')){
            checkLetter(target.innerHTML)
        }
    })
    //  - keyboard events
    document.addEventListener('keydown', ({keyCode}) => {
        //evt:KeybordEvent
        //console.log('keyCode', keyCode)
        const letter = String.fromCharCode(keyCode);
        //console.log('letter', letter);
        if (keyCode >= 65 && keyCode <= 90)
        checkLetter(letter);
    })
    // vérifier la lettre choisie
    //  - ajoute au score s'il n'est pas dans le mot
    //  - afficher la lettre s'il est dans le mot
    //  Jeu terminé si
    //    -Si le score == max => perdu;
    //    -Si on a trouvé toutes les lettres => gagné;
    };

    const checkLetter = (letter) => {
        console.log(letter);
        let isLetterInWord = false;
        let isAllLetterFound = true;
        wordMapping.forEach((letterMapping) => {
            if (letterMapping.letter === letter){
                letterMapping.isVisible = true;
                isLetterInWord = true;
            }
            if(letterMapping.isVisible === false){
                isAllLetterFound = false;
            }
        });
        choicesMapping.forEach((letterMapping) =>{
            if(letterMapping.letter === letter){
                letterMapping.isChosen = true;
            }
        });
        displayChoises(choicesMapping);
        if(isLetterInWord === true) {
            displayWord(wordMapping);
        } else {
            scoreCount++;
            displayScore();
        }
        if(scoreCount === maxScore){
            endGame();
        }
        if(isAllLetterFound) {
            winGame();
        }
    };

    const endGame = () => {
        document.querySelector('body').style.backgroundColor = 'red';
        elements.choix.innerHTML = `<h1>Tu es mort de décès...</h1>`
    };

    const winGame = () => {
        elements.choix.innerHTML = `<h1>Tu es vivant !</h1>`
    }

    const displayScore = () => {
        elements.score.innerHTML = `${scoreCount} / ${maxScore}`;
        elements.score.innerHTML = `<img src="img/00${scoreCount}.png" alt="le pendu"/>`;
    }

    const displayChoises = (choicesMapping) => {
        const choicesHtml = choicesMapping.map((letterMapping) => {
            if (letterMapping.isChosen === false) {
                return `<li>${letterMapping.letter}</li>`;
            } else {
                return `<li class="disabled">${letterMapping.letter}</li>`;
            }
        });
        elements.choix.querySelector('ul').innerHTML = choicesHtml.join('');
    };

    const displayWord = (wordMapping) => {
       const wordHtml = wordMapping.map((letterMapping) => {
           if (letterMapping.isVisible === true) {
            return `<li>${letterMapping.letter}</li>`;
           } else {
            return `<li>_</li>`;
           }
       });
       console.log('wordHtml', wordHtml)
 
       elements.reponse.querySelector('ul').innerHTML = wordHtml.join('');
    };



//  méthode permettant d'avoir l'alphabet sans avoir à l'écrire
    const createChoices = () => {
        const choix = [];
        for ( let i = 65; i <= 90; i++){
            choix.push(String.fromCharCode(i))
        }
        return choix;
    }

    const getChoicesMapping = (choix) => {
        const choicesMapping = choix.map((letter) => {
            return {
                letter,
                isChosen: false
            };
        });
        return choicesMapping;
    };

    //Séparer les lettres des mots à trouver

    const getWordMapping = (mot) => {
        const wordArr = mot.split('');
        console.log('wordArr', wordArr)
        const wordMapping = wordArr.map((letter, index) => {
            let isVisible = false;
            if(index === 0 || index == wordArr.length -1){
                isVisible = true;
            }
            return {
                letter,
                isVisible
            };
        });
        return wordMapping;
    }

    //prendre des index au hasard (1)

    const pickWord = () => {
        const randomIndex = getRandomInt(0, mots.length - 1);
        return mots[randomIndex];

    };

 window.addEventListener('load', () => {
     init();
 })

// méthode permettant de prendre des index au hasard (2)

 const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }