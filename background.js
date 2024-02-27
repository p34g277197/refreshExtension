var timerRunning = false;
var countdown;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'startOrStop') {
        if (timerRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }
});
function startTimer() {
    timerRunning = true;
    var time = 60;
    countdown = setInterval(function() {
        time--;
        if (time < 0) {
            chrome.runtime.sendMessage({ action: 'refreshPage' });
            time = 60;
        } else {
            updatePopup(time, 'Stop');
        }
    }, 1000);
}
function stopTimer() {
    timerRunning = false;
    clearInterval(countdown);
    updatePopup(60, 'Start');
}
function updatePopup(time, buttonText) {
    chrome.runtime.sendMessage({ action: 'timeShow', time: time, buttonText: buttonText });
}