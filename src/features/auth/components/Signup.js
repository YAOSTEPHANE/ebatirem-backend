import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { selectLoggedInUser, createUserAsync } from '../authSlice';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function Signup() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const user = useSelector(selectLoggedInUser)


  return (
    <>
      {user && <Navigate to='/' replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Creer Votre Compte
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
            dispatch(
              createUserAsync({
                email: data.email,
                password: data.password,
                addresses: [],
                role: 'user'
                // TODO: this role can be directly given on backend 
              })
            );
            console.log(data);
          })}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Adresse Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", {
                    required: "email requis", pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'email non valide'
                    }
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (<p className='text-red-500'>{errors.email.message}</p>)}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Mot de Passe
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "mot de passe requis",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: ` - au moins 8 caractères\n
                    - doit contenir au moins 1 lettre majuscule, 1 lettre minuscule et 1 chiffre\n
                    - Peut contenir des caractères spéciaux`,
                    },
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (<p className='text-red-500'>{errors.password.message}</p>)}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirmé le Mot de Passe
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "la confirmation du mot de passe est requis",
                    validate: (value, formValues) => value === formValues.password || 'mot de passe different'
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                S'Inscrire
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Vous avez de Compte ?{' '}
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Connectez-Vous
            </Link>
          </p>
        </div>
      </div >
    </>
  );
}
