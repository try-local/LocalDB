class Note {
    constructor(id, title, content, tag) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.tag = tag;
        this.created_at = new Date().toISOString();
    }
}

module.exports = Note;
