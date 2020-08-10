var matrix = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

//Start Game Action
let win = false;
let prev = "";
let current = "";
let li = Math.floor(Math.random() * 16);
matrix[Math.floor(li / 4)][li % 4] = 2;
li = Math.floor(Math.random() * 16);
matrix[Math.floor(li / 4)][li % 4] = 2;

let started = false;
$(document).ready(function () {
  if (!started) {
    $(document).keypress(function () {
      start();
    });
  }
});

// Reading User Actions


$(document).ready(function () {
  $(document).on("swipeleft",function(event){
    if(started){
      prev = current;
      current = "ArrowLeft";
      left();
      render();
    }
    return;
  });
  $(document).on("swiperight",function(){
    if(started){
      prev = current;
      current = "ArrowRight";
      right();
      render();
    }
    return;
  });
  $(document).on("swipeup",function(){
    if(started){
      prev = current;
      current = "ArrowUp";
      up();
      render();
    }
    return;
  });
  $(document).on("swipedown",function(){
    if(started){
      prev = current;
      current = "ArrowDown";
      down();
      render();
    }
    return;
  });


  $(document).keyup(function (event) {
    $("#user-action").html("Recent Action <h2>" + event.key + "</h2>");

    if (event.key == "ArrowUp" && started) {
      prev = current;
      current = "ArrowUp";
      up();
      render();
    } else if (event.key == "ArrowRight" && started) {
      prev = current;
      current = "ArrowRight";
      right();
      render();
    } else if (event.key == "ArrowDown" && started) {
      prev = current;
      current = "ArrowDown";
      down();
      render();
    } else if (event.key == "ArrowLeft" && started) {
      prev = current;
      current = "ArrowLeft";
      left();
      render();
    }
    if (win) {
      reset();
    }
  });
});

render = function () {
  htmlCode = "";
  matrix.forEach((row) => {
    row.forEach((slotValue) => {
      if (slotValue) {
        var pow=0;
        var color="";
        if (slotValue && slotValue <= 16) {
          pow = slotValue * 16 - 1;
          color = "rgb(0, " + pow + ",0);";
        } else if (slotValue && slotValue <= 128) {
          pow = slotValue * 2 - 1;
          color = "rgb(0, 0, " + pow + ");";
        } else if (slotValue && slotValue <= 2048) {
          pow = slotValue / 8 - 1;
          color = "rgb(" + pow + ",0 , 0);";
        }

        htmlCode =
          htmlCode +
          '<div class="grid-item active-slot" style="background-color: ' +
          color +
          ';">' +
          slotValue +
          "</div>";
      } else
        htmlCode =
          htmlCode + '<div class="grid-item free-slot">' + " " + "</div>";
    });
  });
  $("#game-grid").html(htmlCode);
};

reset = function () {
  //   $(document).keypress("");
  matrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  win = false;
  prev = "";
  current = "";
  var li = Math.floor(Math.random() * 16);
  matrix[Math.floor(li / 4)][li % 4] = 2;
  var li = Math.floor(Math.random() * 16);
  matrix[Math.floor(li / 4)][li % 4] = 2;
  started = false;
  if (!started) {
    $(document).keypress(function () {
      start();
    });
  }
};

start = function () {
  started = true;
  $("#htmlBody").removeClass("game-over");
  $("#game-over-text").addClass("game-over-text-pre");
  $("#game-over-text").removeClass("game-over-text");
  $("#game-over-text").removeClass("game-over-text");
  $("#main-header").css("color", "white");
  $("#main-header").removeClass("main-heading-pre");
  $("#main-header").addClass("main-heading-post");
  $("#main-header").html("2 0 4 8");

  render();
};

gameOver = function () {
  $("#htmlBody").addClass("game-over");
  $("#game-over-text").removeClass("game-over-text-pre");
  $("#game-over-text").addClass("game-over-text");
  reset();
};
won = function () {
  $("#main-header").removeClass("main-heading-post");
  $("#main-header").addClass("main-heading-pre");
  $("#main-header").css("color", "Green");
  $("#main-header").html("You Made It!, Press any key to <em>play again</em>");
  //   reset();
};

