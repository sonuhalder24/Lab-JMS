var stompClient = null;

function openNotifications() {
    var panel = document.getElementById('notification-panel');
    panel.style.display = (panel.style.display === 'none' || panel.style.display === '') ? 'block' : 'none';
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
        stompClient = null;
    }
}

function sendMR(username) {
    var receiverUsername = document.getElementById('receiver-username').value;
    if (!receiverUsername) return;
    var mr = {
        reqFrom: username,
        reqTo: receiverUsername,
        repoId: 0,
        version: 0
    };
    if (stompClient && stompClient.connected) {
        stompClient.send('/app/queue/sendMR', {}, JSON.stringify(mr));
    }
}

function showMessageOutput(messageOutput) {
    addNotifications(messageOutput);
}

function addNotifications(data) {
    var panel = document.getElementById('notification-panel');
    var item = document.createElement('div');
    item.style.padding = '5px';
    item.style.borderBottom = '1px solid #ccc';
    item.textContent = 'Merge request from: ' + (data.reqFrom || 'unknown');
    panel.appendChild(item);
}

function getNotifications() {
    fetch('/dashboard/getmergerequests')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (Array.isArray(data)) {
                data.forEach(function(mr) { addNotifications(mr); });
            }
        })
        .catch(function(e) {});
}

function MRAction(repoId, version, flag) {
    fetch('/dashboard/mraction/' + repoId + '/' + version + '/' + flag)
        .then(function(r) { return r.json(); })
        .then(function(result) { if (result) location.reload(); })
        .catch(function(e) {});
}

function connect() {
    var socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, function(frame) {
        stompClient.subscribe('/user/queue/receiveMR', function(message) {
            showMessageOutput(JSON.parse(message.body));
        });
        getNotifications();
    }, function(error) {
        console.log('WebSocket error: ' + error);
    });
}

window.onload = function() {
    connect();
};
