//Array for the icons
const icons = [
    {
        name: 'cat',
        id: 1,
    },
    {
        name: 'dog',
        id: 2,
    },
    {
        name: 'dove',
        id: 3,
    },
    {
        name: 'dragon',
        id: 4,
    },
    { 
        name: 'fish',
        id: 5,
    },
    {
        name: 'frog',
        id: 6,
    },
    {
        name: 'spider',
        id: 7,
    },
    {
        name: 'horse',
        id: 8,
    },
    {
        name: 'cat',
        id: 9,
        status:false,
    },
    {
        name: 'dog',
        id: 10,
    },
    {
        name: 'dove',
        id: 11,
    },
    {
        name: 'dragon',
        id: 12,
    },
    { 
        name: 'fish',
        id: 13,
    },
    {
        name: 'frog',
        id: 14,
    },
    {
        name: 'spider',
        id: 15,
    },
    {
        name: 'horse',
        id: 16,
    },
]
// global variables
let moves = 0;
let cardOpened = []
const counter = document.querySelector('.moves')
//deck shuffle fnx
const deck = document.querySelector('.deck')
function shuffle() {
    for (let i = 0; i < icons.length; i++){
        const newli = document.createElement('li')
        newli.classList.add('cards')
        newli.setAttribute('id', `C${i+1}`)
        newli.setAttribute('data-id', `${icons[i].id}`)
        newli.innerHTML = `<i class="fas fa-${icons[i].name}"></i>`;
        newli.onclick = () => {
            newli.classList.add('faceup', 'open');
            cardOpened.length > 0 && console.log(cardOpened[0].name, icons[i].name);
            function moveCounter() {
                moves++;
                counter.innerHTML = moves;
            }
            {
                
}            function matched() {
                console.log('its a match');
                const elem = document.querySelector(`[data-id="${cardOpened[0].id}"]`)
                elem.classList.toggle('faceup')
                elem.classList.toggle('open')
                elem.classList.toggle('match')
                newli.classList.toggle('faceup')
                newli.classList.toggle('open')
                newli.classList.toggle('match')
                cardOpened = [];
            }
            function unmatched() {
                console.log('u loose');
                setTimeout(() => {
                const elem = document.querySelector(`[data-id="${cardOpened[0].id}"]`)
                elem.classList.toggle('faceup')
                elem.classList.toggle('open')
                newli.classList.toggle('faceup')
                newli.classList.toggle('open')                       
                cardOpened = []
                }, 500);
            }
            if (cardOpened.length === 0) {
                cardOpened.push(icons[i]);              
            } else if (cardOpened.length >0) {
                cardOpened.push(icons[i]);
                if (cardOpened[0].name == cardOpened[1].name) {
                    matched();
                    moveCounter()
                        }    
                else {
                    unmatched();
                    moveCounter()
                    }
            }
            console.log(cardOpened.length);
        }

        deck.appendChild(newli);
    }
}
//restarting the game
const restart = document.querySelector('.restart')
restart.addEventListener('click', () => {
    deck.innerHTML = '';
    shuffle();
    cardOpened = [];
    counter.innerHTML = 0;
});
window.onload = () => shuffle();