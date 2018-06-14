//Losuje liczby z wybranego parametrami przedzialu
function fromRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function Game(board /* HTMLElement */) {
  this.interval = null;
  this.delay = 5000;
  this.board = board;
  this.lifes = 5;
  this.point = 0;
  this.timer = 5;
  let time = document.querySelector("#time");
  //odliczanie czasu
  this.clock = setInterval(() => {
    time.innerHTML = "czas " + this.timer;
    this.timer--;
    if (this.timer == 0) {
      this.timer = 5;
    }
  }, 1000);
  //zatrzymuje odliczanie czasu
  this.stopClock = function() {
    clearInterval(this.clock);
  };
  //klikniecie na board
  this.board.addEventListener("click", () => {
    let life = document.querySelector("#life");

    if (this.lifes <= 0) {
      this.stop();
      this.stopClock();
      this.board.removeEventListener("click");
    }
    this.lifes -= 1;
    life.innerHTML = "życie " + this.lifes;
  });
}

Game.prototype = {
  start: function() {
    this.interval = setInterval(() => {
      const s = new Square();
      this.board.appendChild(s.render());
      //gdy jest wiecęj 5 kwadratow to zatrzymaj
      if (this.board.children.length >= 5) {
        //zatrzymuje odliczanie czasu gdy jest 5 kwadratów na planszy
        this.stopClock();
        this.stop();
      }

      //użyć bind albo arrow function
      s.on("getPoint", () => {
        this.point += 1;
        let points = document.querySelector("#points");
        points.innerHTML = "punkty " + this.point;
      });
      s.off("getPoint", () => {
        this.point += 1;
        let points = document.querySelector("#points");
        points.innerHTML = "punkty " + this.point;
      });
    }, this.delay);
  },
  stop: function() {
    clearInterval(this.interval);
  }
};

function Square(options) {
  const defaults = {
    x: fromRange(0, 100),
    y: fromRange(0, 100),
    size: fromRange(20, 100),
    color: "red"
  };
  const settings = Object.assign({}, defaults, options);

  this.events = {};
  this.el = document.createElement("div");
  this.el.style.position = "absolute";
  this.el.style.left = `${settings.x}%`;
  this.el.style.top = `${settings.y}%`; //top
  this.el.style.width = `${settings.size}px`;
  this.el.style.height = `${settings.size}px`;
  this.el.style.background = settings.color;

  this.remove = function() {
    this.el.parentNode.removeChild(this.el);
  };

  this.el.addEventListener("click", e => {
    e.stopPropagation();
    e.preventDefault();
    this.emit("getPoint");
  });
  this.el.addEventListener("click", this.remove.bind(this));
}

Square.prototype = {
  render: function() {
    return this.el;
  },

  on: function(eventName, callback) {
    this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
  },
  off: function(eventName, callback) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === callback) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  emit: function(eventName, data) {
    const event = this.events[eventName];
    if (event) {
      event.forEach(callback => {
        callback(data);
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game(document.querySelector("#board"));
  game.start();
});

//publisher subscriber przeczytac
//backbone framework
//napisac eventemmmitera ktory ma dwie metody on i off
//przy remove odpiac emmiter
