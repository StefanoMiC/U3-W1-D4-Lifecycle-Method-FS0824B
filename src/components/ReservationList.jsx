import { Component } from "react";
import { Alert, Badge, Button, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";

import { Trash3 } from "react-bootstrap-icons";

class ReservationList extends Component {
  state = {
    reservations: [], // questa porzione di stato la legheremo alla nostra UI, e salveremo al suo interno le prenotazioni arrivate dalla chiamata API
    isLoading: false,
    hasError: false,
    errorMessage: ""
  };

  fetchReservations = async () => {
    console.log("FETCH");

    this.setState({ isLoading: true });

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/reservation/");
      if (response.ok) {
        const reservations = await response.json();
        console.log("RESERVATIONS", reservations);

        // this.setState({ reservations: reservations });
        // se la variabile si chiama esattamente come la proprietà dell'oggetto dentro al quale vogliamo mettere il suo valore,
        // allora si può scrivere così:
        console.log("STATE UPDATING...");
        this.setState({ reservations }, () => console.log("STATE UPDATED")); // uguale alla sintassi precedente
      } else {
        throw new Error("Errore API");
      }
    } catch (error) {
      console.log(error);

      this.setState({ hasError: true, errorMessage: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  deleteReservation = async id => {
    // riceviamo l'id dal punto in cui deleteReservation viene chiamata (vedi JSX sottostante)

    // con questo id possiamo impostare una fetch che sappia quale elemento eliminare
    const response = await fetch("https://striveschool-api.herokuapp.com/api/reservation/" + id, { method: "DELETE" });
    try {
      if (response.ok) {
        // qui abbiamo certezza che l'elemento si sia cancellato effettivamente
        const deletedObj = await response.json();
        // alert(deletedObj.name + " è stato eliminato!");

        // visualizziamo avviso all'utente
        this.setState({ hasError: true, errorMessage: deletedObj.name + " è stato eliminato!" });

        // aggiorniamo la lista e di conseguenza gli elementi della UI senza l'elemento eliminato
        this.fetchReservations();

        // dopo 5 secondi l'avviso verrà chiuso e resettato
        setTimeout(() => this.setState({ hasError: false, errorMessage: "" }), 5000);
      } else {
        throw new Error("Errore cancellazione");
      }
    } catch (error) {
      console.log(error);
      this.setState({ hasError: true, errorMessage: error.message });
    }
  };

  componentDidMount() {
    console.log("componentDidMount()");

    // componentDidMount è il un metodo di "LifeCycle" (del ciclo di vita del componente).
    // senza il suo contributo non riusciremmo a creare un'interfaccia a partire da dei dati presenti in una API
    // questo perché al ricevimento dei dati avremo bisogno di settare uno stato, e ci serve un'area del codice
    // che non verrà richiamata dopo questo cambiamento
    // La sua particolarità è che VIENE ESEGUITO UNA VOLTA SOLA DA REACT! Alla fine del montaggio del componente nel quale è utilizzato.

    // 1) si istanzia il componente a Classe
    // 2) si crea il suo stato iniziale (con valori default)
    // 3) viene chiamato render() per la prima volta
    // 4) se presente, viene eseguito per la prima e unica volta il metodo componentDidMount()
    // 5) se nel componentDidMount avviene un setState, dopo il reperimento dei dati...
    // 6) viene ri-eseguito il metodo render(). Questo è collegato al fatto che ogni setState alla fine produrrà
    //    una nuova chiamata a render() (per OGNI cambio di stato)
    // 7) le parti di interfaccia collegate allo stato, a questo punto, potrebbero ri-generarsi, quindi potenzialmente cambiare
    // con i nuovi dati presenti nello stato

    // di conseguenza il componentDidMount() è il posto PERFETTO per effettuare chiamate API con cui popolare l'interfaccia al
    // primo caricamento del componente
    this.fetchReservations();
  }

  render() {
    console.log("render()");
    // this.fetchReservations(); // NON POSSIAMO CHIAMARE DENTRO RENDER la nostra funzione fetchReservations
    // perché all'interno ci sarà prima o poi un setState che in definitiva farà scattare un nuovo render() ==> LOOP INFINITO (loop della morte)

    const { title } = this.props;
    return (
      <Container>
        <h2 className="display-5 text-center mt-5">{title}</h2>
        {/* spinner visibile solo quando lo stato isLoading viene settato a true */}
        {this.state.isLoading && (
          <Spinner animation="border" role="status" variant="warning" className="d-block mx-auto my-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        <Row className="justify-content-center">
          <Col xs={10} md={8} xl={6}>
            {/* error visibile solo quando lo stato hasError viene settato a true */}
            {this.state.hasError && <Alert variant="danger">{this.state.errorMessage ? this.state.errorMessage : "Errore reperimento dati"}</Alert>}
            <ListGroup>
              {this.state.reservations.map(reserv => (
                <ListGroup.Item key={reserv._id} className="d-flex align-items-center gap-1">
                  <span className="lead">{reserv.name}</span> per <strong>{reserv.numberOfPeople} </strong> {reserv.smoking && <span>🚬</span>}
                  <Badge bg="light" className="text-bg-light fw-lighter ms-auto">
                    {new Date(reserv.dateTime).toLocaleString()}
                  </Badge>
                  <Button variant="danger" size="sm" onClick={() => this.deleteReservation(reserv._id)}>
                    <Trash3 />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReservationList;
