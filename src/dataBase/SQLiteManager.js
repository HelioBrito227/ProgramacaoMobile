import * as SQLite from 'expo-sqlite';

export const initDB = async () => {
    const db = await SQLite.openDatabaseAsync('BancoDeProjetos');
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS projetos(
            id INTEGER PRIMARY KEY NOT NULL,
            nome_cliente VARCHAR(50),
            data_orcamento DATE,
            custo REAL,
            prazo VARCHAR(15)
        );
        CREATE TABLE IF NOT EXISTS variavel(
            id INTEGER PRIMARY KEY NOT NULL,
            custo_dia_obra REAL
        );
        `);
    db.closeAsync();
};

export const createProjeto = async (nome_cliente, data_orcamento, custo, prazo) => {
    const db = await SQLite.openDatabaseAsync('BancoDeProjetos');
    await db.runAsync('INSERT INTO projetos (nome_cliente, data_orcamento, custo, prazo) VALUES (?,?,?,?);',
        [nome_cliente, data_orcamento, custo, prazo]);
};

export const getProjetos = async () => {
    const db = await SQLite.openDatabaseAsync('BancoDeProjetos');

    return new Promise(async (resolve, reject) => {
        try {
            const projetos = await db.getAllAsync('SELECT * FROM projetos');
            if (projetos.length > 0) {
                resolve(projetos);
            } else {
                resolve([]);
            }
        } catch (error) {
            console.log("Erro ao buscar os Projetos: " + error);
            reject(error);
        }
    });
};

export const getProjeto = async (id) => {
    const db = await SQLite.openDatabaseAsync('BancoDeProjetos');
    return new Promise(async (resolve, reject) => {
        try {
            const projeto = await db.getFirstAsync('SELECT * FROM projetos WHERE id = ?;', (id));
            if (projeto) {
                resolve(projeto);
            } else {
                resolve([]);
            }
        } catch (error) {
            console.log("Erro ao buscar Projeto " + error);
            reject(error);
        }
    });
};

export const updateProjeto = async (id, nome_cliente, data_orcamento, custo, prazo) => {
    const db = await SQLite.openDatabaseAsync('BancoDeProjetos');
    db.runAsync(
        'UPDATE projetos SET nome_cliente = ?, data_orcamento = ?, custo = ?, prazo = ? WHERE ID = ?;',
        [nome_cliente, data_orcamento, custo, prazo, id]
    );
};

export const obterUltimoIdProjetos = async () => {
    const db = await SQLite.openDatabaseAsync('BancoDeProjetos');

    return new Promise(async (resolve, reject) => {
        try {
            const ultimoId = await db.getAllAsync('SELECT * from variavel;');
            if (ultimoId.length > 0) {
                resolve(ultimoId.length);
            } else {
                reject("Nenhum ID encontrado");
            }
        } catch (error) {
        }
    });
};

export const createVariavel = async (custo_dia_obra) => {

    const db = await SQLite.openDatabaseAsync('BancoDeProjetos');
    await db.runAsync('INSERT INTO variavel (custo_dia_obra) VALUES (?);',
        [custo_dia_obra]);
}

export const getVariavel = async (id) => {
    const db = await SQLite.openDatabaseAsync('BancoDeProjetos');

    return new Promise(async (resolve, reject) => {
        try {
            const variavel = await db.getAllAsync('SELECT * FROM variavel WHERE id = ?;', (id));
            if (variavel.length > 0) {
                resolve(variavel);
            } else {
                resolve([]);
            }
        } catch (error) {
            console.log("Erro ao buscar a Variavel " + error);
            reject(error);
        }
    });
};

export const obterUltimoIdVariaveis = async () => {
    const db = await SQLite.openDatabaseAsync('BancoDeProjetos');
    return new Promise(async (resolve, reject) => {
        try {
            const ultimoId = await db.getAllAsync('SELECT * from variavel');
            if (ultimoId.length > 0) {
                resolve(ultimoId.length);
            } else {
                reject("Nenhum ID encontrado");
            }
        } catch (error) {
        }
    });
};
