const say=require('./backup/util.js');

let m21 = [
[1,4,1,4],
[3,2,2,3],
[3,2,4,2],
[1,4,3,1]
];

let m31 = [
    [6, 5, 0, 7, 3, 0, 0, 8, 0],
    [0, 0, 0, 4, 8, 0, 5, 3, 0],
    [8, 4, 0, 9, 2, 5, 0, 0, 0],
    [0, 9, 0, 8, 0, 0, 0, 0, 0],
    [5, 3, 0, 2, 0, 9, 6, 0, 0],
    [0, 0, 6, 0, 0, 0, 8, 0, 0],
    [0, 0, 9, 0, 0, 0, 0, 0, 6],
    [0, 0, 7, 0, 0, 0, 0, 5, 0],
    [1, 6, 5, 3, 9, 0, 4, 7, 0]
];

class CBaseSquare {
	constructor(p_size, p_matrixSlice = null)
	{
		this.size = p_size;
		this.numbersFullSet = [];
		this.field = [];
		for(let i = 1; i <= this.size ** 2; ++i)
			this.numbersFullSet.push(i);
		if (p_matrixSlice === null)
			this.fieldRandomFill();
		else
			this.field = p_matrixSlice;

		//say(this.field);
	}
	fieldRandomFill() {
		this.field = [];


		let a = this.numbersFullSet;
		let a_random = [];
    
		let count = 0;
		// it gives us unique random numbers! :-)
		for(let i = 0; i < a.length; ++i, ++count)
		{
			let idx = Math.floor(Math.random() * (a.length - count));
			a_random.push(a[idx]);

			let t = a[idx];
			a[idx] = a[a.length-1-count];
			a[a.length-1-count] = t;
		}

		for(let i = 0; i < this.size**2; i += this.size) {
			this.field.push(a_random.slice(i, i + this.size));
		}
	}
	getRow(p_row)
	{
		return this.field[p_row];
	}
}

class CNumberPlace {
	constructor(p_baseSize = 2, p_matrixFull = null)
	{
		this.baseSize = p_baseSize;
		this.field = [];

		for(let row = 0; row < this.baseSize; ++row)
		{                      
			let sqArr = [];
			for(let col = 0; col < this.baseSize; ++col)
			{
				//say("row col: " + row + " " + col);
				let square = null;
				if (p_matrixFull === null)
					square = new CBaseSquare(this.baseSize);
				else {
					let c = this.baseSize;
					let initMatr = this.getSlice2D(row*c,col*c,p_matrixFull);
					square = new CBaseSquare(this.baseSize,initMatr);
				}

				sqArr.push(square);
			}
			this.field.push(sqArr);
			//say(this.field);
			//say(this.field[0][0]);

		}
	}
	getSlice2D(p_rowStart,p_colStart,p_matrixFull)
	{
		let out_Result = [];

		let colEnd = p_colStart + this.baseSize;
		let rowEnd = p_rowStart + this.baseSize;
		for(let row = p_rowStart; row < rowEnd; ++row)
		{
			let a = p_matrixFull[row].slice(p_colStart,colEnd);
			out_Result.push(a);
		}

		return out_Result;
	}
	getField()
	{
		let out_Arr = [];
		let sz = this.baseSize;
		for(let row = 0; row < sz; ++row)
			for(let rowSq = 0; rowSq < sz; ++rowSq)
			{
				let out_rowFull = [];
				for(let col = 0; col < sz; ++col)
				{
					let baseSq = this.field[row][col];
					//let out_Row = baseSq.getRow(rowSq);
					out_rowFull = out_rowFull.concat(baseSq.getRow(rowSq));
					//say('out_rowFull');
					//say(out_rowFull);
				}
				out_Arr.push(out_rowFull);
			}

		return out_Arr;
	}
	getFieldAsString()
	{
		let out_S = '';
		let f = this.getField();
		for(let row= 0; row < f.length; ++row)
		{
			let s = f[row].join(" ");
			out_S += s + "\n";
		}

		return out_S;
	}

}

let np;

for(let i = 0; i < 100; ++i)
{
	np = new CNumberPlace(3);
	say(np.getFieldAsString());
}

/*
//np = new CNumberPlace(2,m21);
np = new CNumberPlace(2);
//np = new CNumberPlace(3,m31);
say(np.getField());
say(np.getFieldAsString());
*/

