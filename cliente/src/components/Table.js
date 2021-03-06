import React, { Component } from 'react';
import './Table.css';
import Outcome from './Outcome.js'

class Table extends Component {

  render() {

    const cardDisplay = function({rank, suit}) {

      if(rank === "secret" && suit === "secret") {
        return(
          <div className="cardHolder"
               style={{"margin": "2px",
                       "borderRadius": "5px",
                       "height": "65px",
                       "width": "45px",
                       "display": "flex",
                       "flexDirection": "column"}} key={rank+suit}>
            <img width="45" height="65" src="card.png"/>
          </div>
        )
      }

      let color = "black";

      if(suit === "diamond" || suit === "heart") {
        color = "#c42605";
      }

      switch (rank) {
      case 1:
        rank = "A";
        break;
      case 11:
        rank = "J";
        break;
      case 12:
        rank = "Q";
        break;
      case 13:
        rank = "K";
}

      return (
        <div className="cardHolder"
             style={{"margin": "2px",
                     "borderRadius": "3px",
                     "height": "65px",
                     "color": color,
                     "width": "45px",
                     "display": "flex",
                     "padding": "5px",
                     "flexDirection": "column"}} key={rank+suit}>
          <strong> { rank } </strong>
          <img style={{ "height": "30px"}} src={suit + ".png"}/>
        </div>
      );
    };

    const playerSpot = function({id, hand, score}) {

      const myTurn = function(heroId, turn) {
        if(turn === id) {
          return "solid rgba(240, 180, 0, 1)";
        } else {
          return "none";
        }
      };

      const isSeated = function(heroId) {
        if(id === heroId) {
          return "cyan";
        } else {
          return "red";
        }
      };

      return (
        <div style={{"border": myTurn(this.props.id, this.props.turn),
                     "padding": "5px"}}
             className="playerHand" key={id}>
          <div style={{"display": "flex",
                       "borderRadius": "5px",
                       "backgroundColor": isSeated(this.props.id)}}>
            {hand.length > 0 ? hand.map(cardDisplay) : "" } </div>
          <small>Puntuación: {score}</small>
        </div>
      );
    };


    const playerHands = this.props.players.map(playerSpot, this);

    const DealerCards = this.props.dealer.map(cardDisplay);

    const DealerComponent = function({dealer, score}){


      if(dealer.length > 0) {
        return (
          <div>
            <small>
              Casa
            </small>
            <div className="dealerSpot">
              {DealerCards}
            </div>
          </div>
        );
      } else {
        return <> <h1 style={{"color": "#052116"}}>BlackJack 21</h1>
        <img src='/bj.png'width="103" height="103" class="center"></img>
        <h3 class="center">Reglas:</h3>
        <ul>
          <li>Para ganar el juego, la puntuación del jugador debera ser lo más cercano a 21 puntos pero sin pasarse,
el que este más cerca de 21 gana.</li>
          <li>Cada jugador empieza con dos cartas boca arriba, la casa recibe una carta boca arriba.</li>
          <li>El jugador de decidir si plantarse o pedir otra carta para acercarse a 21. Plantarse es definitivo. </li>
          <li>Cada jugador en una partida recibe cartas de la misma baraja.</li>
        </ul>
          </>;
      }
    };


    return (
      <div className="Table">
        <DealerComponent dealer={this.props.dealer} score={this.props.dealerScore}/>
        <Outcome result={this.props.result}/>
        <div className="row">
          { playerHands }
        </div>
      </div>
    );
  }
}

export default Table;
