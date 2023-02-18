import React, { useState } from "react";
// import axios from 'axios';
import emailjs from 'emailjs-com';

// const myemail= 'noelia.c.ferrer';
// const mypass= 'noe123';

export const Email = () => {
  const email = {
    user: '',
    bill: '',
  }

  const [message, setMessage] = useState(email)

  const handleChange = (e) => {
    const {name, value} = e.target
    setMessage({
      ...message,
      [name]: value
    })
    console.log(message)
    console.log(email)   
  };

  const handleSubmit= (e) => {
        e.preventDefault();
        console.log(message)
        console.log(email)      
      
	   		emailjs.send('default_service,´<YOUR TEMPLATE ID>´, email, ´<YOUR USER ID>')
		.then((response) => {
				   console.log('SUCCESS!', response.status, response.text);
				   setMessage(email);
				  //  setShowMessage(true);
		}, (err) => {
				   console.log('FAILED...', err);
		});
   }
  



//   const [destinatary, setDestinatary] = useState("");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState('');

//  const handleClick = () => {
//   console.log('click')

//   Email.send({
//     SecureToken : "9a43554e-0f36-4ffc-b184-bb9f3fdbfda9",
//     To : 'noelia.c.ferrer@gmail.com',
//     From : 'noelia.c.ferrer@gmail.com',
//     Subject : "testing",
//     Body : "And this is the body"
// }).then(
//   message => alert(message)
// );
// }

  // const sendMail = () => {
  //   if(destinatary && subject && message ){
  //     axios.post('http://localhost:3001/email', {
  //       destinatary,
  //       subject,
  //       message
  //     })
  //     .then(() => alert('message send succesfully'))
  //     .catch(() => alert('opps...nothing happened!'))
  //   }
  //   return alert('some fields are empty')
  // }
 
  return (
    <div>
      <h3>Sending email</h3>
      <form>
        <input
          type="text"
          placeholder="email"
          name='user'
          value={email.user}
          onChange={(e) => handleChange(e)}
        />
        <br />

        <input
          type="text"
          placeholder="bill amount"
          name='bill'
          value={email.bill}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />     

        <button type='submit' onSubmit={handleSubmit}>Send</button>
      </form>
    </div>
  );
};


// password: 580C9DE2958044BE868F3F0D24F13F21E26B


// token: 9a43554e-0f36-4ffc-b184-bb9f3fdbfda9