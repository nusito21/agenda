import React, { useEffect } from "react";
import PanelLateral from "../PanelLateral/PanelLateral";
import Contenedor from "../contenedor/contenedor";
import "react-toastify/dist/ReactToastify.css";
import "./ContenedorGeneral.css";
import { useNavigate } from "react-router-dom";
import { ModalFormNota } from "../modals/ModalformNota";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListaNotas from "../Notas/ListaNotas";
import { evaluate } from "mathjs";
import * as NotaServicio from "../Notas/NotaServicio";
import Cronograma from "../Cronograma/Cronograma";

var fecha = new Date();
var year = fecha.getFullYear();

const ContenedorGeneral = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cronograma, setCronograma] = useState(false);

  const cronogramaClose = () => setCronograma(false);
  const cronogramacaShow = () => setCronograma(true);

  const [lista, setLista] = useState(" ");


  const [notas, setNotas] = useState([]);

  const cargarNotas = async () => {
    const res = await NotaServicio.tomarNotas();

    const ordenNota = res.data
      .map((nota) => {
        return {
          ...nota,
          createdAt: nota.createdAt ? new Date(nota.createdAt) : new Date(),
          updatedAt: nota.updatedAt ? new Date(nota.updatedAt) : new Date(),
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    setNotas(ordenNota);
  };

  return (
    <>
      <div className="position-fixed" style={{ marginTop: "40vh" }}>
        <div className="d-grid ">
          <Button
            variant="primary"
            id="btn-la"
            onClick={handleShow}
            className="mb-1 border-r"
          >
            <span className="lbl-nota"></span>
          </Button>
          <Button
            variant="primary"
            id="btn-la"
            onClick={cronogramacaShow}
            className="mb-1 border-r "
          >
            <span className="lbl-cronograma"></span>
          </Button>
        </div>
      </div>

      <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
            <ModalFormNota cargarNotas={cargarNotas}></ModalFormNota>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListaNotas
              notas={notas}
              cargarNotas={cargarNotas}
              closeoffcanvas={handleClose}
              openoffcanvas={handleShow}
            ></ListaNotas>
          </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={cronograma} onHide={cronogramaClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
                <Cronograma></Cronograma>
          </Offcanvas.Body>
      </Offcanvas>
      <Contenedor></Contenedor>
    </>
  );
};

export default ContenedorGeneral;
