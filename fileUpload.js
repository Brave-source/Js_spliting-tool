import { processCSV } from './fileProcessing.js';

// Add an event listener to handle file upload when the user selects a file
document.getElementById('csvFileInput').addEventListener('change', handleFileUpload);

// Function to handle the file upload event
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
        document.getElementById('status').innerText = 'Status: File uploaded, processing...';
        // Reset progress bar
        document.getElementById('progress-bar').value = 0;  
        // Pass updateProgress as a callback to processCSV
        processCSV(file, updateProgress);  
    } else {
        alert('Please upload a valid CSV file.');
    }
}

// Function to update the progress bar
function updateProgress(percentage) {
    document.getElementById('progress-bar').value = percentage;
}