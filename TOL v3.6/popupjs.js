const queryArea = document.getElementById('query-area');
const submitButton = document.getElementById('submit-query');
const llmResponse = document.getElementById('llm-response');
let userTokens = 0;
let claudeTokens = 0;
const totalLimit = 8000;

function countTokens(text) {
    return text.split(/\s+/).length;
}

function updateTokenDisplays() {
    const totalTokens = userTokens + claudeTokens;
    const remainingTokens = totalLimit - totalTokens;

    document.querySelector('#token-counters .token-counter:nth-child(1) .percentage').textContent = 
        `${((userTokens / totalLimit) * 100).toFixed(1)}%`;
    document.querySelector('#token-counters .token-counter:nth-child(1) .count').textContent = userTokens;

    document.querySelector('#token-counters .token-counter:nth-child(2) .percentage').textContent = 
        `${((claudeTokens / totalLimit) * 100).toFixed(1)}%`;
    document.querySelector('#token-counters .token-counter:nth-child(2) .count').textContent = claudeTokens;

    document.querySelector('#token-counters .token-counter:nth-child(3) .percentage').textContent = 
        `${((totalTokens / totalLimit) * 100).toFixed(1)}%`;
    document.querySelector('#token-counters .token-counter:nth-child(3) .count').textContent = totalTokens;

    document.querySelector('#token-counters .token-counter:nth-child(4) .percentage').textContent = 
        `${((remainingTokens / totalLimit) * 100).toFixed(1)}%`;
    document.querySelector('#token-counters .token-counter:nth-child(4) .count').textContent = remainingTokens;

    if (totalTokens >= 0.9 * totalLimit) {
        document.getElementById('popup-90').style.display = 'block';
    }

    if (totalTokens >= totalLimit) {
        showSummary();
    }
}

function updateTokenPreview(text) {
    const tokenCount = countTokens(text);
    document.getElementById('preview-count').textContent = tokenCount;
}

function showSummary() {
    const summary = "This is a placeholder for the chat summary.";
    document.getElementById('summary-content').textContent = summary;
    document.getElementById('popup-summary').style.display = 'block';
}

document.getElementById('summarize-yes').addEventListener('click', () => {
    showSummary();
    document.getElementById('popup-90').style.display = 'none';
});

document.getElementById('summarize-no').addEventListener('click', () => {
    document.getElementById('popup-90').style.display = 'none';
});

document.getElementById('close-summary').addEventListener('click', () => {
    document.getElementById('popup-summary').style.display = 'none';
});

queryArea.addEventListener('input', (e) => {
    updateTokenPreview(e.target.value);
});

submitButton.addEventListener('click', () => {
    userTokens = countTokens(queryArea.value);
    
    const sampleResponse = "Sample Response: This is a placeholder for the LLM's response.";
    llmResponse.textContent = sampleResponse;
    
    claudeTokens = countTokens(sampleResponse);
    
    updateTokenDisplays();
});

updateTokenDisplays();