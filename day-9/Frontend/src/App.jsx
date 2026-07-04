import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setnotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const colors = [
    "yellow",
    "mint",
    "lavender",
    "peach",
    "sky"
  ];

  const emojis = [
    "📝",
    "💡",
    "📌",
    "🚀",
    "✨",
    "📚",
    "🔥",
    "🎯"
  ];

  const openPopup = (note) => {
    setSelectedNote(note);
    setIsOpen(true);
  };

  const closePopup = () => setIsOpen(false);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("http://localhost:3000/api/notes")
      .then((res) => {
        setnotes(res.data.notes);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/create", {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        fetchData();

        title.value = "";
        description.value = "";
      });
  }

  function handleDelete(id) {
    axios
      .delete("http://localhost:3000/api/notes/" + id)
      .then(() => {
        fetchData();
      });
  }

  function handleUpdate(id, e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .patch("http://localhost:3000/api/notes/" + id, {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        fetchData();
        closePopup();
      });
  }

  return (
    <div className="app">

      {/* Decorative Background */}

      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          📝 Brutal Notes
        </div>

        <input
          className="search"
          placeholder="Search Notes..."
        />

        <div className="nav-icons">

          <button>🏠</button>

          <button>⭐</button>

          <button>📁</button>

          <button>👤</button>

        </div>

      </nav>

      {/* MAIN */}

      <div className="main-layout">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <h2>Navigation</h2>

          <button>📝 All Notes</button>

          <button>⭐ Favorites</button>

          <button>📁 Archived</button>

          <button>🗑 Trash</button>

          <button>⚙ Settings</button>

          <div className="stats">

            <h3>Dashboard</h3>

            <p>📄 Total Notes : {notes.length}</p>

            <p>⭐ Favorites : 0</p>

            <p>📁 Archived : 0</p>

          </div>

        </aside>

        {/* CONTENT */}

        <main className="content">

          {/* CREATE NOTE */}

          <form
            className="note-form"
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              name="title"
              placeholder="Title"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
            />

            <button type="submit">
              ➕ Add Note
            </button>

          </form>

          {/* GRID */}

          <div className="notes">

            {notes.map((note, index) => (

              <div
                key={note._id}
                className={`note ${colors[index % colors.length]}`}
              >

                <div className="note-header">

                  <span className="emoji">
                    {emojis[index % emojis.length]}
                  </span>

                  <h2>{note.title}</h2>

                </div>

                <p>
                  {note.description}
                </p>

                <div className="actions">

                  <button
                    className="update-btn"
                    onClick={() => openPopup(note)}
                  >
                    ✏ Update
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(note._id)}
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </main>

      </div>

      {/* FLOATING BUTTON */}

      <button
        className="floating-btn"
        onClick={() =>
          document
            .querySelector(".note-form")
            .scrollIntoView({
              behavior: "smooth",
            })
        }
      >
        +
      </button>

      {/* UPDATE POPUP */}

      {isOpen && (

        <div className="popup-overlay">

          <div className="popup-box">

            <h2>
              ✏ Update Note
            </h2>

            <form
              onSubmit={(e) =>
                handleUpdate(selectedNote._id, e)
              }
            >

              <input
                name="title"
                defaultValue={selectedNote?.title}
              />

              <textarea
                name="description"
                rows="5"
                defaultValue={selectedNote?.description}
              ></textarea>

              <button type="submit">
                💾 Save Changes
              </button>

            </form>

            <button
              className="close-btn"
              onClick={closePopup}
            >
              ❌ Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;