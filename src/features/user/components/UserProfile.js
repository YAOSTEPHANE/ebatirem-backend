import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';


export default function UserProfile() {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);

    // TODO: we will add payment section when we work on backend.

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    const handleEdit = (addressUpdate, index) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses] } // for shallow copy issue
        newUser.addresses.splice(index, 1, addressUpdate);
        dispatch(updateUserAsync(newUser));
        setSelectedEditIndex(-1);


    }
    const handleRemove = (e, index) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses] } // for shallow copy issue
        newUser.addresses.splice(index, 1);
        dispatch(updateUserAsync(newUser));

    };
    const handleEditForm = (index) => {
        setSelectedEditIndex(index);
        const address = userInfo.addresses[index];
        setValue('name', address.name)
        setValue('email', address.email)
        setValue('commune', address.city)
        setValue('quartier', address.state)
        setValue('sous-quartier', address.street)
        setValue('numero', address.phone)
        setValue('second numero', address.pinCode)
    };
    const handleAdd = (address) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] };
        dispatch(updateUserAsync(newUser));
        setShowAddAddressForm(false);
    }




    return (

        <div>
            <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">Nom : {userInfo.name ? userInfo.name : 'Nouvel Utilisateur'}</h1>
                    <h3 className="text-xl my-5 font-bold tracking-tight text-red-600">Addresse Email : {userInfo.email}</h3>
                    {userInfo.role === 'admin' && <h3 className="text-xl my-5 font-bold tracking-tight text-red-600"> role : {userInfo.role} </h3>}

                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <button
                        onClick={e => { setShowAddAddressForm(true); setSelectedEditIndex(-1) }}
                        type="submit"
                        className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Ajouter Nouvelle Adresse
                    </button>
                    {showAddAddressForm ? (
                        <form
                            className='bg-white px-5 py-12 mt-12'
                            noValidate
                            onSubmit={handleSubmit((data) => {
                                console.log(data);
                                handleAdd(data);
                                reset();
                            })}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Informations Personnelles</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Nom Complet
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('name', { required: 'le nom est requis' })}

                                                    id="name"

                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.name && (
                                                    <p className='text-red-500'>
                                                        {errors.name.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>



                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Addresse email
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email', { required: 'email est requis' })}

                                                    type="email"

                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.email && (
                                                    <p className='text-red-500'>
                                                        {errors.email.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Commune
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="country"
                                                    {...register('country', { required: 'la commune est requis' })}


                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option>Abobo</option>
                                                    <option>Anyama</option>
                                                    <option>Bingerville</option>
                                                    <option>Bonoua</option>
                                                    <option>Cocody</option>
                                                    <option>Adjamé</option>
                                                    <option>Plateau</option>
                                                    <option>Treichville</option>
                                                    <option>Marcory</option>
                                                    <option>Yopougon</option>

                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                                Quartier
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('street', { required: 'le quartier est requis' })}
                                                    id="street"

                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                Sous-quartier
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('city', { required: 'le nom du sous-quartier est requis' })}

                                                    id="city"

                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Numero de Telephone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="tel"
                                                    {...register('phone', { required: 'le numero est requis' })}

                                                    id="phone"

                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.phone && (
                                                    <p className='text-red-500'>
                                                        {errors.phone.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Second Numero
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('pinCode', { required: 'le second numero est requis' })}

                                                    id="pinCode"

                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-x-6">

                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Ajouter Adresse
                                    </button>
                                </div>
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Adresse</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choisir parmi une adresse existante
                                    </p>
                                    <ul role="list">
                                        {userInfo.addresses.map((address, index) => (
                                            <li key={index} className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                                                <div className="flex min-w-0 gap-x-4">
                                                    <input

                                                        name="address"
                                                        value={index}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />

                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">Telephone: {address.phone}</p>
                                                    <p className="text-sm leading-6 text-gray-500">{address.city}</p>
                                                </div>

                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-10 space-y-10">

                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Moyen de Paiement</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Choisir Un</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cash"
                                                        name="payments"

                                                        value='cash'

                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Paiement Cash
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="card"
                                                        name="payments"
                                                        value='card'
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Paiement Par carte
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="card"
                                                        name="payments"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Payer à la Livraison
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>


                        </form >
                    ) : null}
                    <p className="mt-0.5 text-sm text-gray-500">Tes addresses.</p>
                    {userInfo.addresses.map((address, index) => (
                        <div>
                            {selectedEditIndex === index ? (
                                <form
                                    className='bg-white px-5 py-12 mt-12'
                                    noValidate
                                    onSubmit={handleSubmit((data) => {
                                        console.log(data)
                                        handleEdit(data, index)

                                        reset();
                                    })}>
                                    <div className="space-y-12">
                                        <div className="border-b border-gray-900/10 pb-12">
                                            <h2 className="text-2xl font-semibold leading-7 text-gray-900">Informations Personnelles</h2>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div className="sm:col-span-4">
                                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Nom Complet
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('name', { required: 'le nom est requis' })}

                                                            id="name"

                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.name && (
                                                            <p className='text-red-500'>
                                                                {errors.name.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>



                                                <div className="sm:col-span-4">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Addresse email
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            id="email"
                                                            {...register('email', { required: 'email est requis' })}

                                                            type="email"

                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.email && (
                                                            <p className='text-red-500'>
                                                                {errors.email.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Commune
                                                    </label>
                                                    <div className="mt-2">
                                                        <select
                                                            id="country"
                                                            {...register('country', { required: 'la commune est requis' })}


                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        >
                                                            <option>Abobo</option>
                                                            <option>Anyama</option>
                                                            <option>Bingerville</option>
                                                            <option>Bonoua</option>
                                                            <option>Cocody</option>
                                                            <option>Adjamé</option>
                                                            <option>Plateau</option>
                                                            <option>Treichville</option>
                                                            <option>Marcory</option>
                                                            <option>Yopougon</option>

                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-span-full">
                                                    <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Quartier
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('street', { required: 'le quartier est requis' })}
                                                            id="street"

                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2 sm:col-start-1">
                                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Sous-quartier
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('city', { required: 'le nom du sous-quartier est requis' })}

                                                            id="city"

                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Numero de Telephone
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="tel"
                                                            {...register('phone', { required: 'le numero est requis' })}

                                                            id="phone"

                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.phone && (
                                                            <p className='text-red-500'>
                                                                {errors.phone.message}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                    <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Second Numero
                                                    </label>
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            {...register('pinCode', { required: 'le second numero est requis' })}

                                                            id="pinCode"

                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6 flex items-center justify-end gap-x-6">
                                            <button
                                                onClick={(e) => setSelectedEditIndex(-1)}
                                                type="submit"
                                                className="rounded-md px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Sortir
                                            </button>
                                            <button
                                                type="submit"
                                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Modifier Adresse
                                            </button>
                                        </div>

                                    </div>


                                </form >
                            ) : null}
                            <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                                    </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">Telephone: {address.phone}</p>
                                    <p className="text-sm leading-6 text-gray-500">{address.city}</p>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <button
                                        onClick={(e) => handleEditForm(index)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={(e) => handleRemove(e, index)}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Supprimé
                                    </button>
                                </div>

                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}
