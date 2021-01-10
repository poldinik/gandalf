var eventSource = new EventSource("http://localhost:8888/api/v1/projects/1/listen");
eventSource.onmessage = function (event) {
    var container = document.getElementById("container");
    var paragraph = document.createElement("p");
    paragraph.innerHTML = event.data;
    container.appendChild(paragraph);
};