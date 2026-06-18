import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(12);
  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let chars = "";

    if (upperCase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowerCase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+[]{}|;:,.<>?";

    if (!chars) {
      setPassword("");
      return;
    }

    let pass = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      pass += chars[randomIndex];
    }

    setPassword(pass);
  }, [length, upperCase, lowerCase, numbers, symbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      alert("Password copied!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Password Generator 🔐</h1>

      <div className="box">
        <input type="text" value={password} readOnly />
        <button className="copy-btn" onClick={copyPassword}>
          Copy
        </button>
      </div>

      <div className="controls">
        <label>Password Length: {length}</label>
        <input
          type="range"
          min="6"
          max="30"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>

      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={upperCase}
            onChange={() => setUpperCase(!upperCase)}
          />
          Uppercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={lowerCase}
            onChange={() => setLowerCase(!lowerCase)}
          />
          Lowercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={numbers}
            onChange={() => setNumbers(!numbers)}
          />
          Numbers
        </label>

        <label>
          <input
            type="checkbox"
            checked={symbols}
            onChange={() => setSymbols(!symbols)}
          />
          Symbols
        </label>
      </div>

      <button className="generate-btn" onClick={generatePassword}>
        Generate Password
      </button>
    </div>
  );
}

export default App;
