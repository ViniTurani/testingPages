function ExcalidrawScene() {
	var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	this.elements = elements;
}

/* harmony default export */ const elements_ExcalidrawScene = (ExcalidrawScene);
;// CONCATENATED MODULE: ./node_modules/gl-matrix/esm/common.js
/**\r
 * Common utilities\r
 * @module glMatrix\r
 */
// Configuration Constants
var EPSILON = 0.000001;
var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
var RANDOM = Math.random;
/**\r
 * Sets the type of array used when creating new vectors and matrices\r
 *\r
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array\r
 */

function setMatrixArrayType(type) {
	ARRAY_TYPE = type;
}
var degree = Math.PI / 180;
/**\r
 * Convert Degree To Radian\r
 *\r
 * @param {Number} a Angle in Degrees\r
 */

function toRadian(a) {
	return a * degree;
}
/**\r
 * Tests whether or not the arguments have approximately the same value, within an absolute\r
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less\r
 * than or equal to 1.0, and a relative tolerance is used for larger values)\r
 *\r
 * @param {Number} a The first number to test.\r
 * @param {Number} b The second number to test.\r
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.\r
 */

function equals(a, b) {
	return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
}
if (!Math.hypot) Math.hypot = function () {
	var y = 0,
			i = arguments.length;

	while (i--) {
		y += arguments[i] * arguments[i];
	}

	return Math.sqrt(y);
};
;// CONCATENATED MODULE: ./node_modules/gl-matrix/esm/mat4.js

/**\r
 * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.\r
 * @module mat4\r
 */

/**\r
 * Creates a new identity mat4\r
 *\r
 * @returns {mat4} a new 4x4 matrix\r
 */

function create() {
	var out = new ARRAY_TYPE(16);

	if (ARRAY_TYPE != Float32Array) {
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
	}

	out[0] = 1;
	out[5] = 1;
	out[10] = 1;
	out[15] = 1;
	return out;
}
/**\r
 * Creates a new mat4 initialized with values from an existing matrix\r
 *\r
 * @param {ReadonlyMat4} a matrix to clone\r
 * @returns {mat4} a new 4x4 matrix\r
 */

function clone(a) {
	var out = new ARRAY_TYPE(16);
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	out[3] = a[3];
	out[4] = a[4];
	out[5] = a[5];
	out[6] = a[6];
	out[7] = a[7];
	out[8] = a[8];
	out[9] = a[9];
	out[10] = a[10];
	out[11] = a[11];
	out[12] = a[12];
	out[13] = a[13];
	out[14] = a[14];
	out[15] = a[15];
	return out;
}
/**\r
 * Copy the values from one mat4 to another\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the source matrix\r
 * @returns {mat4} out\r
 */

function copy(out, a) {
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	out[3] = a[3];
	out[4] = a[4];
	out[5] = a[5];
	out[6] = a[6];
	out[7] = a[7];
	out[8] = a[8];
	out[9] = a[9];
	out[10] = a[10];
	out[11] = a[11];
	out[12] = a[12];
	out[13] = a[13];
	out[14] = a[14];
	out[15] = a[15];
	return out;
}
/**\r
 * Create a new mat4 with the given values\r
 *\r
 * @param {Number} m00 Component in column 0, row 0 position (index 0)\r
 * @param {Number} m01 Component in column 0, row 1 position (index 1)\r
 * @param {Number} m02 Component in column 0, row 2 position (index 2)\r
 * @param {Number} m03 Component in column 0, row 3 position (index 3)\r
 * @param {Number} m10 Component in column 1, row 0 position (index 4)\r
 * @param {Number} m11 Component in column 1, row 1 position (index 5)\r
 * @param {Number} m12 Component in column 1, row 2 position (index 6)\r
 * @param {Number} m13 Component in column 1, row 3 position (index 7)\r
 * @param {Number} m20 Component in column 2, row 0 position (index 8)\r
 * @param {Number} m21 Component in column 2, row 1 position (index 9)\r
 * @param {Number} m22 Component in column 2, row 2 position (index 10)\r
 * @param {Number} m23 Component in column 2, row 3 position (index 11)\r
 * @param {Number} m30 Component in column 3, row 0 position (index 12)\r
 * @param {Number} m31 Component in column 3, row 1 position (index 13)\r
 * @param {Number} m32 Component in column 3, row 2 position (index 14)\r
 * @param {Number} m33 Component in column 3, row 3 position (index 15)\r
 * @returns {mat4} A new mat4\r
 */

function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
	var out = new ARRAY_TYPE(16);
	out[0] = m00;
	out[1] = m01;
	out[2] = m02;
	out[3] = m03;
	out[4] = m10;
	out[5] = m11;
	out[6] = m12;
	out[7] = m13;
	out[8] = m20;
	out[9] = m21;
	out[10] = m22;
	out[11] = m23;
	out[12] = m30;
	out[13] = m31;
	out[14] = m32;
	out[15] = m33;
	return out;
}
/**\r
 * Set the components of a mat4 to the given values\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {Number} m00 Component in column 0, row 0 position (index 0)\r
 * @param {Number} m01 Component in column 0, row 1 position (index 1)\r
 * @param {Number} m02 Component in column 0, row 2 position (index 2)\r
 * @param {Number} m03 Component in column 0, row 3 position (index 3)\r
 * @param {Number} m10 Component in column 1, row 0 position (index 4)\r
 * @param {Number} m11 Component in column 1, row 1 position (index 5)\r
 * @param {Number} m12 Component in column 1, row 2 position (index 6)\r
 * @param {Number} m13 Component in column 1, row 3 position (index 7)\r
 * @param {Number} m20 Component in column 2, row 0 position (index 8)\r
 * @param {Number} m21 Component in column 2, row 1 position (index 9)\r
 * @param {Number} m22 Component in column 2, row 2 position (index 10)\r
 * @param {Number} m23 Component in column 2, row 3 position (index 11)\r
 * @param {Number} m30 Component in column 3, row 0 position (index 12)\r
 * @param {Number} m31 Component in column 3, row 1 position (index 13)\r
 * @param {Number} m32 Component in column 3, row 2 position (index 14)\r
 * @param {Number} m33 Component in column 3, row 3 position (index 15)\r
 * @returns {mat4} out\r
 */

function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
	out[0] = m00;
	out[1] = m01;
	out[2] = m02;
	out[3] = m03;
	out[4] = m10;
	out[5] = m11;
	out[6] = m12;
	out[7] = m13;
	out[8] = m20;
	out[9] = m21;
	out[10] = m22;
	out[11] = m23;
	out[12] = m30;
	out[13] = m31;
	out[14] = m32;
	out[15] = m33;
	return out;
}
/**\r
 * Set a mat4 to the identity matrix\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @returns {mat4} out\r
 */

function identity(out) {
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = 1;
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[10] = 1;
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	return out;
}
/**\r
 * Transpose the values of a mat4\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the source matrix\r
 * @returns {mat4} out\r
 */

function transpose(out, a) {
	// If we are transposing ourselves we can skip a few steps but have to cache some values
	if (out === a) {
		var a01 = a[1],
				a02 = a[2],
				a03 = a[3];
		var a12 = a[6],
				a13 = a[7];
		var a23 = a[11];
		out[1] = a[4];
		out[2] = a[8];
		out[3] = a[12];
		out[4] = a01;
		out[6] = a[9];
		out[7] = a[13];
		out[8] = a02;
		out[9] = a12;
		out[11] = a[14];
		out[12] = a03;
		out[13] = a13;
		out[14] = a23;
	} else {
		out[0] = a[0];
		out[1] = a[4];
		out[2] = a[8];
		out[3] = a[12];
		out[4] = a[1];
		out[5] = a[5];
		out[6] = a[9];
		out[7] = a[13];
		out[8] = a[2];
		out[9] = a[6];
		out[10] = a[10];
		out[11] = a[14];
		out[12] = a[3];
		out[13] = a[7];
		out[14] = a[11];
		out[15] = a[15];
	}

	return out;
}
/**\r
 * Inverts a mat4\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the source matrix\r
 * @returns {mat4} out\r
 */

function invert(out, a) {
	var a00 = a[0],
			a01 = a[1],
			a02 = a[2],
			a03 = a[3];
	var a10 = a[4],
			a11 = a[5],
			a12 = a[6],
			a13 = a[7];
	var a20 = a[8],
			a21 = a[9],
			a22 = a[10],
			a23 = a[11];
	var a30 = a[12],
			a31 = a[13],
			a32 = a[14],
			a33 = a[15];
	var b00 = a00 * a11 - a01 * a10;
	var b01 = a00 * a12 - a02 * a10;
	var b02 = a00 * a13 - a03 * a10;
	var b03 = a01 * a12 - a02 * a11;
	var b04 = a01 * a13 - a03 * a11;
	var b05 = a02 * a13 - a03 * a12;
	var b06 = a20 * a31 - a21 * a30;
	var b07 = a20 * a32 - a22 * a30;
	var b08 = a20 * a33 - a23 * a30;
	var b09 = a21 * a32 - a22 * a31;
	var b10 = a21 * a33 - a23 * a31;
	var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

	var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	if (!det) {
		return null;
	}

	det = 1.0 / det;
	out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
	return out;
}
/**\r
 * Calculates the adjugate of a mat4\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the source matrix\r
 * @returns {mat4} out\r
 */

function adjoint(out, a) {
	var a00 = a[0],
			a01 = a[1],
			a02 = a[2],
			a03 = a[3];
	var a10 = a[4],
			a11 = a[5],
			a12 = a[6],
			a13 = a[7];
	var a20 = a[8],
			a21 = a[9],
			a22 = a[10],
			a23 = a[11];
	var a30 = a[12],
			a31 = a[13],
			a32 = a[14],
			a33 = a[15];
	out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
	out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
	out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
	out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
	out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
	out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
	out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
	out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
	out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
	out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
	out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
	out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
	out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
	out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
	out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
	out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
	return out;
}
/**\r
 * Calculates the determinant of a mat4\r
 *\r
 * @param {ReadonlyMat4} a the source matrix\r
 * @returns {Number} determinant of a\r
 */

function determinant(a) {
	var a00 = a[0],
			a01 = a[1],
			a02 = a[2],
			a03 = a[3];
	var a10 = a[4],
			a11 = a[5],
			a12 = a[6],
			a13 = a[7];
	var a20 = a[8],
			a21 = a[9],
			a22 = a[10],
			a23 = a[11];
	var a30 = a[12],
			a31 = a[13],
			a32 = a[14],
			a33 = a[15];
	var b00 = a00 * a11 - a01 * a10;
	var b01 = a00 * a12 - a02 * a10;
	var b02 = a00 * a13 - a03 * a10;
	var b03 = a01 * a12 - a02 * a11;
	var b04 = a01 * a13 - a03 * a11;
	var b05 = a02 * a13 - a03 * a12;
	var b06 = a20 * a31 - a21 * a30;
	var b07 = a20 * a32 - a22 * a30;
	var b08 = a20 * a33 - a23 * a30;
	var b09 = a21 * a32 - a22 * a31;
	var b10 = a21 * a33 - a23 * a31;
	var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

	return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
/**\r
 * Multiplies two mat4s\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the first operand\r
 * @param {ReadonlyMat4} b the second operand\r
 * @returns {mat4} out\r
 */

function multiply(out, a, b) {
	var a00 = a[0],
			a01 = a[1],
			a02 = a[2],
			a03 = a[3];
	var a10 = a[4],
			a11 = a[5],
			a12 = a[6],
			a13 = a[7];
	var a20 = a[8],
			a21 = a[9],
			a22 = a[10],
			a23 = a[11];
	var a30 = a[12],
			a31 = a[13],
			a32 = a[14],
			a33 = a[15]; // Cache only the current line of the second matrix

	var b0 = b[0],
			b1 = b[1],
			b2 = b[2],
			b3 = b[3];
	out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	b0 = b[4];
	b1 = b[5];
	b2 = b[6];
	b3 = b[7];
	out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	b0 = b[8];
	b1 = b[9];
	b2 = b[10];
	b3 = b[11];
	out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	b0 = b[12];
	b1 = b[13];
	b2 = b[14];
	b3 = b[15];
	out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	return out;
}
/**\r
 * Translate a mat4 by the given vector\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the matrix to translate\r
 * @param {ReadonlyVec3} v vector to translate by\r
 * @returns {mat4} out\r
 */

function translate(out, a, v) {
	var x = v[0],
			y = v[1],
			z = v[2];
	var a00, a01, a02, a03;
	var a10, a11, a12, a13;
	var a20, a21, a22, a23;

	if (a === out) {
		out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
		out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
		out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
		out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
	} else {
		a00 = a[0];
		a01 = a[1];
		a02 = a[2];
		a03 = a[3];
		a10 = a[4];
		a11 = a[5];
		a12 = a[6];
		a13 = a[7];
		a20 = a[8];
		a21 = a[9];
		a22 = a[10];
		a23 = a[11];
		out[0] = a00;
		out[1] = a01;
		out[2] = a02;
		out[3] = a03;
		out[4] = a10;
		out[5] = a11;
		out[6] = a12;
		out[7] = a13;
		out[8] = a20;
		out[9] = a21;
		out[10] = a22;
		out[11] = a23;
		out[12] = a00 * x + a10 * y + a20 * z + a[12];
		out[13] = a01 * x + a11 * y + a21 * z + a[13];
		out[14] = a02 * x + a12 * y + a22 * z + a[14];
		out[15] = a03 * x + a13 * y + a23 * z + a[15];
	}

	return out;
}
/**\r
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the matrix to scale\r
 * @param {ReadonlyVec3} v the vec3 to scale the matrix by\r
 * @returns {mat4} out\r
 **/

function scale(out, a, v) {
	var x = v[0],
			y = v[1],
			z = v[2];
	out[0] = a[0] * x;
	out[1] = a[1] * x;
	out[2] = a[2] * x;
	out[3] = a[3] * x;
	out[4] = a[4] * y;
	out[5] = a[5] * y;
	out[6] = a[6] * y;
	out[7] = a[7] * y;
	out[8] = a[8] * z;
	out[9] = a[9] * z;
	out[10] = a[10] * z;
	out[11] = a[11] * z;
	out[12] = a[12];
	out[13] = a[13];
	out[14] = a[14];
	out[15] = a[15];
	return out;
}
/**\r
 * Rotates a mat4 by the given angle around the given axis\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the matrix to rotate\r
 * @param {Number} rad the angle to rotate the matrix by\r
 * @param {ReadonlyVec3} axis the axis to rotate around\r
 * @returns {mat4} out\r
 */

function rotate(out, a, rad, axis) {
	var x = axis[0],
			y = axis[1],
			z = axis[2];
	var len = Math.hypot(x, y, z);
	var s, c, t;
	var a00, a01, a02, a03;
	var a10, a11, a12, a13;
	var a20, a21, a22, a23;
	var b00, b01, b02;
	var b10, b11, b12;
	var b20, b21, b22;

	if (len < glMatrix.EPSILON) {
		return null;
	}

	len = 1 / len;
	x *= len;
	y *= len;
	z *= len;
	s = Math.sin(rad);
	c = Math.cos(rad);
	t = 1 - c;
	a00 = a[0];
	a01 = a[1];
	a02 = a[2];
	a03 = a[3];
	a10 = a[4];
	a11 = a[5];
	a12 = a[6];
	a13 = a[7];
	a20 = a[8];
	a21 = a[9];
	a22 = a[10];
	a23 = a[11]; // Construct the elements of the rotation matrix

	b00 = x * x * t + c;
	b01 = y * x * t + z * s;
	b02 = z * x * t - y * s;
	b10 = x * y * t - z * s;
	b11 = y * y * t + c;
	b12 = z * y * t + x * s;
	b20 = x * z * t + y * s;
	b21 = y * z * t - x * s;
	b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

	out[0] = a00 * b00 + a10 * b01 + a20 * b02;
	out[1] = a01 * b00 + a11 * b01 + a21 * b02;
	out[2] = a02 * b00 + a12 * b01 + a22 * b02;
	out[3] = a03 * b00 + a13 * b01 + a23 * b02;
	out[4] = a00 * b10 + a10 * b11 + a20 * b12;
	out[5] = a01 * b10 + a11 * b11 + a21 * b12;
	out[6] = a02 * b10 + a12 * b11 + a22 * b12;
	out[7] = a03 * b10 + a13 * b11 + a23 * b12;
	out[8] = a00 * b20 + a10 * b21 + a20 * b22;
	out[9] = a01 * b20 + a11 * b21 + a21 * b22;
	out[10] = a02 * b20 + a12 * b21 + a22 * b22;
	out[11] = a03 * b20 + a13 * b21 + a23 * b22;

	if (a !== out) {
		// If the source and destination differ, copy the unchanged last row
		out[12] = a[12];
		out[13] = a[13];
		out[14] = a[14];
		out[15] = a[15];
	}

	return out;
}
/**\r
 * Rotates a matrix by the given angle around the X axis\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the matrix to rotate\r
 * @param {Number} rad the angle to rotate the matrix by\r
 * @returns {mat4} out\r
 */

function rotateX(out, a, rad) {
	var s = Math.sin(rad);
	var c = Math.cos(rad);
	var a10 = a[4];
	var a11 = a[5];
	var a12 = a[6];
	var a13 = a[7];
	var a20 = a[8];
	var a21 = a[9];
	var a22 = a[10];
	var a23 = a[11];

	if (a !== out) {
		// If the source and destination differ, copy the unchanged rows
		out[0] = a[0];
		out[1] = a[1];
		out[2] = a[2];
		out[3] = a[3];
		out[12] = a[12];
		out[13] = a[13];
		out[14] = a[14];
		out[15] = a[15];
	} // Perform axis-specific matrix multiplication


	out[4] = a10 * c + a20 * s;
	out[5] = a11 * c + a21 * s;
	out[6] = a12 * c + a22 * s;
	out[7] = a13 * c + a23 * s;
	out[8] = a20 * c - a10 * s;
	out[9] = a21 * c - a11 * s;
	out[10] = a22 * c - a12 * s;
	out[11] = a23 * c - a13 * s;
	return out;
}
/**\r
 * Rotates a matrix by the given angle around the Y axis\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the matrix to rotate\r
 * @param {Number} rad the angle to rotate the matrix by\r
 * @returns {mat4} out\r
 */

function rotateY(out, a, rad) {
	var s = Math.sin(rad);
	var c = Math.cos(rad);
	var a00 = a[0];
	var a01 = a[1];
	var a02 = a[2];
	var a03 = a[3];
	var a20 = a[8];
	var a21 = a[9];
	var a22 = a[10];
	var a23 = a[11];

	if (a !== out) {
		// If the source and destination differ, copy the unchanged rows
		out[4] = a[4];
		out[5] = a[5];
		out[6] = a[6];
		out[7] = a[7];
		out[12] = a[12];
		out[13] = a[13];
		out[14] = a[14];
		out[15] = a[15];
	} // Perform axis-specific matrix multiplication


	out[0] = a00 * c - a20 * s;
	out[1] = a01 * c - a21 * s;
	out[2] = a02 * c - a22 * s;
	out[3] = a03 * c - a23 * s;
	out[8] = a00 * s + a20 * c;
	out[9] = a01 * s + a21 * c;
	out[10] = a02 * s + a22 * c;
	out[11] = a03 * s + a23 * c;
	return out;
}
/**\r
 * Rotates a matrix by the given angle around the Z axis\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the matrix to rotate\r
 * @param {Number} rad the angle to rotate the matrix by\r
 * @returns {mat4} out\r
 */

function rotateZ(out, a, rad) {
	var s = Math.sin(rad);
	var c = Math.cos(rad);
	var a00 = a[0];
	var a01 = a[1];
	var a02 = a[2];
	var a03 = a[3];
	var a10 = a[4];
	var a11 = a[5];
	var a12 = a[6];
	var a13 = a[7];

	if (a !== out) {
		// If the source and destination differ, copy the unchanged last row
		out[8] = a[8];
		out[9] = a[9];
		out[10] = a[10];
		out[11] = a[11];
		out[12] = a[12];
		out[13] = a[13];
		out[14] = a[14];
		out[15] = a[15];
	} // Perform axis-specific matrix multiplication


	out[0] = a00 * c + a10 * s;
	out[1] = a01 * c + a11 * s;
	out[2] = a02 * c + a12 * s;
	out[3] = a03 * c + a13 * s;
	out[4] = a10 * c - a00 * s;
	out[5] = a11 * c - a01 * s;
	out[6] = a12 * c - a02 * s;
	out[7] = a13 * c - a03 * s;
	return out;
}
/**\r
 * Creates a matrix from a vector translation\r
 * This is equivalent to (but much faster than):\r
 *\r
 *		 mat4.identity(dest);\r
 *		 mat4.translate(dest, dest, vec);\r
 *\r
 * @param {mat4} out mat4 receiving operation result\r
 * @param {ReadonlyVec3} v Translation vector\r
 * @returns {mat4} out\r
 */

function fromTranslation(out, v) {
	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = 1;
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[10] = 1;
	out[11] = 0;
	out[12] = v[0];
	out[13] = v[1];
	out[14] = v[2];
	out[15] = 1;
	return out;
}
/**\r
 * Creates a matrix from a vector scaling\r
 * This is equivalent to (but much faster than):\r
 *\r
 *		 mat4.identity(dest);\r
 *		 mat4.scale(dest, dest, vec);\r
 *\r
 * @param {mat4} out mat4 receiving operation result\r
 * @param {ReadonlyVec3} v Scaling vector\r
 * @returns {mat4} out\r
 */

function fromScaling(out, v) {
	out[0] = v[0];
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = v[1];
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[10] = v[2];
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	return out;
}
/**\r
 * Creates a matrix from a given angle around a given axis\r
 * This is equivalent to (but much faster than):\r
 *\r
 *		 mat4.identity(dest);\r
 *		 mat4.rotate(dest, dest, rad, axis);\r
 *\r
 * @param {mat4} out mat4 receiving operation result\r
 * @param {Number} rad the angle to rotate the matrix by\r
 * @param {ReadonlyVec3} axis the axis to rotate around\r
 * @returns {mat4} out\r
 */

function fromRotation(out, rad, axis) {
	var x = axis[0],
			y = axis[1],
			z = axis[2];
	var len = Math.hypot(x, y, z);
	var s, c, t;

	if (len < glMatrix.EPSILON) {
		return null;
	}

	len = 1 / len;
	x *= len;
	y *= len;
	z *= len;
	s = Math.sin(rad);
	c = Math.cos(rad);
	t = 1 - c; // Perform rotation-specific matrix multiplication

	out[0] = x * x * t + c;
	out[1] = y * x * t + z * s;
	out[2] = z * x * t - y * s;
	out[3] = 0;
	out[4] = x * y * t - z * s;
	out[5] = y * y * t + c;
	out[6] = z * y * t + x * s;
	out[7] = 0;
	out[8] = x * z * t + y * s;
	out[9] = y * z * t - x * s;
	out[10] = z * z * t + c;
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	return out;
}
/**\r
 * Creates a matrix from the given angle around the X axis\r
 * This is equivalent to (but much faster than):\r
 *\r
 *		 mat4.identity(dest);\r
 *		 mat4.rotateX(dest, dest, rad);\r
 *\r
 * @param {mat4} out mat4 receiving operation result\r
 * @param {Number} rad the angle to rotate the matrix by\r
 * @returns {mat4} out\r
 */

function fromXRotation(out, rad) {
	var s = Math.sin(rad);
	var c = Math.cos(rad); // Perform axis-specific matrix multiplication

	out[0] = 1;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = c;
	out[6] = s;
	out[7] = 0;
	out[8] = 0;
	out[9] = -s;
	out[10] = c;
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	return out;
}
/**\r
 * Creates a matrix from the given angle around the Y axis\r
 * This is equivalent to (but much faster than):\r
 *\r
 *		 mat4.identity(dest);\r
 *		 mat4.rotateY(dest, dest, rad);\r
 *\r
 * @param {mat4} out mat4 receiving operation result\r
 * @param {Number} rad the angle to rotate the matrix by\r
 * @returns {mat4} out\r
 */

function fromYRotation(out, rad) {
	var s = Math.sin(rad);
	var c = Math.cos(rad); // Perform axis-specific matrix multiplication

	out[0] = c;
	out[1] = 0;
	out[2] = -s;
	out[3] = 0;
	out[4] = 0;
	out[5] = 1;
	out[6] = 0;
	out[7] = 0;
	out[8] = s;
	out[9] = 0;
	out[10] = c;
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	return out;
}
/**\r
 * Creates a matrix from the given angle around the Z axis\r
 * This is equivalent to (but much faster than):\r
 *\r
 *		 mat4.identity(dest);\r
 *		 mat4.rotateZ(dest, dest, rad);\r
 *\r
 * @param {mat4} out mat4 receiving operation result\r
 * @param {Number} rad the angle to rotate the matrix by\r
 * @returns {mat4} out\r
 */

function fromZRotation(out, rad) {
	var s = Math.sin(rad);
	var c = Math.cos(rad); // Perform axis-specific matrix multiplication

	out[0] = c;
	out[1] = s;
	out[2] = 0;
	out[3] = 0;
	out[4] = -s;
	out[5] = c;
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[10] = 1;
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	return out;
}
/**\r
 * Creates a matrix from a quaternion rotation and vector translation\r
 * This is equivalent to (but much faster than):\r
 *\r
 *		 mat4.identity(dest);\r
 *		 mat4.translate(dest, vec);\r
 *		 let quatMat = mat4.create();\r
 *		 quat4.toMat4(quat, quatMat);\r
 *		 mat4.multiply(dest, quatMat);\r
 *\r
 * @param {mat4} out mat4 receiving operation result\r
 * @param {quat4} q Rotation quaternion\r
 * @param {ReadonlyVec3} v Translation vector\r
 * @returns {mat4} out\r
 */

function fromRotationTranslation(out, q, v) {
	// Quaternion math
	var x = q[0],
			y = q[1],
			z = q[2],
			w = q[3];
	var x2 = x + x;
	var y2 = y + y;
	var z2 = z + z;
	var xx = x * x2;
	var xy = x * y2;
	var xz = x * z2;
	var yy = y * y2;
	var yz = y * z2;
	var zz = z * z2;
	var wx = w * x2;
	var wy = w * y2;
	var wz = w * z2;
	out[0] = 1 - (yy + zz);
	out[1] = xy + wz;
	out[2] = xz - wy;
	out[3] = 0;
	out[4] = xy - wz;
	out[5] = 1 - (xx + zz);
	out[6] = yz + wx;
	out[7] = 0;
	out[8] = xz + wy;
	out[9] = yz - wx;
	out[10] = 1 - (xx + yy);
	out[11] = 0;
	out[12] = v[0];
	out[13] = v[1];
	out[14] = v[2];
	out[15] = 1;
	return out;
}
/**\r
 * Creates a new mat4 from a dual quat.\r
 *\r
 * @param {mat4} out Matrix\r
 * @param {ReadonlyQuat2} a Dual Quaternion\r
 * @returns {mat4} mat4 receiving operation result\r
 */

function fromQuat2(out, a) {
	var translation = new glMatrix.ARRAY_TYPE(3);
	var bx = -a[0],
			by = -a[1],
			bz = -a[2],
			bw = a[3],
			ax = a[4],
			ay = a[5],
			az = a[6],
			aw = a[7];
	var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

	if (magnitude > 0) {
		translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
		translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
		translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
	} else {
		translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
		translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
		translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
	}

	fromRotationTranslation(out, a, translation);
	return out;
}
/**\r
 * Returns the translation vector component of a transformation\r
 *	matrix. If a matrix is built with fromRotationTranslation,\r
 *	the returned vector will be the same as the translation vector\r
 *	originally supplied.\r
 * @param	{vec3} out Vector to receive translation component\r
 * @param	{ReadonlyMat4} mat Matrix to be decomposed (input)\r
 * @return {vec3} out\r
 */

function getTranslation(out, mat) {
	out[0] = mat[12];
	out[1] = mat[13];
	out[2] = mat[14];
	return out;
}
/**\r
 * Returns the scaling factor component of a transformation\r
 *	matrix. If a matrix is built with fromRotationTranslationScale\r
 *	with a normalized Quaternion paramter, the returned vector will be\r
 *	the same as the scaling vector\r
 *	originally supplied.\r
 * @param	{vec3} out Vector to receive scaling factor component\r
 * @param	{ReadonlyMat4} mat Matrix to be decomposed (input)\r
 * @return {vec3} out\r
 */

function getScaling(out, mat) {
	var m11 = mat[0];
	var m12 = mat[1];
	var m13 = mat[2];
	var m21 = mat[4];
	var m22 = mat[5];
	var m23 = mat[6];
	var m31 = mat[8];
	var m32 = mat[9];
	var m33 = mat[10];
	out[0] = Math.hypot(m11, m12, m13);
	out[1] = Math.hypot(m21, m22, m23);
	out[2] = Math.hypot(m31, m32, m33);
	return out;
}
/**\r
 * Returns a quaternion representing the rotational component\r
 *	of a transformation matrix. If a matrix is built with\r
 *	fromRotationTranslation, the returned quaternion will be the\r
 *	same as the quaternion originally supplied.\r
 * @param {quat} out Quaternion to receive the rotation component\r
 * @param {ReadonlyMat4} mat Matrix to be decomposed (input)\r
 * @return {quat} out\r
 */

function getRotation(out, mat) {
	var scaling = new glMatrix.ARRAY_TYPE(3);
	getScaling(scaling, mat);
	var is1 = 1 / scaling[0];
	var is2 = 1 / scaling[1];
	var is3 = 1 / scaling[2];
	var sm11 = mat[0] * is1;
	var sm12 = mat[1] * is2;
	var sm13 = mat[2] * is3;
	var sm21 = mat[4] * is1;
	var sm22 = mat[5] * is2;
	var sm23 = mat[6] * is3;
	var sm31 = mat[8] * is1;
	var sm32 = mat[9] * is2;
	var sm33 = mat[10] * is3;
	var trace = sm11 + sm22 + sm33;
	var S = 0;

	if (trace > 0) {
		S = Math.sqrt(trace + 1.0) * 2;
		out[3] = 0.25 * S;
		out[0] = (sm23 - sm32) / S;
		out[1] = (sm31 - sm13) / S;
		out[2] = (sm12 - sm21) / S;
	} else if (sm11 > sm22 && sm11 > sm33) {
		S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
		out[3] = (sm23 - sm32) / S;
		out[0] = 0.25 * S;
		out[1] = (sm12 + sm21) / S;
		out[2] = (sm31 + sm13) / S;
	} else if (sm22 > sm33) {
		S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
		out[3] = (sm31 - sm13) / S;
		out[0] = (sm12 + sm21) / S;
		out[1] = 0.25 * S;
		out[2] = (sm23 + sm32) / S;
	} else {
		S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
		out[3] = (sm12 - sm21) / S;
		out[0] = (sm31 + sm13) / S;
		out[1] = (sm23 + sm32) / S;
		out[2] = 0.25 * S;
	}

	return out;
}
/**\r
 * Creates a matrix from a quaternion rotation, vector translation and vector scale\r
 * This is equivalent to (but much faster than):\r
 *\r
 *		 mat4.identity(dest);\r
 *		 mat4.translate(dest, vec);\r
 *		 let quatMat = mat4.create();\r
 *		 quat4.toMat4(quat, quatMat);\r
 *		 mat4.multiply(dest, quatMat);\r
 *		 mat4.scale(dest, scale)\r
 *\r
 * @param {mat4} out mat4 receiving operation result\r
 * @param {quat4} q Rotation quaternion\r
 * @param {ReadonlyVec3} v Translation vector\r
 * @param {ReadonlyVec3} s Scaling vector\r
 * @returns {mat4} out\r
 */

function fromRotationTranslationScale(out, q, v, s) {
	// Quaternion math
	var x = q[0],
			y = q[1],
			z = q[2],
			w = q[3];
	var x2 = x + x;
	var y2 = y + y;
	var z2 = z + z;
	var xx = x * x2;
	var xy = x * y2;
	var xz = x * z2;
	var yy = y * y2;
	var yz = y * z2;
	var zz = z * z2;
	var wx = w * x2;
	var wy = w * y2;
	var wz = w * z2;
	var sx = s[0];
	var sy = s[1];
	var sz = s[2];
	out[0] = (1 - (yy + zz)) * sx;
	out[1] = (xy + wz) * sx;
	out[2] = (xz - wy) * sx;
	out[3] = 0;
	out[4] = (xy - wz) * sy;
	out[5] = (1 - (xx + zz)) * sy;
	out[6] = (yz + wx) * sy;
	out[7] = 0;
	out[8] = (xz + wy) * sz;
	out[9] = (yz - wx) * sz;
	out[10] = (1 - (xx + yy)) * sz;
	out[11] = 0;
	out[12] = v[0];
	out[13] = v[1];
	out[14] = v[2];
	out[15] = 1;
	return out;
}
/**\r
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin\r
 * This is equivalent to (but much faster than):\r
 *\r
 *		 mat4.identity(dest);\r
 *		 mat4.translate(dest, vec);\r
 *		 mat4.translate(dest, origin);\r
 *		 let quatMat = mat4.create();\r
 *		 quat4.toMat4(quat, quatMat);\r
 *		 mat4.multiply(dest, quatMat);\r
 *		 mat4.scale(dest, scale)\r
 *		 mat4.translate(dest, negativeOrigin);\r
 *\r
 * @param {mat4} out mat4 receiving operation result\r
 * @param {quat4} q Rotation quaternion\r
 * @param {ReadonlyVec3} v Translation vector\r
 * @param {ReadonlyVec3} s Scaling vector\r
 * @param {ReadonlyVec3} o The origin vector around which to scale and rotate\r
 * @returns {mat4} out\r
 */

function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
	// Quaternion math
	var x = q[0],
			y = q[1],
			z = q[2],
			w = q[3];
	var x2 = x + x;
	var y2 = y + y;
	var z2 = z + z;
	var xx = x * x2;
	var xy = x * y2;
	var xz = x * z2;
	var yy = y * y2;
	var yz = y * z2;
	var zz = z * z2;
	var wx = w * x2;
	var wy = w * y2;
	var wz = w * z2;
	var sx = s[0];
	var sy = s[1];
	var sz = s[2];
	var ox = o[0];
	var oy = o[1];
	var oz = o[2];
	var out0 = (1 - (yy + zz)) * sx;
	var out1 = (xy + wz) * sx;
	var out2 = (xz - wy) * sx;
	var out4 = (xy - wz) * sy;
	var out5 = (1 - (xx + zz)) * sy;
	var out6 = (yz + wx) * sy;
	var out8 = (xz + wy) * sz;
	var out9 = (yz - wx) * sz;
	var out10 = (1 - (xx + yy)) * sz;
	out[0] = out0;
	out[1] = out1;
	out[2] = out2;
	out[3] = 0;
	out[4] = out4;
	out[5] = out5;
	out[6] = out6;
	out[7] = 0;
	out[8] = out8;
	out[9] = out9;
	out[10] = out10;
	out[11] = 0;
	out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
	out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
	out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
	out[15] = 1;
	return out;
}
/**\r
 * Calculates a 4x4 matrix from the given quaternion\r
 *\r
 * @param {mat4} out mat4 receiving operation result\r
 * @param {ReadonlyQuat} q Quaternion to create matrix from\r
 *\r
 * @returns {mat4} out\r
 */

