import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Interaction } from "../../context/interactionAuth";
import { AddTaskIcon, CloseAddTaskWindow, Search } from "../../Icons";
import NoteLoading from "../NoteLoading";
import AddNote from "./AddNote";
import Note from "./Note";

const AllNotes = () => {
  const { key, setKey } = useContext(Interaction);
  const [isOpenAddNote, setOpenAddNote] = useState(false);
  const [search, setSearch] = useState("");
  // useEffect(() => {
  //   console.log("reset the query");
  // }, [key]);
  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    const req = await fetch(
      `https://efficiency-api.onrender.com/api/allNotes/${token}?createdAt=asc&tags=all&search=${search}`
    );
    const res = await req.json();
    return res;
  };
  const { isLoading, data } = useQuery(["AllNotes", key], fetchNotes, {
    refetchOnMount: true,
    cacheTime: 5,
  });
  if (isLoading) {
    return <NoteLoading />;
  }
  // console.log(search);
  return (
    <div className="relative notesPage">
      <div className="flex justify-center items-center flex-wrap mb-5">
        <Button
          variant="contained"
          color={isOpenAddNote ? "error" : "secondary"}
          size="large"
          value={search}
          endIcon={!isOpenAddNote ? <AddTaskIcon /> : <CloseAddTaskWindow />}
          onClick={() => setOpenAddNote((pre) => !pre)}
        >
          {isOpenAddNote ? "close" : "add note"}
        </Button>
        <div className="ml-4 flex items-center my-4">
          <TextField
            label="search note by title"
            size="normal"
            color="secondary"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <IconButton aria-label="search" onClick={() => setKey((pre) => !pre)}>
            <Search />
          </IconButton>
        </div>
      </div>
      <div className="relative">
        <div
          className={`notes transition-all duration-150 flex items-center justify-center flex-wrap ${
            isOpenAddNote && "blur-md"
          }`}
        >
          {data.map((e, i) => (
            <Note data={e} key={i * 77777} />
          ))}
        </div>
        {isOpenAddNote && (
          <div className="addNote absolute top-0 left-0 w-full mt-10 flex justify-center items-center">
            <div className="addNoteFields">
              <AddNote setOpenAddNote={setOpenAddNote} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotes;
