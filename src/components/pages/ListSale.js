import { useState, useEffect } from 'react';
import styles from './ListSale.module.css';
import Container from '../layout/Container';
import LinkButton from '../layout/LinkButton';

function ListSale() {
    const [sales, setSales] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8080/api/sale', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(resp => resp.json())
            .then((data) => {
                if (data.success === false) {
                    setSales([]);
                } else {
                    const salesArray = Array.isArray(data) ? data : [data];
                    setSales(salesArray);
                }
                setRemoveLoading(true);
            })
            .catch((err) => console.log(err));
        }, 1000);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <h1>Histórico</h1>
                <div className={styles.btn_container}>
                    <LinkButton to="/register-sale" text="Vendas" />
                    <LinkButton to="/product" text="Produtos" />
                    <LinkButton to="/" text="Home" />
                </div>
            </div>
            <Container customClass="start">
                <p>Lista dos Pedidos Finalizados</p>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Preço Unitário</th>
                            <th>Quantidade</th>
                            <th>Preço Total</th>
                            <th>PIS</th>
                            <th>COFINS</th>
                            <th>ICMS</th>
                            <th>IPI</th>
                            <th>Imposto Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => {
                            const priceUni = parseFloat(sale.price_uni);
                            const pis = parseFloat(sale.sale_tax.pis);
                            const cofins = parseFloat(sale.sale_tax.confins);
                            const icms = parseFloat(sale.sale_tax.icms);
                            const ipi = parseFloat(sale.sale_tax.ipi);
                            const totalTax = ((pis + cofins + icms + ipi) / 100) * priceUni * sale.quantity;
                            
                            return (
                                <tr key={sale.id}>
                                    <td>R$ {priceUni.toFixed(2)}</td>
                                    <td>{sale.quantity}</td>
                                    <td>R$ {parseFloat(sale.price_total).toFixed(2)}</td>
                                    <td>{pis.toFixed(2)} %</td>
                                    <td>{cofins.toFixed(2)} %</td>
                                    <td>{icms.toFixed(2)} %</td>
                                    <td>{ipi.toFixed(2)} %</td>
                                    <td>R$ {totalTax.toFixed(2)}</td>
                                </tr>
                            );
                        })}
                        {!removeLoading && (
                            <tr>
                                <td colSpan="8">Carregando...</td>
                            </tr>
                        )}
                        {removeLoading && sales.length === 0 && (
                            <tr>
                                <td colSpan="8">Nenhum pedido encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Container>
        </div>
    );
}

export default ListSale;