function fromQuat(out, q) {
	var x = q[0],
			y = q[1],
			z = q[2],
			w = q[3];
	var x2 = x + x;
	var y2 = y + y;
	var z2 = z + z;
	var xx = x * x2;
	var yx = y * x2;
	var yy = y * y2;
	var zx = z * x2;
	var zy = z * y2;
	var zz = z * z2;
	var wx = w * x2;
	var wy = w * y2;
	var wz = w * z2;
	out[0] = 1 - yy - zz;
	out[1] = yx + wz;
	out[2] = zx - wy;
	out[3] = 0;
	out[4] = yx - wz;
	out[5] = 1 - xx - zz;
	out[6] = zy + wx;
	out[7] = 0;
	out[8] = zx + wy;
	out[9] = zy - wx;
	out[10] = 1 - xx - yy;
	out[11] = 0;
	out[12] = 0;
	out[13] = 0;
	out[14] = 0;
	out[15] = 1;
	return out;
}
/**\r
 * Generates a frustum matrix with the given bounds\r
 *\r
 * @param {mat4} out mat4 frustum matrix will be written into\r
 * @param {Number} left Left bound of the frustum\r
 * @param {Number} right Right bound of the frustum\r
 * @param {Number} bottom Bottom bound of the frustum\r
 * @param {Number} top Top bound of the frustum\r
 * @param {Number} near Near bound of the frustum\r
 * @param {Number} far Far bound of the frustum\r
 * @returns {mat4} out\r
 */

function frustum(out, left, right, bottom, top, near, far) {
	var rl = 1 / (right - left);
	var tb = 1 / (top - bottom);
	var nf = 1 / (near - far);
	out[0] = near * 2 * rl;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = near * 2 * tb;
	out[6] = 0;
	out[7] = 0;
	out[8] = (right + left) * rl;
	out[9] = (top + bottom) * tb;
	out[10] = (far + near) * nf;
	out[11] = -1;
	out[12] = 0;
	out[13] = 0;
	out[14] = far * near * 2 * nf;
	out[15] = 0;
	return out;
}
/**\r
 * Generates a perspective projection matrix with the given bounds.\r
 * Passing null/undefined/no value for far will generate infinite projection matrix.\r
 *\r
 * @param {mat4} out mat4 frustum matrix will be written into\r
 * @param {number} fovy Vertical field of view in radians\r
 * @param {number} aspect Aspect ratio. typically viewport width/height\r
 * @param {number} near Near bound of the frustum\r
 * @param {number} far Far bound of the frustum, can be null or Infinity\r
 * @returns {mat4} out\r
 */

function perspective(out, fovy, aspect, near, far) {
	var f = 1.0 / Math.tan(fovy / 2),
			nf;
	out[0] = f / aspect;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = f;
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[11] = -1;
	out[12] = 0;
	out[13] = 0;
	out[15] = 0;

	if (far != null && far !== Infinity) {
		nf = 1 / (near - far);
		out[10] = (far + near) * nf;
		out[14] = 2 * far * near * nf;
	} else {
		out[10] = -1;
		out[14] = -2 * near;
	}

	return out;
}
/**\r
 * Generates a perspective projection matrix with the given field of view.\r
 * This is primarily useful for generating projection matrices to be used\r
 * with the still experiemental WebVR API.\r
 *\r
 * @param {mat4} out mat4 frustum matrix will be written into\r
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees\r
 * @param {number} near Near bound of the frustum\r
 * @param {number} far Far bound of the frustum\r
 * @returns {mat4} out\r
 */

function perspectiveFromFieldOfView(out, fov, near, far) {
	var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
	var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
	var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
	var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
	var xScale = 2.0 / (leftTan + rightTan);
	var yScale = 2.0 / (upTan + downTan);
	out[0] = xScale;
	out[1] = 0.0;
	out[2] = 0.0;
	out[3] = 0.0;
	out[4] = 0.0;
	out[5] = yScale;
	out[6] = 0.0;
	out[7] = 0.0;
	out[8] = -((leftTan - rightTan) * xScale * 0.5);
	out[9] = (upTan - downTan) * yScale * 0.5;
	out[10] = far / (near - far);
	out[11] = -1.0;
	out[12] = 0.0;
	out[13] = 0.0;
	out[14] = far * near / (near - far);
	out[15] = 0.0;
	return out;
}
/**\r
 * Generates a orthogonal projection matrix with the given bounds\r
 *\r
 * @param {mat4} out mat4 frustum matrix will be written into\r
 * @param {number} left Left bound of the frustum\r
 * @param {number} right Right bound of the frustum\r
 * @param {number} bottom Bottom bound of the frustum\r
 * @param {number} top Top bound of the frustum\r
 * @param {number} near Near bound of the frustum\r
 * @param {number} far Far bound of the frustum\r
 * @returns {mat4} out\r
 */

function ortho(out, left, right, bottom, top, near, far) {
	var lr = 1 / (left - right);
	var bt = 1 / (bottom - top);
	var nf = 1 / (near - far);
	out[0] = -2 * lr;
	out[1] = 0;
	out[2] = 0;
	out[3] = 0;
	out[4] = 0;
	out[5] = -2 * bt;
	out[6] = 0;
	out[7] = 0;
	out[8] = 0;
	out[9] = 0;
	out[10] = 2 * nf;
	out[11] = 0;
	out[12] = (left + right) * lr;
	out[13] = (top + bottom) * bt;
	out[14] = (far + near) * nf;
	out[15] = 1;
	return out;
}
/**\r
 * Generates a look-at matrix with the given eye position, focal point, and up axis.\r
 * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.\r
 *\r
 * @param {mat4} out mat4 frustum matrix will be written into\r
 * @param {ReadonlyVec3} eye Position of the viewer\r
 * @param {ReadonlyVec3} center Point the viewer is looking at\r
 * @param {ReadonlyVec3} up vec3 pointing up\r
 * @returns {mat4} out\r
 */

function lookAt(out, eye, center, up) {
	var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
	var eyex = eye[0];
	var eyey = eye[1];
	var eyez = eye[2];
	var upx = up[0];
	var upy = up[1];
	var upz = up[2];
	var centerx = center[0];
	var centery = center[1];
	var centerz = center[2];

	if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
		return identity(out);
	}

	z0 = eyex - centerx;
	z1 = eyey - centery;
	z2 = eyez - centerz;
	len = 1 / Math.hypot(z0, z1, z2);
	z0 *= len;
	z1 *= len;
	z2 *= len;
	x0 = upy * z2 - upz * z1;
	x1 = upz * z0 - upx * z2;
	x2 = upx * z1 - upy * z0;
	len = Math.hypot(x0, x1, x2);

	if (!len) {
		x0 = 0;
		x1 = 0;
		x2 = 0;
	} else {
		len = 1 / len;
		x0 *= len;
		x1 *= len;
		x2 *= len;
	}

	y0 = z1 * x2 - z2 * x1;
	y1 = z2 * x0 - z0 * x2;
	y2 = z0 * x1 - z1 * x0;
	len = Math.hypot(y0, y1, y2);

	if (!len) {
		y0 = 0;
		y1 = 0;
		y2 = 0;
	} else {
		len = 1 / len;
		y0 *= len;
		y1 *= len;
		y2 *= len;
	}

	out[0] = x0;
	out[1] = y0;
	out[2] = z0;
	out[3] = 0;
	out[4] = x1;
	out[5] = y1;
	out[6] = z1;
	out[7] = 0;
	out[8] = x2;
	out[9] = y2;
	out[10] = z2;
	out[11] = 0;
	out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
	out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
	out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
	out[15] = 1;
	return out;
}
/**\r
 * Generates a matrix that makes something look at something else.\r
 *\r
 * @param {mat4} out mat4 frustum matrix will be written into\r
 * @param {ReadonlyVec3} eye Position of the viewer\r
 * @param {ReadonlyVec3} center Point the viewer is looking at\r
 * @param {ReadonlyVec3} up vec3 pointing up\r
 * @returns {mat4} out\r
 */

function targetTo(out, eye, target, up) {
	var eyex = eye[0],
			eyey = eye[1],
			eyez = eye[2],
			upx = up[0],
			upy = up[1],
			upz = up[2];
	var z0 = eyex - target[0],
			z1 = eyey - target[1],
			z2 = eyez - target[2];
	var len = z0 * z0 + z1 * z1 + z2 * z2;

	if (len > 0) {
		len = 1 / Math.sqrt(len);
		z0 *= len;
		z1 *= len;
		z2 *= len;
	}

	var x0 = upy * z2 - upz * z1,
			x1 = upz * z0 - upx * z2,
			x2 = upx * z1 - upy * z0;
	len = x0 * x0 + x1 * x1 + x2 * x2;

	if (len > 0) {
		len = 1 / Math.sqrt(len);
		x0 *= len;
		x1 *= len;
		x2 *= len;
	}

	out[0] = x0;
	out[1] = x1;
	out[2] = x2;
	out[3] = 0;
	out[4] = z1 * x2 - z2 * x1;
	out[5] = z2 * x0 - z0 * x2;
	out[6] = z0 * x1 - z1 * x0;
	out[7] = 0;
	out[8] = z0;
	out[9] = z1;
	out[10] = z2;
	out[11] = 0;
	out[12] = eyex;
	out[13] = eyey;
	out[14] = eyez;
	out[15] = 1;
	return out;
}
/**\r
 * Returns a string representation of a mat4\r
 *\r
 * @param {ReadonlyMat4} a matrix to represent as a string\r
 * @returns {String} string representation of the matrix\r
 */

function str(a) {
	return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
}
/**\r
 * Returns Frobenius norm of a mat4\r
 *\r
 * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of\r
 * @returns {Number} Frobenius norm\r
 */

function frob(a) {
	return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
}
/**\r
 * Adds two mat4's\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the first operand\r
 * @param {ReadonlyMat4} b the second operand\r
 * @returns {mat4} out\r
 */

function add(out, a, b) {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	out[3] = a[3] + b[3];
	out[4] = a[4] + b[4];
	out[5] = a[5] + b[5];
	out[6] = a[6] + b[6];
	out[7] = a[7] + b[7];
	out[8] = a[8] + b[8];
	out[9] = a[9] + b[9];
	out[10] = a[10] + b[10];
	out[11] = a[11] + b[11];
	out[12] = a[12] + b[12];
	out[13] = a[13] + b[13];
	out[14] = a[14] + b[14];
	out[15] = a[15] + b[15];
	return out;
}
/**\r
 * Subtracts matrix b from matrix a\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the first operand\r
 * @param {ReadonlyMat4} b the second operand\r
 * @returns {mat4} out\r
 */

function subtract(out, a, b) {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	out[3] = a[3] - b[3];
	out[4] = a[4] - b[4];
	out[5] = a[5] - b[5];
	out[6] = a[6] - b[6];
	out[7] = a[7] - b[7];
	out[8] = a[8] - b[8];
	out[9] = a[9] - b[9];
	out[10] = a[10] - b[10];
	out[11] = a[11] - b[11];
	out[12] = a[12] - b[12];
	out[13] = a[13] - b[13];
	out[14] = a[14] - b[14];
	out[15] = a[15] - b[15];
	return out;
}
/**\r
 * Multiply each element of the matrix by a scalar.\r
 *\r
 * @param {mat4} out the receiving matrix\r
 * @param {ReadonlyMat4} a the matrix to scale\r
 * @param {Number} b amount to scale the matrix's elements by\r
 * @returns {mat4} out\r
 */

function multiplyScalar(out, a, b) {
	out[0] = a[0] * b;
	out[1] = a[1] * b;
	out[2] = a[2] * b;
	out[3] = a[3] * b;
	out[4] = a[4] * b;
	out[5] = a[5] * b;
	out[6] = a[6] * b;
	out[7] = a[7] * b;
	out[8] = a[8] * b;
	out[9] = a[9] * b;
	out[10] = a[10] * b;
	out[11] = a[11] * b;
	out[12] = a[12] * b;
	out[13] = a[13] * b;
	out[14] = a[14] * b;
	out[15] = a[15] * b;
	return out;
}
/**\r
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.\r
 *\r
 * @param {mat4} out the receiving vector\r
 * @param {ReadonlyMat4} a the first operand\r
 * @param {ReadonlyMat4} b the second operand\r
 * @param {Number} scale the amount to scale b's elements by before adding\r
 * @returns {mat4} out\r
 */

function multiplyScalarAndAdd(out, a, b, scale) {
	out[0] = a[0] + b[0] * scale;
	out[1] = a[1] + b[1] * scale;
	out[2] = a[2] + b[2] * scale;
	out[3] = a[3] + b[3] * scale;
	out[4] = a[4] + b[4] * scale;
	out[5] = a[5] + b[5] * scale;
	out[6] = a[6] + b[6] * scale;
	out[7] = a[7] + b[7] * scale;
	out[8] = a[8] + b[8] * scale;
	out[9] = a[9] + b[9] * scale;
	out[10] = a[10] + b[10] * scale;
	out[11] = a[11] + b[11] * scale;
	out[12] = a[12] + b[12] * scale;
	out[13] = a[13] + b[13] * scale;
	out[14] = a[14] + b[14] * scale;
	out[15] = a[15] + b[15] * scale;
	return out;
}
/**\r
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)\r
 *\r
 * @param {ReadonlyMat4} a The first matrix.\r
 * @param {ReadonlyMat4} b The second matrix.\r
 * @returns {Boolean} True if the matrices are equal, false otherwise.\r
 */

function exactEquals(a, b) {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
}
/**\r
 * Returns whether or not the matrices have approximately the same elements in the same position.\r
 *\r
 * @param {ReadonlyMat4} a The first matrix.\r
 * @param {ReadonlyMat4} b The second matrix.\r
 * @returns {Boolean} True if the matrices are equal, false otherwise.\r
 */

function mat4_equals(a, b) {
	var a0 = a[0],
			a1 = a[1],
			a2 = a[2],
			a3 = a[3];
	var a4 = a[4],
			a5 = a[5],
			a6 = a[6],
			a7 = a[7];
	var a8 = a[8],
			a9 = a[9],
			a10 = a[10],
			a11 = a[11];
	var a12 = a[12],
			a13 = a[13],
			a14 = a[14],
			a15 = a[15];
	var b0 = b[0],
			b1 = b[1],
			b2 = b[2],
			b3 = b[3];
	var b4 = b[4],
			b5 = b[5],
			b6 = b[6],
			b7 = b[7];
	var b8 = b[8],
			b9 = b[9],
			b10 = b[10],
			b11 = b[11];
	var b12 = b[12],
			b13 = b[13],
			b14 = b[14],
			b15 = b[15];
	return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
}
/**\r
 * Alias for {@link mat4.multiply}\r
 * @function\r
 */

var mul = (/* unused pure expression or super */ null && (multiply));
/**\r
 * Alias for {@link mat4.subtract}\r
 * @function\r
 */

var sub = (/* unused pure expression or super */ null && (subtract));
;// CONCATENATED MODULE: ./node_modules/roughjs/bin/math.js
function randomSeed() {
		return Math.floor(Math.random() * 2 ** 31);
}
class Random {
		constructor(seed) {
				this.seed = seed;
		}
		next() {
				if (this.seed) {
						return ((2 ** 31 - 1) & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31;
				}
				else {
						return Math.random();
				}
		}
}

;// CONCATENATED MODULE: ./node_modules/nanoid/index.prod.js
// This file replaces `index.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.



if (false) {}

let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))

