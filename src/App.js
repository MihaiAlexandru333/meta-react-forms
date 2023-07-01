import "./App.css";
import { useState } from "react";
import { validateEmail } from "./utils";

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [role, setRole] = useState("role");


  const getIsFormValid = () => {
    if (
      firstName.length === 0 ||
      email.length === 0 ||
      password.value.length === 0 ||
      role === "role" ||
      !validateEmail(email) ||
      password.value.length < 8
    ) {
      return false;
    }
    return true;
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword({ value: "", isTouched: false });
    setRole("role");
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Account created!");
    clearForm();
  };
  const handleChange = (callback) => (event) => {
    callback(event.target.value);
  };

  function validatePassword() {
    return password.isTouched && password.value.length < 8;
  }


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              placeholder="First name"
              value={firstName}
              onChange={handleChange(setFirstName)}
            />
          </div>
          <div className="Field">
            <label>Last name</label>
            <input
              placeholder="Last name"
              value={lastName}
              onChange={handleChange(setLastName)}
            />
          </div>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              placeholder="Email address"
              value={email}
              onChange={handleChange(setEmail)}
            />
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password.value}
              onChange={(event) =>
                handleChange(
                  setPassword({ ...password, value: event.target.value, isTouched: true })
                )
              }
            />
            {validatePassword() ? <PasswordErrorMessage /> : null}

            {password.isTouched && password.value.length < 8 && <PasswordErrorMessage />}

          </div>
          <div className="Field">
            <label>
              Role <sup>*</sup>
            </label>
            <select
              value={role}
              onChange={handleChange(setRole)}
              defaultValue="role"
            >
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default App;
