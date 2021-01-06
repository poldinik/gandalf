var eventSource = new EventSource("/sse/notification");
eventSource.onmessage = function (event) {
    var container = document.getElementById("container");
    var paragraph = document.createElement("p");
    paragraph.innerHTML = event.data;
    container.appendChild(paragraph);
};