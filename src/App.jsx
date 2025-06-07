import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import noteService from "./services/noteService";

function App() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading,setisLoading]=useState(false);
  useEffect(() => {
    setisLoading(true);
    noteService.getAll().then(setNotes);
    setisLoading(false);
  }, []);

  const handleCreate = async (note) => {
    const newNote = await noteService.create(note);
    setNotes([...notes, newNote]);
  };

  const handleUpdate = async (id, updatedNote) => {
    const note = await noteService.update(id, updatedNote);
    setNotes(notes.map((n) => (n._id === id ? note : n)));
  };

  const handleDelete = async (id) => {
    await noteService.remove(id);
    setNotes(notes.filter((n) => n._id !== id));
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: 0,
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="/"
            style={{ fontWeight: "600", fontFamily: "sans-serif" }}
          >
            NoteApp
          </a>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Add Note
          </button>
        </div>
      </nav>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              width: "350px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: -15,
                right: -5,
                fontWeight: "400",
                background: "#eee",
                border: "1px solid #eee",
                borderRadius: "60px",
                width: "30px",
                height: "30px",
              }}
            >
              X
            </button>

            <NoteForm
              onSave={(note) => {
                handleCreate(note);
                setIsModalOpen(false);
              }}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}

      {isLoading?
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"30vh"}}>
        <p style={{fontWeight:"600",fontSize:20,}}>Loading...</p>
      </div>
      :
      <main
        style={{
          overflowY: "auto",
          padding: 20,
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          paddingBottom:"80px"
        }}
      >
        <NoteList notes={notes} onUpdate={handleUpdate} onDelete={handleDelete} />
      </main>
      }

      <footer
        className="footer py-2"
        style={{
          backgroundColor: "#e9e9e9",
          paddingTop: 10,
          textAlign: "center",
          position:"fixed",
          bottom:0,
          left:0,
          width:"100%",
          zIndex:1000
        }}
      >
        <p style={{ margin: 0 }}>
          Created with <span>&#10084;&#65039;</span> by Venkatesh.
        </p>
      </footer>
    </div>
  );
}

export default App;
