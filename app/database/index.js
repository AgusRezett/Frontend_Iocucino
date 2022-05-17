import { SQLite } from 'expo-sqlite';

const DATABASE_NAME = 'mino-app.db';

export const getDbConnection = async () => {
    const db = await SQLite.openDatabase({ name: DATABASE_NAME, location: 'default' });
    return db;
}

export const createTables = async (db) => {
    const query =
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, password TEXT NOT NULL'
    return db.executeSql(query);
}

export const initDatabase = async () => {
    const db = await getDbConnection();
    await createTables(db);
    db.close();
}

export const loginDatabase = async (db, email, password) => {
    const query = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;
    return db.executeSql(query);
}

/* const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users (' +
            'id INTEGER PRIMARY KEY NOT NULL,' +
            'email TEXT,' +
            'password TEXT,' +
            ');'
        ), []
    }, (_, error) => {
        reject(error);
    }, () => {
        resolve();
    });
    return promise;
}); */

/* export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (' +
                'id INTEGER PRIMARY KEY NOT NULL,' +
                'name TEXT,' +
                'email TEXT,' +
                'password TEXT,' +
                'dni TEXT,' +
                'dni_frente BLOB,' +
                'dni_dorso BLOB,' +
                'address text,' +
                'phone text,' +
                'birth_date text,' +
                ');'
            ), []
        }, (_, error) => {
            reject(error);
        }, () => {
            resolve();
        });
    });
    return promise;
} */