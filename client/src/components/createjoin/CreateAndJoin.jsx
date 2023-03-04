import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
import numberOnly from '../../utils/numberOnly';
// import { IconPlus } from '@tabler/icons-react';

export default function CreateAndJoin() {
  const [nav, setNav] = useState('create');

  return (
    <div className={style.CreateAndJoin}>
      <div className={style.card}>
        <div className={style.nav}>
          <div className={nav === 'create' ? style.active : null} onClick={() => setNav('create')}>
            Create
          </div>
          <div className={nav === 'join' ? style.active : null} onClick={() => setNav('join')}>
            Join
          </div>
        </div>
        <div className={style.body}>{nav === 'create' ? <FormCrete /> : null}</div>
      </div>
    </div>
  );
}

const FormCrete = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [isRandom, setIsRandom] = useState(false);
  const [isValidate, setIsValidate] = useState(false);

  const onsubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  useEffect(() => {
    if (name.length > 3 && name.length < 20) {
      if (code.length === 6 || isRandom) {
        setIsValidate(true);
      } else {
        setIsValidate(false);
      }
    } else {
      setIsValidate(false);
    }
  }, [name, code, isRandom]);

  return (
    <form className={style.crete}>
      <div className={style.fieldInput}>
        {name && <label htmlFor="name">Name room</label>}
        <input type="text" name="name" maxLength={20} placeholder="Name room" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      {!isRandom && (
        <div className={style.fieldInput}>
          {code && <label htmlFor="code">Code room</label>}
          <input onKeyDown={(e) => numberOnly(e)} type="text" maxLength={6} name="code" placeholder="Code (6 number)" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
      )}
      <div onClick={() => setIsRandom(!isRandom)} className={style.checkbox}>
        <input type="checkbox" name="random" checked={isRandom} onChange={() => setIsRandom(!isRandom)} />
        <label htmlFor="random">Random code</label>
      </div>
      <button onClick={isValidate ? onsubmit : null} className={isValidate ? style.btnValid : style.btnDisable}>
        Create
      </button>
    </form>
  );
};
