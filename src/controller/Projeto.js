import { openDb } from "../configDB.js";

export async function createTable(req, res) {
    openDb()
    .then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Projeto (id INTEGER PRIMARY KEY, identificacao INTEGER, descricao varchar[200], aplicacao varchar[100], nivel INTEGER, contingencia varchar[100], copiado varchar[100])');
    })

    res.json({
        "statusCode": 200
    });
}

export async function insertProjeto(req, res) {

    const projeto = req.body;
    console.log(projeto)

    openDb()
    .then(db => {
        db.run('INSERT INTO Projeto (identificacao, descricao, aplicacao, nivel, contingencia, copiado) VALUES(?, ?, ?, ?, ?, ?)',
        [projeto.ident, projeto.desc, projeto.apli, projeto.nivel, projeto.cont, projeto.copiado]);
    })

    res.json({
        "statusCode": 200
    })
}

export async function selectProjetos(req, res) {
    openDb()
    .then(db => db.all('SELECT * FROM Projeto'))
    .then(db => res.json(db))
}

export async function selectProjeto(req, res) {
    const id = req.params.id
    openDb()
    .then(db => db.get('SELECT * FROM Projeto WHERE id=?', [id]))
    .then(db => res.json(db))
}

export async function searchProjeto(req, res) {
    const pesquisa = req.query.search;

    openDb()
    .then(db => db.all('SELECT * FROM Projeto WHERE descricao LIKE ? OR identificacao = ?',
    ['%' + pesquisa + '%', pesquisa]))

    .then(db => res.json(db))

}

export async function updateProjeto(req, res) {
    const id = req.params.id;
    const projeto = req.body;
    openDb()
    .then(db => db.run('UPDATE Projeto SET identificacao=?, descricao=?, aplicacao=?, nivel=?, contingencia=?, copiado=? WHERE id=?',
    [projeto.ident, projeto.desc, projeto.apli, projeto.nivel, projeto.cont, projeto.copiado, id]));

    res.json({
        "statusCode": 200
    });
}

export async function deleteProjeto(req, res) {
    const id = req.params.id;
    openDb()
    .then(db => db.run('DELETE FROM Projeto WHERE id=?', [id]));

    res.json({
        "statusCode": 200
    })
}
