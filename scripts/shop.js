import { setBalanceField, changeBalance, animateOnce } from './functions.js'

setBalanceField()

let volume = false
let audio = new Audio()
audio.src = '../audio/main.mp3'
audio.loop = true

let balance = document.querySelector('.balance')
let shop = document.querySelector('.shop')
let volumeCont = document.querySelector('.volume_cont')

let names = ['VERYPERRY', 'CHERRY-B', 'KRUMAN']
let items = [
    { name: "hammer", price: 0, cf: 1 },
    { name: "axe", price: 850, cf: 2 },
    { name: "hammer_2", price: 1000, cf: 3 },
    { name: "gun", price: 1500, cf: 4 }
]

for (let item of items) {
    let itemCont = document.createElement('div')
    itemCont.classList.add('item')

    let cf = document.createElement('div')
    cf.innerHTML = item.cf + ' times more money'
    cf.classList.add('cf')

    let picCont = document.createElement('div')
    picCont.classList.add('pic', 'block')
    if (localStorage.getItem('chosen_berry_ios') == item.name) {
        picCont.classList.add('chosen')
    }

    let img = document.createElement('img')
    img.src = '../png/' + item.name + '.png'
    picCont.appendChild(img)

    let button = document.createElement('div')
    button.dataset.name = item.name
    button.classList.add('button', 'block')
    button.innerHTML = Number(localStorage.getItem(item.name + '_berry_ios')) ? 'SELECT' : item.price

    button.onclick = () => {
        if (Number(localStorage.getItem(item.name + '_berry_ios'))) {
            chooseItem(button)
        } else {
            if (Number(balance.innerHTML) < item.price) {
                animateOnce('.balance')
                return
            }

            changeBalance(-item.price)
            localStorage.setItem(item.name + '_berry_ios', 1)
            chooseItem(button)
            button.innerHTML = 'SELECT'
        }
    }

    itemCont.append(cf, picCont, button)
    shop.appendChild(itemCont)
}

document.querySelector('.avatar_name').innerHTML = names[Number(localStorage.getItem('avatar_berry_ios')) - 1]

let avatarPic = document.createElement('img')
avatarPic.src = '../png/avatar_' + (localStorage.getItem('avatar_berry_ios') ?? 1) + '.png'
document.querySelector('.avatar').appendChild(avatarPic)

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

function chooseItem(button) {
    for (let item of document.querySelectorAll('.pic')) {
        item.classList.remove('chosen')
    }

    button.previousElementSibling.classList.add('chosen')
    localStorage.setItem('chosen_berry_ios', button.dataset.name)
}