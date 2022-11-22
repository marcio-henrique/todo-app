

document.addEventListener("DOMContentLoaded", function(e) {
    getAllTasks();
});

function getAllTasks() {
    const request = new XMLHttpRequest();

    request.open('GET', 'http://localhost:8000/tasks', true);

    request.onload = function ()
    {
        //returned data
        const data = JSON.parse(this.response);
        console.log(data);

    if (request.status >= 200 && request.status < 400)
    {
        //write html tags on javascript

        const tarefaContainer = document.getElementById('TarefaContainer');
        tarefaContainer.textContent = '';
        
        data.forEach(task => {
          
          const cardDiv = document.createElement('div');
          cardDiv.setAttribute('class', 'cardDiv');

          const rowcardDiv = document.createElement('div');
          rowcardDiv.setAttribute('class', 'row');

          const card = document.createElement('div');
          card.setAttribute('class', 'card col-11');

          const cardBody = document.createElement('div');
          cardBody.setAttribute('class', 'card-body');

          const rowCardBody = document.createElement('div');
          rowCardBody.setAttribute('class', 'row justify-content-between');

          const titlediv = document.createElement('div');
          titlediv.setAttribute('class', 'col-6');
          titlediv.textContent = task.title;

          const dateDiv = document.createElement('div');
          dateDiv.setAttribute('class', 'col-2');
          dateDiv.textContent = task.date;

          
          tarefaContainer.appendChild(cardDiv);
          cardDiv.appendChild(rowcardDiv);
          rowcardDiv.appendChild(card);
          card.appendChild(cardBody);
          cardBody.appendChild(rowCardBody);
          rowCardBody.appendChild(titlediv);
          rowCardBody.appendChild(dateDiv);

          
          const a = document.createElement('a');
          a.setAttribute('class', 'col-1 deleteIconButton');
          a.setAttribute('href', '#');
          a.setAttribute('data-bs-toggle', 'modal');
          a.setAttribute('data-bs-target', '#excluirTarefaModal');

          const span = document.createElement('span');
          span.setAttribute('class', 'material-symbols-outlined');
          span.textContent = 'do_not_disturb_on';

          a.appendChild(span);
          rowcardDiv.appendChild(a);
        });
    }
    else
    {
        console.log("Erro!");
    }
    }
    request.send();
}

function createTask() {
    const title = document.getElementById('floatingTitulo').value;
    const date = document.getElementById('floatingDate').value;

    console.log(title);
    console.log(date);

    const request = new XMLHttpRequest();

    

    request.open('POST', 'http://localhost:8000/tasks', true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


    request.onload = function ()
    {
        //returned data
        const data = JSON.parse(this.response);
        console.log(data);

        if (request.status >= 200 && request.status < 400)
        {
            console.log('ok');
            getAllTasks();

            let myModalEl = document.getElementById('novaTarefaModal');
            let modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();
        }
    }

    request.send("title=" + title + "&date=" + date);
}
function closeAllModals() {

    // get modals
    const modals = document.getElementsByClassName('modal');

    // on every modal change state like in hidden modal
    for(let i=0; i<modals.length; i++) {
      modals[i].classList.remove('show');
      modals[i].setAttribute('aria-hidden', 'true');
      modals[i].setAttribute('style', 'display: none');
    }

     // get modal backdrops
     const modalsBackdrops = document.getElementsByClassName('modal-backdrop');

     // remove every modal backdrop
     for(let i=0; i<modalsBackdrops.length; i++) {
       document.body.removeChild(modalsBackdrops[i]);
     }
  }

