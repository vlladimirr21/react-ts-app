import React from 'react'
import axios from 'axios'
import { AxiosError } from 'axios'
import { IProduct } from '../models'

export function useProducts() {
  const [products, setProducts] = React.useState<IProduct[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('error')

  function addProduct(product: IProduct) {
    setProducts(prev => [...prev, product])
  }

  async function fetchProduct() {
    try {
      setError('')
      setLoading(true)

      const response = await axios.get<IProduct[]>(
        'https://fakestoreapi.com/products'
      )
      setProducts(response.data)

      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError

      setLoading(false)
      setError(error.message)
    }
  }

  React.useEffect(() => {
    fetchProduct()
  }, [])

  return { products, loading, error, addProduct }
}
