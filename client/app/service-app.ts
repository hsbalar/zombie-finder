import {Component, OnInit} from '@angular/core';

const template: string = require("./service-app.html");

@Component({
  selector: 'app',
  providers: [],
  template: template,
  directives: [],
  pipes: []
})
export class ServiceApp implements OnInit {
  private rows = 10;
  private cols = 10;
  private mines = 10;
  private grid10 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  private board = [];
  private count = 0;
  private gameResult = {
    text: undefined,
    won: false,
    over: false
  };

  constructor() {
    this.boardInit();
  }

  ngOnInit() {
    this.setupMines();
  }

  boardInit() {
    this.board = [];
    for (let i = 0, l = this.cols; i < l; i++) {
      this.board[i] = [];
      for (let j = 0, l2 = this.rows; j < l2; j++) {
        this.board[i][j] = this.coords();
      }
    }
  }

  setupMines() {
    let n = 0;
    while (n < this.mines) {
      let i = Math.floor(Math.random() * this.rows);
      let j = Math.floor(Math.random() * this.cols);
      if (!this.board[i][j].isMine) {
        let img = Math.floor(Math.random() * this.mines) + 1;
        this.board[i][j].isMine = true;
        this.board[i][j].image = 'zombie/images/'+ img + '.png';
        this.inc(i - 1, j - 1);
        this.inc(i - 1, j);
        this.inc(i - 1, j + 1);
        this.inc(i, j - 1);
        this.inc(i, j + 1);
        this.inc(i + 1, j - 1);
        this.inc(i + 1, j);
        this.inc(i + 1, j + 1);
        n++;
      }
    }
  }

  inc(i, j) {
    if (j < 0 || j >= this.cols) return;
    if (i < 0 || i >= this.rows) return;
    if (this.board[i][j].isMine) return;
    this.board[i][j].text += 1;
    let cnt = this.board[i][j].text;
    this.board[i][j].class = "tile-" + cnt;
  }

  coords() {
      return {
          text: 0,
          isMine: false,
          reveal: false,
          class: "",
          image: ""
      };
  };

  tileClick(e, i, j) {
    if (this.board[i][j].isMine) {
      this.gameResult.over = true;
      this.gameResult.text = "over";
    } else {
      this.boardReveal(i, j);
    }
    let unRevealed = 0;
    for (let i = 0, l = this.cols; i < l; i++) {
      for (let j = 0, l2 = this.rows; j < l2; j++) {
        if (!this.board[i][j].reveal) {
          unRevealed += 1;
        }
      }
    }
    if (unRevealed === this.mines) {
      this.gameResult.won = true;
      this.gameResult.text = "won";
    }
  }

  boardReveal(row, col) {
    if (row < 0 || row >= this.rows) return;
    if (col < 0 || col >= this.cols) return;

    if (this.board[row][col].reveal) return;

    if (this.board[row][col].isMine) {

    } else {
      if (this.board[row][col].text == 0) {
        this.board[row][col].reveal = true;
        this.boardReveal(row - 1, col);
        this.boardReveal(row, col - 1);
        this.boardReveal(row, col + 1);
        this.boardReveal(row + 1, col);
      } else {
        this.board[row][col].reveal = true;
      }
    }
  }

  retryClick(e) {
    e.preventDefault();
    this.gameResult = {
      text: undefined,
      won: false,
      over: false
    };
    this.boardInit();
    this.setupMines();
  }
}
