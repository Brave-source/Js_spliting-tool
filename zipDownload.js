export function createZipAndDownload(zip, originalFileName) {
    zip.generateAsync({ type: 'blob' }).then((content) => {
        const url = URL.createObjectURL(content);
        const filename = `${originalFileName.replace('.csv', '')}_part${i + 1}.csv`;
        const downloadLink = `<a href="${url}" download="${filename}">Download ${filename}</a><br>`;
        document.getElementById('status').innerText = 'Status: Processing complete!';
        document.getElementById('downloadLinks').innerHTML = downloadLink;
    });
}
