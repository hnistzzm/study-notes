"use strict";
// enum Direction {
//     NORTH = 3,
//     SOUTH,
//     EAST,
//     WEST,
//   }
//   console.log(Direction.SOUTH);
var Direction;
(function (Direction) {
    Direction[Direction["NORTH"] = 0] = "NORTH";
    Direction[Direction["SOUTH"] = 1] = "SOUTH";
    Direction[Direction["EAST"] = 2] = "EAST";
    Direction[Direction["WEST"] = 3] = "WEST";
})(Direction || (Direction = {}));
console.log(Direction[0]);
