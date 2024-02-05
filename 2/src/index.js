const url = 'https://graphqlzero.almansi.me/api';

const addForm = document.forms.addtask;
const searchForm = document.forms.findtask;
const todos = document.getElementById('todos');

const makeRequest = (query) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }).then((res) => res.json());
};

function printTodo({ title, completed = false, id = '', user = {} }) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  li.innerHTML = `&nbsp; ${title} | ID: ${id} | by <b>${user.name}</b>`;
  li.setAttribute('data-id', id);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  if (completed) {
    checkbox.setAttribute('checked', 'true');
  }
  //   checkbox.addEventListener("change", handleTodoStatus);
  li.prepend(checkbox);

  const del = document.createElement('button');
  del.className = 'btn btn-link mb-1';
  del.innerHTML = '&times;';
  //   del.addEventListener("click", handleDeleteTodo);
  li.append(del);

  todos.prepend(li);
}

makeRequest(`query Totdos {
    todos {
      data {
        id
        title
        completed
        user {
          name
          address {
            city
          }
        }
      }
    }
  }
  `).then(console.log);
