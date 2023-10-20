const btn = document.getElementById('change_btn');
let titles = document.getElementsByTagName('h2');
let paragraphs = document.getElementsByTagName('p');
let cells = document.getElementsByTagName('td');

btn.addEventListener('click', () => {
    for(let i = 1; i < 8; i+=3){
        cells[i].innerHTML = '';
        cells[i].appendChild(document.getElementById(i));
        cells[i-1].innerHTML = '';
        cells[i-1].appendChild(document.getElementById(i-1));
    }
})