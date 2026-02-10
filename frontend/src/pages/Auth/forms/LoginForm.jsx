import { KeyRound, LogIn, Mail } from 'lucide-react';
import Input from '../../../components/Input';
import ButtonWithIcon from '../../../components/ButtonWithIcon';

const LoginForm = () => {
    return (
        <form className="px-6 pb-4">
            <Input type={"text"} placeholder={"E-mail adresa"} icon={<Mail />}  />
            <Input type={"password"} placeholder={"Lozinka"} icon={<KeyRound />} />

            <ButtonWithIcon icon={<LogIn />} >
                Prijavi se
            </ButtonWithIcon>
        </form>
    )
};

export default LoginForm;