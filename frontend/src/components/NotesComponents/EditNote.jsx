import Textarea from "@mui/joy/Textarea";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import useSound from "use-sound";
import { Interaction } from "../../context/interactionAuth";
import { editedNote } from "../../fc/editNote";
import NoteUpdated from "../../sounds/button-124476.mp3";

const EditNote = ({ data, setEdit }) => {
  const [title, setTitle] = useState(data.title);
  const [SoundUpdated] = useSound(NoteUpdated);
  const [body, setBody] = useState(data.body);
  const { setKey, setNotification } = useContext(Interaction);
  const lunchEdit = async (e) => {
    const update = { title, body };
    await editedNote(e, update);
    setKey((pre) => !pre);
    setEdit(false);
    setNotification(true);
    SoundUpdated();
  };
  return (
    <div className="w-full transition-all duration-150 ">
      <TextField
        type="text"
        name="title"
        color="secondary"
        label="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="bg-white w-full"
        value={title}
        autoFocus={true}
      />
      <div className="textarea my-5">
        <Textarea
          color="info"
          minRows={6}
          placeholder="write your note content here !"
          size="lg"
          onChange={(e) => setBody(e.target.value)}
          className="bg-white"
          value={body}
        />
      </div>
      <div className="flex ">
        <div className="mr-4">
          <Button
            variant="contained"
            color="secondary"
            value={data._id}
            onClick={lunchEdit}
          >
            Update
          </Button>
        </div>
        <Button
          variant="contained"
          color="error"
          value={data._id}
          onClick={() => setEdit(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditNote;
