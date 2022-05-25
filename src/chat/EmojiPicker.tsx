import { memo } from 'react';
import Picker from 'emoji-picker-react';
interface Props {
  handleEmojiClick: (e: any, emojiObject: any) => void;
}

const EmojiPicker: React.FC<Props> = ({ handleEmojiClick }) => {
  return (
    <div id='emoji-ctr' className='absolute right-2 bottom-[4.5rem]'>
      <Picker pickerStyle={{ boxShadow: 'none' }} onEmojiClick={handleEmojiClick} />
    </div>
  );
};

export default memo(EmojiPicker);
