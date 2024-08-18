import React, { useState } from "react";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import styled from "styled-components";
import { Modal, Button, Spinner } from "react-bootstrap";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

const DashboardWrapper = styled(MDBContainer)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp");
  background-size: cover;
  background-position: center;
`;

const GradientWrapper = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 8px;
`;

function Dashboard() {
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState(""); // Use moment object
  const [link, setLink] = useState("");
  const [visibility, setVisibility] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false); // For loading spinner

  const formatDateForMySQL = (date) => {
    const d = moment(date);
    return d.format("YYYY-MM-DD HH:mm:ss");
  };

  const handleDateChange = (date) => {
    if (moment.isMoment(date)) {
      setTimer(formatDateForMySQL(date));
    } else {
      setTimer(formatDateForMySQL(new Date(date)));
    }
  };

  const updateBanner = () => {
    setLoading(true); // Show loading spinner
    axios
      .put("http://localhost:5000/api/banner", {
        description,
        timer, // Timer as formatted date
        link,
        visibility,
      })
      .then((res) => {
        setModalMessage("Banner updated successfully!");
        setLoading(false); // Hide loading spinner
        setShowModal(true);
      })
      .catch((err) => {
        console.error("Error updating banner:", err);
        setModalMessage("Error updating banner");
        setLoading(false); // Hide loading spinner
        setShowModal(true);
      });
  };

  return (
    <DashboardWrapper fluid>
      <GradientWrapper>
        <MDBCard>
          <MDBCardBody>
            <h2 className="text-center mb-4">Update Banner</h2>
            <MDBInput
              wrapperClass="mb-4"
              label="Description"
              size="lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="mb-4">
              <label className="form-label">Select Date and Time</label>
              <DateTime
                value={timer ? moment(timer) : null}
                onChange={handleDateChange}
                dateFormat="YYYY-MM-DD"
                timeFormat="HH:mm"
                inputProps={{ placeholder: "Select date and time" }}
                className="form-control"
              />
            </div>
            <MDBInput
              wrapperClass="mb-4"
              label="Link"
              size="lg"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <MDBCheckbox
              wrapperClass="mb-4"
              label="Visibility"
              checked={visibility}
              onChange={(e) => setVisibility(e.target.checked)}
            />
            <MDBBtn
              className="w-100 gradient-custom-4"
              size="lg"
              onClick={updateBanner}
            >
              {loading ? <Spinner animation="border" /> : "Update Banner"}
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </GradientWrapper>

      {/* Custom Modal for Notifications */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardWrapper>
  );
}

export default Dashboard;
