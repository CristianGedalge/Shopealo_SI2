import React, { useEffect,useState } from "react";
import { Header } from "./Header";
import { CardContainer } from "./CardContainer";
import { randomValue } from "../../../GenerateCartCode";
import PlaceHolderContainer from "../ui/PlaceHolderContainer";

/* importar axios */
/* import api from "../../api/axios"; */

export const HomePage = () => {
  
  /*   const [products, setPoducts] = useState([]) ;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  */
  
  const [products, setPoducts] = useState([]) ;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(function () {
    if (localStorage.getItem("cart_code") === null) {
      localStorage.setItem("cart_code", randomValue);
      console.log(randomValue);
    }
  }, []);

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await api.get("products");
        console.log('array de productos :   ',res.data);
       
        setPoducts(res.data)
        setLoading(false)
        setError('')
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setLoading(false)
        setError(error.message)
      }
    };
  
    fetchData();
  }, []); */

  return (
    <>
      <Header />
      {error && <Error error={error}/>}
      {/* solo si la carga se establece como verdadera ,pondre este cointenedor  */}
    {loading && <PlaceHolderContainer/>}

      {/* si la carga es falsa si error no es igual a nulll  */}
      {loading || error != "" ||  <CardContainer products={products}/>}
   
    {/*  <CardContainer products={products}/> */}
    </>
  );
};
