import React, { Component } from "react";
import ColumnLables from "../components/ColumnLables";

class random extends Component {
  state = {
    randomNumArray: [],
    consectiveNumbers: [],
    FarrayOfObject: [],
    finalArry: [],
    myarr: [],
    evenNumber: [],
    oddNumber: [],
    primeNumber: [],
    inputColumnNumber: 0,
    inputValue: 0,
    initialValue: 0,
    finalValue: 0,
    inputEvenNumber: 0,
    inputPrimeNumber: 0,
    sumOfRandomNumber: 0,
    Qe: 0,
    Qo: 0,
    percentageOfEven: 0,
    percentageOfOdd: 0,
    avgOfConsectiveNumbers: 0,
    chanceOfNumberInSequence: 0,
    chanceOfNumberInSequenceProb: 0,
    chanceOfNumberSmallest: 0,
    chanceOfNumberInSequenceSmallestProb: 0,
    chanceOfNumberBiggest: 0,
    chanceOfNumberInSequenceBiggestProb: 0,
  };

  checkPrime(number) {
    // console.log(number);
    if (number <= 1) {
      return false;
    } else {
      for (let k = 2; k < number; k++) {
        if (number % k == 0) {
          return false;
        }
      }
      return true;
    }
  }
  handleCahngeforRandom = (val) => {
    this.GetRangeOfNumbers();
    var currentArr = this.state.finalArry;
    // var myarr = [];
    var arrayOfObject = [];
    var numberOfColoum = this.state.inputColumnNumber;
    var primeCount = 0;
    var evenCount = 0;
    var rowCount = 0;
    // console.log()
    // console.log(currentArr.length)
    for (var i = 0; i < this.state.finalArry.length; i++) {
      // console.log(currentArr[i])
      if (currentArr[i] % 2 === 0) {
        if (evenCount < this.state.inputEvenNumber) {
          this.state.myarr.push(currentArr[i]);
          evenCount++;
          // rowCount++
        }
      } else {
        let prime = this.checkPrime(currentArr[i]);
        // console.log(prime)
        if (prime) {
          if (primeCount < this.state.inputPrimeNumber) {
            this.state.myarr.push(currentArr[i]);
            primeCount++;
          } else {
          }
        } else {
          this.state.myarr.push(currentArr[i]);
          // rowCount++
        }
        // myarr.push(currentArr[i])
      }

      if (this.state.myarr.length === this.state.inputValue) {
        break;
      }
    }

    console.log(this.state.myarr);
    let reqColum = this.state.inputColumnNumber;
    for (let z = 0; z <= this.state.myarr.length; z++) {
      if (rowCount === reqColum) {
        // console.log(z-5,z)
        arrayOfObject.push(this.state.myarr.slice(z - reqColum, z));
        rowCount = 1;
      } else {
        rowCount++;
        // console.log(rowCount++)
      }
    }
    console.log(arrayOfObject);
    // this.state.FarrayOfObject=this.state.myarr

    this.setState({ FarrayOfObject: arrayOfObject });

    if (val == 0) {
      alert("Please enter minimum one number");
    } else {
      var arr = [];
      // while (arr.length < val) {
      //   var r = Math.floor(Math.random() * 50) + 1;
      //   if (arr.indexOf(r) === -1) arr.push(r);
      // }

      // this.setState(this.state.myarr)
      arr = this.state.myarr;
      // this.state.myarr=[]

      this.setState(
        {
          randomNumArray: arr.sort((a, b) => a - b).join(","),
          finalArry: arr,
        },
        () => {
          this.avg(this.state.myarr);
          this.diff(this.state.myarr);
          this.even(this.state.myarr);
          this.odd(this.state.myarr);
          this.findPrimeNumber(this.state.myarr);
        }
      );
      return arr;
    }
  };

  //  lableF=()=>{
  //   for (let index = 0; index <this.state.inputColumnNumber; index++) {
  //       <span>{index} </span>

  //   }

  avg = (arr) => {
    let average = arr.reduce((a, b) => a + b, 0) / arr.length;
    this.setState({ sumOfRandomNumber: parseInt(average) });
  };

  diff = (ary) => {
    var newA = [];
    for (var i = 1; i < ary.length; i++) newA.push(ary[i] - ary[i - 1]);
    const sumOfConsecutiveNos = newA.reduce((a, b) => a + b, 0);
    const avgOfConsectiveNumberTemp = sumOfConsecutiveNos / newA.length || 0;
    this.setState({
      consectiveNumbers: newA.join(","),
      consective: newA,
      avgOfConsectiveNumbers: avgOfConsectiveNumberTemp,
    });
    return newA;
  };

