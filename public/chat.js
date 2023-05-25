const socket = io(`localhost:8000`);
let user = null

socket.on('update_messages', (messages) => {
    updateMessagesOnScreen(messages)
})

const div_messages = document.querySelector('#messages')
const form = document.querySelector('#message_form')
const userForm = document.querySelector('#user_form')
function updateMessagesOnScreen(messages) {
    console.log(document.querySelector('#message').value)

    let list_messages = ''
    messages.forEach(message => {
        if (message.msg === '') {
            return
        } else {
            list_messages += `<ul id=${message.user} ><li class='message'><span class=${message.user.replace(/ /g, '-')}>${message.user} : </span>${message.msg}</li></ul>`
        }
    })
    div_messages.innerHTML = list_messages
    const us = document.querySelectorAll(`.${user.replace(/ /g, '-')}`)
    us.forEach((span) => {
        span.parentNode.parentNode.style.alignItems = 'flex-end'
    })
    var scroll = document.querySelector('#messages');
    scroll.scrollTop = scroll.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    div_messages.style.display = 'none'
    form.style.display = 'none'
    form.addEventListener('keydown', (k) => {
        const date = new Date()
        const newDate = `${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`
        if (k.key === 'Enter' && document.querySelector('#message').value !== '') {
            const message = `${document.forms['message_form_name']['msg'].value} <p><span id="time">${newDate}<span></p>`
            document.forms['message_form_name']['msg'].value = ''
            socket.emit('new_message', { user: user, msg: `${message}` })
        }
    })

    form.addEventListener('submit', (e) => {
        const date = new Date()
        const newDate = `${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`
        e.preventDefault()
        if (!user) {
            alert('Informe seu nome')
            return
        }
        const message = `${document.forms['message_form_name']['msg'].value} <p id="time">${newDate}</p>`
        document.forms['message_form_name']['msg'].value = ''
        socket.emit('new_message', { user: user, msg: message })
    })

    userForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const us = document.querySelectorAll(`.${e.target[0].value.replace(/ /g, '-')}`)
        us.forEach((span) => {
            span.parentNode.parentNode.style.alignItems = 'flex-end'
        })
        user = document.forms['user_form_name']['user'].value;

        if (user === '') {
            alert('Informe seu nome')
        } else {
            div_messages.style.display = 'flex'
            form.style.display = 'flex'
            userForm.parentNode.removeChild(userForm)
        }
    })
})