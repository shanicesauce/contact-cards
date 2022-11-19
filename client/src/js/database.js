import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initDb = async () =>{
     // We are creating a new database named 'contact_db' which will be using version 1 of the database.
    openDB('contact_db',1,{
        // Add our database schema if it has not already been initialized.
        upgrade(db){
            if(db.objectStoreNames.contains('contacts')){
                console.log('contact store already exists');
                return;
            }
            // Create a new object store for the data and give it a key name of 'id' which will increment automatically
            db.createObjectStore('contacts', { keyPath: 'id', autoIncrement: true });
            console.log('contacts store created');
        }
    })
};

export const getDb = async () => {
    console.log('GET from the databse');

    //connection to index db database and version 
    const contactDb = await openDB('contact_db', 1);

    //new transaction & specify store and data privlilleges
    const tx = contactDb.transaction('contacts', 'readonly');

    //open desired object store
    const store = tx.objectStore('contacts');

    //get all data in the db 
    const request = store.getAll();

    //confirm request
    const result = await request;
    console.log('result.value', result);
    return result;
};

export const postDb = async (name, email, phone, profile) => {
    console.log('POST to the db');
    //connection to index db database and version 
    const contactDb = await openDB('contact_db', 1);

    //new transaction & specify store and data privlilleges
    const tx = contactDb.transaction('contacts', 'readwrite');

    //open desired object store
    const store = tx.objectStore('contacts');

    //get all data in the db 
    const request = store.add({ name: name, email: email, phone: phone, profile: profile });

    //confirm request
    const result = await request;
    console.log('data saved to db', result);
};

export const deleteDb = async (id) => {
    console.log('DELETE from the databse', id);

    //connection to index db database and version 
    const contactDb = await openDB('contact_db', 1);

    //new transaction & specify store and data privlilleges
    const tx = contactDb.transaction('contacts', 'readwrite');

    //open desired object store
    const store = tx.objectStore('contacts');

    //get all data in the db 
    const request = store.delete(id);

    //confirm request
    const result = await request;
    console.log('result.value', result);
    return result?.value;
};
export const editDb = async (id, name, email, phone, profile) => {
    console.log('PUT update the databse');

    //connection to index db database and version 
    const contactDb = await openDB('contact_db', 1);

    //new transaction & specify store and data privlilleges
    const tx = contactDb.transaction('contacts', 'readwrite');

    //open desired object store
    const store = tx.objectStore('contacts');

    //get all data in the db 
    const request = store.put({ id:id, name: name, email: email, phone: phone, profile: profile })

    //confirm request
    const result = await request;
    console.log('data saved to db', result);
};