import React from "react";
import { Skeleton } from "@mui/material";

const NoteLoading = () => {
  return (
    <div className=" flex flex-wrap items-center justify-center">
      <div className="w-full flex justify-center mb-5">
        <Skeleton
          variant="rectangle"
          width={148}
          height={48}
          className="rounded-md"
        />
      </div>
      <Skeleton
        variant="rectangle"
        width={240}
        height={240}
        className="mr-3 mb-5 flex-grow rounded-md"
      />
      <Skeleton
        variant="rectangle"
        width={240}
        height={240}
        className="mr-3 mb-5 flex-grow rounded-md"
      />
      <Skeleton
        variant="rectangle"
        width={240}
        height={240}
        className="mr-3 mb-5 flex-grow rounded-md"
      />
      <Skeleton
        variant="rectangle"
        width={240}
        height={240}
        className="mr-3 mb-5 flex-grow rounded-md"
      />
    </div>
  );
};

export default NoteLoading;