// ***************************on click left*********************************
function left() {
  var newVal = (Math.floor((Math.random() * 4) / 3) + 1) * 2;
  //shiftLeft
  for (var i = 0; i < 4; i++) {
    count_gaps = 0;
    temp = [];
    for (var j = 0; j < 4; j++) {
      if (matrix[i][j] == 0) {
        count_gaps += 1;
      } else {
        temp.push(matrix[i][j]);
      }
    }
    matrix[i] = temp.concat(Array(count_gaps).fill(0));
  }
  var changes = 0;
  //addLeft
  for (var i = 0; i < 4; i++) {
    var j = 0;
    while (j < 3) {
      if (matrix[i][j] == matrix[i][j + 1]) {
        if (matrix[i][j]) changes = 1;
        matrix[i][j] = 2 * matrix[i][j];
        if (matrix[i][j] == 2048) {
          win = true;
        }
        matrix[i][j + 1] = 0;
        j += 2;
      } else {
        j += 1;
      }
    }
  }
  if (!changes) {
    if (current === prev) return;
  }
  var emptySlots = [];
  //shiftLeft
  for (var i = 0; i < 4; i++) {
    count_gaps = 0;
    temp = [];
    for (var j = 0; j < 4; j++) {
      if (matrix[i][j] == 0) {
        count_gaps += 1;
      } else {
        temp.push(matrix[i][j]);
      }
    }
    matrix[i] = temp.concat(Array(count_gaps).fill(0));
    for (j = 3; j > 3 - count_gaps; j--) {
      emptySlots.push([i, j]);
    }
  }

  //placeNewElement
  try {
    var slot = emptySlots[Math.floor(Math.random() * emptySlots.length)];
    matrix[slot[0]][slot[1]] = newVal;
    emptySlots = [];
  } catch (err) {
    gameOver();
  }
  if (win) won();
}

// ***************************on click right*********************************
function right() {
  var newVal = (Math.floor((Math.random() * 4) / 3) + 1) * 2;
  //shiftRight
  for (var i = 0; i < 4; i++) {
    count_gaps = 0;
    temp = [];
    for (var j = 0; j < 4; j++) {
      if (matrix[i][j] == 0) {
        count_gaps += 1;
      } else {
        temp.push(matrix[i][j]);
      }
    }
    matrix[i] = Array(count_gaps).fill(0).concat(temp);
  }
  var changes = 0;
  //addRight
  for (var i = 0; i < 4; i++) {
    var j = 3;
    while (j > 0) {
      if (matrix[i][j] == matrix[i][j - 1]) {
        if (matrix[i][j]) changes = 1;
        matrix[i][j] = 2 * matrix[i][j];
        if (matrix[i][j] == 2048) {
          win = true;
        }
        matrix[i][j - 1] = 0;
        j -= 2;
      } else {
        j -= 1;
      }
    }
  }
  if (!changes) {
    if (current === prev) return;
  }
  var emptySlots = [];
  //shiftRight
  for (var i = 0; i < 4; i++) {
    count_gaps = 0;
    temp = [];
    for (var j = 0; j < 4; j++) {
      if (matrix[i][j] == 0) {
        count_gaps += 1;
      } else {
        temp.push(matrix[i][j]);
      }
    }
    matrix[i] = Array(count_gaps).fill(0).concat(temp);
    for (j = 0; j < count_gaps; j++) {
      emptySlots.push([i, j]);
    }
  }

  //placeNewElement

  try {
    var slot = emptySlots[Math.floor(Math.random() * emptySlots.length)];
    matrix[slot[0]][slot[1]] = newVal;
    emptySlots = [];
  } catch (err) {
    gameOver();
  }
  if (win) won();
}

