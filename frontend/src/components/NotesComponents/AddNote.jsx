import { useContext, useState } from "react";
import Textarea from "@mui/joy/Textarea";
import { Interaction } from "../../context/interactionAuth";
import { Button, TextField } from "@mui/material";
import NoteAdded from "../../sounds/button-124476.mp3";
import useSound from "use-sound";

const AddNote = ({ setOpenAddNote }) => {
  const [title, setTitle] = useState();
  const [SoundPlayed] = useSound(NoteAdded);

  const [body, setBody] = useState();
  const [error, setError] = useState("");
  const { setKey, setNotification } = useContext(Interaction);
  async function addNote(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!title) {
      return setError("please write your task name");
    }
    const req = await fetch(
      `https://efficiency-api.onrender.com/api/add_note`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body, token }),
      }
    );
    const res = await req.json();
    // console.log(res);
    setKey((pre) => !pre);
    setOpenAddNote(false);
    setTimeout(() => {
      setNotification(true);
      SoundPlayed();
    }, 500);
  }
  // console.log(title, body);
  return (
    <div>
      <TextField
        type="text"
        name="title"
        color="secondary"
        label="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="bg-white w-full"
      />
      <div className="textarea my-5">
        <Textarea
          color="info"
          minRows={6}
          placeholder="write your note content here !"
          size="lg"
          onChange={(e) => setBody(e.target.value)}
          className="bg-white"
        />
      </div>
      <Button variant="contained" color="secondary" onClick={addNote}>
        submit
      </Button>
    </div>
  );
};

export default AddNote;
