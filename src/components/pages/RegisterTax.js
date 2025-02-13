import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Message from '../layout/Message';
import Taxform from '../project/Taxform';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';
import styles from './RegisterType.module.css';

function RegisterTax() {
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState('');
    const [productTypes, setProductTypes] = useState([]);

    useEffect(() => {
        if (location.state) {
            setMessage(location.state.message);
            navigate('/register-type', { replace: true });
        }
    }, [location, navigate]);

    useEffect(() => {
        fetch('http://localhost:8080/api/types', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            const types = Array.isArray(data) ? data : [data];
            setProductTypes(types);
        })
        .catch((err) => console.log(err));
    }, []);

    function createPost(product) {
        fetch('http://localhost:8080/api/tax', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then((resp) => resp.json())
        .then((data) => {
            setMessage(data.message);
            setTimeout(() => {
                setMessage('');
            }, 3000);
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className={styles.product_container}>
            <div className={styles.title_container}>
                <h1>Cadastrar - Impostos</h1>
                <div className={styles.btn_container}>
                    <LinkButton to="/register-type" text="Tipo de Produto" />
                    <LinkButton to="/product" text="Produtos" />
                    <LinkButton to="/" text="Home" />
                </div>
            </div>
            {message && <Message type="success" msg={message} />}
            <Container customClass="start">
                <p>Cadastre os valores percentuais de imposto do tipo de produto</p>
                <Taxform handleSubmit={createPost} btnText="Cadastrar" productTypes={productTypes} />
            </Container>
        </div>
    );
}

export default RegisterTax;
