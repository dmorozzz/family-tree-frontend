import { Typography } from "@mui/material";
import FamilyList from "./components/FamilyList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../shared/store";
import { useEffect } from "react";
import { fetchFamiliesRequest } from "./store/familyActions";
export default function Family() {
  const familiesState = useSelector((state: RootState) => state.families);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFamiliesRequest());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h6">Families</Typography>
      <FamilyList families={familiesState.families} />
    </>
  );
}
