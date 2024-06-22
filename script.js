const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.post('/api/siralamaHesapla', (req, res) => {
    let data = req.body;

    let tytPuan = data.turkce * 3.3 + data.matematik * 3.3 + data.fen * 3.4 + data.sosyal * 3.4;
    let aytPuan = data.aytMatematik * 3.0 + data.aytFizik * 2.8 + data.aytKimya * 2.7 + data.aytBiyoloji * 2.6;
    let hamPuan = tytPuan + aytPuan + (data.obp / 100) * 60;

    fs.readFile('./siralamaData.json', (err, jsonData) => {
        if (err) {
            res.status(500).send("Veri okunamadı.");
            return;
        }
        let siralamaData = JSON.parse(jsonData);
        let siralama2023 = Math.round((siralamaData['2023'].basePuan - hamPuan) * siralamaData['2023'].multiplier);
        let siralama2022 = Math.round((siralamaData['2022'].basePuan - hamPuan) * siralamaData['2022'].multiplier);
        let siralama2021 = Math.round((siralamaData['2021'].basePuan - hamPuan) * siralamaData['2021'].multiplier);
        let siralama2020 = Math.round((siralamaData['2020'].basePuan - hamPuan) * siralamaData['2020'].multiplier);

        res.json({
            siralama2023: siralama2023,
            siralama2022: siralama2022,
            siralama2021: siralama2021,
            siralama2020: siralama2020
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
