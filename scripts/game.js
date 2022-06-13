import { animateOnce, changeBalance, randInt, setBalanceField } from "./functions.js";

setBalanceField()
let balance = document.querySelector('.balance')
let wrapper = document.querySelector('.wrapper')
let warning = document.querySelector('.warning')
let volumeCont = document.querySelector('.volume_cont')

let names = ['VERYPERRY', 'CHERRY-B', 'KRUMAN']
let cfData = {
    hammer: 1,
    axe: 2,
    hammer_2: 3,
    gun: 4,
    pers: 5
}
let avatarPositionData = {
    'VERYPERRY': [-30, -5],
    'CHERRY-B': [-34, -30],
    'KRUMAN': [5, -7]
}

let playing = true
let score = 0
let level = Number(localStorage.getItem('level_berry_ios'))
let avatarName = names[Number(localStorage.getItem('avatar_berry_ios')) - 1]

let width = window.innerWidth

let volume = false
let audio = new Audio()
audio.src = '../audio/game.mp3'
audio.loop = true

document.querySelector('.avatar_name').innerHTML = avatarName

let avatarPic = document.createElement('img')
avatarPic.src = '../png/avatar_' + (localStorage.getItem('avatar_berry_ios') ?? 1) + '.png'
avatarPic.style.left = avatarPositionData[avatarName][0] + '%'
avatarPic.style.top = avatarPositionData[avatarName][1] + '%'
document.querySelector('.avatar').appendChild(avatarPic)

document.querySelector('.level').innerHTML = 'Level ' + level

let chosenPic = document.createElement('img')
chosenPic.src = '../png/' + localStorage.getItem('chosen_berry_ios') + '.png'
document.querySelector('.chosen').appendChild(chosenPic)

document.querySelector('.header').innerHTML = avatarName + ' winner'

let warningPic = document.createElement('img')
warningPic.classList.add('warning_pic')
warningPic.src = '../png/avatar_' + localStorage.getItem('avatar_berry_ios') + '.png'
warning.appendChild(warningPic)

let originalEnemy = document.createElement('div')
originalEnemy.classList.add('enemy', 'block')

let enemyPic = document.createElement('img')
enemyPic.src = '../png/enemy_' + randInt(1, 3) + '.gif'

let harm = document.createElement('div')
harm.classList.add('harm', 'block', 'hidden')

originalEnemy.append(enemyPic, harm)

play()

document.querySelector('.again').onclick = () => {
    warning.style.left = '-50%'
    score = 0

    document.querySelector('.earned').innerHTML = 0
    document.querySelector('.time').innerHTML = 60

    play()
}

volumeCont.onclick = () => {
    volume = !volume

    if (volume) {
        audio.play()
        volumeCont.querySelector('img').src = '../png/volume_off.png'
    } else {
        audio.pause()
        volumeCont.querySelector('img').src = '../png/volume_on.png'
    }
}

function getEnemy() {
    let enemy = originalEnemy.cloneNode(true)
    let harm = enemy.querySelector('.harm')
    enemy.querySelector('img').src = '../png/enemy_' + randInt(1, 4) + '.gif'

    wrapper.append(enemy)

    enemy.style.left = -enemy.offsetWidth + 'px'
    enemy.style.top = randInt(30, 55) + '%'

    let enemyHealth = level + 2
    let distance = 0

    let enemyInterval = setInterval(() => {
        if (distance > window.innerWidth) {
            enemy.remove()
            clearInterval(enemyInterval)
        }

        let stepLength = randInt(width * 0.125, width * 0.25)
        enemy.style.transform = 'translateX(' + (distance + enemy.offsetWidth + stepLength) + 'px'
        distance += stepLength
    }, 1000)

    enemy.onclick = () => {
        if (!playing) { return }

        harm.classList.remove('hidden')

        setTimeout(() => {
            harm.classList.add('hidden')
        }, 100);

        enemyHealth -= 1
        if (!enemyHealth) {
            enemy.remove()
            clearInterval(enemyInterval)

            score += 1
            document.querySelector('.earned').innerHTML = Math.round(score * cfData[localStorage.getItem('chosen_berry_ios')] * (1.25 + level * 0.25))
        }
    }
}

function play() {
    playing = true

    let timeLeft = 60

    let gameInterval = setInterval(() => {
        timeLeft -= 10
        document.querySelector('.time').innerHTML = timeLeft

        if (!timeLeft) {
            clearInterval(gameInterval)
            gameOver()
            return
        }

        getEnemy()
    }, 1000);
}

function gameOver() {
    playing = false

    let prize = Math.round(score * cfData[localStorage.getItem('chosen_berry_ios')] * (1.25 + level * 0.25))

    warning.querySelector('.amount_money').innerHTML = prize

    changeBalance(prize)
    animateOnce('.balance')

    warning.style.left = '50%'
}

