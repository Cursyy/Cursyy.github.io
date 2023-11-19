document.addEventListener('DOMContentLoaded', () => {
    let todolist = JSON.parse(localStorage.getItem('todolist')) || [];
    let tododone = JSON.parse(localStorage.getItem('tododone')) || [];
    const todolistNode = document.querySelector('.js_todolist');
    const inputNode = document.querySelector('.js_input');
    const addBtnNode = document.querySelector('.add_btn');
    const donebtnNode = document.querySelector('.done_btn_list');
    donebtnNode.innerHTML = `DONE`;
    //inputNode.focus();
    let list = todolist;
    output(list);

    function add(text) {
        const todoitem = {
            text,
            status: false,
            id: `${Math.random()}`,
            time: `${new Date().toLocaleString()}`
        }
        todolist.push(todoitem);
        localStorage.setItem('todolist', JSON.stringify(todolist)); 
    };

    function remove(id) {
        todolist.forEach(todoitem => {
            if (todoitem.id == id) {
                todoitem.status = true;
                let index = todolist.indexOf(todoitem);
                delete todolist[index];
                tododone.push(todoitem);
            };
        });
        localStorage.setItem('todolist', JSON.stringify(todolist));
        localStorage.setItem('tododone', JSON.stringify(tododone));
        //inputNode.focus();
    };

    function output(list) {
        let html = '';
        if (list == todolist) {
            todolist.forEach(todoitem => {
                if (todoitem == null || todoitem.status == true) {
                    return;
                };
                html +=
                    `
                    <div class="todoitem" id='${todoitem.id}'><button class="done_btn"></button><div class="todoItemText">${todoitem.text}</div><button class="deleteBtn">X</button><div class="time">${todoitem.time}</div></div>
                `;
            });
        }else {
            tododone.forEach(todoitem => {
                if (todoitem.status == false) {
                    return;
                }
                html +=
                    `
                <div class="doneitem" id='${todoitem.id}'><div class="doneItemText">${todoitem.text}</div><button class="deleteBtn">X</button><div class="time">${todoitem.time}</div></div>
            `;
            })
        }
        todolistNode.innerHTML = html;
        editing();
    };

    addBtnNode.addEventListener('click', ()=>{
        addData();
    });
    inputNode.addEventListener('keydown', (event)=>{
        if(event.key == 'Enter'){
            addData();
        }
    })

    function addData(){
        const text = inputNode.value;
        inputNode.placeholder = '';
        if (text == '') {
            inputNode.placeholder = 'Please type something';
            return;
        };

        add(text);
        output(list);
        inputNode.value = '';
        //inputNode.focus();
    };

    todolistNode.addEventListener('click', (event) => {
        if (event.target.className == 'done_btn') {
            const id = event.target.parentNode.id;
            remove(id);
            output(list);
        }else if(event.target.className == 'deleteBtn'){
            const id = event.target.parentNode.id;
            let listToRemoveFrom;
            if (donebtnNode.textContent == 'DONE') {
                listToRemoveFrom = todolist;
            }else if(donebtnNode.textContent == 'TO DO'){
                listToRemoveFrom = tododone;
            }
            listToRemoveFrom.forEach(todoitem => {
                if(todoitem.id == id){
                    let index = listToRemoveFrom.indexOf(todoitem);
                    delete listToRemoveFrom[index];
                }
            });
            output(listToRemoveFrom); 
        }
        localStorage.setItem('todolist', JSON.stringify(todolist.filter(todoitem => todoitem !== null)));
        localStorage.setItem('tododone', JSON.stringify(tododone.filter(todoitem => todoitem !== null)));
        //inputNode.focus();
    });

    donebtnNode.addEventListener('click', () => {
        if (document.getElementById('switch_list').classList.contains('done_btn_list')) {
            list = tododone;
            document.getElementById('switch_list').classList.remove('done_btn_list');
            document.getElementById('switch_list').classList.add('todo_btn_list');
            donebtnNode.innerHTML = `TO DO`;
        }else {
            list = todolist;
            document.getElementById('switch_list').classList.remove('todo_btn_list');
            document.getElementById('switch_list').classList.add('done_btn_list');
            donebtnNode.innerHTML = `DONE`;
            //inputNode.focus();
        }
        addBtnNode.classList.toggle('hide')
        output(list);
    });

    function editing(){
        document.querySelectorAll('.todoItemText').forEach(todoitem => {
            todoitem.addEventListener('dblclick', () => {
                const parent = todoitem.parentNode;
                parent.firstChild.disabled = true;
                const id = todoitem.parentNode.id;
                const text = todoitem.textContent;
                const input = document.createElement('input');
                input.value = text;
                todoitem.textContent = '';
                todoitem.appendChild(input);
                input.focus();
                input.addEventListener('keydown', (event) => {
                    if (event.key == 'Enter') {
                        const text = input.value;
                        todoitem.innerHTML = text;
                        todolist.forEach(todoitem => {
                            if (todoitem.id == id) {
                                todoitem.text = text;
                            }
                        });
                        localStorage.setItem('todolist', JSON.stringify(todolist));
                        //inputNode.focus();
                        parent.firstChild.disabled = false;
                    }else if (event.key == 'Escape') {
                        todoitem.innerHTML = text;
                        //inputNode.focus();
                        parent.firstChild.disabled = false;
                    }
                });
            });
        });
    }
});