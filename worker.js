// worker.js
self.addEventListener('message', function(event) {
    if (event.data.type === 'processTranscription') {
        // Process the transcription data
        console.log('Transcription in worker:', event.data.data);

        // Post results or updates back to the main thread
        self.postMessage('Processing completed for: ' + event.data.data);
    }
});
