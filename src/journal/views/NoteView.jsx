import {
  DeleteOutline,
  SaveOutlined,
  UploadFileOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import {
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal/thunks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, []);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const dispatch = useDispatch();

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
    // console.log(target.files);
  };

  const fileInputRef = useRef();

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire({
        title: "Nota actualizada",
        text: messageSaved,
        icon: "success",
      });
    }
  }, [messageSaved]);

  return (
    <Box
      // sx={{ ml: "240px", p: 0 }}
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        ml: "240px",
        padding: 0,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <Box component="section">
          <Typography fontSize={39} fontWeight="light">
            {dateString}
          </Typography>
        </Box>

        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />

        <Box component="section">
          <IconButton
            color="primary"
            disabled={isSaving}
            onClick={() => fileInputRef.current.click()}
          >
            <UploadOutlined />
          </IconButton>
          <Button
            disabled={isSaving}
            onClick={onSaveNote}
            color="primary"
            sx={{ padding: 2 }}
          >
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Guardar
          </Button>
        </Box>
      </Box>
      <Box
        sx={{ mt: 2, mb: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          minRows={5}
          placeholder="¿Qué sucedió el día de hoy?"
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Borrar
        </Button>
      </Box>
      <ImageGallery images={note.imageUrls} />
    </Box>
  );
};
