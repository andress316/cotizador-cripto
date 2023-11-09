import styled from "@emotion/styled"

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`

const Imagen = styled.img`
    width: 100px;
    display: block;



`

const Texto = styled.p`

`

const Precio = styled.p`
font-size: 30px;
    span{
        font-weight: 700;
    }
`




const Resultado = ({resultado}) => {
    const {PRICE, CHANGEPCT24HOUR, HIGHDAY, LOWDAY, IMAGEURL, LASTUPDATE} = resultado
  return (
    <ResultadoDiv>
        <Imagen src={`https://www.cryptocompare.com/${IMAGEURL}`} alt="Logo Cripto" />
      <div>
      <Precio>El precio es de: <span>{PRICE}</span></Precio>
      <Texto>Precio más alto del día: <span>{HIGHDAY}</span></Texto>
      <Texto>Precio más bajo del día: <span>{LOWDAY}</span></Texto>
      <Texto>Variación últimas 24 Hrs.: <span>{CHANGEPCT24HOUR}</span></Texto>
      <Texto>Última Actualización: <span>{LASTUPDATE}</span></Texto>
      </div>
    </ResultadoDiv>
  )
}

export default Resultado