// ***************************on click up*********************************
function up() {
  var newVal = (Math.floor((Math.random() * 4) / 3) + 1) * 2;
  //shiftUp
  for (var j = 0; j < 4; j++) {
    count_gaps = 0;
    temp = [];
    for (var i = 0; i < 4; i++) {
      if (matrix[i][j] == 0) {
        count_gaps += 1;
      } else {
        temp.push(matrix[i][j]);
      }
    }
    temp = temp.concat(Array(count_gaps).fill(0));
    for (i = 0; i < 4; i++) {
      matrix[i][j] = temp[i];
    }
  }
  var changes = 0;
  //addUp
  for (var j = 0; j < 4; j++) {
    var i = 0;
    while (i < 3) {
      if (matrix[i][j] == matrix[i + 1][j]) {
        if (matrix[i][j]) changes = 1;
        matrix[i][j] = 2 * matrix[i][j];
        if (matrix[i][j] == 2048) {
          win = true;
        }
        matrix[i + 1][j] = 0;
        i += 2;
      } else {
        i += 1;
      }
    }
  }
  if (!changes) {
    if (current === prev) return;
  }
  var emptySlots = [];
  //shiftUp
  for (var j = 0; j < 4; j++) {
    count_gaps = 0;
    temp = [];
    for (var i = 0; i < 4; i++) {
      if (matrix[i][j] == 0) {
        count_gaps += 1;
      } else {
        temp.push(matrix[i][j]);
      }
    }
    temp = temp.concat(Array(count_gaps).fill(0));
    for (i = 0; i < 4; i++) {
      matrix[i][j] = temp[i];
    }
    for (i = 3; i > 3 - count_gaps; i--) {
      emptySlots.push([i, j]);
    }
  }

  //placeNewElement
  try {
    var slot = emptySlots[Math.floor(Math.random() * emptySlots.length)];
    matrix[slot[0]][slot[1]] = newVal;
    emptySlots = [];
  } catch (err) {
    gameOver();
  }
  if (win) won();
}

// ***************************on click down*********************************
function down() {
  var newVal = (Math.floor((Math.random() * 4) / 3) + 1) * 2;
  //shiftDown
  for (var j = 0; j < 4; j++) {
    count_gaps = 0;
    temp = [];
    for (var i = 0; i < 4; i++) {
      if (matrix[i][j] == 0) {
        count_gaps += 1;
      } else {
        temp.push(matrix[i][j]);
      }
    }
    temp = Array(count_gaps).fill(0).concat(temp);
    for (i = 0; i < 4; i++) {
      matrix[i][j] = temp[i];
    }
  }
  var changes = 0;
  //addDown
  for (var j = 0; j < 4; j++) {
    var i = 0;
    while (i < 3) {
      if (matrix[i][j] == matrix[i + 1][j]) {
        if (matrix[i][j]) changes = 1;
        matrix[i + 1][j] = 2 * matrix[i][j];
        if (matrix[i][j] == 2048) {
          win = true;
        }
        matrix[i][j] = 0;
        i += 2;
      } else {
        i += 1;
      }
    }
  }
  if (!changes) {
    if (current === prev) return;
  }
  var emptySlots = [];
  //shiftDown
  for (var j = 0; j < 4; j++) {
    count_gaps = 0;
    temp = [];
    for (var i = 0; i < 4; i++) {
      if (matrix[i][j] == 0) {
        count_gaps += 1;
      } else {
        temp.push(matrix[i][j]);
      }
    }
    temp = Array(count_gaps).fill(0).concat(temp);
    for (i = 0; i < 4; i++) {
      matrix[i][j] = temp[i];
    }
    for (i = 0; i < count_gaps; i++) {
      emptySlots.push([i, j]);
    }
  }

  //placeNewElement
  try {
    var slot = emptySlots[Math.floor(Math.random() * emptySlots.length)];
    matrix[slot[0]][slot[1]] = newVal;
    emptySlots = [];
  } catch (err) {
    gameOver();
  }
  if (win) won();
}
