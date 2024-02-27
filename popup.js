document.addEventListener('DOMContentLoaded', function() {
    var timerElement = document.getElementById('timer');
    var startStopButton = document.getElementById('startstop');

    startStopButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({ action: 'startOrStop' });
    });

    chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
        if (request.action === 'timeShow') {
            timerElement.innerText = request.time;
            startStopButton.innerText = request.buttonText;
        } else if (request.action === 'refreshPage') {
            var [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: refreshPage,
            });
        }
    });
});
function refreshPage(){
    document.location.reload();
}