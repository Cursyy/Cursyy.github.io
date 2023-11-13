let todolist = [];
let tododone = [];
let list = todolist;
const todolistNode = document.querySelector('.js_todolist');
const inputNode = document.querySelector('.js_input');
const btnNode = document.querySelector('.add_btn');
const donebtnNode = document.querySelector('.done_btn_list');
donebtnNode.innerHTML = `DONE`;
inputNode.focus();

function add(text) {
    const todoitem = {
        text,
        status: false,
        id: `${Math.random()}`
    }
    todolist.push(todoitem);
};

function remove(id) {
    todolist.forEach(todoitem => {
        if (todoitem.id === id) {
            todoitem.status = true;
            tododone.push(todoitem);
        };
    });
};

function output(list) {
    let html = '';
    if (list === todolist) {
        todolist.forEach(todoitem => {
            if (todoitem.status === true) {
                return;
            };
            html +=
                `
                <div class="todoitem"><button class="done_btn" data-id='${todoitem.id}'></button><div class="todoItemText">${todoitem.text}</div></div>
            `;
        });
    }
    else {
        tododone.forEach(todoitem => {
            if (todoitem.status === false) {
                return;
            }
            html +=
                `
            <div class="doneitem">${todoitem.text}</div>
        `;
        })
    }
    todolistNode.innerHTML = html;
    editing();
};

btnNode.addEventListener('click', () => {
    const text = inputNode.value;
    inputNode.placeholder = '';
    if (text === '') {
        inputNode.placeholder = 'Please type something';
        return;
    };

    add(text);
    output(list);
    inputNode.value = '';
    inputNode.focus();
});

todolistNode.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
        return;
    };
    const id = event.target.dataset.id;
    remove(id);
    output(list);
});

donebtnNode.addEventListener('click', () => {
    if (document.getElementById('switch_list').classList.contains('done_btn_list')) {
        list = tododone;
        document.getElementById('switch_list').classList.remove('done_btn_list');
        document.getElementById('switch_list').classList.add('todo_btn_list');
        donebtnNode.innerHTML = `TO DO`;
    }
    else {
        list = todolist;
        document.getElementById('switch_list').classList.remove('todo_btn_list');
        document.getElementById('switch_list').classList.add('done_btn_list');
        donebtnNode.innerHTML = `DONE`;
    }
    output(list);
});

function editing(){
    document.querySelectorAll('.todoItemText').forEach(todoitem => {
        todoitem.addEventListener('click', () => {
            const text = todoitem.textContent;
            const input = document.createElement('input');
            input.value = text;
            todoitem.textContent = '';
            todoitem.appendChild(input);
            input.focus();
            input.addEventListener('blur', () => {
                const text = input.value;
                todoitem.innerHTML = text;
            });
        });
    });
}