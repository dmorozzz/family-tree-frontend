import {
  Button,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { Family } from "../../../models/Family";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AppDispatch } from "../../../shared/store";
import { useDispatch } from "react-redux";
import {
  deleteFamilyRequest,
  updateFamilyRequest,
} from "../store/familyActions";
import { useState } from "react";
import { UpdateFamilyProps } from "../../../shared/api";
import { Link } from "react-router-dom";

export default function FamilyItem(props: { family: Family }) {
  const dispatch: AppDispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditDialogOpen = () => setEditDialogOpen(true);
  const handleEditDialogClose = () => setEditDialogOpen(false);

  function updateFamily(familyId: string, props: UpdateFamilyProps): void {
    dispatch(updateFamilyRequest({ familyId, props }));
  }

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          height: 150,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {props.family.name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to={`/${props.family.id}`}>
            Explore
          </Button>
          <IconButton aria-label="edit" onClick={handleEditDialogOpen}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() =>
              dispatch(deleteFamilyRequest({ familyId: props.family.id }))
            }
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            updateFamily(props.family?.id as string, {
              name: formJson.name,
            });
            handleEditDialogClose();
          },
        }}
      >
        <DialogTitle>Edit Family</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit family, please enter family name.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            defaultValue={props.family.name}
            name="name"
            label="Family Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
