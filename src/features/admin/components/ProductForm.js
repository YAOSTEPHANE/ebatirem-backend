import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { selectBrands, selectCategories } from '../../product/productSlice';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { } from '../../product/productSlice';
import { fetchProductByIdAsync, selectProductById, createProductAsync, updateProductAsync } from '../../product/productSlice';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearSelectedProduct } from '../../product/productSlice';
import Modal from '../../common/Modal';


function ProductForm() {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    const brands = useSelector(selectBrands);
    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();
    const params = useParams();
    const selectedProduct = useSelector(selectProductById);
    const [openModal, setOpenModal] = useState(null);



    useEffect(() => {
        if (params.id) {
            dispatch(fetchProductByIdAsync(params.id))
        } else {
            dispatch(clearSelectedProduct());
        }


    }, [params.id, dispatch])

    useEffect(() => {
        if (selectedProduct && params.id) {
            setValue('title', selectedProduct.title);
            setValue('description', selectedProduct.description);
            setValue('price', selectedProduct.price);
            setValue('rating', selectedProduct.rating);
            setValue('discountPercentage', selectedProduct.discountPercentage);
            setValue('thumbnail', selectedProduct.thumbnail);
            setValue('stock', selectedProduct.stock);
            setValue('image1', selectedProduct.images[0]);
            setValue('image2', selectedProduct.images[1]);
            setValue('image3', selectedProduct.images[2]);
            setValue('image4', selectedProduct.images[3]);
            setValue('brand', selectedProduct.brand);
            setValue('category', selectedProduct.category);
        }

    }, [selectedProduct, params.id, setValue]);

    const handleDelete = () =>{
      const product = {...selectedProduct};
      product.deleted = true;
      dispatch(updateProductAsync(product));
    }


    return (<form onSubmit={handleSubmit((data) => {
        console.log(data)
        const product = { ...data }
        product.images = [product.image1, product.image2, product.image3, product.image4, product.thumbnail];
        product.rating = 0;
        delete product['image1']
        delete product['image2']
        delete product['image3']
        delete product['image4']
        product.price = +product.price;
        product.stock = +product.stock;
        product.discountPercentage = +product.discountPercentage;
        console.log(product);

        if (params.id) {
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(product));
            reset()
        } else {
            dispatch(createProductAsync(product));
            reset()
            // TODO: on product successfully added clear fields and show a message
        }


    })}>
        <div className="space-y-12 bg-white p-12">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Ajouter Produit</h2>


                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                            Nom du Produit
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    type="text"
                                    {...register('title', {
                                        required: "nom requis",
                                    })}
                                    id="title"

                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description"
                                {...register('description', {
                                    required: "description requis",
                                })}
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Ecriver quelques phrases sur les produits.</p>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                            Marque
                        </label>
                        <div className="mt-2">
                            <select {...register('brand', {
                                required: "marque requis",
                            })}>
                                <option value="">--Choisir la Marque--</option>
                                {brands.map((brand) => (<option value={brand.value}>{brand.label}</option>))}
                            </select>
                        </div>

                    </div>

                    <div className="col-span-full">
                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                            Catégorie
                        </label>
                        <div className="mt-2">
                            <select {...register('category', {
                                required: "categorie requis",
                            })}>
                                <option value="">--Choisir la Catégorie--</option>
                                {categories.map((category) => (<option value={category.value}>{category.label}</option>))}
                            </select>
                        </div>

                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            prix
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    type="number"
                                    {...register('price', {
                                        required: "prix requis", min: 1, max: 1000000000
                                    })}
                                    id="price"

                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">
                            pourcentage de remise
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    type="number"
                                    {...register('discountPercentage', {
                                        required: "discountPercentage requis", min: 0, max: 100
                                    })}
                                    id="discountPercentage"

                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>



                    <div className="sm:col-span-2">
                        <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                            Stock
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    type="number"
                                    {...register('stock', {
                                        required: "stock requis", min: 0
                                    })}
                                    id="stock"

                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                            Vignette
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    type="text"
                                    {...register('thumbnail', {
                                        required: "thumbnail requis"
                                    })}
                                    id="thumbnail"

                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                            Image 1
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    type="text"
                                    {...register('image1', {
                                        required: "image requis"
                                    })}
                                    id="image1"

                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                            Image 2
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    type="text"
                                    {...register('image2', {
                                        required: "image requis"
                                    })}
                                    id="image2"

                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                            Image 3
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                <input
                                    type="text"
                                    {...register('image3', {
                                        required: "image requis"
                                    })}
                                    id="image3"

                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>
                    </div>
                    

                </div>
            </div>



            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Supplementaire</h2>


                <div className="mt-10 space-y-10">
                    <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">Par Email</legend>
                        <div className="mt-6 space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="comments"
                                        name="comments"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                        Comments
                                    </label>
                                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                </div>
                            </div>
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="candidates"
                                        name="candidates"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="candidates" className="font-medium text-gray-900">
                                        Candidates
                                    </label>
                                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                </div>
                            </div>
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                        id="offers"
                                        name="offers"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="offers" className="font-medium text-gray-900">
                                        Offers
                                    </label>
                                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                </div>
            </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Sortir
            </button>
            {selectedProduct && !selectedProduct.deleted && <button
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Supprimé
            </button>}
            <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Sauvegarder
            </button>
        </div>
    </form>
    );
}

export default ProductForm;