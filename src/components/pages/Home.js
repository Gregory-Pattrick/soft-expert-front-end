import styles from './Home.module.css';
import stock from '../../img/stock.png';
import LinkButton from '../layout/LinkButton';

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Mercadinho</span></h1>
            <p>Comece a cadastrar e a vender seus produtos.</p>
            <div className={styles.btn_container}>
                <LinkButton to="/register-product" text="Cadastrar"> </LinkButton>
                <LinkButton to="/product" text="Produtos"> </LinkButton>
                <LinkButton to="/register-sale" text="Vendas"> </LinkButton>
            </div>
            <img src={stock} alt="Stock" />
        </section>
    )
}
export default Home