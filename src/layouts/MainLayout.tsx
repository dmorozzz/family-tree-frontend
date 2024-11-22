import { Suspense } from "react";
import Header from "../components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Family from "../features/family/Family";
import Member from "../features/member/Member";
import { Container } from "@mui/material";

export default function MainLayout() {
  return (
    <>
      <Header />

      <Container fixed sx={{ mt: 2 }}>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Family />} />
            <Route path=":familyId" element={<Member />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}
