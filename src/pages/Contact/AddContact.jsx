import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

const Addcontact = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    type: "",
    isWhatsapp: "",
    profile: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "profile") {
      getBase64(e.target.files[0]).then((base64) => {
        setContact({
          ...contact,
          profile: base64,
        });
      });
    } else {
      setContact({
        ...contact,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = localStorage.getItem("contactData");
    if (data) {
      const contactInfo = JSON.parse(data);
      const arr = [...contactInfo];
      if (id) {
        arr[id] = contact;
      } else {
        arr.push(contact);
      }

      localStorage.setItem("contactData", JSON.stringify(arr));
    } else {
      localStorage.setItem("contactData", JSON.stringify([contact]));
    }
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      const data = JSON.parse(localStorage.getItem("contactData"));

      setContact(data[id]);
    }
  }, [id]);

  return (
    <div>
      <h1>{id ? "Edit" : "Add Contact"} </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ padding: "10px" }}>
          <TextField
            label="Name"
            type="text"
            name="name"
            onChange={handleChange}
            value={contact.name}
          />
        </div>

        <TextField
          label="Phone"
          type="text"
          name="phone"
          onChange={handleChange}
          value={contact.phone}
        />
        <br />
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-label">Select type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={contact.type}
            name="type"
            label="Select type"
            onChange={handleChange}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="personal">personal</MenuItem>
            <MenuItem value="Office">Office</MenuItem>
          </Select>
        </FormControl>

        <br />
        <label>Whatsapp </label>
        <input
          type="radio"
          name="isWhatsapp"
          value="yes"
          onChange={handleChange}
          checked={contact.isWhatsapp === "yes"}
        />
        <label>Yes</label>
        <input
          type="radio"
          name="isWhatsapp"
          value="no"
          onChange={handleChange}
          checked={contact.isWhatsapp === "no"}
        />
        <label>No</label>
        <br />
        <br />

        <input type="file" name="profile" onChange={handleChange} />
        <div>
          {contact.profile ? (
            <img width="50" height="50" src={contact.profile} alt="profile" />
          ) : (
            ""
          )}
        </div>

        <div style={{ padding: "10px" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Addcontact;
