import { Col, Container, Row, Carousel, Image, Badge, ListGroup, Button, Alert } from "react-bootstrap";

import menu from "../data/menu.json";
import { Component } from "react";

class Home extends Component {
  // lo State è una memoria interna ad un componente a Classe
  // lo State è sempre un oggetto
  state = {
    // selectedPasta: null // null permette di fare da argine su un controllo con un ternario / short circuit operator
    selectedPasta: null
  };

  render() {
    // console.log("RENDER");
    return (
      <Container fluid="md" className="mt-5">
        {/* short circuit operator - blocca la renderizzazione del codice alla destra del && se il valore a sinistra è falsy */}
        {/* {this.state.selectedPasta && <Alert variant="info">Pasta selezionata</Alert>} */}
        <Row className="justify-content-center">
          <Col xs={10} md={8} xl={6}>
            <Carousel
              onSlid={slideIndex => {
                console.log("slide index", slideIndex);
                this.setState({ selectedPasta: menu[slideIndex] });
              }}
            >
              {/* per usare il map all'interno del JSX abbiamo bisogno di creare un'area di contenuto dinamico per 
            andare a risolvere l'espressione direttamente sul posto, quindi risolvere il map, 
            che si lascerà dietro di sé un array di elementi React che verranno renderizzati nella pagina.
            
            Per un corretto uso del map, avremo bisogno di applicare SEMPRE una prop key sul primo elemento ritornato dal map,
            per evitare che React ricrei l'intera lista nel caso in cui uno degli elementi debba cambiare nel tempo.
            */}
              {menu.map(pasta => {
                return (
                  // abbiamo ritornato tanti Carousel.Item quanti erano gli elementi dell'array

                  // IMPORTANTE:
                  // 1) ricordarsi il return (implicito o esplicito dal map!)
                  // 2) ricordarsi di applicare la prop key al primo elemento ritornato dal map (non sui figli)
                  <Carousel.Item key={`carousel-item-${pasta.id}`} onClick={() => this.setState({ selectedPasta: pasta })}>
                    {/*⚠️ mai chiamare setState fuori dal contesto di un evento o senza una funzione attorno.
                   risulterebbe in un loop infinito di setState che chiama render e render che chiama setState */}
                    <Image src={pasta.image} className="w-100" />
                    <Carousel.Caption>
                      <h3>{pasta.name}</h3>
                      <p>{pasta.description}</p>
                      <div>
                        <Badge bg="dark" className="mb-3">
                          {pasta.price}€
                        </Badge>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>
        </Row>

        {/* Quando abbiamo a che fare con valori di stato è buona prassi controllare la loro esistenza
        specialmente per il primo render iniziale, nel quale lo stato potrebbe non essere ancora presente (o essere null)
        
        Grazie a questo ternario, nel caso in cui lo stato sia vuoto inizialmente non si genererà un errore,
        ma ci sarà il fallback sul caso else del ternario stesso, generando un elemento alternativo ed
        evitando così errori che potrebbero nascere dalla lettura di null.comments ad esempio
        */}
        {this.state.selectedPasta ? (
          <Row className="justify-content-center">
            <h4 className="text-center mt-4">Recensioni per {this.state.selectedPasta.name}:</h4>
            <Col xs={10} md={8} xl={6}>
              <ListGroup>
                {this.state.selectedPasta.comments.map(review => (
                  <ListGroup.Item key={`review-${review.id}`}>
                    <strong>{review.author}</strong> — {review.comment}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        ) : (
          <Row className="justify-content-center mt-3">
            <Col xs={10} md={8} xl={6}>
              <Alert variant="warning">Seleziona una pasta per leggere le recensioni ☝️</Alert>
            </Col>
          </Row>
        )}

        {/* questo bottone ci permette di resettare lo stato alla sua condizione iniziale, di fatto riportando anche 
        l'interfaccia ad una condizione iniziale */}
        {this.state.selectedPasta && (
          <Button variant="danger" className="d-block mx-auto mt-5" onClick={() => this.setState({ selectedPasta: null })}>
            Reset
          </Button>
        )}
      </Container>
    );
  }
}

export default Home;
