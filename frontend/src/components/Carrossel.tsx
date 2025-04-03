import axios from 'axios';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';

const Carrossel = () => {

    const [notice, setNotice] = useState([]);

    useEffect(() => {
        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=2773957a9a82453d9bcb67539cbe2155')
            .then(response => {
                setNotice(response.data.articles);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API de Noticia:', error);
            });
    }, []);

    return (
        <>
        <Carousel className='col-12 m-auto'>
            {notice.map((item:any,chave:any)=>
                    <Carousel.Item key={chave}>
                        <div className="col-12 rounded rounded-2" style={{backgroundImage:`url('${item.urlToImage}')`,height:"300px",backgroundRepeat:"no-repeat",backgroundSize:"cover"}} ></div>
                        <Carousel.Caption>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
            )}           
        </Carousel>
        
        </>
    );
}

export default Carrossel;
