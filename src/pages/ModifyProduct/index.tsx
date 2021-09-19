import React, {useState, useEffect} from 'react';
import Image from 'next/image'
import { useRouter } from "next/router";
import { useToasts } from 'react-toast-notifications';
import { FiChevronLeft } from 'react-icons/fi';

import api from '../../services/api';

export default function ModifyProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock_quantity, setStockQuantity] = useState('');

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : '';
  const productId = typeof window !== 'undefined' ? localStorage.getItem('productId') : '';

  const router = useRouter();
  const { addToast } = useToasts();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  async function loadProduct () {
    const response = await api.get(`product/${productId}`, {
      headers: {
          Authorization: userId,
      }
    });
    setName(response.data.name);
    setDescription(response.data.description);
    setCategory(response.data.category);
    setPrice(response.data.price);
    setStockQuantity(response.data.stock_quantity);
  }

  async function handleModifyProduct (e: { preventDefault: () => void; }) {
    e.preventDefault();

    const id = productId; // it is necessary to send the ID to the PUT request

    const data = {
      id,
      name,
      description,
      category,
      price,
      stock_quantity
    };

    try {
      await api.put('product',
        data,
        {
          headers: {
            Authorization: userId,
        }
      });
      addToast('Produto alterado com sucesso!', { appearance: 'success' });
      router.push('/Products'); // back to the Products page
    } catch (err) {
      addToast('Erro ao alterar produto, tente novamente.', { appearance: 'error' });
    }
  }

  const handleProducts = () => router.push('/Products'); // back to the Products page

  return (
    <div className="modify-product-container">
      <section className="form">
        <header>
          <Image  src='/small_pet_shop_logo.svg' alt="smallPetShopLogo" width={90} height={16} />
          <button onClick={handleProducts} type="button" title="Voltar">
            <FiChevronLeft size={30} />
          </button>
        </header>

        <div><p className="title">Alterar Produto</p></div>

        <form onSubmit={handleModifyProduct}>
          <input 
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input 
            placeholder="Categoria"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <input 
            placeholder="Preço"
            value={price}
            type="number"
            onChange={e => setPrice(e.target.value)}
          />
          <input 
            placeholder="Quantidade Estoque"
            value={stock_quantity}
            type="number"
            onChange={e => setStockQuantity(e.target.value)}
          />
          <button id="modifyProductButton" className="button" type="submit">
            Alterar
          </button>
        </form>
      </section>
    </div>
  );
}
