import React, { useEffect, useState } from 'react';
import { ProductPagePlaceholder } from './ProductPagePlaceholder';
import { RElatedProducts } from './RElatedProducts';
import { useParams } from 'react-router-dom';
import api from '../../api/axios';
import { BASE_URL } from '../../api/axios';
import { toast } from 'react-toastify';

export const ProductPage = ({ setNumberCartItems }) => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inCart, setInCart] = useState(false);



 
  const [isProcessing,setIsprocessing] = useState(false)
  const cart_code = localStorage.getItem('cart_code');
  const newItem = { cart_code: cart_code, product_id: product.id };

 /*  function add_item() {
    api.post('add_item/', newItem)
      .then(res => {
        console.log(res.data);
        setInCart(true);
        toast.success("product added to cart")
        setNumberCartItems(curr => curr + 1);
      })
      .catch(err => {
        console.log(err);
      });
  } */


      /* v1 */
  /*     const add_item = () => {
        const newItem = { cart_code: cart_code, product_id: product.id };
      
        api.post('add_item/', newItem)
          .then(res => {
            setInCart(true); // Actualiza el estado para marcar que el producto está en el carrito
            toast.success("Product added to cart"); // Muestra una notificación de éxito
            setNumberCartItems(curr => curr + 1); // Actualiza el número de ítems en el carrito
          })
          .catch(err => {
            console.log(err); // Maneja el error si ocurre
          });
      }; */
      /* v2 */
      const add_item = () => {
        if (inCart) return; // previene múltiples clics
      
        const newItem = { cart_code: cart_code, product_id: product.id };
      
        api.post('add_item/', newItem)
          .then(() => {
            setInCart(true);
            toast.success("Producto agregado al carrito");
            setNumberCartItems(curr => curr + 1);
          })
          .catch(err => {
            toast.error("Error al agregar producto");
            console.log(err.message);
          });
      };
      
  useEffect(() => {
    if (product.id) {
      api.get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
        .then(res => {
          console.log(res.data);
          setInCart(res.data.product_in_cart);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  }, [cart_code, product.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`product_detail/${slug}`);
        console.log(res.data);
        setProduct(res.data);
        setSimilarProducts(res.data.similar_products);
      } catch (err) {
        console.error('Error al obtener el producto:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <ProductPagePlaceholder />;

  return (
    <>
      <div>
        <section className='py-6'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
              <div>
                <img
                  src={`${BASE_URL}${product.image}`}
                  alt={product.name}
                  className='w-full h-auto rounded-lg shadow-md'
                />
              </div>
              <div>
                <div className='text-sm text-gray-500 mb-2'>SKUFGD</div>
                <h1 className='text-3xl font-bold text-gray-900 mb-4'>{product.name}</h1>
                <div className='text-xl text-gray-700 mb-6'>
                  <span className='line-through'>
                    {`${product.price} Bs`}
                  </span>
                </div>

                <p className='text-gray-600 mb-6'>
                {product.description}
{/*                   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium est illo nam ipsum nobis quas, laboriosam minus suscipit sed ut perspiciatis, possimus similique assumenda commodi sint quos, officiis vel numquam.
 */}                </p>

                <div className='flex'>
                  <button
                    className='px-5 py-2 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white rounded disabled:opacity-50'
                    type='button'
                    onClick={add_item}
                    disabled={inCart}
                  >
                    <i className='bi-cart-fill mr-2'></i>
                    {inCart ? 'Product added to cart' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RElatedProducts products={similarProducts} />
      </div>
    </>
  );
};
