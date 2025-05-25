import React, { useState } from "react";
import styles from "./NoteForm.module.css";

export default function NoteForm({ onSave,onCancel, existingNote = {} }) {
    const [title, setTitle] = useState(existingNote.title || "");
    const [content, setContent] = useState(existingNote.content || "");
    const [labels, setLabels] = useState(existingNote.labels?.join(",") || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        const note = {
            title,
            content,
            labels: labels.split(",").map((l) => l.trim()),
        };
        onSave(note);
        if (!existingNote._id) {
            setTitle("");
            setContent("");
            setLabels("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <textarea
                className={styles.textarea}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                required
            />
            <input
                className={styles.input}
                value={labels}
                onChange={(e) => setLabels(e.target.value)}
                placeholder="Labels (comma-separated)"
            />
            <div style={{display:"flex",justifyContent:"space-between"}}> 
                <button type="button" className="btn btn-secondary" style={{width:"49%"}} onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className={styles.button}>
                    {existingNote._id ? "Update" : "Save"}
                </button>
            </div>
        </form>
    );
}
