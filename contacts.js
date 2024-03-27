import { promises as fs } from 'fs';
import path from 'path';

const contactsPath = path.join("db", "contacts.json");


async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts.find(contact => contact.id === contactId) || null;
  } catch (error) {
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    
    const removedContact = contacts.find(contact => contact.id === contactId);
    return removedContact || null;
  } catch (error) {
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    return null;
  }
}

export { listContacts, getContactById, removeContact, addContact };
