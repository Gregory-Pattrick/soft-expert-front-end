import {Link} from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'
import logo from '../../img/logo.png'

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <ul className={styles.list}>
                    <li className={styles.item}><Link to="/">Home</Link></li>
                    <li className={styles.item}><Link to="/Products">Cadastro de Produtos</Link></li>
                    <li className={styles.item}><Link to="/TypeOfProduct">Cadastro Tipos de Produtos</Link></li>
                    <li className={styles.item}><Link to="/ProductTypeTax">Cadastro de Imposto</Link></li>
                    <li className={styles.item}><Link to="">Vendas</Link></li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar