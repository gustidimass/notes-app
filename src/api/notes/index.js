const NotesHandler = require("./handler");
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesService');

const init = async () => {
    const notesService = new NotesService();

    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register({
        plugin: notes,
        option: {
            service: notesService,
        },
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

module.exports = {
    name: 'notes',
    version: '1.0.0',
    register: async (server, { service}) => {
        const notesHandler = new NotesHandler(service);
        server.route(routes(notesHandler));
    },
}