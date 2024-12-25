'use client'
import React from 'react'
import { Link } from 'react-router-dom';

const customBg = {
  background: 'linear-gradient(to bottom, #3a836e, #3d63c0)', // Gradient colors
  backgroundSize: 'cover', // Ensure the gradient covers the entire element
  backgroundRepeat: 'no-repeat', // Prevent the gradient from repeating
  color: 'white', // Set text color to white for readability
  padding: '20px', // Add spacing inside the container
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow for depth
  textAlign: 'center', // Optional: Center-align text inside the container
};

const ContactUs = () => {
  return (
    <React.Fragment>
      <div style={customBg} className="flex flex-col justify-center items-center px-8 py-12 text-white">
        {/* Header */}
        <div className="flex justify-between items-center w-full">
          <button className="flex items-center justify-center bg-pink-500 text-white px-3 py-1 rounded-full">
            FR
          </button>
          <Link to={'/'}>
          <button className="w-10 h-10 flex items-center justify-center hover:border-2 border-white rounded-full">
            ✕
          </button></Link>
        </div>

        {/* Content */}
        <div className="w-full pt-14 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
          {/* Left Section */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              CONTACT<br />
              ÉVÈNEMENTS ET COLLABORATIONS
            </h1>
            <p className="text-lg leading-relaxed mb-8">
              Faites de votre évènement un moment magique. Optez pour un lieu de rêve pour
              célébrer vos occasions spéciales. Que ce soit pour un anniversaire, un événement
              d'entreprise, un tournage ou un lancement exclusif, contactez-nous. Nous avons tout
              ce qu'il faut pour créer un évènement inoubliable. De nombreux clients nous ont
              déjà fait confiance.
            </p>
            <p className="text-lg flex flex-col">
              <strong>Events:</strong>{' '}
              <a
                href="mailto:privatisation@houseofdreamers.fr"
                className="text-white underline hover:text-gray-300"
              >
                privatisation@houseofdreamers.fr
              </a>
            </p>
          </div>

          {/* Right Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">AUTRES CONTACTS</h2>
            <div className="space-y-4">
              <p className='flex flex-col font-bold text-xl'>
                <strong>Presse et Médias:</strong>{' '}
                <a
                  href="mailto:presse@houseofdreamers.fr"
                  className="text-white underline hover:text-gray-300 text-xl"
                >
                  presse@houseofdreamers.fr
                </a>
              </p>
              <p className='flex flex-col font-bold text-xl'>
                <strong>Affaires et collaborations:</strong>{' '}
                <a
                  href="mailto:business@houseofdreamers.fr"
                  className="text-white underline hover:text-gray-300 text-xl"
                >
                  business@houseofdreamers.fr
                </a>
              </p>
              <p className='flex flex-col font-bold text-xl'>
                <strong>Demandes générales:</strong>{' '}
                <a
                  href="mailto:info@houseofdreamers.fr"
                  className="text-white underline hover:text-gray-300 text-xl"
                >
                  info@houseofdreamers.fr
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className='flex container max-w-5xl items-center flex-col py-20'>
          <h1 className='font-bold text-5xl font-serif'>ILS NOUS ONT FAT CONFIANCE</h1>
          <div className='flex py-8 w-full gap-2 justify-between'>
            <img className='w-[52px]' src="/public/images/elf.webp" alt="" />
            <img className='w-[52px]' src="/public/images/x-factor.webp" alt="" />
            <img className='w-[52px]' src="/public/images/warner.webp" alt="" />
            <img className='w-[52px]' src="/public/images/paramount.webp" alt="" />
            <img className='w-[52px]' src="/public/images/honor.webp" alt="" />
            <img className='w-[52px]' src="/public/images/tik-tok.webp" alt="" />
          </div>
        </div>
        <div className="w-full pt-14 container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          <div >
            <h1 className='font-bold text-5xl text-left font-serif'>ECRIVEZNOUS</h1>
          </div>
          <div className="">
            <form className="w-full max-w-lg bg-transparent text-white">
              {/* Dropdown */}
              <div className="mb-6 flex justify-start">
                <select
                  id="occasion"
                  className="w-fit bg-transparent border-b-2 border-white focus:outline-none focus:border-blue-400 text-white"
                >
                  <option>Anniversaire</option>
                  <option>Mariage</option>
                  <option>Événement professionnel</option>
                </select>
              </div>

              {/* Name and Email */}
              <div className="flex flex-wrap mb-6">
                <div className="w-full flex items-center gap-1 md:w-1/2 mb-4 md:mb-0">
                  <label className="block mt-2 whitespace-nowrap text-sm font-bold " htmlFor="name">
                    Je suis
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className=" bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-400 text-white"
                  />
                </div>
                <div className="w-full flex items-center gap-1 md:w-1/2 mb-4 md:mb-0">
                  <label className="block mt-2 whitespace-nowrap text-sm font-bold " htmlFor="name">
                    Mon address électronique est
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    className="w-full bg-transparent border-b-2 border-white focus:outline-none focus:border-blue-400 text-white"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm text-left font-bold mb-2" htmlFor="message">
                  Voici mon message
                </label>
                <textarea
                  id="message"
                  placeholder="Message"
                  rows="4"
                  className="w-full bg-transparent border-b-2 border-white focus:outline-none focus:border-blue-400 text-white"
                ></textarea>
              </div>

              {/* Checkboxes */}
              <div className="mb-6">
                <label className="flex items-center mb-4">
                <input
                    type="checkbox"
                    className="mr-2 h-4 w-8 border-gray-300 rounded bg-transparent text-blue-400 focus:ring-blue-500"
                  />
                  <p className='flex items-start text-left'>
                    J'ai lu et accepte les conditions générales d'utilisation et la politique de confidentialité.
                  </p>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-8 border-gray-300 rounded bg-transparent text-blue-400 focus:ring-blue-500"
                  />
                  Inscrivez-vous à notre lettre d'information et restez informé
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-fit py-2 px-10 bg-blue-400 text-white rounded-[12px] flex items-center justify-center focus:outline-none disabled:opacity-50"
                >
                  <span>Envoyer</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </React.Fragment>
  )
}

export default ContactUs
