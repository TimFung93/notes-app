const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');


const titleOptions = {
	describe: "Title of note",
	demand: true,
	alias: 't'
};

const bodyOptions = {
	describe: "Body of note",
	demand: true,
	alias: 'b'	
};



const argv = yargs
	.command('add', "Add a new note", {
		title: titleOptions,
		body: bodyOptions
	})
	.command('list', "List all notes")
	.command('read', "Read an individual note", {
		title: titleOptions
	})
	.command('remove', "Remove individual note", {
		title: titleOptions
	})
	.help()
	.argv;

const command = argv._[0];




if (command === 'add') {
	let note = notes.addNote(argv.title, argv.body)
	if (note !== undefined) {
		console.log('Note Added')
		notes.logNote(note)
			
	} else {
		console.log('Error note was not added')
	}
} else if (command === 'list') {
	let allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} notes.`)
	allNotes.forEach((note) => {
		notes.logNote(note)
	});

} else if (command === 'read') {
	let note = notes.readNote(argv.title)
	if (note) {
		console.log('Note found')
		notes.logNote(note)
	} else {
		console.log('Error did not find note')
	}
	
	//print the note body given the title
} else if (command === 'remove') {
	let removeNote = notes.removeNote(argv.title)
	let message = removeNote ? 'Note was removed' : 'Note was not found'
	console.log(message)
} else {
	console.log('Command note regonized')
}