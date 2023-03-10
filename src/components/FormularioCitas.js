import React, { useState } from "react";
import { StyledDiv, Wrapper, FormWrapper, AppointmentsWrapper, ButtonEdit, ButtonDelete } from "../styles/Styles";

function FormularioCitas() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [name, setName] = useState("");
  const [numberTel, setNumberTel] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sintomas, setSintomas] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAppointment === null) {
      const newAppointment = { name, numberTel, date, time, sintomas };
      setAppointments([...appointments, newAppointment]);
    } else {
      const updatedAppointments = [...appointments];
      updatedAppointments[selectedAppointment] = { name, numberTel, date, time, sintomas };
      setAppointments(updatedAppointments);
      setSelectedAppointment(null);
    }
    setName("");
    setNumberTel("");
    setDate("");
    setTime("");
    setSintomas("");
  };

  const handleEdit = (index) => {
    const appointmentToEdit = appointments[index];
    setName(appointmentToEdit.name);
    setNumberTel(appointmentToEdit.numberTel);
    setDate(appointmentToEdit.date);
    setTime(appointmentToEdit.time);
    setSintomas(appointmentToEdit.sintomas);
    setSelectedAppointment(index);
  };


  const handleDelete = (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments.splice(index, 1);
    setAppointments(updatedAppointments);
  };

  return (
    <>
      <h1>Formulario de citas</h1>
      <Wrapper>
        <FormWrapper>
          <form onSubmit={handleSubmit}>
            <h2>Crear cita</h2>
            <label>
              Nombre:
              <br />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
            </label>
            <br />
            <label>
              Telefono:
              <br />
              <input type="text" value={numberTel} onChange={(e) => setNumberTel(e.target.value)} pattern="^(6|7|9)([0-9]{8})$" title="Empiece por 6,7,9 y sin espacios" required/>
            </label>
            <br />
            <label>
              Fecha:
              <br />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
            </label>
            <br />
            <label>
              Hora:
              <br />
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required/>
            </label>
            <label>
              Síntomas:
              <br />
              <textarea cols="30" rows="5" value={sintomas} onChange={(e) => setSintomas(e.target.value)} required></textarea>
            </label>
            <br />
            <button type="submit">Añadir cita</button>
          </form>
        </FormWrapper>
        <AppointmentsWrapper>
          <StyledDiv>
            <h2>Citas</h2>
            {appointments.length === 0 ? (
              <p>No hay citas programadas</p>
            ) : (
              <ul>
                {appointments.map((appointment, index) => (
                  <li key={index}>
                    {appointment.name} - {appointment.numberTel} / {appointment.date} @ {appointment.time}{" "} {appointment.sintomas}
                    <ButtonEdit onClick={() => handleEdit(index)}>Edit</ButtonEdit>{" "}
                    <ButtonDelete onClick={() => handleDelete(index)}>Delete</ButtonDelete>
                  </li>
                ))}
              </ul>
            )}
          </StyledDiv>
        </AppointmentsWrapper>
      </Wrapper>
    </>
  );
}

export default FormularioCitas;
