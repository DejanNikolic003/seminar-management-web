import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { KeyRound, LogIn, Mail } from "lucide-react";
import Input from "../../../components/Input";
import ButtonWithIcon from "../../../components/ButtonWithIcon";
import Alert from "../../../components/Alert";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      setError({ message: error.message });
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="px-6 pb-4">
      {error.message && <Alert type="error">{error.message}</Alert>}
      <div className="mb-2">
        <Input
          type={"email"}
          placeholder={"E-mail adresa"}
          icon={<Mail />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <Input
          type={"password"}
          placeholder={"Lozinka"}
          icon={<KeyRound />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <ButtonWithIcon icon={<LogIn />} onClick={handleSubmit} loading={loading}>
        Prijavi se
      </ButtonWithIcon>
    </form>
  );
};

export default LoginForm;