  even = (arr) => {
    let even = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] % 2 === 0) {
        even.push(arr[i]);
      }
      this.setState({ evenNumber: even.join(",") });
    }
    let percentage = parseInt((even.length / arr.length) * 100);
    this.setState({ Qe: even.length, percentageOfEven: percentage });
    // console.log(percentage);
  };
  odd = (arr) => {
    let odd = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] % 2 !== 0) {
        odd.push(arr[i]);
      }
      this.setState({ oddNumber: odd.join(",") });
    }
    let percentage = parseInt((odd.length / arr.length) * 100);
    this.setState({ Qo: odd.length, percentageOfOdd: percentage });
  };

  findPrimeNumber = (arr) => {
    let prime = [];
    arr.forEach((num) => {
      var isNum = this.isPrime(num);
      if (isNum) {
        prime.push(num);
      }
    });
    this.setState({ primeNumber: prime.join(",") });
  };

  isPrime = (num) => {
    for (var i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
  };

  handleChangeForInput = (e) => {
    this.setState({ inputValue: parseInt(e.target.value) }, () => {});
  };
  handleInitialValue = (e) => {
    this.setState({ initialValue: parseInt(e.target.value) }, () => {});
  };
  handleFinalValue = (e) => {
    this.setState({ finalValue: parseInt(e.target.value) }, () => {});
  };

  handleinputEvenNumber = (e) => {
    this.setState({ inputEvenNumber: parseInt(e.target.value) }, () => {});
  };
  handleinputPrimeNumber = (e) => {
    this.setState({ inputPrimeNumber: parseInt(e.target.value) }, () => {});
  };
  // handleinputColumnNumber
  handleinputColumnNumber = (e) => {
    this.setState({ inputColumnNumber: parseInt(e.target.value) }, () => {});
  };

  handleChanceOfNumberInSequence = (e) => {
    this.setState(
      { chanceOfNumberInSequence: parseInt(e.target.value) },
      () => {}
    );
  };

  handleChanceOfNumberSmallest = (e) => {
    this.setState(
      { chanceOfNumberInSequenceSmallest: parseInt(e.target.value) },
      () => {}
    );
  };
  handleChanceOfNumberBiggest = (e) => {
    this.setState(
      { chanceOfNumberInSequenceBiggest: parseInt(e.target.value) },
      () => {}
    );
  };

  kPresentProbability(a, n, k) {
    let count = 0;
    for (let i = 0; i < n; i++) if (a[i] == k) count += 1;

    // find probability
    this.setState({ chanceOfNumberInSequenceProb: count / n });
  }
  smallestProb(a, n, k) {
    let count = 0;
    for (let i = 0; i < n; i++) if (Math.min(...a) == k) count += 1;

    // find probability
    this.setState({ chanceOfNumberInSequenceSmallestProb: count / n });
  }
  biggestProb(a, n, k) {
    let count = 0;
    for (let i = 0; i < n; i++) if (Math.max(...a) == k) count += 1;

    // find probability
    this.setState({ chanceOfNumberInSequenceBiggestProb: count / n });
  }
  GetRangeOfNumbers = () => {
    // console.log(this.state.finalValue,this.state.initialValue)
    this.state.finalArry = [];
    for (let i = this.state.initialValue; i <= this.state.finalValue; i++) {
      this.state.finalArry.push(
        Math.floor(
          Math.random() * (this.state.finalValue - this.state.initialValue) +
            this.state.initialValue
        )
      );
    }
    // console.log(Math.random() * (this.state.finalValue - this.state.initialValue) + this.state.initialValue);

    this.setState(this.state.finalArry);
    // console.log(this.state.finalArry);
  };

  render() {
    const {
      randomNumArray,
      consectiveNumbers,
      avgOfConsectiveNumbers,
      evenNumber,
      oddNumber,
      primeNumber,
      inputValue,
      initialValue,
      finalValue,
      chanceOfNumberInSequence,
      chanceOfNumberInSequenceProb,
      chanceOfNumberInSequenceSmallest,
      chanceOfNumberInSequenceSmallestProb,
      chanceOfNumberInSequenceBiggest,
      chanceOfNumberInSequenceBiggestProb,
      sumOfRandomNumber,
      Qe,
      percentageOfEven,
      Qo,
      percentageOfOdd,
    } = this.state;
    return (
      <div style={{ paddingTop: "2rem" }}>
        <div>
          <label>
            {" "}
            <b>Select Range of numbers :</b>{" "}
          </label>
          <br />
          <br />
          <label>
            {" "}
            <b>Select initial number :</b>{" "}
          </label>
          <input type='number' onChange={this.handleInitialValue}></input>
          <label>
            {" "}
            <b>Select Final number :</b>{" "}
          </label>
          <input type='number' onChange={this.handleFinalValue}></input>
          {/* <button onClick={this.GetRangeOfNumbers}>
       Get Range of numbers
        </button> */}
        </div>
        <div></div>
        <label>
          {" "}
          <b>How many random numbers do you want :</b>{" "}
        </label>
        <input type='number' onChange={this.handleChangeForInput}></input>
        <br />
        <label>
          {" "}
          <b>How many even numbers do you want :</b>{" "}
        </label>
        <input type='number' onChange={this.handleinputEvenNumber}></input>
        <br />
        {/* inputColumnNumber */}
        <label>
          {" "}
          <b>How many Prime numbers do you want :</b>{" "}
        </label>
        <input type='number' onChange={this.handleinputPrimeNumber}></input>
        <br />
        <label>
          {" "}
          <b>How many Column number do you want :</b>{" "}
        </label>
        <input type='number' onChange={this.handleinputColumnNumber}></input>
        <br />
        <button onClick={() => this.handleCahngeforRandom(inputValue)}>
          Get Results
        </button>
        <br /> Random Number :{/* {console.log(this.state.FarrayOfObject)} */}
<br />

       {this.state.FarrayOfObject.length>0?<ColumnLables length={this.state.FarrayOfObject[0]}/>:"" }


        {/* <div>
        {this.state.FarrayOfObject &&
          this.state.FarrayOfObject.map((item, index) => {
            if(index<1){
              return <p key={index}></p>;
            }




          })
          }
        </div> */}
        {this.state.FarrayOfObject &&
          this.state.FarrayOfObject.map((item, index) => {
            return (


              <div key={index}>
<p key={item[index]}> <span   >Row No : {index+1} -----{">"} </span>{item.map((num,ind)=>{
  return <span key={ind}>{num} {", "}</span>

})}</p>


              </div>

            );
          })}
        {/* {this.state.FarrayOfObject.map((item, index) => {
        <p>



          {forEach(item, (value, key) => {
                  return (
                    <div key={key}>
                      <label>
                        {" "}
                        <b>{key} :</b>{" "}
                      </label>
                      <br />
                      <label>
                        {" "}
                        <b>{value}</b>{" "}
                      </label>
                      <br />
                    </div>
                  );
                }
                )}
<p><span> {index+1 +" "}</span> {item[0]+" ,"+item[1]+" ,"+item[2]+" ,"+item[3]+" ,"+item[4]}</p>
        {for(let i=0;i<item.length;i++){
            {item[i]}
          }
          )}
          {console.log(item)}
        </p>
        })} */}
        {/* {randomNumArray} */}
        {/* <br /> AVG Of Random :{" "}
        {sumOfRandomNumber === 0 ? "" : sumOfRandomNumber}
        <h2>Consective Numbers difference</h2>
        <h2>{consectiveNumbers}</h2> AVG Of Random :{" "}
        {sumOfRandomNumber === 0 ? "" : sumOfRandomNumber}
        <h2>Avarage of Consective Numbers</h2>
        <h2>{avgOfConsectiveNumbers.toFixed(2)}</h2>
        Even Numbers : {evenNumber}
        <br /> */}
        {/* Quentity of Even number : {Qe === 0 ? "" : Qe}
        <br />
        Percentage of even number :{" "}
        {percentageOfEven === 0 ? "" : `${percentageOfEven} %`}
        <br />
        Odd Numbers : {oddNumber}
        <br /> */}
        {/* Quentity of odd number : {Qo === 0 ? "" : Qo} */}
        {/* <br />
        Percentage of odd number :{" "} */}
        {/* {percentageOfOdd === 0 ? "" : `${percentageOfOdd} %`}
        Prime Numbers:{primeNumber}
        <br />
        <label> Chance of a number :</label>
        <input
          type='number'
          onChange={this.handleChanceOfNumberInSequence}
        ></input>
        <button
          onClick={() =>
            this.kPresentProbability(
              this.state.finalArry,
              this.state.finalArry.length,
              chanceOfNumberInSequence
            )
          }
        >
          ok
        </button>
        {" " + chanceOfNumberInSequenceProb} */}
        <br></br>
        {/* <label> Chance of a number be the smallest :</label>
        <input
          type='number'
          onChange={this.handleChanceOfNumberSmallest}
        ></input> */}
        {/* <button
          onClick={() =>
            this.smallestProb(
              this.state.finalArry,
              this.state.finalArry.length,
              chanceOfNumberInSequenceSmallest
            )
          }
        >
          ok
        </button> */}
        {/* {" " + chanceOfNumberInSequenceSmallestProb}
        <br />
        <label> Chance of a number be the Biggest :</label>
        <input
          type='number'
          onChange={this.handleChanceOfNumberBiggest}
        ></input>
        <button
          onClick={() =>
            this.biggestProb(
              this.state.finalArry,
              this.state.finalArry.length,
              chanceOfNumberInSequenceBiggest
            )
          }
        >
          ok
        </button>
        {chanceOfNumberInSequenceBiggestProb}
        <br />
        Sum of all numbers
        <h2>
          {this.state.finalArry.reduce((partialSum, a) => partialSum + a, 0)}
        </h2> */}
      </div>
    );
  }
}
export default random;
