import React from "react";
import shuffleSeed from "shuffle-seed";

const cardPool = Array.from({ length: 100 }, (_, i) =>
  String(i + 1).padStart(3, "0")
);
export class ItoOnlineCardShuffler extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div>
        <h3>ito online card shuffler</h3>
        <p>1から100までのシャッフルされた数字を重複無く引くことができます。</p>
        <p>
          予め乱数のシード値を友人と共有し、各プレイヤーにIDを割り当ててください。
        </p>
        <ParamForm></ParamForm>
      </div>
    );
  }
}

class ParamForm extends React.Component {
  state: any;
  constructor(props: any) {
    super(props);
    this.state = {
      seedString: Math.floor(new Date().getTime() / 1000 / 60) % 100000,
      playerId: "",
      handSize: "",
      boardSize: "",
    };
    //[this.state,this.setState]=useState<string>("");

    this.handleChangeSeed = this.handleChangeSeed.bind(this);
    this.handleChangePlayerId = this.handleChangePlayerId.bind(this);
    this.handleChangeHandSize = this.handleChangeHandSize.bind(this);
    this.handleChangeBoardSize = this.handleChangeBoardSize.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeSeed(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ seedString: event.target.value });
  }
  handleChangePlayerId(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ playerId: event.target.value });
  }
  handleChangeHandSize(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ handSize: event.target.value });
  }
  handleChangeBoardSize(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ boardSize: event.target.value });
  }
  handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    //alert("A name was submitted:" + this.state.value);
    //event.preventDefault();
  }

  getHands() {
    if (
      !this.state.seedString ||
      !this.state.playerId ||
      !this.state.handSize ||
      !this.state.boardSize ||
      this.state.playerId < 1 ||
      this.state.playerId > 9 ||
      this.state.handSize < 0 ||
      this.state.handSize > 10 ||
      this.state.boardSize < 0 ||
      this.state.boardSize > 10
    ) {
      return [[], []];
    }
    const a = cardPool;
    const shuffled = shuffleSeed.shuffle(a, this.state.seedString);
    const start = 10 * Number(this.state.playerId);
    const end = start + Number(this.state.handSize);
    const slice = shuffled.slice(start, end).sort();
    //console.log(a);
    //console.log(shuffled);
    //console.log(slice);
    return [slice, shuffled.slice(0, this.state.boardSize)];
  }

  render() {
    return (
      <div className="param-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Seed(初期値は1分ごとに変化):
            <input
              type="text"
              value={this.state.seedString}
              onChange={this.handleChangeSeed}
              placeholder="乱数のシード値"
            />
          </label>
        </form>
        <form onSubmit={this.handleSubmit}>
          <label>
            playerID:
            <input
              type="number"
              value={this.state.playerId}
              onChange={this.handleChangePlayerId}
              min="1"
              max="9"
              placeholder="プレイヤーID (1-9)"
            />
          </label>
        </form>
        <form onSubmit={this.handleSubmit}>
          <label>
            # hand:
            <input
              type="number"
              value={this.state.HandSize}
              onChange={this.handleChangeHandSize}
              min="0"
              max="10"
              placeholder="手札枚数(0-10)"
            />
          </label>
        </form>
        <form onSubmit={this.handleSubmit}>
          <label>
            # board:
            <input
              type="number"
              value={this.state.boardSize}
              onChange={this.handleChangeBoardSize}
              min="0"
              max="10"
              placeholder="共有カード枚数(0-10)"
            />
          </label>
        </form>
        <div className="hand">
          <p>{this.getHands()[0].length > 0 ? "手札: " : ""}</p>
          <p> {this.getHands()[0].join(" ")}</p>
        </div>
        <div className="board">
          <p>{this.getHands()[1].length > 0 ? "ボード: " : ""}</p>
          <p> {this.getHands()[1].join(" ")}</p>
        </div>
      </div>
    );
  }
}
