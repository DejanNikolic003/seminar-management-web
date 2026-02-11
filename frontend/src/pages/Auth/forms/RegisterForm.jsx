import { useState } from "react";
import { KeyRound, LogIn, Mail, User } from "lucide-react";
import Input from "../../../components/Input";
import ButtonWithIcon from "../../../components/ButtonWithIcon";
import { register } from "../../../api/auth";
import useAuth from "../../../hooks/useAuth";

const RegisterForm = () => {
  const { auth, setAuth } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ firstName, lastName, email, password });
      setAuth({
        user: response.data.user,
        accessToken: response.data.accessToken,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const test = () => {
    console.log(auth?.user);
  };

  return (
    <form className="px-6 pb-4">
      <div className="md:flex gap-2">
        <Input
          type={"text"}
          placeholder={"Ime"}
          icon={<User />}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type={"text"}
          placeholder={"Prezime"}
          icon={<User />}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <Input
        type={"email"}
        placeholder={"E-mail adresa"}
        icon={<Mail />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type={"password"}
        placeholder={"Lozinka"}
        icon={<KeyRound />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <ButtonWithIcon icon={<LogIn />} onClick={handleSubmit}>
        Registruj se
      </ButtonWithIcon>
      <ButtonWithIcon icon={<LogIn />} onClick={test}>
        Registruj se
      </ButtonWithIcon>
    </form>
  );
};

export default RegisterForm;
