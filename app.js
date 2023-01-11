const express = require('express');
const mongoose = require('mongoose');
const urlCurta = require('./models/urlCurta')
const app = express();

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const urlsCurtas = await urlCurta.find();
    res.render('index', { urlsCurtas: urlsCurtas });
});

app.post('/urlsEncurtadas', async (req, res) => {
    await urlCurta.create({ completa: req.body.urlCompleta });
    res.redirect('/');
});

app.get('/:urlCurta', async (req, res) => {
    const urlEncurtada = await urlCurta.findOne({ curta: req.params.urlCurta });
    if (urlEncurtada == null) return res.sendStatus(404);

    urlEncurtada.cliques++;
    urlEncurtada.save();

    res.redirect(urlEncurtada.completa);
});

app.listen(process.env.PORT || 5000)