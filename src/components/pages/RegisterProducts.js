import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Message from '../layout/Message';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import ProductForm from '../project/ProductForm';
import styles from './RegisterProducts.module.css';

function RegisterProducts() {

    const navigate = useNavigate()
    const location = useLocation()
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (location.state) {
            setMessage(location.state.message);
            navigate('/register-product', { replace: true });
        }
    }, [location, navigate])

    function createPost(product) {
        fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then((resp) => resp.json())
        .then((data) => {
            setMessage(data.message)
            setTimeout(() => {
                setMessage('')
            }, 3000)
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.product_container}>
            <div className={styles.title_container}>
                <h1>Cadastrar - Produto</h1>
                <div className={styles.btn_container}>
                    <LinkButton to="/register-type" text="Tipo de Produto"> </LinkButton>
                    <LinkButton to="/" text="Home" />
                </div>
            </div>
            {message && <Message type="success" msg={message} />}

            <Container customClass="start">
                    <p>Cadastre seus produtos</p>
                        <ProductForm handleSubmit={createPost} btnText="Cadastrar" />
            </Container>
        </div>
    )
}

export default RegisterProducts