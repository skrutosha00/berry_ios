import { setBalanceField } from './functions.js'

let volumeCont = document.querySelector('.volume_cont')

let volume = false
let audio = new Audio()
audio.src = '../audio/main.mp3'
audio.loop = true

for (let i = 0; i < 4; i++) {
    let level = document.createElement('a')
    level.href = './game.html'
    level.classList.add('level')
    level.innerHTML = i + 1

    level.onclick = () => {
        localStorage.setItem('level_berry_ios', i + 1)
    }

    document.querySelector('.level_cont').appendChild(level)
}

let avatarPic = document.createElement('img')
avatarPic.src = '../png/avatar_' + (localStorage.getItem('avatar_berry_ios') ?? 1) + '.png'
avatarPic.classList.add('avatar_pic')
document.querySelector('.wrapper').appendChild(avatarPic)

setBalanceField()

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