import * as express from 'express';
const app = express();

const contactsCollection = 'contacts';

// Add new contact
app.post('/contacts', (req, res) => {
  res.send('Create a new contact');
})

// Update new contact
app.patch('/contacts/:contactId', (req, res) => {
  res.send('Update a new contact');
})

// View a contact
app.get('/contacts/:contactId', (req, res) => {
  res.send(`Get a contact  with id ${req.params.contactId}`)
})

// View all contacts
app.get('/contacts', (req, res) => {
  res.send("Get all contacts")
})

// Delete a contact 
app.delete('/contacts/:contactId', (req, res) => {
  res.send('Document deleted');
})

export { app };
