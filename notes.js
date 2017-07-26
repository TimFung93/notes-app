const fs = require('fs');



const fetchNotes = () => {
	try {
		let notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString)
	} catch (error) {
		console.log(error)
		return [];
	}
};

const saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes))
};


const addNote = (title, body) => {
	const notes = fetchNotes();
	const note = {
		title,
		body
	};


	let dupNote = notes.filter((note) => note.title === title);

	if (dupNote.length === 0) {
		notes.push(note)
		saveNotes(notes);
		return note; 
	}

};

const getAll = () => {
	return fetchNotes()
};

const readNote = (title) => {
	//fetch note
	let notes = fetchNotes()

	//filter only the title either 0 notes or 1 note
	let readSingleNote = notes.filter((notes) => notes.title === title);

	//return that note
	return readSingleNote[0]
}

const removeNote = (title) => {
	//fetch notes
	let notes = fetchNotes()
	
	//filter notes, removing the one with title of argument
	let deleteNote = notes.filter((note) => note.title !== title);
	
	//save new notes array
	saveNotes(deleteNote)

	return notes.length !== deleteNote.length

}

const logNote = (note) => {
	console.log('===============')
	console.log(`Title: ${note.title}`)
	console.log(`Body: ${note.body}`)
}

module.exports = {
	addNote,
	getAll,
	readNote,
	removeNote,
	logNote
}