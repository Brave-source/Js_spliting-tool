export async function processCSV(file, updateProgress) {
    // Number of rows per chunk
    const CHUNK_SIZE = 25_000;
    const reader = new FileReader();

    reader.onload = async (e) => {
        const content = e.target.result;
        const rows = content.split('\n');
         // Assumes first row is the header
        const header = rows[0];
        const totalRows = rows.length - 1;
        const numChunks = Math.ceil(totalRows / CHUNK_SIZE);
        let downloadLinks = '';

        for (let i = 0; i < numChunks; i++) {
            const chunk = [header].concat(rows.slice(i * CHUNK_SIZE + 1, (i + 1) * CHUNK_SIZE + 1)).join('\n');
            const blob = new Blob([chunk], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const filename = `${file.name.replace('.csv', '')}_part${i + 1}.csv`;

            downloadLinks += `<a href="${url}" download="${filename}">Download ${filename}</a><br>`;

            // Calculate and update progress
            const progress = Math.round(((i + 1) / numChunks) * 100);
            updateProgress(progress);
        }

        document.getElementById('status').innerText = 'Status: Processing complete!';
        document.getElementById('downloadLinks').innerHTML = downloadLinks;
    };

    reader.readAsText(file);
}