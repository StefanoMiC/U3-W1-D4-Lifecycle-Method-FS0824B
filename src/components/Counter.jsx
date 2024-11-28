import { Component } from "react";
import { Button } from "react-bootstrap";

class Counter extends Component {
  // ogni componente a classe può definire un suo stato interno in questo modo:
  state = {
    count: 0,
    name: "stefano"
  };

  // regola nr.1 degli Stati del componente è:

  // MAI MUTARE LO STATO DIRETTAMENTE! this.state.count = 1
  // per modificare lo Stato bisogna SEMPRE usare il metodo asincrono this.setState()

  // this.setState(object)
  // questo metodo si aspetta un oggetto con coppie chiave-valore che saranno quelle da modificare sull'oggetto di stato originale
  // in base a quello che passiamo nell'oggetto, lo stato modificherà una o più proprietà.

  // chiamare this.setState() notificherà React anche di un avvenuto cambiamento del suo stato interno del Componente
  // di conseguenza chiamerà un'altra volta il metodo render sulla nostra istanza di Classe

  // chiamare di nuovo render() farà sì che i valori dinamici usati all'interno del nostro JSX verranno rivalutati, e se diversi,
  // verranno cambiati automaticamente anche nel DOM reale.

  // è chiaro quindi perché non sia il caso di mutare direttamente lo Stato, ci perderemmo questa funzionalità utilissima!

  render() {
    console.log("RENDER COUNTER");
    return (
      <div>
        <h1
          className="text-center mt-4"
          onClick={() => {
            this.setState({ name: "Dario" }, () => {
              // questa callback verrà chiamata nel momento esattamente successivo al cambio effettivo di stato
              // ci permette di effettuare delle operazioni essendo sicuri che il valore impostato nello stato sia effettivamente arrivato
              console.log("nextState", this.state);
            });

            // questo console log leggerà ancora il valore di stato vecchio, perché this.setState() è un'operazione asincrona e
            // richiede del tempo per essere effettuata
            console.log("prevState", this.state.name);
          }}
        >
          {this.state.name}
        </h1>
        <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
          <Button variant="danger" onClick={() => this.setState({ count: this.state.count - 1 })}>
            -1
          </Button>
          <h2 className="mb-0"> {this.state.count} </h2>
          <Button variant="success" onClick={() => this.setState({ count: this.state.count + 1 })}>
            +1
          </Button>
        </div>
      </div>
    );
  }
}
export default Counter;
