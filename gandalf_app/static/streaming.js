var eventSource = new EventSource("http://localhost:8888/api/v1/projects/1/listen");
eventSource.onmessage = function (event) {
    var container = document.getElementById("container");
    var paragraph = document.createElement("p");
    paragraph.innerHTML = "Analisi con id: " + event.data + " completata!";
    container.appendChild(paragraph);

    var link = document.createElement("a");
    link.setAttribute("href", "http://localhost:8888/api/v1/projects/1/results/1")
    link.innerHTML = "Clicca qui per ottenere risultati (http://localhost:8888/api/v1/projects/1/results/1)"
    container.appendChild(link)
};