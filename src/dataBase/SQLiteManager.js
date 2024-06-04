import * as SQLite from 'expo-sqlite';
import { Tables } from './Schemas'

const database_name = "teste.db"

let db;

export const initDB = () => {
    db = SQLite.openDatabase(database_name);
    for (const table in Tables) {
        let fields = Tables[table];
        let sql = `CREATE TABLE IF NOT EXISTS ${table} (${fields.join(", ")});`;
        db.transaction(tx => {
            tx.executeSql(sql, [], (_, { rows }) =>
                console.log(`Tabela '${table}' criada com sucesso!!`)
            );
        });
    }
};

export const createProjeto = async (nome_cliente, data_orcamento, custo, prazo) => {
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Projetos (nome_cliente, data_orcamento, custo, prazo) VALUES (?,?,?,?);",
            [nome_cliente, data_orcamento, custo, prazo]
        );
    }, null, null);
}

export const getProjetos = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM projetos;", [], (_, { rows }) => {
                if (rows.length > 0) {
                    resolve(rows._array);
                } else {
                    resolve([]);
                }
            },
                (_, error) => {
                    console.log("Erro ao buscar os Projetos: " + error);
                    reject(error);
                });
        });
    });
};

export const getProjeto = async (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM projetos WHERE id =?", [id], (_, { rows }) => {
                if (rows.length > 0) {
                    resolve(rows._array[0]);
                } else {
                    resolve([]);
                }
            },
                (_, error) => {
                    console.log("Erro ao buscar as Projetos: " + error);
                    reject(error);
                });
        });
    });
};

export const updateProjeto = async (id, nome_cliente, data_orcamento, custo, prazo) => {
    db.transaction(tx => {
        tx.executeSql(
            "UPDATE projetos SET nome_cliente = ?, data_orcamento = ?, custo = ?, prazo = ? WHERE ID = ?;",
            [nome_cliente, data_orcamento, custo, prazo, id]
        );
    }, null, null)
};

export const deleteProjeto = async (id) => {
    db.transaction(tx => {
        tx.executeSql("DELETE FROM Projetos WHERE id = ?;", [id]);
    }, null, null);
};

export const obterUltimoIdProjetos = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT last_insert_rowid() FROM Projetos as ultimoId;", [], (_, { rows }) => {
                if (rows.length > 0) {
                    resolve(rows.length);
                } else {
                    reject('Nenhum ID encontrado');
                }
            });
        });
    });
};

export const createVariaveis = async (custo_ferro, custo_dia_obra) => {
    db.transaction(tx => {
        tx.executeSql(
            "INSERT INTO Variaveis (custo_ferro, custo_dia_obra) VALUES (?,?);",
            [custo_ferro, custo_dia_obra]
        );
    }, null, null);
}

export const getVariaveis = async (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT * FROM variaveis WHERE id = ?;", [id], (_, { rows }) => {
                if (rows.length > 0) {
                    resolve(rows._array);
                } else {
                    resolve([]);
                }
            },
                (_, error) => {
                    console.log("Erro ao buscar as Variaveis: " + error);
                    reject(error);
                });
        });
    });
};

export const updateVariaveis = async (custo_ferro, custo_dia_obra, id) => {
    db.transaction(tx => {
        tx.executeSql(
            "UPDATE Variaveis SET custo_ferro = ?, custo_dia_obra = ? WHERE id = ?;"
            [custo_ferro, custo_dia_obra, id]
        );
    }, null, null)
};

export const obterUltimoIdVariaveis = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql("SELECT last_insert_rowid() FROM Variaveis as ultimoId;", [], (_, { rows }) => {
                if (rows.length > 0) {
                    resolve(rows.length);
                } else {
                    reject("Nenhum ID encontrado");
                }
            });
        });
    });
};
