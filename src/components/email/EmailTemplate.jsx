import { React, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

function EmailTemplate(props) {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [message, setMessage] = useState('');
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // EmailJS credentials
    const templateId = 'template_euz6s5h';
    const serviceId = 'Nshtui42@123';
    const publicKey = 'Xu_wSmnOS-BmuvXeV';

    emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
      () => {
        console.log('Email sent successfully!');
        setSenderName('');
        setSenderEmail('');
        setReceiverName('');
        setReceiverEmail('');
        setMessage('');
      },
      (error) => {
        console.log('FAILED...', error.text);
      }
    );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="mt-6 md:mt-2">
      {/* sender info */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col mb-3 w-full md:w-[48%]">
          <label htmlFor="sender_name" className="text-xs text-gray-500">
            Sender Name
          </label>
          <input
            className="border-[1px] border-gray-300 outline-none py-2 px-4"
            type="text"
            name="sender_name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-3 w-full md:w-[48%]">
          <label htmlFor="sender_email" className="text-xs text-gray-500">
            Sender Email
          </label>
          <input
            type="email"
            className="border-[1px] border-gray-300 outline-none py-2 px-4"
            name="sender_email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
          />
        </div>
      </div>

      {/* receiver info */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col mb-3 w-full md:w-[48%]">
          <label htmlFor="receiver_name" className="text-xs text-gray-500">
            Receiver Name
          </label>
          <input
            className="border-[1px] border-gray-300 outline-none py-2 px-4"
            type="text"
            name="receiver_name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-3 w-full md:w-[48%]">
          <label htmlFor="receiver_email" className="text-xs text-gray-500">
            Receiver Email
          </label>
          <input
            type="email"
            className="border-[1px] border-gray-300 outline-none py-2 px-4"
            name="receiver_email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col mb-3">
        <label className="text-xs text-gray-500">Message</label>
        <textarea
          name="message"
          className="border-[1px] w-full h-[30vh] border-gray-300 outline-none py-2 px-4 text-sm text-gray-600"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className="py-2 px-4 bg-[#078ECE] border-[1px] border-[#078ECE] w-full md:w-1/4 cursor-pointer text-white rounded-[3px] hover:text-[#078ECE] hover:bg-white"
        value="Send"
      />
    </form>
  );
}

export default EmailTemplate;