let customRandom = (alphabet, size, getRandom) => {
	// First, a bitmask is necessary to generate the ID. The bitmask makes bytes
	// values closer to the alphabet size. The bitmask calculates the closest
	// `2^31 - 1` number, which exceeds the alphabet size.
	// For example, the bitmask for the alphabet size 30 is 31 (00011111).
	// `Math.clz32` is not used, because it is not available in browsers.
	let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
	// Though, the bitmask solution is not perfect since the bytes exceeding
	// the alphabet size are refused. Therefore, to reliably generate the ID,
	// the random bytes redundancy has to be satisfied.

	// Note: every hardware random generator call is performance expensive,
	// because the system call for entropy collection takes a lot of time.
	// So, to avoid additional system calls, extra bytes are requested in advance.

	// Next, a step determines how many random bytes to generate.
	// The number of random bytes gets decided upon the ID size, mask,
	// alphabet size, and magic number 1.6 (using 1.6 peaks at performance
	// according to benchmarks).

	// `-~f => Math.ceil(f)` if f is a float
	// `-~i => i + 1` if i is an integer
	let step = -~((1.6 * mask * size) / alphabet.length)

	return () => {
		let id = ''
		while (true) {
			let bytes = getRandom(step)
			// A compact alternative for `for (var i = 0; i < step; i++)`.
			let j = step
			while (j--) {
				// Adding `|| ''` refuses a random byte that exceeds the alphabet size.
				id += alphabet[bytes[j] & mask] || ''
				if (id.length === size) return id
			}
		}
	}
}

let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random)

let nanoid = (size = 21) => {
	let id = ''
	let bytes = crypto.getRandomValues(new Uint8Array(size))

	// A compact alternative for `for (var i = 0; i < step; i++)`.
	while (size--) {
		// It is incorrect to use bytes exceeding the alphabet size.
		// The following mask reduces the random byte in the 0-255 value
		// range to the 0-63 value range. Therefore, adding hacks, such
		// as empty string fallback or magic numbers, is unneccessary because
		// the bitmask trims bytes down to the alphabet size.
		let byte = bytes[size] & 63
		if (byte < 36) {
			// `0-9a-z`
			id += byte.toString(36)
		} else if (byte < 62) {
			// `A-Z`
			id += (byte - 26).toString(36).toUpperCase()
		} else if (byte < 63) {
			id += '_'
		} else {
			id += '-'
		}
	}
	return id
}



;// CONCATENATED MODULE: ./src/utils.ts
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\
In order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\
In order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var utils_random = new Random(Date.now());
var randomInteger = function randomInteger() {
	return Math.floor(utils_random.next() * Math.pow(2, 31));
};
var randomId = function randomId() {
	return nanoid();
};
var safeNumber = function safeNumber(number) {
	return Number(number.toFixed(2));
};
function dimensionsFromPoints(points) {
	var xCoords = points.map(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 1),
				x = _ref2[0];

		return x;
	});
	var yCoords = points.map(function (_ref3) {
		var _ref4 = _slicedToArray(_ref3, 2),
				y = _ref4[1];

		return y;
	});
	var minX = Math.min.apply(Math, _toConsumableArray(xCoords));
	var minY = Math.min.apply(Math, _toConsumableArray(yCoords));
	var maxX = Math.max.apply(Math, _toConsumableArray(xCoords));
	var maxY = Math.max.apply(Math, _toConsumableArray(yCoords));
	return [maxX - minX, maxY - minY];
} // winding order is clockwise values is positive, counter clockwise if negative.

function getWindingOrder(points) {
	var total = points.reduce(function (acc, _ref5, idx, arr) {
		var _ref6 = _slicedToArray(_ref5, 2),
				x1 = _ref6[0],
				y1 = _ref6[1];

		var p2 = arr[idx + 1];
		var x2 = p2 ? p2[0] : 0;
		var y2 = p2 ? p2[1] : 0;
		var e = (x2 - x1) * (y2 + y1);
		return e + acc;
	}, 0);
	return total > 0 ? "clockwise" : "counterclockwise";
}

function attributes_toConsumableArray(arr) { return attributes_arrayWithoutHoles(arr) || attributes_iterableToArray(arr) || attributes_unsupportedIterableToArray(arr) || attributes_nonIterableSpread(); }

function attributes_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\
In order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function attributes_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return attributes_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return attributes_arrayLikeToArray(o, minLen); }

function attributes_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function attributes_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return attributes_arrayLikeToArray(arr); }

function attributes_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


function hexWithAlpha(color, alpha) {
	return chroma_default()(color).alpha(alpha).css();
}
function has(el, attr) {
	return el.hasAttribute(attr);
}
function get(el, attr, backup) {
	return el.getAttribute(attr) || backup || "";
}
function getNum(el, attr, backup) {
	var numVal = Number(get(el, attr));
	return numVal === NaN ? backup || 0 : numVal;
}
var presAttrs = {
	stroke: "stroke",
	"stroke-opacity": "stroke-opacity",
	"stroke-width": "stroke-width",
	fill: "fill",
	"fill-opacity": "fill-opacity",
	opacity: "opacity"
};
var attrHandlers = {
	stroke: function stroke(_ref) {
		var el = _ref.el,
				exVals = _ref.exVals;
		var strokeColor = get(el, "stroke");
		exVals.strokeColor = has(el, "stroke-opacity") ? hexWithAlpha(strokeColor, getNum(el, "stroke-opacity")) : strokeColor;
	},
	"stroke-opacity": function strokeOpacity(_ref2) {
		var el = _ref2.el,
				exVals = _ref2.exVals;
		exVals.strokeColor = hexWithAlpha(get(el, "stroke", "#000000"), getNum(el, "stroke-opacity"));
	},
	"stroke-width": function strokeWidth(_ref3) {
		var el = _ref3.el,
				exVals = _ref3.exVals;
		exVals.strokeWidth = getNum(el, "stroke-width");
	},
	fill: function fill(_ref4) {
		var el = _ref4.el,
				exVals = _ref4.exVals;
		var fill = get(el, "fill");
		exVals.backgroundColor = fill === "none" ? "#00000000" : fill;
	},
	"fill-opacity": function fillOpacity(_ref5) {
		var el = _ref5.el,
				exVals = _ref5.exVals;
		exVals.backgroundColor = hexWithAlpha(get(el, "fill", "#000000"), getNum(el, "fill-opacity"));
	},
	opacity: function opacity(_ref6) {
		var el = _ref6.el,
				exVals = _ref6.exVals;
		exVals.opacity = getNum(el, "opacity", 100);
	}
}; // Presentation Attributes for SVG Elements:
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation

