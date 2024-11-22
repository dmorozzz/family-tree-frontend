import Grid from "@mui/material/Grid2";
import FamilyItem from "./FamilyItem";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Family } from "../../../models/Family";
import { AppDispatch } from "../../../shared/store";
import { useDispatch } from "react-redux";
import { createFamilyRequest } from "../store/familyActions";
import { CreateFamilyProps } from "../../../shared/api";
import { useState } from "react";

export default function FamilyList(props: { families: Family[] }) {
  const dispatch: AppDispatch = useDispatch();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const handleCreateDialogOpen = () => setCreateDialogOpen(true);
  const handleCreateDialogClose = () => setCreateDialogOpen(false);

  function createFamily(props: CreateFamilyProps): void {
    dispatch(createFamilyRequest(props));
  }

  return (
    <>
      <Grid container spacing={1}>
        {props.families.map((family, index) => (
          <Grid size={{ xs: 12 }} key={index} alignItems="stretch">
            <FamilyItem family={family} />
          </Grid>
        ))}

        <Grid size={{ xs: 12 }}>
          <Button onClick={handleCreateDialogOpen}>Create new family</Button>
        </Grid>
      </Grid>

      <Dialog
        open={createDialogOpen}
        onClose={handleCreateDialogClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            createFamily({ name: formJson.name });
            handleCreateDialogClose();
          },
        }}
      >
        <DialogTitle>Create Family</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create family, please enter family name.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Family Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateDialogClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
