document.addEventListener('DOMContentLoaded', () => {
  const ul = document.getElementById('url-list');
  const salvarBtn = document.getElementById('salvar-btn');
  let urls = [];

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      urls.push(tab.url);
      const li = document.createElement('li');
      li.textContent = tab.url;
      ul.appendChild(li);
    });
  });

  salvarBtn.addEventListener('click', () => {
    const blob = new Blob([urls.join('\n')], { type: 'text/plain' });
    const urlBlob = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = urlBlob;
    a.download = 'abas_abertas.txt';
    a.click();

    URL.revokeObjectURL(urlBlob);
  });
});
