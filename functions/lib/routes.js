"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
exports.app = app;
const contactsCollection = 'contacts';
// Add new contact
app.post('/contacts', (req, res) => {
    res.send('Create a new contact');
});
// Update new contact
app.patch('/contacts/:contactId', (req, res) => {
    res.send('Update a new contact');
});
// View a contact
app.get('/contacts/:contactId', (req, res) => {
    res.send(`Get a contact  with id ${req.params.contactId}`);
});
// View all contacts
app.get('/contacts', (req, res) => {
    res.send("Get all contacts");
});
// Delete a contact 
app.delete('/contacts/:contactId', (req, res) => {
    res.send('Document deleted');
});
//# sourceMappingURL=routes.js.map