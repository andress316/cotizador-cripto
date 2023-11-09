import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'


const InputSubmit = styled.input`
     background-color: #9497FF;
     border: none;
     width: 100%;
     padding: 10px;
     color: #FFF;
     font-weight: 700;
     text-transform: uppercase;
     font-size: 20px;
     border-radius: 5px;
     transition: background-color .3s ease;
     margin-top: 30px;

     &:hover{
        background-color: #7A7DFE;
        cursor: pointer;

     }
`

const Formulario = ({setMonedas}) => {
  // State de error after submit
  const [error, setError] = useState(false)

  // State de las criptomonedas
  const [criptos, setCriptos] = useState([])

  // Destructuring de las monedas tradicionales y seteo del Hook
  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu opción', monedas)

  // Hook para mostrar las criptomonedas
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos)

  // Use Effect para consultar la API cuado se carga la app
  useEffect(() => {
    const consultarApi = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=5&tsym=USD'

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const arrayCriptos = resultado.Data.map(cripto => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }

        return objeto

      })
      setCriptos(arrayCriptos)
    }

    consultarApi()
  }, [])



  // HandleSubmit del formulario
  const handleSubmit = e => {
    e.preventDefault();

    if ([moneda, criptomoneda].includes('') || [moneda, criptomoneda].includes('Seleccionar')) {
      setError(true)
      return;
    }

    setError(false);
    setMonedas({
      moneda,
      criptomoneda
    })
  }




  // Componente retornado
  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form
        onSubmit={handleSubmit}
      >
        <SelectMonedas />
        <SelectCriptomoneda />
        <InputSubmit
          type="submit"
          value="Cotizar"
        />

      </form>
    </>
  )
}

export default Formulario
