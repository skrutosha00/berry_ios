import { setBalanceField } from './functions.js'

let volumeCont = document.querySelector('.volume_cont')
let wrapper = document.querySelector('.wrapper')

let levels = localStorage.getItem('levels_berry_ios').split(',')

let imageLinks = ['../png/enemy_1.gif', '../png/enemy_2.gif', '../png/enemy_3.gif', '../png/enemy_4.gif', '../png/coins.gif', '../png/hammer.png', '../png/axe.png', '../png/hammer_2.png', '../png/gun.png']

let volume = false
let audio = new Audio()
audio.src = '../audio/main.mp3'
audio.loop = true

preloadImages(imageLinks)

for (let i = 0; i < 4; i++) {
    let level = document.createElement('a')

    if (levels.includes(String(i + 1))) {
        level.href = './game.html'
    } else {
        level.classList.add('disabled')
    }

    level.classList.add('level', 'block')
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

wrapper.classList.remove('hidden')

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

function preloadImages(srcs) {
    if (!preloadImages.cache) {
        preloadImages.cache = [];
    }
    let img;
    for (let i = 0; i < srcs.length; i++) {
        img = new Image();
        img.src = srcs[i];
        preloadImages.cache.push(img);
    }
}
