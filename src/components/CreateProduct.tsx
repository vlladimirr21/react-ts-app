import React, { useState } from 'react'
import { IProduct } from '../models'
import axios from 'axios'
import { ErrorMessage } from './ErrorMessage'

const productData: IProduct = {
  title: '',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 4.1,
    count: 259,
  },
}

interface CreateProductProps {
  onCreate: (product: IProduct) => void
}

export function CreateProduct({ onCreate }: CreateProductProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const submitHendler = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (value.trim().length === 0) {
      setError('Please enter a valid title')
      return
    }

    productData.title = value

    const response = await axios.post<IProduct>(
      'https://fakestoreapi.com/products',
      productData
    )

    onCreate(response.data)
  }
  return (
    <form onSubmit={submitHendler}>
      <input
        type="text"
        className="border py-2 px-4 mb-2 outline-0 flex flex-col"
        placeholder="Enter product title..."
        value={value}
        onChange={event => setValue(event.target.value)}
      />
      {error && <ErrorMessage error={error} />}
      <button
        className="py-2 px-4 border bg-yellow-400 hover:text-white "
        type="submit"
      >
        Create
      </button>
    </form>
  )
}
export default CreateProduct
