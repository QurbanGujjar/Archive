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

  getRandonNumbers = (noOfRandomNos) => {
    var arr = [];
    while (arr.length < this.state.finalValue ) {
      var r = Math.floor(Math.random() * this.state.finalValue ) + 5/*this.state.initialValue*/;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    var evens = arr.filter(number => number % 2 == 0 && number !== 0 && number >= this.state.inputEvenNumber);
    const evenNumbersToPush = evens.slice(0,this.state.inputEvenNumber);
    var primeNumbers = this.findPrimeNumber(arr);
    const primeNumbersToPush = primeNumbers.slice(0, this.state.inputPrimeNumber);
    var arrToPush = [];
    evenNumbersToPush.forEach(element => {
      arrToPush.push(element)
    });
    primeNumbersToPush.forEach(element => {
      arrToPush.push(element)
    });

    var oldArray = arr.filter( x => ! new Set(arrToPush).has(x) )
    debugger
    arrToPush = arrToPush.slice(0, this.state.inputColumnNumber);
    oldArray.forEach(element => {
      if (arrToPush.length < noOfRandomNos)
        arrToPush.push(element)
    });
    let sortednumbers = arrToPush.sort((a, b) => a - b).join(",");
   
    var arrayOfObject = [];
    arrayOfObject.push(sortednumbers)
    return arrayOfObject;
  }

  handleCahngeforRandom = (val) => {
    var randomNoArrayTemp=[];
    debugger
   for (let index = 0; index < this.state.inputValue; index++) {
    randomNoArrayTemp.push(this.getRandonNumbers(this.state.inputColumnNumber));
    if(randomNoArrayTemp.length==this.state.inputValue-1)
    this.setState({ FarrayOfObject: randomNoArrayTemp })
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
      if (isNum && num >= this.state.inputPrimeNumber) {
        prime.push(num);
      }
    });
    return prime;
  };

  isPrime = (num) => {
    for (var i = 2; i < num; i++) if (num % i === 0) return false;
    return num > 1;
  };

  handleChangeForInput = (e) => {
    this.setState({ inputValue: parseInt(e.target.value) }, () => { });
  };
  handleInitialValue = (e) => {
    this.setState({ initialValue: parseInt(e.target.value) }, () => { });
  };
  handleFinalValue = (e) => {
    this.setState({ finalValue: parseInt(e.target.value) }, () => { });
  };

  handleinputEvenNumber = (e) => {
    this.setState({ inputEvenNumber: parseInt(e.target.value) }, () => { });
  };
  handleinputPrimeNumber = (e) => {
    this.setState({ inputPrimeNumber: parseInt(e.target.value) }, () => { });
  };
  // handleinputColumnNumber
  handleinputColumnNumber = (e) => {
    this.setState({ inputColumnNumber: parseInt(e.target.value) }, () => { });
  };

  handleChanceOfNumberInSequence = (e) => {
    this.setState(
      { chanceOfNumberInSequence: parseInt(e.target.value) },
      () => { }
    );
  };

  handleChanceOfNumberSmallest = (e) => {
    this.setState(
      { chanceOfNumberInSequenceSmallest: parseInt(e.target.value) },
      () => { }
    );
  };
  handleChanceOfNumberBiggest = (e) => {
    this.setState(
      { chanceOfNumberInSequenceBiggest: parseInt(e.target.value) },
      () => { }
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
        Math.floor(Math.random() * this.state.finalValue ) + 5/*this.state.initialValue*/)
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
          <b> how many rows/ sequences/ series do you want?</b>{" "}
        </label>
        <input type='number' onChange={this.handleChangeForInput}></input>
        <br />
        <label>
          {" "}
          <b>How many even numbers do you want (At least):</b>{" "}
        </label>
        <input type='number' onChange={this.handleinputEvenNumber}></input>
        <br />
        {/* inputColumnNumber */}
        <label>
          {" "}
          <b>How many Prime numbers do you want (At least):</b>{" "}
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
          Get Resultsnpx
        </button>
        <br /> Random Number :{/* {console.log(this.state.FarrayOfObject)} */}
        <br />

        {/* {this.state.FarrayOfObject.length > 0 ? <ColumnLables length={this.state.FarrayOfObject[0]} /> : ""} */}


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
                <p key={item[index]}> <span   >Row No : {index + 1} -----{">"} </span>{item.map((num, ind) => {
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
