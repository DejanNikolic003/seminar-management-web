import { useState } from "react";
import { KeyRound, LogIn, Mail, User } from "lucide-react";
import Input from "../../../components/Input";
import ButtonWithIcon from "../../../components/ButtonWithIcon";
import Alert from "../../../components/Alert";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const RegisterForm = () => {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register({ firstName, lastName, email, password });

      navigate("/");
    } catch (error) {
      setError({ message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="px-6 pb-4">
      {error.message && <Alert type="error">{error.message}</Alert>}

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

      <ButtonWithIcon icon={<LogIn />} onClick={handleSubmit} loading={loading}>
        Registruj se
      </ButtonWithIcon>
    </form>
  );
};

export default RegisterForm;
