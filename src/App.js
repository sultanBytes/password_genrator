import React, { useState, useCallback, useEffect, useRef } from 'react';

const App = () => {
  const passwordRef = useRef(null);
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);

  const generatePassword = useCallback(() => {
    let pass = '';
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numAllow) string += '1234567890';
    if (charAllow) string += '!@#$%^&*{}~+-';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass += string[char];
    }

    setPassword(pass);
  }, [length, numAllow, charAllow]);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    // showNotification();
  }, [password]);

  // const showNotification = () => {
  //   if ('Notification' in window) {
  //     if (Notification.permission === 'granted') {
  //       new Notification('Password copied to clipboard!');
  //     } else if (Notification.permission !== 'denied') {
  //       Notification.requestPermission().then(function (permission) {
  //         if (permission === 'granted') {
  //           new Notification('Password copied to clipboard!');
  //         }
  //       });
  //     }
  //   }
  // };

  useEffect(() => {
    generatePassword();
  }, [length, numAllow, charAllow]);

  return (
    <>
      <div className='w-full max-w-md mx-auto my-8 bg-gray-400 py-2 shadow-md rounded-lg px-4 text-center'>
        <h1 className='text-[20px] font-semibold'>Password Generator</h1>
        <div className='relative my-2'>
          <input
            type='text'
            value={password}
            readOnly
            placeholder='Password'
            className='w-full rounded-md py-1 px-2'
            ref={passwordRef}
          />

          <button
            className='bg-[olive] py-1 text-[16px] font-semibold text-white px-4 rounded-r-md absolute right-0 top-0'
            onClick={copyPassToClipboard}
          >
            Copy
          </button>
        </div>

        <div className='grid align-middle check-div'>
          <input
            type='range'
            min={6}
            max={24}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />

          <label className='text-[12px] font-semibold'>Length: {length}</label>

          <input
            type='checkbox'
            className='cursor-pointer'
            onChange={(e) => {
              setCharAllow((prev) => !prev);
            }}
            defaultChecked={charAllow}
          />

          <label className='text-[12px] font-semibold'>Character</label>

          <input
            type='checkbox'
            className='cursor-pointer'
            onChange={(e) => {
              setNumAllow((prev) => !prev);
            }}
            defaultChecked={numAllow}
          />

          <label className='text-[12px] font-semibold'>Number</label>
        </div>
      </div>
    </>
  );
};

export default App;