function presAttrsToElementValues(el) {
	var exVals = attributes_toConsumableArray(el.attributes).reduce(function (exVals, attr) {
		var name = attr.name;

		if (Object.keys(attrHandlers).includes(name)) {
			attrHandlers[name]({
				el: el,
				exVals: exVals
			});
		}

		return exVals;
	}, {});

	return exVals;
}
function filterAttrsToElementValues(el) {
	var filterVals = {};

	if (has(el, "x")) {
		filterVals.x = getNum(el, "x");
	}

	if (has(el, "y")) {
		filterVals.y = getNum(el, "y");
	}

	if (has(el, "width")) {
		filterVals.width = getNum(el, "width");
	}

	if (has(el, "height")) {
		filterVals.height = getNum(el, "height");
	}

	return filterVals;
}
function pointsAttrToPoints(el) {
	var points = [];

	if (has(el, "points")) {
		points = get(el, "points").split(" ").map(function (p) {
			return p.split(",").map(parseFloat);
		});
	}

	return points;
}
;// CONCATENATED MODULE: ./src/elements/Group.ts
function Group_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Group_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function Group_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Group_ownKeys(Object(source), true).forEach(function (key) { Group_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Group_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Group_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function getGroupAttrs(groups) {
	return groups.reduce(function (acc, _ref) {
		var element = _ref.element;
		var elVals = presAttrsToElementValues(element);
		return Group_objectSpread(Group_objectSpread({}, acc), elVals);
	}, {});
}

var Group = function Group(element) {
	Group_classCallCheck(this, Group);

	Group_defineProperty(this, "id", randomId());

	Group_defineProperty(this, "element", void 0);

	this.element = element;
};

/* harmony default export */ const elements_Group = (Group);
;// CONCATENATED MODULE: ./src/elements/ExcalidrawElement.ts
function ExcalidrawElement_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function ExcalidrawElement_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ExcalidrawElement_ownKeys(Object(source), true).forEach(function (key) { ExcalidrawElement_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ExcalidrawElement_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ExcalidrawElement_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function createExElement() {
	return {
		id: randomId(),
		x: 0,
		y: 0,
		strokeColor: "#000000",
		backgroundColor: "#000000",
		fillStyle: "solid",
		strokeWidth: 1,
		strokeStyle: "solid",
		strokeSharpness: "sharp",
		roughness: 0,
		opacity: 100,
		width: 0,
		height: 0,
		angle: 0,
		seed: randomInteger(),
		version: 0,
		versionNonce: 0,
		isDeleted: false,
		groupIds: [],
		boundElementIds: null
	};
}
function createExRect() {
	return ExcalidrawElement_objectSpread(ExcalidrawElement_objectSpread({}, createExElement()), {}, {
		type: "rectangle"
	});
}
function createExLine() {
	return ExcalidrawElement_objectSpread(ExcalidrawElement_objectSpread({}, createExElement()), {}, {
		type: "line",
		points: []
	});
}
function createExEllipse() {
	return ExcalidrawElement_objectSpread(ExcalidrawElement_objectSpread({}, createExElement()), {}, {
		type: "ellipse"
	});
}
function createExDraw() {
	return ExcalidrawElement_objectSpread(ExcalidrawElement_objectSpread({}, createExElement()), {}, {
		type: "draw",
		points: []
	});
}
;// CONCATENATED MODULE: ./node_modules/gl-matrix/esm/vec3.js

/**\r
 * 3 Dimensional Vector\r
 * @module vec3\r
 */

/**\r
 * Creates a new, empty vec3\r
 *\r
 * @returns {vec3} a new 3D vector\r
 */

function vec3_create() {
	var out = new ARRAY_TYPE(3);

	if (ARRAY_TYPE != Float32Array) {
		out[0] = 0;
		out[1] = 0;
		out[2] = 0;
	}

	return out;
}
/**\r
 * Creates a new vec3 initialized with values from an existing vector\r
 *\r
 * @param {ReadonlyVec3} a vector to clone\r
 * @returns {vec3} a new 3D vector\r
 */

function vec3_clone(a) {
	var out = new glMatrix.ARRAY_TYPE(3);
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	return out;
}
/**\r
 * Calculates the length of a vec3\r
 *\r
 * @param {ReadonlyVec3} a vector to calculate length of\r
 * @returns {Number} length of a\r
 */

function vec3_length(a) {
	var x = a[0];
	var y = a[1];
	var z = a[2];
	return Math.hypot(x, y, z);
}
/**\r
 * Creates a new vec3 initialized with the given values\r
 *\r
 * @param {Number} x X component\r
 * @param {Number} y Y component\r
 * @param {Number} z Z component\r
 * @returns {vec3} a new 3D vector\r
 */

function vec3_fromValues(x, y, z) {
	var out = new ARRAY_TYPE(3);
	out[0] = x;
	out[1] = y;
	out[2] = z;
	return out;
}
/**\r
 * Copy the values from one vec3 to another\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the source vector\r
 * @returns {vec3} out\r
 */

function vec3_copy(out, a) {
	out[0] = a[0];
	out[1] = a[1];
	out[2] = a[2];
	return out;
}
/**\r
 * Set the components of a vec3 to the given values\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {Number} x X component\r
 * @param {Number} y Y component\r
 * @param {Number} z Z component\r
 * @returns {vec3} out\r
 */

function vec3_set(out, x, y, z) {
	out[0] = x;
	out[1] = y;
	out[2] = z;
	return out;
}
/**\r
 * Adds two vec3's\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @returns {vec3} out\r
 */

function vec3_add(out, a, b) {
	out[0] = a[0] + b[0];
	out[1] = a[1] + b[1];
	out[2] = a[2] + b[2];
	return out;
}
/**\r
 * Subtracts vector b from vector a\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @returns {vec3} out\r
 */

function vec3_subtract(out, a, b) {
	out[0] = a[0] - b[0];
	out[1] = a[1] - b[1];
	out[2] = a[2] - b[2];
	return out;
}
/**\r
 * Multiplies two vec3's\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @returns {vec3} out\r
 */

function vec3_multiply(out, a, b) {
	out[0] = a[0] * b[0];
	out[1] = a[1] * b[1];
	out[2] = a[2] * b[2];
	return out;
}
/**\r
 * Divides two vec3's\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @returns {vec3} out\r
 */

function divide(out, a, b) {
	out[0] = a[0] / b[0];
	out[1] = a[1] / b[1];
	out[2] = a[2] / b[2];
	return out;
}
/**\r
 * Math.ceil the components of a vec3\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a vector to ceil\r
 * @returns {vec3} out\r
 */

function ceil(out, a) {
	out[0] = Math.ceil(a[0]);
	out[1] = Math.ceil(a[1]);
	out[2] = Math.ceil(a[2]);
	return out;
}
/**\r
 * Math.floor the components of a vec3\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a vector to floor\r
 * @returns {vec3} out\r
 */

function floor(out, a) {
	out[0] = Math.floor(a[0]);
	out[1] = Math.floor(a[1]);
	out[2] = Math.floor(a[2]);
	return out;
}
/**\r
 * Returns the minimum of two vec3's\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @returns {vec3} out\r
 */

function min(out, a, b) {
	out[0] = Math.min(a[0], b[0]);
	out[1] = Math.min(a[1], b[1]);
	out[2] = Math.min(a[2], b[2]);
	return out;
}
/**\r
 * Returns the maximum of two vec3's\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @returns {vec3} out\r
 */

function max(out, a, b) {
	out[0] = Math.max(a[0], b[0]);
	out[1] = Math.max(a[1], b[1]);
	out[2] = Math.max(a[2], b[2]);
	return out;
}
/**\r
 * Math.round the components of a vec3\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a vector to round\r
 * @returns {vec3} out\r
 */

function round(out, a) {
	out[0] = Math.round(a[0]);
	out[1] = Math.round(a[1]);
	out[2] = Math.round(a[2]);
	return out;
}
/**\r
 * Scales a vec3 by a scalar number\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the vector to scale\r
 * @param {Number} b amount to scale the vector by\r
 * @returns {vec3} out\r
 */

function vec3_scale(out, a, b) {
	out[0] = a[0] * b;
	out[1] = a[1] * b;
	out[2] = a[2] * b;
	return out;
}
/**\r
 * Adds two vec3's after scaling the second operand by a scalar value\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @param {Number} scale the amount to scale b by before adding\r
 * @returns {vec3} out\r
 */

function scaleAndAdd(out, a, b, scale) {
	out[0] = a[0] + b[0] * scale;
	out[1] = a[1] + b[1] * scale;
	out[2] = a[2] + b[2] * scale;
	return out;
}
/**\r
 * Calculates the euclidian distance between two vec3's\r
 *\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @returns {Number} distance between a and b\r
 */

function distance(a, b) {
	var x = b[0] - a[0];
	var y = b[1] - a[1];
	var z = b[2] - a[2];
	return Math.hypot(x, y, z);
}
/**\r
 * Calculates the squared euclidian distance between two vec3's\r
 *\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @returns {Number} squared distance between a and b\r
 */

function squaredDistance(a, b) {
	var x = b[0] - a[0];
	var y = b[1] - a[1];
	var z = b[2] - a[2];
	return x * x + y * y + z * z;
}
/**\r
 * Calculates the squared length of a vec3\r
 *\r
 * @param {ReadonlyVec3} a vector to calculate squared length of\r
 * @returns {Number} squared length of a\r
 */

function squaredLength(a) {
	var x = a[0];
	var y = a[1];
	var z = a[2];
	return x * x + y * y + z * z;
}
/**\r
 * Negates the components of a vec3\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a vector to negate\r
 * @returns {vec3} out\r
 */

function negate(out, a) {
	out[0] = -a[0];
	out[1] = -a[1];
	out[2] = -a[2];
	return out;
}
/**\r
 * Returns the inverse of the components of a vec3\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a vector to invert\r
 * @returns {vec3} out\r
 */

function inverse(out, a) {
	out[0] = 1.0 / a[0];
	out[1] = 1.0 / a[1];
	out[2] = 1.0 / a[2];
	return out;
}
/**\r
 * Normalize a vec3\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a vector to normalize\r
 * @returns {vec3} out\r
 */

function normalize(out, a) {
	var x = a[0];
	var y = a[1];
	var z = a[2];
	var len = x * x + y * y + z * z;

	if (len > 0) {
		//TODO: evaluate use of glm_invsqrt here?
		len = 1 / Math.sqrt(len);
	}

	out[0] = a[0] * len;
	out[1] = a[1] * len;
	out[2] = a[2] * len;
	return out;
}
/**\r
 * Calculates the dot product of two vec3's\r
 *\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @returns {Number} dot product of a and b\r
 */

function dot(a, b) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
/**\r
 * Computes the cross product of two vec3's\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @returns {vec3} out\r
 */

function cross(out, a, b) {
	var ax = a[0],
			ay = a[1],
			az = a[2];
	var bx = b[0],
			by = b[1],
			bz = b[2];
	out[0] = ay * bz - az * by;
	out[1] = az * bx - ax * bz;
	out[2] = ax * by - ay * bx;
	return out;
}
/**\r
 * Performs a linear interpolation between two vec3's\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs\r
 * @returns {vec3} out\r
 */

function lerp(out, a, b, t) {
	var ax = a[0];
	var ay = a[1];
	var az = a[2];
	out[0] = ax + t * (b[0] - ax);
	out[1] = ay + t * (b[1] - ay);
	out[2] = az + t * (b[2] - az);
	return out;
}
/**\r
 * Performs a hermite interpolation with two control points\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @param {ReadonlyVec3} c the third operand\r
 * @param {ReadonlyVec3} d the fourth operand\r
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs\r
 * @returns {vec3} out\r
 */

function hermite(out, a, b, c, d, t) {
	var factorTimes2 = t * t;
	var factor1 = factorTimes2 * (2 * t - 3) + 1;
	var factor2 = factorTimes2 * (t - 2) + t;
	var factor3 = factorTimes2 * (t - 1);
	var factor4 = factorTimes2 * (3 - 2 * t);
	out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	return out;
}
/**\r
 * Performs a bezier interpolation with two control points\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the first operand\r
 * @param {ReadonlyVec3} b the second operand\r
 * @param {ReadonlyVec3} c the third operand\r
 * @param {ReadonlyVec3} d the fourth operand\r
 * @param {Number} t interpolation amount, in the range [0-1], between the two inputs\r
 * @returns {vec3} out\r
 */

function bezier(out, a, b, c, d, t) {
	var inverseFactor = 1 - t;
	var inverseFactorTimesTwo = inverseFactor * inverseFactor;
	var factorTimes2 = t * t;
	var factor1 = inverseFactorTimesTwo * inverseFactor;
	var factor2 = 3 * t * inverseFactorTimesTwo;
	var factor3 = 3 * factorTimes2 * inverseFactor;
	var factor4 = factorTimes2 * t;
	out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
	out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
	out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
	return out;
}
/**\r
 * Generates a random vector with the given scale\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned\r
 * @returns {vec3} out\r
 */

function vec3_random(out, scale) {
	scale = scale || 1.0;
	var r = glMatrix.RANDOM() * 2.0 * Math.PI;
	var z = glMatrix.RANDOM() * 2.0 - 1.0;
	var zScale = Math.sqrt(1.0 - z * z) * scale;
	out[0] = Math.cos(r) * zScale;
	out[1] = Math.sin(r) * zScale;
	out[2] = z * scale;
	return out;
}
/**\r
 * Transforms the vec3 with a mat4.\r
 * 4th vector component is implicitly '1'\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the vector to transform\r
 * @param {ReadonlyMat4} m matrix to transform with\r
 * @returns {vec3} out\r
 */

function transformMat4(out, a, m) {
	var x = a[0],
			y = a[1],
			z = a[2];
	var w = m[3] * x + m[7] * y + m[11] * z + m[15];
	w = w || 1.0;
	out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
	out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
	out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
	return out;
}
/**\r
 * Transforms the vec3 with a mat3.\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the vector to transform\r
 * @param {ReadonlyMat3} m the 3x3 matrix to transform with\r
 * @returns {vec3} out\r
 */

function transformMat3(out, a, m) {
	var x = a[0],
			y = a[1],
			z = a[2];
	out[0] = x * m[0] + y * m[3] + z * m[6];
	out[1] = x * m[1] + y * m[4] + z * m[7];
	out[2] = x * m[2] + y * m[5] + z * m[8];
	return out;
}
/**\r
 * Transforms the vec3 with a quat\r
 * Can also be used for dual quaternions. (Multiply it with the real part)\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @param {ReadonlyVec3} a the vector to transform\r
 * @param {ReadonlyQuat} q quaternion to transform with\r
 * @returns {vec3} out\r
 */

function transformQuat(out, a, q) {
	// benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
	var qx = q[0],
			qy = q[1],
			qz = q[2],
			qw = q[3];
	var x = a[0],
			y = a[1],
			z = a[2]; // var qvec = [qx, qy, qz];
	// var uv = vec3.cross([], qvec, a);

	var uvx = qy * z - qz * y,
			uvy = qz * x - qx * z,
			uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

	var uuvx = qy * uvz - qz * uvy,
			uuvy = qz * uvx - qx * uvz,
			uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

	var w2 = qw * 2;
	uvx *= w2;
	uvy *= w2;
	uvz *= w2; // vec3.scale(uuv, uuv, 2);

	uuvx *= 2;
	uuvy *= 2;
	uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

	out[0] = x + uvx + uuvx;
	out[1] = y + uvy + uuvy;
	out[2] = z + uvz + uuvz;
	return out;
}
/**\r
 * Rotate a 3D vector around the x-axis\r
 * @param {vec3} out The receiving vec3\r
 * @param {ReadonlyVec3} a The vec3 point to rotate\r
 * @param {ReadonlyVec3} b The origin of the rotation\r
 * @param {Number} rad The angle of rotation in radians\r
 * @returns {vec3} out\r
 */

function vec3_rotateX(out, a, b, rad) {
	var p = [],
			r = []; //Translate point to the origin

	p[0] = a[0] - b[0];
	p[1] = a[1] - b[1];
	p[2] = a[2] - b[2]; //perform rotation

	r[0] = p[0];
	r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
	r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

	out[0] = r[0] + b[0];
	out[1] = r[1] + b[1];
	out[2] = r[2] + b[2];
	return out;
}
/**\r
 * Rotate a 3D vector around the y-axis\r
 * @param {vec3} out The receiving vec3\r
 * @param {ReadonlyVec3} a The vec3 point to rotate\r
 * @param {ReadonlyVec3} b The origin of the rotation\r
 * @param {Number} rad The angle of rotation in radians\r
 * @returns {vec3} out\r
 */

function vec3_rotateY(out, a, b, rad) {
	var p = [],
			r = []; //Translate point to the origin

	p[0] = a[0] - b[0];
	p[1] = a[1] - b[1];
	p[2] = a[2] - b[2]; //perform rotation

	r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
	r[1] = p[1];
	r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

	out[0] = r[0] + b[0];
	out[1] = r[1] + b[1];
	out[2] = r[2] + b[2];
	return out;
}
/**\r
 * Rotate a 3D vector around the z-axis\r
 * @param {vec3} out The receiving vec3\r
 * @param {ReadonlyVec3} a The vec3 point to rotate\r
 * @param {ReadonlyVec3} b The origin of the rotation\r
 * @param {Number} rad The angle of rotation in radians\r
 * @returns {vec3} out\r
 */

function vec3_rotateZ(out, a, b, rad) {
	var p = [],
			r = []; //Translate point to the origin

	p[0] = a[0] - b[0];
	p[1] = a[1] - b[1];
	p[2] = a[2] - b[2]; //perform rotation

	r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
	r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
	r[2] = p[2]; //translate to correct position

	out[0] = r[0] + b[0];
	out[1] = r[1] + b[1];
	out[2] = r[2] + b[2];
	return out;
}
/**\r
 * Get the angle between two 3D vectors\r
 * @param {ReadonlyVec3} a The first operand\r
 * @param {ReadonlyVec3} b The second operand\r
 * @returns {Number} The angle in radians\r
 */

function angle(a, b) {
	var ax = a[0],
			ay = a[1],
			az = a[2],
			bx = b[0],
			by = b[1],
			bz = b[2],
			mag1 = Math.sqrt(ax * ax + ay * ay + az * az),
			mag2 = Math.sqrt(bx * bx + by * by + bz * bz),
			mag = mag1 * mag2,
			cosine = mag && dot(a, b) / mag;
	return Math.acos(Math.min(Math.max(cosine, -1), 1));
}
/**\r
 * Set the components of a vec3 to zero\r
 *\r
 * @param {vec3} out the receiving vector\r
 * @returns {vec3} out\r
 */

function zero(out) {
	out[0] = 0.0;
	out[1] = 0.0;
	out[2] = 0.0;
	return out;
}
/**\r
 * Returns a string representation of a vector\r
 *\r
 * @param {ReadonlyVec3} a vector to represent as a string\r
 * @returns {String} string representation of the vector\r
 */

function vec3_str(a) {
	return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
}
/**\r
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)\r
 *\r
 * @param {ReadonlyVec3} a The first vector.\r
 * @param {ReadonlyVec3} b The second vector.\r
 * @returns {Boolean} True if the vectors are equal, false otherwise.\r
 */

function vec3_exactEquals(a, b) {
	return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}
/**\r
 * Returns whether or not the vectors have approximately the same elements in the same position.\r
 *\r
 * @param {ReadonlyVec3} a The first vector.\r
 * @param {ReadonlyVec3} b The second vector.\r
 * @returns {Boolean} True if the vectors are equal, false otherwise.\r
 */

function vec3_equals(a, b) {
	var a0 = a[0],
			a1 = a[1],
			a2 = a[2];
	var b0 = b[0],
			b1 = b[1],
			b2 = b[2];
	return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
}
/**\r
 * Alias for {@link vec3.subtract}\r
 * @function\r
 */

var vec3_sub = (/* unused pure expression or super */ null && (vec3_subtract));
/**\r
 * Alias for {@link vec3.multiply}\r
 * @function\r
 */

var vec3_mul = (/* unused pure expression or super */ null && (vec3_multiply));
/**\r
 * Alias for {@link vec3.divide}\r
 * @function\r
 */

var div = (/* unused pure expression or super */ null && (divide));
/**\r
 * Alias for {@link vec3.distance}\r
 * @function\r
 */

var dist = (/* unused pure expression or super */ null && (distance));
/**\r
 * Alias for {@link vec3.squaredDistance}\r
 * @function\r
 */

var sqrDist = (/* unused pure expression or super */ null && (squaredDistance));
/**\r
 * Alias for {@link vec3.length}\r
 * @function\r
 */

var len = (/* unused pure expression or super */ null && (vec3_length));
/**\r
 * Alias for {@link vec3.squaredLength}\r
 * @function\r
 */

var sqrLen = (/* unused pure expression or super */ null && (squaredLength));
/**\r
 * Perform some operation over an array of vec3s.\r
 *\r
 * @param {Array} a the array of vectors to iterate over\r
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed\r
 * @param {Number} offset Number of elements to skip at the beginning of the array\r
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array\r
 * @param {Function} fn Function to call for each vector in the array\r
 * @param {Object} [arg] additional argument to pass to fn\r
 * @returns {Array} a\r
 * @function\r
 */

var forEach = function () {
	var vec = vec3_create();
	return function (a, stride, offset, count, fn, arg) {
		var i, l;

		if (!stride) {
			stride = 3;
		}

		if (!offset) {
			offset = 0;
		}

		if (count) {
			l = Math.min(count * stride + offset, a.length);
		} else {
			l = a.length;
		}

		for (i = offset; i < l; i += stride) {
			vec[0] = a[i];
			vec[1] = a[i + 1];
			vec[2] = a[i + 2];
			fn(vec, vec, arg);
			a[i] = vec[0];
			a[i + 1] = vec[1];
			a[i + 2] = vec[2];
		}

		return a;
	};
}();
;// CONCATENATED MODULE: ./src/transform.ts
function transform_slicedToArray(arr, i) { return transform_arrayWithHoles(arr) || transform_iterableToArrayLimit(arr, i) || transform_unsupportedIterableToArray(arr, i) || transform_nonIterableRest(); }

function transform_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\
In order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function transform_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return transform_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return transform_arrayLikeToArray(o, minLen); }

function transform_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function transform_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function transform_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/*
SVG transform attr is a bit strange in that it can accept traditional
css transform string (at least per spec) as well as a it's own "unitless"
version of transform functions.

https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
*/

var transformFunctions = {
	matrix: "matrix",
	matrix3d: "matrix3d",
	perspective: "perspective",
	rotate: "rotate",
	rotate3d: "rotate3d",
	rotateX: "rotateX",
	rotateY: "rotateY",
	rotateZ: "rotateZ",
	scale: "scale",
	scale3d: "scale3d",
	scaleX: "scaleX",
	scaleY: "scaleY",
	scaleZ: "scaleZ",
	skew: "skew",
	skewX: "skewX",
	skewY: "skewY",
	translate: "translate",
	translate3d: "translate3d",
	translateX: "translateX",
	translateY: "translateY",
	translateZ: "translateZ"
};
var transformFunctionsArr = Object.keys(transformFunctions); // type Transform

var defaultUnits = {
	matrix: "",
	matrix3d: "",
	perspective: "perspective",
	rotate: "deg",
	rotate3d: "deg",
	rotateX: "deg",
	rotateY: "deg",
	rotateZ: "deg",
	scale: "",
	scale3d: "",
	scaleX: "",
	scaleY: "",
	scaleZ: "",
	skew: "skew",
	skewX: "deg",
	skewY: "deg",
	translate: "px",
	translate3d: "px",
	translateX: "px",
	translateY: "px",
	translateZ: "px"
}; // Convert between possible svg transform attribute values to css transform attribute values.

var svgTransformToCSSTransform = function svgTransformToCSSTransform(svgTransformStr) {
	// Create transform function string "chunks", e.g "rotate(90deg)"
	var tFuncs = svgTransformStr.match(/(\\w+)\\(([^)]*)\\)/g);

	if (!tFuncs) {
		return "";
	}

	var tFuncValues = tFuncs.map(function (tFuncStr) {
		var _values;

		var type = tFuncStr.split("(")[0];

		if (!type) {
			throw new Error("Unable to find transform name");
		}

		if (!transformFunctionsArr.includes(type)) {
			throw new Error("transform function name \"".concat(type, "\" is not valid"));
		} // get the arg/props of the transform function, e.g "90deg".


		var tFuncParts = tFuncStr.match(/([-+]?[0-9]*\\.?[0-9]+)([a-z])*/g);

		if (!tFuncParts) {
			return {
				type: type,
				values: []
			};
		}

		var values = tFuncParts.map(function (a) {
			// Separate the arg value and unit. e.g ["90", "deg"]
			var _a$matchAll = a.matchAll(/([-+]?[0-9]*\\.?[0-9]+)|([a-z])*/g),
					_a$matchAll2 = transform_slicedToArray(_a$matchAll, 2),
					value = _a$matchAll2[0],
					unit = _a$matchAll2[1];

			return {
				unit: unit[0] || defaultUnits[type],
				value: value[0]
			};
		}); // Not supporting x, y args of svg rotate transform yet...

		if (values && type === "rotate" && ((_values = values) === null || _values === void 0 ? void 0 : _values.length) > 1) {
			values = [values[0]];
		}

		return {
			type: type,
			values: values
		};
	}); // Generate a string of transform functions that can be set as a CSS Transform.

	var csstransformStr = tFuncValues.map(function (_ref) {
		var type = _ref.type,
				values = _ref.values;
		var valStr = values.map(function (_ref2) {
			var unit = _ref2.unit,
					value = _ref2.value;
			return "".concat(value).concat(unit);
		}).join(", ");
		return "".concat(type, "(").concat(valStr, ")");
	}).join(" ");
	return csstransformStr;
};

var createDOMMatrixFromSVGStr = function createDOMMatrixFromSVGStr(svgTransformStr) {
	var cssTransformStr = svgTransformToCSSTransform(svgTransformStr);
	return new DOMMatrix(cssTransformStr);
};
function getElementMatrix(el) {
	if (el.hasAttribute("transform")) {
		var elMat = new DOMMatrix(svgTransformToCSSTransform(el.getAttribute("transform") || ""));
		return multiply(create(), create(), elMat.toFloat32Array());
	}

	return create();
}
function getTransformMatrix(el, groups) {
	var accumMat = groups.map(function (_ref3) {
		var element = _ref3.element;
		return getElementMatrix(element);
	}).concat([getElementMatrix(el)]).reduce(function (acc, mat) {
		return multiply(acc, acc, mat);
	}, create());
	return accumMat;
}
function transformPoints(points, transform) {
	return points.map(function (_ref4) {
		var _ref5 = transform_slicedToArray(_ref4, 2),
				x = _ref5[0],
				y = _ref5[1];

		var _vec3$transformMat = transformMat4(vec3_create(), vec3_fromValues(x, y, 1), transform),
				_vec3$transformMat2 = transform_slicedToArray(_vec3$transformMat, 2),
				newX = _vec3$transformMat2[0],
				newY = _vec3$transformMat2[1];

		return [newX, newY];
	});
}
;// CONCATENATED MODULE: ./node_modules/points-on-curve/lib/index.js
// distance between 2 points
function lib_distance(p1, p2) {
		return Math.sqrt(distanceSq(p1, p2));
}
// distance between 2 points squared
function distanceSq(p1, p2) {
		return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
}
// Sistance squared from a point p to the line segment vw
function distanceToSegmentSq(p, v, w) {
		const l2 = distanceSq(v, w);
		if (l2 === 0) {
				return distanceSq(p, v);
		}
		let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
		t = Math.max(0, Math.min(1, t));
		return distanceSq(p, lib_lerp(v, w, t));
}
function lib_lerp(a, b, t) {
		return [
				a[0] + (b[0] - a[0]) * t,
				a[1] + (b[1] - a[1]) * t,
		];
}
// Adapted from https://seant23.wordpress.com/2010/11/12/offset-bezier-curves/
function flatness(points, offset) {
		const p1 = points[offset + 0];
		const p2 = points[offset + 1];
		const p3 = points[offset + 2];
		const p4 = points[offset + 3];
		let ux = 3 * p2[0] - 2 * p1[0] - p4[0];
		ux *= ux;
		let uy = 3 * p2[1] - 2 * p1[1] - p4[1];
		uy *= uy;
		let vx = 3 * p3[0] - 2 * p4[0] - p1[0];
		vx *= vx;
		let vy = 3 * p3[1] - 2 * p4[1] - p1[1];
		vy *= vy;
		if (ux < vx) {
				ux = vx;
		}
		if (uy < vy) {
				uy = vy;
		}
		return ux + uy;
}
function getPointsOnBezierCurveWithSplitting(points, offset, tolerance, newPoints) {
		const outPoints = newPoints || [];
		if (flatness(points, offset) < tolerance) {
				const p0 = points[offset + 0];
				if (outPoints.length) {
						const d = lib_distance(outPoints[outPoints.length - 1], p0);
						if (d > 1) {
								outPoints.push(p0);
						}
				}
				else {
						outPoints.push(p0);
				}
				outPoints.push(points[offset + 3]);
		}
		else {
				// subdivide
				const t = .5;
				const p1 = points[offset + 0];
				const p2 = points[offset + 1];
				const p3 = points[offset + 2];
				const p4 = points[offset + 3];
				const q1 = lib_lerp(p1, p2, t);
				const q2 = lib_lerp(p2, p3, t);
				const q3 = lib_lerp(p3, p4, t);
				const r1 = lib_lerp(q1, q2, t);
				const r2 = lib_lerp(q2, q3, t);
				const red = lib_lerp(r1, r2, t);
				getPointsOnBezierCurveWithSplitting([p1, q1, r1, red], 0, tolerance, outPoints);
				getPointsOnBezierCurveWithSplitting([red, r2, q3, p4], 0, tolerance, outPoints);
		}
		return outPoints;
}
function simplify(points, distance) {
		return simplifyPoints(points, 0, points.length, distance);
}
// Ramer–Douglas–Peucker algorithm
// https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
function simplifyPoints(points, start, end, epsilon, newPoints) {
		const outPoints = newPoints || [];
		// find the most distance point from the endpoints
		const s = points[start];
		const e = points[end - 1];
		let maxDistSq = 0;
		let maxNdx = 1;
		for (let i = start + 1; i < end - 1; ++i) {
				const distSq = distanceToSegmentSq(points[i], s, e);
				if (distSq > maxDistSq) {
						maxDistSq = distSq;
						maxNdx = i;
				}
		}
		// if that point is too far, split
		if (Math.sqrt(maxDistSq) > epsilon) {
				simplifyPoints(points, start, maxNdx + 1, epsilon, outPoints);
				simplifyPoints(points, maxNdx, end, epsilon, outPoints);
		}
		else {
				if (!outPoints.length) {
						outPoints.push(s);
				}
				outPoints.push(e);
		}
		return outPoints;
}
function pointsOnBezierCurves(points, tolerance = 0.15, distance) {
		const newPoints = [];
		const numSegments = (points.length - 1) / 3;
		for (let i = 0; i < numSegments; i++) {
				const offset = i * 3;
				getPointsOnBezierCurveWithSplitting(points, offset, tolerance, newPoints);
		}
		if (distance && distance > 0) {
				return simplifyPoints(newPoints, 0, newPoints.length, distance);
		}
		return newPoints;
}

;// CONCATENATED MODULE: ./node_modules/path-data-parser/lib/parser.js
const COMMAND = 0;
const NUMBER = 1;
const EOD = 2;
const PARAMS = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function tokenize(d) {
		const tokens = new Array();
		while (d !== '') {
				if (d.match(/^([ \t\r\n,]+)/)) {
						d = d.substr(RegExp.$1.length);
				}
				else if (d.match(/^([aAcChHlLmMqQsStTvVzZ])/)) {
						tokens[tokens.length] = { type: COMMAND, text: RegExp.$1 };
						d = d.substr(RegExp.$1.length);
				}
				else if (d.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) {
						tokens[tokens.length] = { type: NUMBER, text: `${parseFloat(RegExp.$1)}` };
						d = d.substr(RegExp.$1.length);
				}
				else {
						return [];
				}
		}
		tokens[tokens.length] = { type: EOD, text: '' };
		return tokens;
}

function isType(token, type) {
		return token.type === type;
}
function parsePath(d) {
		const segments = [];
		const tokens = tokenize(d);
		let mode = 'BOD';
		let index = 0;
		let token = tokens[index];
		while (!isType(token, EOD)) {
				let paramsCount = 0;
				const params = [];
				if (mode === 'BOD') {
						if (token.text === 'M' || token.text === 'm') {
								index++;
								paramsCount = PARAMS[token.text];
								mode = token.text;
						}
						else {
								return parsePath('M0,0' + d);
						}
				}
				else if (isType(token, NUMBER)) {
						paramsCount = PARAMS[mode];
				}
				else {
						index++;
						paramsCount = PARAMS[token.text];
						mode = token.text;
				}
				if ((index + paramsCount) < tokens.length) {
						for (let i = index; i < index + paramsCount; i++) {
								const numbeToken = tokens[i];
								if (isType(numbeToken, NUMBER)) {
										params[params.length] = +numbeToken.text;
								}
								else {
										throw new Error('Param not a number: ' + mode + ',' + numbeToken.text);
								}
						}
						if (typeof PARAMS[mode] === 'number') {
								const segment = { key: mode, data: params };
								segments.push(segment);
								index += paramsCount;
								token = tokens[index];
								if (mode === 'M')
										mode = 'L';
								if (mode === 'm')
										mode = 'l';
						}
						else {
								throw new Error('Bad segment: ' + mode);
						}
				}
				else {
						throw new Error('Path data ended short');
				}
		}
		return segments;
}
function serialize(segments) {
		const tokens = [];
		for (const { key, data } of segments) {
				tokens.push(key);
				switch (key) {
						case 'C':
						case 'c':
								tokens.push(data[0], `${data[1]},`, data[2], `${data[3]},`, data[4], data[5]);
								break;
						case 'S':
						case 's':
						case 'Q':
						case 'q':
								tokens.push(data[0], `${data[1]},`, data[2], data[3]);
								break;
						default:
								tokens.push(...data);
								break;
				}
		}
		return tokens.join(' ');
}

;// CONCATENATED MODULE: ./node_modules/path-data-parser/lib/absolutize.js
// Translate relative commands to absolute commands
function absolutize(segments) {
		let cx = 0, cy = 0;
		let subx = 0, suby = 0;
		const out = [];
		for (const { key, data } of segments) {
				switch (key) {
						case 'M':
								out.push({ key: 'M', data: [...data] });
								[cx, cy] = data;
								[subx, suby] = data;
								break;
						case 'm':
								cx += data[0];
								cy += data[1];
								out.push({ key: 'M', data: [cx, cy] });
								subx = cx;
								suby = cy;
								break;
						case 'L':
								out.push({ key: 'L', data: [...data] });
								[cx, cy] = data;
								break;
						case 'l':
								cx += data[0];
								cy += data[1];
								out.push({ key: 'L', data: [cx, cy] });
								break;
						case 'C':
								out.push({ key: 'C', data: [...data] });
								cx = data[4];
								cy = data[5];
								break;
						case 'c': {
								const newdata = data.map((d, i) => (i % 2) ? (d + cy) : (d + cx));
								out.push({ key: 'C', data: newdata });
								cx = newdata[4];
								cy = newdata[5];
								break;
						}
						case 'Q':
								out.push({ key: 'Q', data: [...data] });
								cx = data[2];
								cy = data[3];
								break;
						case 'q': {
								const newdata = data.map((d, i) => (i % 2) ? (d + cy) : (d + cx));
								out.push({ key: 'Q', data: newdata });
								cx = newdata[2];
								cy = newdata[3];
								break;
						}
						case 'A':
								out.push({ key: 'A', data: [...data] });
								cx = data[5];
								cy = data[6];
								break;
						case 'a':
								cx += data[5];
								cy += data[6];
								out.push({ key: 'A', data: [data[0], data[1], data[2], data[3], data[4], cx, cy] });
								break;
						case 'H':
								out.push({ key: 'H', data: [...data] });
								cx = data[0];
								break;
						case 'h':
								cx += data[0];
								out.push({ key: 'H', data: [cx] });
								break;
						case 'V':
								out.push({ key: 'V', data: [...data] });
								cy = data[0];
								break;
						case 'v':
								cy += data[0];
								out.push({ key: 'V', data: [cy] });
								break;
						case 'S':
								out.push({ key: 'S', data: [...data] });
								cx = data[2];
								cy = data[3];
								break;
						case 's': {
								const newdata = data.map((d, i) => (i % 2) ? (d + cy) : (d + cx));
								out.push({ key: 'S', data: newdata });
								cx = newdata[2];
								cy = newdata[3];
								break;
						}
						case 'T':
								out.push({ key: 'T', data: [...data] });
								cx = data[0];
								cy = data[1];
								break;
						case 't':
								cx += data[0];
								cy += data[1];
								out.push({ key: 'T', data: [cx, cy] });
								break;
						case 'Z':
						case 'z':
								out.push({ key: 'Z', data: [] });
								cx = subx;
								cy = suby;
								break;
				}
		}
		return out;
}

;// CONCATENATED MODULE: ./node_modules/path-data-parser/lib/normalize.js
// Normalize path to include only M, L, C, and Z commands
function normalize_normalize(segments) {
		const out = [];
		let lastType = '';
		let cx = 0, cy = 0;
		let subx = 0, suby = 0;
		let lcx = 0, lcy = 0;
		for (const { key, data } of segments) {
				switch (key) {
						case 'M':
								out.push({ key: 'M', data: [...data] });
								[cx, cy] = data;
								[subx, suby] = data;
								break;
						case 'C':
								out.push({ key: 'C', data: [...data] });
								cx = data[4];
								cy = data[5];
								lcx = data[2];
								lcy = data[3];
								break;
						case 'L':
								out.push({ key: 'L', data: [...data] });
								[cx, cy] = data;
								break;
						case 'H':
								cx = data[0];
								out.push({ key: 'L', data: [cx, cy] });
								break;
						case 'V':
								cy = data[0];
								out.push({ key: 'L', data: [cx, cy] });
								break;
						case 'S': {
								let cx1 = 0, cy1 = 0;
								if (lastType === 'C' || lastType === 'S') {
										cx1 = cx + (cx - lcx);
										cy1 = cy + (cy - lcy);
								}
								else {
										cx1 = cx;
										cy1 = cy;
								}
								out.push({ key: 'C', data: [cx1, cy1, ...data] });
								lcx = data[0];
								lcy = data[1];
								cx = data[2];
								cy = data[3];
								break;
						}
						case 'T': {
								const [x, y] = data;
								let x1 = 0, y1 = 0;
								if (lastType === 'Q' || lastType === 'T') {
										x1 = cx + (cx - lcx);
										y1 = cy + (cy - lcy);
								}
								else {
										x1 = cx;
										y1 = cy;
								}
								const cx1 = cx + 2 * (x1 - cx) / 3;
								const cy1 = cy + 2 * (y1 - cy) / 3;
								const cx2 = x + 2 * (x1 - x) / 3;
								const cy2 = y + 2 * (y1 - y) / 3;
								out.push({ key: 'C', data: [cx1, cy1, cx2, cy2, x, y] });
								lcx = x1;
								lcy = y1;
								cx = x;
								cy = y;
								break;
						}
						case 'Q': {
								const [x1, y1, x, y] = data;
								const cx1 = cx + 2 * (x1 - cx) / 3;
								const cy1 = cy + 2 * (y1 - cy) / 3;
								const cx2 = x + 2 * (x1 - x) / 3;
								const cy2 = y + 2 * (y1 - y) / 3;
								out.push({ key: 'C', data: [cx1, cy1, cx2, cy2, x, y] });
								lcx = x1;
								lcy = y1;
								cx = x;
								cy = y;
								break;
						}
						case 'A': {
								const r1 = Math.abs(data[0]);
								const r2 = Math.abs(data[1]);
								const angle = data[2];
								const largeArcFlag = data[3];
								const sweepFlag = data[4];
								const x = data[5];
								const y = data[6];
								if (r1 === 0 || r2 === 0) {
										out.push({ key: 'C', data: [cx, cy, x, y, x, y] });
										cx = x;
										cy = y;
								}
								else {
										if (cx !== x || cy !== y) {
												const curves = arcToCubicCurves(cx, cy, x, y, r1, r2, angle, largeArcFlag, sweepFlag);
												curves.forEach(function (curve) {
														out.push({ key: 'C', data: curve });
												});
												cx = x;
												cy = y;
										}
								}
								break;
						}
						case 'Z':
								out.push({ key: 'Z', data: [] });
								cx = subx;
								cy = suby;
								break;
				}
				lastType = key;
		}
		return out;
}
function degToRad(degrees) {
		return (Math.PI * degrees) / 180;
}
function normalize_rotate(x, y, angleRad) {
		const X = x * Math.cos(angleRad) - y * Math.sin(angleRad);
		const Y = x * Math.sin(angleRad) + y * Math.cos(angleRad);
		return [X, Y];
}
function arcToCubicCurves(x1, y1, x2, y2, r1, r2, angle, largeArcFlag, sweepFlag, recursive) {
		const angleRad = degToRad(angle);
		let params = [];
		let f1 = 0, f2 = 0, cx = 0, cy = 0;
		if (recursive) {
				[f1, f2, cx, cy] = recursive;
		}
		else {
				[x1, y1] = normalize_rotate(x1, y1, -angleRad);
				[x2, y2] = normalize_rotate(x2, y2, -angleRad);
				const x = (x1 - x2) / 2;
				const y = (y1 - y2) / 2;
				let h = (x * x) / (r1 * r1) + (y * y) / (r2 * r2);
				if (h > 1) {
						h = Math.sqrt(h);
						r1 = h * r1;
						r2 = h * r2;
				}
				const sign = (largeArcFlag === sweepFlag) ? -1 : 1;
				const r1Pow = r1 * r1;
				const r2Pow = r2 * r2;
				const left = r1Pow * r2Pow - r1Pow * y * y - r2Pow * x * x;
				const right = r1Pow * y * y + r2Pow * x * x;
				const k = sign * Math.sqrt(Math.abs(left / right));
				cx = k * r1 * y / r2 + (x1 + x2) / 2;
				cy = k * -r2 * x / r1 + (y1 + y2) / 2;
				f1 = Math.asin(parseFloat(((y1 - cy) / r2).toFixed(9)));
				f2 = Math.asin(parseFloat(((y2 - cy) / r2).toFixed(9)));
				if (x1 < cx) {
						f1 = Math.PI - f1;
				}
				if (x2 < cx) {
						f2 = Math.PI - f2;
				}
				if (f1 < 0) {
						f1 = Math.PI * 2 + f1;
				}
				if (f2 < 0) {
						f2 = Math.PI * 2 + f2;
				}
				if (sweepFlag && f1 > f2) {
						f1 = f1 - Math.PI * 2;
				}
				if (!sweepFlag && f2 > f1) {
						f2 = f2 - Math.PI * 2;
				}
		}
		let df = f2 - f1;
		if (Math.abs(df) > (Math.PI * 120 / 180)) {
				const f2old = f2;
				const x2old = x2;
				const y2old = y2;
				if (sweepFlag && f2 > f1) {
						f2 = f1 + (Math.PI * 120 / 180) * (1);
				}
				else {
						f2 = f1 + (Math.PI * 120 / 180) * (-1);
				}
				x2 = cx + r1 * Math.cos(f2);
				y2 = cy + r2 * Math.sin(f2);
				params = arcToCubicCurves(x2, y2, x2old, y2old, r1, r2, angle, 0, sweepFlag, [f2, f2old, cx, cy]);
		}
		df = f2 - f1;
		const c1 = Math.cos(f1);
		const s1 = Math.sin(f1);
		const c2 = Math.cos(f2);
		const s2 = Math.sin(f2);
		const t = Math.tan(df / 4);
		const hx = 4 / 3 * r1 * t;
		const hy = 4 / 3 * r2 * t;
		const m1 = [x1, y1];
		const m2 = [x1 + hx * s1, y1 - hy * c1];
		const m3 = [x2 + hx * s2, y2 - hy * c2];
		const m4 = [x2, y2];
		m2[0] = 2 * m1[0] - m2[0];
		m2[1] = 2 * m1[1] - m2[1];
		if (recursive) {
				return [m2, m3, m4].concat(params);
		}
		else {
				params = [m2, m3, m4].concat(params);
				const curves = [];
				for (let i = 0; i < params.length; i += 3) {
						const r1 = normalize_rotate(params[i][0], params[i][1], angleRad);
						const r2 = normalize_rotate(params[i + 1][0], params[i + 1][1], angleRad);
						const r3 = normalize_rotate(params[i + 2][0], params[i + 2][1], angleRad);
						curves.push([r1[0], r1[1], r2[0], r2[1], r3[0], r3[1]]);
				}
				return curves;
		}
}

;// CONCATENATED MODULE: ./node_modules/path-data-parser/lib/index.js




;// CONCATENATED MODULE: ./node_modules/points-on-path/lib/index.js


function pointsOnPath(path, tolerance, distance) {
		const segments = parsePath(path);
		const normalized = normalize_normalize(absolutize(segments));
		const sets = [];
		let currentPoints = [];
		let start = [0, 0];
		let pendingCurve = [];
		const appendPendingCurve = () => {
				if (pendingCurve.length >= 4) {
						currentPoints.push(...pointsOnBezierCurves(pendingCurve, tolerance));
				}
				pendingCurve = [];
		};
		const appendPendingPoints = () => {
				appendPendingCurve();
				if (currentPoints.length) {
						sets.push(currentPoints);
						currentPoints = [];
				}
		};
		for (const { key, data } of normalized) {
				switch (key) {
						case 'M':
								appendPendingPoints();
								start = [data[0], data[1]];
								currentPoints.push(start);
								break;
						case 'L':
								appendPendingCurve();
								currentPoints.push([data[0], data[1]]);
								break;
						case 'C':
								if (!pendingCurve.length) {
										const lastPoint = currentPoints.length ? currentPoints[currentPoints.length - 1] : start;
										pendingCurve.push([lastPoint[0], lastPoint[1]]);
								}
								pendingCurve.push([data[0], data[1]]);
								pendingCurve.push([data[2], data[3]]);
								pendingCurve.push([data[4], data[5]]);
								break;
						case 'Z':
								appendPendingCurve();
								currentPoints.push([start[0], start[1]]);
								break;
				}
		}
		appendPendingPoints();
		if (!distance) {
				return sets;
		}
		const out = [];
		for (const set of sets) {
				const simplifiedSet = simplify(set, distance);
				if (simplifiedSet.length) {
						out.push(simplifiedSet);
				}
		}
		return out;
}

;// CONCATENATED MODULE: ./src/walker.ts
function walker_slicedToArray(arr, i) { return walker_arrayWithHoles(arr) || walker_iterableToArrayLimit(arr, i) || walker_unsupportedIterableToArray(arr, i) || walker_nonIterableRest(); }

function walker_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\
In order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function walker_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function walker_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function walker_toConsumableArray(arr) { return walker_arrayWithoutHoles(arr) || walker_iterableToArray(arr) || walker_unsupportedIterableToArray(arr) || walker_nonIterableSpread(); }

function walker_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\
In order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function walker_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return walker_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return walker_arrayLikeToArray(o, minLen); }

function walker_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function walker_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return walker_arrayLikeToArray(arr); }

