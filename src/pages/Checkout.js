import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectItems, updateCartAsync, deleteItemFromCartAsync } from '../features/cart/cartSlice';
import { useForm } from 'react-hook-form';
import { updateUserAsync } from '../features/user/userSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { useState } from 'react';
import { selectUserInfo } from '../features/user/userSlice';
import { discountedPrice } from '../app/constants';




function Checkout() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const user = useSelector(selectUserInfo);
    const items = useSelector(selectItems);
    const currentOrder = useSelector(selectCurrentOrder);
    const totalAmount = items.reduce((amount, item) => discountedPrice(item.product) * item.quantity + amount, 0);
    const totalItems = items.reduce((total, item) => item.quantity + total, 0);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const handleQuantity = (e, item) => {
        dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
    };

    const handleRemove = (e, id) => {
        dispatch(deleteItemFromCartAsync(id));
    };
    const handleAddress = (e) => {
        console.log(e.target.value);
        setSelectedAddress(user.addresses[e.target.value]);
    };
    const handlePayment = (e) => {
        console.log(e.target.value);
        setPaymentMethod(e.target.value);
    };
    const handleOrder = (e) => {
        if (selectedAddress && paymentMethod) {
            const order = {
                items,
                totalAmount,
                totalItems,
                user:user.id,
                paymentMethod,
                selectedAddress,
                status: 'pending'// other status can be delivered, received. 
            };
            dispatch(createOrderAsync(order));
            // need to redirect from here to a new page of order success.
        } else {
            // TODO: we can use proper messaging popup here
            alert('Enter Address and payment method')
        }
        // TODO: Redirect to order-success page
        // TODO: clear cart after order
        // TODO: on server change the stock number of items
    };

    return (
        <>
            {!items.length && <Navigate to='/' replace={true}></Navigate>}
            {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className='lg:col-span-3'>
                        <form className='bg-white px-5 py-12 mt-12' noValidate
                            onSubmit={handleSubmit((data) => {
                                console.log(data)
                                dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }))
                                reset();
                            })}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Informations Personelles</h2>
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
                                                    <option>plateau</option>
                                                    <option>Treichville</option>
                                                    <option>Marcory</option>

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
                                    <button  type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Réinitialiser
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Ajouter une Adresse
                                    </button>
                                </div>
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Adresse</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choisir parmi une adresse existante
                                    </p>
                                    <ul role="list">
                                        {user.addresses.map((address, index) => (
                                            <li key={index} className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                                                <div className="flex min-w-0 gap-x-4">
                                                    <input
                                                        onChange={handleAddress}
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
                                                        onChange={handlePayment}
                                                        value='cash'
                                                        checked={paymentMethod === "cash"}
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
                                                        onChange={handlePayment}
                                                        value='card'
                                                        checked={paymentMethod === "card"}
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
                    </div>
                    <div className='lg:col-span-2'>
                        <div className="mx-auto mt-12 bg-white max-w-7xl px-2 sm:px-2 lg:px-4">

                            <div className="border-t border-gray-200 px-0 py-6 sm:px-6 sm:px-0">
                                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">Panier</h1>
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {items.map((item) => (
                                            <li key={item.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden  rounded-md border border-gray-200">
                                                    <img
                                                        src={item.product.thumbnail}
                                                        alt={item.product.title}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={item.product.id}>{item.product.title}</a>
                                                            </h3>
                                                            <p className="ml-4">{discountedPrice(item.product)} FCFA</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="text-gray-500">
                                                            <label htmlFor="quantity" className="block inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                                                Qté
                                                            </label>
                                                            <select onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                                                                <option value='1'>1</option>
                                                                <option value='2'>2</option>
                                                                <option value='3'>3</option>
                                                                <option value='4'>4</option>
                                                                <option value='5'>5</option>

                                                            </select>
                                                        </div>

                                                        <div className="flex">
                                                            <button
                                                                onClick={e => handleRemove(e, item.id)}
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Supprimé
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
                                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                    <p>Total</p>
                                    <p>{totalAmount} FCFA</p>
                                </div>
                                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                    <p>Total des article dans le panier</p>
                                    <p>{totalItems} articles</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Frais de Livraison.</p>
                                <div className="mt-6">
                                    <div
                                        onClick={handleOrder}
                                        className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Payer Maintenant
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        ou
                                        <Link to="/">
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Continue votre Achat
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;