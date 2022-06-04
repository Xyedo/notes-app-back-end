const {
  addNoteHandler,
  getAllNotesHandler,
  editNoteByIdhandler,
  removeNoteByIdHandler,
  getNoteByIdHandler,
} = require("./handler");

const route = [
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
  {
    method: "PUT",
    path: "/notes",
    handler: editNoteByIdhandler,
  },
  {
    method:"DELETE",
    path:"/notes/{id}",
    handler:removeNoteByIdHandler
  },
  {
    method:"GET",
    path:"/notes/{id}",
    handler:getNoteByIdHandler
  }
];

module.exports = route;
