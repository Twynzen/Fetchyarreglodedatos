let list = [];

fetch("https://jsonplaceholder.typicode.com/todos")
  .then(response => response.json())
  .then(json => {
    const main = document.getElementById("app");
    const list = document.createElement("ul");
    list.classList.add("list-group");

    const pagination = document.getElementById("pagination");

    const paginated = _.chunk(json, 10);
    const hash = Number(location.hash.substr(1));

    paginated.map((el, index) => {
      const li = document.createElement("li");
      li.classList.add("page-item");

      const a = document.createElement("a");
      a.href = `#${index + 1}`;
      a.classList.add("page-link");
      a.innerText = index + 1;

      li.appendChild(a);

      li.addEventListener("click", () => {
        list.innerHTML = "";
        elementList(list, el);
      });

      pagination.appendChild(li);
    });

    elementList(list, paginated[0]);

    const next = document.createElement("li");
    next.classList.add("page-item");
    const a = document.createElement("a");
    a.classList.add("page-link");
    a.innerText = "Next";
    next.appendChild(a);
    pagination.appendChild(next);

    main.appendChild(list);
  });

function elementList(ul, list) {
  list.map(todo => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerText = todo.title;

    ul.appendChild(li);
  });
}
