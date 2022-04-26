import React, { useState, useEffect, useCallback, Suspense } from "react";
import Grid from "@mui/material/Grid";
import DeleteModal from "../components/DeleteModal";
const ContactListTable = React.lazy(() =>
  import("../components/Table/ContactListTable")
);

const Home = () => {
  const [contactData, setContactData] = useState([]);
  const [open, setOpen] = useState(false);
  const [contactId, setContactId] = useState("");

  const handleOpen = (e, id) => {
    setOpen(true);
    setContactId(id);
  };
  const handleClose = () => setOpen(false);
  const data = localStorage.getItem("contactData");

  const getContact = useCallback(() => {
    setContactData(JSON.parse(data));
  }, [data]);

  const handleDelete = () => {
    const array = [...contactData];
    array.splice(contactId, 1);
    localStorage.setItem("contactData", JSON.stringify(array));
    getContact();
    handleClose();
  };

  useEffect(() => {
    getContact();
  }, [getContact]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <h1>Home Page</h1>
        {!contactData?.length ? (
          <h2>No Contact Saved</h2>
        ) : (
          <Suspense fallback={<h1>... </h1>}>
            <ContactListTable
              contactData={contactData}
              handleOpen={handleOpen}
            />
          </Suspense>
        )}
      </Grid>
      <DeleteModal
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    </Grid>
  );
};

export default Home;
