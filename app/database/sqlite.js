
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const DATABASE_NAME = 'mino-app.db';

export const getDbConnection = async () => {
    const db = SQLite.openDatabase(
        { name: DATABASE_NAME, location: "default" },
        () => { },
        (error) => {
            console.log("Error: ", error);
        });
    return db;
}

export const createTables = async () => {
    const db = await getDbConnection();
    const query =
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, password TEXT NOT NULL'

    await db.transaction(tx => {
        tx.executeSql(query);
    }).then(() => {
        console.log('Table created successfully.');
    }).catch(error => {
        console.log('Transaction error: ', error);
    });
}

export const initDatabase = async () => {
    const db = await getDbConnection();
    await createTables(db);
    db.close();
}

export const loginDatabase = async (email, password) => {
    const db = await getDbConnection();
    const query = `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`;
    return db.executeSql(query);
}
