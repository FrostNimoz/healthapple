const dialog = document.querySelector('#dialog');
document.querySelector('#config').addEventListener('click', () => dialog.showModal());
document.querySelector('.save').addEventListener('click', () => { document.querySelector('#bpm').textContent = document.querySelector('#heart').value || '68'; });
document.querySelector('.arrow.left').addEventListener('click', () => document.querySelector('.vessels').style.transform = 'scaleX(-1)');
document.querySelector('.arrow.right').addEventListener('click', () => document.querySelector('.vessels').style.transform = 'scaleX(1)');
