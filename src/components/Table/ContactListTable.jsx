import React from 'react';
import { Paper } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";

const ContactListTable = ({contactData, handleOpen}) => {
    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Whatsapp</TableCell>
              <TableCell align="right">Profile</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactData &&
              contactData.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.isWhatsapp}</TableCell>
                  <TableCell align="right">
                    <img
                      width="50"
                      height="50"
                      src={row.profile}
                      alt="profile"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/edit-contact/${index}`} style={{color:"black"}}>Edit</Link>
                    <p onClick={e=>handleOpen(e, index)}>Delete</p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

    );
}

export default ContactListTable;
