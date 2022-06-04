const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    createdAt,
    updatedAt,
    tags,
    body,
  };

  notes.push(newNote);

  const isSucces = notes.some((note) => note.id === id);

  if (!isSucces) {
    const response = h.response({
      status: "fail",
      message: "Catatan gagal ditambahkan",
    });
    response.code(500);
    return response;
  }

  const response = h.response({
    status: "success",
    message: "Catatan berhasil ditambahkan",
    data: {
      noteId: id,
    },
  });
  response.code(201);
  return response;
};
const getAllNotesHandler = (request, h) => {
  const response = h.response({
    status: "success",
    data: {
      notes,
    },
  });
  response.code(200);
  return response;
};

const editNoteByIdhandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbaharui catatan. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
  const updatedAt = new Date().toISOString();
  notes[index] = {
    ...notes[index],
    title,
    tags,
    body,
    updatedAt,
  };

  const response = h.response({
    status: "success",
    message: "Catatan berhasil diperbarui",
    data: {
      notes,
    },
  });
  response.code(200);
  return response;
};
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) {
    const response = h.response({
      status: "fail",
      message: "Id catatan tidak ditemukan",
    });
    response.code(404);
    return response;
  }
  const note = notes[index];
  const response = h.response({
    status: "success",
    message: "Catatan berhasil diperbarui",
    data: {
      note,
    },
  });
  response.code(200);
  return response;
};
const removeNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) {
    const response = h.response({
      status: "fail",
      message: "Catatan gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
  notes.splice(index, 1);
  const response = h.response({
    status: "success",
    message: "Catatan berhasil dihapus",
    data: {
      notes,
    },
  });
  response.code(200);
  return response;
};
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  editNoteByIdhandler,
  removeNoteByIdHandler,
  getNoteByIdHandler
};
