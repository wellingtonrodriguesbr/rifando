import { useState } from "react";
import "./App.css";
import { Loading } from "./Loading";

export default function App() {
  const [initial, setInitial] = useState("");
  const [final, setFinal] = useState("");
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hideElement, setHideElement] = useState(false);

  const notValue = !(initial && final);
  console.log(notValue);

  function handleChangeInitial(event) {
    setInitial(Number(event.target.value));
  }

  function handleChangeFinal(event) {
    setFinal(Number(event.target.value));
  }

  function handleChangeResult() {
    const value = Math.floor(Math.random() * (final - initial + 1)) + initial;
    setLoading(true);
    setTimeout(() => {
      setResult(value);
      setLoading(false);
      setHideElement(true);
    }, 3000);
  }

  function redoLottery() {
    setInitial("");
    setFinal("");
    setResult(0);
    setHideElement(false);
  }

  return (
    <div className="App">
      <h1>Rifando</h1>
      <p>Faça seu sorteio abaixo</p>
      <div className="content">
        {!loading && !hideElement ? (
          <>
            <div>
              <label htmlFor="initial">Número inicial:</label>
              <input
                type="number"
                name="initial"
                id="initial"
                value={initial}
                onChange={handleChangeInitial}
              />
            </div>

            <div>
              <label htmlFor="final">Número final:</label>
              <input
                type="number"
                name="final"
                id="final"
                value={final}
                onChange={handleChangeFinal}
              />
            </div>

            <button disabled={notValue} onClick={handleChangeResult}>
              Sortear
            </button>
          </>
        ) : null}

        {loading ? (
          <>
            <p>Sorteando</p>
            <Loading />
          </>
        ) : null}

        {hideElement && !loading ? (
          <div className="result">
            <h2>O número sorteado é:</h2>
            <p>{result}</p>
            <button onClick={redoLottery}>Refazer</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
