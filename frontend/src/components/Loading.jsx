import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
function Loading() {
  return (
    <>
      <div className="px-4 py-2">
        <Stack direction={"row"} spacing={2}>
          <Skeleton height={60} width={145} />
          <Skeleton height={60} width={145} />
          <Skeleton height={60} width={145} />
        </Stack>

        <Stack className="py-3">
          <Skeleton variant="rectangular" height={70} />
        </Stack>
        <Stack className="py-3">
          <Skeleton variant="rectangular" height={70} />
        </Stack>
        <Stack className="py-3">
          <Skeleton variant="rectangular" height={70} />
        </Stack>
      </div>
    </>
  );
}

export default Loading;