function walker_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function walker_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function walker_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { walker_ownKeys(Object(source), true).forEach(function (key) { walker_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { walker_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function walker_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var SUPPORTED_TAGS = ["svg", "path", "g", "use", "circle", "ellipse", "rect", "polyline", "polygon"];

var nodeValidator = function nodeValidator(node) {
	if (SUPPORTED_TAGS.includes(node.tagName)) {
		return NodeFilter.FILTER_ACCEPT;
	}

	return NodeFilter.FILTER_REJECT;
};

function createTreeWalker(dom) {
	return document.createTreeWalker(dom, NodeFilter.SHOW_ALL, {
		acceptNode: nodeValidator
	});
}

var walker_presAttrs = function presAttrs(el, groups) {
	return walker_objectSpread(walker_objectSpread(walker_objectSpread({}, getGroupAttrs(groups)), presAttrsToElementValues(el)), filterAttrsToElementValues(el));
};

var skippedUseAttrs = ["id"];
var allwaysPassedUseAttrs = ["x", "y", "width", "height", "href", "xlink:href"];
/*
	"Most attributes on use do not override those already on the element
	referenced by use. (This differs from how CSS style attributes override
	those set 'earlier' in the cascade). Only the attributes x, y, width,
	height and href on the use element will override those set on the
	referenced element. However, any other attributes not set on the referenced
	element will be applied to the use element."

	Situation 1: Attr is set on defEl, NOT on useEl
		- result: use defEl attr
	Situation 2: Attr is on useEl, NOT on defEl
		- result: use the useEl attr
	Situation 3: Attr is on both useEl and defEl
		- result: use the defEl attr (Unless x, y, width, height, href, xlink:href)
*/

var getDefElWithCorrectAttrs = function getDefElWithCorrectAttrs(defEl, useEl) {
	var finalEl = walker_toConsumableArray(useEl.attributes).reduce(function (el, attr) {
		if (skippedUseAttrs.includes(attr.value)) {
			return el;
		} // Does defEl have the attr? If so, use it, else use the useEl attr


		if (!defEl.hasAttribute(attr.name) || allwaysPassedUseAttrs.includes(attr.name)) {
			el.setAttribute(attr.name, useEl.getAttribute(attr.name) || "");
		}

		return el;
	}, defEl.cloneNode());

	return finalEl;
};

var walkers = {
	svg: function svg(args) {
		walk(args, args.tw.nextNode());
	},
	g: function g(args) {
		var nextArgs = walker_objectSpread(walker_objectSpread({}, args), {}, {
			tw: createTreeWalker(args.tw.currentNode),
			groups: [].concat(walker_toConsumableArray(args.groups), [new elements_Group(args.tw.currentNode)])
		});

		walk(nextArgs, nextArgs.tw.nextNode());
		walk(args, args.tw.nextSibling());
	},
	use: function use(args) {
		var root = args.root,
				tw = args.tw,
				scene = args.scene;
		var useEl = tw.currentNode;
		var id = useEl.getAttribute("href") || useEl.getAttribute("xlink:href");

		if (!id) {
			throw new Error("unable to get id of use element");
		}

		var defEl = root.querySelector(id);

		if (!defEl) {
			throw new Error("unable to find def element with id: ".concat(id));
		}

		var tempScene = new elements_ExcalidrawScene();
		var finalEl = getDefElWithCorrectAttrs(defEl, useEl);
		walk(walker_objectSpread(walker_objectSpread({}, args), {}, {
			scene: tempScene,
			tw: createTreeWalker(finalEl)
		}), finalEl);
		var exEl = tempScene.elements.pop();

		if (!exEl) {
			throw new Error("Unable to create ex element");
		}

		scene.elements.push(exEl);
		walk(args, args.tw.nextNode());
	},
	circle: function circle(args) {
		var tw = args.tw,
				scene = args.scene,
				groups = args.groups;
		var el = tw.currentNode;
		var r = getNum(el, "r", 0);
		var d = r * 2;
		var x = getNum(el, "x", 0) + getNum(el, "cx", 0) - r;
		var y = getNum(el, "y", 0) + getNum(el, "cy", 0) - r;
		var mat = getTransformMatrix(el, groups); // @ts-ignore

		var m = fromValues(d, 0, 0, 0, 0, d, 0, 0, 0, 0, 1, 0, x, y, 0, 1);
		var result = multiply(create(), mat, m);

		var circle = walker_objectSpread(walker_objectSpread(walker_objectSpread({}, createExEllipse()), walker_presAttrs(el, groups)), {}, {
			x: result[12],
			y: result[13],
			width: result[0],
			height: result[5],
			groupIds: groups.map(function (g) {
				return g.id;
			})
		});

		scene.elements.push(circle);
		walk(args, tw.nextNode());
	},
	ellipse: function ellipse(args) {
		var tw = args.tw,
				scene = args.scene,
				groups = args.groups;
		var el = tw.currentNode;
		var rx = getNum(el, "rx", 0);
		var ry = getNum(el, "ry", 0);
		var cx = getNum(el, "cx", 0);
		var cy = getNum(el, "cy", 0);
		var x = getNum(el, "x", 0) + cx - rx;
		var y = getNum(el, "y", 0) + cy - ry;
		var w = rx * 2;
		var h = ry * 2;
		var mat = getTransformMatrix(el, groups);
		var m = fromValues(w, 0, 0, 0, 0, h, 0, 0, 0, 0, 1, 0, x, y, 0, 1);
		var result = multiply(create(), mat, m);

		var ellipse = walker_objectSpread(walker_objectSpread(walker_objectSpread({}, createExEllipse()), walker_presAttrs(el, groups)), {}, {
			x: result[12],
			y: result[13],
			width: result[0],
			height: result[5],
			groupIds: groups.map(function (g) {
				return g.id;
			})
		});

		scene.elements.push(ellipse);
		walk(args, tw.nextNode());
	},
	line: function line(args) {
		// unimplemented
		walk(args, args.tw.nextNode());
	},
	polygon: function polygon(args) {
		var tw = args.tw,
				scene = args.scene,
				groups = args.groups;
		var el = tw.currentNode;
		var points = pointsAttrToPoints(el);
		var mat = getTransformMatrix(el, groups);
		var transformedPoints = transformPoints(points, mat); // The first point needs to be 0, 0, and all following points
		// are relative to the first point.

		var x = transformedPoints[0][0];
		var y = transformedPoints[0][1];
		var relativePoints = transformedPoints.map(function (_ref) {
			var _ref2 = walker_slicedToArray(_ref, 2),
					_x = _ref2[0],
					_y = _ref2[1];

			return [_x - x, _y - y];
		});

		var _dimensionsFromPoints = dimensionsFromPoints(relativePoints),
				_dimensionsFromPoints2 = walker_slicedToArray(_dimensionsFromPoints, 2),
				width = _dimensionsFromPoints2[0],
				height = _dimensionsFromPoints2[1];

		var line = walker_objectSpread(walker_objectSpread(walker_objectSpread(walker_objectSpread({}, createExLine()), getGroupAttrs(groups)), presAttrsToElementValues(el)), {}, {
			points: relativePoints.concat([[0, 0]]),
			x: x,
			y: y,
			width: width,
			height: height
		});

		scene.elements.push(line);
		walk(args, args.tw.nextNode());
	},
	polyline: function polyline(args) {
		var tw = args.tw,
				scene = args.scene,
				groups = args.groups;
		var el = tw.currentNode;
		var mat = getTransformMatrix(el, groups);
		var points = pointsAttrToPoints(el);
		var transformedPoints = transformPoints(points, mat); // The first point needs to be 0, 0, and all following points
		// are relative to the first point.

		var x = transformedPoints[0][0];
		var y = transformedPoints[0][1];
		var relativePoints = transformedPoints.map(function (_ref3) {
			var _ref4 = walker_slicedToArray(_ref3, 2),
					_x = _ref4[0],
					_y = _ref4[1];

			return [_x - x, _y - y];
		});

		var _dimensionsFromPoints3 = dimensionsFromPoints(relativePoints),
				_dimensionsFromPoints4 = walker_slicedToArray(_dimensionsFromPoints3, 2),
				width = _dimensionsFromPoints4[0],
				height = _dimensionsFromPoints4[1];

		var hasFill = has(el, "fill");
		var fill = get(el, "fill");
		var shouldFill = !hasFill || hasFill && fill !== "none";

		var line = walker_objectSpread(walker_objectSpread(walker_objectSpread(walker_objectSpread({}, createExLine()), getGroupAttrs(groups)), presAttrsToElementValues(el)), {}, {
			points: relativePoints.concat(shouldFill ? [[0, 0]] : []),
			x: x,
			y: y,
			width: width,
			height: height
		});

		scene.elements.push(line);
		walk(args, args.tw.nextNode());
	},
	rect: function rect(args) {
		var tw = args.tw,
				scene = args.scene,
				groups = args.groups;
		var el = tw.currentNode;
		var x = getNum(el, "x", 0);
		var y = getNum(el, "y", 0);
		var w = getNum(el, "width", 0);
		var h = getNum(el, "height", 0);
		var mat = getTransformMatrix(el, groups); // @ts-ignore

		var m = fromValues(w, 0, 0, 0, 0, h, 0, 0, 0, 0, 1, 0, x, y, 0, 1);
		var result = multiply(create(), mat, m);
		/*
		NOTE: Currently there doesn't seem to be a way to specify the border
					radius of a rect within Excalidraw. This means that attributes
					rx and ry can't be used.
		*/

		var isRound = el.hasAttribute("rx") || el.hasAttribute("ry");

		var rect = walker_objectSpread(walker_objectSpread(walker_objectSpread({}, createExRect()), walker_presAttrs(el, groups)), {}, {
			x: result[12],
			y: result[13],
			width: result[0],
			height: result[5],
			strokeSharpness: isRound ? "round" : "sharp"
		});

		scene.elements.push(rect);
		walk(args, args.tw.nextNode());
	},
	path: function path(args) {
		var tw = args.tw,
				scene = args.scene,
				groups = args.groups;
		var el = tw.currentNode;
		var mat = getTransformMatrix(el, groups);
		var points = pointsOnPath(get(el, "d"));
		var fillColor = get(el, "fill", "black");
		var fillRule = get(el, "fill-rule", "nonzero");
		var elements = [];
		var localGroup = randomId();

		switch (fillRule) {
			case "nonzero":
				var initialWindingOrder = "clockwise";
				elements = points.map(function (pointArr, idx) {
					var tPoints = transformPoints(pointArr, clone(mat));
					var x = tPoints[0][0];
					var y = tPoints[0][1];

					var _dimensionsFromPoints5 = dimensionsFromPoints(tPoints),
							_dimensionsFromPoints6 = walker_slicedToArray(_dimensionsFromPoints5, 2),
							width = _dimensionsFromPoints6[0],
							height = _dimensionsFromPoints6[1];

					var relativePoints = tPoints.map(function (_ref5) {
						var _ref6 = walker_slicedToArray(_ref5, 2),
								_x = _ref6[0],
								_y = _ref6[1];

						return [_x - x, _y - y];
					});
					var windingOrder = getWindingOrder(relativePoints);

					if (idx === 0) {
						initialWindingOrder = windingOrder;
						localGroup = randomId();
					}

					var backgroundColor = fillColor;

					if (initialWindingOrder !== windingOrder) {
						backgroundColor = "#FFFFFF";
					}

					return walker_objectSpread(walker_objectSpread(walker_objectSpread({}, createExDraw()), {}, {
						strokeWidth: 0,
						strokeColor: "#00000000"
					}, walker_presAttrs(el, groups)), {}, {
						points: relativePoints,
						backgroundColor: backgroundColor,
						width: width,
						height: height,
						x: x + getNum(el, "x", 0),
						y: y + getNum(el, "y", 0),
						groupIds: [localGroup]
					});
				});
				break;

			case "evenodd":
				elements = points.map(function (pointArr, idx) {
					var tPoints = transformPoints(pointArr, clone(mat));
					var x = tPoints[0][0];
					var y = tPoints[0][1];

					var _dimensionsFromPoints7 = dimensionsFromPoints(tPoints),
							_dimensionsFromPoints8 = walker_slicedToArray(_dimensionsFromPoints7, 2),
							width = _dimensionsFromPoints8[0],
							height = _dimensionsFromPoints8[1];

					var relativePoints = tPoints.map(function (_ref7) {
						var _ref8 = walker_slicedToArray(_ref7, 2),
								_x = _ref8[0],
								_y = _ref8[1];

						return [_x - x, _y - y];
					});

					if (idx === 0) {
						localGroup = randomId();
					}

					return walker_objectSpread(walker_objectSpread(walker_objectSpread({}, createExDraw()), walker_presAttrs(el, groups)), {}, {
						points: relativePoints,
						width: width,
						height: height,
						x: x + getNum(el, "x", 0),
						y: y + getNum(el, "y", 0)
					});
				});
				break;

			default:
		}

		scene.elements = scene.elements.concat(elements);
		walk(args, tw.nextNode());
	}
};
function walk(args, nextNode) {
	if (!nextNode) {
		return;
	}

	var nodeName = nextNode.nodeName;

	if (walkers[nodeName]) {
		walkers[nodeName](args);
	}
}
;// CONCATENATED MODULE: ./src/parser.ts
function parser_toConsumableArray(arr) { return parser_arrayWithoutHoles(arr) || parser_iterableToArray(arr) || parser_unsupportedIterableToArray(arr) || parser_nonIterableSpread(); }

function parser_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\
In order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function parser_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return parser_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return parser_arrayLikeToArray(o, minLen); }

function parser_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function parser_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return parser_arrayLikeToArray(arr); }

function parser_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



function convert(svgString) {
	var parser = new DOMParser();
	var svgDOM = parser.parseFromString(svgString, "image/svg+xml"); // was there a parsing error?

	var errorsElements = svgDOM.querySelectorAll("parsererror");
	var hasErrors = errorsElements.length > 0;
	var content = null;

	if (hasErrors) {
		console.error("There were errors while parsing the given SVG: ", parser_toConsumableArray(errorsElements).map(function (el) {
			return el.innerHTML;
		}));
	} else {
		var tw = createTreeWalker(svgDOM);
		var scene = new elements_ExcalidrawScene();
		var groups = [];
		walk({
			tw: tw,
			scene: scene,
			groups: groups,
			root: svgDOM
		}, tw.nextNode());


		var header = svgDOM.querySelector("svg");
		var width  = header.getAttribute("width");
		var height = header.getAttribute("height");
		var area   = width * height;

		var els = [];
		var groups = {};

		for (var i = 0; i < scene.elements.length; i++) {
			var elArea = scene.elements[i].width * scene.elements[i].height;
			if (elArea / area > 0.001) {
				scene.elements[i].points.pop();
				els.push(scene.elements[i]);

				for (var j = 0; j < scene.elements[i].groupIds.length; j++) {
					var gID = scene.elements[i].groupIds[j];
					if (groups[gID] === undefined) {
						groups[gID] = 0;
					}
					groups[gID] += elArea;
				}
			}
		}

		els.sort(function(a,b){ 
			var sizea = a.width * a.height;
			var sizeb = b.width * b.height;

			var size_groups_a = 0;
			for (var i = 0; i < a.groupIds.length; i++) {
				var gID = a.groupIds[i];
				size_groups_a += groups[gID];
			}

			var size_groups_b = 0;
			for (var j = 0; j < b.groupIds.length; j++) {
				var gID = b.groupIds[j];
				size_groups_b += groups[gID];
			}

			var x = (sizea + size_groups_a) < (sizeb + size_groups_b) ? 1:-1;

			return x; 
		});

		content = {
			"type":"excalidraw",
			"version":2,
			"source":"https://www.politecnica.pucrs.br/laboratorios/lis/",
			"elements": els
		};
	}

	return {
		hasErrors: hasErrors,
		errors: hasErrors ? errorsElements : null,
		content: content
	};
};
;// CONCATENATED MODULE: ./src/index.ts


/// THIS MAY BE FUCKED
function idk () { 'use strict';

		var limit = function (x, min, max) {
				if ( min === void 0 ) min=0;
				if ( max === void 0 ) max=1;

				return x < min ? min : x > max ? max : x;
		};

		var clip_rgb = function (rgb) {
				rgb._clipped = false;
				rgb._unclipped = rgb.slice(0);
				for (var i=0; i<=3; i++) {
						if (i < 3) {
								if (rgb[i] < 0 || rgb[i] > 255) { rgb._clipped = true; }
								rgb[i] = limit(rgb[i], 0, 255);
						} else if (i === 3) {
								rgb[i] = limit(rgb[i], 0, 1);
						}
				}
				return rgb;
		};

		// ported from jQuery's $.type
		var classToType = {};
		for (var i = 0, list = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; i < list.length; i += 1) {
				var name = list[i];

				classToType[("[object " + name + "]")] = name.toLowerCase();
		}
		var type = function(obj) {
				return classToType[Object.prototype.toString.call(obj)] || "object";
		};

		var unpack = function (args, keyOrder) {
				if ( keyOrder === void 0 ) keyOrder=null;

			// if called with more than 3 arguments, we return the arguments
				if (args.length >= 3) { return Array.prototype.slice.call(args); }
				// with less than 3 args we check if first arg is object
				// and use the keyOrder string to extract and sort properties
			if (type(args[0]) == 'object' && keyOrder) {
				return keyOrder.split('')
					.filter(function (k) { return args[0][k] !== undefined; })
					.map(function (k) { return args[0][k]; });
			}
			// otherwise we just return the first argument
			// (which we suppose is an array of args)
				return args[0];
		};

		var last = function (args) {
				if (args.length < 2) { return null; }
				var l = args.length-1;
				if (type(args[l]) == 'string') { return args[l].toLowerCase(); }
				return null;
		};

		var PI = Math.PI;

		var utils = {
			clip_rgb: clip_rgb,
			limit: limit,
			type: type,
			unpack: unpack,
			last: last,
			PI: PI,
			TWOPI: PI*2,
			PITHIRD: PI/3,
			DEG2RAD: PI / 180,
			RAD2DEG: 180 / PI
		};

		var input = {
			format: {},
			autodetect: []
		};

		var last$1 = utils.last;
		var clip_rgb$1 = utils.clip_rgb;
		var type$1 = utils.type;


		var Color = function Color() {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var me = this;
				if (type$1(args[0]) === 'object' &&
						args[0].constructor &&
						args[0].constructor === this.constructor) {
						// the argument is already a Color instance
						return args[0];
				}

				// last argument could be the mode
				var mode = last$1(args);
				var autodetect = false;

				if (!mode) {
						autodetect = true;
						if (!input.sorted) {
								input.autodetect = input.autodetect.sort(function (a,b) { return b.p - a.p; });
								input.sorted = true;
						}
						// auto-detect format
						for (var i = 0, list = input.autodetect; i < list.length; i += 1) {
								var chk = list[i];

								mode = chk.test.apply(chk, args);
								if (mode) { break; }
						}
				}

				if (input.format[mode]) {
						var rgb = input.format[mode].apply(null, autodetect ? args : args.slice(0,-1));
						me._rgb = clip_rgb$1(rgb);
				} else {
						throw new Error('unknown format: '+args);
				}

				// add alpha channel
				if (me._rgb.length === 3) { me._rgb.push(1); }
		};

		Color.prototype.toString = function toString () {
				if (type$1(this.hex) == 'function') { return this.hex(); }
				return ("[" + (this._rgb.join(',')) + "]");
		};

		var Color_1 = Color;

		var chroma = function () {
			var args = [], len = arguments.length;
			while ( len-- ) args[ len ] = arguments[ len ];

			return new (Function.prototype.bind.apply( chroma.Color, [ null ].concat( args) ));
		};

		chroma.Color = Color_1;
		chroma.version = '2.1.2';

		var chroma_1 = chroma;

		var unpack$1 = utils.unpack;
		var max = Math.max;

		var rgb2cmyk = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var ref = unpack$1(args, 'rgb');
				var r = ref[0];
				var g = ref[1];
				var b = ref[2];
				r = r / 255;
				g = g / 255;
				b = b / 255;
				var k = 1 - max(r,max(g,b));
				var f = k < 1 ? 1 / (1-k) : 0;
				var c = (1-r-k) * f;
				var m = (1-g-k) * f;
				var y = (1-b-k) * f;
				return [c,m,y,k];
		};

		var rgb2cmyk_1 = rgb2cmyk;

		var unpack$2 = utils.unpack;

		var cmyk2rgb = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				args = unpack$2(args, 'cmyk');
				var c = args[0];
				var m = args[1];
				var y = args[2];
				var k = args[3];
				var alpha = args.length > 4 ? args[4] : 1;
				if (k === 1) { return [0,0,0,alpha]; }
				return [
						c >= 1 ? 0 : 255 * (1-c) * (1-k), // r
						m >= 1 ? 0 : 255 * (1-m) * (1-k), // g
						y >= 1 ? 0 : 255 * (1-y) * (1-k), // b
						alpha
				];
		};

		var cmyk2rgb_1 = cmyk2rgb;

		var unpack$3 = utils.unpack;
		var type$2 = utils.type;



		Color_1.prototype.cmyk = function() {
				return rgb2cmyk_1(this._rgb);
		};

		chroma_1.cmyk = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['cmyk']) ));
		};

		input.format.cmyk = cmyk2rgb_1;

		input.autodetect.push({
				p: 2,
				test: function () {
						var args = [], len = arguments.length;
						while ( len-- ) args[ len ] = arguments[ len ];

						args = unpack$3(args, 'cmyk');
						if (type$2(args) === 'array' && args.length === 4) {
								return 'cmyk';
						}
				}
		});

		var unpack$4 = utils.unpack;
		var last$2 = utils.last;
		var rnd = function (a) { return Math.round(a*100)/100; };

		/*
		 * supported arguments:
		 * - hsl2css(h,s,l)
		 * - hsl2css(h,s,l,a)
		 * - hsl2css([h,s,l], mode)
		 * - hsl2css([h,s,l,a], mode)
		 * - hsl2css({h,s,l,a}, mode)
		 */
		var hsl2css = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var hsla = unpack$4(args, 'hsla');
				var mode = last$2(args) || 'lsa';
				hsla[0] = rnd(hsla[0] || 0);
				hsla[1] = rnd(hsla[1]*100) + '%';
				hsla[2] = rnd(hsla[2]*100) + '%';
				if (mode === 'hsla' || (hsla.length > 3 && hsla[3]<1)) {
						hsla[3] = hsla.length > 3 ? hsla[3] : 1;
						mode = 'hsla';
				} else {
						hsla.length = 3;
				}
				return (mode + "(" + (hsla.join(',')) + ")");
		};

		var hsl2css_1 = hsl2css;

		var unpack$5 = utils.unpack;

		/*
		 * supported arguments:
		 * - rgb2hsl(r,g,b)
		 * - rgb2hsl(r,g,b,a)
		 * - rgb2hsl([r,g,b])
		 * - rgb2hsl([r,g,b,a])
		 * - rgb2hsl({r,g,b,a})
		 */
		var rgb2hsl = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				args = unpack$5(args, 'rgba');
				var r = args[0];
				var g = args[1];
				var b = args[2];

				r /= 255;
				g /= 255;
				b /= 255;

				var min = Math.min(r, g, b);
				var max = Math.max(r, g, b);

				var l = (max + min) / 2;
				var s, h;

				if (max === min){
						s = 0;
						h = Number.NaN;
				} else {
						s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
				}

				if (r == max) { h = (g - b) / (max - min); }
				else if (g == max) { h = 2 + (b - r) / (max - min); }
				else if (b == max) { h = 4 + (r - g) / (max - min); }

				h *= 60;
				if (h < 0) { h += 360; }
				if (args.length>3 && args[3]!==undefined) { return [h,s,l,args[3]]; }
				return [h,s,l];
		};

		var rgb2hsl_1 = rgb2hsl;

		var unpack$6 = utils.unpack;
		var last$3 = utils.last;


		var round = Math.round;

		/*
		 * supported arguments:
		 * - rgb2css(r,g,b)
		 * - rgb2css(r,g,b,a)
		 * - rgb2css([r,g,b], mode)
		 * - rgb2css([r,g,b,a], mode)
		 * - rgb2css({r,g,b,a}, mode)
		 */
		var rgb2css = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var rgba = unpack$6(args, 'rgba');
				var mode = last$3(args) || 'rgb';
				if (mode.substr(0,3) == 'hsl') {
						return hsl2css_1(rgb2hsl_1(rgba), mode);
				}
				rgba[0] = round(rgba[0]);
				rgba[1] = round(rgba[1]);
				rgba[2] = round(rgba[2]);
				if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
						rgba[3] = rgba.length > 3 ? rgba[3] : 1;
						mode = 'rgba';
				}
				return (mode + "(" + (rgba.slice(0,mode==='rgb'?3:4).join(',')) + ")");
		};

		var rgb2css_1 = rgb2css;

		var unpack$7 = utils.unpack;
		var round$1 = Math.round;

		var hsl2rgb = function () {
				var assign;

				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];
				args = unpack$7(args, 'hsl');
				var h = args[0];
				var s = args[1];
				var l = args[2];
				var r,g,b;
				if (s === 0) {
						r = g = b = l*255;
				} else {
						var t3 = [0,0,0];
						var c = [0,0,0];
						var t2 = l < 0.5 ? l * (1+s) : l+s-l*s;
						var t1 = 2 * l - t2;
						var h_ = h / 360;
						t3[0] = h_ + 1/3;
						t3[1] = h_;
						t3[2] = h_ - 1/3;
						for (var i=0; i<3; i++) {
								if (t3[i] < 0) { t3[i] += 1; }
								if (t3[i] > 1) { t3[i] -= 1; }
								if (6 * t3[i] < 1)
										{ c[i] = t1 + (t2 - t1) * 6 * t3[i]; }
								else if (2 * t3[i] < 1)
										{ c[i] = t2; }
								else if (3 * t3[i] < 2)
										{ c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6; }
								else
										{ c[i] = t1; }
						}
						(assign = [round$1(c[0]*255),round$1(c[1]*255),round$1(c[2]*255)], r = assign[0], g = assign[1], b = assign[2]);
				}
				if (args.length > 3) {
						// keep alpha channel
						return [r,g,b,args[3]];
				}
				return [r,g,b,1];
		};

		var hsl2rgb_1 = hsl2rgb;

		var RE_RGB = /^rgb\\(\\s*(-?\\d+),\\s*(-?\\d+)\\s*,\\s*(-?\\d+)\\s*\\)$/;
		var RE_RGBA = /^rgba\\(\\s*(-?\\d+),\\s*(-?\\d+)\\s*,\\s*(-?\\d+)\\s*,\\s*([01]|[01]?\\.\\d+)\\)$/;
		var RE_RGB_PCT = /^rgb\\(\\s*(-?\\d+(?:\\.\\d+)?)%,\\s*(-?\\d+(?:\\.\\d+)?)%\\s*,\\s*(-?\\d+(?:\\.\\d+)?)%\\s*\\)$/;
		var RE_RGBA_PCT = /^rgba\\(\\s*(-?\\d+(?:\\.\\d+)?)%,\\s*(-?\\d+(?:\\.\\d+)?)%\\s*,\\s*(-?\\d+(?:\\.\\d+)?)%\\s*,\\s*([01]|[01]?\\.\\d+)\\)$/;
		var RE_HSL = /^hsl\\(\\s*(-?\\d+(?:\\.\\d+)?),\\s*(-?\\d+(?:\\.\\d+)?)%\\s*,\\s*(-?\\d+(?:\\.\\d+)?)%\\s*\\)$/;
		var RE_HSLA = /^hsla\\(\\s*(-?\\d+(?:\\.\\d+)?),\\s*(-?\\d+(?:\\.\\d+)?)%\\s*,\\s*(-?\\d+(?:\\.\\d+)?)%\\s*,\\s*([01]|[01]?\\.\\d+)\\)$/;

		var round$2 = Math.round;

		var css2rgb = function (css) {
				css = css.toLowerCase().trim();
				var m;

				if (input.format.named) {
						try {
								return input.format.named(css);
						} catch (e) {
								// eslint-disable-next-line
						}
				}

				// rgb(250,20,0)
				if ((m = css.match(RE_RGB))) {
						var rgb = m.slice(1,4);
						for (var i=0; i<3; i++) {
								rgb[i] = +rgb[i];
						}
						rgb[3] = 1;	// default alpha
						return rgb;
				}

				// rgba(250,20,0,0.4)
				if ((m = css.match(RE_RGBA))) {
						var rgb$1 = m.slice(1,5);
						for (var i$1=0; i$1<4; i$1++) {
								rgb$1[i$1] = +rgb$1[i$1];
						}
						return rgb$1;
				}

				// rgb(100%,0%,0%)
				if ((m = css.match(RE_RGB_PCT))) {
						var rgb$2 = m.slice(1,4);
						for (var i$2=0; i$2<3; i$2++) {
								rgb$2[i$2] = round$2(rgb$2[i$2] * 2.55);
						}
						rgb$2[3] = 1;	// default alpha
						return rgb$2;
				}

				// rgba(100%,0%,0%,0.4)
				if ((m = css.match(RE_RGBA_PCT))) {
						var rgb$3 = m.slice(1,5);
						for (var i$3=0; i$3<3; i$3++) {
								rgb$3[i$3] = round$2(rgb$3[i$3] * 2.55);
						}
						rgb$3[3] = +rgb$3[3];
						return rgb$3;
				}

				// hsl(0,100%,50%)
				if ((m = css.match(RE_HSL))) {
						var hsl = m.slice(1,4);
						hsl[1] *= 0.01;
						hsl[2] *= 0.01;
						var rgb$4 = hsl2rgb_1(hsl);
						rgb$4[3] = 1;
						return rgb$4;
				}

				// hsla(0,100%,50%,0.5)
				if ((m = css.match(RE_HSLA))) {
						var hsl$1 = m.slice(1,4);
						hsl$1[1] *= 0.01;
						hsl$1[2] *= 0.01;
						var rgb$5 = hsl2rgb_1(hsl$1);
						rgb$5[3] = +m[4];	// default alpha = 1
						return rgb$5;
				}
		};

		css2rgb.test = function (s) {
				return RE_RGB.test(s) ||
						RE_RGBA.test(s) ||
						RE_RGB_PCT.test(s) ||
						RE_RGBA_PCT.test(s) ||
						RE_HSL.test(s) ||
						RE_HSLA.test(s);
		};

		var css2rgb_1 = css2rgb;

		var type$3 = utils.type;




		Color_1.prototype.css = function(mode) {
				return rgb2css_1(this._rgb, mode);
		};

		chroma_1.css = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['css']) ));
		};

		input.format.css = css2rgb_1;

		input.autodetect.push({
				p: 5,
				test: function (h) {
						var rest = [], len = arguments.length - 1;
						while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

						if (!rest.length && type$3(h) === 'string' && css2rgb_1.test(h)) {
								return 'css';
						}
				}
		});

		var unpack$8 = utils.unpack;

		input.format.gl = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var rgb = unpack$8(args, 'rgba');
				rgb[0] *= 255;
				rgb[1] *= 255;
				rgb[2] *= 255;
				return rgb;
		};

		chroma_1.gl = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['gl']) ));
		};

		Color_1.prototype.gl = function() {
				var rgb = this._rgb;
				return [rgb[0]/255, rgb[1]/255, rgb[2]/255, rgb[3]];
		};

		var unpack$9 = utils.unpack;

		var rgb2hcg = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var ref = unpack$9(args, 'rgb');
				var r = ref[0];
				var g = ref[1];
				var b = ref[2];
				var min = Math.min(r, g, b);
				var max = Math.max(r, g, b);
				var delta = max - min;
				var c = delta * 100 / 255;
				var _g = min / (255 - delta) * 100;
				var h;
				if (delta === 0) {
						h = Number.NaN;
				} else {
						if (r === max) { h = (g - b) / delta; }
						if (g === max) { h = 2+(b - r) / delta; }
						if (b === max) { h = 4+(r - g) / delta; }
						h *= 60;
						if (h < 0) { h += 360; }
				}
				return [h, c, _g];
		};

		var rgb2hcg_1 = rgb2hcg;

		var unpack$a = utils.unpack;
		var floor = Math.floor;

		/*
		 * this is basically just HSV with some minor tweaks
		 *
		 * hue.. [0..360]
		 * chroma .. [0..1]
		 * grayness .. [0..1]
		 */

		var hcg2rgb = function () {
				var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];
				args = unpack$a(args, 'hcg');
				var h = args[0];
				var c = args[1];
				var _g = args[2];
				var r,g,b;
				_g = _g * 255;
				var _c = c * 255;
				if (c === 0) {
						r = g = b = _g;
				} else {
						if (h === 360) { h = 0; }
						if (h > 360) { h -= 360; }
						if (h < 0) { h += 360; }
						h /= 60;
						var i = floor(h);
						var f = h - i;
						var p = _g * (1 - c);
						var q = p + _c * (1 - f);
						var t = p + _c * f;
						var v = p + _c;
						switch (i) {
								case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
								case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
								case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
								case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
								case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
								case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
						}
				}
				return [r, g, b, args.length > 3 ? args[3] : 1];
		};

		var hcg2rgb_1 = hcg2rgb;

		var unpack$b = utils.unpack;
		var type$4 = utils.type;






		Color_1.prototype.hcg = function() {
				return rgb2hcg_1(this._rgb);
		};

		chroma_1.hcg = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hcg']) ));
		};

		input.format.hcg = hcg2rgb_1;

		input.autodetect.push({
				p: 1,
				test: function () {
						var args = [], len = arguments.length;
						while ( len-- ) args[ len ] = arguments[ len ];

						args = unpack$b(args, 'hcg');
						if (type$4(args) === 'array' && args.length === 3) {
								return 'hcg';
						}
				}
		});

		var unpack$c = utils.unpack;
		var last$4 = utils.last;
		var round$3 = Math.round;

		var rgb2hex = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var ref = unpack$c(args, 'rgba');
				var r = ref[0];
				var g = ref[1];
				var b = ref[2];
				var a = ref[3];
				var mode = last$4(args) || 'auto';
				if (a === undefined) { a = 1; }
				if (mode === 'auto') {
						mode = a < 1 ? 'rgba' : 'rgb';
				}
				r = round$3(r);
				g = round$3(g);
				b = round$3(b);
				var u = r << 16 | g << 8 | b;
				var str = "000000" + u.toString(16); //#.toUpperCase();
				str = str.substr(str.length - 6);
				var hxa = '0' + round$3(a * 255).toString(16);
				hxa = hxa.substr(hxa.length - 2);
				switch (mode.toLowerCase()) {
						case 'rgba': return ("#" + str + hxa);
						case 'argb': return ("#" + hxa + str);
						default: return ("#" + str);
				}
		};

		var rgb2hex_1 = rgb2hex;

		var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
		var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

		var hex2rgb = function (hex) {
				if (hex.match(RE_HEX)) {
						// remove optional leading #
						if (hex.length === 4 || hex.length === 7) {
								hex = hex.substr(1);
						}
						// expand short-notation to full six-digit
						if (hex.length === 3) {
								hex = hex.split('');
								hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
						}
						var u = parseInt(hex, 16);
						var r = u >> 16;
						var g = u >> 8 & 0xFF;
						var b = u & 0xFF;
						return [r,g,b,1];
				}

				// match rgba hex format, eg #FF000077
				if (hex.match(RE_HEXA)) {
						if (hex.length === 5 || hex.length === 9) {
								// remove optional leading #
								hex = hex.substr(1);
						}
						// expand short-notation to full eight-digit
						if (hex.length === 4) {
								hex = hex.split('');
								hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
						}
						var u$1 = parseInt(hex, 16);
						var r$1 = u$1 >> 24 & 0xFF;
						var g$1 = u$1 >> 16 & 0xFF;
						var b$1 = u$1 >> 8 & 0xFF;
						var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
						return [r$1,g$1,b$1,a];
				}

				// we used to check for css colors here
				// if _input.css? and rgb = _input.css hex
				//		 return rgb

				throw new Error(("unknown hex color: " + hex));
		};

		var hex2rgb_1 = hex2rgb;

		var type$5 = utils.type;




		Color_1.prototype.hex = function(mode) {
				return rgb2hex_1(this._rgb, mode);
		};

		chroma_1.hex = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hex']) ));
		};

		input.format.hex = hex2rgb_1;
		input.autodetect.push({
				p: 4,
				test: function (h) {
						var rest = [], len = arguments.length - 1;
						while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

						if (!rest.length && type$5(h) === 'string' && [3,4,5,6,7,8,9].indexOf(h.length) >= 0) {
								return 'hex';
						}
				}
		});

		var unpack$d = utils.unpack;
		var TWOPI = utils.TWOPI;
		var min = Math.min;
		var sqrt = Math.sqrt;
		var acos = Math.acos;

		var rgb2hsi = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				/*
				borrowed from here:
				http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
				*/
				var ref = unpack$d(args, 'rgb');
				var r = ref[0];
				var g = ref[1];
				var b = ref[2];
				r /= 255;
				g /= 255;
				b /= 255;
				var h;
				var min_ = min(r,g,b);
				var i = (r+g+b) / 3;
				var s = i > 0 ? 1 - min_/i : 0;
				if (s === 0) {
						h = NaN;
				} else {
						h = ((r-g)+(r-b)) / 2;
						h /= sqrt((r-g)*(r-g) + (r-b)*(g-b));
						h = acos(h);
						if (b > g) {
								h = TWOPI - h;
						}
						h /= TWOPI;
				}
				return [h*360,s,i];
		};

		var rgb2hsi_1 = rgb2hsi;

		var unpack$e = utils.unpack;
		var limit$1 = utils.limit;
		var TWOPI$1 = utils.TWOPI;
		var PITHIRD = utils.PITHIRD;
		var cos = Math.cos;

		/*
		 * hue [0..360]
		 * saturation [0..1]
		 * intensity [0..1]
		 */
		var hsi2rgb = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				/*
				borrowed from here:
				http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
				*/
				args = unpack$e(args, 'hsi');
				var h = args[0];
				var s = args[1];
				var i = args[2];
				var r,g,b;

				if (isNaN(h)) { h = 0; }
				if (isNaN(s)) { s = 0; }
				// normalize hue
				if (h > 360) { h -= 360; }
				if (h < 0) { h += 360; }
				h /= 360;
				if (h < 1/3) {
						b = (1-s)/3;
						r = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
						g = 1 - (b+r);
				} else if (h < 2/3) {
						h -= 1/3;
						r = (1-s)/3;
						g = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
						b = 1 - (r+g);
				} else {
						h -= 2/3;
						g = (1-s)/3;
						b = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
						r = 1 - (g+b);
				}
				r = limit$1(i*r*3);
				g = limit$1(i*g*3);
				b = limit$1(i*b*3);
				return [r*255, g*255, b*255, args.length > 3 ? args[3] : 1];
		};

		var hsi2rgb_1 = hsi2rgb;

		var unpack$f = utils.unpack;
		var type$6 = utils.type;






		Color_1.prototype.hsi = function() {
				return rgb2hsi_1(this._rgb);
		};

		chroma_1.hsi = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsi']) ));
		};

		input.format.hsi = hsi2rgb_1;

		input.autodetect.push({
				p: 2,
				test: function () {
						var args = [], len = arguments.length;
						while ( len-- ) args[ len ] = arguments[ len ];

						args = unpack$f(args, 'hsi');
						if (type$6(args) === 'array' && args.length === 3) {
								return 'hsi';
						}
				}
		});

		var unpack$g = utils.unpack;
		var type$7 = utils.type;






		Color_1.prototype.hsl = function() {
				return rgb2hsl_1(this._rgb);
		};

		chroma_1.hsl = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsl']) ));
		};

		input.format.hsl = hsl2rgb_1;

		input.autodetect.push({
				p: 2,
				test: function () {
						var args = [], len = arguments.length;
						while ( len-- ) args[ len ] = arguments[ len ];

						args = unpack$g(args, 'hsl');
						if (type$7(args) === 'array' && args.length === 3) {
								return 'hsl';
						}
				}
		});

		var unpack$h = utils.unpack;
		var min$1 = Math.min;
		var max$1 = Math.max;

		/*
		 * supported arguments:
		 * - rgb2hsv(r,g,b)
		 * - rgb2hsv([r,g,b])
		 * - rgb2hsv({r,g,b})
		 */
		var rgb2hsl$1 = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				args = unpack$h(args, 'rgb');
				var r = args[0];
				var g = args[1];
				var b = args[2];
				var min_ = min$1(r, g, b);
				var max_ = max$1(r, g, b);
				var delta = max_ - min_;
				var h,s,v;
				v = max_ / 255.0;
				if (max_ === 0) {
						h = Number.NaN;
						s = 0;
				} else {
						s = delta / max_;
						if (r === max_) { h = (g - b) / delta; }
						if (g === max_) { h = 2+(b - r) / delta; }
						if (b === max_) { h = 4+(r - g) / delta; }
						h *= 60;
						if (h < 0) { h += 360; }
				}
				return [h, s, v]
		};

		var rgb2hsv = rgb2hsl$1;

		var unpack$i = utils.unpack;
		var floor$1 = Math.floor;

		var hsv2rgb = function () {
				var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];
				args = unpack$i(args, 'hsv');
				var h = args[0];
				var s = args[1];
				var v = args[2];
				var r,g,b;
				v *= 255;
				if (s === 0) {
						r = g = b = v;
				} else {
						if (h === 360) { h = 0; }
						if (h > 360) { h -= 360; }
						if (h < 0) { h += 360; }
						h /= 60;

						var i = floor$1(h);
						var f = h - i;
						var p = v * (1 - s);
						var q = v * (1 - s * f);
						var t = v * (1 - s * (1 - f));

						switch (i) {
								case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
								case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
								case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
								case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
								case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
								case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
						}
				}
				return [r,g,b,args.length > 3?args[3]:1];
		};

		var hsv2rgb_1 = hsv2rgb;

		var unpack$j = utils.unpack;
		var type$8 = utils.type;






		Color_1.prototype.hsv = function() {
				return rgb2hsv(this._rgb);
		};

		chroma_1.hsv = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsv']) ));
		};

		input.format.hsv = hsv2rgb_1;

		input.autodetect.push({
				p: 2,
				test: function () {
						var args = [], len = arguments.length;
						while ( len-- ) args[ len ] = arguments[ len ];

						args = unpack$j(args, 'hsv');
						if (type$8(args) === 'array' && args.length === 3) {
								return 'hsv';
						}
				}
		});

		var labConstants = {
				// Corresponds roughly to RGB brighter/darker
				Kn: 18,

				// D65 standard referent
				Xn: 0.950470,
				Yn: 1,
				Zn: 1.088830,

				t0: 0.137931034,	// 4 / 29
				t1: 0.206896552,	// 6 / 29
				t2: 0.12841855,	 // 3 * t1 * t1
				t3: 0.008856452,	// t1 * t1 * t1
		};

		var unpack$k = utils.unpack;
		var pow = Math.pow;

		var rgb2lab = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var ref = unpack$k(args, 'rgb');
				var r = ref[0];
				var g = ref[1];
				var b = ref[2];
				var ref$1 = rgb2xyz(r,g,b);
				var x = ref$1[0];
				var y = ref$1[1];
				var z = ref$1[2];
				var l = 116 * y - 16;
				return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
		};

		var rgb_xyz = function (r) {
				if ((r /= 255) <= 0.04045) { return r / 12.92; }
				return pow((r + 0.055) / 1.055, 2.4);
		};

		var xyz_lab = function (t) {
				if (t > labConstants.t3) { return pow(t, 1 / 3); }
				return t / labConstants.t2 + labConstants.t0;
		};

		var rgb2xyz = function (r,g,b) {
				r = rgb_xyz(r);
				g = rgb_xyz(g);
				b = rgb_xyz(b);
				var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / labConstants.Xn);
				var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / labConstants.Yn);
				var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / labConstants.Zn);
				return [x,y,z];
		};

		var rgb2lab_1 = rgb2lab;

		var unpack$l = utils.unpack;
		var pow$1 = Math.pow;

		/*
		 * L* [0..100]
		 * a [-100..100]
		 * b [-100..100]
		 */
		var lab2rgb = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				args = unpack$l(args, 'lab');
				var l = args[0];
				var a = args[1];
				var b = args[2];
				var x,y,z, r,g,b_;

				y = (l + 16) / 116;
				x = isNaN(a) ? y : y + a / 500;
				z = isNaN(b) ? y : y - b / 200;

				y = labConstants.Yn * lab_xyz(y);
				x = labConstants.Xn * lab_xyz(x);
				z = labConstants.Zn * lab_xyz(z);

				r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);	// D65 -> sRGB
				g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
				b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

				return [r,g,b_,args.length > 3 ? args[3] : 1];
		};

		var xyz_rgb = function (r) {
				return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$1(r, 1 / 2.4) - 0.055)
		};

		var lab_xyz = function (t) {
				return t > labConstants.t1 ? t * t * t : labConstants.t2 * (t - labConstants.t0)
		};

		var lab2rgb_1 = lab2rgb;

		var unpack$m = utils.unpack;
		var type$9 = utils.type;






		Color_1.prototype.lab = function() {
				return rgb2lab_1(this._rgb);
		};

		chroma_1.lab = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['lab']) ));
		};

		input.format.lab = lab2rgb_1;

		input.autodetect.push({
				p: 2,
				test: function () {
						var args = [], len = arguments.length;
						while ( len-- ) args[ len ] = arguments[ len ];

						args = unpack$m(args, 'lab');
						if (type$9(args) === 'array' && args.length === 3) {
								return 'lab';
						}
				}
		});

		var unpack$n = utils.unpack;
		var RAD2DEG = utils.RAD2DEG;
		var sqrt$1 = Math.sqrt;
		var atan2 = Math.atan2;
		var round$4 = Math.round;

		var lab2lch = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var ref = unpack$n(args, 'lab');
				var l = ref[0];
				var a = ref[1];
				var b = ref[2];
				var c = sqrt$1(a * a + b * b);
				var h = (atan2(b, a) * RAD2DEG + 360) % 360;
				if (round$4(c*10000) === 0) { h = Number.NaN; }
				return [l, c, h];
		};

		var lab2lch_1 = lab2lch;

		var unpack$o = utils.unpack;



		var rgb2lch = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var ref = unpack$o(args, 'rgb');
				var r = ref[0];
				var g = ref[1];
				var b = ref[2];
				var ref$1 = rgb2lab_1(r,g,b);
				var l = ref$1[0];
				var a = ref$1[1];
				var b_ = ref$1[2];
				return lab2lch_1(l,a,b_);
		};

		var rgb2lch_1 = rgb2lch;

		var unpack$p = utils.unpack;
		var DEG2RAD = utils.DEG2RAD;
		var sin = Math.sin;
		var cos$1 = Math.cos;

		var lch2lab = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				/*
				Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
				These formulas were invented by David Dalrymple to obtain maximum contrast without going
				out of gamut if the parameters are in the range 0-1.

				A saturation multiplier was added by Gregor Aisch
				*/
				var ref = unpack$p(args, 'lch');
				var l = ref[0];
				var c = ref[1];
				var h = ref[2];
				if (isNaN(h)) { h = 0; }
				h = h * DEG2RAD;
				return [l, cos$1(h) * c, sin(h) * c]
		};

		var lch2lab_1 = lch2lab;

		var unpack$q = utils.unpack;



		var lch2rgb = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				args = unpack$q(args, 'lch');
				var l = args[0];
				var c = args[1];
				var h = args[2];
				var ref = lch2lab_1 (l,c,h);
				var L = ref[0];
				var a = ref[1];
				var b_ = ref[2];
				var ref$1 = lab2rgb_1 (L,a,b_);
				var r = ref$1[0];
				var g = ref$1[1];
				var b = ref$1[2];
				return [r, g, b, args.length > 3 ? args[3] : 1];
		};

		var lch2rgb_1 = lch2rgb;

		var unpack$r = utils.unpack;


		var hcl2rgb = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var hcl = unpack$r(args, 'hcl').reverse();
				return lch2rgb_1.apply(void 0, hcl);
		};

		var hcl2rgb_1 = hcl2rgb;

		var unpack$s = utils.unpack;
		var type$a = utils.type;






		Color_1.prototype.lch = function() { return rgb2lch_1(this._rgb); };
		Color_1.prototype.hcl = function() { return rgb2lch_1(this._rgb).reverse(); };

		chroma_1.lch = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['lch']) ));
		};
		chroma_1.hcl = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hcl']) ));
		};

		input.format.lch = lch2rgb_1;
		input.format.hcl = hcl2rgb_1;

		['lch','hcl'].forEach(function (m) { return input.autodetect.push({
				p: 2,
				test: function () {
						var args = [], len = arguments.length;
						while ( len-- ) args[ len ] = arguments[ len ];

						args = unpack$s(args, m);
						if (type$a(args) === 'array' && args.length === 3) {
								return m;
						}
				}
		}); });

		/**
			X11 color names

			http://www.w3.org/TR/css3-color/#svg-color
		*/

		var w3cx11 = {
				aliceblue: '#f0f8ff',
				antiquewhite: '#faebd7',
				aqua: '#00ffff',
				aquamarine: '#7fffd4',
				azure: '#f0ffff',
				beige: '#f5f5dc',
				bisque: '#ffe4c4',
				black: '#000000',
				blanchedalmond: '#ffebcd',
				blue: '#0000ff',
				blueviolet: '#8a2be2',
				brown: '#a52a2a',
				burlywood: '#deb887',
				cadetblue: '#5f9ea0',
				chartreuse: '#7fff00',
				chocolate: '#d2691e',
				coral: '#ff7f50',
				cornflower: '#6495ed',
				cornflowerblue: '#6495ed',
				cornsilk: '#fff8dc',
				crimson: '#dc143c',
				cyan: '#00ffff',
				darkblue: '#00008b',
				darkcyan: '#008b8b',
				darkgoldenrod: '#b8860b',
				darkgray: '#a9a9a9',
				darkgreen: '#006400',
				darkgrey: '#a9a9a9',
				darkkhaki: '#bdb76b',
				darkmagenta: '#8b008b',
				darkolivegreen: '#556b2f',
				darkorange: '#ff8c00',
				darkorchid: '#9932cc',
				darkred: '#8b0000',
				darksalmon: '#e9967a',
				darkseagreen: '#8fbc8f',
				darkslateblue: '#483d8b',
				darkslategray: '#2f4f4f',
				darkslategrey: '#2f4f4f',
				darkturquoise: '#00ced1',
				darkviolet: '#9400d3',
				deeppink: '#ff1493',
				deepskyblue: '#00bfff',
				dimgray: '#696969',
				dimgrey: '#696969',
				dodgerblue: '#1e90ff',
				firebrick: '#b22222',
				floralwhite: '#fffaf0',
				forestgreen: '#228b22',
				fuchsia: '#ff00ff',
				gainsboro: '#dcdcdc',
				ghostwhite: '#f8f8ff',
				gold: '#ffd700',
				goldenrod: '#daa520',
				gray: '#808080',
				green: '#008000',
				greenyellow: '#adff2f',
				grey: '#808080',
				honeydew: '#f0fff0',
				hotpink: '#ff69b4',
				indianred: '#cd5c5c',
				indigo: '#4b0082',
				ivory: '#fffff0',
				khaki: '#f0e68c',
				laserlemon: '#ffff54',
				lavender: '#e6e6fa',
				lavenderblush: '#fff0f5',
				lawngreen: '#7cfc00',
				lemonchiffon: '#fffacd',
				lightblue: '#add8e6',
				lightcoral: '#f08080',
				lightcyan: '#e0ffff',
				lightgoldenrod: '#fafad2',
				lightgoldenrodyellow: '#fafad2',
				lightgray: '#d3d3d3',
				lightgreen: '#90ee90',
				lightgrey: '#d3d3d3',
				lightpink: '#ffb6c1',
				lightsalmon: '#ffa07a',
				lightseagreen: '#20b2aa',
				lightskyblue: '#87cefa',
				lightslategray: '#778899',
				lightslategrey: '#778899',
				lightsteelblue: '#b0c4de',
				lightyellow: '#ffffe0',
				lime: '#00ff00',
				limegreen: '#32cd32',
				linen: '#faf0e6',
				magenta: '#ff00ff',
				maroon: '#800000',
				maroon2: '#7f0000',
				maroon3: '#b03060',
				mediumaquamarine: '#66cdaa',
				mediumblue: '#0000cd',
				mediumorchid: '#ba55d3',
				mediumpurple: '#9370db',
				mediumseagreen: '#3cb371',
				mediumslateblue: '#7b68ee',
				mediumspringgreen: '#00fa9a',
				mediumturquoise: '#48d1cc',
				mediumvioletred: '#c71585',
				midnightblue: '#191970',
				mintcream: '#f5fffa',
				mistyrose: '#ffe4e1',
				moccasin: '#ffe4b5',
				navajowhite: '#ffdead',
				navy: '#000080',
				oldlace: '#fdf5e6',
				olive: '#808000',
				olivedrab: '#6b8e23',
				orange: '#ffa500',
				orangered: '#ff4500',
				orchid: '#da70d6',
				palegoldenrod: '#eee8aa',
				palegreen: '#98fb98',
				paleturquoise: '#afeeee',
				palevioletred: '#db7093',
				papayawhip: '#ffefd5',
				peachpuff: '#ffdab9',
				peru: '#cd853f',
				pink: '#ffc0cb',
				plum: '#dda0dd',
				powderblue: '#b0e0e6',
				purple: '#800080',
				purple2: '#7f007f',
				purple3: '#a020f0',
				rebeccapurple: '#663399',
				red: '#ff0000',
				rosybrown: '#bc8f8f',
				royalblue: '#4169e1',
				saddlebrown: '#8b4513',
				salmon: '#fa8072',
				sandybrown: '#f4a460',
				seagreen: '#2e8b57',
				seashell: '#fff5ee',
				sienna: '#a0522d',
				silver: '#c0c0c0',
				skyblue: '#87ceeb',
				slateblue: '#6a5acd',
				slategray: '#708090',
				slategrey: '#708090',
				snow: '#fffafa',
				springgreen: '#00ff7f',
				steelblue: '#4682b4',
				tan: '#d2b48c',
				teal: '#008080',
				thistle: '#d8bfd8',
				tomato: '#ff6347',
				turquoise: '#40e0d0',
				violet: '#ee82ee',
				wheat: '#f5deb3',
				white: '#ffffff',
				whitesmoke: '#f5f5f5',
				yellow: '#ffff00',
				yellowgreen: '#9acd32'
		};

		var w3cx11_1 = w3cx11;

		var type$b = utils.type;





		Color_1.prototype.name = function() {
				var hex = rgb2hex_1(this._rgb, 'rgb');
				for (var i = 0, list = Object.keys(w3cx11_1); i < list.length; i += 1) {
						var n = list[i];

						if (w3cx11_1[n] === hex) { return n.toLowerCase(); }
				}
				return hex;
		};

		input.format.named = function (name) {
				name = name.toLowerCase();
				if (w3cx11_1[name]) { return hex2rgb_1(w3cx11_1[name]); }
				throw new Error('unknown color name: '+name);
		};

		input.autodetect.push({
				p: 5,
				test: function (h) {
						var rest = [], len = arguments.length - 1;
						while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

						if (!rest.length && type$b(h) === 'string' && w3cx11_1[h.toLowerCase()]) {
								return 'named';
						}
				}
		});

		var unpack$t = utils.unpack;

		var rgb2num = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var ref = unpack$t(args, 'rgb');
				var r = ref[0];
				var g = ref[1];
				var b = ref[2];
				return (r << 16) + (g << 8) + b;
		};

		var rgb2num_1 = rgb2num;

		var type$c = utils.type;

		var num2rgb = function (num) {
				if (type$c(num) == "number" && num >= 0 && num <= 0xFFFFFF) {
						var r = num >> 16;
						var g = (num >> 8) & 0xFF;
						var b = num & 0xFF;
						return [r,g,b,1];
				}
				throw new Error("unknown num color: "+num);
		};

		var num2rgb_1 = num2rgb;

		var type$d = utils.type;



		Color_1.prototype.num = function() {
				return rgb2num_1(this._rgb);
		};

		chroma_1.num = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['num']) ));
		};

		input.format.num = num2rgb_1;

		input.autodetect.push({
				p: 5,
				test: function () {
						var args = [], len = arguments.length;
						while ( len-- ) args[ len ] = arguments[ len ];

						if (args.length === 1 && type$d(args[0]) === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF) {
								return 'num';
						}
				}
		});

		var unpack$u = utils.unpack;
		var type$e = utils.type;
		var round$5 = Math.round;

		Color_1.prototype.rgb = function(rnd) {
				if ( rnd === void 0 ) rnd=true;

				if (rnd === false) { return this._rgb.slice(0,3); }
				return this._rgb.slice(0,3).map(round$5);
		};

		Color_1.prototype.rgba = function(rnd) {
				if ( rnd === void 0 ) rnd=true;

				return this._rgb.slice(0,4).map(function (v,i) {
						return i<3 ? (rnd === false ? v : round$5(v)) : v;
				});
		};

		chroma_1.rgb = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['rgb']) ));
		};

		input.format.rgb = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var rgba = unpack$u(args, 'rgba');
				if (rgba[3] === undefined) { rgba[3] = 1; }
				return rgba;
		};

		input.autodetect.push({
				p: 3,
				test: function () {
						var args = [], len = arguments.length;
						while ( len-- ) args[ len ] = arguments[ len ];

						args = unpack$u(args, 'rgba');
						if (type$e(args) === 'array' && (args.length === 3 ||
								args.length === 4 && type$e(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
								return 'rgb';
						}
				}
		});

		/*
		 * Based on implementation by Neil Bartlett
		 * https://github.com/neilbartlett/color-temperature
		 */

		var log = Math.log;

		var temperature2rgb = function (kelvin) {
				var temp = kelvin / 100;
				var r,g,b;
				if (temp < 66) {
						r = 255;
						g = -155.25485562709179 - 0.44596950469579133 * (g = temp-2) + 104.49216199393888 * log(g);
						b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp-10) + 115.67994401066147 * log(b);
				} else {
						r = 351.97690566805693 + 0.114206453784165 * (r = temp-55) - 40.25366309332127 * log(r);
						g = 325.4494125711974 + 0.07943456536662342 * (g = temp-50) - 28.0852963507957 * log(g);
						b = 255;
				}
				return [r,g,b,1];
		};

		var temperature2rgb_1 = temperature2rgb;

		/*
		 * Based on implementation by Neil Bartlett
		 * https://github.com/neilbartlett/color-temperature
		 **/


		var unpack$v = utils.unpack;
		var round$6 = Math.round;

		var rgb2temperature = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				var rgb = unpack$v(args, 'rgb');
				var r = rgb[0], b = rgb[2];
				var minTemp = 1000;
				var maxTemp = 40000;
				var eps = 0.4;
				var temp;
				while (maxTemp - minTemp > eps) {
						temp = (maxTemp + minTemp) * 0.5;
						var rgb$1 = temperature2rgb_1(temp);
						if ((rgb$1[2] / rgb$1[0]) >= (b / r)) {
								maxTemp = temp;
						} else {
								minTemp = temp;
						}
				}
				return round$6(temp);
		};

		var rgb2temperature_1 = rgb2temperature;

		Color_1.prototype.temp =
		Color_1.prototype.kelvin =
		Color_1.prototype.temperature = function() {
				return rgb2temperature_1(this._rgb);
		};

		chroma_1.temp =
		chroma_1.kelvin =
		chroma_1.temperature = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['temp']) ));
		};

		input.format.temp =
		input.format.kelvin =
		input.format.temperature = temperature2rgb_1;

		var type$f = utils.type;

		Color_1.prototype.alpha = function(a, mutate) {
				if ( mutate === void 0 ) mutate=false;

				if (a !== undefined && type$f(a) === 'number') {
						if (mutate) {
								this._rgb[3] = a;
								return this;
						}
						return new Color_1([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
				}
				return this._rgb[3];
		};

		Color_1.prototype.clipped = function() {
				return this._rgb._clipped || false;
		};

		Color_1.prototype.darken = function(amount) {
			if ( amount === void 0 ) amount=1;

			var me = this;
			var lab = me.lab();
			lab[0] -= labConstants.Kn * amount;
			return new Color_1(lab, 'lab').alpha(me.alpha(), true);
		};

		Color_1.prototype.brighten = function(amount) {
			if ( amount === void 0 ) amount=1;

			return this.darken(-amount);
		};

		Color_1.prototype.darker = Color_1.prototype.darken;
		Color_1.prototype.brighter = Color_1.prototype.brighten;

		Color_1.prototype.get = function(mc) {
				var ref = mc.split('.');
				var mode = ref[0];
				var channel = ref[1];
				var src = this[mode]();
				if (channel) {
						var i = mode.indexOf(channel);
						if (i > -1) { return src[i]; }
						throw new Error(("unknown channel " + channel + " in mode " + mode));
				} else {
						return src;
				}
		};

		var type$g = utils.type;
		var pow$2 = Math.pow;

		var EPS = 1e-7;
		var MAX_ITER = 20;

		Color_1.prototype.luminance = function(lum) {
				if (lum !== undefined && type$g(lum) === 'number') {
						if (lum === 0) {
								// return pure black
								return new Color_1([0,0,0,this._rgb[3]], 'rgb');
						}
						if (lum === 1) {
								// return pure white
								return new Color_1([255,255,255,this._rgb[3]], 'rgb');
						}
						// compute new color using...
						var cur_lum = this.luminance();
						var mode = 'rgb';
						var max_iter = MAX_ITER;

						var test = function (low, high) {
								var mid = low.interpolate(high, 0.5, mode);
								var lm = mid.luminance();
								if (Math.abs(lum - lm) < EPS || !max_iter--) {
										// close enough
										return mid;
								}
								return lm > lum ? test(low, mid) : test(mid, high);
						};

						var rgb = (cur_lum > lum ? test(new Color_1([0,0,0]), this) : test(this, new Color_1([255,255,255]))).rgb();
						return new Color_1(rgb.concat( [this._rgb[3]]));
				}
				return rgb2luminance.apply(void 0, (this._rgb).slice(0,3));
		};


		var rgb2luminance = function (r,g,b) {
				// relative luminance
				// see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
				r = luminance_x(r);
				g = luminance_x(g);
				b = luminance_x(b);
				return 0.2126 * r + 0.7152 * g + 0.0722 * b;
		};

		var luminance_x = function (x) {
				x /= 255;
				return x <= 0.03928 ? x/12.92 : pow$2((x+0.055)/1.055, 2.4);
		};

		var interpolator = {};

		var type$h = utils.type;


		var mix = function (col1, col2, f) {
				if ( f === void 0 ) f=0.5;
				var rest = [], len = arguments.length - 3;
				while ( len-- > 0 ) rest[ len ] = arguments[ len + 3 ];

				var mode = rest[0] || 'lrgb';
				if (!interpolator[mode] && !rest.length) {
						// fall back to the first supported mode
						mode = Object.keys(interpolator)[0];
				}
				if (!interpolator[mode]) {
						throw new Error(("interpolation mode " + mode + " is not defined"));
				}
				if (type$h(col1) !== 'object') { col1 = new Color_1(col1); }
				if (type$h(col2) !== 'object') { col2 = new Color_1(col2); }
				return interpolator[mode](col1, col2, f)
						.alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
		};

		Color_1.prototype.mix =
		Color_1.prototype.interpolate = function(col2, f) {
			if ( f === void 0 ) f=0.5;
			var rest = [], len = arguments.length - 2;
			while ( len-- > 0 ) rest[ len ] = arguments[ len + 2 ];

			return mix.apply(void 0, [ this, col2, f ].concat( rest ));
		};

		Color_1.prototype.premultiply = function(mutate) {
			if ( mutate === void 0 ) mutate=false;

			var rgb = this._rgb;
			var a = rgb[3];
			if (mutate) {
				this._rgb = [rgb[0]*a, rgb[1]*a, rgb[2]*a, a];
				return this;
			} else {
				return new Color_1([rgb[0]*a, rgb[1]*a, rgb[2]*a, a], 'rgb');
			}
		};

		Color_1.prototype.saturate = function(amount) {
			if ( amount === void 0 ) amount=1;

			var me = this;
			var lch = me.lch();
			lch[1] += labConstants.Kn * amount;
			if (lch[1] < 0) { lch[1] = 0; }
			return new Color_1(lch, 'lch').alpha(me.alpha(), true);
		};

		Color_1.prototype.desaturate = function(amount) {
			if ( amount === void 0 ) amount=1;

			return this.saturate(-amount);
		};

		var type$i = utils.type;

		Color_1.prototype.set = function(mc, value, mutate) {
				if ( mutate === void 0 ) mutate=false;

				var ref = mc.split('.');
				var mode = ref[0];
				var channel = ref[1];
				var src = this[mode]();
				if (channel) {
						var i = mode.indexOf(channel);
						if (i > -1) {
								if (type$i(value) == 'string') {
										switch(value.charAt(0)) {
												case '+': src[i] += +value; break;
												case '-': src[i] += +value; break;
												case '*': src[i] *= +(value.substr(1)); break;
												case '/': src[i] /= +(value.substr(1)); break;
												default: src[i] = +value;
										}
								} else if (type$i(value) === 'number') {
										src[i] = value;
								} else {
										throw new Error("unsupported value for Color.set");
								}
								var out = new Color_1(src, mode);
								if (mutate) {
										this._rgb = out._rgb;
										return this;
								}
								return out;
						}
						throw new Error(("unknown channel " + channel + " in mode " + mode));
				} else {
						return src;
				}
		};

		var rgb$1 = function (col1, col2, f) {
				var xyz0 = col1._rgb;
				var xyz1 = col2._rgb;
				return new Color_1(
						xyz0[0] + f * (xyz1[0]-xyz0[0]),
						xyz0[1] + f * (xyz1[1]-xyz0[1]),
						xyz0[2] + f * (xyz1[2]-xyz0[2]),
						'rgb'
				)
		};

		// register interpolator
		interpolator.rgb = rgb$1;

		var sqrt$2 = Math.sqrt;
		var pow$3 = Math.pow;

		var lrgb = function (col1, col2, f) {
				var ref = col1._rgb;
				var x1 = ref[0];
				var y1 = ref[1];
				var z1 = ref[2];
				var ref$1 = col2._rgb;
				var x2 = ref$1[0];
				var y2 = ref$1[1];
				var z2 = ref$1[2];
				return new Color_1(
						sqrt$2(pow$3(x1,2) * (1-f) + pow$3(x2,2) * f),
						sqrt$2(pow$3(y1,2) * (1-f) + pow$3(y2,2) * f),
						sqrt$2(pow$3(z1,2) * (1-f) + pow$3(z2,2) * f),
						'rgb'
				)
		};

		// register interpolator
		interpolator.lrgb = lrgb;

		var lab$1 = function (col1, col2, f) {
				var xyz0 = col1.lab();
				var xyz1 = col2.lab();
				return new Color_1(
						xyz0[0] + f * (xyz1[0]-xyz0[0]),
						xyz0[1] + f * (xyz1[1]-xyz0[1]),
						xyz0[2] + f * (xyz1[2]-xyz0[2]),
						'lab'
				)
		};

		// register interpolator
		interpolator.lab = lab$1;

		var _hsx = function (col1, col2, f, m) {
				var assign, assign$1;

				var xyz0, xyz1;
				if (m === 'hsl') {
						xyz0 = col1.hsl();
						xyz1 = col2.hsl();
				} else if (m === 'hsv') {
						xyz0 = col1.hsv();
						xyz1 = col2.hsv();
				} else if (m === 'hcg') {
						xyz0 = col1.hcg();
						xyz1 = col2.hcg();
				} else if (m === 'hsi') {
						xyz0 = col1.hsi();
						xyz1 = col2.hsi();
				} else if (m === 'lch' || m === 'hcl') {
						m = 'hcl';
						xyz0 = col1.hcl();
						xyz1 = col2.hcl();
				}

				var hue0, hue1, sat0, sat1, lbv0, lbv1;
				if (m.substr(0, 1) === 'h') {
						(assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2]);
						(assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2]);
				}

				var sat, hue, lbv, dh;

				if (!isNaN(hue0) && !isNaN(hue1)) {
						// both colors have hue
						if (hue1 > hue0 && hue1 - hue0 > 180) {
								dh = hue1-(hue0+360);
						} else if (hue1 < hue0 && hue0 - hue1 > 180) {
								dh = hue1+360-hue0;
						} else{
								dh = hue1 - hue0;
						}
						hue = hue0 + f * dh;
				} else if (!isNaN(hue0)) {
						hue = hue0;
						if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') { sat = sat0; }
				} else if (!isNaN(hue1)) {
						hue = hue1;
						if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') { sat = sat1; }
				} else {
						hue = Number.NaN;
				}

				if (sat === undefined) { sat = sat0 + f * (sat1 - sat0); }
				lbv = lbv0 + f * (lbv1-lbv0);
				return new Color_1([hue, sat, lbv], m);
		};

		var lch$1 = function (col1, col2, f) {
			return _hsx(col1, col2, f, 'lch');
		};

		// register interpolator
		interpolator.lch = lch$1;
		interpolator.hcl = lch$1;

		var num$1 = function (col1, col2, f) {
				var c1 = col1.num();
				var c2 = col2.num();
				return new Color_1(c1 + f * (c2-c1), 'num')
		};

		// register interpolator
		interpolator.num = num$1;

		var hcg$1 = function (col1, col2, f) {
			return _hsx(col1, col2, f, 'hcg');
		};

		// register interpolator
		interpolator.hcg = hcg$1;

		var hsi$1 = function (col1, col2, f) {
			return _hsx(col1, col2, f, 'hsi');
		};

		// register interpolator
		interpolator.hsi = hsi$1;

		var hsl$1 = function (col1, col2, f) {
			return _hsx(col1, col2, f, 'hsl');
		};

		// register interpolator
		interpolator.hsl = hsl$1;

		var hsv$1 = function (col1, col2, f) {
			return _hsx(col1, col2, f, 'hsv');
		};

		// register interpolator
		interpolator.hsv = hsv$1;

		var clip_rgb$2 = utils.clip_rgb;
		var pow$4 = Math.pow;
		var sqrt$3 = Math.sqrt;
		var PI$1 = Math.PI;
		var cos$2 = Math.cos;
		var sin$1 = Math.sin;
		var atan2$1 = Math.atan2;

		var average = function (colors, mode, weights) {
				if ( mode === void 0 ) mode='lrgb';
				if ( weights === void 0 ) weights=null;

				var l = colors.length;
				if (!weights) { weights = Array.from(new Array(l)).map(function () { return 1; }); }
				// normalize weights
				var k = l / weights.reduce(function(a, b) { return a + b; });
				weights.forEach(function (w,i) { weights[i] *= k; });
				// convert colors to Color objects
				colors = colors.map(function (c) { return new Color_1(c); });
				if (mode === 'lrgb') {
						return _average_lrgb(colors, weights)
				}
				var first = colors.shift();
				var xyz = first.get(mode);
				var cnt = [];
				var dx = 0;
				var dy = 0;
				// initial color
				for (var i=0; i<xyz.length; i++) {
						xyz[i] = (xyz[i] || 0) * weights[0];
						cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
						if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
								var A = xyz[i] / 180 * PI$1;
								dx += cos$2(A) * weights[0];
								dy += sin$1(A) * weights[0];
						}
				}

				var alpha = first.alpha() * weights[0];
				colors.forEach(function (c,ci) {
						var xyz2 = c.get(mode);
						alpha += c.alpha() * weights[ci+1];
						for (var i=0; i<xyz.length; i++) {
								if (!isNaN(xyz2[i])) {
										cnt[i] += weights[ci+1];
										if (mode.charAt(i) === 'h') {
												var A = xyz2[i] / 180 * PI$1;
												dx += cos$2(A) * weights[ci+1];
												dy += sin$1(A) * weights[ci+1];
										} else {
												xyz[i] += xyz2[i] * weights[ci+1];
										}
								}
						}
				});

				for (var i$1=0; i$1<xyz.length; i$1++) {
						if (mode.charAt(i$1) === 'h') {
								var A$1 = atan2$1(dy / cnt[i$1], dx / cnt[i$1]) / PI$1 * 180;
								while (A$1 < 0) { A$1 += 360; }
								while (A$1 >= 360) { A$1 -= 360; }
								xyz[i$1] = A$1;
						} else {
								xyz[i$1] = xyz[i$1]/cnt[i$1];
						}
				}
				alpha /= l;
				return (new Color_1(xyz, mode)).alpha(alpha > 0.99999 ? 1 : alpha, true);
		};


		var _average_lrgb = function (colors, weights) {
				var l = colors.length;
				var xyz = [0,0,0,0];
				for (var i=0; i < colors.length; i++) {
						var col = colors[i];
						var f = weights[i] / l;
						var rgb = col._rgb;
						xyz[0] += pow$4(rgb[0],2) * f;
						xyz[1] += pow$4(rgb[1],2) * f;
						xyz[2] += pow$4(rgb[2],2) * f;
						xyz[3] += rgb[3] * f;
				}
				xyz[0] = sqrt$3(xyz[0]);
				xyz[1] = sqrt$3(xyz[1]);
				xyz[2] = sqrt$3(xyz[2]);
				if (xyz[3] > 0.9999999) { xyz[3] = 1; }
				return new Color_1(clip_rgb$2(xyz));
		};

		// minimal multi-purpose interface

		// @requires utils color analyze


		var type$j = utils.type;

		var pow$5 = Math.pow;

		var scale = function(colors) {

				// constructor
				var _mode = 'rgb';
				var _nacol = chroma_1('#ccc');
				var _spread = 0;
				// const _fixed = false;
				var _domain = [0, 1];
				var _pos = [];
				var _padding = [0,0];
				var _classes = false;
				var _colors = [];
				var _out = false;
				var _min = 0;
				var _max = 1;
				var _correctLightness = false;
				var _colorCache = {};
				var _useCache = true;
				var _gamma = 1;

				// private methods

				var setColors = function(colors) {
						colors = colors || ['#fff', '#000'];
						if (colors && type$j(colors) === 'string' && chroma_1.brewer &&
								chroma_1.brewer[colors.toLowerCase()]) {
								colors = chroma_1.brewer[colors.toLowerCase()];
						}
						if (type$j(colors) === 'array') {
								// handle single color
								if (colors.length === 1) {
										colors = [colors[0], colors[0]];
								}
								// make a copy of the colors
								colors = colors.slice(0);
								// convert to chroma classes
								for (var c=0; c<colors.length; c++) {
										colors[c] = chroma_1(colors[c]);
								}
								// auto-fill color position
								_pos.length = 0;
								for (var c$1=0; c$1<colors.length; c$1++) {
										_pos.push(c$1/(colors.length-1));
								}
						}
						resetCache();
						return _colors = colors;
				};

				var getClass = function(value) {
						if (_classes != null) {
								var n = _classes.length-1;
								var i = 0;
								while (i < n && value >= _classes[i]) {
										i++;
								}
								return i-1;
						}
						return 0;
				};

				var tMapLightness = function (t) { return t; };
				var tMapDomain = function (t) { return t; };

				// const classifyValue = function(value) {
				//		 let val = value;
				//		 if (_classes.length > 2) {
				//				 const n = _classes.length-1;
				//				 const i = getClass(value);
				//				 const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));	// center of 1st class
				//				 const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));	// center of last class
				//				 val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
				//		 }
				//		 return val;
				// };

				var getColor = function(val, bypassMap) {
						var col, t;
						if (bypassMap == null) { bypassMap = false; }
						if (isNaN(val) || (val === null)) { return _nacol; }
						if (!bypassMap) {
								if (_classes && (_classes.length > 2)) {
										// find the class
										var c = getClass(val);
										t = c / (_classes.length-2);
								} else if (_max !== _min) {
										// just interpolate between min/max
										t = (val - _min) / (_max - _min);
								} else {
										t = 1;
								}
						} else {
								t = val;
						}

						// domain map
						t = tMapDomain(t);

						if (!bypassMap) {
								t = tMapLightness(t);	// lightness correction
						}

						if (_gamma !== 1) { t = pow$5(t, _gamma); }

						t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));

						t = Math.min(1, Math.max(0, t));

						var k = Math.floor(t * 10000);

						if (_useCache && _colorCache[k]) {
								col = _colorCache[k];
						} else {
								if (type$j(_colors) === 'array') {
										//for i in [0.._pos.length-1]
										for (var i=0; i<_pos.length; i++) {
												var p = _pos[i];
												if (t <= p) {
														col = _colors[i];
														break;
												}
												if ((t >= p) && (i === (_pos.length-1))) {
														col = _colors[i];
														break;
												}
												if (t > p && t < _pos[i+1]) {
														t = (t-p)/(_pos[i+1]-p);
														col = chroma_1.interpolate(_colors[i], _colors[i+1], t, _mode);
														break;
												}
										}
								} else if (type$j(_colors) === 'function') {
										col = _colors(t);
								}
								if (_useCache) { _colorCache[k] = col; }
						}
						return col;
				};

				var resetCache = function () { return _colorCache = {}; };

				setColors(colors);

				// public interface

				var f = function(v) {
						var c = chroma_1(getColor(v));
						if (_out && c[_out]) { return c[_out](); } else { return c; }
				};

				f.classes = function(classes) {
						if (classes != null) {
								if (type$j(classes) === 'array') {
										_classes = classes;
										_domain = [classes[0], classes[classes.length-1]];
								} else {
										var d = chroma_1.analyze(_domain);
										if (classes === 0) {
												_classes = [d.min, d.max];
										} else {
												_classes = chroma_1.limits(d, 'e', classes);
										}
								}
								return f;
						}
						return _classes;
				};


				f.domain = function(domain) {
						if (!arguments.length) {
								return _domain;
						}
						_min = domain[0];
						_max = domain[domain.length-1];
						_pos = [];
						var k = _colors.length;
						if ((domain.length === k) && (_min !== _max)) {
								// update positions
								for (var i = 0, list = Array.from(domain); i < list.length; i += 1) {
										var d = list[i];

									_pos.push((d-_min) / (_max-_min));
								}
						} else {
								for (var c=0; c<k; c++) {
										_pos.push(c/(k-1));
								}
								if (domain.length > 2) {
										// set domain map
										var tOut = domain.map(function (d,i) { return i/(domain.length-1); });
										var tBreaks = domain.map(function (d) { return (d - _min) / (_max - _min); });
										if (!tBreaks.every(function (val, i) { return tOut[i] === val; })) {
												tMapDomain = function (t) {
														if (t <= 0 || t >= 1) { return t; }
														var i = 0;
														while (t >= tBreaks[i+1]) { i++; }
														var f = (t - tBreaks[i]) / (tBreaks[i+1] - tBreaks[i]);
														var out = tOut[i] + f * (tOut[i+1] - tOut[i]);
														return out;
												};
										}

								}
						}
						_domain = [_min, _max];
						return f;
				};

				f.mode = function(_m) {
						if (!arguments.length) {
								return _mode;
						}
						_mode = _m;
						resetCache();
						return f;
				};

				f.range = function(colors, _pos) {
						setColors(colors, _pos);
						return f;
				};

				f.out = function(_o) {
						_out = _o;
						return f;
				};

				f.spread = function(val) {
						if (!arguments.length) {
								return _spread;
						}
						_spread = val;
						return f;
				};

				f.correctLightness = function(v) {
						if (v == null) { v = true; }
						_correctLightness = v;
						resetCache();
						if (_correctLightness) {
								tMapLightness = function(t) {
										var L0 = getColor(0, true).lab()[0];
										var L1 = getColor(1, true).lab()[0];
										var pol = L0 > L1;
										var L_actual = getColor(t, true).lab()[0];
										var L_ideal = L0 + ((L1 - L0) * t);
										var L_diff = L_actual - L_ideal;
										var t0 = 0;
										var t1 = 1;
										var max_iter = 20;
										while ((Math.abs(L_diff) > 1e-2) && (max_iter-- > 0)) {
												(function() {
														if (pol) { L_diff *= -1; }
														if (L_diff < 0) {
																t0 = t;
																t += (t1 - t) * 0.5;
														} else {
																t1 = t;
																t += (t0 - t) * 0.5;
														}
														L_actual = getColor(t, true).lab()[0];
														return L_diff = L_actual - L_ideal;
												})();
										}
										return t;
								};
						} else {
								tMapLightness = function (t) { return t; };
						}
						return f;
				};

				f.padding = function(p) {
						if (p != null) {
								if (type$j(p) === 'number') {
										p = [p,p];
								}
								_padding = p;
								return f;
						} else {
								return _padding;
						}
				};

				f.colors = function(numColors, out) {
						// If no arguments are given, return the original colors that were provided
						if (arguments.length < 2) { out = 'hex'; }
						var result = [];

						if (arguments.length === 0) {
								result = _colors.slice(0);

						} else if (numColors === 1) {
								result = [f(0.5)];

						} else if (numColors > 1) {
								var dm = _domain[0];
								var dd = _domain[1] - dm;
								result = __range__(0, numColors, false).map(function (i) { return f( dm + ((i/(numColors-1)) * dd) ); });

						} else { // returns all colors based on the defined classes
								colors = [];
								var samples = [];
								if (_classes && (_classes.length > 2)) {
										for (var i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
												samples.push((_classes[i-1]+_classes[i])*0.5);
										}
								} else {
										samples = _domain;
								}
								result = samples.map(function (v) { return f(v); });
						}

						if (chroma_1[out]) {
								result = result.map(function (c) { return c[out](); });
						}
						return result;
				};

				f.cache = function(c) {
						if (c != null) {
								_useCache = c;
								return f;
						} else {
								return _useCache;
						}
				};

				f.gamma = function(g) {
						if (g != null) {
								_gamma = g;
								return f;
						} else {
								return _gamma;
						}
				};

				f.nodata = function(d) {
						if (d != null) {
								_nacol = chroma_1(d);
								return f;
						} else {
								return _nacol;
						}
				};

				return f;
		};

		function __range__(left, right, inclusive) {
			var range = [];
			var ascending = left < right;
			var end = !inclusive ? right : ascending ? right + 1 : right - 1;
			for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
				range.push(i);
			}
			return range;
		}

		//
		// interpolates between a set of colors uzing a bezier spline
		//

		// @requires utils lab




		var bezier = function(colors) {
				var assign, assign$1, assign$2;

				var I, lab0, lab1, lab2;
				colors = colors.map(function (c) { return new Color_1(c); });
				if (colors.length === 2) {
						// linear interpolation
						(assign = colors.map(function (c) { return c.lab(); }), lab0 = assign[0], lab1 = assign[1]);
						I = function(t) {
								var lab = ([0, 1, 2].map(function (i) { return lab0[i] + (t * (lab1[i] - lab0[i])); }));
								return new Color_1(lab, 'lab');
						};
				} else if (colors.length === 3) {
						// quadratic bezier interpolation
						(assign$1 = colors.map(function (c) { return c.lab(); }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2]);
						I = function(t) {
								var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t) * lab0[i]) + (2 * (1-t) * t * lab1[i]) + (t * t * lab2[i]); }));
								return new Color_1(lab, 'lab');
						};
				} else if (colors.length === 4) {
						// cubic bezier interpolation
						var lab3;
						(assign$2 = colors.map(function (c) { return c.lab(); }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3]);
						I = function(t) {
								var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t)*(1-t) * lab0[i]) + (3 * (1-t) * (1-t) * t * lab1[i]) + (3 * (1-t) * t * t * lab2[i]) + (t*t*t * lab3[i]); }));
								return new Color_1(lab, 'lab');
						};
				} else if (colors.length === 5) {
						var I0 = bezier(colors.slice(0, 3));
						var I1 = bezier(colors.slice(2, 5));
						I = function(t) {
								if (t < 0.5) {
										return I0(t*2);
								} else {
										return I1((t-0.5)*2);
								}
						};
				}
				return I;
		};

		var bezier_1 = function (colors) {
				var f = bezier(colors);
				f.scale = function () { return scale(f); };
				return f;
		};

		/*
		 * interpolates between a set of colors uzing a bezier spline
		 * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
		 */




		var blend = function (bottom, top, mode) {
				if (!blend[mode]) {
						throw new Error('unknown blend mode ' + mode);
				}
				return blend[mode](bottom, top);
		};

		var blend_f = function (f) { return function (bottom,top) {
						var c0 = chroma_1(top).rgb();
						var c1 = chroma_1(bottom).rgb();
						return chroma_1.rgb(f(c0, c1));
				}; };

		var each = function (f) { return function (c0, c1) {
						var out = [];
						out[0] = f(c0[0], c1[0]);
						out[1] = f(c0[1], c1[1]);
						out[2] = f(c0[2], c1[2]);
						return out;
				}; };

		var normal = function (a) { return a; };
		var multiply = function (a,b) { return a * b / 255; };
		var darken$1 = function (a,b) { return a > b ? b : a; };
		var lighten = function (a,b) { return a > b ? a : b; };
		var screen = function (a,b) { return 255 * (1 - (1-a/255) * (1-b/255)); };
		var overlay = function (a,b) { return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255 ) * ( 1 - b / 255 )); };
		var burn = function (a,b) { return 255 * (1 - (1 - b / 255) / (a/255)); };
		var dodge = function (a,b) {
				if (a === 255) { return 255; }
				a = 255 * (b / 255) / (1 - a / 255);
				return a > 255 ? 255 : a
		};

		// # add = (a,b) ->
		// #		 if (a + b > 255) then 255 else a + b

		blend.normal = blend_f(each(normal));
		blend.multiply = blend_f(each(multiply));
		blend.screen = blend_f(each(screen));
		blend.overlay = blend_f(each(overlay));
		blend.darken = blend_f(each(darken$1));
		blend.lighten = blend_f(each(lighten));
		blend.dodge = blend_f(each(dodge));
		blend.burn = blend_f(each(burn));
		// blend.add = blend_f(each(add));

		var blend_1 = blend;

		// cubehelix interpolation
		// based on D.A. Green "A colour scheme for the display of astronomical intensity images"
		// http://astron-soc.in/bulletin/11June/289392011.pdf

		var type$k = utils.type;
		var clip_rgb$3 = utils.clip_rgb;
		var TWOPI$2 = utils.TWOPI;
		var pow$6 = Math.pow;
		var sin$2 = Math.sin;
		var cos$3 = Math.cos;


		var cubehelix = function(start, rotations, hue, gamma, lightness) {
				if ( start === void 0 ) start=300;
				if ( rotations === void 0 ) rotations=-1.5;
				if ( hue === void 0 ) hue=1;
				if ( gamma === void 0 ) gamma=1;
				if ( lightness === void 0 ) lightness=[0,1];

				var dh = 0, dl;
				if (type$k(lightness) === 'array') {
						dl = lightness[1] - lightness[0];
				} else {
						dl = 0;
						lightness = [lightness, lightness];
				}

				var f = function(fract) {
						var a = TWOPI$2 * (((start+120)/360) + (rotations * fract));
						var l = pow$6(lightness[0] + (dl * fract), gamma);
						var h = dh !== 0 ? hue[0] + (fract * dh) : hue;
						var amp = (h * l * (1-l)) / 2;
						var cos_a = cos$3(a);
						var sin_a = sin$2(a);
						var r = l + (amp * ((-0.14861 * cos_a) + (1.78277* sin_a)));
						var g = l + (amp * ((-0.29227 * cos_a) - (0.90649* sin_a)));
						var b = l + (amp * (+1.97294 * cos_a));
						return chroma_1(clip_rgb$3([r*255,g*255,b*255,1]));
				};

				f.start = function(s) {
						if ((s == null)) { return start; }
						start = s;
						return f;
				};

				f.rotations = function(r) {
						if ((r == null)) { return rotations; }
						rotations = r;
						return f;
				};

				f.gamma = function(g) {
						if ((g == null)) { return gamma; }
						gamma = g;
						return f;
				};

				f.hue = function(h) {
						if ((h == null)) { return hue; }
						hue = h;
						if (type$k(hue) === 'array') {
								dh = hue[1] - hue[0];
								if (dh === 0) { hue = hue[1]; }
						} else {
								dh = 0;
						}
						return f;
				};

				f.lightness = function(h) {
						if ((h == null)) { return lightness; }
						if (type$k(h) === 'array') {
								lightness = h;
								dl = h[1] - h[0];
						} else {
								lightness = [h,h];
								dl = 0;
						}
						return f;
				};

				f.scale = function () { return chroma_1.scale(f); };

				f.hue(hue);

				return f;
		};

		var digits = '0123456789abcdef';

		var floor$2 = Math.floor;
		var random = Math.random;

		var random_1 = function () {
				var code = '#';
				for (var i=0; i<6; i++) {
						code += digits.charAt(floor$2(random() * 16));
				}
				return new Color_1(code, 'hex');
		};

		var log$1 = Math.log;
		var pow$7 = Math.pow;
		var floor$3 = Math.floor;
		var abs = Math.abs;


		var analyze = function (data, key) {
				if ( key === void 0 ) key=null;

				var r = {
						min: Number.MAX_VALUE,
						max: Number.MAX_VALUE*-1,
						sum: 0,
						values: [],
						count: 0
				};
				if (type(data) === 'object') {
						data = Object.values(data);
				}
				data.forEach(function (val) {
						if (key && type(val) === 'object') { val = val[key]; }
						if (val !== undefined && val !== null && !isNaN(val)) {
								r.values.push(val);
								r.sum += val;
								if (val < r.min) { r.min = val; }
								if (val > r.max) { r.max = val; }
								r.count += 1;
						}
				});

				r.domain = [r.min, r.max];

				r.limits = function (mode, num) { return limits(r, mode, num); };

				return r;
		};


		var limits = function (data, mode, num) {
				if ( mode === void 0 ) mode='equal';
				if ( num === void 0 ) num=7;

				if (type(data) == 'array') {
						data = analyze(data);
				}
				var min = data.min;
				var max = data.max;
				var values = data.values.sort(function (a,b) { return a-b; });

				if (num === 1) { return [min,max]; }

				var limits = [];

				if (mode.substr(0,1) === 'c') { // continuous
						limits.push(min);
						limits.push(max);
				}

				if (mode.substr(0,1) === 'e') { // equal interval
						limits.push(min);
						for (var i=1; i<num; i++) {
								limits.push(min+((i/num)*(max-min)));
						}
						limits.push(max);
				}

				else if (mode.substr(0,1) === 'l') { // log scale
						if (min <= 0) {
								throw new Error('Logarithmic scales are only possible for values > 0');
						}
						var min_log = Math.LOG10E * log$1(min);
						var max_log = Math.LOG10E * log$1(max);
						limits.push(min);
						for (var i$1=1; i$1<num; i$1++) {
								limits.push(pow$7(10, min_log + ((i$1/num) * (max_log - min_log))));
						}
						limits.push(max);
				}

				else if (mode.substr(0,1) === 'q') { // quantile scale
						limits.push(min);
						for (var i$2=1; i$2<num; i$2++) {
								var p = ((values.length-1) * i$2)/num;
								var pb = floor$3(p);
								if (pb === p) {
										limits.push(values[pb]);
								} else { // p > pb
										var pr = p - pb;
										limits.push((values[pb]*(1-pr)) + (values[pb+1]*pr));
								}
						}
						limits.push(max);

				}

				else if (mode.substr(0,1) === 'k') { // k-means clustering
						/*
						implementation based on
						http://code.google.com/p/figue/source/browse/trunk/figue.js#336
						simplified for 1-d input values
						*/
						var cluster;
						var n = values.length;
						var assignments = new Array(n);
						var clusterSizes = new Array(num);
						var repeat = true;
						var nb_iters = 0;
						var centroids = null;

						// get seed values
						centroids = [];
						centroids.push(min);
						for (var i$3=1; i$3<num; i$3++) {
								centroids.push(min + ((i$3/num) * (max-min)));
						}
						centroids.push(max);

						while (repeat) {
								// assignment step
								for (var j=0; j<num; j++) {
										clusterSizes[j] = 0;
								}
								for (var i$4=0; i$4<n; i$4++) {
										var value = values[i$4];
										var mindist = Number.MAX_VALUE;
										var best = (void 0);
										for (var j$1=0; j$1<num; j$1++) {
												var dist = abs(centroids[j$1]-value);
												if (dist < mindist) {
														mindist = dist;
														best = j$1;
												}
												clusterSizes[best]++;
												assignments[i$4] = best;
										}
								}

								// update centroids step
								var newCentroids = new Array(num);
								for (var j$2=0; j$2<num; j$2++) {
										newCentroids[j$2] = null;
								}
								for (var i$5=0; i$5<n; i$5++) {
										cluster = assignments[i$5];
										if (newCentroids[cluster] === null) {
												newCentroids[cluster] = values[i$5];
										} else {
												newCentroids[cluster] += values[i$5];
										}
								}
								for (var j$3=0; j$3<num; j$3++) {
										newCentroids[j$3] *= 1/clusterSizes[j$3];
								}

								// check convergence
								repeat = false;
								for (var j$4=0; j$4<num; j$4++) {
										if (newCentroids[j$4] !== centroids[j$4]) {
												repeat = true;
												break;
										}
								}

								centroids = newCentroids;
								nb_iters++;

								if (nb_iters > 200) {
										repeat = false;
								}
						}

						// finished k-means clustering
						// the next part is borrowed from gabrielflor.it
						var kClusters = {};
						for (var j$5=0; j$5<num; j$5++) {
								kClusters[j$5] = [];
						}
						for (var i$6=0; i$6<n; i$6++) {
								cluster = assignments[i$6];
								kClusters[cluster].push(values[i$6]);
						}
						var tmpKMeansBreaks = [];
						for (var j$6=0; j$6<num; j$6++) {
								tmpKMeansBreaks.push(kClusters[j$6][0]);
								tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length-1]);
						}
						tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a,b){ return a-b; });
						limits.push(tmpKMeansBreaks[0]);
						for (var i$7=1; i$7 < tmpKMeansBreaks.length; i$7+= 2) {
								var v = tmpKMeansBreaks[i$7];
								if (!isNaN(v) && (limits.indexOf(v) === -1)) {
										limits.push(v);
								}
						}
				}
				return limits;
		};

		var analyze_1 = {analyze: analyze, limits: limits};

		var contrast = function (a, b) {
				// WCAG contrast ratio
				// see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
				a = new Color_1(a);
				b = new Color_1(b);
				var l1 = a.luminance();
				var l2 = b.luminance();
				return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
		};

		var sqrt$4 = Math.sqrt;
		var atan2$2 = Math.atan2;
		var abs$1 = Math.abs;
		var cos$4 = Math.cos;
		var PI$2 = Math.PI;

		var deltaE = function(a, b, L, C) {
				if ( L === void 0 ) L=1;
				if ( C === void 0 ) C=1;

				// Delta E (CMC)
				// see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CMC.html
				a = new Color_1(a);
				b = new Color_1(b);
				var ref = Array.from(a.lab());
				var L1 = ref[0];
				var a1 = ref[1];
				var b1 = ref[2];
				var ref$1 = Array.from(b.lab());
				var L2 = ref$1[0];
				var a2 = ref$1[1];
				var b2 = ref$1[2];
				var c1 = sqrt$4((a1 * a1) + (b1 * b1));
				var c2 = sqrt$4((a2 * a2) + (b2 * b2));
				var sl = L1 < 16.0 ? 0.511 : (0.040975 * L1) / (1.0 + (0.01765 * L1));
				var sc = ((0.0638 * c1) / (1.0 + (0.0131 * c1))) + 0.638;
				var h1 = c1 < 0.000001 ? 0.0 : (atan2$2(b1, a1) * 180.0) / PI$2;
				while (h1 < 0) { h1 += 360; }
				while (h1 >= 360) { h1 -= 360; }
				var t = (h1 >= 164.0) && (h1 <= 345.0) ? (0.56 + abs$1(0.2 * cos$4((PI$2 * (h1 + 168.0)) / 180.0))) : (0.36 + abs$1(0.4 * cos$4((PI$2 * (h1 + 35.0)) / 180.0)));
				var c4 = c1 * c1 * c1 * c1;
				var f = sqrt$4(c4 / (c4 + 1900.0));
				var sh = sc * (((f * t) + 1.0) - f);
				var delL = L1 - L2;
				var delC = c1 - c2;
				var delA = a1 - a2;
				var delB = b1 - b2;
				var dH2 = ((delA * delA) + (delB * delB)) - (delC * delC);
				var v1 = delL / (L * sl);
				var v2 = delC / (C * sc);
				var v3 = sh;
				return sqrt$4((v1 * v1) + (v2 * v2) + (dH2 / (v3 * v3)));
		};

		// simple Euclidean distance
		var distance = function(a, b, mode) {
				if ( mode === void 0 ) mode='lab';

				// Delta E (CIE 1976)
				// see http://www.brucelindbloom.com/index.html?Equations.html
				a = new Color_1(a);
				b = new Color_1(b);
				var l1 = a.get(mode);
				var l2 = b.get(mode);
				var sum_sq = 0;
				for (var i in l1) {
						var d = (l1[i] || 0) - (l2[i] || 0);
						sum_sq += d*d;
				}
				return Math.sqrt(sum_sq);
		};

		var valid = function () {
				var args = [], len = arguments.length;
				while ( len-- ) args[ len ] = arguments[ len ];

				try {
						new (Function.prototype.bind.apply( Color_1, [ null ].concat( args) ));
						return true;
				} catch (e) {
						return false;
				}
		};

		// some pre-defined color scales:




		var scales = {
			cool: function cool() { return scale([chroma_1.hsl(180,1,.9), chroma_1.hsl(250,.7,.4)]) },
			hot: function hot() { return scale(['#000','#f00','#ff0','#fff'], [0,.25,.75,1]).mode('rgb') }
		};

		/**
				ColorBrewer colors for chroma.js

				Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
				Pennsylvania State University.

				Licensed under the Apache License, Version 2.0 (the "License");
				you may not use this file except in compliance with the License.
				You may obtain a copy of the License at
				http://www.apache.org/licenses/LICENSE-2.0

				Unless required by applicable law or agreed to in writing, software distributed
				under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
				CONDITIONS OF ANY KIND, either express or implied. See the License for the
				specific language governing permissions and limitations under the License.
		*/

		var colorbrewer = {
				// sequential
				OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
				PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
				BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
				Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
				BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
				YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
				YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
				Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
				RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
				Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
				YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
				Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
				GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
				Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
				YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
				PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
				Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
				PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
				Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],

				// diverging

				Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
				RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
				RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
				PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
				PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
				RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
				BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
				RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
				PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],

				// qualitative

				Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
				Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
				Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
				Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
				Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
				Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
				Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
				Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'],
		};

		// add lowercase aliases for case-insensitive matches
		for (var i$1 = 0, list$1 = Object.keys(colorbrewer); i$1 < list$1.length; i$1 += 1) {
				var key = list$1[i$1];

				colorbrewer[key.toLowerCase()] = colorbrewer[key];
		}

		var colorbrewer_1 = colorbrewer;

		// feel free to comment out anything to rollup
		// a smaller chroma.js built

		// io --\x3e convert colors















		// operators --\x3e modify existing Colors










		// interpolators










		// generators -- > create new colors
		chroma_1.average = average;
		chroma_1.bezier = bezier_1;
		chroma_1.blend = blend_1;
		chroma_1.cubehelix = cubehelix;
		chroma_1.mix = chroma_1.interpolate = mix;
		chroma_1.random = random_1;
		chroma_1.scale = scale;

		// other utility methods
		chroma_1.analyze = analyze_1.analyze;
		chroma_1.contrast = contrast;
		chroma_1.deltaE = deltaE;
		chroma_1.distance = distance;
		chroma_1.limits = analyze_1.limits;
		chroma_1.valid = valid;

		// scale
		chroma_1.scales = scales;

		// colors
		chroma_1.colors = w3cx11_1;
		chroma_1.brewer = colorbrewer_1;

		var chroma_js = chroma_1;

		return chroma_js;

};
