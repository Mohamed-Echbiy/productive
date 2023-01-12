import { Typography } from "@mui/material";
import { useContext, useState } from "react";
import useSound from "use-sound";
import { Interaction } from "../../context/interactionAuth";
import { noteDelete } from "../../fc/noteDelete";
import { EditPen, Trash } from "../../Icons";
import deleteSoundEffect from "../../sounds/whoosh-6316.mp3";
import EditNote from "./EditNote";

const Note = ({ data }) => {
  const [deleteSound] = useSound(deleteSoundEffect);
  const { setKey, setNotification } = useContext(Interaction);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  // console.log(isEdited);
  const lunchDelete = async (e) => {
    await noteDelete(e);
    setIsDeleted(true);
    setNotification(true);
    deleteSound();
  };
  const date = new Date(data.createdAt).toString();
  return (
    <>
      {isEdited ? (
        <EditNote data={data} setEdit={setIsEdited} />
      ) : (
        !isDeleted && (
          <div className="note px-8 border-gray-500 border-2 border-solid rounded-md w-1/4 mr-2 flex-grow mb-5 max-h-60 overflow-scroll">
            <div className="my-8">
              <div className="title mb-5">
                <Typography variant="h4" color="secondary" component={"h4"}>
                  {data.title}
                </Typography>
              </div>
              <div className="body mb-3">
                <Typography variant="body1">{data.body}</Typography>
              </div>
              <div className="time_created">
                <Typography variant="body2" paragraph={true}>
                  {date.slice(0, date.indexOf("G"))}
                </Typography>
              </div>
              <div className="fc flex items-center justify-end">
                <div
                  className="editPen mr-5 cursor-pointer"
                  onClick={() => setIsEdited(true)}
                >
                  <EditPen />
                </div>
                <button
                  className="trash"
                  value={data._id}
                  onClick={lunchDelete}
                >
                  <Trash />
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Note;
