import { useState, useRef } from 'react';

interface ValidTypes {
  invalid: boolean | undefined;
  err: string;
}
const initial = { invalid: false, err: '' };
const useValidate = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<ValidTypes>(initial);
  const [email, setEmail] = useState<ValidTypes>(initial);
  const [pwd, setPwd] = useState<ValidTypes>(initial);

  const isValid = () => {
    const EMAIL = emailRef.current?.value;
    const NAME = nameRef.current?.value;
    const PWD = pwdRef.current?.value;
    if (NAME === '') {
      setName({ invalid: true, err: 'must not be empty' });
      return false;
    }
    setName(initial);

    if (EMAIL === '') {
      setEmail({ invalid: true, err: 'must not be empty' });
      return false;
    }
    setEmail(initial);

    if (PWD === '') {
      setPwd({ invalid: true, err: 'must not be empty' });
      return false;
    }
    setPwd(initial);
    return true;
  };
  return { isValid, name, email, pwd, nameRef, emailRef, pwdRef };
};

export default useValidate;
