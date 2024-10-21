class Note {
    constructor(id, title, content, tag, category) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.tag = tag;
        this.category = category;
        this.created_at = new Date().toISOString();
    }
}

module.exports = Note;
