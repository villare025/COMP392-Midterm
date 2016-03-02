/// <reference path="../../typings/tsd.d.ts"/>
/*
Author:                Elaine Mae Villarino (villare025)
Last Modified By:      Elaine Mae Villarino (villare025)
Last Modified Date:    Wednesday, March 2nd, 2016
Program Description:   With Three.js, JavaScript, and TypeScript, create a web application that displays a 3D Tapered Tower.
                       The Tapered Tower will be made from Cube Meshes.
                       GUI Controls should allow the user/overseer to:
                         >> rotate each of the cubes in y direction with varying speeds
                         >> Placed 4th in class
Revision History:      https://github.com/villare025/COMP392-Midterm/commits/master
Last Modification:     Added Program Header
*/
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(cube1Speed, cube2Speed, cube3Speed, cube4Speed, cube5Speed) {
            this.cube1Speed = cube1Speed;
            this.cube2Speed = cube2Speed;
            this.cube3Speed = cube3Speed;
            this.cube4Speed = cube4Speed;
            this.cube5Speed = cube5Speed;
        }
        return Control;
    }());
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
