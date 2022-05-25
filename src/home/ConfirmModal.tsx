import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserAcc } from '../firebaseUtils/firebaseUtils';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

interface Props {
  username: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmModal: React.FC<Props> = ({ active, setActive, username }) => {
  const [err, setErr] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!ref.current) return;
    const name = ref.current.value.trim();
    if (name !== username) return setErr(true);
    setErr(false);
    await deleteUserAcc();
    navigate('signin');
  };

  return (
    <Dialog open={active} onClose={() => setActive(false)} sx={{ div: { p: 2 } }}>
      <DialogContent sx={{ width: 250 }}>
        <p className='text-center'>
          Please type <span className='font-medium text-blue-400'>{username}</span> to delete your
          account
        </p>
        <input
          ref={ref}
          type='text'
          placeholder='username'
          className='w-full outline outline-1 block mt-4 py-[2px] px-1 rounded-sm outline-blue-400'
        />
        {err && <span className='text-sm text-red-500'>names are not match</span>}
        <section className='flex-between mt-5 bg-'>
          <Button onClick={handleDelete} className='bg-blue-500 hover:bg-blue-600 text-white'>
            Confirm
          </Button>
          <Button
            onClick={() => setActive(false)}
            className='bg-red-600 hover:bg-red-700 text-white'
          >
            Cancel
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
