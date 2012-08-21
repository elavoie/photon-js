// 3D Cube Rotation
// http://www.speich.net/computer/moztesting/3d.htm
// Created by Simon Speich

var Q = new Array();
var MTrans = new Array();  // transformation matrix
var MQube = new Array();  // position information of qube
var I = new Array();      // entity matrix
var Origin = new Object();
var Testing = new Object();
var LoopTimer;

var DisplArea = new Object();
DisplArea.Width = 300;
DisplArea.Height = 300;

for ( var i = 20; i <= 160; i *= 2 ) {
  Init(i);
}

Q = null;
MTrans = null;
MQube = null;
I = null;
Origin = null;
Testing = null;
LoopTime = null;
DisplArea = null;
