"use client";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import { ComponentType, useEffect, useState } from "react";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionUp(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

type DirectionSnackbarProps = {
  showIt: boolean;
  message: string;
  setToastShow: React.Dispatch<
    React.SetStateAction<{ show: boolean; message: string }>
  >;
};

export default function DirectionSnackbar({
  showIt,
  message,
  setToastShow,
}: DirectionSnackbarProps) {
  // const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState<
    ComponentType<TransitionProps> | undefined
  >(undefined);

  useEffect(() => {
    if (showIt) {
      setTransition(() => TransitionUp);
      // setOpen(true);
    }
  }, [showIt]);

  const handleClose = () => {
    // setOpen(false);
    setToastShow({ show: false, message: "" });
  };

  return (
    <Box sx={{ width: 300 }}>
      <Snackbar
        open={showIt}
        onClose={handleClose}
        TransitionComponent={transition}
        message={message}
        key={transition ? transition.name : ""}
      />
    </Box>
  );
}
