import { Member } from "../../../models/Member";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { AppDispatch, RootState } from "../../../shared/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createChildRequestAction,
  updateMemberRequestAction,
} from "../store/memberActions";

export function MemberList(props: { members: Member[] }) {
  const membersState = useSelector((state: RootState) => state.members);
  const dispatch: AppDispatch = useDispatch();

  const [createDialogParentData, setCreateDialogParentData] =
    useState<Member | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleCreateDialogOpen = (parent: Member) => {
    setCreateDialogOpen(true);
    setCreateDialogParentData(parent);
  };
  const handleCreateDialogClose = () => setCreateDialogOpen(false);
  const [updateDialogMemberData, setUpdateDialogMemberData] =
    useState<Member | null>(null);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleUpdateDialogOpen = (member: Member) => {
    setUpdateDialogOpen(true);
    setUpdateDialogMemberData(member);
  };
  const handleUpdateDialogClose = () => setUpdateDialogOpen(false);

  function createChildrenTree(children: Member[]) {
    if (children.length === 0) {
      return;
    }

    return children.map((child, index) => (
      <Accordion key={index} variant="outlined">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            {child.name} (age: {child.age})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {child.children.length > 0 ? "Children:" : "No children"}
          </Typography>

          {createChildrenTree(child.children)}
        </AccordionDetails>
        <AccordionActions>
          <Button onClick={() => handleUpdateDialogOpen(child)}>Edit</Button>
          <Button onClick={() => handleCreateDialogOpen(child)}>
            Add Child
          </Button>
        </AccordionActions>
      </Accordion>
    ));
  }

  return (
    <>
      {createChildrenTree(props.members)}
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
              createChildRequestAction({
                parentId: createDialogParentData?.id as string,
                familyId: membersState.selectedFamilyId,
                props: { name: formJson.name, age: Number(formJson.age) },
              }),
            );
            handleCreateDialogClose();
          },
        }}
      >
        <DialogTitle>Add child to {createDialogParentData?.name}</DialogTitle>
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
      <Dialog
        open={updateDialogOpen}
        onClose={handleUpdateDialogClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());

            dispatch(
              updateMemberRequestAction({
                familyId: membersState.selectedFamilyId as string,
                props: {
                  id: updateDialogMemberData?.id,
                  name: formJson.name,
                  age: Number(formJson.age),
                },
              }),
            );
            handleUpdateDialogClose();
          },
        }}
      >
        <DialogTitle>Update Family Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update member, please enter member name and age.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            defaultValue={updateDialogMemberData?.name}
            label="Member Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="age"
            defaultValue={updateDialogMemberData?.age}
            name="age"
            label="Member Age"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
