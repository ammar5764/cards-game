import React, { Component } from "react";
import axios from "axios";
import "./Cards.css";
import Card from "./Card";

// const API_JEUX_CARTES = `${API_CARTES}/new/shuffle`;

export default class Cards extends Component {
  constructor() {
    super();
    this.state = {
      deck_id: null,
      cards: [],
    };
  }

  async componentDidMount() {
    //?
    const deck_id = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    ); //?

    this.setState({ deck_id: deck_id.data.deck_id }); //?
  }

  cartes = async () => {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=1` //?
    );
    console.log(`response`, response);
    var card = response.data.cards[0];
    var copyCard = [...this.state.cards, card];
    this.setState({ cards: copyCard });
  };

  render() {
    console.log(`this.state.deck_Id`, this.state.cards);
    return (
      <div>
        <h2>jeux de cartes</h2>
        <button onClick={this.cartes}>piocher une carte</button>
       {this.state.cards.map(c=><Card card={c} />)}
      </div>
    );
  }
}
