let input = document.querySelector('input')

let volume = false
let audio = new Audio()
audio.src = '../audio/main.mp3'
audio.loop = true

let names = ['VERYPERRY', 'CHERRY-B', 'KRUMAN']

if (!localStorage.getItem('balance_berry_ios')) {
    localStorage.setItem('balance_berry_ios', 5000)
}

if (!localStorage.getItem('hammer_berry_ios')) {
    localStorage.setItem('hammer_berry_ios', 1)
}

if (!localStorage.getItem('chosen_berry_ios')) {
    localStorage.setItem('chosen_berry_ios', 'hammer')
}

let volumeCont = document.querySelector('.volume_cont')

for (let i = 0; i < 3; i++) {
    let avatarCard = document.createElement('div')
    avatarCard.classList.add('avatar_card')

    let avatarPicCont = document.createElement('div')
    avatarPicCont.classList.add('avatar', 'block')

    let avatarPic = document.createElement('img')
    avatarPic.src = '../png/avatar_' + (i + 1) + '.png'

    avatarPicCont.appendChild(avatarPic)

    if (localStorage.getItem('avatar_berry_ios') == i + 1) {
        avatarPicCont.classList.add('chosen')
    }

    let nameCont = document.createElement('div')
    nameCont.classList.add('name', 'block')
    nameCont.innerHTML = names[i]

    avatarCard.append(avatarPicCont, nameCont)
    document.querySelector('.avatar_cont').appendChild(avatarCard)

    nameCont.onclick = () => {
        for (let av of document.querySelectorAll('.avatar')) {
            av.classList.remove('chosen')
        }

        nameCont.previousElementSibling.classList.add('chosen')
        localStorage.setItem('avatar_berry_ios', i + 1)
    }
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