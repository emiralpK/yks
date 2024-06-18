document.getElementById('siralamaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let turkce = parseFloat(document.getElementById('turkce').value);
    let matematik = parseFloat(document.getElementById('matematik').value);
    let fen = parseFloat(document.getElementById('fen').value);
    let sosyal = parseFloat(document.getElementById('sosyal').value);
    let obp = parseFloat(document.getElementById('obp').value);

    let siralama = hesaplaSiralama(turkce, matematik, fen, sosyal, obp);
    let oncekiYilSiralama = hesaplaOncekiYilSiralama(turkce, matematik, fen, sosyal, obp);

    document.getElementById('sonuc').innerHTML = `
        <p>Tahmini Sıralamanız: ${siralama}</p>
        <p>Geçen Yıl Tahmini Sıralamanız: ${oncekiYilSiralama}</p>
    `;
});

function hesaplaSiralama(turkce, matematik, fen, sosyal, obp) {
    let tytPuan = turkce * 3.3 + matematik * 3.3 + fen * 3.4 + sosyal * 3.4;
    let hamPuan = tytPuan + (obp / 100) * 60;
    let siralama = Math.round((500 - hamPuan) * 200); // Basit bir hesaplama örneği

    return siralama;
}

function hesaplaOncekiYilSiralama(turkce, matematik, fen, sosyal, obp) {
    let tytPuan = turkce * 3.2 + matematik * 3.2 + fen * 3.3 + sosyal * 3.3;
    let hamPuan = tytPuan + (obp / 100) * 60;
    let siralama = Math.round((500 - hamPuan) * 210); // Basit bir hesaplama örneği

    return siralama;
}
