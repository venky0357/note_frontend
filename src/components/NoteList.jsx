import React, { useState } from "react";
import NoteForm from "./NoteForm";
import styles from "./NoteList.module.css";
import './Notes.css';

export default function NoteList({ notes, onUpdate, onDelete }) {
    const [editingId, setEditingId] = useState(null);

    return (
        <div style={{ gap: "10px",  }} className="notes-grid">
            {notes.map((note) =>
                editingId === note._id ? (
                    <div>
                        <NoteForm
                            key={note._id}
                            existingNote={note}
                            onSave={(updatedNote) => {
                                onUpdate(note._id, updatedNote);
                                setEditingId(null);
                            }}
                            onCancel={() => setEditingId(null)}
                        />
                    </div>
                ) : (
                    <div key={note._id} className={styles.noteCard}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
                            <h2 className={styles.noteTitle}>{note.title}</h2>
                            <p className={styles.noteLabels}>
                                {note.labels.join(", ")}
                            </p>
                        </div>
                        <p className={styles.noteContent}>{note.content}</p>
                        <div className={styles.actions}>
                            <button
                                className={styles.button}
                                onClick={() => setEditingId(note._id)}
                            >
                                Edit
                            </button>
                            <button
                                className={styles.button}
                                onClick={() => onDelete(note._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
