import { useNavigate, useParams } from "react-router-dom";
import { MemberList } from "./components/MemberList";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchFamily } from "../../shared/api";
import { Family } from "../../models/Family";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../shared/store";
import {
  createMemberRequestAction,
  fetchMembersRequestAction,
  selectFamilyIdAction,
} from "./store/memberActions";

export default function Member() {
  const { familyId } = useParams();
  const navigate = useNavigate();
  const [family, setFamily] = useState<Family | null>(null);

  const membersState = useSelector((state: RootState) => state.members);
  const dispatch: AppDispatch = useDispatch();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const handleCreateDialogOpen = () => setCreateDialogOpen(true);
  const handleCreateDialogClose = () => setCreateDialogOpen(false);

  useEffect(() => {
    if (familyId) {
      fetchFamily(familyId as string)
        .then((response) => {
          setFamily(new Family(response.id, response.name));
        })
        .catch(() => {
          navigate("/");
        });

      dispatch(selectFamilyIdAction({ familyId }));
      dispatch(fetchMembersRequestAction({ familyId: familyId as string }));
    }
  }, [familyId]);

  return (
    <>
      <Typography variant="h6">{family?.name} members</Typography>

      {membersState.members[familyId as string] && (
        <MemberList members={membersState.members[familyId as string]} />
      )}
      <Button onClick={handleCreateDialogOpen}>Add member</Button>
      <Dialog
        open={createDialogOpen}
        onClose={handleCreateDialogClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            dispatch(
              createMemberRequestAction({
                familyId: familyId as string,
                props: { name: formJson.name, age: Number(formJson.age) },
              }),
            );
            handleCreateDialogClose();
          },
        }}
      >
        <DialogTitle>Create Family Root Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create member, please enter member name and age.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Member Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="age"
            name="age"
            label="Member Age"
            type="number"
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
