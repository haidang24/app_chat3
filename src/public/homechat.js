//set up app

function setup_default_time() {
    var set_time = document.querySelectorAll('span')
    var default_time = new Date()
    for (let i in set_time) {
        set_time[i].textContent = `${default_time.getHours()}h : ${default_time.getMinutes()}p`
    }
}
//set up for socketio
var click = document.querySelector("Button")
var input = document.querySelector("input")
var form = document.querySelector('form')
var socket = io()
//send data to server

function send_data(click, input, socket, form, Name) {
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        ///
        //
        if (input.value) {
            var str = input.value
            var str2 = str.trim()
            if (str2.length != 0) {
                //show data
                var live_time = new Date()
                var chat_box = document.querySelector('.messages')

                const chat = document.createElement('div')//create div

                chat.classList.add('message')//apend class
                chat.classList.add('received')

                chat_box.appendChild(chat) //append div
                var item = document.createElement('p')
                item.textContent = `${input.value}`
                item.classList.add('chat-text2')
                chat.appendChild(item)
                const span = document.createElement('span')
                span.classList.add('time-default')
                span.textContent = `${live_time.getHours()}h: ${live_time.getMinutes()}`
                chat.appendChild(span)
                chat_box.scrollTop = chat_box.scrollHeight
                //send data
                socket.emit('chat_message', [input.value, live_time.getMinutes(), live_time.getHours(), Name])
                input.value = ''
            }
        }

    })
}

//get data from server

function get_data(socket, Name) {
    socket.on('chat_message', ([data, minute, hours, id]) => {
        if (Name != id) {
            var chat_box = document.querySelector('.messages')

            const chat = document.createElement('div')//create div

            chat.classList.add('message')//apend class
            chat.classList.add('received')

            chat_box.appendChild(chat) //append div
            var item = document.createElement('p')
            item.textContent = `${id}: ${data}`
            item.classList.add('chat-text')
            chat.appendChild(item)
            const span = document.createElement('span')
            span.classList.add('time')
            span.textContent = `${hours}h : ${minute}p`
            chat.appendChild(span)
            chat_box.scrollTop = chat_box.scrollHeight
        }
    })
}
function main() {
    Name = prompt(` Hello\n What Your Name: `)
    alert(`Xin chào ${Name}\nBây giờ bạn có thể bắt đầu chat`)
    setup_default_time()
    send_data(click, input, socket, form, Name)
    get_data(socket, Name)
}

main()




